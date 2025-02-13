import React, { useState } from 'react'
import { Lilita } from '..';
import RegisterForm from './RegisterForm';
import Login from './Login';
import { useDispatch } from 'react-redux';
import { OnClose } from './Redux/MainSlice';

const Main = () => {
  const [Change, setChange] = useState(false);

  const dispatch = useDispatch();
  
  return (
    <>
      <main
        className="w-full h-screen bg-lime-200 flex flex-xol items-center justify-center min-h-screen gap-5"
        style={{ fontFamily: Lilita.style.fontFamily }}
      >
        <Login onChange={() => setChange(true)} />
        <RegisterForm isOpen={Change} onChange={() => setChange(false)} />

        <div className="flex flex-col items-start justify-start text-left p-10 gap-4">
          <h1 className="text-purple-400 text-4xl tracking-wider font-extrabold max-sm:text-3xl">
            Find peace here!
          </h1>
          <p className="text-xl text-purple-300 max-sm:text-lg">
            If you are the one who needs some advices <br />
            this website will help you out.
          </p>
          <div className="flex flex-row gap-5 items-center justify-start">
            <button
              className="text-purple-500 bg-lime-400 px-6 p-3 rounded-xl hover:text-lime-500 hover:bg-purple-300 transition-all"
              onClick={() => dispatch(OnClose())}
            >
              Let's try!
            </button>
            <button className="text-purple-500 bg-lime-400 px-6 p-3 rounded-xl transition-all hover:text-lime-500 hover:bg-purple-300">
              Share
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Main
