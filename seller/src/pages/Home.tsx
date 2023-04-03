import { Box } from "@chakra-ui/react"
import React, { useEffect } from "react"
import Header from "../components/header"
import NavBar from "../components/navbar"
import Products from "../components/Products"
import { selectedPage } from "../types/home"
import { useAppSelector, useAppDispatch } from "../app/hooks"
import Reviews from "../components/Previews"
import Main from "../components/Main"
import { getMe } from "../features/home"
import Profile from "../components/Profile"
import Coupon from "../components/Coupon"

type Props = {}
function r(page: selectedPage) {
  switch (page) {
    case "home":
      return <Main />
    case "products":
      return <Products />
    case "reviews":
      return <Reviews />
    case "profile":
      return <Profile />
    case "coupon":
      return <Coupon />
    default:
      return <></>
  }
}
export default function Home({}: Props) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    document.title = "Home"
    const access_token = localStorage.getItem("access_token")
    if (!access_token) {
      window.location.href = "/signin"
    } else {
      const result = dispatch(getMe())
    }
  }, [])
  const selectedPage = useAppSelector((state) => state.homeSlice.selectedPage)
  return (
    <Box h="100vh">
      <Header />
      <Box display={"flex"} height="calc(93% - 2px)">
        <NavBar />
        <Box h="100%" width={"100%"}>
          {r(selectedPage)}
        </Box>
      </Box>
    </Box>
  )
}
