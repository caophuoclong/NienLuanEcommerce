import React, { useState } from 'react';
import NewAddress from "./NewAddress"
export default function ShippingAddress() {
  const existAdress = [1, 2, 3, 4];
  const [address, setAddress] = useState();
  console.log(address);
  const hanldeAddressChange = (data)=>{
    console.log(data);
  }
  return (
    <div className="py-2 flex flex-col gap-1">
      {existAdress.map((exist, index) => (
        <div key={index} className="flex gap-2" >
          <input
            value={exist}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            name="address"
            type="radio"
          />
        </div>
      ))}
      <div className="">
        <div className="flex gap-2 items-center">
            <input
              value={'newAddress'}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              id="newAddress"
              name="address"
              type="radio"
            />
            <label htmlFor="newAddress">Add new address</label>
        </div>
      </div>
      {
        address === "newAddress" && <NewAddress/>
      }
    </div>
  );
}
