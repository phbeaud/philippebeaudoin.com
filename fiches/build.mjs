// Génère les fiches PDF (format Lettre, recto-verso) dans public/fiches/ avec Chrome sans interface.
// Usage : node fiches/build.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { fiches, speaker } from "./data.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outHtml = join(here, "out");
const outPdf = join(root, "public", "fiches");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const asset = (p) => pathToFileURL(join(root, "public", p)).href;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const logos = [
  ["bombardier.png", 26],
  ["brp.png", 26],
  ["beneva.png", 13],
  ["udes.png", 16],
  ["rcgt.png", 16],
  ["sherweb.png", 12],
  ["crha.png", 21],
  ["victoriaville.png", 17],
];

const css = `
@page { size: Letter; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --paper:#f4efe6; --paper-deep:#ebe4d6; --ink:#16130f; --muted:#6b645a; --accent:#e8552b; }
html, body { background: var(--paper); color: var(--ink); font-family: "Inter Tight", system-ui, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 8.5in; height: 11in; position: relative; overflow: hidden; page-break-after: always; display: flex; flex-direction: column; }
.page:last-child { page-break-after: auto; }
.eyebrow { font-family: "JetBrains Mono", monospace; font-size: 7.5pt; letter-spacing: .14em; text-transform: uppercase; }
.display { font-family: "Fraunces", Georgia, serif; letter-spacing: -.02em; }
.dot { color: var(--accent); }

/* Recto */
.hero { background: var(--ink); color: var(--paper); display: grid; grid-template-columns: 1fr 2.9in; height: 3.05in; }
.hero-text { padding: .42in .45in .34in .55in; display: flex; flex-direction: column; }
.brand { display: flex; justify-content: space-between; align-items: baseline; }
.brand .name { font-family: "Fraunces", serif; font-size: 13pt; }
.hero .eyebrow { color: rgba(244,239,230,.6); }
.hero h1 { font-size: 31pt; line-height: 1; margin-top: auto; }
.hero .sub { font-family: "Fraunces", serif; font-style: italic; font-size: 13pt; line-height: 1.3; color: rgba(244,239,230,.75); margin-top: 10pt; }
.hero .theme { margin-top: 14pt; color: var(--accent); }
.hero-photo { background-size: cover; position: relative; }
.hero-photo::after { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, var(--ink) 0%, rgba(22,19,15,0) 35%); }

.body { display: grid; grid-template-columns: 1fr 2.75in; gap: .35in; padding: .3in .55in 0; }
h2 { font-family: "Fraunces", serif; font-size: 14pt; letter-spacing: -.01em; margin-bottom: 7pt; }
.problem { font-size: 9.6pt; line-height: 1.5; color: var(--muted); }
.takeaways { list-style: none; margin-top: 4pt; counter-reset: t; }
.takeaways li { counter-increment: t; display: grid; grid-template-columns: 22pt 1fr; font-size: 9.8pt; line-height: 1.45; padding: 5.5pt 0; border-top: 1px solid rgba(22,19,15,.12); }
.takeaways li::before { content: "0" counter(t); font-family: "JetBrains Mono", monospace; font-size: 8pt; color: var(--accent); padding-top: 1.5pt; }
.block + .block { margin-top: 14pt; }
.side { background: var(--paper-deep); border-radius: 14pt; padding: 13pt 14pt 10pt; align-self: start; }
.side .eyebrow { color: var(--muted); display: block; margin-bottom: 7pt; }
.step { font-size: 8.3pt; line-height: 1.38; padding-left: 9pt; border-left: 2px solid var(--accent); margin-bottom: 6pt; }
.step b { display: block; font-family: "JetBrains Mono", monospace; font-weight: 500; font-size: 7pt; letter-spacing: .12em; text-transform: uppercase; color: var(--ink); margin-bottom: 1pt; }
.side hr { border: 0; border-top: 1px solid rgba(22,19,15,.12); margin: 8pt 0; }
.fmt { font-size: 8.2pt; line-height: 1.32; margin-bottom: 3.5pt; }
.fmt b { font-weight: 600; }
.aud { font-size: 8.3pt; line-height: 1.4; }

.quote { margin: 14pt .55in 0; padding: 2pt 0 2pt 14pt; border-left: 3px solid var(--accent); }
.quote p { font-family: "Fraunces", serif; font-style: italic; font-size: 11pt; line-height: 1.4; }
.quote span { display: block; margin-top: 5pt; color: var(--muted); }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14pt; margin: 12pt .55in 0; padding-top: 10pt; border-top: 1px solid rgba(22,19,15,.15); }
.stats b { font-family: "Fraunces", serif; font-size: 17pt; font-weight: 500; display: block; }
.stats span { font-size: 7.8pt; color: var(--muted); line-height: 1.3; display: block; margin-top: 2pt; }
.logos { margin: 12pt .55in 14pt; display: flex; align-items: center; justify-content: space-between; gap: 10pt; }
.logos .eyebrow { color: var(--muted); white-space: nowrap; font-size: 6.5pt; }
.logos img { filter: grayscale(1); opacity: .7; }
.foot { margin-top: auto; background: var(--ink); color: var(--paper); padding: 11pt .55in; display: flex; justify-content: space-between; align-items: center; font-size: 8.6pt; }
.foot .cta { font-family: "Fraunces", serif; font-size: 11pt; }
.foot .sep { color: var(--accent); margin: 0 6pt; }

/* Verso */
.v-head { padding: .42in .55in 0; display: flex; justify-content: space-between; align-items: flex-end; }
.v-head h1 { font-size: 26pt; line-height: 1.05; margin-top: 6pt; }
.v-head .eyebrow { color: var(--muted); }
.v-intro { padding: 8pt .55in 0; font-size: 9pt; color: var(--muted); max-width: 6in; line-height: 1.45; }
.copy { margin: 11pt .55in 0; background: #fffdf9; border: 1px solid rgba(22,19,15,.12); border-radius: 12pt; padding: 13pt 16pt; }
.copy .label { display: flex; justify-content: space-between; color: var(--muted); margin-bottom: 6pt; }
.copy p { font-size: 9.4pt; line-height: 1.52; }
.copy .ttl { font-family: "Fraunces", serif; font-size: 12pt; margin-bottom: 4pt; }
.bio { display: grid; grid-template-columns: 1.15in 1fr; gap: 14pt; }
.bio img { width: 1.15in; height: 1.15in; object-fit: cover; border-radius: 50%; }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 12pt; margin: 11pt .55in 0; }
.cols .copy { margin: 0; }
.cols ul { list-style: none; }
.cols li { font-size: 8.8pt; line-height: 1.42; padding: 3.5pt 0 3.5pt 12pt; position: relative; }
.cols li::before { content: ""; position: absolute; left: 0; top: 8.5pt; width: 5pt; height: 5pt; border-radius: 50%; background: var(--accent); }
.v-cta { margin-top: auto; background: var(--ink); color: var(--paper); padding: .24in .55in; display: grid; grid-template-columns: 1fr auto; gap: 20pt; align-items: center; }
.v-cta h2 { font-size: 22pt; margin: 0; }
.v-cta p { font-size: 9.4pt; color: rgba(244,239,230,.75); margin-top: 6pt; line-height: 1.6; }
.v-cta .qr { background: var(--paper); border-radius: 10pt; padding: 8pt; text-align: center; }
.v-cta .qr img { width: .9in; height: .9in; display: block; }
.v-cta .qr span { display: block; color: var(--ink); font-size: 6.5pt; margin-top: 5pt; }
`;

