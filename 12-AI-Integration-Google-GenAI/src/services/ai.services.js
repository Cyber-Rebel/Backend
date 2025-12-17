

const { GoogleGenAI } =require("@google/genai")

const ai = new GoogleGenAI({

});
async function generatecontext(base64ImageFile) { // main fucation 


//p-1
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
      data: base64ImageFile, 
    },
  },
  { text: "Caption this image." }, // promt diya ki caption create kar 
];

// p-2
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,  // ese kya kran use liya
  config:{
    systemInstruction:`  
 You are an expert in generating captions for images.
You generate single caption for the image.
Your caption should be short and concise.
You use hashtags and emojis in the caption.
    `
  }
}) 

  return response.text;

;}

 module.exports={generatecontext}

 // SystemInstrucation me kya ese promt hona chaoiye matlab systeInstruction ek boundary create karna hae on basis of promt

