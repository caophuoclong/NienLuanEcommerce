import React from 'react';
import PurchaseItem from './Components/PurchaseItem';
import { useAppSelector } from '../../../app/hooks';

export default function Shipping() {
  const orders = useAppSelector((state) => state.order.orders).filter(
    (order) => order.status === 'DELIVERING',
  );
  return (
    <div>
      {orders.map((order, index) => (
        <PurchaseItem {...order} key={index} />
      ))}
    </div>
  );
}
