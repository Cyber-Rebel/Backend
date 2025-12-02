import React from 'react'

const Child = ({ing}) => {
    console.log('hello from child component');
  return (
    <div>Child</div>
  )
}
// export default Child
export default React.memo(Child)  
// unwanted  componte ko re render hone se bacha ne ke liye  React.memo ka use karte hae
// unwnated componte re render hone se bacha ne ke liye  React.memo ka use karte hae