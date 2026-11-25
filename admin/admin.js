/* Panel de seguimiento · Campuslands AI Academy */
'use strict';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (t) => String(t == null ? '' : t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Bogota' });
const fecha = (iso) => { try { return fmt.format(new Date(iso)); } catch (e) { return iso; } };
const slug = (e) => 'st-' + e.toLowerCase().replace(/\s+/g, '-');
const chip = (e) => `<span class="chip ${slug(e)}">${esc(e)}</span>`;

const S = { sesion: null, registros: [], estados: AIACore.ESTADOS, filtro: 'Todos', q: '', abierto: null };
const KEY = 'aia_panel_sesion';
try { S.sesion = JSON.parse(sessionStorage.getItem(KEY)); } catch (e) { S.sesion = null; }

if (AIAApi.demo) $('#demoBanner').hidden = false;

function ver(id) { ['vSetup', 'vLogin', 'vPanel'].forEach((v) => { $('#' + v).hidden = v !== id; }); }
async function llamar(datos) { return AIAApi.admin(Object.assign({}, datos, S.sesion ? { usuario: S.sesion.usuario, clave: S.sesion.clave } : {})); }

async function iniciar() {
  if (S.sesion) { const ok = await cargar(); if (ok) return; }
  const r = await AIAApi.admin({ accion: 'estado' });
  ver(r.ok && !r.configurado ? 'vSetup' : 'vLogin');
  if (!r.ok) $('#fLogin .msg').textContent = r.error || 'No pudimos conectar con el servidor.';
}

function enviando(form, on) { const b = $('button[type=submit]', form); b.disabled = on; }

$('#fSetup').addEventListener('submit', async (e) => {
  e.preventDefault(); const f = e.target; const msg = $('.msg', f);
  const nuevo = { nombre: f.nombre.value, usuario: f.usuario.value, clave: f.clave.value };
  enviando(f, true); const r = await AIAApi.admin({ accion: 'configurar', nuevo }); enviando(f, false);
  if (!r.ok) { msg.textContent = r.error; return; }
  S.sesion = { usuario: nuevo.usuario.trim().toLowerCase(), clave: nuevo.clave };
  sessionStorage.setItem(KEY, JSON.stringify(S.sesion)); f.reset(); cargar();
});

$('#fLogin').addEventListener('submit', async (e) => {
  e.preventDefault(); const f = e.target; const msg = $('.msg', f);
  S.sesion = { usuario: f.usuario.value.trim().toLowerCase(), clave: f.clave.value };
  enviando(f, true); const ok = await cargar(); enviando(f, false);
  if (!ok) { msg.textContent = S.ultimoError || 'Usuario o contraseña incorrectos.'; S.sesion = null; return; }
  sessionStorage.setItem(KEY, JSON.stringify(S.sesion)); f.reset(); msg.textContent = '';
});

$('#btnSalir').addEventListener('click', () => {
  sessionStorage.removeItem(KEY); S.sesion = null; S.registros = []; S.abierto = null;
  $('.layout').classList.remove('open'); pintarDetalle(null);
  $('#who').hidden = true; ver('vLogin');
});

async function cargar() {
  const r = await llamar({ accion: 'listar' });
  if (!r.ok) { S.ultimoError = r.error; if (r.auth === false) { sessionStorage.removeItem(KEY); S.sesion = null; } return false; }
  S.registros = r.registros; S.estados = r.estados || S.estados;
  $('#whoName').textContent = r.admin.nombre; $('#who').hidden = false;
  ver('vPanel'); pintarFiltros(); pintarLista();
  if (S.abierto) pintarDetalle(S.registros.find((x) => x.id === S.abierto));
  return true;
}
$('#btnRefrescar').addEventListener('click', cargar);

function pintarFiltros() {
  const cuenta = (e) => (e === 'Todos' ? S.registros.length : S.registros.filter((r) => r.estado === e).length);
  $('#filters').innerHTML = ['Todos', ...S.estados].map((e) =>
    `<button type="button" class="filter" role="tab" aria-selected="${S.filtro === e}" data-f="${esc(e)}">${esc(e)}<span class="n">${cuenta(e)}</span></button>`).join('');
  $$('.filter').forEach((b) => b.addEventListener('click', () => { S.filtro = b.dataset.f; pintarFiltros(); pintarLista(); }));
}

$('#q').addEventListener('input', (e) => { S.q = e.target.value.trim().toLowerCase(); pintarLista(); });

function pintarLista() {
  const lista = S.registros.filter((r) => (S.filtro === 'Todos' || r.estado === S.filtro) &&
    (!S.q || [r.nombre, r.correo, r.id, r.programa].join(' ').toLowerCase().includes(S.q)));
  $('#list').innerHTML = lista.length ? lista.map((r) => `
    <button type="button" class="row" data-id="${esc(r.id)}" aria-current="${S.abierto === r.id}">
      <span class="nm">${esc(r.nombre)}</span>${chip(r.estado)}
      <span class="meta">${esc(r.id)} · ${esc(r.programa)} · ${esc(fecha(r.fecha))}</span>
    </button>`).join('')
    : `<p class="empty">${S.registros.length ? 'No hay registros con ese filtro.' : 'Aún no hay solicitudes. Cuando alguien llene el formulario de la landing aparecerá aquí.'}</p>`;
  $$('.row').forEach((b) => b.addEventListener('click', () => {
    S.abierto = b.dataset.id; pintarLista(); pintarDetalle(S.registros.find((x) => x.id === S.abierto));
    $('.layout').classList.add('open'); if (matchMedia('(max-width:860px)').matches) window.scrollTo(0, 0);
  }));
}

function pintarDetalle(r) {
  const d = $('#detail');
  if (!r) { d.innerHTML = '<p class="empty">Elige un registro para ver sus datos, cambiar su estado y añadir notas.</p>'; return; }
  d.innerHTML = `
    <button type="button" class="btn ghost sm back" id="btnVolver">← Volver a la lista</button>
    <div class="d-head"><div><h2>${esc(r.nombre)}</h2><span class="id">${esc(r.id)} · Registrado el ${esc(fecha(r.fecha))}</span></div>${chip(r.estado)}</div>
    <dl class="kv">
      <dt>Correo</dt><dd><a href="mailto:${esc(r.correo)}">${esc(r.correo)}</a></dd>
      <dt>Teléfono</dt><dd>${r.telefono ? `<a href="tel:${esc(r.telefono)}">${esc(r.telefono)}</a>` : '<span class="small">No lo proporcionó</span>'}</dd>
      <dt>Programa</dt><dd>${esc(r.programa)}</dd>
    </dl>
    <form id="fUpd" class="stack box" novalidate>
      <h3>Actualizar seguimiento</h3>
      <label>Estado
        <select name="estado">${S.estados.map((e) => `<option${e === r.estado ? ' selected' : ''}>${esc(e)}</option>`).join('')}</select>
      </label>
      <label>Nota <span class="small">(qué pasó y cuál es el siguiente paso)</span>
        <textarea name="nota" maxlength="1000" placeholder="Ej.: Llamé a las 3 p. m., le interesa Booster para su equipo de 8 personas. Enviar propuesta el jueves."></textarea>
      </label>
      <p class="msg" role="status"></p>
      <button class="btn primary" type="submit">Guardar cambios</button>
    </form>
    <div class="box"><h3>Notas (${r.notas.length})</h3>
      ${r.notas.length ? `<ul class="notes">${r.notas.slice().reverse().map((n) => `<li><p>${esc(n.texto)}</p><p class="small">${esc(n.autor)} · ${esc(fecha(n.fecha))}</p></li>`).join('')}</ul>` : '<p class="small">Todavía no hay notas.</p>'}
    </div>
    <div class="box"><h3>Historial</h3>
      <ul class="timeline">${r.historial.slice().reverse().map((h) => `<li><strong>${esc(h.accion)}</strong> · ${esc(h.detalle)}<br><span class="small">${esc(h.quien)} · ${esc(fecha(h.fecha))}</span></li>`).join('')}</ul>
    </div>`;
  $('#btnVolver').addEventListener('click', () => { $('.layout').classList.remove('open'); });
  $('#fUpd').addEventListener('submit', async (e) => {
    e.preventDefault(); const f = e.target; const msg = $('.msg', f);
    msg.className = 'msg'; enviando(f, true);
    const res = await llamar({ accion: 'actualizar', id: r.id, estado: f.estado.value, nota: f.nota.value });
    enviando(f, false);
    if (!res.ok) { msg.textContent = res.error; return; }
    S.registros = S.registros.map((x) => (x.id === r.id ? res.registro : x));
    pintarFiltros(); pintarLista(); pintarDetalle(res.registro);
    const m = $('#fUpd .msg'); m.className = 'msg good'; m.textContent = 'Cambios guardados.';
  });
}

/* Administradores */
const dlg = $('#dlgAdmins');
async function pintarAdmins() {
  const r = await llamar({ accion: 'admins' });
  $('#adminList').innerHTML = r.ok ? r.admins.map((a) => `<li>${esc(a.nombre)} <span class="small">· ${esc(a.usuario)}</span></li>`).join('') : '';
}
$('#btnAdmins').addEventListener('click', () => { pintarAdmins(); dlg.showModal(); });
$('#fAdmin').addEventListener('submit', async (e) => {
  e.preventDefault(); const f = e.target; const msg = $('.msg', f); msg.className = 'msg';
  enviando(f, true);
  const r = await llamar({ accion: 'agregarAdmin', nuevo: { nombre: f.nombre.value, usuario: f.usuario.value, clave: f.clave.value } });
  enviando(f, false);
  if (!r.ok) { msg.textContent = r.error; return; }
  f.reset(); msg.className = 'msg good'; msg.textContent = 'Administrador agregado.'; pintarAdmins();
});

iniciar();
