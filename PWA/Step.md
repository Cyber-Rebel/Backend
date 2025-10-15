# Go To Brower Serach 
vite pwa plugin react 

https://vite-pwa-org.netlify.app/  offical like vite pwa 

and go to npm docs https://www.npmjs.com/package/vite-plugin-pwa // react ke docs ache diye hae eseme 

package download cmd :- npm i vite-plugin-pwa

edit vite.config.js file


VitePWA()
# two many part mani
1 manifest -> explain in exelicedrwa
2 servie worker --> file and draw done me explain keya hae 
# pain poins servies worker
# flow 

your pwa  ----> service worker --->your server 

--user deviser brower---------      -----cloud--

agar tumari application ko koi bhi request send karna hae server 
  to request tumari pahle jati hae serivce worker ke pass and then  jati hae server ke pass



  pwa jo request karta hae wo pahile jati hae service worker ke pass and service worker cheak karta hae ye jo(frontend se) request aa rahi hae esa jo bhi reposcse ane wala hae kya wo service woker ke pass aviable hae agar aviable hae 
  agar first new request ki hae service pass data nahi hoga to use wo backend par bhej deta hae  to wo backen ke pass de ta hae  then serveer use resource ko servicer worker pass bhjega services worker use request ko age forword kar deta hae pwa ke pass likin un donar servicer worker ke kam karta hae resource ko store karke rakta hae then use ek copy pwa ke forword karta hae to agli baar request angar frontend (pwa) se aai to wo service worker pass ageki and servise worker cheak karga ki kya use wo data hae agar hae to udar se hi return kar dega  to useliye wo thoda offline wali feel dta hae to use vaja se prcess fast hoti hae pwa nad servicer worker brower par chalte hae 