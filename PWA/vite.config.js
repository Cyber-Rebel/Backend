import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// step 1 : vite-plugin-pwa ko install karna hei
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  // step 2 : plugins ke andar VitePWA ko add karna hei
  plugins: [react(), VitePWA({

    // step 3 : manifest me app ka details dena hota hei
    //   {
    //     step 3 : manifest me app ka details dena hota hei
    //   manifest me app ka details dena hota hei
    //   ye details app install karne ke baad mobile me show hota hei
    // }
     
    manifest: {
      name: 'cyber-rebel-pwa',
      short_name: ' cyber-rebel',
      description: 'My awesome Progressive Web App!',
      theme_color: '#ffffff', // jab tum brower use kar jo brower jo address bar ka color change kar dega
      // jab tum koi application open karte ho to open karne ke baad kuch second ke liye screen par logo and color show hota hei 
// splash screen A splash screen  is introductory screen shown when application/website is launching.

// icons  :- ye app ka icon hota hei jo app install karne ke baad mobile me show hota hei
// ese icon ko appko generate karna hota hei  and array me pass karna hota hae genrate karne ke liye go to https://pwa-icon-ge  nerator.vercel.app/ 
// Donload icons and menifest zip file hogi 
// icons download hogi image ka set jisme multiple size ke icon honge multiple size ke screen ke liye 
 // icos ke folder ko copy karke apne project ke public folder me paste kar do
 
icons: [
    {
      "src": "icons/rebel_icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "icons/rebel_icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "icons/rebel_icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "icons/rebel_icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "icons/rebel_icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "icons/rebel_icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "icons/rebel_icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/rebel_icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "icons/rebel_icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "icons/rebel_icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  start_url: '/', // jab app open karoge to konsa page open hoga
  display: 'standalone', // standalone ka matlab app apne aap me ek alag application ki tarah open hoga na ki browser ke andar

    },
      registerType: 'autoUpdate', // autoUpdate ka matlab jab bhi app me koi naya update aayega to wo automatically update ho jayega
      // agar tum chahte ho ki app tabhi update ho jab user manually update kare to ise 'prompt' kar do
// workrbox :- workbox service worker ko generate karne ke liye use hota hei
// workbox ke andar runtimeCaching hota hei jisme hum caching strategy define karte hain
// caching strategy :- caching strategy ka matlab hota hei ki app ka data kaise cache hoga
// do tarah ki caching strategy hoti hei
// 1) CacheFirst :- CacheFirst ka matlab hota hei ki pehle cache me dekho agar waha data mil jata hei to use kar lo
// agar waha data nahi milta to network se leke aao
// 2) NetworkFirst :- NetworkFirst ka matlab hota hei ki pehle network se data leke aao
// agar network se data nahi milta to cache me dekho agar waha data mil jata hei to use kar lo
// agar waha data bhi nahi milta to error show karo
      workbox: {
        runtimeCaching: [
          {
            urlPattern: "*",     // ye sabhi url ke liye kaam karega
            handler: 'CacheFirst',  //serviws worker pehle cache me dekhega agar waha nahi mila to network se leke aayega
      }]}
      // move to main.jsx file setp 4 kd e liye 


  })],
  server:{
    host:"0.0.0.0"
  }
})
