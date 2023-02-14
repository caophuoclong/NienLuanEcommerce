import {
  Box,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { HiSearch } from "react-icons/hi"
import { AiOutlinePlus } from "react-icons/ai"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import ProductHeader from "./ProductHeader"
import { IProduct } from "./type"
import Product from "./Product"
import ModalProduct from "./Modal"

type Props = {}

export default function Products({}: Props) {
  const [modalName, setModalName] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const product: IProduct = {
    id: 1,
    name: "cai gi do",
    price: 1000,
    category: "Clothes",
    stock: 1000,
    description: "chao ban",
  }
  const products = Array<IProduct>(20).fill(product)
  const onEditProduct = (product: IProduct) => {
    setModalName("Edit Product")
    onOpen()
  }
  const onSubmit = (product: IProduct) => {}
  return (
    <Box h="100%">
      <ProductHeader
        onAddProduct={() => {
          setModalName("Add Product")
          onOpen()
        }}
      />
      <TableContainer overflowY={"auto"} h="92%">
        <Table>
          <Thead bgColor={"#f3f4f6"} position="sticky" top={0} zIndex="docked">
            <Tr>
              <Th width={"30%"}>Name</Th>
              <Th w="5%">Price</Th>
              <Th w="10%">Category</Th>
              <Th w="5%">Stock</Th>
              <Th w="20%"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((product, index) => (
              <Product
                {...product}
                key={index}
                onEditProduct={() => onEditProduct(product)}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalProduct
        name={modalName}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </Box>
  )
}
