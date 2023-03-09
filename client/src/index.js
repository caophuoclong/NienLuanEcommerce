import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from "./pages/Cart"
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { DefaultLayout } from './Layouts';
import "./i18n";
import { useAppDispatch } from './app/hooks';
import { changeLanguage } from 'i18next';
import { setDarkMode, changeLang } from './app/slices/setting.slice';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword';
import ProductView from './pages/ProductView';
import SearchProduct from './pages/SearchProduct';
const container = document.getElementById('root');
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout children={<Home />}/>,
    errorElement: <NotFound/>

  },
  {
    path: '/product/:id',
    element: <DefaultLayout children={<ProductView/>}/>,
    errorElement: <NotFound/>
  },
  {
    path: "cart",
    element: <Cart/>,
    errorElement: <NotFound/>
  },
  {
    path: '/signin',
    element: <LogIn />,
    errorElement: <NotFound/>
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <NotFound/>
  },
  {
    path: 'signin',
    element: <LogIn />,
    errorElement: <NotFound/>
  },
  {
    path: 'register',
    element: <Register />,
    errorElement: <NotFound/>
  },
  {
    path: 'forgotpassword',
    element: <ForgotPassword />,
    errorElement: <NotFound/>
  },
  {
    path: 'resetpassword',
    element: <ResetPassword />,
    errorElement: <NotFound/>
  },
  {
    path: "search",
    element: <DefaultLayout children={<SearchProduct/>}/>,
    errorElement: <NotFound/>
  }
]);
const App = ()=>{
  const dispatch = useAppDispatch();
  useEffect(()=>{
    const lang = window.localStorage.getItem("lang") || "vi";
    const darkMode = window.localStorage.getItem("darkMode") || false;
    dispatch(changeLang(lang));
    dispatch(setDarkMode(darkMode));
    changeLanguage(lang);
  },[])
  return (
    <RouterProvider router={router}/>
  )
}
root.render(
  <Provider store={store}>
    <App/>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
