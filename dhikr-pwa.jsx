import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PRESET_DHIKR = [
  { id: "subhanallah", arabic: "سُبْحَانَ اللّٰهِ", transliteration: "SubhanAllah", translation: "Glory be to Allah", category: "Core" },
  { id: "alhamdulillah", arabic: "الْحَمْدُ لِلّٰهِ", transliteration: "Alhamdulillah", translation: "All praise is due to Allah", category: "Core" },
  { id: "allahuakbar", arabic: "اللّٰهُ أَكْبَرُ", transliteration: "Allahu Akbar", translation: "Allah is the Greatest", category: "Core" },
  { id: "lailahaillallah", arabic: "لَا إِلٰهَ إِلَّا اللّٰهُ", transliteration: "La ilaha illallah", translation: "There is no god but Allah", category: "Core" },
  { id: "astaghfirullah", arabic: "أَسْتَغْفِرُ اللّٰهَ", transliteration: "Astaghfirullah", translation: "I seek forgiveness from Allah", category: "Core" },
  { id: "hasbunallah", arabic: "حَسْبُنَا اللّٰهُ وَنِعْمَ الْوَكِيلُ", transliteration: "Hasbunallahu wa ni'mal wakeel", translation: "Allah is sufficient for us and He is the best disposer of affairs", category: "Core" },
  { id: "salawat", arabic: "اللّٰهُمَّ صَلِّ عَلَى مُحَمَّدٍ", transliteration: "Allahumma salli 'ala Muhammad", translation: "O Allah, send blessings upon Muhammad", category: "Salawat" },
  { id: "salawat2", arabic: "صَلَّى اللّٰهُ عَلَيْهِ وَسَلَّمَ", transliteration: "Sallallahu 'alayhi wa sallam", translation: "May Allah's peace and blessings be upon him", category: "Salawat" },
  { id: "bismillah", arabic: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ", transliteration: "Bismillahi-r-rahmani-r-raheem", translation: "In the name of Allah, the Most Gracious, the Most Merciful", category: "Morning" },
  { id: "morning1", arabic: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلّٰهِ", transliteration: "Asbahna wa asbahal mulku lillah", translation: "We have reached the morning and the dominion belongs to Allah", category: "Morning" },
  { id: "evening1", arabic: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلّٰهِ", transliteration: "Amsayna wa amsal mulku lillah", translation: "We have reached the evening and the dominion belongs to Allah", category: "Evening" },
  { id: "tasbih1", arabic: "سُبْحَانَ اللّٰهِ وَبِحَمْدِهِ", transliteration: "SubhanAllahi wa bihamdih", translation: "Glory be to Allah and His is the praise", category: "Core" },
  { id: "tasbih2", arabic: "سُبْحَانَ اللّٰهِ الْعَظِيمِ", transliteration: "SubhanAllahil 'Azeem", translation: "Glory be to Allah the Magnificent", category: "Core" },
  { id: "hawqala", arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللّٰهِ", transliteration: "La hawla wa la quwwata illa billah", translation: "There is no power nor strength except with Allah", category: "Core" },
  // 99 Names
  { id: "ar-rahman", arabic: "يَا رَحْمٰنُ", transliteration: "Ya Rahman", translation: "O Most Gracious", category: "99 Names" },
  { id: "ar-raheem", arabic: "يَا رَحِيمُ", transliteration: "Ya Raheem", translation: "O Most Merciful", category: "99 Names" },
  { id: "al-malik", arabic: "يَا مَلِكُ", transliteration: "Ya Malik", translation: "O King/Sovereign", category: "99 Names" },
  { id: "al-quddus", arabic: "يَا قُدُّوسُ", transliteration: "Ya Quddus", translation: "O Most Pure", category: "99 Names" },
  { id: "as-salam", arabic: "يَا سَلَامُ", transliteration: "Ya Salam", translation: "O Source of Peace", category: "99 Names" },
  { id: "al-mumin", arabic: "يَا مُؤْمِنُ", transliteration: "Ya Mu'min", translation: "O Guardian of Faith", category: "99 Names" },
  { id: "al-ghaffar", arabic: "يَا غَفَّارُ", transliteration: "Ya Ghaffar", translation: "O All-Forgiving", category: "99 Names" },
  { id: "al-wahhab", arabic: "يَا وَهَّابُ", transliteration: "Ya Wahhab", translation: "O Bestower of Gifts", category: "99 Names" },
  { id: "al-razzaq", arabic: "يَا رَزَّاقُ", transliteration: "Ya Razzaq", translation: "O Provider", category: "99 Names" },
  { id: "al-fattah", arabic: "يَا فَتَّاحُ", transliteration: "Ya Fattah", translation: "O Opener/Granter of Victory", category: "99 Names" },
  { id: "al-aleem", arabic: "يَا عَلِيمُ", transliteration: "Ya 'Aleem", translation: "O All-Knowing", category: "99 Names" },
  { id: "al-qabid", arabic: "يَا قَابِضُ", transliteration: "Ya Qabid", translation: "O Constrictor", category: "99 Names" },
  { id: "al-basit", arabic: "يَا بَاسِطُ", transliteration: "Ya Basit", translation: "O Expander", category: "99 Names" },
  { id: "al-hafid", arabic: "يَا خَافِضُ", transliteration: "Ya Khafid", translation: "O Abaser", category: "99 Names" },
  { id: "ar-rafi", arabic: "يَا رَافِعُ", transliteration: "Ya Rafi'", translation: "O Exalter", category: "99 Names" },
  { id: "al-muizz", arabic: "يَا مُعِزُّ", transliteration: "Ya Mu'izz", translation: "O Bestower of Honours", category: "99 Names" },
  { id: "al-muzill", arabic: "يَا مُذِلُّ", transliteration: "Ya Muzill", translation: "O Humiliator", category: "99 Names" },
  { id: "as-sami", arabic: "يَا سَمِيعُ", transliteration: "Ya Sami'", translation: "O All-Hearing", category: "99 Names" },
  { id: "al-basir", arabic: "يَا بَصِيرُ", transliteration: "Ya Basir", translation: "O All-Seeing", category: "99 Names" },
  { id: "al-hakam", arabic: "يَا حَكَمُ", transliteration: "Ya Hakam", translation: "O Judge", category: "99 Names" },
  { id: "al-adl", arabic: "يَا عَدْلُ", transliteration: "Ya 'Adl", translation: "O Just", category: "99 Names" },
  { id: "al-lateef", arabic: "يَا لَطِيفُ", transliteration: "Ya Lateef", translation: "O Subtle/Kind", category: "99 Names" },
  { id: "al-khabir", arabic: "يَا خَبِيرُ", transliteration: "Ya Khabir", translation: "O All-Aware", category: "99 Names" },
  { id: "al-haleem", arabic: "يَا حَلِيمُ", transliteration: "Ya Haleem", translation: "O Forbearing", category: "99 Names" },
  { id: "al-azeem", arabic: "يَا عَظِيمُ", transliteration: "Ya 'Azeem", translation: "O Magnificent", category: "99 Names" },
  { id: "al-ghafur", arabic: "يَا غَفُورُ", transliteration: "Ya Ghafur", translation: "O Forgiving", category: "99 Names" },
  { id: "ash-shakur", arabic: "يَا شَكُورُ", transliteration: "Ya Shakur", translation: "O Appreciative", category: "99 Names" },
  { id: "al-ali", arabic: "يَا عَلِيُّ", transliteration: "Ya 'Aliyy", translation: "O Most High", category: "99 Names" },
  { id: "al-kabir", arabic: "يَا كَبِيرُ", transliteration: "Ya Kabir", translation: "O Most Great", category: "99 Names" },
  { id: "al-hafiz", arabic: "يَا حَفِيظُ", transliteration: "Ya Hafiz", translation: "O Preserver", category: "99 Names" },
  { id: "al-muqit", arabic: "يَا مُقِيتُ", transliteration: "Ya Muqit", translation: "O Nourisher", category: "99 Names" },
  { id: "al-hasib", arabic: "يَا حَسِيبُ", transliteration: "Ya Hasib", translation: "O Reckoner", category: "99 Names" },
  { id: "al-jalil", arabic: "يَا جَلِيلُ", transliteration: "Ya Jalil", translation: "O Majestic", category: "99 Names" },
  { id: "al-karim", arabic: "يَا كَرِيمُ", transliteration: "Ya Karim", translation: "O Most Generous", category: "99 Names" },
  { id: "ar-raqib", arabic: "يَا رَقِيبُ", transliteration: "Ya Raqib", translation: "O Watchful", category: "99 Names" },
  { id: "al-mujib", arabic: "يَا مُجِيبُ", transliteration: "Ya Mujib", translation: "O Responsive", category: "99 Names" },
  { id: "al-wasi", arabic: "يَا وَاسِعُ", transliteration: "Ya Wasi'", translation: "O All-Encompassing", category: "99 Names" },
  { id: "al-hakim", arabic: "يَا حَكِيمُ", transliteration: "Ya Hakim", translation: "O Perfectly Wise", category: "99 Names" },
  { id: "al-wadud", arabic: "يَا وَدُودُ", transliteration: "Ya Wadud", translation: "O Most Loving", category: "99 Names" },
  { id: "al-majid", arabic: "يَا مَجِيدُ", transliteration: "Ya Majid", translation: "O Most Glorious", category: "99 Names" },
  { id: "al-baith", arabic: "يَا بَاعِثُ", transliteration: "Ya Ba'ith", translation: "O Resurrector", category: "99 Names" },
  { id: "ash-shahid", arabic: "يَا شَهِيدُ", transliteration: "Ya Shahid", translation: "O Witness", category: "99 Names" },
  { id: "al-haqq", arabic: "يَا حَقُّ", transliteration: "Ya Haqq", translation: "O Truth", category: "99 Names" },
  { id: "al-wakil", arabic: "يَا وَكِيلُ", transliteration: "Ya Wakil", translation: "O Trustee", category: "99 Names" },
  { id: "al-qawi", arabic: "يَا قَوِيُّ", transliteration: "Ya Qawiyy", translation: "O Most Strong", category: "99 Names" },
  { id: "al-matin", arabic: "يَا مَتِينُ", transliteration: "Ya Matin", translation: "O Firm", category: "99 Names" },
  { id: "al-wali", arabic: "يَا وَلِيُّ", transliteration: "Ya Waliyy", translation: "O Protecting Friend", category: "99 Names" },
  { id: "al-hamid", arabic: "يَا حَمِيدُ", transliteration: "Ya Hamid", translation: "O Praiseworthy", category: "99 Names" },
  { id: "al-muhsi", arabic: "يَا مُحْصِي", transliteration: "Ya Muhsi", translation: "O Appraiser/Counter", category: "99 Names" },
  { id: "al-mubdi", arabic: "يَا مُبْدِئُ", transliteration: "Ya Mubdi'", translation: "O Originator", category: "99 Names" },
  { id: "al-muid", arabic: "يَا مُعِيدُ", transliteration: "Ya Mu'id", translation: "O Restorer", category: "99 Names" },
  { id: "al-muhyi", arabic: "يَا مُحْيِي", transliteration: "Ya Muhyi", translation: "O Giver of Life", category: "99 Names" },
  { id: "al-mumit", arabic: "يَا مُمِيتُ", transliteration: "Ya Mumit", translation: "O Taker of Life", category: "99 Names" },
  { id: "al-hayy", arabic: "يَا حَيُّ", transliteration: "Ya Hayy", translation: "O Ever-Living", category: "99 Names" },
  { id: "al-qayyum", arabic: "يَا قَيُّومُ", transliteration: "Ya Qayyum", translation: "O Self-Subsisting", category: "99 Names" },
  { id: "al-wajid", arabic: "يَا وَاجِدُ", transliteration: "Ya Wajid", translation: "O Finder", category: "99 Names" },
  { id: "al-majid2", arabic: "يَا مَاجِدُ", transliteration: "Ya Majid", translation: "O Glorious", category: "99 Names" },
  { id: "al-wahid", arabic: "يَا وَاحِدُ", transliteration: "Ya Wahid", translation: "O One", category: "99 Names" },
  { id: "al-ahad", arabic: "يَا أَحَدُ", transliteration: "Ya Ahad", translation: "O Unique", category: "99 Names" },
  { id: "as-samad", arabic: "يَا صَمَدُ", transliteration: "Ya Samad", translation: "O Eternal/Absolute", category: "99 Names" },
  { id: "al-qadir", arabic: "يَا قَادِرُ", transliteration: "Ya Qadir", translation: "O All-Powerful", category: "99 Names" },
  { id: "al-muqtadir", arabic: "يَا مُقْتَدِرُ", transliteration: "Ya Muqtadir", translation: "O Determiner", category: "99 Names" },
  { id: "al-muqaddim", arabic: "يَا مُقَدِّمُ", transliteration: "Ya Muqaddim", translation: "O Expediter", category: "99 Names" },
  { id: "al-muakhkhir", arabic: "يَا مُؤَخِّرُ", transliteration: "Ya Mu'akhkhir", translation: "O Delayer", category: "99 Names" },
  { id: "al-awwal", arabic: "يَا أَوَّلُ", transliteration: "Ya Awwal", translation: "O First", category: "99 Names" },
  { id: "al-akhir", arabic: "يَا آخِرُ", transliteration: "Ya Akhir", translation: "O Last", category: "99 Names" },
  { id: "az-zahir", arabic: "يَا ظَاهِرُ", transliteration: "Ya Zahir", translation: "O Manifest", category: "99 Names" },
  { id: "al-batin", arabic: "يَا بَاطِنُ", transliteration: "Ya Batin", translation: "O Hidden", category: "99 Names" },
  { id: "al-wali2", arabic: "يَا وَالِي", transliteration: "Ya Wali", translation: "O Governor", category: "99 Names" },
  { id: "al-mutaali", arabic: "يَا مُتَعَالِي", transliteration: "Ya Muta'ali", translation: "O Most Exalted", category: "99 Names" },
  { id: "al-barr", arabic: "يَا بَرُّ", transliteration: "Ya Barr", translation: "O Source of All Goodness", category: "99 Names" },
  { id: "at-tawwab", arabic: "يَا تَوَّابُ", transliteration: "Ya Tawwab", translation: "O Accepter of Repentance", category: "99 Names" },
  { id: "al-muntaqim", arabic: "يَا مُنْتَقِمُ", transliteration: "Ya Muntaqim", translation: "O Avenger", category: "99 Names" },
  { id: "al-afuw", arabic: "يَا عَفُوُّ", transliteration: "Ya 'Afuww", translation: "O Pardoner", category: "99 Names" },
  { id: "ar-rauf", arabic: "يَا رَؤُوفُ", transliteration: "Ya Ra'uf", translation: "O Compassionate", category: "99 Names" },
  { id: "malik-al-mulk", arabic: "يَا مَالِكَ الْمُلْكِ", transliteration: "Ya Malikal Mulk", translation: "O Owner of Sovereignty", category: "99 Names" },
  { id: "dhul-jalal", arabic: "يَا ذَا الْجَلَالِ وَالإِكْرَامِ", transliteration: "Ya Dhul Jalali wal Ikram", translation: "O Lord of Majesty and Generosity", category: "99 Names" },
  { id: "al-muqsit", arabic: "يَا مُقْسِطُ", transliteration: "Ya Muqsit", translation: "O Equitable", category: "99 Names" },
  { id: "al-jami", arabic: "يَا جَامِعُ", transliteration: "Ya Jami'", translation: "O Gatherer", category: "99 Names" },
  { id: "al-ghani", arabic: "يَا غَنِيُّ", transliteration: "Ya Ghani", translation: "O Self-Sufficient", category: "99 Names" },
  { id: "al-mughni", arabic: "يَا مُغْنِي", transliteration: "Ya Mughni", translation: "O Enricher", category: "99 Names" },
  { id: "al-mani", arabic: "يَا مَانِعُ", transliteration: "Ya Mani'", translation: "O Preventer", category: "99 Names" },
  { id: "ad-darr", arabic: "يَا ضَارُّ", transliteration: "Ya Darr", translation: "O Distresser", category: "99 Names" },
  { id: "an-nafi", arabic: "يَا نَافِعُ", transliteration: "Ya Nafi'", translation: "O Benefiter", category: "99 Names" },
  { id: "an-nur", arabic: "يَا نُورُ", transliteration: "Ya Nur", translation: "O Light", category: "99 Names" },
  { id: "al-hadi", arabic: "يَا هَادِي", transliteration: "Ya Hadi", translation: "O Guide", category: "99 Names" },
  { id: "al-badi", arabic: "يَا بَدِيعُ", transliteration: "Ya Badi'", translation: "O Incomparable Originator", category: "99 Names" },
  { id: "al-baqi", arabic: "يَا بَاقِي", transliteration: "Ya Baqi", translation: "O Everlasting", category: "99 Names" },
  { id: "al-warith", arabic: "يَا وَارِثُ", transliteration: "Ya Warith", translation: "O Inheritor", category: "99 Names" },
  { id: "ar-rashid", arabic: "يَا رَشِيدُ", transliteration: "Ya Rashid", translation: "O Guide to the Right Path", category: "99 Names" },
  { id: "as-sabur", arabic: "يَا صَبُورُ", transliteration: "Ya Sabur", translation: "O Patient", category: "99 Names" },
];

const CATEGORIES = ["All", "Core", "99 Names", "Morning", "Evening", "Salawat", "Custom"];
const ACCENT_COLORS = [
  { name: "Orange", value: "#d97757", glow: "rgba(217,119,87,0.3)" },
  { name: "Blue", value: "#6a9bcc", glow: "rgba(106,155,204,0.3)" },
  { name: "Green", value: "#788c5d", glow: "rgba(120,140,93,0.3)" }
];

// ─── STORAGE ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "dhikr_pwa_v1";

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function initData() {
  const existing = loadData();
  if (existing) return existing;
  const counts = {};
  PRESET_DHIKR.forEach(d => { counts[d.id] = 0; });
  return {
    global_count: 0,
    counts,
    custom_dhikr: [],
    active_dhikr_id: "subhanallah",
    streak: { count: 0, last_date: null },
    daily_log: {},
    settings: {
      click_volume: 0.7,
      noise_volume: 0.3,
      click_enabled: true,
      noise_enabled: false,
      click_profile: 0,
      accent_index: 0,
      target: 33,
      custom_target: null,
    },
    onboarded: false,
  };
}

// ─── AUDIO ENGINE ──────────────────────────────────────────────────────────

let audioCtx = null;
let noiseNode = null;
let noiseGain = null;

function getAudioCtx() {
  if (!audioCtx || audioCtx.state === "closed") {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

const CLICK_PROFILES = [
  { f1: 120, f1e: 55, f2: 280, f2e: 120, n: 0.3, len1: 0.15, len2: 0.08, lenN: 0.06 },   // Thwack (Original)
  { f1: 320, f1e: 120, f2: 680, f2e: 220, n: 0.1, len1: 0.05, len2: 0.03, lenN: 0.02 },  // Crisp Tick
  { f1: 80,  f1e: 40, f2: 180, f2e: 80,  n: 0.5, len1: 0.2, len2: 0.1, lenN: 0.08 },   // Dull Thud
  { f1: 520, f1e: 240, f2: 980, f2e: 420, n: 0.05, len1: 0.03, len2: 0.02, lenN: 0.01 }, // Glass Tap
  { f1: 180, f1e: 75, f2: 380, f2e: 180, n: 0.25, len1: 0.1, len2: 0.06, lenN: 0.04 }    // Medium Pop
];

function playClick(volume = 0.7, profileIdx = 0) {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    const p = CLICK_PROFILES[profileIdx] || CLICK_PROFILES[0];
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();
    const masterGain = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(p.f1, now);
    osc1.frequency.exponentialRampToValueAtTime(p.f1e, now + 0.08);
    gain1.gain.setValueAtTime(volume * 0.9, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(p.f2, now);
    osc2.frequency.exponentialRampToValueAtTime(p.f2e, now + 0.04);
    gain2.gain.setValueAtTime(volume * 0.5, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    const bufSize = ctx.sampleRate * 0.04;
    const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    const noiseG = ctx.createGain();
    noiseG.gain.setValueAtTime(volume * p.n, now);

    osc1.connect(gain1); gain1.connect(masterGain);
    osc2.connect(gain2); gain2.connect(masterGain);
    noiseSource.connect(noiseG); noiseG.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.start(now); osc1.stop(now + p.len1);
    osc2.start(now); osc2.stop(now + p.len2);
    noiseSource.start(now); noiseSource.stop(now + p.lenN);
  } catch {}
}

function playChime(volume = 0.7) {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    const freqs = [392, 523.25, 659.25, 783.99];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const delay = i * 0.1;
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(volume * 0.4, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 1.2);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now + delay); osc.stop(now + delay + 1.3);
    });
  } catch {}
}

function startBrownNoise(volume = 0.3) {
  try {
    const ctx = getAudioCtx();
    stopBrownNoise();
    const bufferSize = 4096;
    let lastOut = 0;
    const node = ctx.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = (e) => {
      const out = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        out[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = out[i];
        out[i] *= 3.5;
      }
    };
    noiseGain = ctx.createGain();
    noiseGain.gain.value = volume * 0.15;
    node.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noiseNode = node;
  } catch {}
}

function stopBrownNoise() {
  try { if (noiseNode) { noiseNode.disconnect(); noiseNode = null; } } catch {}
  try { if (noiseGain) { noiseGain.disconnect(); noiseGain = null; } } catch {}
}

function setNoiseVolume(vol) {
  if (noiseGain) noiseGain.gain.value = vol * 0.15;
}

// ─── HOOKS ─────────────────────────────────────────────────────────────────

function useAppData() {
  const [data, setDataRaw] = useState(() => initData());

  const setData = useCallback((updater) => {
    setDataRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveData(next);
      return next;
    });
  }, []);

  return [data, setData];
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Lora:ital,wght@0,400;0,600;1,400&family=Scheherazade+New:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --bg: #141413;
    --surface: #1a1a19;
    --surface2: #242422;
    --surface3: #2d2d2a;
    --border: #b0aea5;
    --text: #faf9f5;
    --text-muted: #e8e6dc;
    --text-dim: #b0aea5;
    --accent: #d97757;
    --accent-glow: rgba(217,119,87,0.25);
    --font-arabic: 'Scheherazade New', serif;
    --font-heading: 'Poppins', Arial, sans-serif;
    --font-body: 'Lora', Georgia, serif;
    --nav-height: 64px;
  }

  html, body { background: var(--bg); color: var(--text); font-family: var(--font-body); height: 100%; overflow: hidden; }
  #root { height: 100%; }

  .app { height: 100dvh; display: flex; flex-direction: column; background: var(--bg); overflow: hidden; position: relative; }

  /* Pages */
  .page { flex: 1; overflow-y: auto; overflow-x: hidden; scrollbar-width: thin; scrollbar-color: var(--border) transparent; }
  .page::-webkit-scrollbar { width: 2px; }
  .page::-webkit-scrollbar-thumb { background: var(--border); }

  /* NAV */
  .nav { height: var(--nav-height); display: flex; align-items: center; justify-content: space-around; background: var(--surface); border-top: 1px solid var(--border); flex-shrink: 0; position: relative; z-index: 10; }
  .nav-btn { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 8px 16px; background: none; border: none; cursor: pointer; color: var(--text-muted); transition: color 0.2s; font-family: var(--font-body); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; }
  .nav-btn.active { color: var(--accent); }
  .nav-btn svg { opacity: 0.6; transition: opacity 0.2s; }
  .nav-btn.active svg { opacity: 1; }

  /* COUNTER PAGE */
  .counter-page { display: flex; flex-direction: column; height: 100%; position: relative; }
  .counter-top { flex: 0 0 42%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 20px 32px 24px; text-align: center; pointer-events: none; }
  .arabic-text { font-family: var(--font-arabic); font-size: clamp(28px, 7vw, 44px); line-height: 1.5; color: var(--text); direction: rtl; letter-spacing: 0.02em; margin-bottom: 10px; transition: opacity 0.5s; }
  .transliteration { font-family: var(--font-body); font-size: clamp(14px, 3.5vw, 18px); color: rgba(232,232,228,0.55); font-weight: 300; margin-bottom: 5px; font-style: italic; letter-spacing: 0.04em; }
  .translation { font-family: var(--font-body); font-size: clamp(11px, 2.8vw, 14px); color: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase; font-weight: 400; }
  
  .counter-center { flex: 0 0 auto; display: flex; align-items: center; justify-content: center; padding: 8px; pointer-events: none; }
  
  .ring-wrap { position: relative; width: 180px; height: 180px; }
  .ring-svg { transform: rotate(-90deg); }
  .ring-bg { fill: none; stroke: var(--surface3); stroke-width: 2; }
  .ring-fill { fill: none; stroke: var(--accent); stroke-width: 2.5; stroke-linecap: round; transition: stroke-dashoffset 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.4s; filter: drop-shadow(0 0 6px var(--accent-glow)); }
  .ring-count { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .count-num { font-family: var(--font-body); font-size: 52px; font-weight: 300; color: var(--text); line-height: 1; letter-spacing: -0.02em; }
  .count-target { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px; }

  .counter-tap { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; position: relative; overflow: hidden; }
  .tap-hint { position: absolute; bottom: 20px; font-family: var(--font-body); font-size: 11px; color: var(--text-dim); letter-spacing: 0.15em; text-transform: uppercase; pointer-events: none; transition: opacity 1s; }
  .tap-ripple { position: absolute; border-radius: 50%; background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%); pointer-events: none; animation: ripple-out 0.6s ease-out forwards; }
  @keyframes ripple-out { from { transform: scale(0); opacity: 1; } to { transform: scale(4); opacity: 0; } }

  .counter-audio-btns { position: absolute; top: 16px; right: 16px; display: flex; gap: 8px; z-index: 5; }
  .audio-btn { background: var(--surface2); border: 1px solid var(--border); border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: var(--text-muted); transition: color 0.2s, border-color 0.2s; }
  .audio-btn.on { color: var(--accent); border-color: var(--accent); }

  /* LIBRARY */
  .library-page { padding-bottom: 20px; }
  .lib-header { padding: 24px 20px 12px; position: sticky; top: 0; background: var(--bg); z-index: 5; }
  .lib-title { font-family: var(--font-body); font-size: 22px; font-weight: 300; color: var(--text); letter-spacing: 0.04em; margin-bottom: 14px; }
  .lib-search { width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 10px 14px; color: var(--text); font-family: var(--font-body); font-size: 15px; outline: none; transition: border-color 0.2s; }
  .lib-search::placeholder { color: var(--text-muted); }
  .lib-search:focus { border-color: var(--accent); }
  .lib-cats { display: flex; gap: 8px; overflow-x: auto; padding: 10px 20px; scrollbar-width: none; }
  .lib-cats::-webkit-scrollbar { display: none; }
  .cat-pill { flex-shrink: 0; padding: 5px 14px; border-radius: 20px; background: var(--surface2); border: 1px solid var(--border); font-family: var(--font-body); font-size: 12px; color: var(--text-muted); cursor: pointer; letter-spacing: 0.06em; transition: all 0.2s; white-space: nowrap; }
  .cat-pill.active { background: var(--accent); border-color: var(--accent); color: #000; font-weight: 600; }

  .create-btn { margin: 0 20px 8px; width: calc(100% - 40px); padding: 12px; background: var(--surface2); border: 1px dashed var(--border); border-radius: 12px; color: var(--text-muted); font-family: var(--font-body); font-size: 14px; letter-spacing: 0.06em; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s; }
  .create-btn:hover { border-color: var(--accent); color: var(--accent); }

  .dhikr-list { padding: 0 20px; display: flex; flex-direction: column; gap: 1px; }
  .dhikr-item { padding: 14px 16px; background: var(--surface); border-radius: 10px; cursor: pointer; transition: background 0.15s; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .dhikr-item:hover { background: var(--surface2); }
  .dhikr-item.active { background: var(--surface2); border: 1px solid var(--accent); }
  .dhikr-item-left { flex: 1; min-width: 0; }
  .dhikr-arabic-sm { font-family: var(--font-arabic); font-size: 18px; color: var(--text); direction: rtl; margin-bottom: 2px; }
  .dhikr-trans-sm { font-family: var(--font-body); font-size: 12px; color: var(--text-muted); font-style: italic; }
  .dhikr-count-badge { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); letter-spacing: 0.06em; white-space: nowrap; }

  /* JOURNEY */
  .journey-page { padding: 24px 20px 20px; }
  .journey-title { font-family: var(--font-body); font-size: 22px; font-weight: 300; letter-spacing: 0.04em; margin-bottom: 24px; }
  .stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
  .stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 16px; }
  .stat-card-val { font-family: var(--font-body); font-size: 36px; font-weight: 300; color: var(--accent); line-height: 1; margin-bottom: 4px; }
  .stat-card-label { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; }
  .section-label { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px; }
  .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; margin-bottom: 24px; }
  .week-cell { aspect-ratio: 1; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-family: var(--font-body); font-size: 9px; color: var(--text-dim); letter-spacing: 0.05em; }
  .week-cell.active-day { color: #000; }
  .breakdown-list { display: flex; flex-direction: column; gap: 8px; }
  .breakdown-item { background: var(--surface); border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; }
  .breakdown-rank { font-family: var(--font-body); font-size: 13px; color: var(--text-dim); width: 20px; }
  .breakdown-info { flex: 1; min-width: 0; }
  .breakdown-name { font-family: var(--font-body); font-size: 14px; color: var(--text); margin-bottom: 1px; }
  .breakdown-arabic { font-family: var(--font-arabic); font-size: 14px; color: var(--text-muted); direction: rtl; }
  .breakdown-count { font-family: var(--font-body); font-size: 13px; color: var(--accent); }

  /* SETTINGS */
  .settings-page { padding: 24px 20px 20px; }
  .settings-title { font-family: var(--font-body); font-size: 22px; font-weight: 300; letter-spacing: 0.04em; margin-bottom: 24px; }
  .settings-section { margin-bottom: 24px; }
  .settings-section-label { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid var(--border); }
  .settings-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--surface2); gap: 12px; }
  .settings-row-label { font-family: var(--font-body); font-size: 15px; color: var(--text); }
  .settings-row-sub { font-family: var(--font-body); font-size: 12px; color: var(--text-muted); margin-top: 1px; }
  input[type=range] { -webkit-appearance: none; appearance: none; width: 130px; height: 2px; background: var(--surface3); border-radius: 2px; outline: none; }
  input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--accent); cursor: pointer; box-shadow: 0 0 8px var(--accent-glow); }
  input[type=range]::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: var(--accent); cursor: pointer; border: none; }
  .toggle { position: relative; width: 44px; height: 24px; }
  .toggle input { opacity: 0; width: 0; height: 0; }
  .toggle-slider { position: absolute; inset: 0; background: var(--surface3); border-radius: 24px; cursor: pointer; transition: background 0.25s; }
  .toggle-slider::before { content: ''; position: absolute; left: 3px; bottom: 3px; width: 18px; height: 18px; background: #fff; border-radius: 50%; transition: transform 0.25s; }
  .toggle input:checked + .toggle-slider { background: var(--accent); }
  .toggle input:checked + .toggle-slider::before { transform: translateX(20px); }

  .target-options { display: flex; gap: 8px; flex-wrap: wrap; }
  .target-opt { padding: 6px 14px; border-radius: 20px; background: var(--surface2); border: 1px solid var(--border); font-family: var(--font-body); font-size: 13px; color: var(--text-muted); cursor: pointer; transition: all 0.2s; }
  .target-opt.active { background: var(--accent); border-color: var(--accent); color: #000; }

  .accent-options { display: flex; gap: 10px; }
  .accent-opt { width: 28px; height: 28px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s, transform 0.15s; }
  .accent-opt.active { border-color: #fff; transform: scale(1.15); }

  /* MODAL */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 50; display: flex; align-items: flex-end; animation: fade-in 0.2s; }
  .modal { width: 100%; background: var(--surface); border-radius: 20px 20px 0 0; padding: 24px 20px 32px; animation: slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .modal-title { font-family: var(--font-body); font-size: 20px; font-weight: 300; margin-bottom: 20px; letter-spacing: 0.04em; }
  .modal-field { margin-bottom: 16px; }
  .modal-label { font-family: var(--font-body); font-size: 11px; color: var(--text-muted); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px; }
  .modal-input { width: 100%; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; padding: 11px 14px; color: var(--text); font-family: var(--font-body); font-size: 15px; outline: none; transition: border-color 0.2s; }
  .modal-input.arabic { font-family: var(--font-arabic); font-size: 20px; direction: rtl; text-align: right; }
  .modal-input:focus { border-color: var(--accent); }
  .modal-input::placeholder { color: var(--text-dim); }
  .modal-btns { display: flex; gap: 10px; margin-top: 20px; }
  .btn-primary { flex: 1; padding: 13px; background: var(--accent); border: none; border-radius: 12px; color: #000; font-family: var(--font-body); font-size: 15px; font-weight: 600; cursor: pointer; letter-spacing: 0.04em; }
  .btn-secondary { flex: 1; padding: 13px; background: var(--surface2); border: 1px solid var(--border); border-radius: 12px; color: var(--text-muted); font-family: var(--font-body); font-size: 15px; cursor: pointer; }

  /* ONBOARDING */
  .onboard-overlay { position: fixed; inset: 0; background: var(--bg); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px; text-align: center; }
  .onboard-step { animation: fade-in 0.5s; }
  .onboard-icon { font-size: 60px; margin-bottom: 24px; }
  .onboard-title { font-family: var(--font-body); font-size: 26px; font-weight: 300; color: var(--text); margin-bottom: 12px; letter-spacing: 0.03em; }
  .onboard-desc { font-family: var(--font-body); font-size: 15px; color: var(--text-muted); line-height: 1.7; margin-bottom: 40px; max-width: 320px; }
  .onboard-dots { display: flex; gap: 6px; justify-content: center; margin-bottom: 32px; }
  .onboard-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--surface3); transition: background 0.3s; }
  .onboard-dot.active { background: var(--accent); }
  .onboard-next { padding: 14px 40px; background: var(--accent); border: none; border-radius: 12px; color: #000; font-family: var(--font-body); font-size: 16px; font-weight: 600; cursor: pointer; letter-spacing: 0.04em; }

  /* COMPLETION FLASH */
  .completion-flash { position: fixed; inset: 0; background: var(--accent-glow); pointer-events: none; z-index: 20; animation: flash-out 0.8s ease-out forwards; }
  @keyframes flash-out { from { opacity: 1; } to { opacity: 0; } }

  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }

  .fade-enter { animation: fade-in 0.4s ease; }
`;

// ─── ONBOARDING ─────────────────────────────────────────────────────────────

const ONBOARD_STEPS = [
  {
    icon: "☝️",
    title: "Designed for the Thumb",
    desc: "The entire lower half of the screen is your tap zone. Hold your phone naturally — your thumb reaches everything."
  },
  {
    icon: "🎧",
    title: "Wear Headphones",
    desc: "For the full experience, plug in headphones. The brown noise and deep click sounds create a private sanctuary for your Dhikr."
  },
  {
    icon: "📱",
    title: "Add to Home Screen",
    desc: "Install this PWA to your home screen for instant, full-screen access — just like a native app, with no browser chrome."
  }
];

function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const isLast = step === ONBOARD_STEPS.length - 1;
  const s = ONBOARD_STEPS[step];
  return (
    <div className="onboard-overlay">
      <div className="onboard-step" key={step}>
        <div className="onboard-icon">{s.icon}</div>
        <h1 className="onboard-title">{s.title}</h1>
        <p className="onboard-desc">{s.desc}</p>
      </div>
      <div className="onboard-dots">
        {ONBOARD_STEPS.map((_, i) => (
          <div key={i} className={`onboard-dot${i === step ? " active" : ""}`} />
        ))}
      </div>
      <button className="onboard-next" onClick={() => isLast ? onDone() : setStep(s => s + 1)}>
        {isLast ? "Begin" : "Next"}
      </button>
    </div>
  );
}

// ─── COUNTER PAGE ───────────────────────────────────────────────────────────

function CounterPage({ data, setData, allDhikr, accentColor, setTab }) {
  const [ripples, setRipples] = useState([]);
  const [showFlash, setShowFlash] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const tapZoneRef = useRef(null);

  const activeDhikr = allDhikr.find(d => d.id === data.active_dhikr_id) || allDhikr[0];
  const settings = data.settings;
  const count = data.counts[activeDhikr.id] || 0;
  const target = settings.target || 33;
  const isInfinite = settings.target === 0;
  const displayCount = isInfinite ? count : count % target || (count > 0 && count % target === 0 ? target : count % target);
  const progress = isInfinite ? 0 : (displayCount / target);

  const circumference = 2 * Math.PI * 82;
  const offset = circumference - (progress * circumference);

  const handleTap = useCallback((e) => {
    setShowHint(false);
    // Ripple
    const rect = tapZoneRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.touches?.[0]?.clientX ?? e.clientX) - rect.left;
      const y = (e.touches?.[0]?.clientY ?? e.clientY) - rect.top;
      const id = Date.now();
      setRipples(r => [...r.slice(-4), { id, x, y }]);
      setTimeout(() => setRipples(r => r.filter(rr => rr.id !== id)), 700);
    }

    // Audio
    if (settings.click_enabled) playClick(settings.click_volume, settings.click_profile);

    // Update data
    setData(prev => {
      const newCount = (prev.counts[activeDhikr.id] || 0) + 1;
      const newGlobal = prev.global_count + 1;

      // Check completion
      const t = prev.settings.target;
      if (t > 0 && newCount % t === 0) {
        if (prev.settings.click_enabled) playChime(prev.settings.click_volume);
        setShowFlash(true);
        setTimeout(() => setShowFlash(false), 1000);
      }

      // Streak
      const today = new Date().toDateString();
      const streak = { ...prev.streak };
      const daily = { ...prev.daily_log, [today]: (prev.daily_log[today] || 0) + 1 };
      if (streak.last_date !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        streak.count = streak.last_date === yesterday ? streak.count + 1 : 1;
        streak.last_date = today;
      }

      return {
        ...prev,
        global_count: newGlobal,
        counts: { ...prev.counts, [activeDhikr.id]: newCount },
        streak,
        daily_log: daily,
      };
    });
  }, [activeDhikr, settings, setData]);

  const toggleClick = () => setData(d => ({ ...d, settings: { ...d.settings, click_enabled: !d.settings.click_enabled } }));
  const toggleNoise = () => {
    const next = !settings.noise_enabled;
    setData(d => ({ ...d, settings: { ...d.settings, noise_enabled: next } }));
    if (next) startBrownNoise(settings.noise_volume);
    else stopBrownNoise();
  };

  // Sync noise on mount
  useEffect(() => {
    if (settings.noise_enabled) startBrownNoise(settings.noise_volume);
    return () => stopBrownNoise();
  }, []);

  useEffect(() => {
    setNoiseVolume(settings.noise_volume);
  }, [settings.noise_volume]);

  const currentDisplayNum = isInfinite ? count : displayCount;

  return (
    <div className="counter-page">
      {showFlash && <div className="completion-flash" />}
      
      <div className="counter-audio-btns">
        <button className="audio-btn" onClick={() => setTab("settings")} style={{ marginRight: "4px" }} title="Settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
        <button className={`audio-btn${settings.click_enabled ? " on" : ""}`} onClick={toggleClick} title="Toggle click">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {settings.click_enabled
              ? <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>
              : <><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><line x1="1" y1="1" x2="23" y2="23"/></>
            }
          </svg>
        </button>
        <button className={`audio-btn${settings.noise_enabled ? " on" : ""}`} onClick={toggleNoise} title="Toggle brown noise">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 15.5A2.5 2.5 0 0 1 5.5 13h13a2.5 2.5 0 0 1 0 5h-13A2.5 2.5 0 0 1 3 15.5z"/>
            <path d="M6 13V8.5A6 6 0 0 1 18 8.5V13"/>
            {!settings.noise_enabled && <line x1="1" y1="1" x2="23" y2="23"/>}
          </svg>
        </button>
      </div>

      <div className="counter-top fade-enter" key={activeDhikr.id}>
        {activeDhikr.arabic && (
          <div className="arabic-text">{activeDhikr.arabic}</div>
        )}
        {activeDhikr.transliteration && (
          <div className="transliteration">{activeDhikr.transliteration}</div>
        )}
        <div className="translation">{activeDhikr.translation}</div>
      </div>

      <div className="counter-center">
        <div className="ring-wrap">
          <svg className="ring-svg" width="180" height="180" viewBox="0 0 180 180">
            <circle className="ring-bg" cx="90" cy="90" r="82" />
            <circle
              className="ring-fill"
              cx="90" cy="90" r="82"
              strokeDasharray={circumference}
              strokeDashoffset={isInfinite ? circumference : offset}
              style={{ stroke: accentColor.value, filter: `drop-shadow(0 0 8px ${accentColor.glow})` }}
            />
          </svg>
          <div className="ring-count">
            <span className="count-num">{currentDisplayNum}</span>
            <span className="count-target">
              {isInfinite ? "∞" : `of ${target}`}
            </span>
          </div>
        </div>
      </div>

      <div
        ref={tapZoneRef}
        className="counter-tap"
        onTouchStart={handleTap}
        onClick={(e) => { if (!("ontouchstart" in window)) handleTap(e); }}
      >
        {ripples.map(r => (
          <div
            key={r.id}
            className="tap-ripple"
            style={{
              left: r.x - 50,
              top: r.y - 50,
              width: 100,
              height: 100,
              background: `radial-gradient(circle, ${accentColor.glow} 0%, transparent 70%)`
            }}
          />
        ))}
        {showHint && (
          <div className="tap-hint">tap anywhere below</div>
        )}
      </div>
    </div>
  );
}

// ─── LIBRARY ────────────────────────────────────────────────────────────────

function LibraryPage({ data, setData, allDhikr, setTab }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ arabic: "", transliteration: "", translation: "" });

  const filtered = allDhikr.filter(d => {
    const matchCat = cat === "All" || d.category === cat;
    const matchSearch = !search ||
      d.translation?.toLowerCase().includes(search.toLowerCase()) ||
      d.transliteration?.toLowerCase().includes(search.toLowerCase()) ||
      d.arabic?.includes(search);
    return matchCat && matchSearch;
  });

  const select = (id) => {
    setData(d => ({ ...d, active_dhikr_id: id }));
    setTab("counter");
  };

  const saveCustom = () => {
    if (!form.translation.trim()) return;
    const id = `custom_${Date.now()}`;
    const newDhikr = { id, arabic: form.arabic, transliteration: form.transliteration, translation: form.translation, category: "Custom" };
    setData(d => ({
      ...d,
      custom_dhikr: [...d.custom_dhikr, newDhikr],
      counts: { ...d.counts, [id]: 0 },
      active_dhikr_id: id,
    }));
    setForm({ arabic: "", transliteration: "", translation: "" });
    setShowModal(false);
    setTab("counter");
  };

  return (
    <div className="library-page page">
      <div className="lib-header">
        <div className="lib-title">Library</div>
        <input
          className="lib-search"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="lib-cats">
        {CATEGORIES.map(c => (
          <button key={c} className={`cat-pill${cat === c ? " active" : ""}`} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <button className="create-btn" onClick={() => setShowModal(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Create Custom Dhikr
      </button>

      <div className="dhikr-list">
        {filtered.map(d => (
          <div
            key={d.id}
            className={`dhikr-item${d.id === data.active_dhikr_id ? " active" : ""}`}
            onClick={() => select(d.id)}
          >
            <div className="dhikr-item-left">
              {d.arabic && <div className="dhikr-arabic-sm">{d.arabic}</div>}
              <div className="dhikr-trans-sm">{d.transliteration || d.translation}</div>
            </div>
            <div className="dhikr-count-badge">
              {(data.counts[d.id] || 0).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-title">Create Custom Dhikr</div>
            <div className="modal-field">
              <div className="modal-label">Arabic (optional)</div>
              <input className="modal-input arabic" placeholder="Arabic text..." value={form.arabic} onChange={e => setForm(f => ({ ...f, arabic: e.target.value }))} />
            </div>
            <div className="modal-field">
              <div className="modal-label">Transliteration (optional)</div>
              <input className="modal-input" placeholder="e.g. SubhanAllah..." value={form.transliteration} onChange={e => setForm(f => ({ ...f, transliteration: e.target.value }))} />
            </div>
            <div className="modal-field">
              <div className="modal-label">Translation / Meaning *</div>
              <input className="modal-input" placeholder="e.g. Glory be to Allah..." value={form.translation} onChange={e => setForm(f => ({ ...f, translation: e.target.value }))} />
            </div>
            <div className="modal-btns">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={saveCustom} disabled={!form.translation.trim()}>Save & Use</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── JOURNEY ────────────────────────────────────────────────────────────────

function JourneyPage({ data, allDhikr }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000);
    return { label: d.toLocaleDateString("en", { weekday: "short" }).slice(0, 1), key: d.toDateString() };
  });

  const maxDaily = Math.max(...days.map(d => data.daily_log[d.key] || 0), 1);

  const sorted = allDhikr
    .filter(d => (data.counts[d.id] || 0) > 0)
    .sort((a, b) => (data.counts[b.id] || 0) - (data.counts[a.id] || 0))
    .slice(0, 10);

  const accentColor = ACCENT_COLORS[data.settings.accent_index || 0];

  return (
    <div className="journey-page page">
      <div className="journey-title">Journey</div>
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-card-val" style={{ color: accentColor.value }}>{data.streak.count}</div>
          <div className="stat-card-label">Day Streak 🔥</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-val" style={{ color: accentColor.value }}>{data.global_count.toLocaleString()}</div>
          <div className="stat-card-label">Lifetime Total</div>
        </div>
      </div>

      <div className="section-label">This Week</div>
      <div className="week-chart" style={{ display: "flex", gap: "8px", alignItems: "flex-end", height: "140px", marginBottom: "24px", paddingTop: "10px", borderBottom: "1px solid var(--border)" }}>
        {days.map(d => {
          const count = data.daily_log[d.key] || 0;
          const heightPct = maxDaily > 0 ? (count / maxDaily) * 100 : 0;
          const bg = count > 0 ? accentColor.value : "var(--surface2)";
          return (
            <div key={d.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%", position: "relative" }}>
                <div style={{ width: "100%", height: `${Math.max(2, heightPct)}%`, background: bg, borderRadius: "6px 6px 0 0", transition: "height 0.4s ease-out" }} />
              </div>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "var(--text-muted)" }}>
                {d.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="section-label" style={{ marginBottom: 12 }}>Dhikr Breakdown</div>
      <div className="breakdown-list">
        {sorted.length === 0 && (
          <div style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", fontSize: 14, textAlign: "center", padding: "20px 0" }}>
            Start counting to see your progress here
          </div>
        )}
        {sorted.map((d, i) => (
          <div key={d.id} className="breakdown-item">
            <div className="breakdown-rank">{i + 1}</div>
            <div className="breakdown-info">
              <div className="breakdown-name">{d.transliteration || d.translation}</div>
              {d.arabic && <div className="breakdown-arabic">{d.arabic}</div>}
            </div>
            <div className="breakdown-count">{(data.counts[d.id] || 0).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS ───────────────────────────────────────────────────────────────

function SettingsPage({ data, setData }) {
  const s = data.settings;
  const updateSetting = (key, val) => setData(d => ({ ...d, settings: { ...d.settings, [key]: val } }));

  const targets = [33, 99, 100, 1000, 0];
  const targetLabels = { 33: "33", 99: "99", 100: "100", 1000: "1000", 0: "∞" };

  return (
    <div className="settings-page page">
      <div className="settings-title">Settings</div>

      <div className="settings-section">
        <div className="settings-section-label">Audio</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Click Sound</div>
            <div className="settings-row-sub">Haptic-style tap feedback</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={s.click_enabled} onChange={e => updateSetting("click_enabled", e.target.checked)} />
            <span className="toggle-slider" />
          </label>
        </div>
        <div className="settings-row">
          <div><div className="settings-row-label">Click Volume</div></div>
          <input type="range" min="0" max="1" step="0.05" value={s.click_volume}
            onChange={e => updateSetting("click_volume", parseFloat(e.target.value))} />
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Click Tone</div>
            <div className="settings-row-sub">Select frequency profile</div>
          </div>
          <select 
            value={s.click_profile || 0} 
            onChange={e => {
              const val = parseInt(e.target.value);
              updateSetting("click_profile", val);
              playClick(s.click_volume, val); 
            }}
            style={{ padding: "6px 10px", background: "var(--surface2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px", fontFamily: "var(--font-body)", outline: "none" }}
          >
            <option value={0}>Thwack</option>
            <option value={1}>Crisp Tick</option>
            <option value={2}>Dull Thud</option>
            <option value={3}>Glass Tap</option>
            <option value={4}>Medium Pop</option>
          </select>
        </div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Brown Noise</div>
            <div className="settings-row-sub">Focus-enhancing background</div>
          </div>
          <label className="toggle">
            <input type="checkbox" checked={s.noise_enabled} onChange={e => {
              const next = e.target.checked;
              updateSetting("noise_enabled", next);
              if (next) startBrownNoise(s.noise_volume);
              else stopBrownNoise();
            }} />
            <span className="toggle-slider" />
          </label>
        </div>
        <div className="settings-row">
          <div><div className="settings-row-label">Noise Volume</div></div>
          <input type="range" min="0" max="1" step="0.05" value={s.noise_volume}
            onChange={e => {
              const v = parseFloat(e.target.value);
              updateSetting("noise_volume", v);
              setNoiseVolume(v);
            }} />
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-label">Counter Target</div>
        <div className="target-options" style={{ paddingTop: 8 }}>
          {targets.map(t => (
            <button key={t} className={`target-opt${s.target === t ? " active" : ""}`}
              onClick={() => updateSetting("target", t)}>
              {targetLabels[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-label">Accent Color</div>
        <div className="accent-options" style={{ paddingTop: 8 }}>
          {ACCENT_COLORS.map((c, i) => (
            <div
              key={c.name}
              className={`accent-opt${s.accent_index === i ? " active" : ""}`}
              style={{ background: c.value }}
              onClick={() => updateSetting("accent_index", i)}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-section-label">Data</div>
        <div className="settings-row">
          <div>
            <div className="settings-row-label">Reset Counter</div>
            <div className="settings-row-sub">Reset current Dhikr to 0</div>
          </div>
          <button style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 12px", color: "var(--text-muted)", fontFamily: "var(--font-body)", cursor: "pointer", fontSize: 13 }}
            onClick={() => {
              const id = data.active_dhikr_id;
              setData(d => ({ ...d, counts: { ...d.counts, [id]: 0 } }));
            }}>
            Reset
          </button>
        </div>
      </div>

      <div style={{ paddingTop: 24, textAlign: "center", borderTop: "1px solid var(--surface2)", marginTop: 24 }}>
        <div style={{ fontFamily: "var(--font-arabic)", fontSize: 22, color: "var(--text-muted)", marginBottom: 6 }}>بِسْمِ اللّٰهِ</div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-dim)", letterSpacing: "0.1em", marginBottom: 12 }}>
          FLOW STATE DHIKR • FREE FOREVER
        </div>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-muted)" }}>
          Created by <a href="https://nabilpervezconsulting.com" target="_blank" rel="noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}>nabilpervezconsulting.com</a>
        </div>
      </div>
    </div>
  );
}

// ─── NAV ICONS ──────────────────────────────────────────────────────────────

const TABS = [
  {
    id: "counter", label: "Counter",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
      </svg>
    )
  },
  {
    id: "library", label: "Library",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    )
  },
  {
    id: "journey", label: "Journey",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    )
  }
];

// ─── APP ROOT ───────────────────────────────────────────────────────────────

export default function App() {
  const [data, setData] = useAppData();
  const [tab, setTab] = useState("counter");

  const allDhikr = [...PRESET_DHIKR, ...data.custom_dhikr];
  const accentColor = ACCENT_COLORS[data.settings.accent_index || 0];

  // Inject CSS variables for accent
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent", accentColor.value);
    root.style.setProperty("--accent-glow", accentColor.glow);
  }, [accentColor]);

  const handleOnboardDone = () => {
    setData(d => ({ ...d, onboarded: true }));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {!data.onboarded && <Onboarding onDone={handleOnboardDone} />}

        <div className="page" style={{ flex: 1, display: tab === "counter" ? "flex" : "none", flexDirection: "column", overflow: "hidden" }}>
          {tab === "counter" && <CounterPage data={data} setData={setData} allDhikr={allDhikr} accentColor={accentColor} setTab={setTab} />}
        </div>

        {tab === "library" && (
          <LibraryPage data={data} setData={setData} allDhikr={allDhikr} setTab={setTab} />
        )}
        {tab === "journey" && (
          <JourneyPage data={data} allDhikr={allDhikr} />
        )}
        {tab === "settings" && (
          <SettingsPage data={data} setData={setData} />
        )}

        <nav className="nav">
          {TABS.map(t => (
            <button key={t.id} className={`nav-btn${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
