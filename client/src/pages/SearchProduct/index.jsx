import React, { useEffect, useState } from 'react';
import {
  FaFilter,
  FaSortNumericDown,
  FaSortNumericDownAlt,
  FaStar,
} from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaTshirt } from 'react-icons/fa';
import { RiMessage3Fill } from 'react-icons/ri';
import { ProductService } from '../../services';
import { useAppSelector } from '../../app/hooks';
import Product from '../../components/Product';
import ShopInfo from '../../components/shop/info';
import { useTranslation } from 'react-i18next';
export default function SearchProduct() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get('keyword');
  const shopName = searchParams.get('shop');
  const category = searchParams.get('category');
  const isMall = false;
  const [products, setProducts] = useState([]);
  const lang = useAppSelector((state) => state.settings.lang);
  const [shop, setShop] = useState({});
  const [sortPrice, setSortPrice] = useState('asc'); // asc, desc
  useEffect(() => {
    (async () => {
      if (keyword) {
        const response = await ProductService.searchProduct(keyword, lang);
        setProducts(response);
      }
    })();
  }, [keyword]);
  useEffect(() => {
    (async () => {
      if (shopName) {
        const response = await ProductService.getShopProducts(shopName);
        setProducts(response);
      }
    })();
  }, [shopName]);
  useEffect(() => {
    (async () => {
      if (category) {
        const response = await ProductService.getCategoryProducts(category);
        setProducts(response);
      }
    })();
  }, [category]);
  useEffect(() => {
    if (products.length > 0) {
      const { shop } = products[0];
      setShop(shop);
    }
  }, [products]);
  useEffect(()=>{
    if(products.length > 0){
      const newProducts = products.sort((a,b)=> {
        const aPrice = Math.max(...a.variantDetails.map((x)=>x.price));
        const bPrice = Math.max(...b.variantDetails.map((x)=>x.price));
        if(sortPrice === 'asc'){
          return aPrice - bPrice
        }else{
         return bPrice - aPrice
        }
      })
      setProducts(newProducts);
    }
  },[products, sortPrice])
  const { t } = useTranslation();
  return (
    <div className="h-full">
      <div className="bl-gray-500 flex flex-1  gap-2">
        <FaFilter />
        <span className="font-bold ">Filter</span>
      </div>
      {products.length > 0 ? (
        <div className="flex-[5]">
          {keyword && (
            <React.Fragment>
              <div>
                {/* Shop */}
                <p>
                  <span>3</span> Shops relate with{' '}
                  <span className="italic text-blue-700">'{keyword}'</span>
                </p>
                <ShopInfo {...shop} />
              </div>
              <Link
                // to={`/search_user?keyword=${keyword}`}
                to="#"
                className="block w-full text-center text-blue-700"
              >
                --- More Shop ---
              </Link>
            </React.Fragment>
          )}
          <div>
            <div className="flex gap-2 font-xl items-center font-bold">
              <p>{t("sort")}</p>
              {t('price')}{' '}
              <button
              onClick={()=>{
                if(sortPrice === 'asc'){
                  setSortPrice('desc')
                }else{
                  setSortPrice('asc')
                }
              }}
              >{sortPrice === 'asc' ? (
                <FaSortNumericDown />
              ) : (
                <FaSortNumericDownAlt />
              )}</button>
            </div>
            <p>
              Result for keyword{' '}
              <span className="italic text-blue-700">'{keyword}'</span>
            </p>
            <div className="my-4 flex flex-wrap gap-4">
              {products.map((product, index) => (
                <Product key={index} {...product} perRow={4} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className=" mx-auto flex h-20 w-1/2 items-center justify-center rounded-lg bg-white shadow-xl">
          <p className="text-xl font-bold">Keyword not found</p>
        </div>
      )}
    </div>
  );
}
