import React from 'react';
import PurchaseItem from './Components/PurchaseItem';
import { useAppSelector } from '../../../app/hooks';

export default function Completed() {
  const orders = useAppSelector((state) => state.order.orders).filter(
    (order) => order.status === 'DELIVERED',
  );
  return (
    <div>
      {orders.map((order, index) => (
        <PurchaseItem {...order} key={index} />
      ))}
    </div>
  );
}
