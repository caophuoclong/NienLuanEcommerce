import React, { useReducer, useState } from 'react';
import Header from './Header';
import OrderSummary from './OrderSummary';
import Process from './Process';
import {
  SAVE_INFORMATION,
  SET_ADDRESS_DETAIL,
  SET_ADDRESS_ID,
  SET_CARD_CVV,
  SET_CARD_EXP_MM,
  SET_CARD_EXP_YY,
  SET_CARD_HOLDER,
  SET_CARD_NUMBER,
  SET_CARD_TYPE,
  SET_CREDIT_CARD_ID,
  SET_DISTRICT,
  SET_EMAIL,
  SET_LIST_DISTRCIT,
  SET_LIST_PROVINCE,
  SET_LIST_WARD,
  SET_NAME,
  SET_PAYMENT_METHOD,
  SET_PHONE,
  SET_PROVINCE,
  SET_WARD,
} from './actionType';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
export const CheckoutContext = React.createContext(null);
const intialState = {
  listProvince: [],
  listDistrict: [],
  listWard: [],
  address: {
    province: '',
    district: '',
    ward: '',
    detail: '',
    phone: '',
    name: '',
  },
  payment: {
    method: 'cod',
  },
  card: {
    number: '',
    holder: '',
    exp: {
      mm: '',
      yy: '',
    },
    cvv: '',
    type: '',
    email: '',
  },
  save: true,
};
function reducer(state, action) {
  switch (action.type) {
    case SET_LIST_PROVINCE:
      return {
        ...state,
        listProvince: action.payload,
      };
    case SET_LIST_DISTRCIT:
      return {
        ...state,
        listDistrict: action.payload,
      };
    case SET_LIST_WARD:
      return {
        ...state,
        listWard: action.payload,
      };
    case SET_WARD:
      return {
        ...state,
        address: {
          ...state.address,
          ward: action.payload,
        },
      };
    case SET_PROVINCE:
      return {
        ...state,
        address: {
          ...state.address,
          province: action.payload,
        },
      };
    case SET_DISTRICT:
      return {
        ...state,
        address: {
          ...state.address,
          district: action.payload,
        },
      };
    case SET_NAME:
      return {
        ...state,
        address: {
          ...state.address,
          name: action.payload,
        },
      };
    case SET_PHONE:
      return {
        ...state,
        address: {
          ...state.address,
          phone: action.payload,
        },
      };
    case SET_ADDRESS_DETAIL:
      return {
        ...state,
        address: {
          ...state.address,
          detail: action.payload,
        },
      };
    case SET_PAYMENT_METHOD:
      return {
        ...state,
        payment: {
          ...state.payment,
          method: action.payload,
        },
      };
    case SET_CARD_NUMBER:
      return {
        ...state,
        card: {
          ...state.card,
          number: action.payload,
        },
      };
    case SET_CARD_HOLDER:
      return {
        ...state,
        card: {
          ...state.card,
          holder: action.payload,
        },
      };
    case SET_CARD_EXP_MM:
      return {
        ...state,
        card: {
          ...state.card,
          exp: {
            ...state.card.exp,
            mm: action.payload,
          },
        },
      };
    case SET_CARD_EXP_YY:
      return {
        ...state,
        card: {
          ...state.card,
          exp: {
            ...state.card.exp,
            yy: action.payload,
          },
        },
      };
    case SET_CARD_CVV:
      return {
        ...state,
        card: {
          ...state.card,
          cvv: action.payload,
        },
      };
    case SET_EMAIL:
      return {
        ...state,
        card: {
          ...state.card,
          email: action.payload,
        },
      };
    case SET_CARD_TYPE:
      return {
        ...state,
        card: {
          ...state.card,
          type: action.payload,
        },
      };
    case SAVE_INFORMATION:
      return {
        ...state,
        save: action.payload,
      };
    case SET_ADDRESS_ID:
      return {
        ...state,
        address: {
          ...state.address,
          _id: action.payload,
        },
      };
    case SET_CREDIT_CARD_ID:
      return {
        ...state,
        card: {
          ...state.card,
          _id: action.payload,
        },
      };
    default:
      return state;
  }
}
export default function Checkout() {
  const [state, dispatch] = useReducer(reducer, intialState);
  const cart = useAppSelector((state) => state.cart.cart);
  const [showSummary, setShowSummary] = useState(true);
  const navigate = useNavigate();
  // 0 true true => true
  // 1 true false => false
  // 2 false true => true
  // 3 false false => false

  // useEffect(() => {
  //   if (cart.every((i) => !i.selected)) {
  //     navigate('/cart');
  //   }
  // }, [cart]);
  return (
    <CheckoutContext.Provider value={[state, dispatch]}>
      <div className="px-8">
        <Header />
        <div className=" h-[90vh] border-t-2">
          <div className="mx-auto flex h-full w-[80%]">
            <div style={{
              borderRight: showSummary ? "2px" : "0px",
              maxWidth: showSummary ? "50%" : "100%",
            }} className="flex-1 py-4 px-2">
              <Process handleShowSummary={(value) => setShowSummary(value)} />
            </div>
            {showSummary && (
              <div className="flex-1 border-l py-4 px-2 flex flex-col">
                <OrderSummary />
              </div>
            )}
          </div>
        </div>
      </div>
    </CheckoutContext.Provider>
  );
}
