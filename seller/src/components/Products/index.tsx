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

import ProductHeader from "./ProductHeader"
import { IProduct } from "../../types/product"
import Product from "./Product"
import ModalProduct from "./Modal"

type Props = {}

export default function Products({}: Props) {
  const [modalName, setModalName] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [products, setProducts] = useState<Array<IProduct>>([
    {
      id: 2,
      name: "cai gi do",
      detail: {
        brand: "nike",
        long: "extra long",
      },
      category: {
        _id: 15,
        cratedAt: Date.now(),
        name_en: "T-shirt",
        name_vi: "ao thun",
        requireDetail: "brand/size/color",
      },
      meta: [
        {
          price: "1000",
          stock: "10",
          images: "img1",
        },
      ],
    },
    {
      id: 1,
      name: "Ao thun",
      detail: {
        brand: "nike",
        long: "extra long",
      },
      category: {
        _id: 15,
        cratedAt: Date.now(),
        name_en: "T-shirt",
        name_vi: "ao thun",
        requireDetail: "brand/size/color",
      },
      meta: [
        {
          price: "1000",
          stock: "10",
          images: "img1",
        },
      ],
    },
  ])
  // const products = Array<IProduct>(20).fill(product)
  const [productSelected, setProductSelected] = useState<IProduct>()

  const onEditProduct = (product: IProduct) => {
    setModalName("Edit Product")
    onOpen()
    setProductSelected(product)
  }
  const onSubmit = (product: IProduct) => {
    const valid: { [key: string]: boolean } = {}
    const { id, name, detail, category, meta } = product
    if (!name) {
      valid["name"] = false
    }
    meta.forEach((m) => {
      Object.keys(m).forEach((x) => {
        if (!m[x]) {
          valid["meta"] = false
        }
      })
    })
    if (Object.keys(valid).length > 0) {
      console.log("Invalid product")
      alert("Please fill all required fields")
      return
    } else {
      console.log("Valid product")
      console.log(product)
      if (product.id) {
        const index = products.findIndex((x) => x.id === product.id)
        const newProducts = [...products]
        newProducts[index] = product
        setProducts(newProducts)
      }
      onClose()
    }
  }
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
        product={productSelected}
        unSelectProduct={() => setProductSelected(undefined)}
      />
    </Box>
  )
}
