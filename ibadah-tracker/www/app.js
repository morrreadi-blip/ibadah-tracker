// ===== Constants =====
const STORAGE_KEY = 'ibadah_tracker_data';
const ONBOARDING_KEY = 'ibadah_tracker_onboarded';
const REMINDER_KEY = 'ibadah_tracker_reminders';
const LOCATION_KEY = 'ibadah_tracker_location';

// Jadwal Sholat Kota Populer di Indonesia
const CITY_SCHEDULES = {
  'Jakarta':    { full: 'Jakarta, DKI Jakarta',          zone: 'WIB',  lat: -6.2088, lon: 106.8456, times: { Subuh: '04:28', Dzuhur: '11:45', Ashar: '15:08', Maghrib: '17:56', Isya: '19:09' } },
  'Bandung':    { full: 'Bandung, Jawa Barat',          zone: 'WIB',  lat: -6.9175, lon: 107.6191, times: { Subuh: '04:26', Dzuhur: '11:45', Ashar: '15:08', Maghrib: '17:55', Isya: '19:08' } },
  'Surabaya':   { full: 'Surabaya, Jawa Timur',        zone: 'WIB',  lat: -7.2575, lon: 112.7521, times: { Subuh: '04:05', Dzuhur: '11:21', Ashar: '14:44', Maghrib: '17:33', Isya: '18:46' } },
  'Semarang':   { full: 'Semarang, Jawa Tengah',       zone: 'WIB',  lat: -6.9667, lon: 110.4167, times: { Subuh: '04:15', Dzuhur: '11:32', Ashar: '14:55', Maghrib: '17:44', Isya: '18:57' } },
  'Yogyakarta': { full: 'Yogyakarta, D.I. Yogyakarta', zone: 'WIB',  lat: -7.7956, lon: 110.3695, times: { Subuh: '04:15', Dzuhur: '11:32', Ashar: '14:55', Maghrib: '17:44', Isya: '18:56' } },
  'Medan':      { full: 'Medan, Sumatera Utara',          zone: 'WIB',  lat: 3.5952,  lon: 98.6722,  times: { Subuh: '04:55', Dzuhur: '12:15', Ashar: '15:37', Maghrib: '18:16', Isya: '19:28' } },
  'Palembang':  { full: 'Palembang, Sumatera Selatan', zone: 'WIB',  lat: -2.9761, lon: 104.7754, times: { Subuh: '04:30', Dzuhur: '11:51', Ashar: '15:13', Maghrib: '18:00', Isya: '19:12' } },
  'Makassar':   { full: 'Makassar, Sulawesi Selatan',  zone: 'WITA', lat: -5.1477, lon: 119.4327, times: { Subuh: '04:30', Dzuhur: '11:55', Ashar: '15:18', Maghrib: '18:07', Isya: '19:20' } },
  'Denpasar':   { full: 'Denpasar, Bali',              zone: 'WITA', lat: -8.6705, lon: 115.2126, times: { Subuh: '04:45', Dzuhur: '12:15', Ashar: '15:38', Maghrib: '18:28', Isya: '19:42' } },
  'Banjarmasin':{ full: 'Banjarmasin, Kalimantan Selatan', zone: 'WITA', lat: -3.3194, lon: 114.5908, times: { Subuh: '04:42', Dzuhur: '12:08', Ashar: '15:31', Maghrib: '18:20', Isya: '19:32' } },
  'Jayapura':   { full: 'Jayapura, Papua',             zone: 'WIT',  lat: -2.5489, lon: 140.7181, times: { Subuh: '04:10', Dzuhur: '11:35', Ashar: '14:58', Maghrib: '17:48', Isya: '19:00' } },
};

const PRAYERS = [
  { id: 'Subuh',   icon: '🌅', hint: 'Fajar',   defaultTime: '04:28' },
  { id: 'Dzuhur',  icon: '☀️', hint: 'Siang',   defaultTime: '11:45' },
  { id: 'Ashar',   icon: '🌤️', hint: 'Sore',    defaultTime: '15:08' },
  { id: 'Maghrib', icon: '🌇', hint: 'Petang',  defaultTime: '17:56' },
  { id: 'Isya',    icon: '🌙', hint: 'Malam',   defaultTime: '19:09' },
];
const TOTAL_SLIDES = 3;

