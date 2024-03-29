import React from 'react';
import { BsShop } from 'react-icons/bs';
import { FaShopify } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { parseUrl } from '../../../../utils';
import Price from '../../../../components/Price';
import VietNamCurrency from '../../../../components/Sign/VietNamCurrency';
import { useTranslation } from 'react-i18next';
import { AppToast } from '../../../../utils/appToast';
import { useAppDispatch } from '../../../../app/hooks';
import { handleChangeStatus } from '../../../../app/slices/order.slice';
import { OrderService } from '../../../../services/order';

export default function PurchaseItem({
  shop,
  status,
  orderItems,
  shippingCost,
  _id
}) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleUpdateStatus = async(status)=>{
    try{
      await OrderService.updateStatusOrder({
        _id,
        status
      })
      dispatch(handleChangeStatus({
      _id,
      status
    }))
    AppToast(t("update_success"),"success")
      
    }catch(error){
      AppToast(t("update_fail"), "error")

    }
    
    
  } 
  const handleRefundOrder = ()=>{
    AppToast(t("feature_developing"))
  }
  const exportReceipt = ()=>{
    navigate("/receipt/"+_id)
  }

  return (
    <div className="my-4 shadow-lg p-2 drop-shadow-md rounded-md">
      <div className="flex justify-between border-b px-2">
        {shop && (
          <div className="flex  gap-2">
            <div className="min-w-[50px] max-w-[100px] font-bold line-clamp-1 ">
              {shop.shop_name}
            </div>
            <Link
              to={`/search?shop=${shop.auth.username}`}
              className="flex items-center gap-1 text-sm"
            >
              <BsShop size="16px" />
              <p>{t("view_shop")}</p>
            </Link>
            <div className="text-blue-300">{t("follow_me")}</div>
          </div>
        )}
        <div>{
          t(status.toLowerCase().replace(" ", "_")).toUpperCase()
          }</div>
      </div>
      {orderItems.length > 0 &&
        orderItems.map((orderItem, index) => (
          <div
            key={index}
            className="flex items-center border-b border-dashed gap-2 my-4"
          >
            <div
              style={{
                backgroundSize: '100px 100px',
                width: '100px',
                height: '100px',
                backgroundPosition: '50%',
                backgroundImage: `url(${
                  orderItem.product.hasVariant
                    ? orderItem.product !== undefined &&
                      parseUrl(
                        Object.values(orderItem.product.variants).find(
                          (x) => x.image !== null,
                        )
                          ? Object.values(orderItem.product.variants).find(
                              (x) => x.image !== null,
                            ).image
                          : 'https://picsum.photos/200',
                      )
                    : parseUrl('https://picsum.photos/230')
                })`,
              }}
            ></div>
            <div className="flex-[5]">
              <p className="text-xl font-bold">{orderItem.product.name}</p>
              {orderItem.product && orderItem.product.hasVariant && (
                <p className="text-sm text-gray-500">
                  {t("category")}:{' '}
                  {Object.values(orderItem.product.variants)
                    .map((x) => x.value)
                    .join(', ')}
                </p>
              )}
              <p>{t("quantity")}: {orderItem.quantity}</p>
            </div>
            <div className="flex-1">
              <Price price={orderItem.price} />
              <VietNamCurrency />
            </div>
          </div>
        ))}
      <div className="flex justify-end gap-2 items-center">
        <p className="flex-lg font-semibold">{t("total_price")}:</p>
        <div className='text-blue-400 text-xl'>
          <Price
            price={
              shippingCost +
              orderItems
                .map((x) => x.price)
                .reduce((prev, curr) => prev + curr, 0)
            }
          />
          <VietNamCurrency />
        </div>
      </div>
      <div className="flex items-center justify-end">
        {
          (status === "PENDING" || status === "PROCESSING" )&& <button onClick={()=>handleUpdateStatus("CANCELLED")} className="p-2 px-4 text-xl font-bold border rounded-md text-white bg-red-400">{t("cancle_order")}</button>
        }
        {
          status === "DELIVERING" && <button onClick={()=>handleUpdateStatus("DELIVERED")} className="p-2 px-4 text-xl font-bold border rounded-md text-white bg-yellow-400">{t("received_order")}</button>
        }
        {
          status === "DELIVERED" && <React.Fragment>
            <button onClick={exportReceipt} className="p-2 px-4 text-xl font-bold border rounded-md text-white bg-gray-400">{t("export_receipt")}</button>
            <button onClick={handleRefundOrder} className="p-2 px-4 text-xl font-bold border rounded-md text-white bg-orange-400">{t("refund")}</button>
          </React.Fragment>
        }
      </div>
    </div>
  );
}
