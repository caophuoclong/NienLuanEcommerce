import React from "react"
import { Box } from "@chakra-ui/react"
import LineChart from "./lineChart"

type Props = {}

export default function Chart({}: Props) {
  return (
    <Box>
      <LineChart />
    </Box>
  )
}
