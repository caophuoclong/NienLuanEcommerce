import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { ProductService } from '../../services';
import { useAppSelector } from '../../app/hooks';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import ShopInfo from '../../components/shop/info';
import ProductDetail from './ProductDetail';
import ProductDescription from './ProductDescription';

const max = 1500;
const min = 1000;
export default function ProductView() {
  const lang = useAppSelector((state) => state.settings.lang);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const params = useParams();
  useEffect(() => {
    (async () => {
      try {
        const id = params.id.split('.')[1];
        // console.log(id);
        const response = await ProductService.getProduct(id);
        setProduct(response.product);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [params]);
  const [meta, setMeta] = useState();
  useEffect(() => {
    if (Object.keys(product).length > 0 && Array.isArray(product.meta)) {
      if (product.meta.length > 0) {
        setMeta(product.meta);
      }
    }
  }, [product]);
  const [tmp, setTmp] = useState();
  const [selected, setSelected] = useState({});
  useEffect(() => {
    const xyz = {};
    if (meta && meta.length > 0) {
      meta.forEach((m) => {
        m.attribute.forEach((a) => {
          if (xyz[a.key]) {
            xyz[a.key].push(a.value);
          } else {
            xyz[a.key] = [a.value];
          }
        });
      });
    }
    for (const key in xyz) {
      if (Object.hasOwnProperty.call(xyz, key)) {
        const element = xyz[key];
        xyz[key] = [...new Set(element.map((e) => e.toLocaleLowerCase()))];
      }
    }
    setTmp(xyz);
  }, [meta]);
  const [tmpMeta, setTmpMeta] = useState({});
  useEffect(() => {
    const xyz = [];
    if (Object.keys(selected).length > 0) {
      meta.forEach((m) => {
        const x = m.attribute.filter((a) => selected[a.key] === a.value);
        if (x.length === Object.keys(selected).length) {
          xyz.push(m);
        }
      });
    }
    if (xyz.length === 1) {
      setTmpMeta(xyz[0]);
    } else {
      setTmpMeta({});
    }
  }, [selected, meta]);
  useEffect(() => {
    if (quantity > tmpMeta.stock) {
      setQuantity(tmpMeta.stock);
    }
  }, [tmpMeta]);
  const addToCart = async ()=>{

  }
  return (
    <div className="px-[2rem]">
      <div className="flex h-[400px] gap-4 rounded-md bg-white p-4">
        <div className="w-[350px] ">
          <React.Fragment>
            {Object.keys(tmpMeta).length > 0 ? (
              <div
                style={{ backgroundImage: `url(${tmpMeta.images})` }}
                className={`h-[350px] w-full bg-contain bg-no-repeat`}
              ></div>
            ) : (
              <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
                autoPlay
                duration={Math.floor(Math.random() * (max - min + 1)) + min}
                infiniteLoop
              >
                {meta &&
                  meta.length > 0 &&
                  meta
                    .map((i) => i.images)
                    .map((imgg, i) => (
                      <div
                        key={i}
                        style={{ backgroundImage: `url(${imgg})` }}
                        className={`h-[350px] w-full bg-contain bg-no-repeat`}
                      ></div>
                    ))}
              </Carousel>
            )}
          </React.Fragment>
          <div className="h-auto bg-white"></div>
        </div>
        <div className="flex-1 ">
          <div className="mt-5 block w-full text-2xl font-bold">
            {product.name}
          </div>

          <div className="flex items-center gap-1">
            <div className="my-7 text-4xl font-bold text-green-400">
              {Object.keys(tmpMeta).length > 0
                ? tmpMeta.price
                : meta && meta.length > 0
                ? `${Math.min(...meta.map((m) => m.price))} - ${Math.max(
                    ...meta.map((m) => m.price),
                  )}`
                : ``}
            </div>
            <div className="mb-2 ml-2 text-base font-bold text-red-400 underline decoration-2">
              VNĐ
            </div>
          </div>
          <div className="max-w-[300px] overflow-x-auto">
            {tmp &&
              Object.keys(tmp) &&
              Object.keys(tmp).map((key, index) => {
                return (
                  <div className="my-1 flex ">
                    <div className="flex-[0.5] text-lg font-bold">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </div>
                    <div className="flex flex-1 flex-wrap gap-2">
                      {tmp[key].map((value, index) => {
                        return (
                          <button
                            onClick={() => {
                              if (!selected[key] || selected[key] !== value)
                                setSelected({
                                  ...selected,
                                  [key.toLocaleLowerCase()]:
                                    value.toLocaleLowerCase(),
                                });
                              else {
                                const x = { ...selected };
                                delete x[key];
                                setSelected(x);
                              }
                            }}
                            style={{
                              backgroundColor:
                                selected[key.toLocaleLowerCase()] ===
                                value.toLocaleLowerCase()
                                  ? 'gray'
                                  : 'white',
                              color:
                                selected[key.toLocaleLowerCase()] ===
                                value.toLocaleLowerCase()
                                  ? 'white'
                                  : 'black',
                            }}
                            className="box-border rounded-md border border-white p-1 px-2 hover:border-gray-500"
                          >
                            {key === 'size'
                              ? value.toUpperCase()
                              : value.charAt(0).toUpperCase() + value.slice(1)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <span className="text-lg font-bold">Số lượng:</span>
              <div className="flex items-center ">
                <button
                  onClick={() => {
                    if (quantity > 0) {
                      setQuantity((prev) => prev - 1);
                    }
                  }}
                  className="rounded-lg bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <FaMinus size="12px" />
                </button>
                <input
                  className=" w-9 cursor-default text-center outline-none"
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    if (Object.keys(tmpMeta).length > 0) {
                      if (e.target.value > tmpMeta.stock) {
                        alert('You are not ...');
                      } else {
                        setQuantity(+e.target.value);
                      }
                    } else {
                      setQuantity(+e.target.value);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (Object.keys(tmpMeta).length > 0) {
                      if (+quantity + 1 > tmpMeta.stock) {
                        alert('You are not');
                      } else {
                        setQuantity((prev) => +prev + 1);
                      }
                    } else {
                      setQuantity((prev) => +prev + 1);
                    }
                  }}
                  className="rounded-lg bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <FaPlus size="12px" />
                </button>
              </div>
            </div>
            <span className="text-md text-gray-500">
              Stock:{' '}
              {Object.keys(tmpMeta).length > 0
                ? tmpMeta.stock
                : meta && meta.length > 0
                ? meta.reduce((acc, curr) => acc + curr.stock, 0)
                : 0}
            </span>
          </div>
          <button onClick={()=>{
            // if()
            console.log(product.meta);
            console.log(tmpMeta);
          }} className="group ml-3 mt-6 flex h-10 flex-1 items-center justify-center gap-x-2 rounded-lg bg-green-400 text-white hover:bg-blue-500">
            <MdOutlineAddShoppingCart className="ml-2" />
            <p className="mr-3 font-bold">Thêm vào giỏ hàng</p>
          </button>
        </div>
      </div>
      <ShopInfo color="bg-white" />
      <div className="my-2 bg-white p-4">
        <ProductDetail category={product.category} detail={product.detail}/>
        <ProductDescription description={product.description} />
      </div>
    </div>
  );
}
