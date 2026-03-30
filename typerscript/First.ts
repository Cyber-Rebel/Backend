// number boolean undefind string character symbol bigint null is primitive type
// obj class  funcation array tuple  refrence types hae 
// primitive
// let a  = 12
// let b =14 
// a = a+2
// ab a value 14 and b value hae 12 
// refrence type 
// let arr = [1,2,3,4]
// let arr2 = arr
// arr.push(5)
// console.log(arr) // [1,2,3,4,5]
// console.log(arr2) // [1,2,3,4,5]  arr and arr2 reference same array in memory
// let obj = {name:"john",age:30}
// let obj2 = obj
// obj.age = 31
// console.log(obj) // {name:"john",age:31}
// console.log(obj2) // {name:"john",age:31}  obj and obj2 reference same object in memory
// Basic Type
// Number , String ,Boolean
// Array , Tuple
// Any,Unknown , Never ,Void
// Enums
let a; // any type matalb defalut
// don't defind any 

let ab:number;
let arr:[]
let str:string ;
let str2='helo'// here hame set kar diya ki str2 ek string aage chal wo string udar type defined nahi kiya to chalega but str ke case aage chal value define hongi ese hame udar type define karte hae 

// Tuple

let ar1= [1,2,3,4,5,'jd']

let ar2:[number,string] = [1,'hear'] // here we have defined that ar2 is an array of numbers only and it should have only one element which is a number


function print():string{
 // func return typs is string
    return "hello world"
}
print() // print(). show all method
function printone():void{
    console.log('kdkd')
}
printone() // print1. to kuch nahi show hoga kyu ki funcation void hae 

// enums
// enmuration is  group of value 
enum Directions {
     top = 'top',
     left = 'left',
     right = 'right',
     bottom = 'bottom'

}

console.log(Directions.bottom)
console.log(Directions.left)