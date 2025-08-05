# 🌍 IP2Location Map App (Vue 3 + Vite + Leaflet)

This is a fully functional web application built for the [IP2Location Programming Contest 2025](https://www.ip2location.com). It demonstrates geolocation mapping based on the user’s public IP address using IP2Location API.

---

## ✨ Features

- 🌐 Get client IP via [ipify.org](https://www.ipify.org/)
- 📍 Query location details from [IP2Location.io](https://www.ip2location.io/)
- 🗺️ Display user’s geolocation on interactive map (Leaflet)
- 🎨 Toggle theme (Light / Dark / Auto by time)
- Country flag, IP info, location UI, responsive design
- ⏰ Real-time clock, "Copy IP", and flag-based location display
- 🧩 Uses Vercel Serverless API to bypass CORS

---

> ⚠️ Note: While country-level detection is highly accurate, subnational details such as city, region, or coordinates may vary depending on the user's ISP, VPN, or network configuration. It uses IP address geolocation (GeoIP) via IP2Location API, which estimates your approximate location based on public IP.

---
## 🚀 Live Demo

🔗 [https://sakurath-geoip2map.vercel.app/](https://sakurath-geoip2map.vercel.app/)

> ✅ Works on both desktop and mobile devices.

---

## 🧰 Technologies

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Leaflet.js](https://leafletjs.com/)
- [IP2Location.io API](https://ip2location.io/)
- [ipify.org](https://www.ipify.org/)
- [Vercel](https://vercel.com/)

---

## ⚙️ Local Development

```bash
git clone https://github.com/timor2542/sakurath-geoip2map.git
cd sakurath-geoip2map

npm install
npm run dev2```

---
## 🌍 Why GeoIP is Accurate at Country Level

IP-based geolocation (GeoIP) is highly accurate for determining a user's **country** because:

1. **IP address blocks are allocated by region/country**  
   Internet IP ranges are distributed by global authorities (IANA, RIRs) to countries or ISPs within those countries. This makes it possible to map an IP to a specific country with high confidence.

2. **GeoIP databases are continuously updated**  
   Services like IP2Location maintain extensive databases that are regularly updated using information from:
   - Regional Internet Registries (RIRs)
   - WHOIS records
   - BGP routing tables
   - ISP reports

3. **Network infrastructure reflects national boundaries**  
   Even for mobile or VPN users, the exit nodes and IP blocks still usually reflect the actual country.

> ✅ As a result, country-level detection with IP geolocation is generally **98% or more accurate**, making it highly reliable for country-specific applications like regional targeting, analytics, or content control.
---
