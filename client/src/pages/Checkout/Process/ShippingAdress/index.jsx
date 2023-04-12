import React, { useContext, useEffect, useState } from 'react';
import NewAddress from './NewAddress';
import { AddressService } from '../../../../services/address';
import { CheckoutContext } from '../..';
import { SET_ADDRESS_ID } from '../../actionType';
export default function ShippingAddress() {
  const [existAddress, setExistAddress] = useState([]);
  const [state, dispatch] = useContext(CheckoutContext);
  useEffect(() => {
    (async () => {
      const response = await AddressService.getExistAddress();
      setExistAddress(response);
      if (response.length > 0) {
        const lastExistAddress = response.sort(
          (a, b) => b.createdAt - a.createdAt,
        )[0];
        dispatch({
          type: SET_ADDRESS_ID,
          payload: lastExistAddress._id,
        });
      } else {
        dispatch({
          type: SET_ADDRESS_ID,
          payload: 'ADD_NEW_ADDRESS',
        });
      }
    })();
  }, []);
  return (
    <div className="flex flex-col gap-1 py-2">
      {existAddress
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((item, index) => (
          <div className="flex justify-between">
            <label key={index} className="gap-2 w-1/2 border-blue-300 border-2 rounded-lg p-2 cursor-pointer">
              <input
                checked={state.address._id === item._id}
                onChange={(e) => {
                  dispatch({
                    type: SET_ADDRESS_ID,
                    payload: item._id,
                  });
                }}
                name="address"
                type="radio"
              />
              <p className="font-bold text-2xl">{item.name}</p>
              <p className="text-base">
                {item.ward.name},{item.ward.district.name},
                {item.ward.district.province.name}
              </p>
              <p>
                Mobile: {item.phone}</p>
            </label>
            
          </div>
        ))}
      <div className="">
        <div className="flex items-center gap-2">
          <input
            checked={state.address._id === 'newAddress'}
            value={'newAddress'}
            onChange={(e) => {
              dispatch({
                type: SET_ADDRESS_ID,
                payload: 'newAddress',
              });
            }}
            id="newAddress"
            name="address"
            type="radio"
          />
          <label htmlFor="newAddress">Add new address</label>
        </div>
      </div>
      {state.address && state.address._id === 'newAddress' && <NewAddress />}
    </div>
  );
}