// ===== Ayat / Hadits Reminders =====
const AYAT_LIST = [
  { text: '"Sesungguhnya sholat itu mencegah dari perbuatan keji dan mungkar."', source: 'QS. Al-Ankabut: 45' },
  { text: '"Peliharalah semua sholat dan sholat wustha (Ashar). Dan laksanakanlah sholat karena Allah dengan khusyuk."', source: 'QS. Al-Baqarah: 238' },
  { text: '"Sesungguhnya sholat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman."', source: 'QS. An-Nisa: 103' },
  { text: '"Dan dirikanlah sholat, tunaikanlah zakat, dan rukuklah beserta orang-orang yang rukuk."', source: 'QS. Al-Baqarah: 43' },
  { text: '"Sesungguhnya beruntunglah orang-orang yang beriman, yaitu orang-orang yang khusyuk dalam sholatnya."', source: 'QS. Al-Mu\'minun: 1-2' },
  { text: '"Jadikanlah sabar dan sholat sebagai penolongmu. Sesungguhnya itu sungguh berat kecuali bagi orang-orang yang khusyuk."', source: 'QS. Al-Baqarah: 45' },
  { text: '"Amal yang paling dicintai Allah adalah sholat pada waktunya."', source: 'HR. Bukhari & Muslim' },
  { text: '"Yang pertama kali dihisab dari seorang hamba pada hari kiamat adalah sholatnya."', source: 'HR. An-Nasa\'i' },
  { text: '"Sholat lima waktu dan Jumat ke Jumat adalah penghapus dosa di antara keduanya selama tidak melakukan dosa besar."', source: 'HR. Muslim' },
  { text: '"Sholat adalah tiang agama. Barang siapa mendirikannya, maka ia telah menegakkan agama."', source: 'HR. Baihaqi' },
  { text: '"Dan perintahkanlah keluargamu melaksanakan sholat dan bersabarlah dalam mengerjakannya."', source: 'QS. Thaha: 132' },
  { text: '"Sesungguhnya orang-orang yang beriman dan mengerjakan kebajikan serta melaksanakan sholat dan menunaikan zakat, mereka mendapat pahala di sisi Tuhannya."', source: 'QS. Al-Baqarah: 277' },
  { text: '"Barang siapa menjaga sholat lima waktu, maka sholat itu menjadi cahaya, bukti, dan penyelamat baginya di hari kiamat."', source: 'HR. Ahmad' },
  { text: '"Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya."', source: 'HR. Ahmad' },
];

// ===== State =====
let currentDate = getLocalToday();
let currentSlide = 0;
let weekOffset = 0;
let currentCity = getSavedCity();

// ===== Location & Schedule Helpers =====
function getSavedCity() {
  const c = localStorage.getItem(LOCATION_KEY);
  return (c && CITY_SCHEDULES[c]) ? c : 'Jakarta';
}
function setSavedCity(city) {
  if (CITY_SCHEDULES[city]) {
    localStorage.setItem(LOCATION_KEY, city);
    currentCity = city;
  }
}
function getCitySchedule(city = currentCity) {
  return CITY_SCHEDULES[city] || CITY_SCHEDULES['Jakarta'];
}
function getPrayerTime(prayerId) {
  const sched = getCitySchedule(currentCity);
  return sched.times[prayerId] || '12:00';
}

// ============================================
// HELPERS
// ============================================
function getLocalToday() {
  const d = new Date();
  return fmtDate(d);
}
function fmtDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function formatDateLabel(dateStr) {
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const [y,m,d] = dateStr.split('-').map(Number);
  const date = new Date(y, m-1, d);
  return `${days[date.getDay()]}, ${d} ${months[m-1]} ${y}`;
}
function shiftDate(dateStr, n) {
  const [y,m,d] = dateStr.split('-').map(Number);
  const date = new Date(y, m-1, d);
  date.setDate(date.getDate()+n);
  return fmtDate(date);
}
function parseDateStr(dateStr) {
  const [y,m,d] = dateStr.split('-').map(Number);
  return new Date(y, m-1, d);
}

