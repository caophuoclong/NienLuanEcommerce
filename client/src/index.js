import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate,
} from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { DefaultLayout } from './Layouts';
import './i18n';
import { useAppDispatch } from './app/hooks';
import { changeLanguage } from 'i18next';
import { setDarkMode, changeLang } from './app/slices/setting.slice';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProductView from './pages/ProductView';
import SearchProduct from './pages/SearchProduct';
import { UserService } from './services/user';
import { getHome, getMe } from './app/slices/home.slice';
import { unwrapResult } from '@reduxjs/toolkit';
import User from './pages/User';
import Purchase from './pages/User/Purchase';
import Profile from './pages/User/Profile';
import Checkout from './pages/Checkout';
import 'react-credit-cards/es/styles-compiled.css';
import { getCart } from './app/slices/cart.slice';
import AllOrders from './pages/User/Purchase/AllOrders';
import Processing from './pages/User/Purchase/Processing';
import Completed from './pages/User/Purchase/Completed';
import Refunded from './pages/User/Purchase/Refunded';
import Shipping from './pages/User/Purchase/Shipping';
import Canceled from './pages/User/Purchase/Canceled';
import Active from './pages/Active';
import { AuthService } from './services/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Receipt from './pages/Receipt';
import { OrderService } from './services/order';
const container = document.getElementById('root');
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout children={<Outlet />} />,
    children: [
      // default path is home
      {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: '/product/:id',
        element: <ProductView />,
        errorElement: <NotFound />,
      },
      {
        path: 'search',
        element: <SearchProduct />,
        errorElement: <NotFound />,
      },
      {
        path: '/user',
        element: <Outlet />,
        children: [
          {
            path: 'purchase',

            element: (
              <Purchase>
                <Outlet />
              </Purchase>
            ),
            children: [
              {
                index: true,
                element: <AllOrders />,
              },
              {
                path: 'processing',
                element: <Processing />,
              },
              {
                path: 'completed',
                element: <Completed />,
              },
              {
                path: 'shipping',
                element: <Shipping />,
              },
              {
                path: 'canceled',
                element: <Canceled />,
              },
              {
                path: 'refunded',
                element: <Refunded />,
              },
              {
                path: '*',
                element: <NotFound />,
              },
            ],
          },
          {
            path: 'profile',
            element: <Profile />,
            errorElement: <NotFound />,
          },
        ],
        errorElement: <NotFound />,
      },
      {
        path: 'cart',
        element: <Cart />,
        errorElement: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: 'checkout',
    element: <Checkout />,
    errorElement: <NotFound />,
  },
  {
    path: 'receipt/:id',
    loader: async (data) => {
      try {
        const response = await OrderService.getReceipt(data.params.id);
        return response;
      } catch (error) {
        console.log(error);
      }
      // return 'test';
    },
    element: <Receipt />,
  },
  {
    path: 'active/:token',
    loader: async (data) => {
      try {
        const response = await AuthService.active(data.params.token);
        return response;
      } catch (error) {
        return 0;
      }
    },
    element: <Active />,
  },

  {
    path: 'register',
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: 'signin',
    element: <LogIn />,
    errorElement: <NotFound />,
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <NotFound />,
  },
  {
    path: 'forgotpassword',
    element: <ForgotPassword />,
    errorElement: <NotFound />,
  },
  {
    path: 'resetpassword',
    element: <ResetPassword />,
    errorElement: <NotFound />,
  },
]);
const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const lang = window.localStorage.getItem('lang') || 'vi';
    changeLanguage(lang);
    const darkMode = window.localStorage.getItem('darkMode') || false;
    dispatch(changeLang(lang));
    dispatch(setDarkMode(darkMode));
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const access_token = window.localStorage.getItem('access_token');
  //     console.log(access_token);
  //     if (
  //       access_token !== 'undefined' &&
  //       access_token !== null &&
  //       access_token !== undefined
  //     ) {
  //       dispatch(getMe());
  //       // const unwrap =
  //       // const result = unwrapResult(unwrap);
  //     }
  //   })();
  // }, []);
  return <RouterProvider router={router} />;
};
root.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
