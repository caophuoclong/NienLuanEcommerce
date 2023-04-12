import React, { useContext } from 'react';
import { useState } from 'react';
import { HiOutlineCreditCard } from 'react-icons/hi2';
import { CheckoutContext } from '../../..';
import { SET_CARD_NUMBER } from '../../../actionType';
import { checkCardNumber } from '../../../../../utils/creditCard';
import { useEffect } from 'react';

export default function CardNumber() {
  const [state, dispatch] = useContext(CheckoutContext);
  const [error, setError] = useState('');
  const setValue = (value) => {
    dispatch({
      type: SET_CARD_NUMBER,
      payload: value,
    });
  };
  useEffect(() => {
    if (
      state.card.number.length === 16 &&
      !checkCardNumber(state.card.number)
    ) {
      setError('Only accept Visa, Mastercard');
    }else{
      setError('');
    }
  }, [state.card.number]);
  return (
    <div>
      <p className="text-sm text-gray-400">Card Number
      <span className='mx-2 text-red-500 text-sm'>{error}</span>
      </p>
      <label className="flex items-center rounded-lg border p-2">
        <HiOutlineCreditCard size="24px" />
        <span className="ml-2">
          {[...state.card.number]
            .map((v, i) => (i % 4 === 0 ? ' ' + v : v))
            .join('')
            .trim()}
        </span>
        <input
          onChange={(e) => {
            e.target.value = '';
          }}
          onKeyDown={(e) => {
            if (!isNaN(e.key) && state.card.number.length < 16) {
              setValue(state.card.number + e.key);
            }
            if (e.key === 'Backspace') {
              setValue(
                state.card.number.substring(0, state.card.number.length - 1),
              );
            }
          }}
          className="border-none p-0 outline-none ring-0 focus:ring-0"
        />
      </label>
    </div>
  );
}
