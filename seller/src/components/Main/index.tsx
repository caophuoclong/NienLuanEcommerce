import { Box } from "@chakra-ui/react"
import React from "react"
import Chart from "./Chart"

type Props = {}

export default function Main({}: Props) {
  return (
    <Box padding="1rem" w="full" h="full" overflowY={"auto"}>
      <Chart />
    </Box>
  )
}
