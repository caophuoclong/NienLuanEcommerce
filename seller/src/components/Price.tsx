import { Text } from "@chakra-ui/react"
import React from "react"

type Props = {
  price: number
}

export default function Price({ price }: Props) {
  function addDotsToNumber(num: number) {
    let str = num.toString()
    str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return str
  }
  return <Text> {addDotsToNumber(price)}</Text>
}
