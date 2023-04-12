import { Box, Table, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import Header from "./Header"

type Props = {}

export default function Coupon({}: Props) {
  return (
    <Box>
      <Header />
      <Table>
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Code</Th>
            <Th>Product</Th>
            <Th>Amount</Th>
            <Th>Status</Th>
            <Th>Start</Th>
            <Th>End</Th>
          </Tr>
        </Thead>
      </Table>
    </Box>
  )
}
