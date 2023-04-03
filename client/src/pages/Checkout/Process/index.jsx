import React, { useState } from 'react'
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { BsCheck } from 'react-icons/bs';
import ShippingAddress from './ShippingAdress';
import Payment from './Payment';
import Confirm from './Confirm';


export default function Process() {
    const {t} = useTranslation();
    const [tabElements, setTabElements] = useState([
    {
      id: 'shipping_address',
      current: true,
      valid: true
    },
    {
      id: 'payment',
      current: false,
      valid: false
    },
    {
      id: 'confirm',
      current: false,
      valid: false
    },
  ]);
    const handleChangeTab = (nextTab)=>{
        const tabs = [...tabElements];
        tabs.forEach((tab)=>{
            if(tab.id === nextTab){
                tab.current = true
            }else{
                tab.current = false
            }
        })
        setTabElements(tabs);
    }
    const handleContinue = ()=>{

    }
  return (
    <div>
        <ul className="flex">
            {
                tabElements.map((tab, index)=>
                <li key={tab.id} className='flex flex-1 '>
                    <button className="text-sm flex gap-2 items-center" onClick={()=>handleChangeTab(tab.id)}>
                        {
                            tab.valid ? 
                            <div className="w-4 h-4 rounded-full  border-2 border-green-300 flex items-center justify-center text-green-300 font-bold">
                                <BsCheck size="16px"/>
                            </div>
                             : tab.current ?
                            <div className="w-4 h-4 rounded-full  border-2 border-green-300 flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full border border-green-300"></div>
                            </div>
                            :<div className="border w-5 h-5 flex items-center justify-center rounded-full text-xs">{index + 1}</div>
                        }

                        {t(tab.id)}
                    </button>
                    
                </li>
                )
            }
        </ul>
        {
            (()=>{
                switch(tabElements.find(tab => tab.current).id){
                    case "shipping_address":
                        return <ShippingAddress/>
                    case "payment":
                        return <Payment/>
                    case "confirm":
                        return <Confirm/>
                    default:
                        return <div>Not found</div>
                }
            })()
        }
        <div className='flex justify-end gap-2'>
        <button className="w-1/6 rounded-md bg-black p-2 text-xl font-bold text-white hover:scale-[0.9] hover:shadow-xl">
          Back
        </button>
        <button onClick={handleContinue} className="w-1/6 rounded-md bg-blue-300 p-2 text-xl font-bold hover:scale-[1.10] hover:shadow-xl">
          Continue
        </button>
      </div>
    </div>
  )
}
