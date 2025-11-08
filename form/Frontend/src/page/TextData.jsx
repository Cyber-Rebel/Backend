import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

const TextData = () => {
  const inputRef = useRef(null)
  const [refvalue, setRefvalue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [hookFromdata , setHookFromdata] = useState('')
  const changeHarder = (e) => {
    setInputValue(e.target.value)
  }
  const submitHandler = (e) => {
    e.preventDefault()
  }
const submitHandler2 = (e) => {
  e.preventDefault()
  const value = inputRef.current.value
  setRefvalue(value)
}
const {register, handleSubmit} = useForm()

const handleSubmitForm = (data) => {
  // ese funcation data ara hae 
  console.log(data.reactHookFormInput)
  // alert(data.reactHookFormInput)
  setHookFromdata(data.reactHookFormInput)
}

  return (
    <div>
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="">2 Way Bindling input data </label>
            <input type="text" onChange={changeHarder} />

            <button>submit 1</button>
        </form>
        <form action="" onSubmit={submitHandler2}>
          <label htmlFor="">UseRef input data </label>
          <input type="text" ref={inputRef} name="" id="" />
          <button>Submit 2</button>
        </form>
        <form action="" onSubmit={handleSubmit(handleSubmitForm)}> 
          
          <label htmlFor="">Useing React-hook-form </label>
          <input type="text" {...register("reactHookFormInput")} />
          <button>Submit 3</button>
        </form>


        <h1>{inputValue}</h1>
        <h1>{refvalue}</h1>
        <h1>{hookFromdata}</h1>
    </div>
  )
}

export default TextData