// ============================================
// DATA LAYER
// ============================================
function loadAllData() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveAllData(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

function getDayData(dateStr) {
  const all = loadAllData();
  if (!all[dateStr]) {
    const defaults = {};
    PRAYERS.forEach(p => defaults[p.id] = false);
    return defaults;
  }
  return all[dateStr];
}
function setDayPrayer(dateStr, prayerId, checked) {
  const all = loadAllData();
  if (!all[dateStr]) {
    const defaults = {};
    PRAYERS.forEach(p => defaults[p.id] = false);
    all[dateStr] = defaults;
  }
  all[dateStr][prayerId] = checked;
  saveAllData(all);
}
function getDayDoneCount(dateStr) {
  const d = getDayData(dateStr);
  return PRAYERS.filter(p => !!d[p.id]).length;
}

// ===== Reminders Data =====
function loadReminders() {
  const sched = getCitySchedule(currentCity);
  try {
    const saved = JSON.parse(localStorage.getItem(REMINDER_KEY));
    if (saved && typeof saved === 'object') {
      PRAYERS.forEach(p => {
        if (!saved[p.id]) saved[p.id] = { enabled: false, time: sched.times[p.id] || p.defaultTime };
      });
      return saved;
    }
  } catch {}
  const defaults = {};
  PRAYERS.forEach(p => { defaults[p.id] = { enabled: false, time: sched.times[p.id] || p.defaultTime }; });
  return defaults;
}
function saveReminders(data) { localStorage.setItem(REMINDER_KEY, JSON.stringify(data)); }

// ============================================
// ONBOARDING
// ============================================
const onboardingEl = document.getElementById('onboarding');
const mainAppEl    = document.getElementById('main-app');
const slides       = document.querySelectorAll('.onboarding-slide');
const dots         = document.querySelectorAll('.dot');

function initOnboarding() {
  if (localStorage.getItem(ONBOARDING_KEY) === 'true') {
    onboardingEl.classList.add('gone');
    mainAppEl.classList.remove('hidden');
    initRekapDropdown();
    initStatsTabs();
    renderHome();
    renderRekap();
    startReminderCheck();
    return;
  }
  document.getElementById('btn-onboard-next').addEventListener('click', () => {
    if (currentSlide < TOTAL_SLIDES - 1) goToSlide(currentSlide + 1);
    else finishOnboarding();
  });
  document.getElementById('btn-skip').addEventListener('click', finishOnboarding);
  slides[0].addEventListener('click', () => { if (currentSlide === 0) goToSlide(1); });
  updateSlideBtn();
}
function goToSlide(i) {
  slides[currentSlide].classList.remove('active');
  slides[currentSlide].classList.add('exit-left');
  currentSlide = i;
  slides[currentSlide].classList.remove('exit-left');
  slides[currentSlide].classList.add('active');
  dots.forEach((d,j) => d.classList.toggle('active', j === currentSlide));
  updateSlideBtn();
}
function updateSlideBtn() {
  document.getElementById('btn-onboard-next').textContent = currentSlide === TOTAL_SLIDES-1 ? 'Mulai' : 'Lanjut';
}
function finishOnboarding() {
  localStorage.setItem(ONBOARDING_KEY, 'true');
  onboardingEl.classList.add('fade-out');
  setTimeout(() => {
    onboardingEl.classList.add('gone');
    mainAppEl.classList.remove('hidden');
    initRekapDropdown();
    initStatsTabs();
    renderHome();
    renderRekap();
    startReminderCheck();
  }, 500);
}

// ============================================
// HOME TAB
// ============================================
function renderHome() {
  const dayData = getDayData(currentDate);
  const reminders = loadReminders();

  const dateLabelEl = document.getElementById('date-label');
  if (dateLabelEl) dateLabelEl.textContent = formatDateLabel(getLocalToday());

  // Update streak di header
  const hsc = document.getElementById('header-streak-count');
  if (hsc) hsc.textContent = calculateStreak();

  const checklistEl = document.getElementById('checklist');
  checklistEl.innerHTML = '';
  const sched = getCitySchedule(currentCity);

  PRAYERS.forEach(prayer => {
    const isChecked = !!dayData[prayer.id];
    const rem = reminders[prayer.id];
    const prayerTime = sched.times[prayer.id] || rem.time;

    const li = document.createElement('li');
    li.className = 'checklist-item' + (isChecked ? ' checked' : '');

    // Main row
    const row = document.createElement('div');
    row.className = 'checklist-row';
    row.innerHTML = `
      <div class="checkbox-wrapper">
        <input type="checkbox" ${isChecked ? 'checked' : ''}>
        <span class="checkmark"></span>
      </div>
      <span class="prayer-icon">${prayer.icon}</span>
      <span class="prayer-label">
        <span class="prayer-name">${prayer.id}</span>
        <span class="prayer-time-sub">${prayerTime}</span>
      </span>
    `;

    // Bell button (Langsung On / Off)
    const bellBtn = document.createElement('button');
    const isBellActive = !!rem.enabled;
    bellBtn.className = 'bell-btn' + (isBellActive ? ' active' : '');
    bellBtn.innerHTML = '🔔';
    bellBtn.setAttribute('type', 'button');
    bellBtn.setAttribute('aria-label', `Pengingat ${prayer.id}`);
    bellBtn.setAttribute('aria-pressed', isBellActive ? 'true' : 'false');
    bellBtn.title = isBellActive ? `Pengingat ${prayer.id} aktif (${rem.time})` : `Aktifkan pengingat ${prayer.id}`;
    row.appendChild(bellBtn);

    li.appendChild(row);
    checklistEl.appendChild(li);

    // --- Events ---

    // Checkbox toggle (click on row excluding bell)
    row.addEventListener('click', (e) => {
      // Ignore if clicking the bell
      if (e.target.closest('.bell-btn')) return;
      if (e.target.type === 'checkbox') return;
      const cb = row.querySelector('input[type="checkbox"]');
      cb.checked = !cb.checked;
      handleToggle(prayer.id, cb.checked, li);
    });
    row.querySelector('.checkbox-wrapper input').addEventListener('change', function() {
      handleToggle(prayer.id, this.checked, li);
    });

    // Bell click → Langsung toggle On / Off Pengingat
    bellBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const r = loadReminders();
      const currentSched = getCitySchedule(currentCity);
      const newState = !r[prayer.id].enabled;
      r[prayer.id].enabled = newState;
      if (currentSched.times && currentSched.times[prayer.id]) {
        r[prayer.id].time = currentSched.times[prayer.id];
      }
      saveReminders(r);

      bellBtn.classList.toggle('active', newState);
      bellBtn.setAttribute('aria-pressed', newState ? 'true' : 'false');
      bellBtn.title = newState ? `Pengingat ${prayer.id} aktif (${r[prayer.id].time})` : `Aktifkan pengingat ${prayer.id}`;

      // Minta izin notifikasi jika baru diaktifkan & tes bunyi/getar feedback
      if (newState) {
        if (navigator.vibrate) navigator.vibrate(40);
        playCheckSound();
        if ('Notification' in window && Notification.permission !== 'granted') {
          Notification.requestPermission();
        }
      }
    });
  });

  updateProgress(dayData);
  updateLiveTimer();
}

