// 1
serach.png 
const products = await Product.find({
      name: { $regex: query, $options: "i" }
    });


// 2  text and nahi hae 

