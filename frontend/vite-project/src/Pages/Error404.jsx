import React, { useEffect, useState } from "react";
import error from "../images/Error404.png";
import {useNavigate} from 'react-router-dom'
import Layout from "../components/Layout";

function Error404() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 750);
  }, []);
  return (
    <>
      <div className="flex justify-center flex-col items-center min-h-[90vh] gap-2">
        <img src={error} alt="Error" className="object-cover aspect-square" />
        <button
          onClick={()=>navigate('/')}
          className={`p-4 text-2xl text-white font-bold bg-green-400 rounded-[10px] transition-all duration-500
            opacity-0
            translate-y-8 ${show ? 'opacity-100 translate-y-[0]' : ''} cursor-pointer`}
        >
          Back Here
        </button>
      </div>
    </>
  );
}

export default Error404;
