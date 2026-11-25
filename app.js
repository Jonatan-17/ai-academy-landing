/* Campuslands AI Academy · landing
   Contenido y enlaces en un solo lugar para que sea fácil de mantener. */
'use strict';

const WA = '573023647730';
const wa = (msg) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;
const LINKS = {
  inscripcion: wa('Hola, quiero inscribirme en Campuslands AI Academy.'),
  whatsapp:    wa('Hola, quiero hablar con un especialista de AI Academy.'),
  certificado: 'https://campuslands.aiacademy.com.co/',
};
const LEGAL = [
  ['Política de privacidad', 'https://campuslands.aiacademy.com.co/'],
  ['Términos', 'https://campuslands.aiacademy.com.co/'],
];

const CONTENT = {
  who: {
    empresa: 'Llevamos la IA a los procesos de tu empresa con casos de uso reales de tu industria. Te sugerimos empezar por Odyssey.',
    lider: 'Tu equipo aprende con las tareas que ya hace y sale con prompts, guías y agentes listos. Booster o Liftoff son buenos puntos de partida.',
    independiente: 'Aprende a trabajar con IA desde lo básico y aplícalo desde la primera sesión. Ignition o Nebula son tu despegue.',
  },
  benefits: [
    ['Formación práctica', 'Sesiones personalizadas de 4, 8 y 12 horas con casos reales para tu negocio.'],
    ['Entregables listos', 'Banco de prompts, guías operativas y agentes base adaptados a tu industria.'],
    ['Soporte continuo', 'Comunidad privada de WhatsApp y soporte posventa para resolver tus dudas.'],
    ['Rutas flexibles', 'Cursos presenciales y virtuales por niveles, con resultados medibles.'],
  ],
  tools: [
    ['ChatGPT', 'Asistentes', 'Redactar, analizar y crear asistentes personalizados para tus tareas del día a día.'],
    ['Claude', 'Asistentes', 'Trabajar con documentos largos, escribir con criterio y armar proyectos con tus archivos.'],
    ['Gemini', 'Asistentes', 'Usar la IA dentro de Google Workspace: correos, documentos y hojas de cálculo.'],
    ['Microsoft Copilot', 'Asistentes', 'Llevar la IA a Microsoft 365: Word, Excel, Outlook y Teams.'],
    ['Notion AI', 'Productividad', 'Organizar notas, proyectos y documentos con ayuda de la IA dentro de Notion.'],
    ['Midjourney', 'Creatividad', 'Generar imágenes y conceptos visuales a partir de texto para presentaciones y campañas.'],
    ['NotebookLM', 'Investigación', 'Estudiar y resumir tus propias fuentes con respuestas citadas.'],
    ['GitHub Copilot', 'Desarrollo', 'Programar más rápido con sugerencias y explicaciones de código dentro del editor.'],
    ['n8n', 'Automatización', 'Automatizar procesos reales con flujos que conectan tus aplicaciones.'],
    ['Make', 'Automatización', 'Conectar aplicaciones y automatizar flujos sin escribir código.'],
    ['Zapier', 'Automatización', 'Automatizar tareas repetitivas entre las herramientas que ya usas.'],
  ],
  plans: [
    { id:'ignition', name:'Ignition', hours:'4 horas', tag:'Misión 01', cta:'Inscríbete ahora', items:[
      'Comprende el impacto real de la IA en tu industria',
      'Domina la IA generativa de tu elección como asistente diario',
      'Conoce las 10 herramientas de IA más relevantes',
      'Aprende a crear agentes básicos de IA en vivo'] },
    { id:'booster', name:'Booster', hours:'8 horas', tag:'Misión 02', cta:'Inscríbete ahora', items:[
      'Todo Ignition, con enfoque profesional avanzado',
      'Técnicas de prompting para resultados precisos',
      'Domina 2 herramientas de IA a tu elección',
      'Construye agentes personalizados para tu rol'] },
    { id:'liftoff', name:'Liftoff', hours:'12 horas', tag:'Misión 03', cta:'Inscríbete ahora', items:[
      'Todo Booster, enfocado en escalar tu operación',
      'Domina una herramienta de IA adicional elegida',
      'Aprende a automatizar procesos reales con n8n',
      'Diseña flujos automáticos aplicados a tu negocio'] },
    { id:'odyssey', name:'Odyssey', hours:'Personalizado', tag:'Misión 04', cta:'Cotiza ahora', items:[
      'Programa 100 % personalizado para tu empresa',
      'Elige herramientas, duración y profundidad',
      'Casos de uso reales según tu industria y roles',
      'Acompañamiento estratégico con sesiones tácticas'] },
    { id:'nebula', name:'Nebula', hours:'Pregrabado', tag:'Misión 05', cta:'Accede ahora', items:[
      'Contenidos organizados por niveles de aprendizaje',
      'Evaluaciones continuas para medir tu progreso',
      'Acceso flexible 24/7 a materiales, recursos y actualizaciones',
      'Comunidad activa de soporte y aprendizaje colaborativo'] },
  ],
  why: [
    ['La IA ya es estándar operativo', 'Las empresas líderes integran IA en sus procesos diarios; cada semana de espera amplía la brecha competitiva.'],
    ['El costo de esperar se acumula', 'Más horas manuales y más retrabajo frente a competidores que automatizan desde hoy.'],
    ['Tu talento quiere crear, no repetir', 'Los equipos buscan herramientas que liberen tiempo para tareas estratégicas; si no se las das, las buscarán fuera.'],
    ['Efecto compuesto del aprendizaje', 'Cada día sin práctica resta valor acumulado en prompts, agentes y casos listos para escalar.'],
  ],
  cases: [
    { id:'empresario', label:'Empresario / Emprendedor',
      before:'Procesos comerciales manuales, lanzamientos lentos y decisiones a ciegas por falta de contenido y reportes actualizados.',
      after:'Asistentes de IA que crean correos, propuestas y reportes en minutos, con métricas claras para escalar las ventas sin fricción.' },
    { id:'innovacion', label:'Director(a) de Innovación',
      before:'Pilotos desconectados que no escalan y escasa evidencia para justificar la inversión ante la dirección.',
      after:'Talleres intensivos de 4 horas con agentes funcionales, casos de uso claros y métricas de eficiencia listas para presentar.' },
    { id:'independiente', label:'Profesional independiente',
      before:'Horas armando propuestas a mano, seguimiento a clientes que se queda atrás y entregas que se demoran.',
      after:'Prompts estratégicos que generan propuestas, automatizan el seguimiento y entregan resultados personalizados en segundos.' },
    { id:'rrhh', label:'Líder de RR. HH.',
      before:'Inducciones que se repiten una y otra vez, dudas que llegan por todos los canales y retroalimentación que no se mide.',
      after:'Rutas de microlearning con bots que guían, responden dudas y capturan retroalimentación continua de forma automática.' },
  ],
  reviews: [
    { quote:'La formación de 8 horas fue ideal para nuestro equipo. Los casos por industria marcaron la diferencia y resolvieron dudas específicas.',
      who:'Carlos Herrera', role:'Director de Talento, Grupo Andino', stars:4, plan:'Booster' },
  ],
  faqs: [
    ['¿Qué modalidades de formación ofrecen?', 'Formación presencial en las instalaciones de Campuslands, presencial en las instalaciones de tu empresa y virtual. Todas las modalidades mantienen la misma calidad y el mismo contenido.'],
    ['¿Cómo se eligen las fechas de los cursos?', 'Si te inscribes de forma individual, eliges la fecha que mejor te convenga. Para empresas, coordinamos las fechas por WhatsApp para encontrar el momento ideal para todo el equipo.'],
    ['¿Necesito conocimientos previos en IA?', 'No. Los cursos están diseñados desde el «despertar digital» hasta niveles avanzados y se adaptan al nivel de cada participante.'],
    ['¿Qué tipo de certificación recibo?', 'Recibes una certificación oficial por las horas cursadas, que valida tu conocimiento en las herramientas de IA que aprendiste durante la formación.'],
    ['¿Qué materiales están incluidos?', 'Todos los cursos incluyen un banco de prompts especializado. Los de 8 y 12 horas incluyen además agentes personalizados y automatizaciones acordadas según tus necesidades.'],
    ['¿Cómo funcionan los pagos?', 'Muy pronto podrás pagar con Wompi desde la página de precios. Mientras tanto, escríbenos por WhatsApp y coordinamos el pago contigo.'],
  ],
};

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));

