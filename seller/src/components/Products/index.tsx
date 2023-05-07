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
  useToast,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"

import ProductHeader from "./ProductHeader"
import { IProduct, ProductStatus } from "../../types/product"
import Product from "./Product"
import ModalProduct from "./Modal"
import { ProductService } from "../../service/api/product"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  FaSortAlphaDownAlt,
  FaSortAlphaUp,
  FaSortNumericDownAlt,
  FaSortNumericUp,
} from "react-icons/fa"
import home, {
  toggleSortCategory,
  toggleSortCrated,
  toggleSortName,
  toggleSortPrice,
  toggleSortSold,
  toggleSortStock,
  toggleSortUpdated,
} from "../../features/home"
import {
  addProductToProducts,
  createProduct,
  emptyListVariantDetail,
  getMyProduct,
  setEmptyNewProduct,
  setProductStatus,
  updateProduct,
  updateProductInProducts,
  updateVariantDetailInProducts,
} from "../../../src/features/product"

type Props = {}

export default function Products({}: Props) {
  const [modalName, setModalName] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const homeState = useAppSelector((state) => state.homeSlice)
  const productState = useAppSelector((state) => state.productSlice)
  const toast = useToast()
  const productStatus = productState.product.status
  const dispatch = useAppDispatch()
  useEffect(() => {
    const uwrawp = dispatch(getMyProduct())
  }, [])
  const onEditProduct = async (product: IProduct) => {
    const newProduct = (await ProductService.getProduct(product._id)).data
    dispatch(updateProduct(newProduct))
    dispatch(setProductStatus(ProductStatus.UPDATE))
  }
  const onSubmit = async (product: IProduct) => {
    switch (productStatus) {
      case ProductStatus.CREATE:
        const { variants } = product
        const copyVariants = await Promise.all(
          variants.map(async (va) => {
            return {
              ...va,
              options: await Promise.all(
                va.options.map(async (o) => {
                  if (o.image && typeof o.image === "string") {
                    const blob = await fetch(o.image).then((r) => r.blob())
                    const formData = new FormData()
                    formData.append(
                      "file",
                      blob,
                      `test.${blob.type.split("/")[1]}`
                    )
                    const name = await ProductService.uploadImage(formData)
                    return {
                      ...o,
                      image: name,
                    }
                  } else {
                    return o
                  }
                })
              ),
            }
          })
        )
        const unwrap = dispatch(
          createProduct({
            ...product,
            variants: copyVariants,
          })
        )
        toast({
          title: "Thêm sản phẩm thành công!",
          status: "success",
          position: "top-right",
        })
        onClose()
        break
      case ProductStatus.UPDATE:
        if (productState.updateVariantDetailList.length > 0) {
          const x = await ProductService.updateVariantDetailsProduct(
            productState.updateVariantDetailList
          )
          dispatch(updateVariantDetailInProducts(x))
        }
        // const res = await ProductService.editProduct(product)
        // console.log("🚀 ~ file: index.tsx:107 ~ onSubmit ~ res:", res)
        alert("Update success!")
        dispatch(setProductStatus(ProductStatus.HIDE))
        dispatch(emptyListVariantDetail())
        break
      default:
        return
    }
  }
  useEffect(() => {
    if (
      productStatus === ProductStatus.CREATE ||
      productStatus === ProductStatus.UPDATE
    ) {
      if (productStatus === ProductStatus.CREATE) {
        setModalName("Thêm sản phẩm")
      } else {
        setModalName("Câp nhật sản phẩm")
      }
      onOpen()
    } else {
      onClose()
      setModalName("")
    }
  }, [productStatus])
  return (
    <Box h="100%">
      <ProductHeader />
      <TableContainer overflowY={"auto"} h="92%">
        <Table>
          <Thead bgColor={"#f3f4f6"} position="sticky" top={0} zIndex="docked">
            <Tr>
              <Th width={"30%"}>
                Tên sản phẩm
                <IconButton
                  variant="ghost"
                  aria-label="sort name"
                  onClick={() => dispatch(toggleSortName())}
                  icon={
                    homeState.sort.name === "down" ? (
                      <FaSortAlphaDownAlt size="24px" />
                    ) : (
                      <FaSortAlphaUp size="24px" />
                    )
                  }
                />
              </Th>
              <Th w="5%">
                Đơn giá{" "}
                <IconButton
                  variant="ghost"
                  aria-label="sort price"
                  onClick={() => dispatch(toggleSortPrice())}
                  icon={
                    homeState.sort.price === "down" ? (
                      <FaSortNumericDownAlt size="24px" />
                    ) : (
                      <FaSortNumericUp size="24px" />
                    )
                  }
                />
              </Th>
              <Th w="10%">
                Phân loại{" "}
                <IconButton
                  variant="ghost"
                  aria-label="sort category"
                  onClick={() => dispatch(toggleSortCategory())}
                  icon={
                    homeState.sort.category === "down" ? (
                      <FaSortAlphaDownAlt size="24px" />
                    ) : (
                      <FaSortAlphaUp size="24px" />
                    )
                  }
                />
              </Th>
              <Th w="5%">
                Tồn kho{" "}
                <IconButton
                  variant="ghost"
                  aria-label="sort stock"
                  onClick={() => dispatch(toggleSortStock())}
                  icon={
                    homeState.sort.stock === "down" ? (
                      <FaSortNumericDownAlt size="24px" />
                    ) : (
                      <FaSortNumericUp size="24px" />
                    )
                  }
                />
              </Th>
              <Th w="5%">
                Đã bán
                <IconButton
                  variant="ghost"
                  aria-label="sort sold"
                  onClick={() => dispatch(toggleSortSold())}
                  icon={
                    homeState.sort.sold === "down" ? (
                      <FaSortNumericDownAlt size="24px" />
                    ) : (
                      <FaSortNumericUp size="24px" />
                    )
                  }
                />
              </Th>

              <Th w="5%">
                Ngày thêm
                <IconButton
                  variant="ghost"
                  aria-label="sort sold"
                  onClick={() => dispatch(toggleSortCrated())}
                  icon={
                    homeState.sort.created === "down" ? (
                      <FaSortNumericDownAlt size="24px" />
                    ) : (
                      <FaSortNumericUp size="24px" />
                    )
                  }
                />
              </Th>
              <Th w="5%">
                Ngày cập nhật
                <IconButton
                  variant="ghost"
                  aria-label="sort sold"
                  onClick={() => dispatch(toggleSortUpdated())}
                  icon={
                    homeState.sort.updated === "down" ? (
                      <FaSortNumericDownAlt size="24px" />
                    ) : (
                      <FaSortNumericUp size="24px" />
                    )
                  }
                />
              </Th>

              <Th w="15%"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {productState.products.map((product, index) => (
              <Product
                {...product}
                key={index}
                onEditProduct={async () => {
                  onEditProduct(product)
                }}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalProduct name={modalName} isOpen={isOpen} onSubmit={onSubmit} />
    </Box>
  )
}
