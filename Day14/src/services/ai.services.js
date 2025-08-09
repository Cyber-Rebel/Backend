const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey:''
});

async function generateResponce(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
      config:{ // Ek Layer Set kardi ke reponce kesa hona chaiye 
    systemInstruction:`  
 Answer Should be  very Short

    `
  }
   
  });
//   console.log(response.text);
  return response.text;
}

module.exports = {generateResponce}
// only for text to text message convertion 