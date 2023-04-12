import React from "react"
import {
  Box,
  Checkbox,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getOrders } from "../../features/order"
import { unwrapResult } from "@reduxjs/toolkit"
import StatusBadge from "./StatusBadge"
import Order from "./Order"

export default function Orders() {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.orderSlice.order)
  useEffect(() => {
    ;(async () => {
      const uw = await dispatch(getOrders())
      const result = unwrapResult(uw)
      console.log(result)
    })()
  }, [])
  return (
    <Box h="100%" overflowY="auto" position={"relative"}>
      <Table variant="unstyled" overflowY={"auto"}>
        <Thead position="sticky" zIndex={100} top="0" bg="white">
          <Tr>
            <Th>#</Th>
            <Th>
              <Checkbox />
            </Th>
            <Th>Date</Th>
            <Th>Customer</Th>
            <Th>Address</Th>
            <Th>Shipping</Th>
            <Th>Shipping cost</Th>
            <Th>Status</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, key) => (
            <Order key={key} index={key} {...order} />
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
