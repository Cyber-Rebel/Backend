import React from 'react'
// use child here 
const page = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Button>Click Me</Button>
      <Button>Submit</Button>
      {/* anthor way pass childer is  */}
      <Button children={"Hello"}></Button>
    </div>
  )
}

const Button = ({children}: {children: React.ReactNode})=>{
  return <button className='bg-green-700 px-10 m-1'>{children}</button>

}

export default page
