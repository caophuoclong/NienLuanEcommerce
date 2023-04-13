import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { BiErrorAlt } from 'react-icons/bi';
import { BsCheckCircleFill } from 'react-icons/bs';
import './index.css';
import { SHOP_URL } from '../../configs';

export default function Active() {
  const data = useLoaderData();
  const [timer, setTimer] = React.useState(5);
  const navigate = useNavigate();
  React.useEffect(() => {
    if(data !== 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);
  React.useEffect(() => {
    if (timer === 0) {
      navigateTo()
    }
  }, [timer, data]);
  const navigateTo = ()=>{
    if(data !== 0 && data.role === "SHOP"){
      window.location.href = SHOP_URL
    }else{
      navigate("/signin")
    }
  }
  return (
    <div className="absolute top-1/2 left-1/2 flex h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-md shadow-xl drop-shadow-xl">
      {data === 0 ? (
        <React.Fragment>
          <BiErrorAlt size="100px" className="text-red-700" />
          <p>Your token provide is invalid</p>
          <p>Please check your email and try again</p>
          <button onClick={()=>navigate("/")}  className="rounded-lg bg-green-300 p-4 text-xl font-bold text-gray-100">
            Go back home
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <BsCheckCircleFill size="100px" className="text-green-600" />
          <p>Your account has been activated successfully!</p>
          <p>Now you can continue shopping</p>
          <p>Redirecting to login page in {timer} seconds</p>
          <button  onClick={()=>navigateTo()} className="rounded-lg bg-green-300 p-4 text-xl font-bold text-gray-100">
            Go back home
          </button>
        </React.Fragment>
      )}
    </div>
  );
}
