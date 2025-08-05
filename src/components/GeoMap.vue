<template>
  <div id="map-container" :class="{ dark: isDarkMode }">
    <div id="map" />
    
    <div class="logo-bottom">
      <img src="../assets/logo.svg" alt="Logo" width="50" height="50" />
    </div>

    <div class="info-box" v-if="location && showInfo">
      <button class="close-btn" @click="showInfo = false">×</button>
      <h3>Your Location</h3>
      <p><strong>Country:</strong>&nbsp;{{ location.country_name }}&nbsp;<img
          :src="`https://flagsapi.com/${location.country_code}/shiny/24.png`" alt="flag"
          style="vertical-align: middle; margin-left: 6px;" /></p>
      <p><strong>Region:</strong>&nbsp;{{ location.region_name }}</p>
      <p><strong>City:</strong>&nbsp;{{ location.city_name }}</p>
      <p><strong>Zip Code:</strong>&nbsp;{{ location.zip_code }}</p>
      <p><strong>IP:</strong>&nbsp;{{ location.ip }}</p>
      <button class="copy-btn" @click="copyIP">Copy IP</button>
    </div>

    <button v-if="!showInfo && location" class="reopen-btn" @click="showInfo = true">
      Show Info
    </button>

    <div class="clock">{{ currentTime }}</div>

    <div class="footer-note">
      This website is for IP2Location Programming Contest 2025.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Remove default Leaflet icon
delete L.Icon.Default.prototype._getIconUrl

// Create red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const location = ref(null)
const showInfo = ref(true)
const isDarkMode = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)

const currentTime = ref('')
function updateClock() {
  currentTime.value = new Date().toLocaleString()
}
updateClock()
const clockInterval = setInterval(updateClock, 1000)
onUnmounted(() => clearInterval(clockInterval))

function getFlag(code) {
  if (!code) return ''
  return code.toUpperCase().replace(/./g, c => String.fromCodePoint(c.charCodeAt(0) + 127397))
}

async function copyIP() {
  try {
    await navigator.clipboard.writeText(location.value.ip)
    alert('IP copied to clipboard!')
  } catch {
    alert('Failed to copy IP.')
  }
}

onMounted(async () => {
  const map = L.map('map').setView([13.75, 100.5], 2)
  const tileLayerUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  L.tileLayer(tileLayerUrl, {
    maxZoom: 18,
    attribution: '&copy; Leaflet | &copy; OpenStreetMap contributors',
  }).addTo(map)

  try {
    const geoRes = await axios.get('/api/ip2location')
    const data = geoRes.data
    location.value = data

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
  font-size: 0.8rem;
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
</style>
