// Moteur du test des styles de communication : écrans rendus en HTML dans un conteneur, état sauvegardé localement.
// Rien n'est envoyé à un serveur : les réponses restent dans le navigateur de la personne.
import { STY, ORDER, QUAL, SIT, BACKUP, SEEN, PAIRS, FLEX, LIK, BLENDS, PURE, blendSlug } from './content.js';

const TOTAL = QUAL.length + SIT.length;
const KEY = 'styles-com-v1';
const HEX = { C: '#4c8dff', D: '#f0434f', S: '#2fb39f', I: '#f6c63b' };
const CONTACT = '/contact?sujet=' + encodeURIComponent('Atelier sur les styles de communication');

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const done = (a) => a.every((x) => x != null);
const list = (a) => '<ul>' + a.map((x) => `<li>${esc(x)}</li>`).join('') + '</ul>';
const disc = (k) => `${STY[k].disc} · ${STY[k].discTerm}`;
const full = (k) => `${STY[k].name} (${STY[k].color}) · DISC ${disc(k)}`;

const newSeed = () => Math.floor(Math.random() * 1e9);
const fresh = (name = '') => ({ seed: newSeed(), screen: 'intro', i: 0, ans: Array(TOTAL).fill(null), adap: Array(QUAL.length).fill(null), flex: Array(FLEX.length).fill(null), name, tab: null, sec: 'profil', other: null, team: '' });

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (!(s && Array.isArray(s.ans) && s.ans.length === TOTAL && Array.isArray(s.adap) && Array.isArray(s.flex))) return null;
    if (typeof s.seed !== 'number') s.seed = newSeed();
    return s;
  } catch {
    return null;
  }
}

