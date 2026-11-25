/* Conexión con n8n. Si config.js no tiene la URL de n8n, la página funciona en modo demo:
   usa la misma lógica (core.js) y guarda los datos solo en este navegador. */
(function () {
  'use strict';
  const base = String((window.AIA_CONFIG && window.AIA_CONFIG.api) || '').replace(/\/+$/, '');
  const DEMO = !base;
  const KEY = 'aia_demo_db';
  const ahora = () => new Date().toISOString();
  const cargar = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } };
  const guardar = (db) => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* almacenamiento no disponible */ } };

  async function post(ruta, datos) {
    try {
      // Formulario simple (sin cabeceras personalizadas) para evitar la verificación previa de CORS.
      const res = await fetch(`${base}/${ruta}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams({ payload: JSON.stringify(datos) }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok && json.ok === undefined) return { ok: false, error: 'El servidor no respondió como esperábamos.' };
      return json;
    } catch (e) {
      return { ok: false, error: 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.' };
    }
  }

  window.AIAApi = {
    demo: DEMO,
    async registrar(datos) {
      if (!DEMO) return post('aia-registro', datos);
      const db = cargar();
      const r = AIACore.procesarRegistro(db, datos, ahora());
      if (r.ok) AIACore.anotarAviso(db, r.registro.id, false, 'Modo demo: sin conexión con n8n', ahora());
      guardar(db);
      return r.ok ? { ok: true, id: r.registro.id } : { ok: false, errores: r.errores };
    },
    async admin(datos) {
      if (!DEMO) return post('aia-admin', datos);
      const db = cargar();
      const r = AIACore.procesarAdmin(db, datos, ahora());
      guardar(db);
      return r;
    },
  };
})();
