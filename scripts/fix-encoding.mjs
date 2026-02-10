import fs from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = process.cwd();
const WEBSITE_DIR = path.join(PROJECT_ROOT, "Website");

const SKIP_PATH_PARTS = [
  `${path.sep}_validation${path.sep}`,
  `${path.sep}node_modules${path.sep}`,
  `${path.sep}.git${path.sep}`,
];

const SKIP_FILES = new Set([
  "index.mega.backup.html",
  "Branchenspezifische Lösungen ｜ SecureKern GmbH (2_9_2026 5：33：14 PM).html",
]);

const TEXT_EXTENSIONS = new Set([
  ".html",
  ".css",
  ".js",
  ".md",
  ".xml",
  ".txt",
  ".yml",
  ".yaml",
  ".json",
  ".svg",
]);

function shouldSkipFile(filePath) {
  for (const part of SKIP_PATH_PARTS) {
    if (filePath.includes(part)) return true;
  }
  const base = path.basename(filePath);
  if (SKIP_FILES.has(base)) return true;
  return false;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (shouldSkipFile(fullPath)) continue;
    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else files.push(fullPath);
  }
  return files;
}

const MOJIBAKE_REPLACEMENTS = [
  // Common UTF-8-as-Win1252 artifacts
  ["Ã¤", "ä"],
  ["Ã„", "Ä"],
  ["Ã¶", "ö"],
  ["Ã–", "Ö"],
  ["Ã¼", "ü"],
  ["Ãœ", "Ü"],
  ["ÃŸ", "ß"],
  ["â€“", "–"],
  ["â€”", "—"],
  ["â€ž", "„"],
  ["â€œ", "“"],
  ["â€", "”"],
  ["â€˜", "‘"],
  ["â€™", "’"],
  ["â€¦", "…"],
  ["â‚¬", "€"],
  ["Â©", "©"],
  ["Â®", "®"],
  ["Â·", "·"],
  ["Â ", " "], // NBSP rendered as "Â "
];

