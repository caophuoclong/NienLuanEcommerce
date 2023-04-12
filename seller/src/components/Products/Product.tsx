import { Button, Td, Text, Tr, Box } from "@chakra-ui/react"
import React from "react"
import { BiEdit } from "react-icons/bi"
import { IProduct } from "../../types/product"
import { useAppSelector } from "../../app/hooks"
import Price from "../Price"

type Props = IProduct & {
  onEditProduct: () => void
}

export default function Product({
  category,
  _id,
  name,
  onEditProduct,
  createdAt,
  updatedAt,
  hasVariant,
  price,
  stock,
  sold,
  variantDetails,
}: Props) {
  const lang = useAppSelector((state) => state.homeSlice.lang)
  const prices = variantDetails.map((v) => v.price)
  const stocks = variantDetails.map((v) => v.stock)
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>
        {hasVariant ? (
          <Box display={"flex"} gap="2">
            <Price price={Math.min(...prices)} />
            <Text>-</Text>
            <Price price={Math.max(...prices)} />
          </Box>
        ) : (
          <Price price={price} />
        )}
      </Td>
      <Td>{category[`name_${lang}`]}</Td>
      <Td>
        {hasVariant
          ? `
        ${Math.min(...stocks)} - ${Math.max(...stocks)}
        `
          : stock}
      </Td>
      <Td>{hasVariant ? 0 : sold}</Td>
      <Td
        title={
          new Date(+createdAt).toLocaleDateString("vi-VN") +
          " " +
          new Date(+createdAt).toLocaleTimeString("vi-VN")
        }
      >
        {new Date(+createdAt).toLocaleDateString("vi-VN")}
      </Td>
      <Td
        title={
          +updatedAt === 0
            ? "-"
            : new Date(+updatedAt).toLocaleDateString("vi-VN") +
              " " +
              new Date(+updatedAt).toLocaleTimeString("vi-VN")
        }
      >
        {+updatedAt === 0
          ? "-"
          : new Date(+updatedAt).toLocaleDateString("vi-VN")}
      </Td>
      <Td>
        <Button
          onClick={onEditProduct}
          display={"flex"}
          gap=".5rem"
          bg="blue.300"
          rounded="lg"
          p=".5rem"
        >
          <BiEdit />
          <Text>Edit item</Text>
        </Button>
      </Td>
    </Tr>
  )
}
