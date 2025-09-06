import { useContext } from "react";
import React from "react";
import { data } from "./context/Data.jsx";
// How to use Front Public Folder 
const App = () => {
  const info = useContext(data);
  // console.log(info[0]) data 
  // console.log(info[1]) ui

  return (
    <div className="hello w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 text-center">
        <h1 className="text-2xl font-bold font-[font1] text-gray-800 mb-6">
          Context Data
        </h1>

        <div className="space-y-3 text-left">
          <div className="text-gray-700">
            <span className="font-semibold   ">Name:</span> {info[0].name}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Age:</span> {info[0].age}
          </div>
          <div className="text-gray-700">
            <span className="font-semibold">Gender:</span> {info[0].gender}
          </div>
          <div className="text-blue-600 font-medium">{info[1]}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
