import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import NotFound from './pages/NotFound';
import { DefaultLayout } from './Layouts';

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
    element: <Product />,
    errorElement: <NotFound/>
  },
]);
root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