// ============================================
// AUDIO & HAPTIC SYNTHESIZER (Web Audio API)
// ============================================
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Suara centang sholat (Cheerful Crisp Chime)
function playCheckSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.1); // A5

    gain1.gain.setValueAtTime(0.25, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.29);

    // Harmonic sparkle
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1174.66, now + 0.06); // D6
    gain2.gain.setValueAtTime(0.18, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.33);
  } catch (e) {
    console.log('Audio error:', e);
  }
}

// Suara alarm waktu sholat (Harmonic Resonant Prayer Chime)
function playAlarmSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [
      { freq: 440, delay: 0, dur: 1.2 },
      { freq: 554.37, delay: 0.25, dur: 1.2 },
      { freq: 659.25, delay: 0.5, dur: 1.4 },
      { freq: 880, delay: 0.8, dur: 1.8 }
    ];

    notes.forEach(n => {
      const start = now + n.delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(n.freq, start);

      gain.gain.setValueAtTime(0.35, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + n.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + n.dur + 0.05);
    });
  } catch (e) {
    console.log('Alarm sound error:', e);
  }
}

function handleToggle(prayerId, checked, li) {
  setDayPrayer(currentDate, prayerId, checked);
  li.classList.toggle('checked', checked);
  const wrapper = li.querySelector('.checkbox-wrapper');
  wrapper.classList.add('animate');
  setTimeout(() => wrapper.classList.remove('animate'), 300);

  if (checked) {
    // 1. Getar Handphone (Haptic Feedback)
    if (navigator.vibrate) {
      try {
        navigator.vibrate([40, 30, 40]);
      } catch (err) {}
    }
    // 2. Bunyikan Suara Centang
    playCheckSound();
  }

  updateProgress(getDayData(currentDate));
  renderRekap();
  const hsc = document.getElementById('header-streak-count');
  if (hsc) hsc.textContent = calculateStreak();
}