// Ordre d'affichage propre à chaque personne et à chaque question, stable d'une visite à l'autre
function order(seed, k) {
  let t = (seed + k * 2654435761) >>> 0;
  const rnd = () => { t += 0x6d2b79f5; let r = Math.imul(t ^ (t >>> 15), 1 | t); r ^= r + Math.imul(r ^ (r >>> 7), 61 | r); return ((r ^ (r >>> 14)) >>> 0) / 4294967296; };
  const a = [0, 1, 2, 3];
  for (let i = 3; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// Profil combiné : le style secondaire colore le principal, sauf s'il est trop faible
function blend(s) {
  const [t1, t2] = rank(s);
  const pure = pctOf(s, t2) <= 15;
  const [title, text] = pure ? PURE[t1] : BLENDS[t1 + t2];
  return { t1, t2: pure ? null : t2, title, text, slug: blendSlug(t1, pure ? null : t2) };
}

// Scores et position sur la carte
const scoreOf = (arr, pick) => { const s = { C: 0, D: 0, S: 0, I: 0 }; arr.forEach((a, k) => { if (a != null) s[pick(k, a)]++; }); return s; };
const sum = (s) => ORDER.reduce((a, k) => a + s[k], 0) || 1;
const pctOf = (s, k) => Math.round((s[k] / sum(s)) * 100);
const rank = (s) => [...ORDER].sort((a, b) => s[b] - s[a]);
// x : affirmation (réservé → affirmé) ; y : expression (factuel → expressif)
const pos = (s) => { const t = sum(s); return { x: (s.D + s.I - (s.C + s.S)) / t, y: (s.I + s.S - (s.C + s.D)) / t }; };
const code = (s) => `B${s.C}R${s.D}V${s.S}J${s.I}`;
function parseCode(str) {
  const m = /B(\d{1,2})R(\d{1,2})V(\d{1,2})J(\d{1,2})/i.exec(str);
  return m ? { C: +m[1], D: +m[2], S: +m[3], I: +m[4] } : null;
}

// Carte perceptuelle en SVG : quadrants, axes, points (toi, au travail, équipe) et halo de flexibilité
function map({ me, work, halo, team = [], light = false, animate = true }) {
  const P = (p) => ({ x: 200 + p.x * 165, y: 200 - p.y * 165 });
  const ink = light ? '#16130f' : '#f4efe6';
  const sub = light ? '#6b645a' : '#a39a8d';
  const quad = [
    ['S', 0, 0, 'Aimable', 'start', 14, 26], ['I', 200, 0, 'Expressif', 'end', 386, 26],
    ['C', 0, 200, 'Analytique', 'start', 14, 386], ['D', 200, 200, 'Directif', 'end', 386, 386],
  ];
  let h = `<svg class="st-map" viewBox="0 0 400 400" role="img" aria-label="Carte de ton style de communication">`;
  h += quad.map(([k, x, y]) => `<rect x="${x}" y="${y}" width="200" height="200" fill="${HEX[k]}" fill-opacity="${light ? 0.16 : 0.2}"/>`).join('');
  h += `<line x1="200" y1="8" x2="200" y2="392" stroke="${sub}" stroke-opacity=".5" stroke-dasharray="3 5"/><line x1="8" y1="200" x2="392" y2="200" stroke="${sub}" stroke-opacity=".5" stroke-dasharray="3 5"/>`;
  h += quad.map(([k, , , n, a, tx, ty]) => `<text x="${tx}" y="${ty}" text-anchor="${a}" font-size="14" font-weight="700" fill="${HEX[k]}">${n}</text><text x="${tx}" y="${ty + (ty < 200 ? 16 : -18)}" text-anchor="${a}" font-size="10" letter-spacing="1.5" fill="${sub}">${STY[k].disc} · ${STY[k].discTerm.toUpperCase()}</text>`).join('');
  h += `<text x="200" y="${light ? 396 : 396}" text-anchor="middle" font-size="9" letter-spacing="1.5" fill="${sub}" dy="-2">← PLUS RÉSERVÉ · PLUS AFFIRMÉ →</text>`;
  h += `<text transform="translate(10 200) rotate(-90)" text-anchor="middle" font-size="9" letter-spacing="1.5" fill="${sub}" dy="2">← PLUS FACTUEL · PLUS EXPRESSIF →</text>`;
  team.forEach((t) => {
    const p = P(t.p);
    h += `<g><circle cx="${p.x}" cy="${p.y}" r="7" fill="${HEX[t.top]}" stroke="${light ? '#fff' : '#16130f'}" stroke-width="2"/><text x="${p.x}" y="${p.y - 12}" text-anchor="middle" font-size="11" font-weight="600" fill="${ink}">${esc(t.name)}</text></g>`;
  });
  if (me) {
    const m = P(me);
    if (halo) h += `<circle cx="${m.x}" cy="${m.y}" r="${halo}" fill="${ink}" fill-opacity=".07" stroke="${ink}" stroke-opacity=".35" stroke-dasharray="2 4"><title>Zone d’aisance selon ta flexibilité</title></circle>`;
    if (work) {
      const w = P(work);
      h += `<defs><marker id="st-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${ink}"/></marker></defs>`;
      h += `<line x1="${m.x}" y1="${m.y}" x2="${w.x}" y2="${w.y}" stroke="${ink}" stroke-width="1.5" stroke-dasharray="4 4" marker-end="url(#st-arrow)"/>`;
      h += `<circle cx="${w.x}" cy="${w.y}" r="8" fill="none" stroke="${ink}" stroke-width="2.5" stroke-dasharray="3 2"/><text x="${w.x}" y="${w.y + 22}" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="1" fill="${ink}">AU TRAVAIL</text>`;
    }
    const a = animate ? `<animate attributeName="cx" from="200" to="${m.x}" dur=".9s" fill="freeze" calcMode="spline" keySplines=".2 .8 .2 1"/><animate attributeName="cy" from="200" to="${m.y}" dur=".9s" fill="freeze" calcMode="spline" keySplines=".2 .8 .2 1"/>` : '';
    h += `<circle cx="${m.x}" cy="${m.y}" r="13" fill="${ink}" stroke="${light ? '#fff' : '#16130f'}" stroke-width="4">${a}</circle>`;
    h += `<text x="${m.x}" y="${m.y - 20}" text-anchor="middle" font-size="12" font-weight="700" letter-spacing="1" fill="${ink}">TOI</text>`;
  }
  return h + '</svg>';
}

export function mountStylesTest(root, opts = {}) {
  let st = load() || fresh();
  let handlers = null;
  let lock = false;
  let interacted = false;

  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch { /* stockage indisponible : le test fonctionne quand même */ } };
  const scoreNat = () => scoreOf(st.ans, (k, a) => (k < QUAL.length ? QUAL[k][a][1] : SIT[k - QUAL.length][1][a][1]));
  const scoreAdap = () => scoreOf(st.adap, (k, a) => QUAL[k][a][1]);
  const flexScore = () => st.flex.reduce((a, v) => a + (v || 0), 0);
  const halo = () => (done(st.flex) ? 26 + (flexScore() / 30) * 64 : 0);
  const toTop = () => window.scrollTo({ top: Math.max(0, root.getBoundingClientRect().top + window.scrollY - 96), behavior: 'smooth' });

  function top(label) {
    return `<header class="top"><div class="brand"><i></i>Styles de communication</div><div class="count">${label || ''}</div></header>`;
  }
  function progress(arr, cur, gapAt) {
    let h = `<div class="progress" style="grid-template-columns:repeat(${arr.length},1fr)" aria-hidden="true">`;
    for (let k = 0; k < arr.length; k++) h += `<span class="${k === cur ? 'now' : arr[k] != null ? 'done' : ''}${k === gapAt ? ' gap' : ''}"></span>`;
    return h + '</div>';
  }

  function render() {
    save();
    ({ intro, q: question, pause, res: results, aq: adQuestion, fx: fxQuestion }[st.screen] || intro)();
    if (interacted) {
      const h = root.querySelector('h1, h2');
      if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
    }
    interacted = true;
  }

  function intro() {
    handlers = null;
    const started = st.ans.some((a) => a != null);
    root.innerHTML = `${top()}
    <section class="intro stage">
      <div>
        <p class="eyebrow">Test gratuit · modèle DISC</p>
        <h1>Quel est ton style de communication<span class="dot">?</span></h1>
        <p class="lead">30 choix rapides pour découvrir comment tu communiques, ce qui te stimule… et ce qui te fait perdre patience. Résultat immédiat, carte perceptuelle et rapport PDF.</p>
      </div>
      <div class="facts">
        <span class="fact"><b>12</b> groupes de mots</span>
        <span class="fact"><b>18</b> situations</span>
        <span class="fact"><b>8</b> minutes environ</span>
        <span class="fact">+ 2 modules facultatifs</span>
      </div>
      <div class="mini" aria-hidden="true">
        ${ORDER.map((k) => `<div style="background:var(${STY[k].v});color:${STY[k].dark ? '#16130f' : '#fff'}">${STY[k].name}<small>${STY[k].color} · ${disc(k)}</small></div>`).join('')}
      </div>
      <div class="field">
        <label for="st-nom">Ton prénom (facultatif, pour personnaliser ton profil)</label>
        <input id="st-nom" type="text" autocomplete="given-name" maxlength="40" value="${esc(st.name)}" placeholder="Ex. : Camille">
      </div>
      <div class="actions">
        <button class="cta" id="st-go">${started ? 'Reprendre où j’étais' : 'Commencer le test'} ${arrow}</button>
        ${started ? '<button class="ghost" id="st-reset">Recommencer à zéro</button>' : ''}
      </div>
      <p class="note">Réponds selon ta façon d’être spontanée, celle qui te vient sans effort, et non selon ce que tu aimerais être. Ta première impression est souvent la bonne. Tes réponses restent dans ton navigateur : rien n’est envoyé.</p>
    </section>`;
    const nom = root.querySelector('#st-nom');
    nom.addEventListener('input', () => { st.name = nom.value.slice(0, 40); save(); });
    root.querySelector('#st-go').onclick = () => { const f = st.ans.findIndex((a) => a == null); st.i = f < 0 ? TOTAL - 1 : f; st.screen = f < 0 ? 'res' : 'q'; render(); toTop(); };
    const r = root.querySelector('#st-reset');
    if (r) r.onclick = () => { st = fresh(st.name); render(); };
  }

  function wordsUI(group, sel, k) {
    return `<div class="words" role="radiogroup" aria-label="Qualificatifs">${order(st.seed, k).map((j, n) => `<button class="word${sel === j ? ' sel' : ''}" role="radio" aria-checked="${sel === j}" data-j="${j}"><span class="k">${n + 1}</span><span class="w">${esc(group[j][0])}</span></button>`).join('')}</div>`;
  }
  function navUI(hasNext, keys = '1 à 4') {
    return `<div class="nav"><button class="ghost" id="st-back">← Précédent</button><span class="hint">Clavier : touches ${keys}</span>${hasNext ? '<button class="ghost" id="st-next">Suivant →</button>' : '<span></span>'}</div>`;
  }
  function wire(onPick, onBack, onNext) {
    root.querySelectorAll('[data-j]').forEach((b) => { b.onclick = () => onPick(+b.dataset.j); });
    root.querySelector('#st-back').onclick = onBack;
    const nx = root.querySelector('#st-next');
    if (nx) nx.onclick = onNext;
    handlers = { pick: onPick, back: onBack, next: onNext };
  }
  function choose(arr, idx, j, after) {
    if (lock) return;
    arr[idx] = j;
    save();
    root.querySelectorAll('[data-j]').forEach((b) => { const on = +b.dataset.j === j; b.classList.toggle('sel', on); b.setAttribute('aria-checked', on); });
    lock = true;
    setTimeout(() => { lock = false; after(); }, 260);
  }

  function question() {
    const k = st.i;
    const part1 = k < QUAL.length;
    const n = part1 ? k + 1 : k - QUAL.length + 1;
    const of = part1 ? QUAL.length : SIT.length;
    let body;
    if (part1) {
      body = `<div class="qhead"><p class="eyebrow">Partie 1 · Qualificatifs · ${n} / ${of}</p><h2 class="prompt">Spontanément, lequel te décrit le mieux<span class="dot">?</span></h2></div>${wordsUI(QUAL[k], st.ans[k], k)}`;
    } else {
      const [p, o] = SIT[k - QUAL.length];
      body = `<div class="qhead"><p class="eyebrow">Partie 2 · Situations · ${n} / ${of}</p><h2 class="prompt">${esc(p)}</h2></div>
      <div class="opts" role="radiogroup" aria-label="Réponses">${order(st.seed, k).map((j, n) => `<button class="opt${st.ans[k] === j ? ' sel' : ''}" role="radio" aria-checked="${st.ans[k] === j}" data-j="${j}"><span class="l">${'abcd'[n]}</span><span>${esc(o[j][0])}</span></button>`).join('')}</div>`;
    }
    root.innerHTML = `${top(`${k + 1} / ${TOTAL}`)}${progress(st.ans, k, QUAL.length)}<section class="stage">${body}${navUI(st.ans[k] != null)}</section>`;
    wire((j) => choose(st.ans, st.i, j, advance), back, advance);
  }
  function advance() {
    if (st.i === QUAL.length - 1 && st.screen === 'q') { st.screen = 'pause'; st.i = QUAL.length; render(); return toTop(); }
    if (st.i >= TOTAL - 1) {
      const f = st.ans.findIndex((a) => a == null);
      if (f >= 0) { st.i = f; return render(); }
      st.screen = 'res'; st.tab = null; st.sec = 'profil'; render(); return toTop();
    }
    st.i++;
    render();
  }
  function back() {
    if (st.i === 0) { st.screen = 'intro'; return render(); }
    if (st.i === QUAL.length) { st.i = QUAL.length - 1; st.screen = 'q'; return render(); }
    st.i--;
    render();
  }
  function pause() {
    handlers = null;
    root.innerHTML = `${top(`${QUAL.length} / ${TOTAL}`)}${progress(st.ans, -1, QUAL.length)}<section class="pause stage">
      <div class="bignum">${QUAL.length}/${TOTAL}</div>
      <h2>Beau travail${st.name ? ', ' + esc(st.name) : ''}<span class="dot">.</span></h2>
      <p class="lead" style="margin:0">Partie 2 : ${SIT.length} situations de travail. Pour chacune, choisis la réaction qui te ressemble le plus, même si aucune n’est parfaite.</p>
      <div class="actions"><button class="cta" id="st-go">Continuer ${arrow}</button><button class="ghost" id="st-back">← Revenir à la partie 1</button></div>
    </section>`;
    root.querySelector('#st-go').onclick = () => { st.screen = 'q'; st.i = QUAL.length; render(); };
    root.querySelector('#st-back').onclick = () => { st.screen = 'q'; st.i = QUAL.length - 1; render(); };
  }

  // Module « Au travail » : style adapté
  function adQuestion() {
    const k = st.i;
    root.innerHTML = `${top(`Au travail · ${k + 1} / ${QUAL.length}`)}${progress(st.adap, k)}<section class="stage">
      <div class="qhead"><p class="eyebrow">Module · Mon style au travail · ${k + 1} / ${QUAL.length}</p><h2 class="prompt">Au travail, ce qu’on attend de moi, c’est d’être plutôt…</h2></div>
      ${wordsUI(QUAL[k], st.adap[k], k + 100)}${navUI(st.adap[k] != null)}</section>`;
    const nxt = () => {
      if (st.i < QUAL.length - 1) { st.i++; return render(); }
      const f = st.adap.findIndex((a) => a == null);
      if (f >= 0) { st.i = f; return render(); }
      st.screen = 'res'; st.sec = 'travail'; render(); toTop();
    };
    wire((j) => choose(st.adap, st.i, j, nxt), () => { if (st.i === 0) { st.screen = 'res'; st.sec = 'travail'; } else st.i--; render(); }, nxt);
  }
  // Module flexibilité
  function fxQuestion() {
    const k = st.i;
    root.innerHTML = `${top(`Flexibilité · ${k + 1} / ${FLEX.length}`)}${progress(st.flex, k)}<section class="stage">
      <div class="qhead"><p class="eyebrow">Module · Ma flexibilité · ${k + 1} / ${FLEX.length}</p><h2 class="prompt">${esc(FLEX[k])}</h2></div>
      <div class="likert" role="radiogroup" aria-label="Échelle de 1 à 5">${LIK.map((l, j) => `<button class="lk${st.flex[k] === j + 1 ? ' sel' : ''}" role="radio" aria-checked="${st.flex[k] === j + 1}" data-j="${j}"><b>${j + 1}</b><span>${l}</span></button>`).join('')}</div>
      ${navUI(st.flex[k] != null, '1 à 5')}</section>`;
    const nxt = () => {
      if (st.i < FLEX.length - 1) { st.i++; return render(); }
      const f = st.flex.findIndex((a) => a == null);
      if (f >= 0) { st.i = f; return render(); }
      st.screen = 'res'; st.sec = 'flex'; render(); toTop();
    };
    wire(
      (j) => {
        if (lock) return;
        st.flex[st.i] = j + 1;
        save();
        root.querySelectorAll('[data-j]').forEach((b) => b.classList.toggle('sel', +b.dataset.j === j));
        lock = true;
        setTimeout(() => { lock = false; nxt(); }, 260);
      },
      () => { if (st.i === 0) { st.screen = 'res'; st.sec = 'flex'; } else st.i--; render(); },
      nxt,
    );
  }

  // ---------- Résultats ----------
  function bars(s) {
    return `<div class="cmps">${rank(s).map((k) => `<div class="cmp"><span class="cl"><i style="background:var(${STY[k].v})"></i>${STY[k].name}<small>${disc(k)}</small></span>
      <div class="bars"><span class="bn" style="width:${pctOf(s, k)}%;background:var(${STY[k].v})"></span></div><span class="dl up">${pctOf(s, k)} %</span></div>`).join('')}</div>`;
  }
  // Cohérence : corrélation entre les écarts à la moyenne (25 %) des mots et des situations.
  // Des réponses données au hasard donnent deux profils plats et sans lien : l'indice reste bas.
  function coherence() {
    const a = scoreOf(st.ans.slice(0, QUAL.length), (k, j) => QUAL[k][j][1]);
    const b = scoreOf(st.ans.slice(QUAL.length), (k, j) => SIT[k][1][j][1]);
    const da = ORDER.map((k) => pctOf(a, k) - 25);
    const db = ORDER.map((k) => pctOf(b, k) - 25);
    const na = Math.hypot(...da);
    const nb = Math.hypot(...db);
    const ta = rank(a)[0];
    const tb = rank(b)[0];
    if (na < 8 || nb < 8) return ['À confirmer', 'Profil peu marqué', 'Tes réponses se répartissent presque également entre les quatre styles. Refais le test dans quelques jours en suivant ta première impression : ton style ressortira plus clairement.'];
    const r = da.reduce((x, v, i) => x + v * db[i], 0) / (na * nb);
    if (r >= 0.7) return ['Élevée', ta === tb ? `${STY[ta].name} dans les deux parties` : 'Mêmes tendances', 'Tes mots spontanés et tes réactions en situation racontent la même histoire : ton résultat est solide.'];
    if (r >= 0.2) return ['Moyenne', 'Quelques nuances', ta === tb ? 'Ton style principal ressort dans les deux parties, avec des nuances selon le contexte.' : `Tes mots pointent plutôt vers ${STY[ta].name.toLowerCase()}, tes réactions vers ${STY[tb].name.toLowerCase()} : ton style varie selon la situation.`];
    return ['À confirmer', 'Mots et réactions divergent', `Tes mots pointent vers ${STY[ta].name.toLowerCase()}, tes réactions vers ${STY[tb].name.toLowerCase()}. Refais le test dans quelques jours, en répondant plus spontanément, pour confirmer.`];
  }
  function intensity(p) {
    const d = Math.hypot(p.x, p.y);
    if (d < 0.2) return 'Ton point est près du centre : ton style est peu marqué. Tu passes facilement d’un registre à l’autre, mais les autres peuvent avoir du mal à te lire.';
    if (d < 0.5) return 'Ton point montre un style net, sans excès : tu as une préférence claire et de la latitude pour t’adapter.';
    return 'Ton point est loin du centre : ton style est très marqué. C’est une force claire… et un style qui peut épuiser les profils opposés.';
  }

  function results() {
    handlers = null;
    const s = scoreNat();
    const R = rank(s);
    const t1 = R[0];
    const t2 = R[1];
    const tie = s[t1] === s[t2];
    if (!st.tab) st.tab = t1;
    if (!st.other) st.other = { C: 'I', I: 'C', D: 'S', S: 'D' }[t1];
    const P = STY[t1];
    const secs = [['profil', 'Mon profil'], ['travail', 'Naturel ou adapté'], ['autres', 'Avec les autres'], ['flex', 'Ma flexibilité'], ['equipe', 'Carte d’équipe']];
    const body = { profil: secProfil, travail: secTravail, autres: secAutres, flex: secFlex, equipe: secEquipe }[st.sec](s, t1);
    const p = pos(s);
    const B = blend(s);
    const coh = coherence();
    root.innerHTML = `${top('Ton profil')}<section class="res stage">
      <div class="hero">
        <p class="eyebrow">${st.name ? esc(st.name) + ', ton' : 'Ton'} style dominant</p>
        <div class="name" style="color:var(${P.v})">${tie ? `${STY[t1].name} <span style="color:var(--st-muted)">+</span> <span style="color:var(${STY[t2].v})">${STY[t2].name}</span>` : P.name}<span class="dot">.</span></div>
        <div class="discline"><span class="chip" style="background:var(${P.v});color:${P.dark ? '#16130f' : '#fff'}">${P.disc}</span>DISC : <b>${P.discTerm}</b>${tie ? ` + <b>${STY[t2].discTerm}</b> (${STY[t2].disc})` : ` · secondaire : ${STY[t2].discTerm} (${STY[t2].disc})`}</div>
        <div class="sub">${tie ? 'Deux styles à égalité : tu passes de l’un à l’autre selon la situation.' : `${P.color}, avec une touche ${STY[t2].name.toLowerCase()} (${STY[t2].color.toLowerCase()}) en second.`}</div>
      </div>
      <div class="blendbox" style="--b1:var(${STY[B.t1].v});--b2:var(${B.t2 ? STY[B.t2].v : STY[B.t1].v})">
        <div class="blendchips"><span></span><span></span></div>
        <div><p class="eyebrow" style="margin-bottom:6px">Ton profil combiné${B.t2 ? ` · ${STY[B.t1].disc}${STY[B.t2].disc}` : ''}</p><h3>${B.title}</h3><p style="margin:6px 0 0">${B.text}</p>
        ${B.t2 ? `<p class="note" style="margin-top:8px">Ton style secondaire (${STY[B.t2].name}, ${STY[B.t2].discTerm}) influence la façon dont ton style principal s’exprime au quotidien.</p>` : ''}</div>
      </div>
      <div class="mapgrid">
        <div class="mapbox">${map({ me: p, work: done(st.adap) ? pos(scoreAdap()) : null, halo: halo() })}</div>
        <div class="mapside">
          ${bars(s)}
          <p class="note">${intensity(p)}</p>
          <p class="note">Ta position combine tes quatre styles : un style secondaire fort peut te placer près d’une frontière, voire dans le quadrant voisin de ton style principal.</p>
          <div class="cohbox"><small>Cohérence de tes réponses</small><b>${coh[0]} <span>${coh[1]}</span></b><p class="note">${coh[2]}</p></div>
          <div class="legend">${done(st.adap) ? '<span>Cercle pointillé et flèche : ton style au travail.</span>' : '<span>Fais le module « Naturel ou adapté » pour voir ton style au travail sur la carte.</span>'}${done(st.flex) ? '<span>Halo : ta zone d’aisance, selon ta flexibilité.</span>' : ''}</div>
        </div>
      </div>
      <div class="actions">
        <button class="cta" id="st-pdf">Télécharger mon profil (PDF) ${arrow}</button>
        <button class="ghost" id="st-share">Partager sur LinkedIn</button>
        <button class="ghost" id="st-copy">Copier mon résultat</button>
        <button class="ghost" id="st-edit">Revoir mes réponses</button>
        <button class="ghost" id="st-reset">Refaire le test</button>
        <span class="toast" id="st-toast" role="status"></span>
      </div>
      <p class="note" style="margin-top:-28px">PDF : dans la fenêtre d’impression, choisis « Enregistrer en PDF ». Sur téléphone, le plus simple est de recevoir ton rapport par courriel.</p>
      <div id="st-confirm"></div>
      ${opts.sendReport ? `<form class="mailbox" id="st-mail" novalidate>
        <div><p class="eyebrow">Ton rapport par courriel</p><h3>Reçois ton profil complet dans ta boîte de réception.</h3></div>
        <div class="mailrow"><input type="email" id="st-email" required autocomplete="email" placeholder="ton@courriel.com" aria-label="Ton courriel"><button class="cta" type="submit" id="st-send">M’envoyer mon rapport ${arrow}</button></div>
        <label class="check"><input type="checkbox" id="st-consent" required> J’accepte que mon adresse et mon profil soient transmis à Philippe Beaudoin pour l’envoi de ce rapport.</label>
        <label class="check"><input type="checkbox" id="st-news"> J’aimerais aussi recevoir, à l’occasion, des outils et des nouvelles de Philippe (facultatif).</label>
        <input type="text" id="st-hp" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">
        <p class="toast" id="st-mailmsg" role="status"></p>
      </form>` : ''}
      <nav class="secnav" role="tablist" aria-label="Sections du profil">${secs.map(([id, l]) => `<button role="tab" aria-selected="${st.sec === id}" data-sec="${id}">${l}${id === 'travail' && done(st.adap) ? ' ✓' : ''}${id === 'flex' && done(st.flex) ? ' ✓' : ''}</button>`).join('')}</nav>
      <div id="st-secbody">${body}</div>
      <div class="offer cta-block">
        <div><p class="eyebrow">Pour votre organisation</p><h3>Faites vivre ce test à votre équipe.</h3><p class="note" style="margin-top:6px">En atelier ou en conférence, chacun découvre son style et apprend à travailler avec les autres. La carte d’équipe devient alors un outil concret de collaboration.</p></div>
        <a class="cta" href="${CONTACT}">Demander une proposition ${arrow}</a>
      </div>
      <p class="quote">« Aucun style n’est meilleur qu’un autre. La vraie force, c’est de savoir s’ajuster. »</p>
      <p class="ref">Outil de réflexion conçu par Philippe Beaudoin, inspiré du modèle DISC (William Marston) et des styles sociaux. Ce n’est ni un test psychométrique ni un diagnostic : nous utilisons tous les quatre styles, à des degrés divers.</p>
    </section>`;
    wireResults(s, t1, t2, tie, B);
  }

  function secProfil(s, t1) {
    const k = st.tab;
    const P = STY[k];
    return `<div class="tabs" role="tablist">${ORDER.map((x) => `<button class="tab" role="tab" aria-selected="${k === x}" data-tab="${x}"><i style="background:var(${STY[x].v})"></i>${STY[x].name} · ${STY[x].disc}${x === t1 ? ' · toi' : ''}</button>`).join('')}</div>
    <div class="profile" style="--pc:var(${P.v})" role="tabpanel">
      <div class="ptitle"><p class="eyebrow" style="color:var(${P.v})">${P.color} · DISC ${disc(k)}</p><h2>${P.name}<span class="dot">.</span></h2><p class="lead" style="margin-top:4px">Dans le modèle DISC, ce style correspond à la <b style="color:var(--st-text);font-style:normal">${P.discTerm}</b> (${P.disc}).</p></div>
      <div class="traits">${P.traits.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="grid2">
        <div class="block"><h4>Ce qui le motive</h4>${list(P.motiv)}</div>
        <div class="block"><h4>Ses valeurs</h4>${list(P.valeurs)}</div>
        <div class="block"><h4>Ses forces</h4>${list(P.forces)}</div>
        <div class="block no"><h4>Ses angles morts</h4>${list(P.faibl)}</div>
      </div>
      <div class="block"><h4>Pour bien lui parler</h4>
        <div class="talk"><div><small>Explique d’abord</small><b>${P.talk[0]}</b></div><div><small>Procède</small><b>${P.talk[1]}</b></div><div><small>Sois</small><b>${P.talk[2]}</b></div></div></div>
      <div class="grid2">
        <div class="block"><h4>À faire</h4>${list(P.faire)}</div>
        <div class="block no"><h4>À éviter</h4>${list(P.eviter)}</div>
      </div>
      <div class="block"><h4>Sous stress</h4>
        <div class="backup"><b style="color:var(${P.v})">${BACKUP[k][0]}.</b> ${BACKUP[k][1]}</div>
        <div class="grid3">
          <div class="block"><h4 class="dim">Ce qui le déclenche</h4>${list(P.causes)}</div>
          <div class="block no"><h4 class="dim">Les signaux</h4>${list(P.signaux)}</div>
          <div class="block"><h4 class="dim">Ce qui l’aide</h4>${list(P.remedes)}</div>
        </div></div>
      <div class="block"><h4>Les signes qui ne mentent pas</h4>
        <div class="signs">${P.signs.map(([a, b]) => `<div class="sign"><small>${esc(a)}</small><span>${esc(b)}</span></div>`).join('')}</div></div>
    </div>`;
  }

  function secTravail(s) {
    const head = `<div class="ptitle"><p class="eyebrow">Style naturel et style adapté</p><h2>Es-tu le même au travail<span class="dot">?</span></h2>
      <p class="lead" style="margin-top:6px">Ton style naturel, c’est ta façon spontanée d’agir. Ton style adapté, c’est ce que ton milieu te demande. Plus l’écart est grand, plus tu dépenses d’énergie à jouer un rôle.</p></div>`;
    if (!done(st.adap)) {
      return `<div class="profile">${head}
      <div class="offer"><div><h3>Mon style au travail</h3><p class="note" style="margin-top:4px">Les mêmes 12 groupes de mots, avec une autre question : « Au travail, ce qu’on attend de moi, c’est d’être plutôt… ». Environ 2 minutes. Ton style au travail apparaîtra ensuite sur ta carte.</p></div>
      <button class="cta" id="st-startAd">${st.adap.some((a) => a != null) ? 'Continuer' : 'Commencer'} ${arrow}</button></div></div>`;
    }
    const a = scoreAdap();
    const rows = ORDER.map((k) => {
      const n = pctOf(s, k);
      const m = pctOf(a, k);
      return `<div class="cmp"><span class="cl"><i style="background:var(${STY[k].v})"></i>${STY[k].name}<small>${disc(k)}</small></span>
        <div class="bars"><span class="bn" style="width:${n}%;background:var(${STY[k].v})"></span><span class="ba" style="width:${m}%;border-color:var(${STY[k].v})"></span></div>
        <span class="dl ${m > n ? 'up' : ''}">${n} → ${m} %</span></div>`;
    }).join('');
    const gap = Math.round(ORDER.reduce((x, k) => x + Math.abs(pctOf(a, k) - pctOf(s, k)), 0) / 2);
    const up = [...ORDER].sort((x, y) => (pctOf(a, y) - pctOf(s, y)) - (pctOf(a, x) - pctOf(s, x)))[0];
    const down = [...ORDER].sort((x, y) => (pctOf(a, x) - pctOf(s, x)) - (pctOf(a, y) - pctOf(s, y)))[0];
    const msg = gap < 15
      ? ['Peu d’écart', 'Tu es au travail à peu près comme tu es naturellement. C’est économique en énergie : ton milieu te laisse être toi.']
      : gap < 30
        ? ['Écart modéré', `Ton milieu te demande d’emprunter un peu de ${STY[up].name.toLowerCase()} (${STY[up].discTerm}) et de mettre de côté une partie de ton ${STY[down].name.toLowerCase()}. C’est normal et gérable, tant que tu peux recharger ailleurs.`]
        : ['Écart important', `Au travail, tu joues un rôle assez éloigné de ta nature : plus de ${STY[up].name.toLowerCase()} (${STY[up].discTerm}), moins de ${STY[down].name.toLowerCase()} (${STY[down].discTerm}). Ça peut être une belle compétence… ou une source de fatigue.`];
    return `<div class="profile">${head}
      <div class="legend"><span><i class="ln"></i>Naturel</span><span><i class="la"></i>Au travail</span></div>
      <div class="cmps">${rows}</div>
      <div class="verdict"><div class="gapnum">${gap}<small>%</small></div><div><h3>${msg[0]}</h3><p style="margin:4px 0 0">${msg[1]}</p></div></div>
      <div class="grid2">
        <div class="block"><h4>Question de réflexion</h4><p class="serif-q">Qu’est-ce qui, dans mon travail, me demande d’être ${STY[up].name.toLowerCase()}?</p></div>
        <div class="block"><h4>Pour recharger</h4><p class="serif-q">Où, dans ma semaine, puis-je être pleinement ${STY[rank(s)[0]].name.toLowerCase()}?</p></div>
      </div>
      <div class="actions"><button class="ghost" id="st-startAd">Refaire ce module</button></div></div>`;
  }

  function secAutres(s, t1) {
    const o = st.other;
    const [fr, cp, title, ens, risk, tip] = PAIRS[[t1, o].sort().join('')];
    const meter = (n, c) => `<span class="meter">${[1, 2, 3].map((i) => `<i style="${i <= n ? `background:${c}` : ''}"></i>`).join('')}</span>`;
    const O = STY[o];
    const same = o === t1;
    return `<div class="profile">
      <div class="ptitle"><p class="eyebrow">Compatibilités</p><h2>Toi, ${STY[t1].name.toLowerCase()} (${STY[t1].disc}), avec…</h2></div>
      <div class="tabs" role="tablist">${ORDER.map((x) => `<button class="tab" role="tab" aria-selected="${o === x}" data-other="${x}"><i style="background:var(${STY[x].v})"></i>${STY[x].name} · ${STY[x].disc}${x === t1 ? ' (comme toi)' : ''}</button>`).join('')}</div>
      <div class="duo">
        <div class="duohead"><span class="chip2" style="background:var(${STY[t1].v})">${STY[t1].disc}</span><span class="plus">+</span><span class="chip2" style="background:var(${O.v})">${O.disc}</span><h3>${title}</h3></div>
        <div class="meters"><span>Friction ${meter(fr, 'var(--st-accent)')}</span><span>Complémentarité ${meter(cp, 'var(--st-text)')}</span></div>
        <div class="grid2">
          <div class="block"><h4>Ce qui marche</h4><p style="margin:0">${ens}</p></div>
          <div class="block no"><h4>Ce qui accroche</h4><p style="margin:0">${risk}</p></div>
        </div>
        <div class="backup"><b class="dot">L’astuce.</b> ${tip}</div>
      </div>
      <div class="grid2">
        <div class="block"><h4>${same ? 'Ce qu’un autre ' + STY[t1].name.toLowerCase() + ' risque de voir chez toi' : 'Ce qu’un ' + O.name.toLowerCase() + ' risque de voir chez toi'}</h4><p class="serif-q">Sous pression, tu peux lui sembler ${SEEN[t1]}.</p></div>
        <div class="block"><h4>Pour bien lui parler</h4><p style="margin:0">Explique d’abord <b>${O.talk[0]}</b>, procède <b>${O.talk[1]}</b>, sois <b>${O.talk[2]}</b>.</p></div>
        <div class="block"><h4>À faire avec lui</h4>${list(O.faire)}</div>
        <div class="block no"><h4>À éviter avec lui</h4>${list(O.eviter)}</div>
      </div>
    </div>`;
  }

  function secFlex() {
    const head = `<div class="ptitle"><p class="eyebrow">La flexibilité</p><h2>Le style compte. La flexibilité compte plus<span class="dot">.</span></h2>
      <p class="lead" style="margin-top:6px">Aucun style n’est meilleur qu’un autre. Ce qui distingue les bons communicateurs, c’est leur capacité à ajuster leur façon de faire à la personne devant eux, sans renier qui ils sont.</p></div>`;
    if (!done(st.flex)) {
      return `<div class="profile">${head}
      <div class="offer"><div><h3>Ma flexibilité</h3><p class="note" style="margin-top:4px">Six énoncés, une échelle de 1 à 5. Une minute. Ta zone d’aisance apparaîtra ensuite comme un halo sur ta carte.</p></div>
      <button class="cta" id="st-startFx">${st.flex.some((a) => a != null) ? 'Continuer' : 'Commencer'} ${arrow}</button></div></div>`;
    }
    const sc = flexScore();
    const lvl = sc <= 15
      ? ['À développer', 'Tu communiques surtout dans ton propre style. Les gens qui te ressemblent te comprennent bien; les autres peuvent décrocher. Commence par un seul réflexe : observer le rythme de l’autre avant de parler.']
      : sc <= 23
        ? ['En bonne voie', 'Tu t’ajustes souvent, surtout quand tout va bien. Le défi : rester flexible quand tu es stressé, justement quand ton repli naturel prend le dessus.']
        : ['Très flexible', 'Tu sais te mettre au diapason des autres. Attention à une chose : à force de t’adapter, ne disparais pas. Les autres ont aussi besoin de savoir ce que toi, tu penses.'];
    const low = st.flex.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0])[0][1];
    return `<div class="profile">${head}
      <div class="verdict"><div class="gapnum">${sc}<small>/30</small></div><div><h3>${lvl[0]}</h3><p style="margin:4px 0 0">${lvl[1]}</p></div></div>
      <div class="flexbar" aria-hidden="true"><span style="width:${((sc - 6) / 24) * 100}%"></span></div>
      <div class="block"><h4>Ton prochain pas</h4><p class="serif-q">Ton énoncé le plus faible : « ${esc(FLEX[low])} » Choisis une personne cette semaine avec qui t’y exercer.</p></div>
      <div class="actions"><button class="ghost" id="st-startFx">Refaire ce module</button></div></div>`;
  }

  // Carte d'équipe : chacun partage son code, et l'équipe apparaît sur une même carte
  function teamMembers() {
    return st.team.split('\n').map((line) => {
      const sc = parseCode(line);
      if (!sc || sum(sc) === 1) return null;
      const name = line.replace(/B\d{1,2}R\d{1,2}V\d{1,2}J\d{1,2}/i, '').replace(/[:,;–-]/g, ' ').trim().slice(0, 18) || 'Collègue';
      return { name, p: pos(sc), top: rank(sc)[0] };
    }).filter(Boolean);
  }
  function secEquipe(s) {
    const team = teamMembers();
    const counts = ORDER.map((k) => [k, team.filter((t) => t.top === k).length]);
    const missing = counts.filter(([, n]) => n === 0).map(([k]) => STY[k].name.toLowerCase());
    return `<div class="profile">
      <div class="ptitle"><p class="eyebrow">Carte d’équipe</p><h2>Toute ton équipe sur une seule carte<span class="dot">.</span></h2>
        <p class="lead" style="margin-top:6px">Demande à tes collègues de faire le test et de te transmettre leur code. Colle-les ici : vous apparaîtrez tous sur la même carte. Rien n’est envoyé, tout reste dans ton navigateur.</p></div>
      <div class="codebox"><div><small>Ton code</small><b>${code(s)}</b></div><button class="ghost" id="st-copycode">Copier mon code</button></div>
      <div class="field" style="max-width:none"><label for="st-team">Une personne par ligne : prénom et code (ex. : Julie B3R8V10J9)</label>
        <textarea id="st-team" rows="5" placeholder="Julie B3R8V10J9&#10;Marc B9R4V6J11">${esc(st.team)}</textarea></div>
      <div class="mapgrid">
        <div class="mapbox">${map({ me: pos(s), team, animate: false })}</div>
        <div class="mapside">
          <div class="cmps">${counts.map(([k, n]) => `<div class="cmp"><span class="cl"><i style="background:var(${STY[k].v})"></i>${STY[k].name}<small>${disc(k)}</small></span><div class="bars"><span class="bn" style="width:${team.length ? (n / team.length) * 100 : 0}%;background:var(${STY[k].v})"></span></div><span class="dl up">${n}</span></div>`).join('')}</div>
          <p class="note">${team.length === 0 ? 'Ajoute au moins un collègue pour voir la répartition de l’équipe.' : missing.length ? `Votre équipe n’a personne au style ${missing.join(', ')} : c’est souvent là que se cachent vos angles morts collectifs.` : 'Les quatre styles sont représentés : une belle diversité, à condition que chacun ait sa place.'}</p>
        </div>
      </div>
    </div>`;
  }

  // Rapport imprimable (PDF via la boîte d'impression du navigateur)
  function printReport(s, t1, t2, tie) {
    const P = STY[t1];
    const date = new Date().toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
    let h = `<div class="r-head"><div><p class="r-eyebrow">Profil de communication${st.name ? ' · ' + esc(st.name) : ''}</p>
      <h1 style="color:${HEX[t1]}">${tie ? `${P.name} + ${STY[t2].name}` : P.name}</h1>
      <p class="r-disc">DISC : <b>${P.discTerm} (${P.disc})</b>${tie ? ` + <b>${STY[t2].discTerm} (${STY[t2].disc})</b>` : ` · secondaire : ${STY[t2].discTerm} (${STY[t2].disc})`}</p></div>
      <div class="r-brand">Philippe Beaudoin<br><span>${date}</span></div></div>
      <div class="r-blend"><b>Profil combiné : ${blend(s).title}.</b> ${blend(s).text}</div>
      <div class="r-row"><div class="r-map">${map({ me: pos(s), work: done(st.adap) ? pos(scoreAdap()) : null, halo: halo(), light: true, animate: false })}</div>
      <div class="r-bars">${rank(s).map((k) => `<div class="r-bar"><span>${STY[k].name} <em>${disc(k)}</em></span><div><i style="width:${pctOf(s, k)}%;background:${HEX[k]}"></i></div><b>${pctOf(s, k)} %</b></div>`).join('')}
      <p class="r-note">${intensity(pos(s))}</p></div></div>
      <h2>Ton style en bref</h2><p class="r-traits">${P.traits.map(esc).join(' · ')}</p>
      <div class="r-grid"><div><h3>Forces</h3>${list(P.forces)}</div><div><h3>Angles morts</h3>${list(P.faibl)}</div>
      <div><h3>Ce qui te motive</h3>${list(P.motiv)}</div><div><h3>Sous stress : ${BACKUP[t1][0].toLowerCase()}</h3><p>${BACKUP[t1][1]}</p>${list(P.remedes)}</div></div>
      <h2>Pour bien communiquer avec chaque style</h2><div class="r-grid4">${ORDER.map((k) => `<div style="border-top:4px solid ${HEX[k]}"><h3>${STY[k].name} <em>${STY[k].disc}</em></h3><p>Explique d’abord <b>${STY[k].talk[0]}</b>, procède <b>${STY[k].talk[1]}</b>, sois <b>${STY[k].talk[2]}</b>.</p></div>`).join('')}</div>`;
    if (done(st.adap)) {
      const a = scoreAdap();
      h += `<h2>Naturel ou adapté</h2><p>Au travail : ${rank(a).map((k) => `${STY[k].name} (${STY[k].disc}) ${pctOf(a, k)} %`).join(' · ')}.</p>`;
    }
    if (done(st.flex)) h += `<h2>Flexibilité</h2><p><b>${flexScore()}/30.</b> ${flexScore() <= 15 ? 'À développer.' : flexScore() <= 23 ? 'En bonne voie.' : 'Très flexible.'}</p>`;
    h += `<div class="r-foot"><b>Faites vivre ce test à votre équipe</b> en atelier ou en conférence : philippebeaudoin.com/contact<br><span>Outil de réflexion inspiré du modèle DISC (William Marston). Ce n’est ni un test psychométrique ni un diagnostic.</span></div>`;

    let el = document.getElementById('st-print');
    if (!el) { el = document.createElement('div'); el.id = 'st-print'; document.body.appendChild(el); }
    el.innerHTML = h;
    document.body.classList.add('st-printing');
    const after = () => { document.body.classList.remove('st-printing'); window.removeEventListener('afterprint', after); };
    window.addEventListener('afterprint', after);
    window.print();
  }

  function wireResults(s, t1, t2, tie, B) {
    const goSec = () => root.querySelector('.secnav')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    root.querySelectorAll('[data-sec]').forEach((b) => { b.onclick = () => { st.sec = b.dataset.sec; render(); goSec(); }; });
    root.querySelectorAll('[data-tab]').forEach((b) => { b.onclick = () => { st.tab = b.dataset.tab; st.sec = 'profil'; render(); goSec(); }; });
    root.querySelectorAll('[data-other]').forEach((b) => { b.onclick = () => { st.other = b.dataset.other; render(); goSec(); }; });
    const sa = root.querySelector('#st-startAd');
    if (sa) sa.onclick = () => { if (done(st.adap)) st.adap = Array(QUAL.length).fill(null); const f = st.adap.findIndex((a) => a == null); st.i = f < 0 ? 0 : f; st.screen = 'aq'; render(); toTop(); };
    const sf = root.querySelector('#st-startFx');
    if (sf) sf.onclick = () => { if (done(st.flex)) st.flex = Array(FLEX.length).fill(null); const f = st.flex.findIndex((a) => a == null); st.i = f < 0 ? 0 : f; st.screen = 'fx'; render(); toTop(); };
    const team = root.querySelector('#st-team');
    if (team) team.onchange = () => { st.team = team.value.slice(0, 2000); render(); };
    const toast = root.querySelector('#st-toast');
    const copy = (txt, ok) => (navigator.clipboard?.writeText(txt) || Promise.reject()).then(() => { toast.textContent = ok; }).catch(() => { toast.textContent = txt; });
    const cc = root.querySelector('#st-copycode');
    if (cc) cc.onclick = () => copy(code(s), 'Code copié : envoie-le à ton équipe.');
    root.querySelector('#st-pdf').onclick = () => printReport(s, t1, t2, tie);
    root.querySelector('#st-share').onclick = () => {
      const url = `${window.location.origin}/test-styles/resultat/${B.slug}`;
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'noopener,width=600,height=640');
    };
    const form = root.querySelector('#st-mail');
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const msg = root.querySelector('#st-mailmsg');
        const email = root.querySelector('#st-email').value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Vérifie ton adresse courriel.'; return; }
        if (!root.querySelector('#st-consent').checked) { msg.textContent = 'Coche la case de consentement pour recevoir ton rapport.'; return; }
        const btn = root.querySelector('#st-send');
        btn.disabled = true;
        msg.textContent = 'Envoi en cours…';
        try {
          const r = await opts.sendReport({
            email, name: st.name, news: root.querySelector('#st-news').checked, website: root.querySelector('#st-hp').value,
            scores: s, adap: done(st.adap) ? scoreAdap() : null, flex: done(st.flex) ? flexScore() : null,
          });
          msg.textContent = r?.message || (r?.ok ? 'Rapport envoyé!' : 'L’envoi a échoué.');
          if (!r?.ok) btn.disabled = false;
        } catch {
          msg.textContent = 'L’envoi a échoué. Réessaie dans un instant.';
          btn.disabled = false;
        }
      };
    }
    root.querySelector('#st-edit').onclick = () => { st.screen = 'q'; st.i = 0; render(); toTop(); };
    root.querySelector('#st-reset').onclick = () => {
      const c = root.querySelector('#st-confirm');
      c.innerHTML = '<div class="confirm">Effacer toutes tes réponses, modules compris? <button class="ghost" id="st-yes">Oui, recommencer</button><button class="ghost" id="st-no">Annuler</button></div>';
      c.querySelector('#st-yes').onclick = () => { st = fresh(st.name); render(); toTop(); };
      c.querySelector('#st-no').onclick = () => { c.innerHTML = ''; };
    };
    root.querySelector('#st-copy').onclick = () => {
      let txt = `${st.name ? st.name + ' — ' : ''}Style de communication : ${tie ? STY[t1].name + ' + ' + STY[t2].name : full(t1)}\n` + rank(s).map((k) => `${STY[k].name} (DISC ${disc(k)}) : ${pctOf(s, k)} %`).join('\n');
      if (done(st.adap)) { const a = scoreAdap(); txt += '\nAu travail : ' + rank(a).map((k) => `${STY[k].name} ${pctOf(a, k)} %`).join(' · '); }
      if (done(st.flex)) txt += `\nFlexibilité : ${flexScore()}/30`;
      txt += `\nProfil combiné : ${B.title}\nCode : ${code(s)} · philippebeaudoin.com/test-styles`;
      copy(txt, 'Résultat copié.');
    };
  }

  const onKey = (e) => {
    if (!handlers || ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
    const max = st.screen === 'fx' ? 5 : 4;
    const n = parseInt(e.key, 10);
    const shown = root.querySelectorAll('[data-j]');
    if (n >= 1 && n <= max && shown[n - 1]) shown[n - 1].click();
    else if (e.key === 'ArrowLeft') handlers.back();
    else if (e.key === 'ArrowRight' && root.querySelector('#st-next')) handlers.next();
  };
  document.addEventListener('keydown', onKey);
  render();

  return () => {
    document.removeEventListener('keydown', onKey);
    document.getElementById('st-print')?.remove();
    document.body.classList.remove('st-printing');
  };
}
