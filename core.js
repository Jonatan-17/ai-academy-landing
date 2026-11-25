/* Campuslands AI Academy · Lógica de registros y seguimiento.
   El mismo código corre en n8n (nodos Code) y en el modo demo del navegador,
   así ambos validan y guardan exactamente igual. */
(function (root) {
  'use strict';

  const ESTADOS = ['Nuevo', 'Contactado', 'En seguimiento', 'Cerrado'];
  const PROGRAMAS = ['Ignition', 'Booster', 'Liftoff', 'Odyssey', 'Nebula', 'Aún no lo sé'];

  /* SHA-256 en JavaScript puro (sin dependencias, funciona en n8n Cloud y en el navegador) */
  function sha256(ascii) {
    const rr = (v, a) => (v >>> a) | (v << (32 - a));
    const maxWord = 2 ** 32; let result = '';
    const words = []; const bitLen = ascii.length * 8;
    const hash = []; const k = [];
    let primeCounter = 0; const isComposite = {};
    for (let c = 2; primeCounter < 64; c++) {
      if (!isComposite[c]) {
        for (let i = 0; i < 313; i += c) isComposite[i] = c;
        hash[primeCounter] = (c ** 0.5 * maxWord) | 0;
        k[primeCounter++] = (c ** (1 / 3) * maxWord) | 0;
      }
    }
    const bytes = unescape(encodeURIComponent(ascii));
    let s = bytes + '\x80';
    while (s.length % 64 - 56) s += '\x00';
    for (let i = 0; i < s.length; i++) {
      const j = s.charCodeAt(i);
      words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    const bl = bytes.length * 8;
    words[words.length] = (bl / maxWord) | 0;
    words[words.length] = bl;
    let h = hash.slice(0, 8);
    for (let j = 0; j < words.length;) {
      const w = words.slice(j, (j += 16)); const old = h;
      h = h.slice(0, 8);
      for (let i = 0; i < 64; i++) {
        const w15 = w[i - 15], w2 = w[i - 2];
        const a = h[0], e = h[4];
        const t1 = h[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & h[5]) ^ (~e & h[6])) + k[i] +
          (w[i] = i < 16 ? w[i] : (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0);
        const t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & h[1]) ^ (a & h[2]) ^ (h[1] & h[2]));
        h = [(t1 + t2) | 0].concat(h); h[4] = (h[4] + t1) | 0; h.length = 8;
      }
      for (let i = 0; i < 8; i++) h[i] = (h[i] + old[i]) | 0;
    }
    for (let i = 0; i < 8; i++) for (let j = 3; j + 1; j--) {
      const b = (h[i] >> (j * 8)) & 255; result += (b < 16 ? '0' : '') + b.toString(16);
    }
    void bitLen; return result;
  }

  const limpiar = (v) => String(v == null ? '' : v).trim().replace(/\s+/g, ' ');
  const sal = () => Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const escHtml = (t) => String(t).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  function prepararDb(db) {
    if (!Array.isArray(db.registros)) db.registros = [];
    if (!Array.isArray(db.admins)) db.admins = [];
    if (typeof db.secuencia !== 'number') db.secuencia = 0;
    return db;
  }

  /* ---------- 01 · Formulario */
  function validarRegistro(d) {
    d = d || {};
    const errores = {};
    const nombre = limpiar(d.nombre);
    const correo = limpiar(d.correo).toLowerCase();
    const programa = limpiar(d.programa);
    const telefono = String(d.telefono == null ? '' : d.telefono).replace(/[\s().-]/g, '');
    if (nombre.length < 3 || nombre.length > 80 || !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ' .-]*$/.test(nombre) || !/\s/.test(nombre))
      errores.nombre = 'Escribe tu nombre y apellido, solo con letras.';
    if (correo.length > 120 || !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(correo))
      errores.correo = 'Escribe un correo válido, por ejemplo nombre@empresa.com.';
    if (!PROGRAMAS.includes(programa))
      errores.programa = 'Elige un programa de la lista.';
    if (telefono && !/^\+?\d{7,15}$/.test(telefono))
      errores.telefono = 'El teléfono debe tener entre 7 y 15 dígitos.';
    if (limpiar(d.sitio_web)) errores.formulario = 'No pudimos procesar la solicitud.'; // campo trampa para bots
    return { ok: Object.keys(errores).length === 0, errores, datos: { nombre, correo, programa, telefono } };
  }

  function procesarRegistro(db, body, ahora) {
    prepararDb(db);
    const v = validarRegistro(body);
    if (!v.ok) return { ok: false, errores: v.errores };
    db.secuencia += 1;
    const registro = {
      id: 'AIA-' + String(db.secuencia).padStart(4, '0'),
      fecha: ahora,
      ...v.datos,
      estado: 'Nuevo',
      notas: [],
      historial: [{ fecha: ahora, quien: 'Formulario web', accion: 'Registro creado', detalle: 'Estado inicial: Nuevo' }],
    };
    db.registros = db.registros.concat([registro]);
    const lineas = [
      '<b>🚀 Nueva solicitud de información · AI Academy</b>',
      '',
      `<b>Nombre:</b> ${escHtml(registro.nombre)}`,
      `<b>Correo:</b> ${escHtml(registro.correo)}`,
      `<b>Programa:</b> ${escHtml(registro.programa)}`,
    ];
    if (registro.telefono) lineas.push(`<b>Teléfono:</b> ${escHtml(registro.telefono)}`);
    lineas.push('', `Registro ${registro.id} · Estado: Nuevo`);
    return { ok: true, registro, mensaje: lineas.join('\n') };
  }

  function anotarAviso(db, id, enviado, detalle, ahora) {
    prepararDb(db);
    db.registros = db.registros.map((r) => r.id !== id ? r : {
      ...r,
      historial: r.historial.concat([{ fecha: ahora, quien: 'n8n', accion: enviado ? 'Aviso enviado por Telegram' : 'Aviso por Telegram no enviado', detalle }]),
    });
  }

  /* ---------- 03 · Panel de administración */
  const publicoAdmin = (a) => ({ usuario: a.usuario, nombre: a.nombre });

  function autenticar(db, usuario, clave) {
    const u = limpiar(usuario).toLowerCase();
    const a = db.admins.find((x) => x.usuario === u);
    if (!a || a.hash !== sha256(a.sal + ':' + String(clave || ''))) return null;
    return a;
  }

  function crearAdmin(db, { nombre, usuario, clave }) {
    nombre = limpiar(nombre); usuario = limpiar(usuario).toLowerCase(); clave = String(clave || '');
    if (nombre.length < 3) return 'Escribe el nombre del administrador.';
    if (!/^[a-z0-9._-]{3,30}$/.test(usuario)) return 'El usuario debe tener entre 3 y 30 caracteres, sin espacios.';
    if (clave.length < 8) return 'La contraseña debe tener al menos 8 caracteres.';
    if (db.admins.some((x) => x.usuario === usuario)) return 'Ese usuario ya existe.';
    const s = sal();
    db.admins = db.admins.concat([{ nombre, usuario, sal: s, hash: sha256(s + ':' + clave) }]);
    return null;
  }

  function procesarAdmin(db, body, ahora) {
    prepararDb(db);
    body = body || {};
    const accion = body.accion;

    if (accion === 'estado') return { ok: true, configurado: db.admins.length > 0 };

    if (accion === 'configurar') {
      if (db.admins.length > 0) return { ok: false, error: 'El panel ya está configurado.' };
      const e = crearAdmin(db, body.nuevo || {});
      return e ? { ok: false, error: e } : { ok: true };
    }

    const admin = autenticar(db, body.usuario, body.clave);
    if (!admin) return { ok: false, error: 'Usuario o contraseña incorrectos.', auth: false };

    if (accion === 'entrar') return { ok: true, admin: publicoAdmin(admin) };

    if (accion === 'listar') {
      const registros = db.registros.slice().sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
      return { ok: true, admin: publicoAdmin(admin), registros, estados: ESTADOS };
    }

    if (accion === 'actualizar') {
      const r = db.registros.find((x) => x.id === body.id);
      if (!r) return { ok: false, error: 'No encontramos ese registro.' };
      const estado = limpiar(body.estado);
      const nota = String(body.nota == null ? '' : body.nota).trim();
      if (estado && !ESTADOS.includes(estado)) return { ok: false, error: 'Estado no válido.' };
      if (nota.length > 1000) return { ok: false, error: 'La nota no puede superar 1000 caracteres.' };
      const cambiaEstado = estado && estado !== r.estado;
      if (!cambiaEstado && !nota) return { ok: false, error: 'No hay cambios para guardar.' };
      const quien = `${admin.nombre} (${admin.usuario})`;
      const historial = r.historial.slice(); const notas = r.notas.slice();
      if (cambiaEstado) historial.push({ fecha: ahora, quien, accion: 'Cambio de estado', detalle: `${r.estado} → ${estado}` });
      if (nota) { notas.push({ fecha: ahora, autor: quien, texto: nota }); historial.push({ fecha: ahora, quien, accion: 'Nota añadida', detalle: nota }); }
      const actualizado = { ...r, estado: cambiaEstado ? estado : r.estado, notas, historial };
      db.registros = db.registros.map((x) => (x.id === r.id ? actualizado : x));
      return { ok: true, registro: actualizado };
    }

    if (accion === 'agregarAdmin') {
      const e = crearAdmin(db, body.nuevo || {});
      return e ? { ok: false, error: e } : { ok: true, admins: db.admins.map(publicoAdmin) };
    }

    if (accion === 'admins') return { ok: true, admins: db.admins.map(publicoAdmin) };

    return { ok: false, error: 'Acción no reconocida.' };
  }

  function leerCuerpo(body) {
    let b = body;
    if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
    if (b && typeof b.payload === 'string') { try { b = JSON.parse(b.payload); } catch (e) { b = {}; } }
    return b || {};
  }

  const api = { ESTADOS, PROGRAMAS, sha256, validarRegistro, procesarRegistro, anotarAviso, procesarAdmin, leerCuerpo };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AIACore = api;
})(typeof self !== 'undefined' ? self : this);
