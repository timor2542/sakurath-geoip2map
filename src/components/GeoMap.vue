<template>
  <div id="map-container" :class="{ dark: isDarkMode }">
    <div id="map" />

    <!-- Theme toggle -->
    <div class="theme-toggle">
      <label :class="{ active: themeMode === 'light' }">
        <input type="radio" value="light" v-model="themeMode" />
        ☀️
      </label>
      <label :class="{ active: themeMode === 'dark' }">
        <input type="radio" value="dark" v-model="themeMode" />
        🌙
      </label>
      <label :class="{ active: themeMode === 'auto' }">
        <input type="radio" value="auto" v-model="themeMode" />
        🕒
      </label>
    </div>

    <div v-if="themeToast" class="theme-toast">Theme updated</div>

    <div class="logo-bottom">
      <img src="/logo.svg" alt="Logo" width="50" height="50" />
    </div>

    <!-- Info Box -->
    <div class="info-box" v-if="location && showInfo">
      <button class="close-btn" @click="showInfo = false">×</button>
      <h3>
        Your GeoIP Location
      </h3>
      <p><strong>Country:</strong> {{ location.country_name }} <img
          :src="`https://flagsapi.com/${location.country_code}/shiny/24.png`" alt="flag" style="margin-left: 6px;" />
      </p>
      <p><strong>Region:</strong> {{ location.region_name }}</p>
      <p><strong>City:</strong> {{ location.city_name }}</p>
      <p><strong>Zip Code:</strong> {{ location.zip_code }}</p>
      <p><strong>IP:</strong> {{ location.ip }}</p>
      <button class="copy-btn" @click="copyIP">Copy IP</button>
    </div>

    <!-- Reopen -->
    <button v-if="!showInfo && location" class="reopen-btn" @click="showInfo = true">
      Show Info
    </button>

    <!-- Clock -->
    <div class="clock">{{ currentTime }}</div>

    <div class="map-note-bottom-right">
      It uses your IP address retrieved<br />
      and sends it to the IP2Location API to estimate<br />
      your approximate location based on public IP.<br />
      Country-level detection is highly accurate,<br />
      but GPS-like precision is not intended.
    </div>

    <!-- Footer -->
    <div class="footer-note">
      This website is for IP2Location Programming Contest 2025.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Setup red icon for marker
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// State
const location = ref(null)
const showInfo = ref(true)
const isDarkMode = ref(false)
const savedTheme = localStorage.getItem('themeMode') || 'auto'
const themeMode = ref(savedTheme)
const themeToast = ref(false)
const currentTime = ref('')

// Watch theme changes
watch(themeMode, () => {
  localStorage.setItem('themeMode', themeMode.value)
  applyTheme()
  initMap()
  showToast()
})

// Toast function
function showToast() {
  themeToast.value = true
  setTimeout(() => (themeToast.value = false), 1500)
}

// Auto theme detection
function applyTheme() {
  if (themeMode.value === 'auto') {
    const hour = new Date().getHours()
    isDarkMode.value = hour < 6 || hour >= 18
  } else {
    isDarkMode.value = themeMode.value === 'dark'
  }
}

// Clock update
function updateClock() {
  currentTime.value = new Date().toLocaleString()
}
updateClock()
const clockInterval = setInterval(updateClock, 1000)
onUnmounted(() => clearInterval(clockInterval))

// Copy IP
async function copyIP() {
  try {
    await navigator.clipboard.writeText(location.value.ip)
    alert('IP copied to clipboard!')
  } catch {
    alert('Failed to copy IP.')
  }
}

// Leaflet map
let map
let tileLayer
function initMap() {
  if (map) {
    tileLayer && map.removeLayer(tileLayer)
  } else {
    map = L.map('map').setView([13.75, 100.5], 2)
  }

  tileLayer = L.tileLayer(
    isDarkMode.value
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap contributors & Carto',
    }
  )
  tileLayer.addTo(map)
}

// Mounted
onMounted(async () => {
  applyTheme()
  initMap()

  try {
    // ✅ 1. Get IP from backend
    const ipRes = await axios.get('/api/get-ip')
    const ip = ipRes.data.ip

    // ✅ 2. Use IP to query IP2Location
    const geoRes = await axios.get(`/api/ip2location?ip=${ip}`)
    location.value = geoRes.data

    const lat = parseFloat(data.latitude)
    const lon = parseFloat(data.longitude)

    L.marker([lat, lon], { icon: redIcon })
      .addTo(map)
      .bindPopup(`<b>${data.city_name || 'Unknown City'}</b><br>${data.region_name || ''}, ${data.country_name}<br>IP: ${data.ip}`)
      .openPopup()

    map.setView([lat, lon], 10)
    setTimeout(() => map.invalidateSize(), 200)
  } catch (error) {
    console.error('GeoIP error:', error)
  }
})
</script>

<style scoped>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}

#map-container {
  position: fixed;
  inset: 0;
  overflow: hidden;
  font-family: sans-serif;
}

#map {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.logo {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  width: 200px;
  height: 200px;
}

.logo-bottom {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1000;
  width: 50px;
  height: 50px;
}

.info-box {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 16px 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  max-width: 280px;
  font-size: 0.9rem;
  color: #000;
  overflow-wrap: break-word;
}

.dark .info-box {
  background: rgba(30, 30, 30, 0.95);
  color: #eee;
}

.info-box h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}

.close-btn {
  position: absolute;
  top: 4px;
  right: 6px;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #888;
}

.copy-btn {
  margin-top: 8px;
  width: 100%;
  background: #007bff;
  color: white;
  border: none;
  padding: 6px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
}

.reopen-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 0.85rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.clock {
  position: absolute;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  font-family: monospace;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  z-index: 1000;
  max-width: 90vw;
  white-space: nowrap;
}

.dark .clock {
  background: rgba(255, 255, 255, 0.85);
  color: #000;
}

.footer-note {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.85);
  color: #333;
  padding: 4px 12px;
  border-radius: 6px 6px 0 0;
  z-index: 900;
  white-space: nowrap;
  pointer-events: none;
}

.dark .footer-note {
  background: rgba(0, 0, 0, 0.75);
  color: #eee;
}

.theme-toggle {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 999px;
  padding: 6px 12px;
  display: flex;
  gap: 10px;
  font-size: 1.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.theme-toggle input {
  display: none;
}

.theme-toggle label {
  cursor: pointer;
  opacity: 0.35;
  transition: 0.2s;
}

.theme-toggle label.active {
  opacity: 1;
  transform: scale(1.5);
}

.dark .theme-toggle {
  background: rgba(34, 34, 34, 0.85);
  color: white;
}

.map-note-bottom-right {
  position: absolute;
  bottom: 30px;
  right: 10px;
  background: rgba(255, 255, 255, 0.85);
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.55rem;
  max-width: 280px;
  line-height: 1.4;
  z-index: 1001;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.dark .map-note-bottom-right {
  background: rgba(20, 20, 20, 0.8);
  color: white;
}
</style>
