const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
     apiKey:''
});

// socker.user=user ek propery create kran na socket me craxy
async function generateResponce(Chathistory) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: Chathistory // Use the Chathistory array directly
 } );
//   console.log(response.text);
  return response.text;
}

module.exports = {generateResponce}
// only for text to text message convertion 