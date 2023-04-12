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
        setModalName("Create product")
      } else {
        setModalName("Update Product")
      }
      onOpen()
    } else {
      onClose()
      setModalName("")
    }
  }, [productStatus])
  // useEffect(() => {
  //   const sortType = homeState.sort.name
  //   const newProducts = [...products]
  //   newProducts.sort((a, b) => {
  //     if (sortType === "down") {
  //       if (a.name.charAt(0) < b.name.charAt(0)) {
  //         return -1
  //       } else {
  //         return 1
  //       }
  //     } else {
  //       if (a.name.charAt(0) < b.name.charAt(0)) {
  //         return 1
  //       } else {
  //         return -1
  //       }
  //     }
  //   })

  //   setProducts(newProducts)
  // }, [homeState.sort.name])
  // useEffect(() => {
  //   const sortType = homeState.sort.category
  //   const newProducts = [...products]
  //   newProducts.sort((a, b) => {
  //     if (sortType === "down") {
  //       if (homeState.lang === "en") {
  //         if (a.category.name_en.charAt(0) < b.category.name_en.charAt(0)) {
  //           return -1
  //         } else {
  //           return 1
  //         }
  //       } else {
  //         if (a.category.name_vi.charAt(0) < b.category.name_vi.charAt(0)) {
  //           return -1
  //         } else {
  //           return 1
  //         }
  //       }
  //     } else {
  //       if (homeState.lang === "en") {
  //         if (a.category.name_en.charAt(0) < b.category.name_en.charAt(0)) {
  //           return 1
  //         } else {
  //           return -1
  //         }
  //       } else {
  //         if (a.category.name_vi.charAt(0) < b.category.name_vi.charAt(0)) {
  //           return 1
  //         } else {
  //           return -1
  //         }
  //       }
  //     }
  //   })
  //   setProducts(newProducts)
  // }, [homeState.sort.category])
  // useEffect(() => {
  //   const sortType = homeState.sort.sold
  //   const newProducts = [...products]
  //   newProducts.sort((a, b) => {
  //     if (sortType === "down") {
  //       return (
  //         a.meta.reduce((prev, current, i) => {
  //           return current.sold + prev
  //         }, 0) -
  //         b.meta.reduce((prev, current, i) => {
  //           return current.sold + prev
  //         }, 0)
  //       )
  //     } else {
  //       return (
  //         b.meta.reduce((prev, current, i) => {
  //           return current.sold + prev
  //         }, 0) -
  //         a.meta.reduce((prev, current, i) => {
  //           return current.sold + prev
  //         }, 0)
  //       )
  //     }
  //   })

  //   setProducts(newProducts)
  // }, [homeState.sort.sold])
  // useEffect(() => {
  //   const sortType = homeState.sort.stock
  //   const newProducts = [...products]
  //   newProducts.sort((a, b) => {
  //     if (sortType === "down") {
  //       return (
  //         a.meta.reduce((prev, current, i) => {
  //           return current.stock + prev
  //         }, 0) -
  //         b.meta.reduce((prev, current, i) => {
  //           return current.stock + prev
  //         }, 0)
  //       )
  //     } else {
  //       return (
  //         b.meta.reduce((prev, current, i) => {
  //           return current.stock + prev
  //         }, 0) -
  //         a.meta.reduce((prev, current, i) => {
  //           return current.stock + prev
  //         }, 0)
  //       )
  //     }
  //   })

  //   setProducts(newProducts)
  // }, [homeState.sort.stock])
  // useEffect(() => {
  //   const sortType = homeState.sort.created
  //   const newProducts = [...products]
  //   newProducts.sort((a, b) => {
  //     if (sortType === "down") {
  //       return +a.createdAt - +b.createdAt
  //     } else {
  //       return +b.createdAt - +a.createdAt
  //     }
  //   })
  //   setProducts(newProducts)
  // }, [homeState.sort.created])
  // useEffect(() => {
  //   const sortType = homeState.sort.updated
  //   const newProducts = [...products]
  //   newProducts.sort((a, b) => {
  //     if (sortType === "down") {
  //       return +a.updatedAt - +b.updatedAt
  //     } else {
  //       return +b.updatedAt - +a.updatedAt
  //     }
  //   })
  //   setProducts(newProducts)
  // }, [homeState.sort.updated])
  // useEffect(() => {
  //   const s_o_r_t = homeState.sort
  //   let newProducts = [...products]
  //   newProducts.sort((a, b) => {
  //     if (s_o_r_t.name === "down") {
  //       if (a.name.charAt(0) < b.name.charAt(0)) {
  //         return 1
  //       } else {
  //         return -1
  //       }
  //     } else {
  //       if (a.name.charAt(0) < b.name.charAt(0)) {
  //         return -1
  //       } else {
  //         return 1
  //       }
  //     }
  //   })
  //   setProducts(newProducts)
  // }, [homeState.sort])

  return (
    <Box h="100%">
      <ProductHeader />
      <TableContainer overflowY={"auto"} h="92%">
        <Table>
          <Thead bgColor={"#f3f4f6"} position="sticky" top={0} zIndex="docked">
            <Tr>
              <Th width={"30%"}>
                Name
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
                Price{" "}
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
                Category{" "}
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
                Stock{" "}
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
                Sold
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
                Crated
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
                Updated
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
