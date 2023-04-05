import React, { useContext, useState } from 'react';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { CheckoutContext } from '../../..';
import { SET_CARD_EXP_MM, SET_CARD_EXP_YY } from '../../../actionType';
export default function ExpireDate() {
  const [month, setMonth] = useState("");
  const [state, dispatch] = useContext(CheckoutContext);
  return (
    <div>
      <label className="text-sm text-gray-400">Exp (mm/yy)</label>
      <div className="flex items-center gap-2 rounded-lg border p-2">
        <HiOutlineCalendarDays size="24px" />
        <div className="flex w-24 items-center p-1">
          <label className="flex gap-1 cursor-text items-center" htmlFor="mm">
            {state.card.exp.mm}{Array(2 - state.card.exp.mm.length).fill(0).map((x,i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-black"></div>
            ))}
          </label>
          <input  value={state.card.exp.mm} id="mm" className="w-0" onChange={(e)=>{
            if(!isNaN(e.target.value) && e.target.value.length <= 2){
              dispatch({
                type: SET_CARD_EXP_MM,
                payload: e.target.value
              })
            }
          }}/>
          <span>/</span>
          <input  
          onKeyDown={(e)=>{
            if(e.key === "Backspace" && state.card.exp.mm.length > 0 && state.card.exp.yy.length === 0){
              dispatch({
                type: SET_CARD_EXP_MM,
                payload: state.card.exp.mm.substring(0, state.card.exp.mm.length - 1)
              })
            }
          }}
          value={state.card.exp.yy} id="yy" className="w-0" onChange={(e)=>{
            if(!isNaN(e.target.value) && e.target.value.length <= 2){
              dispatch({
                type: SET_CARD_EXP_YY,
                payload: e.target.value
              })
            }
          }}/>
          <label className="flex gap-1 cursor-text items-center" htmlFor="yy">
            {state.card.exp.yy}{Array(2 - state.card.exp.yy.length).fill(0).map((x,i) => (
              <div key={i} className="h-2 w-2 rounded-full bg-black"></div>
            ))}
          </label>
        </div>
      </div>
    </div>
  );
}