function updateProgress(dayData) {
  const done = PRAYERS.filter(p => !!dayData[p.id]).length;
  const total = PRAYERS.length;
  const pct = Math.round((done/total)*100);
  document.getElementById('progress-bar-fill').style.width = `${pct}%`;
  document.getElementById('progress-card').classList.toggle('completed', done === total);
}

// ============================================
// REMINDER NOTIFICATIONS
// ============================================
function startReminderCheck() {
  setInterval(checkReminders, 30000);
  checkReminders();
}

function checkReminders() {
  const reminders = loadReminders();
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  PRAYERS.forEach(prayer => {
    const rem = reminders[prayer.id];
    if (!rem.enabled) return;
    const [h,m] = rem.time.split(':').map(Number);
    const target = h * 60 + m;
    if (Math.abs(nowMinutes - target) < 1) {
      const firedKey = `fired_${prayer.id}_${fmtDate(now)}_${rem.time}`;
      if (!sessionStorage.getItem(firedKey)) {
        sessionStorage.setItem(firedKey, 'true');
        fireNotification(prayer);
      }
    }
  });
}

function fireNotification(prayer) {
  // 1. Suara Alarm / Chime Adzan
  playAlarmSound();

  // 2. Getar Alarm Handphone
  if (navigator.vibrate) {
    try {
      navigator.vibrate([400, 200, 400, 200, 600]);
    } catch (e) {}
  }

  // 3. Notifikasi Masuk ke Handphone
  const title = `🕌 Waktunya Sholat ${prayer.id}!`;
  const options = {
    body: `Panggilan waktu sholat ${prayer.id} (${prayer.hint}). Yuk tunaikan ibadah tepat waktu.`,
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: `prayer-${prayer.id}`,
    vibrate: [400, 200, 400, 200, 600],
    renotify: true
  };

  if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
    navigator.serviceWorker.ready.then(reg => {
      reg.showNotification(title, options);
    }).catch(() => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, options);
      }
    });
  } else if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

// ============================================
// REKAP TAB
// ============================================
function getWeekDates(offset) {
  const today = new Date();
  const dow = today.getDay();
  const monOff = dow === 0 ? -6 : 1 - dow;
  const monday = new Date(today);
  monday.setDate(today.getDate() + monOff + (offset * 7));
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(fmtDate(d));
  }
  return dates;
}

