import React from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
const DocsFileServer = () => {
    const {register, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        console.log(data.file[0]);
        const formData = new FormData();

        formData.append('file', data.file[0]);
        formData.append('name', 'Sample File');

        let response = await axios.post('http://localhost:3000/', formData)
        console.log(response.data);
    };



  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">File Upload</label>
            <input type="file" {...register("file")} />
            <button type="submit">Upload</button>
        </form>
    </div>
  )
}

export default DocsFileServer