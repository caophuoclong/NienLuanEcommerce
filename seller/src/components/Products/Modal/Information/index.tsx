import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import {
  useAppDispatch,
  useAppSelector,
  useDebounce,
} from "../../../../app/hooks"
import { updateProduct } from "../../../../features/product"
import { CategoryService } from "../../../../service/api/category"
import { emptyCategory, ICategory } from "../../../../types/category"
import RenderCategoryResult from "./RenderCategoryResult"
import Description from "./Description"

type Props = {}

export default function Information({}: Props) {
  const product = useAppSelector((state) => state.productSlice.product)
  const dispatch = useAppDispatch()
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [categoriesResult, setCategoriesResult] = useState<Array<ICategory>>([])
  const [category, setCategory] = useState<string>("")

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
  return (
    <Box>
      <Box display={"flex"} gap="1rem">
        <FormControl flex="1" isRequired>
          <FormLabel htmlFor="productName" fontSize={"sm"} fontWeight="bold">
            Tên sản phẩm
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
            Phân loại
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
                  Không tìm thấy kết quả
                </Text>
              )}
            </Box>
          )}
        </FormControl>
      </Box>
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
    </Box>
  )
}
