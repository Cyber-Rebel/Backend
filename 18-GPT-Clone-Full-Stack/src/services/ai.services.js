const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function geminiresponce(content) {
  try{
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: content
  });
  return (response.text)}
  catch(err){
    console.log('Error when ai answer',err)
  }
}

module.exports={geminiresponce}
