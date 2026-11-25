# Campuslands AI Academy · Rediseño de la landing

Propuesta de rediseño de la landing de Campuslands AI Academy, construida con HTML, CSS y JavaScript sin librerías ni frameworks. Funciona como sitio estático y está publicada con GitHub Pages.

## Cómo verla

- **En línea:** el enlace de GitHub Pages que aparece en la descripción del repositorio.
- **En local:** abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8080
# luego abre http://localhost:8080
```

## Estructura

```
index.html   Estructura y contenido base
styles.css   Sistema visual del manual de marca y diseño responsive (móvil primero)
app.js       Datos de la página (planes, herramientas, casos, FAQs) e interacciones
assets/      Logos, casco y poses aprobadas de Max en WebP
core.js      Validación, estados e historial (compartido con n8n)        ┐
api.js       Conexión con los webhooks de n8n o modo demo                │
config.js    URL pública de los webhooks                                 │ Reto 4
admin/       Panel de administración                                     │ (ver RETO4.md)
n8n/         Flujo de n8n exportado en JSON                              │
tools/       Script que genera el flujo a partir de core.js              ┘
```

Todo el contenido editable está en el objeto `CONTENT` y en `LINKS`, al inicio de `app.js`. Para agregar una herramienta, un plan o una pregunta basta con añadir una línea.

## Decisiones de diseño

**Manual de marca aplicado al pie de la letra**
- Paleta oficial: Black `#050507`, Evox Purple `#7026E8`, Electric Violet `#9636FF`, Soft Violet `#B783FF`, White y Muted Gray `#8E8998`. La landing actual usa azules y cian que no están en el manual.
- Tipografía única: Poppins.
- Halos de luz solo arriba a la derecha (Electric Violet) y abajo a la izquierda (Evox Purple), nunca detrás del texto.
- Etiquetas en píldora Soft Violet con texto negro en mayúsculas, palabra destacada en Soft Violet sin subrayado, tarjetas de 28 px de radio y bloque de CTA en Evox Purple.
- Logo horizontal blanco y logo principal vigentes. La versión horizontal «campuslands IA» que usa la landing actual está retirada en el manual.
- Nombre de marca: «Campuslands AI Academy» en la primera mención y «AI Academy» después; la tecnología se escribe «IA».
- Max aparece solo con poses aprobadas (presentando y aprobando). Sin fotos de banco.

**Contenido**
- Se conservan los textos reales de planes, beneficios, «¿Por qué ahora?», casos de uso, reseña y preguntas frecuentes, ajustados al tuteo y al nombre de marca.
- Se retiró la cita atribuida a Charles Darwin del hero: no aparece en su obra (es una paráfrasis de Leon C. Megginson, 1963). En su lugar, el hero habla directo al visitante y le pregunta quién es.

**Conversión**
- Todos los botones «Inscríbete» llevan al formulario «Solicita información» con el plan ya elegido. Cada solicitud queda registrada, llega como aviso por Telegram y se sigue desde el panel (ver `RETO4.md`).
- WhatsApp queda como canal directo con un mensaje listo para escribir.
- Barra fija con «Inscríbete» y WhatsApp que aparece al pasar el hero, siempre al alcance del pulgar en móvil.

## Interacciones

1. **Hero que reacciona.** El visitante elige su perfil (empresa, líder de equipo o independiente) y el mensaje cambia con una recomendación. Max sigue el puntero o la inclinación del teléfono, sobre un campo de estrellas en canvas que se pausa cuando no está en pantalla.
2. **Recorrido narrativo.** La página es una misión: Despegue → Propulsión → Instrumentos → Ruta → Órbita → Aterrizaje → Bitácora. Un indicador lateral (barra superior en móvil) marca la fase actual y el progreso, y los bloques aparecen al entrar en pantalla.
3. **Recomendador de misión.** Tres preguntas (tamaño del equipo, tiempo y objetivo) llevan al plan adecuado, resaltan su tarjeta y abren el formulario con ese plan elegido. Al elegir perfil en el hero, la primera respuesta se completa sola.
4. **Constelación de herramientas.** Las herramientas orbitan alrededor del casco; al tocar cada una se abre su ficha con lo que se aprende a hacer.
5. **Antes y después.** Pestañas por perfil y un control deslizante que revela la transformación de cada rol.

En móvil, los planes pasan a un carrusel con desplazamiento por tarjeta e indicadores.

## Accesibilidad y rendimiento

- Sin dependencias ni frameworks; las imágenes van en WebP (unos 260 KB en total).
- Navegación completa con teclado: grupos de opciones con flechas, pestañas, foco visible y enlace para saltar al contenido.
- Respeta `prefers-reduced-motion`: sin animaciones ni paralaje para quien lo pida.
- Imágenes con dimensiones declaradas, carga diferida fuera del hero y textos alternativos.
- Probada a 375 px y en escritorio, sin desbordes horizontales ni errores en consola.

## Uso de IA

Se usó un asistente de IA como apoyo para escribir y depurar el código, extraer los recursos del manual de marca en PDF y probar la página en distintos tamaños de pantalla. El contenido sale de la landing actual y del manual de marca, y el resultado se revisó en un teléfono real antes de publicarlo.

## Derechos de autor

© 2026 Jonatan Sarmiento. Todos los derechos reservados.

Este proyecto se entregó únicamente para evaluar mi proceso de selección en Campuslands AI Academy. Cualquier uso, copia, modificación o publicación, total o parcial, fuera de esa evaluación requiere mi autorización previa y por escrito.

Los logos, la mascota Max y los contenidos de marca pertenecen a Campuslands AI Academy y se usan solo para esta propuesta.
