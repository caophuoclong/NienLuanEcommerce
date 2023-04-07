import {
  Box,
  Button,
  Checkbox,
  HStack,
  Td,
  Text,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import StatusBadge from "./StatusBadge"
import { IUser } from "../../types/user"
import { IAddress } from "../../types/address"
import { Order as IOrder, OrderStatus, PaymentStatus } from "../../types/order"
import Price from "../Price"
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md"
import DetailOrder from "./DetailOrder"
import { OrderService } from "../../service/api/order"
import { useAppDispatch } from "../../app/hooks"
import { updateOrderStatus } from "../../features/order"
import { FcInfo } from "react-icons/fc"
type Props = {
  index: number
}

export default function Order({
  index,
  createdAt,
  customer,
  address,
  shipping,
  shippingCost,
  status,
  orderItems,
  _id,
  payment,
}: IOrder & Props) {
  const dispatch = useAppDispatch()
  const [expand, setExpand] = useState(false)
  const [expandBadge, setExpandBadge] = useState(false)
  const handleOrderClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    setExpand(!expand)
  }
  const handleStatusClick = (e: React.MouseEvent<HTMLTableDataCellElement>) => {
    e.stopPropagation()
    setExpandBadge(!expandBadge)
  }
  const changeOrderStatus = async (_id: number, status: OrderStatus) => {
    try {
      const response = await OrderService.changeOrderStatus(_id, status)
      dispatch(updateOrderStatus({ _id, status }))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <React.Fragment>
      <Tr onClick={handleOrderClick}>
        <Td>
          <HStack>
            {expand ? (
              <MdKeyboardArrowDown display={"inline-block"} />
            ) : (
              <MdKeyboardArrowRight display={"inline-block"} />
            )}
            <span>{index + 1}</span>
          </HStack>
        </Td>
        <Td w="5%">
          <Checkbox />
        </Td>
        <Td>
          <Text fontSize={"sm"}>
            {new Date(+createdAt).toLocaleDateString()}
          </Text>
          <Text fontSize={"xs"}>
            {new Date(+createdAt).toLocaleTimeString()}
          </Text>
        </Td>
        <Td>{customer.auth.username}</Td>
        <Td>
          {address.ward.name},{address.ward.district.name},
          {address.ward.district.province.name}
        </Td>
        <Td>
          <Tooltip label="Shipping">ashdfjkasdhk</Tooltip>
        </Td>
        <Td w="10%">{shippingCost}</Td>
        <Td
          w="5%"
          onClick={handleStatusClick}
          userSelect="none"
          position={"relative"}
        >
          <HStack spacing={1}>
            <StatusBadge status={status} />
            {(status === OrderStatus.PENDING ||
              status === OrderStatus.PROCESSING) && (
              <MdOutlineKeyboardArrowDown size="24px" />
            )}
            {payment.status === PaymentStatus.FAILED && (
              <Tooltip label="Payment failed">
                <Box>
                  <FcInfo />
                </Box>
              </Tooltip>
            )}
          </HStack>
          {(status === OrderStatus.PENDING ||
            status === OrderStatus.PROCESSING) &&
            expandBadge && (
              <VStack
                bg="white"
                position={"absolute"}
                shadow="lg"
                p="2"
                rounded="lg"
                zIndex={100}
              >
                {status === OrderStatus.PENDING &&
                  [OrderStatus.PROCESSING, OrderStatus.CANCELLED].map(
                    (status) => (
                      <Button
                        variant={"unstyled"}
                        onClick={() => changeOrderStatus(_id, status)}
                      >
                        <StatusBadge status={status} />
                      </Button>
                    )
                  )}
                {status === OrderStatus.PROCESSING &&
                  [OrderStatus.DELIVERING, OrderStatus.CANCELLED].map(
                    (status) => (
                      <Button
                        variant={"unstyled"}
                        onClick={() => changeOrderStatus(_id, status)}
                      >
                        <StatusBadge status={status} />
                      </Button>
                    )
                  )}
              </VStack>
            )}
        </Td>
        <Td>
          <Price
            price={orderItems.reduce(
              (prev, curr) => prev + curr.price * curr.quantity,
              0
            )}
          />
        </Td>
      </Tr>
      {expand && (
        <Tr>
          <DetailOrder orderItems={orderItems} />
        </Tr>
      )}
    </React.Fragment>
  )
}
