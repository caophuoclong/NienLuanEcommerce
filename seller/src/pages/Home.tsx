import { Box } from "@chakra-ui/react"
import React from "react"
import Header from "../components/header"
import NavBar from "../components/navbar"
import Products from "../components/Products"
import { selectedPage } from "../types/home"
import { useAppSelector } from "../app/hooks"
import Reviews from "../components/Previews"
import Main from "../components/Main"

type Props = {}
function r(page: selectedPage) {
  switch (page) {
    case "home":
      return <Main />
    case "products":
      return <Products />
    case "reviews":
      return <Reviews />
    default:
      return <></>
  }
}
export default function Home({}: Props) {
  const selectedPage = useAppSelector((state) => state.homeSLice.selectedPage)
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
