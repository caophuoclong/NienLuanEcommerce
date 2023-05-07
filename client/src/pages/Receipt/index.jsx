import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import VietNamCurrency from '../../components/Sign/VietNamCurrency';
import Price from '../../components/Price';
function Address({address}){
    const {t} = useTranslation();
    const lang = useAppSelector(state => state.settings.lang)
    return <React.Fragment>
        <p>
            {address.detail}{' '}
            {lang === 'en' ? address.ward.name_en : address.ward.name}
          </p>
          <p>
            {lang === 'en'
              ? address.ward.district.name_en
              : address.ward.district.name}
            ,{' '}
            {lang === 'en'
              ? address.ward.district.province.name_en
              : address.ward.district.province.name}
          </p>
          <p>
            {t('phone')}:{' '}
            <span className="text-orange-500">{address.phone}</span>
          </p>
    </React.Fragment>
}
export default function Receipt() {
  const { t } = useTranslation();
  const lang = useAppSelector((state) => state.settings.lang);
  const data = useLoaderData();
  const {
    _id,
    shippingCost,
    createdAt,
    address,
    customer: { familyName, firstName, middleName },
    orderItems,
    shop: { shop_name, shop_address },
  } = data;
//   const {
//     phone,
//     detail,
//     ward: {
//       name: ward_name,
//       name_en: ward_name_en,
//       district: {
//         name: district_name,
//         name_en: district_name_en,
//         province: { name: province_name, name_en: province_name_en },
//       },
//     },
//   } = shop_address;
  const subtotal = orderItems.reduce((p, c) => p + c.price * c.quantity, 0);
  return (
    <div className="mx-auto h-[888px] w-[672px]">
      <p className="text-center text-6xl font-bold">{t('receipt')}</p>
      <div className="flex items-center justify-between border-b-2 border-black">
        <div>
          <p className="text-xl font-bold">{shop_name}</p>
          {shop_address && <Address address={shop_address}/>}
        </div>
        <div className="text-blue-500">
          <p>
            {t('invoice')}: <span className="text-orange-500">#{_id}</span>
          </p>
          <p>
            {t('date_time')}:{' '}
            <span className="text-orange-500">
              {new Date(+createdAt).toLocaleString('vi-VN')}
            </span>
          </p>
        </div>
      </div>
      <div>
        <div>
          <p>{t('customer')}</p>
          <p className="font-semibold">
            {lang === 'en'
              ? `${firstName} ${middleName} ${familyName}`
              : `${familyName} ${middleName} ${firstName}`}
          </p>
          <Address address={address}/>
          
        </div>
      </div>
      <div className="border border-l-0 border-r-0 border-blue-300">
        <div className="flex ">
          <p className="flex-[1] text-center font-semibold">{t('QTY')}</p>
          <p className="flex-[3] font-semibold">{t('description')}</p>
          <p className="flex-[2] text-center font-semibold">
            {t('unit_price')}
          </p>
          <p className="flex-[2]  text-center font-semibold">{t('amount')}</p>
        </div>
      </div>
      <div>
        {orderItems.map((item, index) => (
          <div key={index} className="flex">
            <p className="flex-[1] text-center">{item.quantity}</p>
            <div className="flex-[3] text-left">
              <p className="line-clamp-1">{item.name}</p>
              <div key={index} className="text-xs text-gray-500">
                {item.variants.map((variant, index) => (
                  <p key={index}>
                    {variant.type.toUpperCase()}: {variant.value.toUpperCase()}
                  </p>
                ))}
              </div>
            </div>
            <p className="flex-[2] text-center">{item.price}</p>
            <p className="flex-[2] text-center">
              <VietNamCurrency />
              <Price price={item.price * item.quantity} />
            </p>
          </div>
        ))}
      </div>
      <div className="text-right">
        <p>
          {t('sub_total')}: <VietNamCurrency /> <Price price={subtotal} />
        </p>
        <p>
          {t('shipping_fee')}: <VietNamCurrency />{' '}
          <Price price={shippingCost} />
        </p>
        <p>
          {t('total')}: <VietNamCurrency />{' '}
          <Price price={subtotal + shippingCost} />
        </p>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => window.print()}
          className="not-show rounded-lg bg-blue-300 p-2 font-medium shadow-lg outline-none"
        >
          {t('print_receipt')}
        </button>
      </div>
    </div>
  );
}
