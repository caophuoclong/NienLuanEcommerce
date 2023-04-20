import React, { useEffect, useState } from 'react';
import { FaFilter, FaStar } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaTshirt } from 'react-icons/fa';
import { RiMessage3Fill } from 'react-icons/ri';
import { ProductService } from '../../services';
import { useAppSelector } from '../../app/hooks';
import Product from '../../components/Product';
import ShopInfo from '../../components/shop/info';
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
  return (
    <div className="h-full">
      <div className="bl-gray-500 flex flex-1  gap-2">
        <FaFilter />
        <span className="font-bold ">Filter</span>
      </div>
     {
      products.length > 0 ?  <div className="flex-[5]">
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
              to={`/search_user?keyword=${keyword}`}
              className="block w-full text-center text-blue-700"
            >
              --- More Shop ---
            </Link>
          </React.Fragment>
        )}
        <div>
          {/* Products */}
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
      </div>: <div className=" mx-auto w-1/2 bg-white shadow-xl h-20 rounded-lg flex items-center justify-center">
          <p className="font-bold text-xl">Keyword not found</p>
        </div>
     }
    </div>
  );
}