/* ---------- Enlaces reales en todos los botones */
$$('[data-link]').forEach((a) => { const u = LINKS[a.dataset.link]; if (u) a.href = u; });
$('#footerLinks').innerHTML = [
  ['Beneficios', '#beneficios'], ['Planes', '#planes'], ['FAQs', '#faqs'],
  ['Herramientas', '#herramientas'], ['Casos de uso', '#casos'], ['Certificado', LINKS.certificado], ...LEGAL,
].map(([t, u]) => `<a href="${u}"${u.startsWith('#') ? '' : ' target="_blank" rel="noopener"'}>${esc(t)}</a>`).join('');

/* ---------- Menú */
const menuBtn = $('#menuBtn'), menu = $('#menu');
menuBtn.addEventListener('click', () => {
  const open = menuBtn.getAttribute('aria-expanded') !== 'true';
  menuBtn.setAttribute('aria-expanded', String(open)); menu.classList.toggle('open', open);
});
$$('a', menu).forEach((a) => a.addEventListener('click', () => { menuBtn.setAttribute('aria-expanded', 'false'); menu.classList.remove('open'); }));

/* ---------- Grupos de opciones accesibles (radio con teclado) */
function radioGroup(group, onPick) {
  const items = $$('[role="radio"]', group);
  items.forEach((b, i) => {
    b.tabIndex = i === 0 ? 0 : -1;
    b.addEventListener('click', () => pick(b));
    b.addEventListener('keydown', (e) => {
      const k = e.key; let j = null;
      if (k === 'ArrowRight' || k === 'ArrowDown') j = (i + 1) % items.length;
      if (k === 'ArrowLeft' || k === 'ArrowUp') j = (i - 1 + items.length) % items.length;
      if (j !== null) { e.preventDefault(); items[j].focus(); pick(items[j]); }
    });
  });
  function pick(b) {
    items.forEach((x) => { x.setAttribute('aria-checked', String(x === b)); x.tabIndex = x === b ? 0 : -1; });
    onPick(b);
  }
}

