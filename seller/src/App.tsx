import React from "react"
import logo from "./logo.svg"
import "./App.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Signin from "./pages/Signin"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Notfound from "./pages/Notfound"

function App() {
  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <Signin />,
    },

    {
      path: "/",
      element: <Home />,
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ])
  return <RouterProvider router={router} />
}

export default App
