import {useState} from 'react'

const Filedata = () => {
  const [file, setFile] = useState(null);
  const [AppendFile, setAppendFile] = useState(null);
    const handleDotAppend = (e) => {
      e.preventDefault(); 
      setAppendFile(file);
     
    }
    const handleFileChange = (e) => {
    setAppendFile(e.target.files[0]); // store the first selected file
  };


  return (
    <div>
      

    <form action="">
        <label htmlFor="">File Upload From onChange event </label>
        <input type="file" onChange={(e) =>{
          console.log(e.target.files[0]);
           setFile(e.target.files[0])}} />
        <button>Upload</button>
    </form>

 <form onSubmit={handleDotAppend}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>

      <img src={file ? URL.createObjectURL(file) : ''} alt="" />
      <h1>{AppendFile && AppendFile.name}</h1>
      <img src={AppendFile?URL.createObjectURL(AppendFile):""} alt="" />
    </div>
  )
}

export default Filedata