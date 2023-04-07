import React, { useContext } from 'react';
import { CheckoutContext } from '../..';
import { SET_PAYMENT_METHOD } from '../../actionType';
import CreditCard from "./CreditCard"
export default function Payment() {
  const [state, dispatch] = useContext(CheckoutContext);
  const listMethod = [
    {
      id: 'COD',
      name: 'Cash on delivery',
      developing: false
    },
    {
      id: 'CREDIT_CARD',
      name: 'Credit card',
      developing: false,
    },
    {
      id: "BANK_TRANSFER",
      name: "Bank transfer",
      developing: true
    },
    {
      id: 'PAYPAL',
      name: 'Paypal',
      developing: true
    },
  ];
  return (
    <div>
      <div className="text-xl font-bold">Payment Method</div>
      <div className="flex flex-nowrap gap-2 overflow-x-auto py-2">
        {listMethod.map((method) => (
          <button
          disabled={method.developing}
          onClick={()=>{
            dispatch({
              type: SET_PAYMENT_METHOD,
              payload: method.id
            })
          }}
            key={method.id}
            className={`flex w-[45%] flex-shrink-0 items-center justify-between border p-2 ${state.payment.method === method.id ? "border-blue-500" : "border-gray"}  disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <span className="mr-2">{method.name}</span>
            <div className={`border w-6 h-6 rounded-full flex items-center justify-center ${state.payment.method === method.id ? "border-blue-500" : "border-gray"}`}>
              {
                state.payment.method === method.id && <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              }
            </div>
          </button>
        ))}
      </div>
      {
        state.payment.method === "CREDIT_CARD" && <CreditCard/>
      }
    </div>
  );
}
