import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllOrders } from '../../../app/slices/order.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

export default function Purchase({ children }) {
  const [active, setActive] = useState('/');
  const orders = useAppSelector((state) => state.order.orders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (true) {
      (async () => {
        const unwrap = await dispatch(getAllOrders());
        const result = await unwrapResult(unwrap);
        console.log('🚀 ~ file: index.jsx:15 ~ result:', result);
      })();
    }
  }, []);
  const location = useLocation();
  useEffect(() => {
    const pathName = location.pathname;
    const x = pathName.split('/user/purchase')[1];
    if (x.length === 0) {
      setActive('/');
    } else {
      setActive(x);
    }
  }, [location]);
  const {t} = useTranslation();

  return (
    <div>
      <div className="flex justify-evenly gap-2 h-8">
        <Link
          className={`w-[calc(100%/7)] rounded-lg pb-1 text-center text-lg font-semibold hover:text-blue-500 ${
            active === '/'
              ? 'border-b border-dashed border-blue-300'
              : 'border-none'
          }`}
          to="/user/purchase"
        >
          {t("all")}
        </Link>
        <Link
          className={`w-[calc(100%/7)] rounded-lg pb-1 text-center text-lg font-semibold hover:text-blue-500 ${
            active === '/processing'
              ? 'border-b border-dashed border-blue-300'
              : 'border-none'
          }`}
          to="/user/purchase/processing"
        >
          {t("processing")}
        </Link>
        <Link
          className={`w-[calc(100%/7)] rounded-lg pb-1 text-center text-lg font-semibold hover:text-blue-500 ${
            active === '/shipping'
              ? 'border-b border-dashed border-blue-300'
              : 'border-none'
          }`}
          to="/user/purchase/shipping"
        >
          {t("shipping")}
        </Link>
        <Link
          className={`w-[calc(100%/7)] rounded-lg pb-10 text-center text-lg font-semibold hover:text-blue-500 ${
            active === '/completed'
              ? 'border-b border-dashed border-blue-300'
              : 'border-none'
          }`}
          to="/user/purchase/completed"
        >
          {t("completed")}
        </Link>
        <Link
          className={`w-[calc(100%/7)] rounded-lg pb-1 text-center text-lg font-semibold hover:text-blue-500 ${
            active === '/canceled'
              ? 'border-b border-dashed border-blue-300'
              : 'border-none'
          }`}
          to="/user/purchase/canceled"
        >
          {t("cancelled")}
        </Link>
        <Link
          className={`w-[calc(100%/7)] rounded-lg pb-1 text-center text-lg font-semibold hover:text-blue-500 ${
            active === '/refunded'
              ? 'border-b border-dashed border-blue-300'
              : 'border-none'
          }`}
          to="/user/purchase/refunded"
        >
          {t("refunded")}
        </Link>
      </div>
      {children}
    </div>
  );
}
