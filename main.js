/* TalentX landing — behaviour */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canAnimate = !!(window.gsap && window.ScrollTrigger) && !reduce;
  if (!canAnimate) root.classList.remove('motion');

  /* ---------- sample data (synthetic) ---------- */
  const PEOPLE = [
    { n: 'Amara Okafor', s: 'AO', r: 'Senior Product Designer', m: 94, a: 'a1', st: 'Interview', when: 'Today' },
    { n: 'Daniel Reyes', s: 'DR', r: 'Product Designer', m: 88, a: 'a2', st: 'Screening', when: 'Today' },
    { n: 'Lina Haddad', s: 'LH', r: 'UX Designer', m: 81, a: 'a3', st: 'Screening', when: 'Yesterday' },
    { n: 'Marcus Chen', s: 'MC', r: 'Interaction Designer', m: 76, a: 'a4', st: 'Applied', when: 'Yesterday' },
    { n: 'Sofia Petrov', s: 'SP', r: 'Product Designer', m: 72, a: 'a5', st: 'Applied', when: '2 days ago' },
    { n: 'Noah Bennett', s: 'NB', r: 'Visual Designer', m: 68, a: 'a6', st: 'Applied', when: '2 days ago' },
  ];
  const PORT = {
    AO: { bg: '#F4E3C3', skin: '#8A5A3C', hair: '#1E1512', top: '#178C7D', st: 'afro' },
    DR: { bg: '#D6E9E4', skin: '#D8A27A', hair: '#2A1D17', top: '#172321', st: 'short' },
    LH: { bg: '#F3DDD0', skin: '#EFC4A0', hair: '#5B3A24', top: '#9CCFC3', st: 'long' },
    MC: { bg: '#E4E9E7', skin: '#C98E64', hair: '#15110F', top: '#5F6D67', st: 'short' },
    SP: { bg: '#F6E6C4', skin: '#E8B891', hair: '#9A4B2A', top: '#105D55', st: 'bun' },
    NB: { bg: '#DDE3E0', skin: '#F1CDAA', hair: '#C8A15B', top: '#E9B44C', st: 'short' },
  };
  function portrait(k) {
    const p = PORT[k]; if (!p) return '';
    const back = p.st === 'afro' ? '<circle cx="32" cy="24" r="16.5" fill="' + p.hair + '"/>'
      : p.st === 'long' ? '<path d="M18 30c0-11 5-18 14-18s14 7 14 18v17H18z" fill="' + p.hair + '"/>'
      : p.st === 'bun' ? '<circle cx="32" cy="10.5" r="6" fill="' + p.hair + '"/>' : '';
    const front = p.st === 'afro' ? '<path d="M22 24c1-6 5-8 10-8s9 2 10 8c-3-3-6-4-10-4s-7 1-10 4z" fill="' + p.hair + '"/>'
      : '<path d="M21.5 27c-.5-9 4-15 10.5-15s11 6 10.5 15c-2.5-5-6-7-10.5-7s-8 2-10.5 7z" fill="' + p.hair + '"/>';
    return '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" fill="' + p.bg + '"/><path d="M6 66c0-15 11-22 26-22s26 7 26 22z" fill="' + p.top + '"/><rect x="27" y="36" width="10" height="11" rx="4" fill="' + p.skin + '"/><rect x="27" y="36" width="10" height="5" fill="rgba(0,0,0,.14)"/>' + back + '<ellipse cx="32" cy="28" rx="10" ry="11.5" fill="' + p.skin + '"/>' + front + '<circle cx="28" cy="29" r="1.1" fill="#1E1512"/><circle cx="36" cy="29" r="1.1" fill="#1E1512"/><path d="M29 34.2c1.8 1.4 4.2 1.4 6 0" stroke="#1E1512" stroke-width="1" stroke-linecap="round" fill="none" opacity=".65"/></svg>';
  }
  const av = (p, c = '') => `<span class="av ${p.a} ${c}">${p.s}</span>`;
  const short = p => p.n.split(' ')[0] + ' ' + p.n.split(' ')[1][0] + '.';

  const R = {
    discover: () => PEOPLE.map((p, i) => `<div class="row">${av(p)}<span><b>${p.n}</b> <span class="f-mute">· ${p.r}</span></span><span class="when">${p.when}</span><em class="chip ${i < 2 ? 'new' : ''}">${i < 2 ? 'New' : 'Applied'}</em></div>`).join(''),
    rank: () => PEOPLE.slice(0, 5).map((p, i) => `<li class="rk ${i === 0 ? 'me' : ''}"><span class="n">${i + 1}</span>${av(p)}<span>${short(p)}</span><b>${p.m}</b></li>`).join(''),
    candtable: () => `<div class="ctr th"><span>Candidate</span><span>Match</span><span>Status</span></div>` + PEOPLE.map((p, i) => `<div class="ctr ${i === 0 ? 'sel' : ''}"><span class="who">${av(p)}<span><b>${p.n}</b><em>${p.r}</em></span></span><span class="mt">${p.m}%</span><span><em class="chip ${p.st === 'Interview' ? 'g' : ''}">${p.st}</em></span></div>`).join(''),
    board4: () => board([['Applied', [3, 4, 5]], ['Screening', [1, 2]], ['Interview', [0]], ['Offer', []]], 4),
    board5: () => boardLg(),
  };
  function boardLg() {
    const cols = [['Applied', [3, 4, 5]], ['Screening', [1, 2]], ['Interview', [0, 6]], ['Offer', [7]]];
    const extra = [null, null, null, null, null, null, { n: 'Hana Ito', s: 'HI', r: 'Product Designer', m: 79, a: 'a2' }, { n: 'Elias Moreau', s: 'EM', r: 'Senior Product Designer', m: 90, a: 'a6' }];
    const get = i => extra[i] || PEOPLE[i];
    return cols.map(([t, ids]) => `<div class="col"><h5>${t}<span>${ids.length}</span></h5>${ids.map(i => { const p = get(i); return `<div class="kc kc-lg ${p === PEOPLE[0] ? 'hl' : ''}">${av(p)}<span><b>${p.n.split(' ')[0]} ${p.n.split(' ')[1][0]}.</b><em>${p.m}% match</em></span></div>`; }).join('')}</div>`).join('');
  }
  function board(cols, n) {
    const cnt = n === 5 ? [3, 2, 1, 1, 0] : [3, 2, 1, 0];
    return cols.map(([t, ids], ci) => {
      let list = ids.map(i => PEOPLE[i]);
      if (n === 5 && t === 'Final review') list = [PEOPLE[2]];
      if (n === 5 && t === 'Interview') list = [PEOPLE[0], PEOPLE[1]];
      if (n === 5 && t === 'Screening') list = [PEOPLE[3]];
      if (n === 5 && t === 'Applied') list = [PEOPLE[4], PEOPLE[5], PEOPLE[3]].slice(0, 3);
      if (n === 5 && t === 'Offer') list = [];
      if (n === 4 && t === 'Interview') list = [PEOPLE[0]];
      return `<div class="col"><h5>${t}<span>${n === 5 ? cnt[ci] : list.length}</span></h5>${list.map((p, i) => `<div class="kc ${p === PEOPLE[0] && t !== 'Applied' ? 'hl' : ''}">${av(p)}${short(p)}</div>`).join('')}</div>`;
    }).join('');
  }
  $$('[data-render]').forEach(el => { el.innerHTML = R[el.dataset.render]() });
  $$('.av').forEach(el => { const svg = portrait(el.textContent.trim()); if (svg) { el.innerHTML = svg; el.classList.add('has-img'); } });

  /* ---------- org switcher ---------- */
  const ORGS = [
    { n: 'Northwind Talent', i: 'N', m: [[0, 'Admin'], [1, 'Recruiter'], [2, 'HR Manager'], [3, 'Hiring Manager']] },
    { n: 'Halden Group', i: 'H', m: [[4, 'Admin'], [2, 'Recruiter'], [5, 'Recruiter'], [1, 'Hiring Manager']] },
    { n: 'Orbit Labs', i: 'O', m: [[3, 'Admin'], [0, 'HR Manager'], [5, 'Hiring Manager'], [4, 'Recruiter']] },
  ];
  const orgSel = $('#orgSel'), orgList = $('#orgList'), members = $('#members');
  let orgCur = 0;
  function renderOrg(i, animate) {
    orgCur = i;
    const o = ORGS[i];
    $('#orgName').textContent = o.n; $('#orgIco').textContent = o.i;
    const html = o.m.map(([pi, role]) => { const p = PEOPLE[pi]; return `<div class="mem">${av(p, 'av-lg')}<span><b>${p.n}</b><em>${p.r}</em></span><span class="role-pill">${role}</span></div>`; }).join('');
    if (animate && canAnimate) {
      gsap.to(members, { opacity: 0, duration: .15, onComplete() { members.innerHTML = html; gsap.to(members, { opacity: 1, duration: .35 }); } });
    } else members.innerHTML = html;
    $$('li', orgList).forEach((li, k) => li.setAttribute('aria-selected', k === i));
  }
  orgList.innerHTML = ORGS.map((o, i) => `<li role="option" tabindex="0" data-i="${i}"><span class="org-ico">${o.i}</span>${o.n}<svg class="ic"><use href="#check"/></svg></li>`).join('');
  const orgToggle = open => { orgList.hidden = !open; orgSel.setAttribute('aria-expanded', open); };
  orgSel.addEventListener('click', () => orgToggle(orgList.hidden));
  orgList.addEventListener('click', e => { const li = e.target.closest('li'); if (!li) return; renderOrg(+li.dataset.i, true); orgToggle(false); orgSel.focus(); });
  orgList.addEventListener('keydown', e => {
    const li = e.target.closest('li'); if (!li) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); (li.nextElementSibling || li.parentElement.firstElementChild).focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); (li.previousElementSibling || li.parentElement.lastElementChild).focus(); }
  });
  document.addEventListener('click', e => { if (!orgList.hidden && !e.target.closest('.org-top')) orgToggle(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (!orgList.hidden) { orgToggle(false); orgSel.focus(); } closeDD(); } });
  renderOrg(0, false);

  /* ---------- nav ---------- */
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const dds = $$('.dd');
  let ddTimer;
  function closeDD(except) { dds.forEach(d => { if (d !== except) { d.classList.remove('open'); $('.dd-btn', d).setAttribute('aria-expanded', 'false'); } }); }
  function openDD(d) { clearTimeout(ddTimer); closeDD(d); d.classList.add('open'); $('.dd-btn', d).setAttribute('aria-expanded', 'true'); }
  dds.forEach(d => {
    const b = $('.dd-btn', d);
    d.addEventListener('pointerenter', () => openDD(d));
    d.addEventListener('pointerleave', () => { ddTimer = setTimeout(() => closeDD(), 160); });
    b.addEventListener('click', () => d.classList.contains('open') ? closeDD() : openDD(d));
    d.addEventListener('focusout', e => { if (!d.contains(e.relatedTarget)) closeDD(); });
  });
  $$('.dd-panel a').forEach(a => a.addEventListener('click', () => closeDD()));

  /* ---------- smooth scroll ---------- */
  let lenis = null;
  if (canAnimate && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToY = (y, d = 1.4) => lenis ? lenis.scrollTo(y, { duration: d, easing: t => 1 - Math.pow(1 - t, 4) }) : scrollTo({ top: y });
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') { e.preventDefault(); return; }
    const t = $(id); if (!t) return;
    e.preventDefault();
    const top = t.getBoundingClientRect().top + scrollY;
    const off = (id === '#process' || id === '#top') ? 0 : -(parseInt(getComputedStyle(root).getPropertyValue('--nav')) || 76) + 1;
    scrollToY(Math.max(0, top + off));
  }));

  /* ---------- helpers ---------- */
  function splitWords(el, cls) {
    const walk = node => {
      [...node.childNodes].forEach(c => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(tok => {
            if (!tok) return;
            if (/^\s+$/.test(tok)) { frag.appendChild(document.createTextNode(' ')); return; }
            const s = document.createElement('span'); s.className = cls; s.textContent = tok; frag.appendChild(s);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1) walk(c);
      });
    };
    walk(el);
    return $$('.' + cls, el);
  }
  function splitMask(el) {
    const label = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', label);
    const words = splitWords(el, 'mi');
    words.forEach(w => { const m = document.createElement('span'); m.className = 'mw'; m.setAttribute('aria-hidden', 'true'); w.replaceWith(m); m.appendChild(w); });
    el.classList.add('is-split');
    return $$('.mi', el);
  }
  const lenOf = el => (el.getTotalLength ? el.getTotalLength() : 0);
  function drawSet(els) { els.forEach(el => { const l = lenOf(el); el.style.strokeDasharray = l; el.style.strokeDashoffset = l; }); }

  /* ---------- static (no-motion) wiring that must still work ---------- */
  // Process stages
  const stageTitles = ['Create job', 'Applications', 'Job profile and ranking criteria', 'Hiring pipeline'];
  const steps = $$('.step'), panels = $$('.pv-panel'), railFill = $('#railFill'), pvTitle = $('#pvTitle');
  let cur = -1;
  function setStage(i, instant) {
    if (i === cur) return;
    const prev = cur; cur = i;
    steps.forEach((s, k) => { s.classList.toggle('is-active', k === i); s.setAttribute('aria-selected', k === i); s.tabIndex = k === i ? 0 : -1; });
    pvTitle.textContent = stageTitles[i];
    const next = panels[i], old = panels[prev];
    const anim = canAnimate && !instant;
    if (old) {
      if (anim) gsap.to(old, { opacity: 0, y: -10, duration: .3, ease: 'power2.in', onComplete() { old.classList.remove('is-on'); gsap.set(old, { clearProps: 'all' }); } });
      else old.classList.remove('is-on');
    }
    next.classList.add('is-on');
    if (anim) {
      gsap.fromTo(next, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .8, ease: 'expo.out', delay: old ? .12 : 0 });
      gsap.fromTo($$('.fld,.row,.cmp-h,.cmp-r,.col,.thread>div,.pv-sub', next), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .7, stagger: .05, ease: 'expo.out', delay: .18 });
    }
  }
  setStage(0, true);
  let procST = null;
  steps.forEach((s, i) => {
    s.addEventListener('click', () => {
      if (procST) { scrollToY(procST.start + ((i + .5) / 4) * (procST.end - procST.start), 1.2); } else setStage(i, true);
    });
    s.addEventListener('keydown', e => {
      let k = null;
      if (e.key === 'ArrowRight') k = (i + 1) % 4; if (e.key === 'ArrowLeft') k = (i + 3) % 4;
      if (k !== null) { e.preventDefault(); steps[k].focus(); steps[k].click(); }
    });
  });

  // Showcase tabs
  const tabs = $$('.tab'), sps = $$('.app-panel'), navLi = $$('.app-side li[data-nav]');
  const tabDesc = ['See every job and where it stands across the hiring lifecycle.', 'Every candidate with their profile, resume and cover letter in one place.', 'Follow candidates through every stage of your hiring process.'];
  let tabCur = 0;
  function setTab(i) {
    if (i === tabCur) return;
    const old = sps[tabCur], next = sps[i]; tabCur = i;
    tabs.forEach((t, k) => { t.classList.toggle('is-active', k === i); t.setAttribute('aria-selected', k === i); t.tabIndex = k === i ? 0 : -1; });
    $('#appTitle').textContent = ['Jobs', 'Talent Passport', 'Pipeline'][i];
    $('#tabDesc').textContent = tabDesc[i];
    const swap = () => { old.hidden = true; old.classList.remove('is-active'); };
    next.hidden = false; next.classList.add('is-active');
    if (canAnimate) {
      gsap.to(old, { opacity: 0, duration: .25, onComplete() { swap(); gsap.set(old, { clearProps: 'all' }); } });
      gsap.fromTo(next, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .8, ease: 'expo.out', delay: .1 });
      gsap.fromTo($$('.metrics>div,.tr:not(.th),.ctr,.col,.detail>*,.chart', next), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .7, stagger: .035, ease: 'expo.out', delay: .2 });
    } else swap();
  }
  navLi.forEach(li => li.classList.toggle('on', +li.dataset.nav === 0));
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => setTab(i));
    t.addEventListener('keydown', e => {
      let k = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') k = (i + 1) % 3;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') k = (i + 2) % 3;
      if (k !== null) { e.preventDefault(); tabs[k].focus(); setTab(k); }
    });
  });
  

  /* hero connectors are computed from the real card geometry so every line ends exactly on a card edge */
  const NS = 'http://www.w3.org/2000/svg';
  const heroArt = $('#heroArt'), heroTop = $('#heroTop');
  const anchor = (el, side) => {
    const x = el.offsetLeft, y = el.offsetTop, w = el.offsetWidth, h = el.offsetHeight;
    return { left: { x, y: y + h / 2, dx: -1, dy: 0 }, right: { x: x + w, y: y + h / 2, dx: 1, dy: 0 },
      top: { x: x + w / 2, y, dx: 0, dy: -1 }, bottom: { x: x + w / 2, y: y + h, dx: 0, dy: 1 } }[side];
  };
  const LINKS = [['hp1', '.f-job', 'left', '.f-cand', 'top'], ['hp2', '.f-job', 'bottom', '.f-pipe', 'top'],
                 ['hp3', '.f-cand', 'right', '.f-pipe', 'left'], ['hp4', '.f-cand', 'bottom', '.f-rank', 'top']];
  function layoutHero() {
    const W = heroArt.offsetWidth, H = heroArt.offsetHeight, k = 620 / W;
    heroTop.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    heroTop.querySelectorAll('.hn').forEach(n => n.remove());
    LINKS.forEach(([id, a, as, b, bs]) => {
      const p = anchor($(a), as), q = anchor($(b), bs);
      const d = Math.hypot(q.x - p.x, q.y - p.y), c = Math.max(22, d * .38);
      const f = n => (n * k).toFixed(1);
      document.getElementById(id).setAttribute('d',
        'M' + f(p.x) + ' ' + f(p.y) + ' C' + f(p.x + p.dx * c) + ' ' + f(p.y + p.dy * c) + ' ' +
        f(q.x + q.dx * c) + ' ' + f(q.y + q.dy * c) + ' ' + f(q.x) + ' ' + f(q.y));
      [p, q].forEach(n => { const c2 = document.createElementNS(NS, 'circle');
        c2.setAttribute('class', 'hn'); c2.setAttribute('cx', n.x); c2.setAttribute('cy', n.y); c2.setAttribute('r', 4.5); heroTop.appendChild(c2); });
    });
  }
  layoutHero();
  let rzT; window.addEventListener('resize', () => { clearTimeout(rzT); rzT = setTimeout(() => { layoutHero(); document.querySelectorAll('.hp').forEach(p => { p.style.strokeDasharray = 'none'; p.style.strokeDashoffset = 0; }); }, 150); });

  /* connection geometry: lines are computed from the real element positions */
  const mid = el => ({ x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 });
  function curve(svgId, pathId, fromSel, toSel, bend) {
    const svg = document.getElementById(svgId), a = document.querySelector(fromSel), b = document.querySelector(toSel);
    if (!svg || !a || !b) return;
    const p = mid(a), q = mid(b), dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 1;
    const cx = (p.x + q.x) / 2 - dy / d * bend, cy = (p.y + q.y) / 2 + dx / d * bend;
    document.getElementById(pathId).setAttribute('d', 'M' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + q.x.toFixed(1) + ' ' + q.y.toFixed(1));
  }
  function layoutConn() {
    curve('cxLines', 'cxA', '#cxCand', '#cxMatch', 26);
    curve('cxLines', 'cxB', '#cxMatch', '#cxJob', 26);
    curve('cxLines', 'cxC', '#cxMatch', '#cxWhy', 0);
    curve('scLines', 'sc1', '#scCand', '#scCore', 22);
    curve('scLines', 'sc2', '#scJob', '#scCore', -22);
    curve('scLines', 'sc3', '#scMatch', '#scCore', -22);
    curve('scLines', 'sc4', '#scTeam', '#scCore', 22);
  }
  layoutConn();
  addEventListener('resize', layoutConn);
  addEventListener('load', layoutConn);
  function flow(svgId, ids, delay) {
    const svg = document.getElementById(svgId);
    ids.forEach(id => {
      const path = document.getElementById(id); if (!path) return;
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', 4.5); dot.setAttribute('class', 'cx-dot'); dot.style.opacity = 0; svg.appendChild(dot);
      const o = { t: 0 };
      gsap.to(o, { t: 1, duration: 2.6, delay, repeat: -1, repeatDelay: 1.2, ease: 'power1.inOut', onUpdate() {
        const len = path.getTotalLength(), pt = path.getPointAtLength(len * o.t);
        dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y); dot.style.opacity = Math.sin(Math.PI * o.t);
      } });
    });
  }

  /* extruded 3D logo: stacked copies of the mark */
  (function build3D() {
    const st = document.getElementById('l3'); if (!st) return;
    const N = 22, front = [23, 160, 142], back = [8, 52, 47];
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1), c = front.map((v, k) => Math.round(v + (back[k] - v) * Math.min(1, t * 1.15)));
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.setAttribute('viewBox', '0 0 30 30'); s.setAttribute('class', 'l3-layer');
      s.style.transform = 'translateZ(' + (-i * 3 + 33) + 'px)'; s.style.fill = i === 0 ? '#1B9A89' : 'rgb(' + c + ')';
      s.innerHTML = '<use href="#mark"/>'; st.appendChild(s);
    }
  })();
  function tiltOn(zone, target, ry, rx, base = { rx: 0, ry: 0 }) {
    const z = document.querySelector(zone), t = document.querySelector(target);
    const qy = gsap.quickTo(t, 'rotationY', { duration: 1.1, ease: 'power3' }), qx = gsap.quickTo(t, 'rotationX', { duration: 1.1, ease: 'power3' });
    gsap.set(t, { rotationX: base.rx, rotationY: base.ry });
    z.addEventListener('pointermove', e => { const r = z.getBoundingClientRect(); qy(base.ry + ((e.clientX - r.left) / r.width - .5) * ry * 2); qx(base.rx - ((e.clientY - r.top) / r.height - .5) * rx * 2); });
    z.addEventListener('pointerleave', () => { qy(base.ry); qx(base.rx); });
  }

  if (!canAnimate) return;

  /* ====================== MOTION ====================== */
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'expo.out' });
  ScrollTrigger.config({ ignoreMobileResize: true });
  const triggers = [];

  /* --- intro --- */
  const hc = $$('.hc'), hp = $$('.hp');
  drawSet(hc); drawSet(hp);
  const hcOp = [.38, .28, .22];
  const intro = gsap.timeline({ delay: .15 });
  intro
    .fromTo('.nav-logo', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: .9 }, 0)
    .fromTo('.nav-links,.nav-actions', { opacity: 0 }, { opacity: 1, duration: 1 }, .3)
    .fromTo('.hero-title .line', { opacity: 1 }, { opacity: 1 }, 0)
    .fromTo('.hero-title .w', { yPercent: 112, opacity: 1 }, { yPercent: 0, opacity: 1, duration: 1.3, stagger: .08 }, .35)
    .fromTo('.hero-sub', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1 }, 1.0)
    .fromTo('.hero-cta', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1 }, 1.15)
    .fromTo('.hero-note', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.1 }, 1.3)
    .to(hc, { strokeDashoffset: 0, opacity: i => hcOp[i], duration: 2.2, stagger: .18, ease: 'power3.inOut' }, .5)
    .fromTo('.hs', { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: 1.6, stagger: .15 }, .9)
    .fromTo('.frag', { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.3, stagger: .14 }, 1.0)
    .to(hp, { strokeDashoffset: 0, opacity: 1, duration: 1.4, stagger: .12, ease: 'power2.inOut' }, 1.9)
    .to('#heroTop .hn', { opacity: 1, duration: .8, stagger: .06 }, 2.5)
    .add(startTravel, 3.0);

  function startTravel() {
    const svg = heroTop;
    [['hp1', 0], ['hp2', 1.6]].forEach(([id, delay]) => {
      const path = document.getElementById(id), len = path.getTotalLength(), kk = heroArt.offsetWidth / 620;
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', 4.5); dot.setAttribute('class', 'hero-dot'); dot.style.opacity = 0; svg.appendChild(dot);
      const o = { t: 0 };
      gsap.to(o, { t: 1, duration: 3, delay, repeat: -1, repeatDelay: 1.4, ease: 'power1.inOut', onUpdate() {
        const p = path.getPointAtLength(len * o.t); dot.setAttribute('cx', p.x * kk); dot.setAttribute('cy', p.y * kk);
        dot.style.opacity = Math.sin(Math.PI * o.t);
      } });
    });
  }

  /* --- pointer depth (translate prop, so it composes with GSAP transforms) --- */
  function pointerDepth(area, items, scale = 1) {
    const state = items.map(el => ({ el, d: +(el.dataset.depth || 10) * scale, x: 0, y: 0, tx: 0, ty: 0 }));
    let active = false;
    area.addEventListener('pointermove', e => {
      const r = area.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      state.forEach(s => { s.tx = -nx * s.d; s.ty = -ny * s.d; }); active = true;
    });
    area.addEventListener('pointerleave', () => { state.forEach(s => { s.tx = 0; s.ty = 0; }); });
    gsap.ticker.add(() => {
      if (!active) return;
      let moving = false;
      state.forEach(s => {
        s.x += (s.tx - s.x) * .08; s.y += (s.ty - s.y) * .08;
        if (Math.abs(s.tx - s.x) > .02 || Math.abs(s.ty - s.y) > .02) moving = true;
        s.el.style.translate = `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`;
      });
      if (!moving) active = false;
    });
  }
  const pvWrap = $('#procPv'); pvWrap.dataset.depth = 8; pointerDepth($('#procPin'), [pvWrap], .8);
  const appWrap = $('.app'); appWrap.dataset.depth = 10; pointerDepth($('#showcase'), [appWrap], .8);

  /* --- hero scroll-linked drift --- */
  gsap.to('.hero-art', { yPercent: -7, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero-copy', { y: -36, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hs-solid', { y: 70, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* --- statement --- */
  const sWords = splitWords($('#statementText'), 'sw');
  $('#statementText').classList.add('is-split');
  $('#statementText').setAttribute('aria-label', $('#statementText').textContent);
  gsap.to(sWords, { color: i => sWords[i].closest('em') ? '#105D55' : '#172321', ease: 'none', stagger: .12, scrollTrigger: { trigger: '#statementText', start: 'top 78%', end: 'bottom 52%', scrub: .6 } });
  gsap.fromTo('.statement-sub', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.2, scrollTrigger: { trigger: '.statement-grid', start: 'top 82%' } });
  /* connection diagram: cards rise, lines draw, a dot travels */
  drawSet($$('#cxLines path'));
  const cxTl = gsap.timeline({ scrollTrigger: { trigger: '#cx', start: 'top 88%', end: 'top 30%', scrub: .7 } });
  cxTl.fromTo('#cxCand', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: .5, ease: 'none' }, 0)
      .to('#cxA', { strokeDashoffset: 0, duration: .5, ease: 'none' }, .35)
      .fromTo('#cxMatch', { opacity: 0, scale: .6, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'none' }, .6)
      .to('#cxB', { strokeDashoffset: 0, duration: .5, ease: 'none' }, .95)
      .fromTo('#cxJob', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: .5, ease: 'none' }, 1.1)
      .to('#cxC', { strokeDashoffset: 0, duration: .4, ease: 'none' }, 1.3)
      .fromTo('#cxWhy', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5, ease: 'none' }, 1.45);
  tiltOn('.statement-grid', '#cxTilt', 8, 5, { rx: 4, ry: 0 });
  ScrollTrigger.create({ trigger: '#cx', start: 'top 60%', once: true, onEnter() { flow('cxLines', ['cxA', 'cxB'], 0); flow('cxLines', ['cxC'], 1.8); } });


  /* --- headings: masked word rise --- */
  $$('.h2, .cta-title').forEach(h => {
    const words = splitMask(h);
    gsap.fromTo(words, { yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: .045, scrollTrigger: { trigger: h, start: 'top 86%' } });
  });
  gsap.utils.toArray('.lede').forEach(l => gsap.fromTo(l, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1.1, delay: .15, scrollTrigger: { trigger: l, start: 'top 90%' } }));

  /* --- process: pinned stages --- */
  const pinTl = ScrollTrigger.create({
    trigger: '#procPin', start: 'top top', end: () => '+=' + Math.round(innerHeight * 2.4), pin: true, anticipatePin: 1,
    onUpdate: self => {
      setStage(Math.min(3, Math.floor(self.progress * 4)));
      gsap.set(railFill, { scaleX: self.progress });
    },
    onRefresh: self => { procST = self; },
  });
  procST = pinTl;

  /* --- AI: interface builds on scroll --- */
  const ai = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#aiUi', start: 'top 82%', end: 'top 12%', scrub: .9 } });
  ai.fromTo('.aiw', { clipPath: 'inset(0% 0% 100% 0% round 18px)' }, { clipPath: 'inset(0% 0% 0% 0% round 18px)', duration: 1 }, 0)
    .fromTo('[data-ai=img]', { scale: 1.06, transformOrigin: '50% 0%' }, { scale: 1, duration: 1.4 }, 0)
    .fromTo('[data-ai=bar]', { opacity: 0 }, { opacity: 1, duration: .3 }, .35);
  gsap.fromTo($$('.caps li'), { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, stagger: .12, scrollTrigger: { trigger: '.caps', start: 'top 88%' } });

  /* --- showcase --- */
  gsap.fromTo('.app', { clipPath: 'inset(0% 0% 100% 0% round 20px)', y: 30 }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', y: 0, duration: 1.5, ease: 'expo.inOut', clearProps: 'clipPath', scrollTrigger: { trigger: '.app-wrap', start: 'top 84%' } });
  gsap.fromTo($$('.tab'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: .1, scrollTrigger: { trigger: '.tabs', start: 'top 88%' } });

  /* --- roles --- */
  $$('.role').forEach((r, i) => {
    const sym = $$('.sym *', r); drawSet(sym);
    const tl = gsap.timeline({ scrollTrigger: { trigger: r, start: 'top 82%' } });
    tl.to(sym, { strokeDashoffset: 0, duration: 1.3, stagger: .1, ease: 'power2.inOut' }, 0)
      .fromTo($$('h3,p', r), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.1, stagger: .1 }, .1)
      ;
    const items = $$('li,.mini-review', r);
    if (items.length) tl.fromTo(items, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .9, stagger: .09 }, .4);
    const bars = $$('.mini-bars i', r);
    if (bars.length) tl.fromTo(bars, { scaleY: 0, transformOrigin: 'bottom' }, { scaleY: 1, duration: 1.1, stagger: .08 }, .3);
  });

  /* --- control --- */
  gsap.fromTo($$('.ctl-list li'), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .9, stagger: .06, scrollTrigger: { trigger: '.ctl-list', start: 'top 88%' } });
  gsap.fromTo('.org', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.4, scrollTrigger: { trigger: '.org', start: 'top 86%' } });
  gsap.fromTo($$('.mem,.pr'), { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: .8, stagger: .05, scrollTrigger: { trigger: '.org', start: 'top 70%' } });

  /* --- brand moment: 3D scene --- */
  gsap.fromTo('#scene', { opacity: 0, scale: .86 }, { opacity: 1, scale: 1, duration: 1.8, scrollTrigger: { trigger: '#moment', start: 'top 70%' } });
  tiltOn('#moment', '#sceneTilt', 14, 8);
  drawSet($$('#scLines path'));
  gsap.to($$('#scLines path'), { strokeDashoffset: 0, duration: 1.6, stagger: .2, ease: 'power2.inOut', scrollTrigger: { trigger: '#moment', start: 'top 62%' } });
  gsap.fromTo($$('.sc-card'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, stagger: .12, scrollTrigger: { trigger: '#moment', start: 'top 66%' } });
  ScrollTrigger.create({ trigger: '#moment', start: 'top 55%', once: true, onEnter() { ['sc1', 'sc2', 'sc3', 'sc4'].forEach((id, i) => flow('scLines', [id], .6 + i * .7)); } });
  const mWords = splitMask($('#momentText'));
  gsap.fromTo(mWords, { yPercent: 115 }, { yPercent: 0, duration: 1.4, stagger: .06, scrollTrigger: { trigger: '#momentText', start: 'top 78%' } });

  /* --- cta --- */
  gsap.fromTo('.cta .hero-cta', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.1, scrollTrigger: { trigger: '.cta .hero-cta', start: 'top 92%' } });
  gsap.fromTo('#logo3d', { opacity: 0, scale: .8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.8, scrollTrigger: { trigger: '#banner', start: 'top 75%' } });
  gsap.to('#l3', { y: -14, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  tiltOn('#banner', '#l3', 20, 12, { rx: 12, ry: -32 });
  const sd = $('#sundisc'); const bn = $('#banner');
  const sx = gsap.quickTo(sd, 'x', { duration: 1.2, ease: 'power3' }), sy = gsap.quickTo(sd, 'y', { duration: 1.2, ease: 'power3' });
  bn.addEventListener('pointermove', e => { const r = bn.getBoundingClientRect(); sx(-((e.clientX - r.left) / r.width - .5) * 60); sy(-((e.clientY - r.top) / r.height - .5) * 40); });
  gsap.fromTo('.foot-claim', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.3, scrollTrigger: { trigger: '.foot', start: 'top 80%' } });
  gsap.fromTo('.foot-word', { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.8, scrollTrigger: { trigger: '.foot', start: 'top 60%' } });
  gsap.fromTo($$('.foot-grid>*'), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1, stagger: .08, scrollTrigger: { trigger: '.foot-grid', start: 'top 92%' } });

  /* --- continuous connection line through the page --- */

  /* --- refresh once fonts are ready so pin/trigger positions are exact --- */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  addEventListener('load', () => ScrollTrigger.refresh());
})();
