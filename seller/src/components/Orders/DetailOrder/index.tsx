import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import { OrderProductItem } from "../../../types/order"
import Product from "./Product"

type Props = {
  orderItems: Array<OrderProductItem>
}

export default function DetailOrder({ orderItems }: Props) {
  return (
    <Td colSpan={9} bg="gray.300" p="4">
      <Table w="50%" bg="white" rounded="lg">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>name</Th>
            <Th>Variants</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderItems.map((item) => (
            <Product product={item} />
          ))}
        </Tbody>
      </Table>
    </Td>
  )
}
