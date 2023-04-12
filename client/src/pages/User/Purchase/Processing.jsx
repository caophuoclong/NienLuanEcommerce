import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import PurchaseItem from './Components/PurchaseItem';

export default function Processing() {
  const orders = useAppSelector((state) => state.order.orders).filter(
    (order) => order.status === 'PENDING' || order.status === 'PROCESSING',
  );
  return (
    <div>
      {orders.map((order, index) => (
        <PurchaseItem {...order} key={index} />
      ))}
    </div>
  );
}
