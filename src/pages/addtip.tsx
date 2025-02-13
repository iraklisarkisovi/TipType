import React, { useRef, useState } from 'react'
import Header from './api/Header';
import { Lilita } from '.';
import { useSelector } from 'react-redux';
import { RootState } from './api/Redux/MainSlice';
import { PostTip } from './api/REST';

const Addtip = () => {
    const type = useRef<HTMLInputElement>(null)
    const [tip, setTip] = useState("");

    const user = useSelector((state: RootState) => state.MainR.email)
    
    const onSubmit = async () => {
        try{
            const data = {
                type: type.current?.value,
                tip: tip,
                by: user
            }

            PostTip(data)
            console.log(data)

            setTip("") 

        }catch (error: any) {

        }
        
    }

  return (
    <>
      <Header />
      <div
        className="bg-lime-200 w-screen h-screen flex flex-col items-center justify-center min-h-screen"
        style={{ fontFamily: Lilita.style.fontFamily }}
      >
        <div className="flex flex-col items-center justify-center gap-5">
            <h1 className='text-2xl text-purple-500'>Help others out create a tip!</h1>
          <input
            type="text"
            ref={type}
            placeholder="Tip type"
            className={`p-3 rounded-xl bg-purple-600 text-lime-500 tracking-widest focus:outline-none transition-transform focus:ring-2`}
          />
          <textarea
            placeholder="Tip"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            className={`p-3 rounded-xl bg-purple-600 text-lime-500 tracking-widest w-auto focus:outline-none transition-transform focus:ring-2`}
          />
          <button
            className="bg-purple-600 px-6 text-lime-500 p-3 rounded-xl transition-all hover:bg-purple-500 mt-5"
            onClick={onSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default Addtip
