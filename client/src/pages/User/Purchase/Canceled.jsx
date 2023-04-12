import React from 'react'
import PurchaseItem from './Components/PurchaseItem';
import { useAppSelector } from '../../../app/hooks';

export default function Canceled() {
  const orders = useAppSelector((state) => state.order.orders).filter(
    (order) => order.status === 'CANCELLED'
  );
  return (
    <div>
      {orders.map((order, index) => (
        <PurchaseItem {...order} key={index} />
      ))}
    </div>
  );
}
