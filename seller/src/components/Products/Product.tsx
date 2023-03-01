import { Button, Td, Text, Tr } from "@chakra-ui/react"
import React from "react"
import { BiEdit } from "react-icons/bi"
import { IProduct } from "../../types/product"

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
  meta,
}: Props) {
  console.log()
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{`
        ${Math.min(...meta.map((m) => m.price))}
        -
        ${Math.max(...meta.map((m) => m.price))}
        `}</Td>
      <Td>{category.name_vi}</Td>
      <Td>
        {meta.reduce((prev, current, i) => {
          return prev + current.stock
        }, 0)}
      </Td>
      <Td>
        {meta.reduce((prev, current, i) => {
          return prev + current.sold
        }, 0)}
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
