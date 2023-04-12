import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import { OrderService } from '../../../services/order';
import { useState } from 'react';
import PurchaseItem from './Components/PurchaseItem';
import { useAppSelector } from '../../../app/hooks';

export default function AllOrders() {
  const orders = useAppSelector((state) => state.order.orders);
  return (
    <div>
      {orders.map((order, index) => (
        <PurchaseItem {...order} key={index} />
      ))}
    </div>
  );
}