/* ---------- 1. Hero que reacciona: perfil + paralaje */
const whoMsg = $('#whoMsg');
let whoChoice = null;
radioGroup($('#who'), (b) => {
  whoChoice = b.dataset.who;
  whoMsg.classList.add('swap');
  setTimeout(() => { whoMsg.textContent = CONTENT.who[whoChoice]; whoMsg.classList.remove('swap'); }, reduce ? 0 : 180);
  presetRecommender(whoChoice);
});
const heroMax = $('#heroMax'), heroVisual = $('#heroVisual');
if (!reduce) {
  const move = (x, y) => {
    const r = heroVisual.getBoundingClientRect();
    const dx = (x - (r.left + r.width / 2)) / r.width, dy = (y - (r.top + r.height / 2)) / r.height;
    heroMax.style.transform = `translate(${dx * 18}px, ${dy * 14}px) rotate(${dx * 4}deg)`;
    starShift.x = dx * 14; starShift.y = dy * 10;
  };
  window.addEventListener('pointermove', (e) => move(e.clientX, e.clientY), { passive: true });
  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma == null) return;
    const r = heroVisual.getBoundingClientRect();
    move(r.left + r.width / 2 + e.gamma * 6, r.top + r.height / 2 + (e.beta - 40) * 4);
  }, { passive: true });
}

/* Campo de estrellas liviano (se pausa fuera de pantalla) */
const starShift = { x: 0, y: 0 };
(function stars() {
  const c = $('#stars'); const ctx = c.getContext('2d'); let w, h, pts = [], running = true, raf;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  function size() {
    w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(Math.min(140, (w * h) / 9000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + .3, z: Math.random() * .8 + .2, t: Math.random() * 6 }));
  }
  function draw(time) {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      const a = reduce ? .7 : .45 + .35 * Math.sin(time / 900 + p.t);
      ctx.fillStyle = `rgba(220,214,234,${a * p.z})`;
      ctx.beginPath(); ctx.arc(p.x + starShift.x * p.z, p.y + starShift.y * p.z, p.r, 0, 6.283); ctx.fill();
    }
    if (running && !reduce) raf = requestAnimationFrame(draw);
  }
  size(); draw(0);
  window.addEventListener('resize', () => { size(); if (reduce) draw(0); });
  new IntersectionObserver(([e]) => { running = e.isIntersecting; if (running && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); } }).observe(c);
})();

