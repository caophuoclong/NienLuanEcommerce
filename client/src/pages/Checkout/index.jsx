import React, { useReducer, useState } from 'react';
import { Tabs } from 'flowbite';
import Header from './Header';
import OrderSummary from './OrderSummary';
import Process from './Process';
import { SET_ADDRESS_DETAIL, SET_DISTRICT, SET_LIST_DISTRCIT, SET_LIST_PROVINCE, SET_LIST_WARD, SET_NAME, SET_PHONE, SET_PROVINCE, SET_WARD } from './actionType';
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
  },
  phoneNumber: '',
  name: '',
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
        name: action.payload,
      };
    case SET_PHONE:
      return {
        ...state,
        phoneNumber: action.payload,
      };
    case SET_ADDRESS_DETAIL:
      return {
        ...state,
        address: {
          ...state.address,
          detail: action.payload,
        },
      };
      
    default:
      return state;
  }
}
export default function Checkout() {
  const [state, dispatch] = useReducer(reducer, intialState);
  return (
    <CheckoutContext.Provider value={[state, dispatch]}>
      <div className="px-8">
        <Header />
        <div className="flex border-t-2 border-red-400">
          <div className="flex-1  border-r border-red-400 py-4 px-2">
            <Process />
          </div>
          <div className="flex-1 border-l border-red-400 py-4 px-2">
            <OrderSummary />
          </div>
        </div>
      </div>
    </CheckoutContext.Provider>
  );
}
