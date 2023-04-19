import React, { useEffect, useState } from 'react';
import { RiCoupon2Line } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { emptySelected, selectAllItem } from '../../../app/slices/cart.slice';
import Price from '../../../components/Price';
import VietNamCurrency from '../../../components/Sign/VietNamCurrency';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ItemSelected() {
  const cart = useAppSelector((state) => state.cart.cart);
  const itemSelected = useAppSelector((state) => state.cart.itemSelected);
  const [totalPrice, settotalPrice] = useState(0);
  const checked = cart.every((item) => item.selected);
  const dispatch = useAppDispatch();
  const ref = React.useRef(null);
  function checkVisible(elm) {
    if (elm) {
      const rect = elm.getBoundingClientRect();
      const viewHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight,
      );
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    }
  }
  useEffect(() => {
    if (cart.filter(c => c.selected).length > 0) {
      const price = cart.reduce((prev, curr) => {
        return prev + curr.product.price * curr.quantity;
      }, 0);
      settotalPrice(price);
    } else {
      settotalPrice(0);
    }
  }, [cart]);
  const handleSelectAll = () => {
    if (checked) {
      dispatch(emptySelected());
    } else {
      dispatch(selectAllItem());
    }
  };
  const navigate = useNavigate();
  const handleBuy = () => {
    navigate('/checkout');
  };
  const handleWindowScroll = (elm) => {
    if(elm){
      if (!checkVisible(elm)) {
      ref.current.style.position = 'fixed';
      ref.current.style.width = '80%';
      ref.current.style.right = '50%';
      ref.current.style.translate = '50% 0';
    } else {
      ref.current.style.position = 'static';
      ref.current.style.width = '100%';
    }
    }
  };
  useEffect(() => {
    if (ref.current) {
      window.addEventListener('scroll', () => handleWindowScroll(ref.current));
      return () =>
        window.removeEventListener('scroll', () =>
          handleWindowScroll(ref.current),
        );
    }
  }, [ref.current]);
  const {t} = useTranslation();
  return (
    <div
      ref={ref}
      className="bottom-0 z-50 rounded-md bg-white text-lg drop-shadow-2xl"
    >
      {/* <div className="flex w-full items-center justify-end gap-2 border-b py-2 px-2">
        <p>Coupon</p>
        <button className="flex items-center justify-end gap-2 text-blue-400">
          <RiCoupon2Line size="16px" />
          Select coupon
        </button>
      </div> */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <input
            id="selectAllItems"
            type="checkbox"
            className="h-5 w-5"
            checked={checked}
            onChange={handleSelectAll}
          />
          <label htmlFor="selectAllItems">{t("select_all")} ({cart.length})</label>
          <button>{t("remove")}</button>
        </div>
        <div className="flex items-center gap-4">
          <p>
            {t("total")} ({cart.filter(c => c.selected).length} {t("product").toLocaleLowerCase()}): <Price price={totalPrice} />{' '}
            <VietNamCurrency />{' '}
          </p>
          <button
            onClick={handleBuy}
            disabled={cart.some(i => i.selected).length === 0 ? true : false}
            className="flex items-center justify-center rounded-md bg-blue-300 py-2 px-12 hover:scale-[1.05] disabled:cursor-not-allowed"
          >
            {t("checkout")}
          </button>
        </div>
      </div>
    </div>
  );
}
