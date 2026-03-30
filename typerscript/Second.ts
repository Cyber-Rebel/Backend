// Type Inference
let awb; // ese apne guess ki hisab type any hae 
// apne end types dek lita hae use bolte hae type inference 
let awb2 = 12 // ese apne guess ki hisab type number hae

// union  and Intersection types
// union ka matlab hai ki variable multiple type ka ho sakta hai
let apple :string | number // apple variable can be either a string or a number
apple = 'hello' // this is valid
apple = 12 // this is also valid 

// custome type create karn hoga
// primitive types aliases
type sankhya = number // sankhya = number : string

let aw4:sankhya;
// object type aliases

type User = {
    name : string,
    age : number

}

let user1 : User = { 
    name : 'John',
    age : 30
}