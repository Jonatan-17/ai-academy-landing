# Reto 4 · Registro de interesados, aviso por Telegram y seguimiento

## Qué hay en el proyecto

| Pieza | Dónde | Qué hace |
|---|---|---|
| Formulario | Sección «Solicita información» de la landing (`index.html#solicitud`) | Pide nombre, correo y programa (obligatorios) y teléfono (opcional). Valida en el navegador y en el servidor, y muestra la confirmación con el número de registro. |
| Flujo de n8n | `n8n/flujo-registro-interesados.json` | Valida y guarda el registro con fecha y estado **Nuevo**, avisa por Telegram y deja constancia del aviso en el historial. También atiende al panel. |
| Panel de administración | `admin/` | Acceso con usuario y contraseña. Lista y busca registros, filtra por estado, cambia el estado (Nuevo, Contactado, En seguimiento, Cerrado), añade notas y muestra el historial: qué cambió, quién lo hizo y cuándo. |
| Lógica compartida | `core.js` | Validación, estados, notas e historial. El mismo código corre dentro de n8n y en el modo demo del navegador. |

```
Landing ──POST /webhook/aia-registro──▶ n8n: validar ─┬─ válido ──▶ guardar (Nuevo) ─▶ Telegram ─▶ anotar aviso ─▶ 201
                                                      └─ inválido ─▶ 422 con el error (no guarda, no avisa)
Panel ────POST /webhook/aia-admin─────▶ n8n: autenticar ─▶ listar | actualizar estado y nota | agregar administrador
```

## Credenciales: fuera de los archivos

- **Token del bot de Telegram:** se guarda en una credencial de Telegram dentro de n8n. No está en ningún archivo.
- **Administradores:** se crean desde el propio panel. La contraseña se guarda dentro de n8n como hash SHA-256 con sal, nunca en texto plano ni en el repositorio.
- `config.js` solo tiene la URL pública de los webhooks, que no es secreta.

## Cómo ponerlo en marcha

1. **Bot de Telegram.** En Telegram, abre @BotFather, envía `/newbot` y guarda el token. Escríbele `/start` a tu bot. Para saber el ID de tu chat privado, abre @userinfobot.
2. **Importar el flujo.** En n8n, crea un flujo nuevo y elige **Import from File**: `n8n/flujo-registro-interesados.json`.
3. **Telegram en n8n.** En el nodo «Avisar por Telegram», crea la credencial con el token del bot y reemplaza `TU_CHAT_ID` por el ID de tu chat.
4. **Activar.** Guarda y activa el flujo (*Active*). Copia la URL de producción de un webhook (termina en `/webhook/aia-registro`) y quítale `/aia-registro`.
5. **Conectar la página.** Pega esa URL base en `config.js`, en `api`, y publica.
6. **Primer administrador.** Abre `/admin/`. Como todavía no hay administradores, el panel pide crear el primero. Desde «Administradores» puedes agregar más.

En local, cualquier servidor estático sirve: `python3 -m http.server 8080` y abre `http://localhost:8080`.

**Modo demo.** Si `config.js` no tiene URL, la landing y el panel funcionan igual, pero los datos quedan solo en ese navegador y no se envía Telegram. Así la interfaz se puede revisar sin depender del servidor.

## Cómo verificarlo (recorrido de la prueba)

1. En la landing, ve a «Solicita información» y registra a una persona ficticia, por ejemplo: *Mariana López · mariana.lopez@ejemplo.co · Booster · 300 123 4567*. Aparece la confirmación con un número como `AIA-0001`.
2. En el chat de Telegram llega el aviso con nombre, correo, programa, teléfono y el mismo número de registro.
3. En `/admin/`, busca «Mariana» o `AIA-0001`. Ábrelo, cambia el estado a **Contactado**, escribe una nota y guarda.
4. Sal del panel, vuelve a ingresar (o entra con otro administrador) y abre el registro: el estado, la nota y el historial siguen ahí. El historial muestra *Registro creado → Aviso enviado por Telegram → Cambio de estado: Nuevo → Contactado → Nota añadida*, cada uno con quién y cuándo.
5. **Dato inválido:** intenta enviar el formulario con un correo como `mariana@`. La landing muestra el error y no envía nada. Aunque alguien salte la validación del navegador y llame directo al webhook, n8n responde `422` con el error, sin guardar el registro y sin avisar por Telegram:

```bash
curl -i -X POST "$URL_BASE/aia-registro" \
  --data-urlencode 'payload={"nombre":"Mariana López","correo":"mariana@","programa":"Booster"}'
```

## Decisiones

- **n8n como backend.** Un solo flujo concentra el registro, el aviso y el panel, así que no hay otro servidor que mantener. Los datos viven en el almacenamiento interno del flujo (*static data*), suficiente para la prueba. Para producción, el paso natural es cambiarlo por una Data Table de n8n o una base de datos, sin tocar la landing ni el panel.
- **Validación en ambos lados con el mismo código.** `core.js` se incrusta en los nodos Code al generar el flujo (`node tools/build-n8n.js`). Lo que acepta el navegador es exactamente lo que acepta n8n.
- **Trazabilidad para el siguiente administrador.** Cada cambio queda en el historial con autor y fecha, y cada nota guarda quién la escribió. Quien tome el caso ve en qué va y cuál es el siguiente paso.
- **Campo trampa contra bots** en el formulario: si se llena, el registro se rechaza.
- **Peticiones sin verificación previa de CORS.** La página envía los datos como formulario simple y n8n responde con `Access-Control-Allow-Origin`, para que funcione desde GitHub Pages sin configuración extra.