function calculateStreak() {
  let streak = 0;
  let d = getLocalToday();
  if (getDayDoneCount(d) < 5) d = shiftDate(d, -1);
  while (getDayDoneCount(d) === 5) { streak++; d = shiftDate(d, -1); }
  return streak;
}

function initRekapDropdown() {
  const select = document.getElementById('rekap-week-dropdown');
  if (!select) return;
  select.innerHTML = '';
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  
  for (let offset = 0; offset >= -5; offset--) {
    const dates = getWeekDates(offset);
    const fd = parseDateStr(dates[0]);
    const ld = parseDateStr(dates[6]);
    const rangeText = `${fd.getDate()} ${months[fd.getMonth()]} – ${ld.getDate()} ${months[ld.getMonth()]}`;
    const label = offset === 0 
      ? `Minggu Ini (${rangeText})` 
      : offset === -1 
        ? `Minggu Lalu (${rangeText})` 
        : `${Math.abs(offset)} Minggu Lalu (${rangeText})`;
    
    const opt = document.createElement('option');
    opt.value = offset;
    opt.textContent = label;
    select.appendChild(opt);
  }

  select.value = weekOffset;
  select.addEventListener('change', (e) => {
    weekOffset = parseInt(e.target.value, 10);
    renderRekap();
  });
}

let selectedRekapDate = null; // Tersembunyi sampai tanggal diklik
let isStatsOpen = false;
let statsMode = 'day'; // 'day' atau 'week'

function initStatsTabs() {
  const btnDay = document.getElementById('btn-mode-day');
  const btnWeek = document.getElementById('btn-mode-week');
  if (btnDay && btnWeek) {
    btnDay.addEventListener('click', () => {
      statsMode = 'day';
      btnDay.classList.add('active');
      btnWeek.classList.remove('active');
      renderIntegratedStats();
    });
    btnWeek.addEventListener('click', () => {
      statsMode = 'week';
      btnWeek.classList.add('active');
      btnDay.classList.remove('active');
      renderIntegratedStats();
    });
  }
}

function renderRekap() {
  const dayNames = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
  const todayStr = getLocalToday();

  const select = document.getElementById('rekap-week-dropdown');
  if (select && select.value !== String(weekOffset)) {
    select.value = weekOffset;
  }

  const weekDates = getWeekDates(weekOffset);
  
  if (selectedRekapDate && !weekDates.includes(selectedRekapDate)) {
    selectedRekapDate = null;
    isStatsOpen = false;
  }

  const panel = document.getElementById('day-stats-panel');
  if (panel) {
    panel.classList.toggle('open', isStatsOpen);
  }

  const grid = document.getElementById('week-grid');
  if (grid) {
    grid.innerHTML = '';
    weekDates.forEach((dateStr, i) => {
      const done = getDayDoneCount(dateStr);
      const d = parseDateStr(dateStr);
      const div = document.createElement('div');
      
      const isToday = dateStr === todayStr;
      const isSelected = isStatsOpen && (dateStr === selectedRekapDate);
      let cc = 'week-day-circle';
      if (done === 5) cc += ' full';
      else if (done > 0) cc += ' partial';
      if (isToday) cc += ' today';

      div.className = 'week-day' + (isSelected ? ' selected-day' : '') + (isToday ? ' is-today' : '');
      div.title = `Lihat statistik ${formatDateLabel(dateStr)}`;
      div.innerHTML = `
        <span class="week-day-name">${dayNames[i]}</span>
        <div class="${cc}">${done}/5</div>
        <span class="week-day-date">${d.getDate()}</span>
      `;

      div.addEventListener('click', () => {
        const panelEl = document.getElementById('day-stats-panel');
        // Jika klik tanggal yang sama saat sedang terbuka -> tutup dropdown statistik
        if (isStatsOpen && selectedRekapDate === dateStr) {
          isStatsOpen = false;
          selectedRekapDate = null;
          div.classList.remove('selected-day');
          if (panelEl) panelEl.classList.remove('open');
          return;
        }

        // Buka dropdown statistik untuk tanggal yang diklik
        selectedRekapDate = dateStr;
        isStatsOpen = true;
        statsMode = 'day';

        const btnDay = document.getElementById('btn-mode-day');
        const btnWeek = document.getElementById('btn-mode-week');
        if (btnDay && btnWeek) {
          btnDay.classList.add('active');
          btnWeek.classList.remove('active');
        }

        grid.querySelectorAll('.week-day').forEach(el => el.classList.remove('selected-day'));
        div.classList.add('selected-day');

        if (panelEl) panelEl.classList.add('open');
        renderIntegratedStats();
      });

      grid.appendChild(div);
    });
  }

  if (isStatsOpen) {
    renderIntegratedStats();
  }
}

