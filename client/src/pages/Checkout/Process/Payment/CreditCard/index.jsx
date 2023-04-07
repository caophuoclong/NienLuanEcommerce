import React, { useContext, useState } from 'react';
import Input from './Input';
import { FiMail } from 'react-icons/fi';
import { HiOutlineCreditCard, HiOutlineUser } from 'react-icons/hi2';
import { MdOutlineShield } from 'react-icons/md';
import CardNumber from './CardNumber';
import { CheckoutContext } from '../../..';
import {
  SET_CARD_CVV,
  SET_CARD_HOLDER,
  SET_CREDIT_CARD_ID,
  SET_EMAIL,
} from '../../../actionType';
import ExpireDate from './ExpireDate';
import { OrderService } from '../../../../../services/order';
import { useEffect } from 'react';
import Cards from 'react-credit-cards';
import { BsCheck } from 'react-icons/bs';
export default function CreditCard() {
  const [state, dispatch] = useContext(CheckoutContext);
  const [existingCard, setExistingCard] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await OrderService.getExistingCard();
      console.log(response);
      if (response.length > 0) {
        setExistingCard(response);
        dispatch({
          type: SET_CREDIT_CARD_ID,
          payload: response.sort((a, b) => b.cratedAt - a.cratedAt)[0].number,
        });
      } else {
        dispatch({
          type: SET_CREDIT_CARD_ID,
          payload: 'ADD_NEW_CARD',
        });
      }
    })();
  }, []);
  console.log(state);
  return (
    <div>
      <div className="flex gap-2">
        <input
          checked={state.card._id === 'ADD_NEW_CARD'}
          onChange={() => {
            dispatch({
              type: SET_CREDIT_CARD_ID,
              payload: 'ADD_NEW_CARD',
            });
          }}
          id="newCard"
          type="radio"
          name="existingOrNot"
        />
        <label htmlFor="newCard">New Card</label>
      </div>
      {existingCard.length > 0 && (
        <div className="flex gap-2">
          <input
            checked={state.card._id !== 'ADD_NEW_CARD'}
            onChange={() => {
              dispatch({
                type: SET_CREDIT_CARD_ID,
                payload: existingCard.sort((a, b) => b.cratedAt - a.cratedAt)[0]
                  .number,
              });
            }}
            id="existingCard"
            type="radio"
            name="existingOrNot"
          />
          <label htmlFor="existingCard">Use existing card</label>
        </div>
      )}
      {state.card._id === 'ADD_NEW_CARD' ? (
        <React.Fragment>
          <Input
            value={state.card.email}
            onChange={(value) =>
              dispatch({
                type: SET_EMAIL,
                payload: value,
              })
            }
            name={'Email'}
          >
            <FiMail size="24px" />
          </Input>
          <CardNumber />
          <Input
            value={state.card.holder}
            onChange={(value) => {
              dispatch({
                type: SET_CARD_HOLDER,
                payload: value.toUpperCase(),
              });
            }}
            name="Card Holder"
          >
            <HiOutlineUser size="24px" />
          </Input>
          <div className="flex gap-2">
            <ExpireDate />
            <Input
              value={state.card.cvv}
              onChange={(value) =>
                dispatch({
                  type: SET_CARD_CVV,
                  payload: value,
                })
              }
              name="CVV"
            >
              <MdOutlineShield size="24px" />
            </Input>
          </div>
          <div className="py-2">
            <Cards 
          name={state.card.holder}
          number={state.card.number}
          cvc={state.card.cvv}
          expiry={`${state.card.exp.mm}/${state.card.exp.yy}`}
          acceptedCards={['visa', 'mastercard']}
          
          />
          </div>

        </React.Fragment>
      ) : (
        <div className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto py-2">
          {existingCard.map((card) => (
            <div
              key={card.number}
              className="relative w-[50%] cursor-pointer"
              onClick={() => {
                dispatch({
                  type: SET_CREDIT_CARD_ID,
                  payload: card.number,
                });
              }}
            >
              {state.card._id === card.number && (
                <div className="absolute top-0 bottom-0 left-1/2 z-[100] flex h-full w-[290px] -translate-x-1/2 items-center justify-center rounded-[14.5px] bg-black bg-opacity-10">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-300 bg-opacity-60">
                    <BsCheck size="64px" />
                  </div>
                </div>
              )}

              <Cards
                number={card.number}
                name={card.holder}
                focus={'name'}
                cvc={card.cvv}
                expiry={`${card.exp.mm}/${card.exp.yy}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
