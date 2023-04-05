import React from 'react';
import { parseUrl } from '../../../utils';
import Price from '../../../components/Price';
import VietNamCurrency from '../../../components/Sign/VietNamCurrency';
const width = '200px';
const height = '200px';
export default function Item(props) {
  const [x, ...sku] = props.product.sku.split('_');
  const image = props.product.productVariantOptions
    .filter((x) => {
      if (sku.map((x) => +x).includes(x._id)) {
        return x;
      }
    })
    .find((x) => x.image && x);
  const variants = props.product.productVariantOptions.filter((x)=>{
    if(sku.map((x)=>+x).includes(x._id)){
      return x
    }
  })
  console.log("🚀 ~ file: Item.jsx:21 ~ variants ~ variants:", variants)
  return (
    <div className="flex gap-2">
      <div
        className="flex-1 bg-no-repeat"
        style={{
          backgroundImage: `url(${parseUrl(image.image)})`,
          backgroundPosition: '20% 20%',
          backgroundSize: `${width} ${height}`,
          width: width,
          height: height,
        }}
      ></div>
      <div className="flex-[2]">
        <p className="font-bold">{props.product.name}</p>
        <p className="text-sm font-light">{props.product.description}</p>
        <div className="w-full border"></div>
        <div>
          <span className="text-gray-300">Variants: </span>
          <span className="font-bold">
            {variants.map(variant => variant.value).join(', ')}
          </span>
        </div>
        <div>
          <span className="text-gray-300">Qty: </span>
          <span className="font-bold">{props.quantity}</span>
        </div>
        <div>
          <span className="text-gray-300">Price: </span>
          <span className="font-bold">
            <Price price={props.quantity * props.product.price} />
            <VietNamCurrency/>
          </span>
        </div>
      </div>
    </div>
  );
}