function renderIntegratedStats() {
  const statsEl = document.getElementById('prayer-stats');
  const badgeEl = document.getElementById('day-stats-badge');
  if (!statsEl) return;
  statsEl.innerHTML = '';
  const sched = getCitySchedule(currentCity);

  if (statsMode === 'day') {
    const dayData = getDayData(selectedRekapDate);
    const doneCount = PRAYERS.filter(p => !!dayData[p.id]).length;
    
    if (badgeEl) badgeEl.textContent = `${doneCount} / 5 Sholat (${Math.round((doneCount / 5) * 100)}%)`;

    PRAYERS.forEach(prayer => {
      const isChecked = !!dayData[prayer.id];
      const prayerTime = sched.times[prayer.id] || prayer.defaultTime;
      const row = document.createElement('div');
      row.className = 'prayer-stat-row';
      row.innerHTML = `
        <span class="prayer-icon">${prayer.icon}</span>
        <div class="prayer-stat-info">
          <span class="prayer-name">${prayer.id}</span>
          <span class="prayer-time">${prayerTime}</span>
        </div>
        <div class="prayer-stat-bar-track">
          <div class="prayer-stat-bar-fill" style="width: ${isChecked ? 100 : 0}%"></div>
        </div>
        <span class="prayer-stat-pct ${isChecked ? 'done' : ''}">${isChecked ? '100%' : '0%'}</span>
      `;
      statsEl.appendChild(row);
    });
  } else {
    // Mode 'week' (Akumulasi 7 Hari pada minggu yang dipilih)
    const weekDates = getWeekDates(weekOffset);
    let totalDone = 0;
    weekDates.forEach(ds => { totalDone += getDayDoneCount(ds); });
    
    if (badgeEl) badgeEl.textContent = `Total ${totalDone} / 35 Sholat (${Math.round((totalDone / 35) * 100)}%)`;

    PRAYERS.forEach(prayer => {
      let count = 0;
      weekDates.forEach(ds => {
        if (getDayData(ds)[prayer.id]) count++;
      });
      const pct = Math.round((count / 7) * 100);
      const row = document.createElement('div');
      row.className = 'prayer-stat-row';
      row.innerHTML = `
        <span class="prayer-icon">${prayer.icon}</span>
        <div class="prayer-stat-info">
          <span class="prayer-name">${prayer.id}</span>
          <span class="prayer-time">${count}/7 hari</span>
        </div>
        <div class="prayer-stat-bar-track">
          <div class="prayer-stat-bar-fill" style="width: ${pct}%"></div>
        </div>
        <span class="prayer-stat-pct">${pct}%</span>
      `;
      statsEl.appendChild(row);
    });
  }
}

// ============================================
// LIVE COUNTDOWN & LOCATION MODAL
// ============================================
let timerInterval = null;

function startLiveTimer() {
  updateLiveTimer();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(updateLiveTimer, 1000);
}

