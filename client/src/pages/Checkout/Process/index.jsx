import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCheck } from 'react-icons/bs';
import ShippingAddress from './ShippingAdress';
import Payment from './Payment';
import Confirm from './Confirm';
import { CheckoutContext } from '..';
import checkPhoneNumber from '../../../utils/checkPhoneNumber';
import checkEmail from '../../../utils/checkEmail';
import {
  checkCardNumber,
  checkCvv,
  checkExpirationDate,
  detectCardType,
} from '../../../utils/creditCard';
import { SAVE_INFORMATION, SET_CARD_TYPE } from '../actionType';
import { useAppSelector } from '../../../app/hooks';
import { OrderService } from '../../../services/order';

export default function Process({ handleShowSummary }) {
  const { t } = useTranslation();
  const [state, dispatch] = useContext(CheckoutContext);
  const cart = useAppSelector((state) => state.cart.cart);
  const [confirmData, setConfirmdata] = useState({});
  const [tabElements, setTabElements] = useState([
    {
      id: 'shipping_address',
      current: true,
      valid: false,
    },
    {
      id: 'payment',
      current: false,
      valid: false,
    },
    {
      id: 'confirm',
      current: false,
      valid: false,
    },
  ]);
  const handleChangeTab = (nextTab) => {
    const tabs = [...tabElements];
    tabs.forEach((tab) => {
      if (tab.id === nextTab) {
        tab.current = true;
      } else {
        tab.current = false;
      }
    });
    setTabElements(tabs);
  };
  const handleContinue = () => {
    switch (tabElements.find((tab) => tab.current).id) {
      case 'shipping_address':
        handleChangeTab('payment');
        break;
      case 'payment':
        handleChangeTab('confirm');
        break;
      case 'confirm':
        break;
      default:
        break;
    }
  };
  const handleBack = () => {
    switch (tabElements.find((tab) => tab.current).id) {
      case 'shipping_address':
        break;
      case 'payment':
        handleChangeTab('shipping_address');
        break;
      case 'confirm':
        handleChangeTab('payment');
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    checkValid(tabElements.find((tab) => tab.current).id);
  }, [state]);
  const checkValid = (tabId) => {
    const tabs = [...tabElements];
    tabs.forEach((tab) => {
      if (tab.id === tabId) {
        switch (tab.id) {
          case 'shipping_address':
            if (
              (state.address._id !== undefined && !isNaN(state.address._id)) ||
              (state.address.name &&
                checkPhoneNumber(state.address.phone) &&
                state.address.province &&
                state.address.district &&
                state.address.ward)
            )
              tab.valid = true;
            else tab.valid = false;
            break;
          case 'payment':
            if (
              state.payment.method === 'COD' ||
              (state.payment.method === 'CREDIT_CARD' &&
                state.card._id &&
                state.card._id !== 'ADD_NEW_CARD') ||
              (checkEmail(state.card.email) &&
                checkCardNumber(state.card.number) &&
                state.card.holder &&
                checkExpirationDate(state.card.exp) &&
                checkCvv(state.card.cvv))
            )
              tab.valid = true;
            else tab.valid = false;
            break;
          case 'confirm':
            tab.valid = true;
            break;
          default:
            break;
        }
      }
    });
    setTabElements(tabs);
  };
  useEffect(() => {
    if (state.card.number.length > 0) {
      // detect card type by card number visa or mastercard
      const cardType = detectCardType(state.card.number);
      if (cardType) {
        dispatch({ type: SET_CARD_TYPE, payload: cardType });
      }
    }
  }, [state.card.number]);
  const handleCheckOut = async () => {
    try {
      const response = await OrderService.checkOut({
        ...state,
        products: cart.filter((i) => i.selected),
      });
      setConfirmdata(response);
      handleChangeTab('confirm');
      handleShowSummary(false);
    } catch (error) {
      alert('Checkout failed');
    }
  };
  return (
    <React.Fragment>
      <ul className="flex">
        {tabElements.map((tab, index) => (
          <li key={tab.id} className="flex flex-1 ">
            <button
              className="flex cursor-default items-center gap-2 text-sm"
              // onClick={()=>handleChangeTab(tab.id)}
            >
              {tab.valid ? (
                <div className="flex h-4 w-4  items-center justify-center rounded-full border-2 border-green-300 font-bold text-green-300">
                  <BsCheck size="16px" />
                </div>
              ) : tab.current ? (
                <div className="flex h-4 w-4  items-center justify-center rounded-full border-2 border-green-300">
                  <div className="h-2 w-2 rounded-full border border-green-300"></div>
                </div>
              ) : (
                <div className="flex h-5 w-5 items-center justify-center rounded-full border text-xs">
                  {index + 1}
                </div>
              )}

              {t(tab.id)}
            </button>
          </li>
        ))}
      </ul>
      <div className="h-[90%]">
        {(() => {
          switch (tabElements.find((tab) => tab.current).id) {
            case 'shipping_address':
              return <ShippingAddress />;
            case 'payment':
              return <Payment />;
            case 'confirm':
              return <Confirm confirm={confirmData} />;
            default:
              return <div>Not found</div>;
          }
        })()}
        {/* <div className="flex gap-2">
            <input onChange={()=>{
                dispatch({
                    type: SAVE_INFORMATION,
                    payload: !state.save
                })
            }} checked={state.save} id="saveInformation" type="checkbox"/>
            <label htmlFor='saveInformation'>Save this information for next time</label>
        </div> */}
      </div>
      <div className="flex justify-end gap-2">
        {tabElements.find((tab) => tab.current).id !== 'confirm' && (
          <React.Fragment>
            <button
              onClick={handleBack}
              className="w-1/6 rounded-md bg-black p-2 text-xl font-bold text-white hover:scale-[0.9] hover:shadow-xl"
            >
              Back
            </button>
            {tabElements.find((tab) => tab.current).id !== 'payment' ? (
              <button
                disabled={!tabElements.find((tab) => tab.current).valid}
                onClick={handleContinue}
                className="w-1/6 rounded-md bg-blue-300 p-2 text-xl font-bold hover:scale-[1.10] hover:shadow-xl  disabled:hover:scale-100"
              >
                Continue
              </button>
            ) : (
              <button
                disabled={!tabElements.find((tab) => tab.current).valid}
                onClick={handleCheckOut}
                className="w-1/6 rounded-md bg-blue-300 p-2 text-xl font-bold hover:scale-[1.10] hover:shadow-xl  disabled:hover:scale-100"
              >
                Checkout
              </button>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}
