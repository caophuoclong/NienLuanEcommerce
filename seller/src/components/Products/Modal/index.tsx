import {
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
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { ICategory } from "../../../types/category"
import { IProduct } from "../../../types/product"
import { useAppSelector, useDebounce } from "../../../app/hooks"
import { CategoryService } from "../../../service/api/category"
import RenderCategoryResult from "./Information/RenderCategoryResult"
import Detail from "./Detail"
import Meta from "./Meta"

import Description from "./Information/Description"
import WithoutVariant from "./Variant/WithoutVariant"
import WithVariant from "./Variant/WithVariant"
import { useAppDispatch } from "../../../app/hooks"
import { setEmptyNewProduct, updateProduct } from "../../../features/product"
import { emptyCategory } from "../../../types/category"
import Information from "./Information"
type Props = {
  name: string
  isOpen: boolean
  onClose: () => void
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
export default function ModalProduct({
  name,
  isOpen,
  onClose,
  onSubmit,
}: Props) {
  const dispatch = useAppDispatch()
  const product = useAppSelector((state) => state.productSlice.product)
  const handleSubmit = () => {
    onSubmit(product)
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        dispatch(setEmptyNewProduct())
        onClose()
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
              <Tab>Information</Tab>
              <Tab>Detail</Tab>
              <Tab>Variant</Tab>
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
                    <Radio value={"false"}>Default</Radio>
                    <Radio value={"true"}>WithVariant</Radio>
                  </Stack>
                </RadioGroup>
                {/* <Meta
            meta={state.meta}
            setMeta={(me: Array<IProductMeta>) => {
              dispatch(setProductMeta(me))
            }}
          /> */}
                <Box maxHeight="500px" overflowY="auto">
                  {product.hasVariant ? <WithVariant /> : <WithoutVariant />}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter justifyContent={"flex-start"}>
          <Button colorScheme="facebook" mr={3} onClick={handleSubmit}>
            {name.toLocaleLowerCase().includes("add") ? "Add" : "Save"}
          </Button>
          {!name.toLocaleLowerCase().includes("add") && (
            <Button variant="solid" colorScheme={"red"}>
              <FaTimes size="24px" />
              Delete Product
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