/* ---------- Beneficios */
$('#benefitCards').innerHTML = CONTENT.benefits.map(([t, d], i) =>
  `<article class="card reveal"><span class="step">${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('');

/* ---------- 4. Exploración libre: constelación de herramientas */
(function constellation() {
  const root = $('#constellation'), card = $('#toolCard');
  const tools = CONTENT.tools; const n = tools.length;
  root.innerHTML = `<div class="core"><img src="assets/casco.webp" alt="" width="512" height="411" loading="lazy" decoding="async"></div>` +
    tools.map(([name], i) => {
      const ring = i % 2 === 0 ? 42 : 27;                // dos órbitas
      const ang = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = 50 + ring * Math.cos(ang), y = 50 + ring * Math.sin(ang);
      return `<button type="button" class="star-btn" role="listitem" aria-pressed="false" data-i="${i}" style="left:${x}%;top:${y}%">${esc(name)}</button>`;
    }).join('');
  $$('.star-btn', root).forEach((b) => b.addEventListener('click', () => {
    $$('.star-btn', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    const [name, cat, desc] = tools[+b.dataset.i];
    card.innerHTML = `<p class="cat">${esc(cat)}</p><h3>${esc(name)}</h3><p>${esc(desc)}</p>`;
    card.classList.remove('pop'); void card.offsetWidth; card.classList.add('pop');
  }));
})();

/* ---------- Planes */
$('#plans').innerHTML = CONTENT.plans.map((p) => `
  <article class="plan reveal" id="plan-${p.id}">
    <span class="tag">${esc(p.tag)}</span>
    <h3>${esc(p.name)}</h3>
    <span class="hours">${esc(p.hours)}</span>
    <ul>${p.items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
    <a class="btn btn-primary" href="${wa(`Hola, quiero inscribirme en la misión ${p.name} de AI Academy.`)}" target="_blank" rel="noopener">${esc(p.cta)}</a>
  </article>`).join('');

/* Carrusel de planes en móvil: puntos sincronizados con el desplazamiento */
const plansEl = $('#plans'), dots = $('#planDots');
dots.innerHTML = CONTENT.plans.map((p, i) => `<button type="button" aria-label="Ver ${esc(p.name)}" aria-current="${i === 0}"></button>`).join('');
function scrollToPlan(i, smooth = true) {
  const card = plansEl.children[i]; if (!card) return;
  plansEl.scrollTo({ left: card.offsetLeft - (plansEl.clientWidth - card.clientWidth) / 2, behavior: smooth && !reduce ? 'smooth' : 'auto' });
}
$$('button', dots).forEach((b, i) => b.addEventListener('click', () => scrollToPlan(i)));
plansEl.addEventListener('scroll', () => {
  const mid = plansEl.scrollLeft + plansEl.clientWidth / 2; let best = 0, d = Infinity;
  [...plansEl.children].forEach((c, i) => { const dd = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid); if (dd < d) { d = dd; best = i; } });
  $$('button', dots).forEach((b, i) => b.setAttribute('aria-current', String(i === best)));
}, { passive: true });

/* ---------- 3. Recomendador de misión */
const answers = {};
const qs = $$('.rec-q');
qs.forEach((q, i) => { if (i > 0) q.classList.add('locked'); radioGroup(q, (b) => { answers[q.dataset.q] = b.dataset.v; if (qs[i + 1]) qs[i + 1].classList.remove('locked'); recommend(); }); });
function presetRecommender(who) {
  const map = { empresa: 'grande', lider: 'pequeno', independiente: 'solo' };
  const b = $(`.rec-q[data-q="equipo"] [data-v="${map[who]}"]`); if (b) b.click();
}
function recommend() {
  if (!answers.equipo || !answers.tiempo || !answers.objetivo) return;
  let id = 'booster', why = '';
  const { equipo, tiempo, objetivo } = answers;
  if (tiempo === 'libre') { id = 'nebula'; why = 'Quieres avanzar a tu ritmo: Nebula es pregrabado y lo tomas cuando puedas.'; }
  else if (objetivo === 'transformar' || equipo === 'grande') { id = 'odyssey'; why = 'Necesitas llevar la IA a los procesos de la empresa: Odyssey se diseña a la medida de tu equipo.'; }
  else if (tiempo === '4') { id = 'ignition'; why = 'Tienes medio día y quieres despegar: Ignition dura 4 horas.'; }
  else if (tiempo === '8') { id = 'booster'; why = 'Tienes un día para impulsar a tu equipo: Booster dura 8 horas.'; }
  else { id = 'liftoff'; why = 'Quieren profundizar en varias sesiones: Liftoff dura 12 horas.'; }
  const p = CONTENT.plans.find((x) => x.id === id);
  const box = $('#recResult'); box.hidden = false;
  box.innerHTML = `<img src="assets/max-aprobando.webp" alt="" width="439" height="700" loading="lazy" decoding="async">
    <div><span class="pill">Tu misión</span><h3>${esc(p.name)} · ${esc(p.hours)}</h3><p class="why-pick">${esc(why)}</p>
    <div class="cta-row"><a class="btn btn-primary" href="${wa(`Hola, el recomendador me sugirió la misión ${p.name}. Quiero inscribirme.`)}" target="_blank" rel="noopener">Inscribirme en ${esc(p.name)}</a>
    <a class="btn btn-ghost" href="#plan-${p.id}">Ver la misión</a></div></div>`;
  $$('.plan').forEach((el) => el.classList.toggle('match', el.id === `plan-${id}`));
  scrollToPlan(CONTENT.plans.findIndex((x) => x.id === id));
}

/* ---------- ¿Por qué ahora? */
$('#why').innerHTML = CONTENT.why.map(([t, d], i) => `<article class="card reveal"><span class="step">${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join('');

/* ---------- Antes / después */
(function cases() {
  const tabs = $('#caseTabs'), ba = $('#ba'), range = $('#baRange');
  tabs.innerHTML = CONTENT.cases.map((c, i) => `<button type="button" class="tab" role="tab" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">${esc(c.label)}</button>`).join('');
  const show = (i) => {
    $$('.tab', tabs).forEach((t, j) => { t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
    $('#baBefore').textContent = CONTENT.cases[i].before; $('#baAfter').textContent = CONTENT.cases[i].after;
  };
  $$('.tab', tabs).forEach((t, i) => {
    t.addEventListener('click', () => show(i));
    t.addEventListener('keydown', (e) => {
      const n = CONTENT.cases.length; let j = null;
      if (e.key === 'ArrowRight') j = (i + 1) % n; if (e.key === 'ArrowLeft') j = (i - 1 + n) % n;
      if (j !== null) { e.preventDefault(); $$('.tab', tabs)[j].focus(); show(j); }
    });
  });
  range.addEventListener('input', () => ba.style.setProperty('--pos', range.value + '%'));
  show(0);
})();

/* ---------- Reseñas y FAQs */
$('#reviews').innerHTML = CONTENT.reviews.map((r) => `<figure class="review reveal">
  <div class="stars-row" role="img" aria-label="${r.stars} de 5 estrellas">${'★'.repeat(r.stars)}<span class="off">${'★'.repeat(5 - r.stars)}</span></div>
  <blockquote>“${esc(r.quote)}”</blockquote>
  <figcaption><strong>${esc(r.who)}</strong><span>${esc(r.role)}</span>${r.plan ? `<em class="plan-tag">Misión ${esc(r.plan)}</em>` : ''}</figcaption></figure>`).join('');
$('#faqList').innerHTML = CONTENT.faqs.map(([q, a]) => `<details class="faq"><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
if (!CONTENT.reviews.length) $('#resenas').hidden = true;
if (!CONTENT.faqs.length) $('#faqs').hidden = true;

/* ---------- 2. Recorrido narrativo: progreso del viaje + revelado */
(function journey() {
  const sections = $$('main section[data-stage]').filter((s) => !s.hidden);
  const stages = []; sections.forEach((s) => { if (!stages.find((x) => x.name === s.dataset.stage)) stages.push({ name: s.dataset.stage, el: s }); });
  const list = $('#journeySteps');
  list.innerHTML = stages.map((s, i) => `<li><a href="#${s.el.id}"><span class="dot"></span><span class="lbl">${String(i + 1).padStart(2, '0')} · ${esc(s.name)}</span></a></li>`).join('');
  const lis = $$('li', list), fill = $('#journeyFill'), mfill = $('#journeyMobileFill'), j = $('.journey');
  const topbar = $('#topbar'), dock = $('#dock'), navLinks = $$('.menu a[href^="#"]');
  let ticking = false;
  function update() {
    ticking = false;
    const sc = window.scrollY, max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? sc / max : 0;
    fill.style.height = (p * 100) + '%'; mfill.style.width = (p * 100) + '%';
    topbar.classList.toggle('solid', sc > 40);
    j.classList.toggle('show', sc > innerHeight * .5);
    dock.classList.toggle('show', sc > innerHeight * .6);
    let cur = 0; stages.forEach((s, i) => { if (s.el.getBoundingClientRect().top < innerHeight * .45) cur = i; });
    lis.forEach((li, i) => { li.classList.toggle('on', i === cur); li.classList.toggle('done', i < cur); });
    const id = stages[cur].el.id; navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  $$('.reveal').forEach((el) => io.observe(el));
})();
