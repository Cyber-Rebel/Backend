const express = require('express'); 
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello, World!');
}); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

console.log('.env console')
console.log(process.env.Database_User)
// to send env varaible ko pass wi -e  Database_User='cyberrebel'
// docke run -p 3000:3000 -e Database_User='cyberrebel' <image_name>
// push to docker hub 
// first tag the image
// cmd is docker tag <image_id> <docker_hub_username>/<repo_name>:<tag>
// example docker tag 12345abcde cyberrebel/myapp:v1
// cmd is docker push  <docker_hub_username>/<repo_name>:<tag>
// agar by default push to wo public hota hae
// agar private repo me push karna hae to docker login karna parega and create repo waha pe private ko selcete karna hoga nad jo docker image 
