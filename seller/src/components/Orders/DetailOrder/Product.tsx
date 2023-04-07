import { Badge, Box, Td, Tr } from "@chakra-ui/react"
import React from "react"
import { OrderProductItem } from "../../../types/order"
import { parseUrl } from "../../../utils"
import Price from "../../Price"

type Props = {
  product: OrderProductItem
}

export default function Product({
  product: { product, quantity, price },
}: Props) {
  console.log(product.variants)
  const variant = Object.values(product.variants).find(
    (x) => x.image !== undefined && x.image !== null && x.image !== "null"
  )
  console.log(Object.values(product.variants))
  return (
    <Tr>
      <Td>
        {variant && variant.image && (
          <Box
            w="80px"
            h="80px"
            bgSize={"80px"}
            bgRepeat="no-repeat"
            bgPos={"20% 20%"}
            rounded="lg"
            shadow={"lg"}
            bgImage={parseUrl(variant.image)}
          ></Box>
        )}
      </Td>
      <Td>{product.name}</Td>
      <Td w="fit-content" gap="2">
        {Object.entries(product.variants).map((variant, index) => (
          <Badge
            colorScheme={"whatsapp"}
            key={index}
            _notFirst={{
              marginLeft: "5px",
            }}
          >
            {variant[0]}:{variant[1]["value"]}
          </Badge>
        ))}
      </Td>
      <Td>
        <Price price={price} />
      </Td>
      <Td>{quantity}</Td>
    </Tr>
  )
}