// Fixes introduced by over-aggressive double-conversion:
// - U+FFFD "�" replacement characters
// - "?" used as placeholder inside words/prices
const REGEX_RULES = [
  // Prices/ranges: 25.000?45.000 -> 25.000–45.000, 8?12 -> 8–12
  { re: /(?<=\d)[?\uFFFD](?=\d)/g, replace: "–" },
  // Currency: ?25.000 -> €25.000, ( ?20.000 -> (€20.000
  { re: /(^|[\s("'[{])[?\uFFFD](?=\d)/g, replace: "$1€" },
  // Currency after k: 4k? -> 4k€
  { re: /(?<=\dk)[?\uFFFD](?=\b)/g, replace: "€" },
  // "Word ? Word" -> "Word – Word"
  { re: /(?<=[A-Za-zÄÖÜäöüß])\s[?\uFFFD]\s(?=[A-Za-zÄÖÜäöüß])/g, replace: " – " },
  // Common German fragments where the broken char is at the start/end of the word
  { re: /Men[?\uFFFD](?=\s|$)/g, replace: "Menü" },
  { re: /[?\uFFFD]ffnen\b/g, replace: "öffnen" },
  { re: /\s[?\uFFFD]\s(?=[A-Za-zÄÖÜäöüß])/g, replace: " – " },
  { re: /[?\uFFFD]§/g, replace: "§§" },
  { re: /[?\uFFFD]ra\b/g, replace: "Ära" },
  { re: /[?\uFFFD]ber/g, replace: "über" },
  { re: /[?\uFFFD]([A-Za-zÄÖÜäöüß]+)\"/g, replace: "„$1“" },
  { re: /[?\uFFFD]nderungen\b/g, replace: "Änderungen" },
  { re: /[?\uFFFD]nderung\b/g, replace: "Änderung" },
  { re: /zu\s+[?\uFFFD]ndern\b/g, replace: "zu ändern" },
  { re: /[?\uFFFD]brigen\b/g, replace: "übrigen" },
  { re: /\bgem[?\uFFFD]{2}(?=\s|[.,;:)]|$)/g, replace: "gemäß" },
  { re: /\bregelm[?\uFFFD]{2}ig\b/g, replace: "regelmäßig" },
  { re: /Wei[?\uFFFD](?=[^A-Za-zÄÖÜäöüß]|$)/g, replace: "Weiß" },
  { re: /(?<=\d)\s[?\uFFFD](?=\s*(?:\/|<|\||$))/g, replace: " €" },
  { re: /\bVerst[?\uFFFD]{2}en\b/g, replace: "Verstößen" },
  { re: /praktische\s+[?\uFFFD]bungen\b/g, replace: "praktische Übungen" },
  { re: /[?\uFFFD]bungen\b/g, replace: "Übungen" },

  // Core German umlauts/ß in the site corpus (word-level)
  { re: /\bf[?\uFFFD]r\b/g, replace: "für" },
  { re: /\bF[?\uFFFD]r\b/g, replace: "Für" },
  { re: /\bL[?\uFFFD]sungen\b/g, replace: "Lösungen" },
  { re: /\bL[?\uFFFD]sung\b/g, replace: "Lösung" },
  { re: /\bSch[?\uFFFD]tzen\b/g, replace: "Schützen" },
  { re: /\bsch[?\uFFFD]tzen\b/g, replace: "schützen" },
  { re: /\bsch[?\uFFFD]tzt\b/g, replace: "schützt" },
  { re: /\bErstgespr[?\uFFFD]ch\b/g, replace: "Erstgespräch" },
  { re: /\bBeratungsgespr[?\uFFFD]ch\b/g, replace: "Beratungsgespräch" },
  { re: /\bGespr[?\uFFFD]ch\b/g, replace: "Gespräch" },
  { re: /\b30-min[?\uFFFD]tiges\b/g, replace: "30-minütiges" },

  { re: /\bk[?\uFFFD]nnen\b/g, replace: "können" },
  { re: /\bK[?\uFFFD]nnen\b/g, replace: "Können" },
  { re: /\bm[?\uFFFD]ssen\b/g, replace: "müssen" },
  { re: /\bM[?\uFFFD]ssen\b/g, replace: "Müssen" },

  { re: /\bMittelst[?\uFFFD]ndler\b/g, replace: "Mittelständler" },
  { re: /\bmittelst[?\uFFFD]ndische\b/g, replace: "mittelständische" },
  { re: /\bmittelst[?\uFFFD]ndischen\b/g, replace: "mittelständischen" },
  { re: /\bMittelst[?\uFFFD]ndischen\b/g, replace: "Mittelständischen" },

  { re: /\bma[?\uFFFD]geschneiderten\b/g, replace: "maßgeschneiderten" },
  { re: /\bma[?\uFFFD]geschneiderte\b/g, replace: "maßgeschneiderte" },
  { re: /\bma[?\uFFFD]geschneidertes\b/g, replace: "maßgeschneidertes" },
  { re: /\bMa[?\uFFFD]nahmenkatalog\b/g, replace: "Maßnahmenkatalog" },
  { re: /\bMa[?\uFFFD]nahmen-Roadmap\b/g, replace: "Maßnahmen-Roadmap" },
  { re: /\bMa[?\uFFFD]nahmenplan\b/g, replace: "Maßnahmenplan" },
  { re: /\bMa[?\uFFFD]nahmen\b/g, replace: "Maßnahmen" },
  { re: /\bma[?\uFFFD]nahmen\b/g, replace: "maßnahmen" },
  { re: /\bAbwehrma[?\uFFFD]nahmen\b/g, replace: "Abwehrmaßnahmen" },
  { re: /\bCybersecurity-Ma[?\uFFFD]nahmen\b/g, replace: "Cybersecurity-Maßnahmen" },

  { re: /\bMusterstra[?\uFFFD]e\b/g, replace: "Musterstraße" },
  { re: /\bK[?\uFFFD]nigstra[?\uFFFD]e\b/g, replace: "Königstraße" },
  { re: /\bBaden-W[?\uFFFD]rttemberg\b/g, replace: "Baden-Württemberg" },

  { re: /\bVerf[?\uFFFD]gbarkeit\b/g, replace: "Verfügbarkeit" },
  { re: /\bHochverf[?\uFFFD]gbarkeit\b/g, replace: "Hochverfügbarkeit" },
  { re: /\bhochverf[?\uFFFD]gbaren\b/g, replace: "hochverfügbaren" },
  { re: /\bAnlagenverf[?\uFFFD]gbarkeit\b/g, replace: "Anlagenverfügbarkeit" },
  { re: /\bverf[?\uFFFD]gbar\b/g, replace: "verfügbar" },
  { re: /\bverf[?\uFFFD]gen\b/g, replace: "verfügen" },

  { re: /\bDatenschutzerkl[?\uFFFD]rung\b/g, replace: "Datenschutzerklärung" },
  { re: /\bGew[?\uFFFD]hrleistung\b/g, replace: "Gewährleistung" },
  { re: /\bgew[?\uFFFD]hrleisten\b/g, replace: "gewährleisten" },
  { re: /\bgew[?\uFFFD]hrleistet\b/g, replace: "gewährleistet" },

  { re: /\bEinsch[?\uFFFD]tzung\b/g, replace: "Einschätzung" },
  { re: /\bKritikalit[?\uFFFD]t\b/g, replace: "Kritikalität" },
  { re: /\bIntegrit[?\uFFFD]t\b/g, replace: "Integrität" },
  { re: /\bKonformit[?\uFFFD]t\b/g, replace: "Konformität" },
  { re: /\bRealit[?\uFFFD]t\b/g, replace: "Realität" },
  { re: /\bVer[?\uFFFD]nderungen\b/g, replace: "Veränderungen" },
  { re: /\bH[?\uFFFD]rtung\b/g, replace: "Härtung" },

  { re: /\berf[?\uFFFD]llen\b/g, replace: "erfüllen" },
  { re: /\bErf[?\uFFFD]llen\b/g, replace: "Erfüllen" },
  { re: /\bErf[?\uFFFD]llung\b/g, replace: "Erfüllung" },
  { re: /\bbef[?\uFFFD]higen\b/g, replace: "befähigen" },
  { re: /\bbef[?\uFFFD]higt\b/g, replace: "befähigt" },

  { re: /\bbeh[?\uFFFD]rdlich\b/g, replace: "behördlich" },
  { re: /\bBeh[?\uFFFD]rden\b/g, replace: "Behörden" },
  { re: /\bAufsichtsbeh[?\uFFFD]rde\b/g, replace: "Aufsichtsbehörde" },

  { re: /\bm[?\uFFFD]glich\b/g, replace: "möglich" },
  { re: /\berm[?\uFFFD]glichen\b/g, replace: "ermöglichen" },
  { re: /\bbed[?\uFFFD]rfen\b/g, replace: "bedürfen" },
  { re: /\bgef[?\uFFFD]hrden\b/g, replace: "gefährden" },
  { re: /\bgef[?\uFFFD]hrdet\b/g, replace: "gefährdet" },
  { re: /\bdar[?\uFFFD]ber\b/g, replace: "darüber" },

  { re: /\bunterst[?\uFFFD]tzen\b/g, replace: "unterstützen" },
  { re: /\bber[?\uFFFD]cksichtigt\b/g, replace: "berücksichtigt" },
  { re: /\bber[?\uFFFD]cksichtigen\b/g, replace: "berücksichtigen" },

  { re: /\bzus[?\uFFFD]tzlich\b/g, replace: "zusätzlich" },
  { re: /\bZus[?\uFFFD]tzlich\b/g, replace: "Zusätzlich" },
  { re: /\bZus[?\uFFFD]tzliche\b/g, replace: "Zusätzliche" },

  { re: /\bst[?\uFFFD]rken\b/g, replace: "stärken" },
  { re: /\bSt[?\uFFFD]rungen\b/g, replace: "Störungen" },
  { re: /\bst[?\uFFFD]ren\b/g, replace: "stören" },
  { re: /\bSt[?\uFFFD]rf[?\uFFFD]lle\b/g, replace: "Störfälle" },
  { re: /\bEind[?\uFFFD]mmung\b/g, replace: "Eindämmung" },

  { re: /\bGr[?\uFFFD]nder\b/g, replace: "Gründer" },
  { re: /\bK[?\uFFFD]pfe\b/g, replace: "Köpfe" },
  { re: /\bM[?\uFFFD]nchen\b/g, replace: "München" },
  { re: /\bM[?\uFFFD]rz\b/g, replace: "März" },
  { re: /\bFernw[?\uFFFD]rme\b/g, replace: "Fernwärme" },
  { re: /\bT[?\uFFFD]tigkeit\b/g, replace: "Tätigkeit" },

  { re: /\bT[?\uFFFD]V\b/g, replace: "TÜV" },

  { re: /\bK[?\uFFFD]ndigung\b/g, replace: "Kündigung" },
  { re: /\bK[?\uFFFD]ndigungsfrist\b/g, replace: "Kündigungsfrist" },
  { re: /\bk[?\uFFFD]ndbar\b/g, replace: "kündbar" },

  { re: /\bGesch[?\uFFFD]ftsbedingungen\b/g, replace: "Geschäftsbedingungen" },
  { re: /\bGesch[?\uFFFD]ftskontinuit/g, replace: "Geschäftskontinuit" },
  { re: /\bGeschäftskontinuit[?\uFFFD]t\b/g, replace: "Geschäftskontinuität" },
  { re: /\bGesch[?\uFFFD]ftsf/g, replace: "Geschäftsf" },
  { re: /\bgegen[?\uFFFD]ber\b/g, replace: "gegenüber" },
  { re: /\bAngriffsfl[?\uFFFD]che\b/g, replace: "Angriffsfläche" },
  { re: /\bProduktionsstillst[?\uFFFD]nde\b/g, replace: "Produktionsstillstände" },
  { re: /Produktionsstillst[?\uFFFD]nden/g, replace: "Produktionsstillständen" },
  { re: /\bManagement-Pr[?\uFFFD]sentation\b/g, replace: "Management-Präsentation" },
  { re: /\bf[?\uFFFD]hren\b/g, replace: "führen" },
  { re: /\bf[?\uFFFD]hrende\b/g, replace: "führende" },
  { re: /\bf[?\uFFFD]hrenden\b/g, replace: "führenden" },
  { re: /f[?\uFFFD]hrenden/g, replace: "führenden" },
  { re: /f[?\uFFFD]hrende/g, replace: "führende" },
  { re: /\bsch[?\uFFFD]tzte\b/g, replace: "schützte" },
  { re: /\bTabletop-[?\uFFFD]bung\b/g, replace: "Tabletop-Übung" },
  { re: /\bBC-[?\uFFFD]bung\b/g, replace: "BC-Übung" },
  { re: /\bChargen-R[?\uFFFD]ckrufe\b/g, replace: "Chargen-Rückrufe" },
  { re: /\bbetr[?\uFFFD]gt\b/g, replace: "beträgt" },
  { re: /\bVerst[?\uFFFD]ndnis\b/g, replace: "Verständnis" },
  { re: /\bOT-Verst[?\uFFFD]ndnis\b/g, replace: "OT-Verständnis" },
  { re: /\bBed[?\uFFFD]rfnisse\b/g, replace: "Bedürfnisse" },
  { re: /\bausdr[?\uFFFD]cklich\b/g, replace: "ausdrücklich" },
  { re: /\btats[?\uFFFD]chlichen\b/g, replace: "tatsächlichen" },
  { re: /\bEinschr[?\uFFFD]nkung\b/g, replace: "Einschränkung" },
  { re: /\bEinschr[?\uFFFD]nkungen\b/g, replace: "Einschränkungen" },
  { re: /\bSch[?\uFFFD]den\b/g, replace: "Schäden" },
  { re: /\bsp[?\uFFFD]t\b/g, replace: "spät" },
  { re: /\bVerg[?\uFFFD]tung\b/g, replace: "Vergütung" },

  // Remaining one-offs (mainly legal/master-doc copy)
  { re: /\bhochverf[?\uFFFD]gbare\b/g, replace: "hochverfügbare" },
  { re: /\bAtmosph[?\uFFFD]re\b/g, replace: "Atmosphäre" },
  { re: /\bAtmosph[?\uFFFD]ren\b/g, replace: "Atmosphären" },
  { re: /\bUnterst[?\uFFFD]tzung\b/g, replace: "Unterstützung" },
  { re: /\bKI-gest[?\uFFFD]tzte\b/g, replace: "KI-gestützte" },
  { re: /\bKI-unterst[?\uFFFD]tzte\b/g, replace: "KI-unterstützte" },
  { re: /\bAI-gest[?\uFFFD]tzte\b/g, replace: "AI-gestützte" },
  { re: /\bS[?\uFFFD]ulen\b/g, replace: "Säulen" },
  { re: /\bIT-Security-Ger[?\uFFFD]te\b/g, replace: "IT-Security-Geräte" },
  { re: /\bFeldger[?\uFFFD]te\b/g, replace: "Feldgeräte" },
  { re: /\bGer[?\uFFFD]te\b/g, replace: "Geräte" },
  { re: /\bVerteidigungsf[?\uFFFD]higkeit\b/g, replace: "Verteidigungsfähigkeit" },
  { re: /\bPersonensch[?\uFFFD]den\b/g, replace: "Personenschäden" },
  { re: /\bLösungsans[?\uFFFD]tze\b/g, replace: "Lösungsansätze" },
  { re: /\bz[?\uFFFD]hlt\b/g, replace: "zählt" },
  { re: /\bMa[?\uFFFD]nahmenplans\b/g, replace: "Maßnahmenplans" },
  { re: /\bprim[?\uFFFD]res\b/g, replace: "primäres" },
  { re: /\bGeh[?\uFFFD]rtete\b/g, replace: "Gehärtete" },
  { re: /\bg[?\uFFFD]ngigen\b/g, replace: "gängigen" },
  { re: /\bKommunikationskan[?\uFFFD]len\b/g, replace: "Kommunikationskanälen" },
  { re: /\bBew[?\uFFFD]hrte\b/g, replace: "Bewährte" },
  { re: /\bSicherheitsvorf[?\uFFFD]llen\b/g, replace: "Sicherheitsvorfällen" },
  { re: /\bSecurity-Vorf[?\uFFFD]llen\b/g, replace: "Security-Vorfällen" },
  { re: /\bGeschäftsf[?\uFFFD]hrung\b/g, replace: "Geschäftsführung" },
  { re: /\bsp[?\uFFFD]testens\b/g, replace: "spätestens" },
  { re: /\bM[?\uFFFD]glichkeit\b/g, replace: "Möglichkeit" },
  { re: /\bunbeschr[?\uFFFD]nkt\b/g, replace: "unbeschränkt" },
  { re: /\bProzessintegrit[?\uFFFD]t\b/g, replace: "Prozessintegrität" },
  { re: /\bFernwartungszug[?\uFFFD]nge\b/g, replace: "Fernwartungszugänge" },
  { re: /\bzuz[?\uFFFD]glich\b/g, replace: "zuzüglich" },
  { re: /\bTabletop-[?\uFFFD]bungen\b/g, replace: "Tabletop-Übungen" },
  { re: /\bTabletop-[?\uFFFD]bungen\b/g, replace: "Tabletop-Übungen" },
  { re: /\bR[?\uFFFD]ckrufe\b/g, replace: "Rückrufe" },
  { re: /\bR[?\uFFFD]ckgrat\b/g, replace: "Rückgrat" },
  { re: /\bEurop[?\uFFFD]ische\b/g, replace: "Europäische" },
  { re: /\bAktualit[?\uFFFD]t\b/g, replace: "Aktualität" },
  { re: /\bAktivit[?\uFFFD]ten\b/g, replace: "Aktivitäten" },
  { re: /\bLehrb[?\uFFFD]chern\b/g, replace: "Lehrbüchern" },
  { re: /\bdiesbez[?\uFFFD]gliche\b/g, replace: "diesbezügliche" },
  { re: /\bbest[?\uFFFD]tigten\b/g, replace: "bestätigten" },
  { re: /\bexplosionsf[?\uFFFD]higen\b/g, replace: "explosionsfähigen" },
  { re: /\bexplosionsf[?\uFFFD]higen\b/g, replace: "explosionsfähigen" },
  { re: /\berh[?\uFFFD]lt\b/g, replace: "erhält" },
  { re: /\bf[?\uFFFD]nf\b/g, replace: "fünf" },
  { re: /\bM[?\uFFFD]ngelr/g, replace: "Mängelr" },
  { re: /\bM[?\uFFFD]ngelanspr/g, replace: "Mängelanspr" },
  { re: /\bMängelanspr[?\uFFFD]che\b/g, replace: "Mängelansprüche" },
  { re: /\bMängelr[?\uFFFD]gen\b/g, replace: "Mängelrügen" },
  { re: /\bM[?\uFFFD]ngel\b/g, replace: "Mängel" },
  { re: /\b30-min[?\uFFFD]tigen\b/g, replace: "30-minütigen" },
  { re: /\bHerstellerunabh[?\uFFFD]ngig\b/g, replace: "Herstellerunabhängig" },
  { re: /\bfunktionsf[?\uFFFD]higen\b/g, replace: "funktionsfähigen" },
  { re: /\bVerschl[?\uFFFD]sselung\b/g, replace: "Verschlüsselung" },
  { re: /\bFernwirk-Verschl[?\uFFFD]sselung\b/g, replace: "Fernwirk-Verschlüsselung" },
  { re: /\bgrunds[?\uFFFD]tzlich\b/g, replace: "grundsätzlich" },
  { re: /\bAnomalie-[?\uFFFD]berwachung\b/g, replace: "Anomalie-Überwachung" },
  { re: /\bDNP3-[?\uFFFD]berwachung\b/g, replace: "DNP3-Überwachung" },
  { re: /\bK[?\uFFFD]rpers\b/g, replace: "Körpers" },
  { re: /\bPr[?\uFFFD]sentation\b/g, replace: "Präsentation" },
  { re: /\bVerf[?\uFFFD]gung\b/g, replace: "Verfügung" },
  { re: /\binh[?\uFFFD]rent\b/g, replace: "inhärent" },
  { re: /\bKritikalit[?\uFFFD]ts-Bewertung\b/g, replace: "Kritikalitäts-Bewertung" },
  { re: /\bl[?\uFFFD]ckenloses\b/g, replace: "lückenloses" },
  { re: /\bdurchgef[?\uFFFD]hrt\b/g, replace: "durchgeführt" },
  { re: /\benth[?\uFFFD]lt\b/g, replace: "enthält" },
  { re: /\bMa[?\uFFFD]nahmenpl/g, replace: "Maßnahmenpl" },
  { re: /\bMaßnahmenpl[?\uFFFD]ne\b/g, replace: "Maßnahmenpläne" },
  { re: /\bg[?\uFFFD]ltige\b/g, replace: "gültige" },
  { re: /\bg[?\uFFFD]ltig\b/g, replace: "gültig" },
  { re: /\bDaten[?\uFFFD]bertragbarkeit\b/g, replace: "Datenübertragbarkeit" },
  { re: /\bunz[?\uFFFD]hlige\b/g, replace: "unzählige" },
  { re: /\bbew[?\uFFFD]hrter\b/g, replace: "bewährter" },
  { re: /\bw[?\uFFFD]chst\b/g, replace: "wächst" },
  { re: /\bdaf[?\uFFFD]r\b/g, replace: "dafür" },
  { re: /\bfr[?\uFFFD]hzeitig\b/g, replace: "frühzeitig" },
  { re: /\berm[?\uFFFD]glicht\b/g, replace: "ermöglicht" },
  { re: /\bImplementation-Unterst[?\uFFFD]tzung\b/g, replace: "Implementation-Unterstützung" },
  { re: /\bLet[?\uFFFD]s\b/g, replace: "Let's" },
  { re: /\bzur[?\uFFFD]ckgezogen\b/g, replace: "zurückgezogen" },
  { re: /\bvollst[?\uFFFD]ndiger\b/g, replace: "vollständiger" },
  { re: /\berh[?\uFFFD]hen\b/g, replace: "erhöhen" },
  { re: /\bNetzwerkpl[?\uFFFD]ne\b/g, replace: "Netzwerkpläne" },
  { re: /\bUnabh[?\uFFFD]ngige\b/g, replace: "Unabhängige" },
  { re: /\bUmst[?\uFFFD]nden\b/g, replace: "Umständen" },
  { re: /\bAbh[?\uFFFD]ngigkeiten\b/g, replace: "Abhängigkeiten" },
  { re: /\bKomplexit[?\uFFFD]t\b/g, replace: "Komplexität" },
  { re: /\bversch[?\uFFFD]rfen\b/g, replace: "verschärfen" },
  { re: /\bversch[?\uFFFD]rfen\b/g, replace: "verschärfen" },
  { re: /\bbeh[?\uFFFD]rdlicher\b/g, replace: "behördlicher" },
  { re: /\bFernw[?\uFFFD]rmeanlagen\b/g, replace: "Fernwärmeanlagen" },
  { re: /\bNotfallpl[?\uFFFD]ne\b/g, replace: "Notfallpläne" },
  { re: /\berkl[?\uFFFD]ren\b/g, replace: "erklären" },
  { re: /\bPraxisf[?\uFFFD]llen\b/g, replace: "Praxisfällen" },
  { re: /\bpr[?\uFFFD]fsicheren\b/g, replace: "prüfsicheren" },
  { re: /\bvor[?\uFFFD]bergehende\b/g, replace: "vorübergehende" },
  { re: /\bBer[?\uFFFD]cksichtigung\b/g, replace: "Berücksichtigung" },
  { re: /\burspr[?\uFFFD]nglichen\b/g, replace: "ursprünglichen" },
  { re: /\beinged[?\uFFFD]mmt\b/g, replace: "eingedämmt" },
  { re: /\bL[?\uFFFD]sungsmittel-Produktion\b/g, replace: "Lösungsmittel-Produktion" },
  { re: /\bL[?\uFFFD]sungsmittel\b/g, replace: "Lösungsmittel" },
  { re: /\bge[?\uFFFD]nderter\b/g, replace: "geänderter" },
  { re: /-unterst[?\uFFFD]tzung\b/g, replace: "-unterstützung" },
  { re: /\bvors[?\uFFFD]tzlich\b/g, replace: "vorsätzlich" },

  { re: /\bFr[?\uFFFD]hzeitige\b/g, replace: "Frühzeitige" },
  { re: /\berg[?\uFFFD]nzen\b/g, replace: "ergänzen" },
  { re: /\bsp[?\uFFFD]ter\b/g, replace: "später" },
  { re: /\bgesch[?\uFFFD]tzt\b/g, replace: "geschützt" },
  { re: /\bgew[?\uFFFD]nscht\b/g, replace: "gewünscht" },
  { re: /\bgew[?\uFFFD]nschtem\b/g, replace: "gewünschtem" },
  { re: /\bKabelf[?\uFFFD]hrung\b/g, replace: "Kabelführung" },
  { re: /\bEbersp[?\uFFFD]cher\b/g, replace: "Eberspächer" },
  { re: /\bschlie[?\uFFFD]en\b/g, replace: "schließen" },
  { re: /\bvollst[?\uFFFD]ndiges\b/g, replace: "vollständiges" },
  { re: /\bvollst[?\uFFFD]ndigen\b/g, replace: "vollständigen" },
  { re: /\bunvollst[?\uFFFD]ndig\b/g, replace: "unvollständig" },
  { re: /\bCyber-Versicherungspr[?\uFFFD]mie\b/g, replace: "Cyber-Versicherungsprämie" },
  { re: /\bVersicherungspr[?\uFFFD]mie\b/g, replace: "Versicherungsprämie" },
  { re: /\bf[?\uFFFD]llen\b/g, replace: "füllen" },
  { re: /\bF[?\uFFFD]llen\b/g, replace: "Fällen" },
  { re: /\bunverz[?\uFFFD]glich\b/g, replace: "unverzüglich" },
  { re: /\bRezeptur-[?\uFFFD]nderungen\b/g, replace: "Rezeptur-Änderungen" },
  { re: /\bVertr[?\uFFFD]ge\b/g, replace: "Verträge" },
  { re: /\bVertr[?\uFFFD]gen\b/g, replace: "Verträgen" },
  { re: /\bVertragsverh[?\uFFFD]ltnisses\b/g, replace: "Vertragsverhältnisses" },
  { re: /\beinschl[?\uFFFD]gigen\b/g, replace: "einschlägigen" },
  { re: /\bWettbewerbsf[?\uFFFD]higkeit\b/g, replace: "Wettbewerbsfähigkeit" },
  { re: /\bVorf[?\uFFFD]lle\b/g, replace: "Vorfälle" },
  { re: /\bSicherheitsvorf[?\uFFFD]lle\b/g, replace: "Sicherheitsvorfälle" },
  { re: /\bCyber-Vorf[?\uFFFD]lle\b/g, replace: "Cyber-Vorfälle" },
  { re: /\bVerz[?\uFFFD]gerungen\b/g, replace: "Verzögerungen" },
  { re: /\bTermin-Pr[?\uFFFD]ferenz\b/g, replace: "Termin-Präferenz" },
  { re: /\bVervollst[?\uFFFD]ndigung\b/g, replace: "Vervollständigung" },
  { re: /\bVervielf[?\uFFFD]ltigung\b/g, replace: "Vervielfältigung" },
  { re: /\bverd[?\uFFFD]chtige\b/g, replace: "verdächtige" },
  { re: /\bCyber-Kriegsf[?\uFFFD]hrung\b/g, replace: "Cyber-Kriegsführung" },
  { re: /\bProduction-Ausf[?\uFFFD]lle\b/g, replace: "Production-Ausfälle" },
  { re: /\bProduktionsausf[?\uFFFD]lle\b/g, replace: "Produktionsausfälle" },
  { re: /\bProduktionsrealit[?\uFFFD]t\b/g, replace: "Produktionsrealität" },
  { re: /\bGesch[?\uFFFD]ftsprozesse\b/g, replace: "Geschäftsprozesse" },
  { re: /\bSupport-[?\uFFFD]bergabe\b/g, replace: "Support-Übergabe" },
  { re: /\bunterst[?\uFFFD]tzt\b/g, replace: "unterstützt" },
  { re: /\bpr[?\uFFFD]zise\b/g, replace: "präzise" },
  { re: /\b[?\uFFFD]berf[?\uFFFD]llig\b/g, replace: "überfällig" },
  { re: /[?\uFFFD]berf[?\uFFFD]llig/g, replace: "überfällig" },
  { re: /\bK[?\uFFFD]rze\b/g, replace: "Kürze" },
  { re: /\bk[?\uFFFD]rzester\b/g, replace: "kürzester" },
  { re: /\bunverschl[?\uFFFD]sselt\b/g, replace: "unverschlüsselt" },
  { re: /\bvielf[?\uFFFD]ltig\b/g, replace: "vielfältig" },
  { re: /\bAsset-Kritikalit[?\uFFFD]ts-Bewertung\b/g, replace: "Asset-Kritikalitäts-Bewertung" },
  { re: /\bIndustriestra[?\uFFFD]e\b/g, replace: "Industriestraße" },
  { re: /\bma[?\uFFFD]geschneidert\b/g, replace: "maßgeschneidert" },
  { re: /\bexplosionsf[?\uFFFD]hige\b/g, replace: "explosionsfähige" },
  { re: /\bExplosionsgesch[?\uFFFD]tzte\b/g, replace: "Explosionsgeschützte" },
  { re: /\bHands-on-Mentalit[?\uFFFD]t\b/g, replace: "Hands-on-Mentalität" },
  { re: /\bzus[?\uFFFD]tzliche\b/g, replace: "zusätzliche" },
  { re: /\bPriorit[?\uFFFD]ts-Support\b/g, replace: "Prioritäts-Support" },
  { re: /\bPriorit[?\uFFFD]ts-Incident-Support\b/g, replace: "Prioritäts-Incident-Support" },
  { re: /\bSt[?\uFFFD]rung\b/g, replace: "Störung" },
  { re: /\bSystem[?\uFFFD]bersicht\b/g, replace: "Systemübersicht" },
  { re: /\bGew[?\uFFFD]hr\b/g, replace: "Gewähr" },
  { re: /\bh[?\uFFFD]heres\b/g, replace: "höheres" },
  { re: /\bPr[?\uFFFD]fsichere\b/g, replace: "Prüfsichere" },
  { re: /\bPr[?\uFFFD]fen\b/g, replace: "Prüfen" },
  { re: /\bPr[?\uFFFD]fer\b/g, replace: "Prüfer" },
  { re: /\bProduktqualit[?\uFFFD]t\b/g, replace: "Produktqualität" },
  { re: /\bSicherheitsma[?\uFFFD]nahmen\b/g, replace: "Sicherheitsmaßnahmen" },
  { re: /\bS[?\uFFFD]D\b/g, replace: "SÜD" },
  { re: /\bn[?\uFFFD]chsten\b/g, replace: "nächsten" },
  { re: /\bFernw[?\uFFFD]rmeanbieter\b/g, replace: "Fernwärmeanbieter" },
  { re: /\bDatenintegrit[?\uFFFD]t\b/g, replace: "Datenintegrität" },
  { re: /\bDatenintegrit[?\uFFFD]ts-Validierung\b/g, replace: "Datenintegritäts-Validierung" },
  { re: /\bR[?\uFFFD]umlichkeiten\b/g, replace: "Räumlichkeiten" },
  { re: /\bj[?\uFFFD]hrliche\b/g, replace: "jährliche" },
  { re: /\bverl[?\uFFFD]ngerbar\b/g, replace: "verlängerbar" },
  { re: /\bAudit-Geb[?\uFFFD]hren\b/g, replace: "Audit-Gebühren" },
  { re: /\bIncident-Response-Unterst[?\uFFFD]tzung\b/g, replace: "Incident-Response-Unterstützung" },
  { re: /\bL[?\uFFFD]sungsans/g, replace: "Lösungsans" },
  { re: /\bEinf[?\uFFFD]hrung\b/g, replace: "Einführung" },
  { re: /\bben[?\uFFFD]tigen\b/g, replace: "benötigen" },
  { re: /\bH[?\uFFFD]ufige\b/g, replace: "Häufige" },
  { re: /\bGeb[?\uFFFD]hr\b/g, replace: "Gebühr" },
  { re: /\bH[?\uFFFD]chste\b/g, replace: "Höchste" },
  { re: /\bverst[?\uFFFD]ndlichen\b/g, replace: "verständlichen" },
  { re: /\bDauerschuldverh[?\uFFFD]ltnissen\b/g, replace: "Dauerschuldverhältnissen" },
  { re: /\bzuf[?\uFFFD]lligen\b/g, replace: "zufälligen" },
  { re: /\bbeeintr[?\uFFFD]chtigen\b/g, replace: "beeinträchtigen" },
  { re: /\bFahrl[?\uFFFD]ssigkeit\b/g, replace: "Fahrlässigkeit" },
  { re: /\bfahrl[?\uFFFD]ssig\b/g, replace: "fahrlässig" },
  { re: /\bAuftr[?\uFFFD]ge\b/g, replace: "Aufträge" },
  { re: /\btats[?\uFFFD]chlichem\b/g, replace: "tatsächlichem" },
  { re: /\bVertraulichkeitsgr[?\uFFFD]nden\b/g, replace: "Vertraulichkeitsgründen" },
  { re: /\bh[?\uFFFD]ren\b/g, replace: "hören" },
  { re: /\bSt[?\uFFFD]rfallverordnung\b/g, replace: "Störfallverordnung" },
  { re: /\bKl[?\uFFFD]ranlagen\b/g, replace: "Kläranlagen" },
  { re: /\baush[?\uFFFD]ndigen\b/g, replace: "aushändigen" },
  { re: /\bProduktr[?\uFFFD]ckrufe\b/g, replace: "Produktrückrufe" },
  { re: /\bk[?\uFFFD]mpfen\b/g, replace: "kämpfen" },
  { re: /\bVerj[?\uFFFD]hrungsfrist\b/g, replace: "Verjährungsfrist" },
  { re: /\bversch[?\uFFFD]rften\b/g, replace: "verschärften" },
  { re: /\bbranchenf[?\uFFFD]hrenden\b/g, replace: "branchenführenden" },
  { re: /\bProduktionsverf[?\uFFFD]gbarkeit\b/g, replace: "Produktionsverfügbarkeit" },
  { re: /\bsch[?\uFFFD]tzte\b/g, replace: "schützte" },
  { re: /\bBef[?\uFFFD]higung\b/g, replace: "Befähigung" },
  { re: /\bDurchf[?\uFFFD]hrung\b/g, replace: "Durchführung" },
  { re: /\bSicherheitsl[?\uFFFD]cke\b/g, replace: "Sicherheitslücke" },
  { re: /\bErg[?\uFFFD]nzungen\b/g, replace: "Ergänzungen" },
  { re: /\bUnabh[?\uFFFD]ngig\b/g, replace: "Unabhängig" },
  { re: /\bGeschäftsf[?\uFFFD]hrer\b/g, replace: "Geschäftsführer" },
  { re: /\bS[?\uFFFD]ddeutschland\b/g, replace: "Süddeutschland" },
  { re: /\bTagess[?\uFFFD]tzen\b/g, replace: "Tagessätzen" },
  { re: /\bpropriet[?\uFFFD]re\b/g, replace: "proprietäre" },
  { re: /\bgegr[?\uFFFD]ndet\b/g, replace: "gegründet" },
  { re: /\bausl[?\uFFFD]sen\b/g, replace: "auslösen" },
  { re: /\bgro[?\uFFFD]es\b/g, replace: "großes" },
  { re: /\bMittelst[?\uFFFD]ndischer\b/g, replace: "Mittelständischer" },
  { re: /\bAtmosph[?\uFFFD]ren\b/g, replace: "Atmosphären" },

  { re: /\bSchlie[?\uFFFD]ung\b/g, replace: "Schließung" },
  { re: /\bausschlie[?\uFFFD]lich\b/g, replace: "ausschließlich" },
  { re: /\bau[?\uFFFD]erhalb\b/g, replace: "außerhalb" },
  { re: /\bau[?\uFFFD]erordentlichen\b/g, replace: "außerordentlichen" },
  { re: /\bunber[?\uFFFD]hrt\b/g, replace: "unberührt" },
  { re: /\bBu[?\uFFFD]gelder\b/g, replace: "Bußgelder" },
  { re: /\bBu[?\uFFFD]geldern\b/g, replace: "Bußgeldern" },

  { re: /\bH[?\uFFFD]he\b/g, replace: "Höhe" },
  { re: /\bGr[?\uFFFD]nden\b/g, replace: "Gründen" },
  { re: /\bd[?\uFFFD]rfen\b/g, replace: "dürfen" },
  { re: /\bPl[?\uFFFD]ne\b/g, replace: "Pläne" },
  { re: /\bBC-Pl[?\uFFFD]ne\b/g, replace: "BC-Pläne" },

  { re: /\bLeitf[?\uFFFD]den\b/g, replace: "Leitfäden" },
  { re: /\bNachweisf[?\uFFFD]hrung\b/g, replace: "Nachweisführung" },
  { re: /\bBSI-Pr[?\uFFFD]fung\b/g, replace: "BSI-Prüfung" },
  { re: /\bPr[?\uFFFD]fung\b/g, replace: "Prüfung" },

  { re: /\babh[?\uFFFD]ngig\b/g, replace: "abhängig" },
  { re: /\bunabh[?\uFFFD]ngig\b/g, replace: "unabhängig" },
  { re: /\bherstellerunabh[?\uFFFD]ngig\b/g, replace: "herstellerunabhängig" },

  { re: /\bvollst[?\uFFFD]ndige\b/g, replace: "vollständige" },
  { re: /\bVollst[?\uFFFD]ndiges\b/g, replace: "Vollständiges" },
  { re: /\bVollst[?\uFFFD]ndiger\b/g, replace: "Vollständiger" },
  { re: /\bvollst[?\uFFFD]ndig\b/g, replace: "vollständig" },

  { re: /\bIT-Security-L[?\uFFFD]sungen\b/g, replace: "IT-Security-Lösungen" },
  { re: /\bOT-Sicherheitsl[?\uFFFD]sungen\b/g, replace: "OT-Sicherheitslösungen" },
  { re: /\bSicherheitsl[?\uFFFD]sungen\b/g, replace: "Sicherheitslösungen" },
  { re: /\bL[?\uFFFD]sungspakete\b/g, replace: "Lösungspakete" },
  { re: /\bL[?\uFFFD]cken\b/g, replace: "Lücken" },
  { re: /\bL[?\uFFFD]cke\b/g, replace: "Lücke" },
  { re: /\bL[?\uFFFD]schung\b/g, replace: "Löschung" },
  { re: /\bLuftschl[?\uFFFD]sser\b/g, replace: "Luftschlösser" },
  { re: /\bFertigungsstra[?\uFFFD]e\b/g, replace: "Fertigungsstraße" },

  { re: /\bBetriebsabl[?\uFFFD]ufe\b/g, replace: "Betriebsabläufe" },
  { re: /\bw[?\uFFFD]hrend\b/g, replace: "während" },
  { re: /\bl[?\uFFFD]uft\b/g, replace: "läuft" },
  { re: /\bw[?\uFFFD]hlen\b/g, replace: "wählen" },
  { re: /\bw[?\uFFFD]nschen\b/g, replace: "wünschen" },

  // Legal header markers: "§" in AGB sometimes became "�"
  { re: /�\s*(\d+)/g, replace: "§ $1" },
];

function applyFixes(input) {
  let text = input;

  for (const [from, to] of MOJIBAKE_REPLACEMENTS) {
    if (text.includes(from)) text = text.replaceAll(from, to);
  }

  for (const rule of REGEX_RULES) {
    text = text.replace(rule.re, rule.replace);
  }

  return text;
}

async function main() {
  const allFiles = await walk(WEBSITE_DIR);
  const textFiles = allFiles.filter((p) => TEXT_EXTENSIONS.has(path.extname(p).toLowerCase()));

  let changedFiles = 0;
  for (const filePath of textFiles) {
    const original = await fs.readFile(filePath, "utf8");
    const fixed = applyFixes(original);
    if (fixed !== original) {
      await fs.writeFile(filePath, fixed, "utf8");
      changedFiles += 1;
    }
  }

  console.log(`Encoding fix done. Changed files: ${changedFiles}/${textFiles.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
