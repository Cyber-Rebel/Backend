Perfect 👍
React project (Vite / CRA) me **“Add to Home Screen / Install App” button** lagane ka **exact practical steps** de raha hoon — **seedha kaam ka**.

---

## ✅ Step-by-Step: React me PWA + Install Button

> Ye Android Chrome + Desktop Chrome pe kaam karega
> (iOS thoda limited hota hai, wo baad me bataunga)

---

## 1️⃣ `manifest.json` add karo

📁 **public/manifest.json**

```json
{
  "name": "Cyber AI",
  "short_name": "CyberAI",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#0f172a",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

📁 **public/** me icons rakho:

```
icon-192.png
icon-512.png
```

---

## 2️⃣ `index.html` me link add karo

📁 **index.html**

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#0f172a" />
```

---

## 3️⃣ Service Worker add karo

📁 **public/sw.js**

```js
self.addEventListener("install", () => {
  console.log("Service Worker Installed");
});
```

---

## 4️⃣ Service Worker register karo (React)

📁 **src/main.jsx** (Vite)
📁 **src/index.js** (CRA)

```js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
```

---

## 5️⃣ Install Button Component (🔥 MAIN PART)

📁 **src/components/InstallApp.jsx**

```jsx
import { useEffect, useState } from "react";

let deferredPrompt;

export default function InstallApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () =>
      window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    setShow(false);
  };

  if (!show) return null;

  return (
    <button
      onClick={installApp}
      style={{
        padding: "12px 20px",
        background: "#6366f1",
        color: "#fff",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Download App
    </button>
  );
}
```

---

## 6️⃣ Landing Page me button use karo

📁 **src/App.jsx**

```jsx
import InstallApp from "./components/InstallApp";

function App() {
  return (
    <div>
      <h1>Cyber AI</h1>
      <p>AI Chat & Image Generator</p>

      <InstallApp />
    </div>
  );
}

export default App;
```

---

## 🎉 Result

* Mobile Chrome me **Download App** button dikhega
* Click → **Install popup**
* Install → **Home Screen icon**
* App **browser ke bina open** hoga 🔥

---

## ⚠️ Important Notes (real world)

### ✅ Ye tab kaam karega jab:

* HTTPS ho (tumhara hai ✔)
* User pehle visit kar chuka ho
* Chrome / Edge ho

### ❌ iOS Safari:

* Auto popup **nahi aata**
* User ko manually:
  `Share → Add to Home Screen`

(chaho to iOS ke liye custom instruction UI bana sakte hain)

---

## 🧠 Bonus (Pro Level)

Agar tum **Vite** use kar rahe ho, best way:

```bash
npm i vite-plugin-pwa
```

Phir auto-PWA setup ho jayega (cache, update, offline).

---

Agar chaho next:

* 🔹 **Vite + PWA full config**
* 🔹 **iOS special install UI**
* 🔹 **Play Store upload (TWA)**

bas bolo 👌
