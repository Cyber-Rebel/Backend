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

async function generatevector(content){
  try{


  const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: content,
        config: { outputDimensionality: 768, }
    });

    // console.log ('Embedding response:',response.embeddings[0].values) //response.embeddings[0].values); generatrate text to vector 
    return response.embeddings[ 0 ].values;
  }
    catch(err){
      console.log("when converting text to vector accaurina error ", err)
    }
}


module.exports={geminiresponce,generatevector}
