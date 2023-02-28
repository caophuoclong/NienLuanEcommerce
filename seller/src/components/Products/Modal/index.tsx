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
import React, { useContext, useEffect, useReducer, useState } from "react"
import { FaCheck, FaTimes, FaWindowMinimize } from "react-icons/fa"
import { categories } from "../../../sampleData"
import { ICategory } from "../../../types/category"
import { IProduct, IProductMeta, IProductDetail } from "../../../types/product"
import AddNewDetailButton from "./AddNewDetailButton"
import { useAppSelector, useDebounce } from "../../../app/hooks"
import { CategoryService } from "../../../service/api/category"
import RenderCategoryResult from "./RenderCategoryResult"
import { RiSubtractFill } from "react-icons/ri"
import Detail from "./Detail"
import Meta from "./Meta"
import ProductContext from "../Context"
import {
  initial,
  reducer,
  setProductName,
  setProductDescription,
  setProductId,
  setProductMeta,
  setProductDetail,
  setProductCategory,
  makeDefault,
} from "../Reducer"
type Props = {
  name: string
  isOpen: boolean
  onClose: () => void
  product: IProduct
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
  const [state, dispatch] = useContext(ProductContext)
  /**/
  useEffect(() => {
    if (Object.keys(product).length > 0) {
      dispatch(setProductName(product.name))
      dispatch(setProductDescription(product.description))
      dispatch(setProductId(product._id))
      dispatch(setProductMeta(JSON.parse(JSON.stringify(product.meta))))
      dispatch(setProductDetail(JSON.parse(JSON.stringify(product.detail))))
      dispatch(setProductCategory(JSON.parse(JSON.stringify(product.category))))
    } else {
      setDefaultMeta()
    }
  }, [product])
  const setDefaultMeta = () => {
    const news: IProductMeta = {
      images: "",
      price: 0,
      sold: 0,
      stock: 0,
      attribute: [],
    }
    dispatch(setProductMeta([news]))
  }
  const [category, setCategory] = useState<string>("")
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [categoriesResult, setCategoriesResult] = useState<Array<ICategory>>([])
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
  // const onAddProductDetail = (name: string, value: string) => {
  //   setProductDetail((prev) => {
  //     return {
  //       ...prev,
  //       [name]: value,
  //     }
  //   })
  // }
  const onSelectCategory = (category: ICategory) => {
    dispatch(setProductCategory(category))
    setCategory("")
  }

  const handleSubmit = () => {
    onSubmit(state)
    // setProductName("")
    // setProductDetail({} as { [key: string]: string })
    // setCategory("")
    // setSelectedCategory({} as ICategory)
    // setDefaultMeta()
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setCategory("")
        dispatch(makeDefault(undefined))
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
                onChange={(e) => dispatch(setProductName(e.target.value))}
                value={state.name}
              />
            </FormControl>
            <FormControl flex="1" position={"relative"} isRequired>
              <FormLabel htmlFor="category" fontSize={"sm"} fontWeight="bold">
                Category
              </FormLabel>
              <Input
                value={
                  Object.keys(state.category).length === 0
                    ? category
                    : state.category[`name_${lang}`]
                }
                onChange={(e) => {
                  if (Object.keys(state.category).length !== 0)
                    dispatch(setProductCategory({} as ICategory))
                  setCategory(e.target.value)
                }}
              />
              {Object.keys(state.category).length === 0 &&
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
          <Detail />
          {/* Row 3 */}
          <Meta
            meta={state.meta}
            setMeta={(me: Array<IProductMeta>) => {
              dispatch(setProductMeta(me))
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
