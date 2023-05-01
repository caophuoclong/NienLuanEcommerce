import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { ICategory } from "../../../types/category"
import { IProduct, ProductStatus } from "../../../types/product"
import { useAppSelector, useDebounce } from "../../../app/hooks"
import { CategoryService } from "../../../service/api/category"
import RenderCategoryResult from "./Information/RenderCategoryResult"
import Detail from "./Detail"
import Meta from "./Meta"

import Description from "./Information/Description"
import WithoutVariant from "./Variant/WithoutVariant"
import WithVariant from "./Variant/WithVariant"
import { useAppDispatch } from "../../../app/hooks"
import {
  restoreProduct,
  setEmptyNewProduct,
  setProductStatus,
  updateProduct,
} from "../../../features/product"
import { emptyCategory } from "../../../types/category"
import Information from "./Information"
import { deleteProduct } from "../../../features/product"
import { ProductService } from "../../../service/api/product"
type Props = {
  name: string
  isOpen: boolean
  onSubmit: (product: IProduct) => void
}
export const defaulKeysHeader = [
  {
    key: "price",
    default: true,
  },
  {
    key: "stock",
    default: true,
  },
  {
    key: "images",
    default: true,
  },
]
enum Variant {
  WITH_VARIANT = "WITH_VARIANT",
  DEFAULT = "DEFAULT",
}
export default function ModalProduct({ name, isOpen, onSubmit }: Props) {
  const { isOpen: open, onOpen, onClose } = useDisclosure()
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => state.productSlice.product)
  console.log("🚀 ~ file: index.tsx:87 ~ ModalProduct ~ product:", product)
  const products = useAppSelector((state) => state.productSlice.products)
  const cancelRef = useRef(null)
  const handleSubmit = () => {
    onSubmit(product)
  }
  const onRemoveDelete = async () => {
    try {
      const response = await ProductService.deleteProduct(product._id)
      dispatch(setEmptyNewProduct())
      dispatch(deleteProduct(product._id))
      onClose()
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:97 ~ onRemoveDelete ~ error:", error)
    }
  }
  const handleRestore = async () => {
    try {
      const response = await ProductService.restoreProduct(product._id)
      dispatch(restoreProduct(product._id))
      const newProduct = products.find((p) => p._id === product._id)!
      console.log(
        "🚀 ~ file: index.tsx:107 ~ handleRestore ~ newProduct:",
        newProduct
      )
      dispatch(
        updateProduct({
          ...newProduct,
          deleted: false,
        })
      )
    } catch (error) {
      console.log("🚀 ~ file: index.tsx:102 ~ handleRestore ~ error:", error)
    }
  }

  return (
    <React.Fragment>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          dispatch(setProductStatus(ProductStatus.HIDE))
          dispatch(setEmptyNewProduct())
        }}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent padding="1rem">
          <ModalHeader borderBottom={"1px solid #eaeaee"}>{name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDirection={"column"} gap="1rem">
            <Tabs>
              <TabList>
                <Tab>Thông tin</Tab>
                <Tab>Chi tiết</Tab>
                <Tab>Biến thể</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Information />
                </TabPanel>
                <TabPanel>
                  <Detail />
                </TabPanel>
                <TabPanel>
                  <RadioGroup
                    value={product.hasVariant.toString()}
                    onChange={(e) => {
                      dispatch(
                        updateProduct({
                          hasVariant: e === "true",
                        })
                      )
                    }}
                  >
                    <Stack direction={"row"} spacing={"16px"}>
                      <Radio
                        // isDisabled={
                        //   product._id !== "" && product.hasVariant === true
                        // }
                        isDisabled={true}
                        value={"false"}
                      >
                        Mặc định
                      </Radio>
                      <Radio
                        isDisabled={
                          product._id !== "" && product.hasVariant === false
                        }
                        value={"true"}
                      >
                        Có biến thể
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <Box maxHeight="500px" overflowY="auto">
                    {product.hasVariant ? <WithVariant /> : <WithoutVariant />}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter justifyContent={"flex-start"}>
            <Button
              colorScheme="facebook"
              mr={3}
              isDisabled={product.deleted}
              onClick={handleSubmit}
            >
              {name.toLocaleLowerCase().includes("add") ? "Thêm" : "Lưu"}
            </Button>
            {product.deleted ? (
              <Button
                onClick={handleRestore}
                colorScheme="orange"
                color="white"
              >
                Phục hồi
              </Button>
            ) : (
              !name.toLocaleLowerCase().includes("add") && (
                <Button onClick={onOpen} variant="solid" colorScheme={"red"}>
                  <FaTimes size="24px" />
                  Xóa
                </Button>
              )
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={open}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Xóa sản phẩm?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Bạn có chắc là xóa sản phẩm</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Không
            </Button>
            <Button onClick={onRemoveDelete} colorScheme="red" ml={3}>
              Có
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </React.Fragment>
  )
}