const words = (s) => s.trim().split(/\s+/).length;

function recto(f) {
  const { contact } = speaker;
  return `<section class="page">
  <header class="hero">
    <div class="hero-text">
      <div class="brand"><span class="name">Philippe Beaudoin<span class="dot">.</span></span></div>
      <h1 class="display">${esc(f.title)}</h1>
      <p class="sub">${esc(f.subtitle)}</p>
      <p class="eyebrow theme">${esc(f.theme)}</p>
    </div>
    <div class="hero-photo" style="background-image:url('${asset(`images/hero/${f.photo}`)}');background-position:${f.photoPosition}"></div>
  </header>
  <div class="body">
    <div>
      <div class="block"><h2>Le constat</h2><p class="problem">${esc(f.problem)}</p></div>
      <div class="block"><h2>Ce que vos participants retiennent</h2>
        <ul class="takeaways">${f.takeaways.map((t) => `<li><span>${esc(t)}</span></li>`).join("")}</ul>
      </div>
    </div>
    <aside class="side">
      <span class="eyebrow">Une salle qui participe</span>
      ${f.experience.map(([k, v]) => `<p class="step"><b>${esc(k)}</b>${esc(v)}</p>`).join("")}
      <hr><span class="eyebrow">Formats</span>
      ${speaker.formats.map((x) => `<p class="fmt"><b>${esc(x.name)}</b> · ${esc(x.detail)}</p>`).join("")}
      <hr><span class="eyebrow">Pour qui</span>
      <p class="aud">${esc(f.audience)}</p>
    </aside>
  </div>
  <blockquote class="quote"><p>« ${esc(f.quote.text)} »</p><span class="eyebrow">${esc(f.quote.by)}</span></blockquote>
  <div class="stats">${speaker.stats.map((s) => `<div><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("")}</div>
  <div class="logos"><span class="eyebrow">Ils m'ont fait confiance</span>${logos
    .map(([src, h]) => `<img src="${asset(`images/clients/trimmed/${src}`)}" style="height:${h}px" alt="">`)
    .join("")}</div>
  <footer class="foot"><span class="cta">Parlons de votre événement</span><span>${contact.email}<span class="sep">·</span>${contact.phone}<span class="sep">·</span>${contact.site}</span></footer>
