import { Button, Td, Text, Tr } from "@chakra-ui/react"
import React from "react"
import { BiEdit } from "react-icons/bi"
import { IProduct } from "../../types/product"
import { useAppSelector } from "../../app/hooks"

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
  variant,
  hasVariant,
  price,
  stock,
  sold,
}: Props) {
  const lang = useAppSelector((state) => state.homeSlice.lang)
  console.log(variant)
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>
        {hasVariant
          ? `
        ${Math.min(...variant.map((v) => v.price))}
        -
        ${Math.max(...variant.map((v) => v.price))}
        `
          : price}
      </Td>
      <Td>{category[`name_${lang}`]}</Td>
      <Td>
        {hasVariant
          ? variant.reduce((prev, current, i) => {
              return prev + current.stock
            }, 0)
          : stock}
      </Td>
      <Td>
        {hasVariant
          ? variant.reduce((prev, current, i) => {
              return prev + current.sold
            }, 0)
          : sold}
      </Td>
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
