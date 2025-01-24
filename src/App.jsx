import React from "react";
import Quiz from "./quiz";
import Footer from "./footer";

function App() {
  return (
    <>
      <div className="bg-[url('https://i.pinimg.com/1200x/43/74/6e/43746ec3b69094fc6d244e0ffea48544.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">
          Soccer Player Quiz
        </h1>
        <Quiz />
      </div>
      <Footer/>
    </>
  );
}

export default App;
