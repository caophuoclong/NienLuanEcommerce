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
import React, { useEffect, useState } from "react"

import ProductHeader from "./ProductHeader"
import { IProduct } from "../../types/product"
import Product from "./Product"
import ModalProduct from "./Modal"
import { ProductService } from "../../service/api/product"

type Props = {}

export default function Products({}: Props) {
  const [modalName, setModalName] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleClose = () => {}
  // pare product meta
  const [products, setProducts] = useState<Array<IProduct>>([])
  useEffect(() => {
    ;(async () => {
      const newProdcuts = await ProductService.getMyProducts()
      const xxx = newProdcuts.map((p, i) => {
        const newMeta: Array<{
          [key: string]: any
        }> = p.meta.map((m) => {
          const key1 = m["attribute_1"]
          const key2 = m["attribute_2"]
          const value1 = m["value_1"]
          const value2 = m["value_2"]
          delete m["attribute_1"]
          delete m["attribute_2"]
          delete m["value_1"]
          delete m["value_2"]
          delete m["_id"]
          delete m["sold"]
          return {
            ...m,
            [key1]: value1,
            [key2]: value2,
          }
        })
        const newDetail: Array<{ [key: string]: string }> = p.detail.map(
          (d) => {
            console.log(d)
          }
        )
        return {
          ...p,
          meta: newMeta.map((m) => {
            delete m["default"]
            return {
              ...m,
            }
          }),
        }
      })
      console.log(xxx)
      setProducts(xxx)
    })()
  }, [])
  // const products = Array<IProduct>(20).fill(product)
  const [productSelected, setProductSelected] = useState<IProduct>()

  const onEditProduct = (product: IProduct) => {
    setModalName("Edit Product")
    onOpen()
    setProductSelected(product)
  }
  const onSubmit = async (product: IProduct) => {
    const valid: { [key: string]: boolean } = {}
    const { _id, name, detail, category, meta } = product
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

      console.log("🚀 ~ file: index.tsx:102 ~ onSubmit ~ product", product)
      const response = await ProductService.addProduct(product)
      console.log("🚀 ~ file: index.tsx:103 ~ onSubmit ~ response", response)

      // if (product.id) {
      //   const index = products.findIndex((x) => x.id === product.id)
      //   const newProducts = [...products]
      //   newProducts[index] = product
      //   setProducts(newProducts)
      // }
      // onClose()
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
