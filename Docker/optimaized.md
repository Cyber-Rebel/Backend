
FROM node:18-alpine
#STARING BASE IMAGE THAT PROJECT WILL BUILD UPON 

WORKDIR /app
#SETTING WORKING DIRECTORY INSIDE THE CONTAINER

COPY . .
#MATLAB FIST DOT BOLTA SARI FILE KO DURSRA . BOLTE MERE ME COPY KAR DE 

RUN npm install

EXPOSE 3000

CMD ["node","index.js"]
This file if  you only change the source then problem i is Run npm install is not cased that meain ek code me change bhi kiya ho to bhi npm i hoga
jo hame nahi chaiye hame chaiye ki agar node_module ya package.json me change huve to ye sirf npm i run karna 
to mean that 
common  question is  how to optimaezed the docker file 
age aapp ye soch hae ki 

RUN npm install
COPY . .

esa ham nahi kar sakte kyu ki empty directory me thodi npm i  empty directly packge log file nahi hota 
to  ye to nahi chalega

to optimzed way is 

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install
COPY . .

firt copy json ko copy karo and agar use change huva ho to npm i CACHED hoga nahi to nahi hoga
and age CACHED 
matalb agar apne sourse code change bhi kiya to bar bar wo npm i nahi hoga that simple way to opatimed file 