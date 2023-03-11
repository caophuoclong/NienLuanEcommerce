import { Box, Button } from "@chakra-ui/react"
import React from "react"
import { FaPlus } from "react-icons/fa"

type Props = {}

export default function Header({}: Props) {
  return (
    <Box display={"flex"} p="1">
      <Button
        ml="auto"
        size="lg"
        display={"flex"}
        gap=".3rem"
        alignItems={"center"}
      >
        <FaPlus size="18px" />
        Add coupon
      </Button>
    </Box>
  )
}