</section>`;
}

function verso(f) {
  const { contact } = speaker;
  return `<section class="page">
  <div class="v-head">
    <div><p class="eyebrow">Pour votre programme · ${esc(f.title)}</p><h1 class="display">Textes prêts à copier<span class="dot">.</span></h1></div>
    <span class="eyebrow">Philippe Beaudoin</span>
  </div>
  <p class="v-intro">Pour votre programme, votre application d'événement ou votre animateur. Vous pouvez les reprendre tels quels ou les raccourcir.</p>
  <div class="copy">
    <div class="label"><span class="eyebrow">Titre et description</span><span class="eyebrow">${words(f.programDescription)} mots</span></div>
    <p class="ttl">${esc(f.title)} : ${esc(f.subtitle.charAt(0).toLowerCase() + f.subtitle.slice(1))}</p>
    <p>${esc(f.programDescription)}</p>
  </div>
  <div class="copy">
    <div class="label"><span class="eyebrow">Présentation du conférencier · version courte</span><span class="eyebrow">${words(speaker.bioShort)} mots</span></div>
    <div class="bio"><img src="${asset("images/hero/philippe-portrait.jpg")}" alt=""><p>${esc(speaker.bioShort)}</p></div>
  </div>
  <div class="copy">
    <div class="label"><span class="eyebrow">Présentation du conférencier · version longue</span><span class="eyebrow">${words(speaker.bioLong)} mots</span></div>
    <p>${esc(speaker.bioLong)}</p>
  </div>
  <div class="cols">
    <div class="copy"><div class="label"><span class="eyebrow">Besoins techniques</span></div>
      <ul>${speaker.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </div>
    <div class="copy"><div class="label"><span class="eyebrow">Photos et visuels</span></div>
      <ul>
        <li>Photos haute résolution et fiche à jour : ${contact.site}</li>
        <li>Conférence adaptée à votre secteur : exemples, questions et vocabulaire de votre milieu</li>
        <li>Un appel préparatoire avec vous, avant l'événement</li>
      </ul>
    </div>
  </div>
  <footer class="v-cta">
    <div><h2 class="display">Réservons votre date<span class="dot">.</span></h2>
      <p>${contact.email} · ${contact.phone}<br>${contact.site}</p></div>
    <div class="qr"><img src="${pathToFileURL(join(here, "qr", `${f.slug}.svg`)).href}" alt=""><span class="eyebrow">Demander une proposition</span></div>
  </footer>
</section>`;
}

const html = (f) => `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${esc(f.title)} · Philippe Beaudoin</title>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>${css}</style></head><body>${recto(f)}${verso(f)}</body></html>`;

mkdirSync(outHtml, { recursive: true });
mkdirSync(outPdf, { recursive: true });
const only = process.argv[2];
for (const f of fiches.filter((x) => !only || x.slug === only)) {
  const htmlPath = join(outHtml, `${f.slug}.html`);
  writeFileSync(htmlPath, html(f));
  const pdfPath = join(outPdf, `philippe-beaudoin-${f.slug}.pdf`);
  execFileSync(CHROME, [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--allow-file-access-from-files",
    "--virtual-time-budget=8000",
    `--print-to-pdf=${pdfPath}`,
    pathToFileURL(htmlPath).href,
  ], { stdio: "ignore" });
  console.log(`${pdfPath} (${Math.round(readFileSync(pdfPath).length / 1024)} Ko)`);
}
