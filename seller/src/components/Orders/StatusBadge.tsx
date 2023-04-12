import { Badge, Box, Text } from "@chakra-ui/react"
import React from "react"
import { OrderStatus } from "../../types/order"

type Props = {
  status: OrderStatus
}

export default function StatusBadge({ status }: Props) {
  switch (status) {
    case OrderStatus.PENDING:
      return <Badge colorScheme={"yellow"}>{status}</Badge>
    case OrderStatus.PROCESSING:
      return <Badge colorScheme={"blue"}>{status}</Badge>
    case OrderStatus.DELIVERING:
      return <Badge colorScheme={"orange"}>{status}</Badge>
    case OrderStatus.DELIVERED:
      return <Badge colorScheme={"green"}>{status}</Badge>
    case OrderStatus.RETURNED:
      return <Badge colorScheme={"purple"}>{status}</Badge>
    case OrderStatus.REFUNDED:
      return <Badge colorScheme={"pink"}>{status}</Badge>
    case OrderStatus.CANCELLED:
      return <Badge colorScheme={"red"}>{status}</Badge>

    default:
      return <Badge>NOT FOUND</Badge>
  }
}
