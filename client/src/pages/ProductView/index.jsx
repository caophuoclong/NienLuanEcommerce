import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { ProductService } from '../../services';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import ShopInfo from '../../components/shop/info';
import ProductDetail from './ProductDetail';
import ProductDescription from './ProductDescription';
import { parseUrl } from '../../utils';
import { CartService } from '../../services/cart';
import Quantity from '../../components/Quantity';
import { addCartItem } from '../../app/slices/cart.slice';
import { AppToast } from '../../utils/appToast';
const max = 1500;
const min = 1000;
export default function ProductView() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const lang = useAppSelector((state) => state.settings.lang);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [tmp, setTmp] = useState({});
  const [tmpVariant, setTmpVariant] = useState({});
  const [variantDetail, setVariantDetail] = useState({});
  const { variantDetails, hasVariant, price, stock, variants } = product;
  const prices = variantDetails?.map((v) => v.price);
  const stocks = variantDetails?.map((v) => v.stock);
  const images = [];
  const {t} = useTranslation();
  variants?.forEach((v) => {
    v.options.forEach((opt) => {
      if (opt.image) images.push(opt.image);
    });
  });
  const params = useParams();
  useEffect(() => {
    (async () => {
      try {
        const id = params.id.split('.')[1];
        const response = await ProductService.getProduct(id);
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params]);

  useEffect(() => {
    // console.log(tmpVariant);
    if (Object.values(tmpVariant).length === 0) {
      const temp = { ...tmp };
      delete temp.image;
      setTmp(temp);
    }
    for (const i in tmpVariant) {
      const image = tmpVariant[i].image;
      if (image)
        setTmp({
          image,
        });
    }

    const values = Object.values(tmpVariant).map((x) => {
      console.log(x);
      return x._id;
    });

    const key = `${product._id}_${values.join('_')}`;
    const vD = variantDetails?.find((vd) => vd.sku === key);
    if (vD) setVariantDetail(vD);
    else {
      const key = `${product._id}_${values.reverse().join('_')}`;
      const vD = variantDetails?.find((vd) => vd.sku === key);
      if (vD) {
        setVariantDetail(vD);
      } else {
        setVariantDetail({});
      }
    }
  }, [tmpVariant]);
  const onAddToCart = async () => {
    console.log(Object.keys(variantDetail).length);
    if (Object.keys(variantDetail).length === 0) {
            AppToast(t("please_select_variant"), "warning")

    }
    const productId = variantDetail.sku.split('_');
    const isExist = cart.find(
      (item) => item.product.sku.split('_') === productId,
    );
    if (!isExist) {
      try{
              const response = await CartService.addToCart({
        productVariantDetail: variantDetail,
        quantity,
      });
      // dispatch(addCartItem(1))
      dispatch(addCartItem(response));
      AppToast(t("add_to_cart_success"), "success")
      }catch(err){
        AppToast(t("out_of_stock"), "error")
      }
    }else{
      AppToast(t("product_already_existed"), "warning")
    }
  };
  console.log(variantDetail);


  return (
    <div  className="px-[2rem]">
      <div className="flex h-[400px] gap-4 rounded-md bg-white p-4">
        <div className="w-[350px] ">
          <React.Fragment>
            {
              tmp['image'] ? (
                <div
                  style={{ backgroundImage: `url(${parseUrl(tmp['image'])})` }}
                  className={`h-[350px] w-full bg-cover bg-no-repeat`}
                ></div>
              ) : (
                <Carousel
                  showArrows={false}
                  showThumbs={false}
                  showStatus={false}
                  showIndicators={false}
                  autoPlay
                  duration={1000}
                  infiniteLoop
                >
                  {images.map((imgg, i) => (
                    <div
                      key={i}
                      style={{ backgroundImage: `url(${parseUrl(imgg)})` }}
                      className={`h-[350px] w-full bg-cover bg-no-repeat`}
                    ></div>
                  ))}
                </Carousel>
              )
              // )
            }
          </React.Fragment>
          <div className="h-auto bg-white"></div>
        </div>
        <div className="flex-1 ">
          <div className="mt-5 block w-full text-2xl font-bold">
            {product?.name}
          </div>

          <div className="flex items-center gap-1">
            <div className="my-7 text-4xl font-bold text-green-400">
              {variantDetail && variantDetail['price']
                ? variantDetail['price']
                : hasVariant
                ? `
        ${Math.min(...prices)} - ${Math.max(...prices)}
        `
                : price}
            </div>
            <div className="mb-2 ml-2 text-base font-bold text-red-400 underline decoration-2">
              VNĐ
            </div>
          </div>
          <div className="flex max-w-[300px] flex-col gap-2 overflow-x-auto">
            {variants?.map((v, i) => (
              <div className="flex items-center">
                <div className="min-w-[70px] text-xl font-bold">
                  {v.type.charAt(0).toUpperCase() + v.type.slice(1)}:{' '}
                </div>
                <div>
                  {v.options.map((opt, i) => (
                    <button
                      onClick={() => {
                        if (tmpVariant[v.type]?._id === opt?._id) {
                          setTmpVariant({
                            ...tmpVariant,
                            [v.type]: {},
                          });
                        } else {
                          setTmpVariant({
                            ...tmpVariant,
                            [v.type]: opt,
                          });
                        }
                      }}
                      className={`min-w-[70px] rounded-lg p-2 hover:bg-blue-300 ${
                        tmpVariant[v.type]?._id === opt?._id
                          ? 'bg-blue-500'
                          : ''
                      }`}
                    >
                      {opt.value.charAt(0).toUpperCase() + opt.value.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <span className="text-lg font-bold">{t("quantity")}:</span>
              <Quantity
                current={quantity}
                onChange={(q) => setQuantity(q)}
                max={variantDetail.stock}
              />
            </div>
            <span className="text-md text-gray-500">
              {t("stock")}:{' '}
              {variantDetail && variantDetail['stock'] > -1
                ? variantDetail['stock']
                : hasVariant
                ? `
              ${Math.min(...stocks)} - ${Math.max(...stocks)}
        `
                : stock}
            </span>
          </div>
          <button
            onClick={() => onAddToCart()}
            className="group ml-3 mt-6 flex h-10 flex-1 items-center justify-center gap-x-2 rounded-lg bg-green-400 text-white hover:bg-blue-500"
          >
            <MdOutlineAddShoppingCart className="ml-2" />
            <p className="mr-3 font-bold">{t("add_to_cart")}</p>
          </button>
        </div>
      </div>
      <ShopInfo {...product.shop} color="bg-white" />
      <div className="my-2 bg-white p-4">
        <ProductDetail category={product?.category} detail={product?.detail} />
        <ProductDescription description={product?.description} />
      </div>
    </div>
  );
}
