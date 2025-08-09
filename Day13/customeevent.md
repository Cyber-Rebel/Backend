# A simple custome funcation
io.on("connection", (socket) => {
  console.log('A user are conneted id is ',socket.id) 
  socket.on('message',()=>{ // this is custom event in socket io
    console.log(' message here ')
  })

});

# How to send and Revived data from custome event
io.on("connection", (socket) => {
  console.log('A user are conneted id is ',socket.id)
  socket.on('message',(message)=>{
    console.log(' message here ',message)
  })

});

You can Send Json data text data and binary data jisme File send karte hae useally 
