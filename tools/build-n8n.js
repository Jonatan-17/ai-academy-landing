// Genera n8n/flujo-registro-interesados.json incrustando core.js en los nodos Code.
// Uso: node tools/build-n8n.js
const fs = require('fs'); const path = require('path'); const crypto = require('crypto');
const root = path.join(__dirname, '..');
const core = fs.readFileSync(path.join(root, 'core.js'), 'utf8');
const wrapped = `const AIACore = (function () { const module = { exports: {} };\n${core}\nreturn module.exports; })();\n`;
const uid = (s) => { const h = crypto.createHash('md5').update('aia-' + s).digest('hex'); return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20,32)}`; };
const cors = { entries: [{ name: 'Access-Control-Allow-Origin', value: '*' }] };

const nodes = [
  { name: 'Nota · Cómo funciona', type: 'n8n-nodes-base.stickyNote', typeVersion: 1, position: [-80, -360],
    parameters: { width: 760, height: 250, color: 5, content:
`## AI Academy · Registro de interesados y seguimiento
**Formulario (arriba):** la landing envía los datos → se validan → si son válidos se guardan con estado *Nuevo* y se avisa por Telegram. Si un dato obligatorio es inválido, se responde con el error y **no** se guarda ni se avisa.

**Panel (abajo):** el panel /admin consulta registros, cambia estados, añade notas y guarda el historial (qué, quién y cuándo).

Los datos viven en el almacenamiento interno del flujo (static data). El token del bot va en la credencial de Telegram de n8n y las contraseñas de los administradores se guardan con hash; nada de eso está en este archivo.` } },
  { name: 'Formulario · Webhook', type: 'n8n-nodes-base.webhook', typeVersion: 2, position: [0, 0], webhookId: uid('wh-registro'),
    parameters: { httpMethod: 'POST', path: 'aia-registro', responseMode: 'responseNode', options: { allowedOrigins: '*' } } },
  { name: 'Validar y guardar registro', type: 'n8n-nodes-base.code', typeVersion: 2, position: [220, 0],
    parameters: { jsCode: wrapped +
`const db = $getWorkflowStaticData('global');
const body = AIACore.leerCuerpo($input.first().json.body);
const resultado = AIACore.procesarRegistro(db, body, new Date().toISOString());
return [{ json: resultado }];` } },
  { name: '¿Datos válidos?', type: 'n8n-nodes-base.if', typeVersion: 2, position: [440, 0],
    parameters: { conditions: { options: { caseSensitive: true, leftValue: '', typeValidation: 'loose' },
      conditions: [{ id: uid('cond-ok'), leftValue: '={{ $json.ok }}', rightValue: true, operator: { type: 'boolean', operation: 'true', singleValue: true } }],
      combinator: 'and' }, options: {} } },
  { name: 'Avisar por Telegram', type: 'n8n-nodes-base.telegram', typeVersion: 1.2, position: [680, -100], onError: 'continueRegularOutput',
    parameters: { chatId: 'TU_CHAT_ID', text: '={{ $json.mensaje }}', additionalFields: { appendAttribution: false, parse_mode: 'HTML' } } },
  { name: 'Anotar aviso en historial', type: 'n8n-nodes-base.code', typeVersion: 2, position: [900, -100],
    parameters: { jsCode: wrapped +
`const db = $getWorkflowStaticData('global');
const registro = $('Validar y guardar registro').first().json.registro;
const t = $input.first().json || {};
const msg = t.result || t;
const enviado = !t.error && !!(msg && msg.message_id);
const detalle = enviado ? 'Mensaje ' + msg.message_id + ' en el chat de seguimiento' : String((t.error && t.error.message) || t.error || 'Sin respuesta de Telegram');
AIACore.anotarAviso(db, registro.id, enviado, detalle, new Date().toISOString());
return [{ json: { ok: true, id: registro.id, avisoEnviado: enviado } }];` } },
  { name: 'Responder registro creado', type: 'n8n-nodes-base.respondToWebhook', typeVersion: 1.1, position: [1120, -100],
    parameters: { respondWith: 'json', responseBody: "={{ JSON.stringify({ ok: true, id: $json.id }) }}", options: { responseCode: 201, responseHeaders: cors } } },
  { name: 'Responder datos inválidos', type: 'n8n-nodes-base.respondToWebhook', typeVersion: 1.1, position: [680, 120],
    parameters: { respondWith: 'json', responseBody: "={{ JSON.stringify({ ok: false, errores: $json.errores }) }}", options: { responseCode: 422, responseHeaders: cors } } },
  { name: 'Panel · Webhook', type: 'n8n-nodes-base.webhook', typeVersion: 2, position: [0, 360], webhookId: uid('wh-admin'),
    parameters: { httpMethod: 'POST', path: 'aia-admin', responseMode: 'responseNode', options: { allowedOrigins: '*' } } },
  { name: 'Procesar acción del panel', type: 'n8n-nodes-base.code', typeVersion: 2, position: [220, 360],
    parameters: { jsCode: wrapped +
`const db = $getWorkflowStaticData('global');
const body = AIACore.leerCuerpo($input.first().json.body);
return [{ json: AIACore.procesarAdmin(db, body, new Date().toISOString()) }];` } },
  { name: 'Responder al panel', type: 'n8n-nodes-base.respondToWebhook', typeVersion: 1.1, position: [440, 360],
    parameters: { respondWith: 'json', responseBody: '={{ JSON.stringify($json) }}', options: { responseCode: 200, responseHeaders: cors } } },
  { name: 'Nota · Telegram', type: 'n8n-nodes-base.stickyNote', typeVersion: 1, position: [620, -320],
    parameters: { width: 300, height: 180, color: 4, content: '### Configurar el aviso\n1. Crea la credencial **Telegram** con el token de tu bot.\n2. Cambia `TU_CHAT_ID` por el ID de tu chat privado de prueba.' } },
];
nodes.forEach((n) => { n.id = uid('node-' + n.name); });
const link = (to, index = 0) => ({ node: to, type: 'main', index });
const connections = {
  'Formulario · Webhook': { main: [[link('Validar y guardar registro')]] },
  'Validar y guardar registro': { main: [[link('¿Datos válidos?')]] },
  '¿Datos válidos?': { main: [[link('Avisar por Telegram')], [link('Responder datos inválidos')]] },
  'Avisar por Telegram': { main: [[link('Anotar aviso en historial')]] },
  'Anotar aviso en historial': { main: [[link('Responder registro creado')]] },
  'Panel · Webhook': { main: [[link('Procesar acción del panel')]] },
  'Procesar acción del panel': { main: [[link('Responder al panel')]] },
};
const wf = { name: 'AI Academy · Registro de interesados y seguimiento', nodes, connections, pinData: {}, active: false, settings: { executionOrder: 'v1', saveManualExecutions: true }, tags: [] };
fs.writeFileSync(path.join(root, 'n8n', 'flujo-registro-interesados.json'), JSON.stringify(wf, null, 2) + '\n');
console.log('n8n/flujo-registro-interesados.json generado con', nodes.length, 'nodos');
