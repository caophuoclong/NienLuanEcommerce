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
import ProductContext from "./Context"
import { useReducer } from "react"
import { initial, reducer } from "./Reducer"
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

type Props = {}

export default function Products({}: Props) {
  const [modalName, setModalName] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const homeState = useAppSelector((state) => state.homeSLice)
  const appDispatch = useAppDispatch()
  const [state, dispatch] = useReducer(reducer, initial)
  const [productSelected, setProductSelected] = useState<IProduct>(
    {} as IProduct
  )
  const [productAction, setProductAction] = useState<
    "create" | "edit" | "none"
  >("none")
  // pare product meta
  const [products, setProducts] = useState<Array<IProduct>>([])
  useEffect(() => {
    ;(async () => {
      const newProdcuts = await ProductService.getMyProducts()
      setProducts(newProdcuts)
    })()
  }, [])
  const onEditProduct = async (product: IProduct) => {
    setModalName("Edit Product")
    setProductAction("edit")
    const { product: newProduct } = await ProductService.getProduct(product._id)
    onOpen()
    setProductSelected(newProduct)
    setProducts([
      ...products.filter((p) => p._id !== newProduct._id),
      newProduct,
    ])
  }
  const handleClose = () => {
    setModalName("")
    setProductAction("none")
    onClose()
  }
  const onSubmit = async (product: IProduct) => {
    switch (productAction) {
      case "create":
        const response = await ProductService.addProduct(product)
        setProducts([...products, response])
        alert("Add success!")
        break
      case "edit":
        const res = await ProductService.editProduct(product)
        setProducts([...products.filter((p) => p._id !== product._id), res])
        alert("Update success!")
        break
      default:
        return
    }
  }
  useEffect(() => {
    const sortType = homeState.sort.name
    const newProducts = [...products]
    newProducts.sort((a, b) => {
      if (sortType === "down") {
        if (a.name.charAt(0) < b.name.charAt(0)) {
          return -1
        } else {
          return 1
        }
      } else {
        if (a.name.charAt(0) < b.name.charAt(0)) {
          return 1
        } else {
          return -1
        }
      }
    })

    setProducts(newProducts)
  }, [homeState.sort.name])
  useEffect(() => {
    const sortType = homeState.sort.category
    const newProducts = [...products]
    newProducts.sort((a, b) => {
      if (sortType === "down") {
        if (homeState.lang === "en") {
          if (a.category.name_en.charAt(0) < b.category.name_en.charAt(0)) {
            return -1
          } else {
            return 1
          }
        } else {
          if (a.category.name_vi.charAt(0) < b.category.name_vi.charAt(0)) {
            return -1
          } else {
            return 1
          }
        }
      } else {
        if (homeState.lang === "en") {
          if (a.category.name_en.charAt(0) < b.category.name_en.charAt(0)) {
            return 1
          } else {
            return -1
          }
        } else {
          if (a.category.name_vi.charAt(0) < b.category.name_vi.charAt(0)) {
            return 1
          } else {
            return -1
          }
        }
      }
    })
    setProducts(newProducts)
  }, [homeState.sort.category])
  // useEffect(() => {
  //   const sortType = homeState.sort.price
  //   const newProducts = [...products]
  //   newProducts.sort((a, b) => {
  //     if (sortType === "down") {
  //       return -1
  //     } else {
  //       return 1
  //     }
  //   })

  //   setProducts(newProducts)
  // }, [homeState.sort.price])
  useEffect(() => {
    const sortType = homeState.sort.sold
    const newProducts = [...products]
    newProducts.sort((a, b) => {
      if (sortType === "down") {
        return (
          a.meta.reduce((prev, current, i) => {
            return current.sold + prev
          }, 0) -
          b.meta.reduce((prev, current, i) => {
            return current.sold + prev
          }, 0)
        )
      } else {
        return (
          b.meta.reduce((prev, current, i) => {
            return current.sold + prev
          }, 0) -
          a.meta.reduce((prev, current, i) => {
            return current.sold + prev
          }, 0)
        )
      }
    })

    setProducts(newProducts)
  }, [homeState.sort.sold])
  useEffect(() => {
    const sortType = homeState.sort.stock
    const newProducts = [...products]
    newProducts.sort((a, b) => {
      if (sortType === "down") {
        return (
          a.meta.reduce((prev, current, i) => {
            return current.stock + prev
          }, 0) -
          b.meta.reduce((prev, current, i) => {
            return current.stock + prev
          }, 0)
        )
      } else {
        return (
          b.meta.reduce((prev, current, i) => {
            return current.stock + prev
          }, 0) -
          a.meta.reduce((prev, current, i) => {
            return current.stock + prev
          }, 0)
        )
      }
    })

    setProducts(newProducts)
  }, [homeState.sort.stock])
  useEffect(() => {
    const sortType = homeState.sort.created
    const newProducts = [...products]
    newProducts.sort((a, b) => {
      if (sortType === "down") {
        return +a.createdAt - +b.createdAt
      } else {
        return +b.createdAt - +a.createdAt
      }
    })
    setProducts(newProducts)
  }, [homeState.sort.created])
  useEffect(() => {
    const sortType = homeState.sort.updated
    const newProducts = [...products]
    newProducts.sort((a, b) => {
      if (sortType === "down") {
        return +a.updatedAt - +b.updatedAt
      } else {
        return +b.updatedAt - +a.updatedAt
      }
    })
    setProducts(newProducts)
  }, [homeState.sort.updated])
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
      <ProductHeader
        onAddProduct={() => {
          setModalName("Add Product")
          setProductAction("create")
          onOpen()
        }}
      />
      <TableContainer overflowY={"auto"} h="92%">
        <Table>
          <Thead bgColor={"#f3f4f6"} position="sticky" top={0} zIndex="docked">
            <Tr>
              <Th width={"30%"}>
                Name
                <IconButton
                  variant="ghost"
                  aria-label="sort name"
                  onClick={() => appDispatch(toggleSortName())}
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
                  onClick={() => appDispatch(toggleSortPrice())}
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
                  onClick={() => appDispatch(toggleSortCategory())}
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
                  onClick={() => appDispatch(toggleSortStock())}
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
                  onClick={() => appDispatch(toggleSortSold())}
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
                  onClick={() => appDispatch(toggleSortCrated())}
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
                  onClick={() => appDispatch(toggleSortUpdated())}
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
            {products.map((product, index) => (
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
      <ProductContext.Provider value={[state, dispatch]}>
        <ModalProduct
          name={modalName}
          isOpen={isOpen}
          onClose={handleClose}
          onSubmit={onSubmit}
          product={productSelected}
          unSelectProduct={() => setProductSelected({} as IProduct)}
        />
      </ProductContext.Provider>
    </Box>
  )
}
