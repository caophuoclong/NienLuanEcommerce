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
  Text,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { ICategory } from "../../../types/category"
import { IProduct } from "../../../types/product"
import { useAppSelector, useDebounce } from "../../../app/hooks"
import { CategoryService } from "../../../service/api/category"
import RenderCategoryResult from "./RenderCategoryResult"
import Detail from "./Detail"
import Meta from "./Meta"

import Description from "./Description"
import WithoutVariant from "./Variant/WithoutVariant"
import WithVariant from "./Variant/WithVariant"
import { useAppDispatch } from "../../../app/hooks"
import { setEmptyNewProduct, updateProduct } from "../../../features/product"
import { emptyCategory } from "../../../types/category"
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
  const [category, setCategory] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [categoriesResult, setCategoriesResult] = useState<Array<ICategory>>([])
  const lang = useAppSelector((state) => state.homeSlice.lang)
  const debounceSearchCategory = useDebounce(category, 500)
  useEffect(() => {
    ;(async () => {
      if (debounceSearchCategory) {
        setIsSearching(true)
        setTimeout(async () => {
          const response = await CategoryService.findCategoryByName(
            category,
            lang
          )
          setCategoriesResult(response)
          setIsSearching(false)
        }, 300)
      } else {
        setCategoriesResult([])
        setIsSearching(false)
      }
    })()
  }, [debounceSearchCategory])

  const onSelectCategory = (category: ICategory) => {
    dispatch(
      updateProduct({
        category,
      })
    )
    setCategory("")
  }

  const handleSubmit = () => {
    onSubmit(product)
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setCategory("")
        dispatch(setEmptyNewProduct())
        onClose()
      }}
      size="2xl"
    >
      <ModalOverlay />
      <ModalContent padding="1rem">
        <ModalHeader borderBottom={"1px solid #eaeaee"}>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDirection={"column"} gap="1rem">
          {/* row1 */}
          <Box display={"flex"} gap="1rem">
            <FormControl flex="1" isRequired>
              <FormLabel
                htmlFor="productName"
                fontSize={"sm"}
                fontWeight="bold"
              >
                Product Name
              </FormLabel>
              <Input
                id="productName"
                onChange={(e) =>
                  dispatch(
                    updateProduct({
                      name: e.target.value,
                    })
                  )
                }
                value={product.name}
              />
            </FormControl>
            <FormControl flex="1" position={"relative"} isRequired>
              <FormLabel htmlFor="category" fontSize={"sm"} fontWeight="bold">
                Category
              </FormLabel>
              <Input
                value={
                  product.category._id === -9999
                    ? category
                    : product.category[`name_${lang}`]
                }
                onChange={(e) => {
                  if (Object.keys(product.category).length !== 0)
                    dispatch(
                      updateProduct({
                        category: emptyCategory,
                      })
                    )
                  setCategory(e.target.value)
                }}
              />
              {product.category._id === -9999 && debounceSearchCategory && (
                <Box
                  position={"absolute"}
                  minW="300px"
                  minH={"100px"}
                  shadow="2xl"
                  bg="#aaaeee"
                  transform={"translateY(5%)"}
                  zIndex={"popover"}
                  rounded="lg"
                >
                  {isSearching && (
                    <Box
                      position={"absolute"}
                      top="50%"
                      left="50%"
                      transform={"translate(-50%, -50%)"}
                      display="flex"
                      flexDirection="column"
                      gap="1rem"
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                      />
                      <Text>Loading...</Text>
                    </Box>
                  )}
                  {categoriesResult.length > 0 ? (
                    <Box
                      h="200px"
                      overflowY={"auto"}
                      display="flex"
                      flexDirection={"column"}
                      p="1rem"
                    >
                      <RenderCategoryResult
                        categories={categoriesResult}
                        onSelectCategory={onSelectCategory}
                      />
                    </Box>
                  ) : isSearching ? null : (
                    <Text
                      position={"absolute"}
                      top="50%"
                      left="50%"
                      transform={"translate(-50%, -50%)"}
                    >
                      No result
                    </Text>
                  )}
                </Box>
              )}
            </FormControl>
          </Box>
          {/* row2 */}
          <Detail />
          <Description
            description={product.description}
            onChange={(str) =>
              dispatch(
                updateProduct({
                  description: str,
                })
              )
            }
          />

          {/* Row 3 */}

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
          <Box maxHeight={"250px"} overflowY="auto">
            {product.hasVariant ? <WithVariant /> : <WithoutVariant />}
          </Box>
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
