import { Box, Button, IconButton, Input, Text } from "@chakra-ui/react"
import React, { ChangeEvent, useState } from "react"
import { FaPlus, FaTimes } from "react-icons/fa"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import { updateProduct } from "../../../../../features/product"

type Props = {}

export default function Variants({}: Props) {
  const [tmpOption, setTmpOption] = useState<string>("")
  const [isCollapseVariant, setIsCollapseVariant] = useState(false)
  const variants = useAppSelector(
    (state) => state.productSlice.product.variants
  )
  const dispatch = useAppDispatch()
  const handleAddVariant = () => {
    const variant = {
      type: "",
      options: [],
    }
    const newVariants = variants ? [...variants] : []
    newVariants.push(variant)
    dispatch(
      updateProduct({
        variants: newVariants,
      })
    )
  }
  return (
    <Box display={"flex"} my=".5rem" justifyContent={"start"}>
      <Button
        w="20%"
        display={"flex"}
        onClick={() => setIsCollapseVariant(!isCollapseVariant)}
        size="md"
        variant="unstyled"
        fontWeight={"bold"}
        justifyContent="end"
      >
        Variants{" "}
        {isCollapseVariant ? (
          <RiArrowDropUpLine size="24px" />
        ) : (
          <RiArrowDropDownLine size="24px" />
        )}
      </Button>
      {!isCollapseVariant && (
        <Box w="80%">
          {variants.map((variant, i) => (
            <Box
              key={i}
              px="2"
              py="1"
              my=".5rem"
              backgroundColor={"gray.100"}
              rounded="md"
              display={"flex"}
              flexDirection="column"
              gap="4"
              position={"relative"}
            >
              <IconButton
                aria-label="del variant"
                icon={<FaTimes size="16px" />}
                position="absolute"
                right="0"
                top="0"
                variant="ghost"
                onClick={() => {
                  const x = [...variants]
                  x.splice(i, 1)
                  dispatch(
                    updateProduct({
                      variants: x,
                    })
                  )
                }}
              />
              <Box display={"flex"} alignItems="center" gap="4">
                <Box w="15%">
                  <label htmlFor={`variantType${i}`}>Variant {i + 1}</label>
                </Box>
                <Box w="85%">
                  <Input
                    w="30%"
                    size="sm"
                    id={`variantType${i}`}
                    outline="none"
                    variant={"outline"}
                    value={variants[i].type}
                    onChange={(e) => {
                      const x = [...variants]
                      const xxx = {
                        ...x[i],
                        type: e.target.value.toLocaleLowerCase(),
                      }
                      x[i] = xxx

                      dispatch(
                        updateProduct({
                          variants: x,
                        })
                      )
                    }}
                  />
                </Box>
              </Box>
              <Box display={"flex"} gap="4" alignItems={"start"}>
                <Box w="15%">
                  <label>Options</label>
                </Box>
                <Box w="85%" display={"flex"} flexWrap="wrap" gap="2">
                  {variant.options.map((option, j) => (
                    <Input
                      w="30%"
                      size="sm"
                      key={j}
                      defaultValue={option.value}
                      onChange={(e) => {
                        const value = e.target.value
                        const copyVariants = [...variants]
                        copyVariants[i].options[j].value = value
                        dispatch(
                          updateProduct({
                            variants: copyVariants,
                          })
                        )
                      }}
                    />
                  ))}
                  <Input
                    w="30%"
                    size="sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && tmpOption.length > 0) {
                        const copyVariants = [...variants]
                        const newVariants = {
                          ...copyVariants[i],
                          options: [
                            ...copyVariants[i].options,
                            {
                              _id: -9999,
                              value: tmpOption.toLocaleLowerCase(),
                            },
                          ],
                        }
                        copyVariants[i] = newVariants
                        dispatch(
                          updateProduct({
                            variants: copyVariants,
                          })
                        )
                        setTmpOption("")
                      }
                    }}
                    placeholder="E.g: Green"
                    value={tmpOption}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTmpOption(e.target.value)
                    }
                  />
                </Box>
              </Box>
            </Box>
          ))}
          {variants.length < 2 && (
            <Box backgroundColor={"gray.200"} rounded="md" px="2" py="1">
              <Box display={"flex"} alignItems="center" gap="2">
                <Text>Vairant {variants.length + 1}</Text>
                <Box
                  border="1px"
                  display={"flex"}
                  alignItems="center"
                  px="8px"
                  py="2px"
                  color="blue.300"
                  borderStyle={"dashed"}
                  gap="2px"
                  rounded="sm"
                  cursor={"pointer"}
                  onClick={handleAddVariant}
                >
                  <FaPlus size="16px" />
                  AddVariant {variants.length + 1}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}
