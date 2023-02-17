import { Button, Td, Text, Tr } from "@chakra-ui/react"
import React from "react"
import { BiEdit } from "react-icons/bi"
import { IProduct } from "../../types/product"

type Props = IProduct & {
  onEditProduct: () => void
}

export default function Product({ category, id, name, onEditProduct }: Props) {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{9000}</Td>
      <Td>{category.name_en}</Td>
      <Td>{12}</Td>
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
