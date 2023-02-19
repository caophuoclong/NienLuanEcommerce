import {
  Box,
  Button,
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
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FaCheck, FaTimes, FaWindowMinimize } from "react-icons/fa"
import { categories } from "../../../sampleData"
import { ICategory } from "../../../types/category"
import { IProduct } from "../../../types/product"
import AddNewDetailButton from "./AddNewDetailButton"
import { useAppSelector, useDebounce } from "../../../app/hooks"
import { CategoryService } from "../../../service/api/category"
import RenderCategoryResult from "./RenderCategoryResult"
import { RiSubtractFill } from "react-icons/ri"
import Detail from "./Detail"
import Meta from "./Meta"
type Props = {
  name: string
  isOpen: boolean
  onClose: () => void
  product?: IProduct
  onSubmit: (product: IProduct) => void
  unSelectProduct: () => void
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
export default function ModalProduct({
  name,
  isOpen,
  onClose,
  onSubmit,
  product,
  unSelectProduct,
}: Props) {
  /**/
  const [productName, setProductName] = React.useState<string>("")
  const setDefaultMeta = () => {
    const newObj: {
      [key: string]: string
    } = {}
    defaulKeysHeader.map((key, value) => {
      newObj[key.key] = ""
    })
    setMeta([newObj])
  }
  const [meta, setMeta] = useState<
    Array<{
      [key: string]: string
    }>
  >([{}])
  useEffect(() => {
    setDefaultMeta()
  }, [])
  useEffect(() => {
    if (product) {
      setProductName(product.name)
      setSelectedCategory(product.category)
      setProductDetail(product.detail)
      setMeta(product.meta)
    }
  }, [product])
  const [productDetail, setProductDetail] = React.useState<{
    [key: string]: string
  }>(
    {} as {
      [key: string]: string
    }
  )
  const [category, setCategory] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [categoriesResult, setCategoriesResult] = useState<Array<ICategory>>([])
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    {} as ICategory
  )
  const lang = useAppSelector((state) => state.homeSLice.lang)
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

  // split requireDetail to array with every 2 element
  // then map to render 2 element in 1 row
  // shoutout to https://stackoverflow.com/questions/8495687/split-array-into-chunks
  const onAddProductDetail = (name: string, value: string) => {
    setProductDetail((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }
  const onSelectCategory = (category: ICategory) => {
    setSelectedCategory(category)
    setCategory("")
  }

  const handleSubmit = () => {
    onSubmit({
      ...product,
      name: productName,
      category: selectedCategory,
      detail: productDetail,
      meta: meta,
    })
    setProductName("")
    setProductDetail({} as { [key: string]: string })
    setCategory("")
    setSelectedCategory({} as ICategory)
    setDefaultMeta()
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setProductName("")
        setProductDetail({} as { [key: string]: string })
        setCategory("")
        setSelectedCategory({} as ICategory)
        setDefaultMeta()
        unSelectProduct()
        onClose()
      }}
      size="4xl"
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
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </FormControl>
            <FormControl flex="1" position={"relative"} isRequired>
              <FormLabel htmlFor="category" fontSize={"sm"} fontWeight="bold">
                Category
              </FormLabel>
              <Input
                value={
                  Object.keys(selectedCategory).length === 0
                    ? category
                    : selectedCategory[`name_${lang}`]
                }
                onChange={(e) => {
                  if (Object.keys(selectedCategory).length !== 0)
                    setSelectedCategory({} as ICategory)
                  setCategory(e.target.value)
                }}
              />
              {Object.keys(selectedCategory).length === 0 &&
                debounceSearchCategory && (
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
          <Detail
            selectedCategory={selectedCategory}
            onAddProductDetail={onAddProductDetail}
            productDetail={productDetail}
          />
          {/* Row 3 */}
          <Meta
            meta={meta}
            setMeta={(me: Array<{ [key: string]: string }>) => {
              // if (product && Object.values(me[0]).every((m) => m === "")) {
              //   return
              // } else {
              //   setMeta(me)
              // }
              setMeta(me)
            }}
          />
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
