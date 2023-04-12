import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { FaStore } from "react-icons/fa"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks"
import {
  updateProduct,
  updateVariantDetailProduct,
} from "../../../../../features/product"
import { ProductService } from "../../../../../service/api/product"
import { ProductStatus } from "../../../../../types/product"
import { parseUrl } from "../../../../../utils"

type Props = {}

export default function VariantList({}: Props) {
  const [isCollapseVariantList, setIsCollapseVariantList] = useState(false)
  const product = useAppSelector((state) => state.productSlice.product)
  const [common, setCommond] = useState({
    price: 0,
    stock: 0,
  })
  const variants = product.variants
  const dispatch = useAppDispatch()
  const variantDetails = product.variantDetails
  const [image, setImage] = useState<{
    key: string
    data: File
  } | null>(null)
  useEffect(() => {
    if (variants.length < 1) {
      return
    }
    // isExist in database
    const isExist: Array<number> = []
    variants.forEach(({ type, options }) =>
      options.forEach((opt) => isExist.push(opt._id))
    )
    if (!isExist.every((i) => i !== undefined && i !== -1)) {
      const variantDetails: Array<any> = []
      if (variants.length == 1) {
        variants[0].options.forEach((opt) => {
          variantDetails.push({
            key: opt.value,
            stock: 0,
            price: 0,
          })
        })
      }
      if (variants.length === 2) {
        variants[0].options.forEach((opt) => {
          variants[1].options.forEach((opt2) => {
            const key = `${opt.value}_${opt2.value}`
            variantDetails.push({
              key,
              stock: 0,
              price: 0,
            })
          })
        })
      }
      dispatch(
        updateProduct({
          variantDetails,
        })
      )
    }
  }, [variants])
  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image.data)
      const key = image.key
      const copyVariants = [...variants]
      copyVariants[0] = {
        ...copyVariants[0],
        options: copyVariants[0].options.map((opt) => {
          if (opt.value === key) {
            return {
              ...opt,
              image: url,
            }
          } else {
            return opt
          }
        }),
      }
      dispatch(
        updateProduct({
          variants: copyVariants,
        })
      )
    }
  }, [image])

  const onApplyToAll = () => {
    // const {price, stock} = common;
    if (variantDetails.length > 0) {
      dispatch(
        updateProduct({
          variantDetails: variantDetails.map((x) => ({
            ...x,
            price: common.price,
            stock: common.stock,
          })),
        })
      )
    }
  }
  // useEffect(() => {
  //   console.log(variantDetails)
  // }, [variantDetails])
  return (
    <Box display={"flex"} my=".5rem" justifyContent={"start"}>
      <Button
        w="20%"
        display={"flex"}
        onClick={() => setIsCollapseVariantList(!isCollapseVariantList)}
        size="md"
        variant="unstyled"
        fontWeight={"bold"}
        justifyContent="end"
      >
        Variant list{" "}
        {isCollapseVariantList ? (
          <RiArrowDropUpLine size="24px" />
        ) : (
          <RiArrowDropDownLine size="24px" />
        )}
      </Button>
      {!isCollapseVariantList && (
        <Box>
          <Box w="80%" display="flex" justifyContent={"space-evenly"} gap="2">
            <InputGroup w="40%">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="$"
              />
              <Input
                disabled={product.status === ProductStatus.UPDATE}
                placeholder="EnterPrice"
                value={common.price}
                type="number"
                onChange={(e) =>
                  setCommond({
                    ...common,
                    price: +e.target.value,
                  })
                }
              />
            </InputGroup>
            <InputGroup w="40%">
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children={<FaStore />}
              />
              <Input
                disabled={product.status === ProductStatus.UPDATE}
                placeholder="EnterStock"
                type="number"
                value={common.stock}
                onChange={(e) =>
                  setCommond({
                    ...common,
                    stock: +e.target.value,
                  })
                }
              />
            </InputGroup>

            <Button
              isDisabled={product.status === ProductStatus.UPDATE}
              onClick={onApplyToAll}
              w="20%"
              size="md"
            >
              AppyToAll
            </Button>
          </Box>

          {/* Render list variant */}
          {variants.length > 0 ? (
            variants.length === 2 ? (
              variants[0].options.map((va, index) => (
                <Box key={index}>
                  <Text fontWeight={"bold"}>
                    {variants[0].type.charAt(0).toLocaleUpperCase() +
                      variants[0].type.slice(1)}
                    :{" "}
                    {va.value.charAt(0).toLocaleUpperCase() + va.value.slice(1)}
                  </Text>

                  <Table>
                    <Thead>
                      <Tr>
                        <Th>Image</Th>
                        <Th>{variants[1].type}</Th>
                        <Th>Price</Th>
                        <Th>Stock</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {variants[1].options.map((variant, index) => (
                        <Tr key={index}>
                          {index === 0 && (
                            <Td
                              rowSpan={variants[1].options.length}
                              paddingX=".25rem"
                            >
                              <Input
                                hidden
                                id={`addImage_${va.value}`}
                                type={"file"}
                                onChange={(e) => {
                                  if (e.target.files) {
                                    setImage({
                                      key: va.value,
                                      data: e.target.files[0],
                                    })
                                  }
                                }}
                              />
                              <Box
                                cursor="pointer"
                                htmlFor={`addImage_${va.value}`}
                                as="label"
                                height="100px"
                                w={"100px"}
                                backgroundSize="100px 100px"
                                borderWidth="1px"
                                borderColor={"black"}
                                borderStyle={"dashed"}
                                display="flex"
                                justifyContent={"center"}
                                alignItems="center"
                                fontSize={"14px"}
                                bgSize="cover"
                                bgRepeat={"no-repeat"}
                                style={{
                                  backgroundImage: `url(${parseUrl(va.image)})`,
                                }}
                              >
                                Add image
                              </Box>
                            </Td>
                          )}
                          <Td>{variant.value}</Td>
                          <Td>
                            <Input
                              type="number"
                              onChange={(e) => {
                                const value = e.target.value
                                dispatch(
                                  updateProduct({
                                    variantDetails: variantDetails.map((vd) => {
                                      if (
                                        vd.key ===
                                          `${va.value}_${variant.value}` ||
                                        vd.sku ===
                                          `${product._id}_${va._id}_${variant._id}`
                                      ) {
                                        if (
                                          product.status ===
                                          ProductStatus.UPDATE
                                        ) {
                                          dispatch(
                                            updateVariantDetailProduct({
                                              sku: vd.sku,
                                              stock: vd.stock,
                                              price: +value,
                                            })
                                          )
                                        }
                                        return {
                                          ...vd,
                                          price: +value,
                                        }
                                      } else {
                                        return vd
                                      }
                                    }),
                                  })
                                )
                              }}
                              value={
                                variantDetails.filter((vd) => {
                                  if (
                                    vd.key === `${va.value}_${variant.value}` ||
                                    vd.sku ===
                                      `${product._id}_${va._id}_${variant._id}`
                                  )
                                    return vd
                                })[0]?.price
                              }
                            />
                          </Td>
                          <Td>
                            <Input
                              type="number"
                              onChange={(e) => {
                                const value = e.target.value
                                dispatch(
                                  updateProduct({
                                    variantDetails: variantDetails.map((vd) => {
                                      if (
                                        vd.key ===
                                          `${va.value}_${variant.value}` ||
                                        vd.sku ===
                                          `${product._id}_${va._id}_${variant._id}`
                                      ) {
                                        if (
                                          product.status ===
                                          ProductStatus.UPDATE
                                        ) {
                                          dispatch(
                                            updateVariantDetailProduct({
                                              sku: vd.sku,
                                              price: vd.price,
                                              stock: +value,
                                            })
                                          )
                                        }
                                        return {
                                          ...vd,
                                          stock: +value,
                                        }
                                      } else {
                                        return vd
                                      }
                                    }),
                                  })
                                )
                              }}
                              value={
                                variantDetails.filter((vd) => {
                                  if (
                                    vd.key === `${va.value}_${variant.value}` ||
                                    vd.sku ===
                                      `${product._id}_${va._id}_${variant._id}`
                                  )
                                    return vd
                                })[0]?.stock
                              }
                            />
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              ))
            ) : (
              <Table>
                <Thead>
                  <Tr>
                    <Td>
                      {variants[0].type.charAt(0).toLocaleUpperCase() +
                        variants[0].type.slice(1)}
                    </Td>
                    <Td>Image</Td>
                    <Td>Price</Td>
                    <Td>Stock</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {variants[0].options.map((variant, index) => (
                    <Tr key={index}>
                      <Td>
                        {variant.value.charAt(0).toLocaleUpperCase() +
                          variant.value.slice(1)}
                      </Td>
                      <Td padding={".25rem"}>
                        <Box
                          height="100px"
                          borderWidth="1px"
                          borderColor={"black"}
                          borderStyle={"dashed"}
                          display="flex"
                          justifyContent={"center"}
                          alignItems="center"
                          fontSize={"14px"}
                        >
                          Add image
                        </Box>
                      </Td>
                      <Td>
                        <Input
                          onChange={(e) => {
                            const value = e.target.value
                            dispatch(
                              updateProduct({
                                variantDetails: variantDetails.map((vd) => {
                                  if (
                                    vd.key === `${variant.value}` ||
                                    vd.sku === `${product._id}_${variant._id}`
                                  ) {
                                    return {
                                      ...vd,
                                      price: +value,
                                    }
                                  } else {
                                    return vd
                                  }
                                }),
                              })
                            )
                          }}
                          value={
                            variantDetails.filter((vd) => {
                              if (
                                vd.key === `${variant.value}` ||
                                vd.sku === `${product._id}_${variant._id}`
                              )
                                return vd
                            })[0]?.price
                          }
                        />
                      </Td>
                      <Td>
                        <Input
                          onChange={(e) => {
                            const value = e.target.value
                            dispatch(
                              updateProduct({
                                variantDetails: variantDetails.map((vd) => {
                                  if (
                                    vd.key === `${variant.value}` ||
                                    vd.sku === `${product._id}_${variant._id}`
                                  ) {
                                    return {
                                      ...vd,
                                      price: +value,
                                    }
                                  } else {
                                    return vd
                                  }
                                }),
                              })
                            )
                          }}
                          value={
                            variantDetails.filter((vd) => {
                              if (
                                vd.key === `${variant.value}` ||
                                vd.sku === `${product._id}_${variant._id}`
                              )
                                return vd
                            })[0]?.stock
                          }
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )
          ) : (
            <Box></Box>
          )}
        </Box>
      )}
    </Box>
  )
}