function updateLiveTimer() {
  const now = new Date();

  // Next Prayer calculation
  const sched = getCitySchedule(currentCity);
  const prayerOrder = ['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'];

  let nextPrayerId = null;
  let targetDate = null;

  for (let id of prayerOrder) {
    const [h, m] = sched.times[id].split(':').map(Number);
    const pDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0);
    if (pDate > now) {
      nextPrayerId = id;
      targetDate = pDate;
      break;
    }
  }

  // If all prayers today have passed, target tomorrow's Subuh
  let isTomorrow = false;
  if (!nextPrayerId) {
    nextPrayerId = 'Subuh';
    isTomorrow = true;
    const [h, m] = sched.times['Subuh'].split(':').map(Number);
    targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, h, m, 0);
  }

  const diff = Math.max(0, targetDate - now);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  let timerText = '';
  if (diff <= 0) {
    timerText = 'Waktunya Sholat!';
  } else if (hours > 0 && minutes > 0) {
    timerText = `${hours} jam ${minutes} menit`;
  } else if (hours > 0) {
    timerText = `${hours} jam`;
  } else if (minutes > 0) {
    timerText = `${minutes} menit`;
  } else {
    timerText = 'Kurang dari 1 menit';
  }

  const locNameEl = document.getElementById('location-name');
  const badgeEl = document.getElementById('next-prayer-name');
  const timeEl = document.getElementById('next-prayer-time');
  const digitsEl = document.getElementById('countdown-timer');
  const cardEl = document.getElementById('next-prayer-card');

  if (locNameEl) locNameEl.textContent = sched.customFull || sched.full || currentCity;

  if (badgeEl) badgeEl.textContent = nextPrayerId;
  if (timeEl) timeEl.textContent = sched.times[nextPrayerId];
  if (digitsEl) digitsEl.textContent = timerText;

  // Sesuaikan suasana tema warna kartu masjid sesuai sholat
  if (cardEl) {
    cardEl.classList.remove('theme-Subuh', 'theme-Dzuhur', 'theme-Ashar', 'theme-Maghrib', 'theme-Isya');
    cardEl.classList.add(`theme-${nextPrayerId}`);
  }
}

// ============================================
// AUTO DETECT LOCATION (OTOMATIS TANPA POPUP)
// ============================================
const DETECTED_LOC_NAME_KEY = 'ibadah_tracker_detected_name';

function autoDetectLocation() {
  const savedCustom = localStorage.getItem(DETECTED_LOC_NAME_KEY);
  if (savedCustom && CITY_SCHEDULES[currentCity]) {
    CITY_SCHEDULES[currentCity].customFull = savedCustom;
    updateLiveTimer();
  } else {
    // Deteksi awal berdasarkan zona waktu browser
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Makassar') || tz.includes('Ujung_Pandang')) {
        setSavedCity('Makassar');
      } else if (tz.includes('Jayapura')) {
        setSavedCity('Jayapura');
      } else if (tz.includes('Bali') || tz.includes('Denpasar')) {
        setSavedCity('Denpasar');
      } else if (tz.includes('Pontianak')) {
        setSavedCity('Banjarmasin');
      }
    } catch (e) {}
  }

  // Deteksi otomatis GPS di latar belakang (tanpa popup manual)
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        let bestCity = 'Jakarta';
        let minD = Infinity;

        for (let [c, data] of Object.entries(CITY_SCHEDULES)) {
          const d = Math.hypot(data.lat - lat, data.lon - lon);
          if (d < minD) {
            minD = d;
            bestCity = c;
          }
        }

        try {
          const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`);
          const data = await resp.json();
          if (data && data.address) {
            const a = data.address;
            const sub = a.suburb || a.neighbourhood || a.village || a.city_district || a.town || a.city;
            const parent = a.city || a.county || a.state;
            if (sub && parent) {
              const fullDetail = `${sub}, ${parent}`;
              CITY_SCHEDULES[bestCity].customFull = fullDetail;
              localStorage.setItem(DETECTED_LOC_NAME_KEY, fullDetail);
            }
          }
        } catch (e) {}

        setSavedCity(bestCity);
        renderHome();
        updateLiveTimer();
      },
      () => {},
      { timeout: 7000, maximumAge: 600000 }
    );
  }
}

// ============================================
// INIT
// ============================================
autoDetectLocation();
startLiveTimer();
initOnboarding();
