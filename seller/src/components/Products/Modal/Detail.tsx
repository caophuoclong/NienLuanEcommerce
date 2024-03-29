import { Box, IconButton, Input, Text } from "@chakra-ui/react"
import React, { ChangeEvent, useEffect, useState } from "react"
import { RiSubtractFill } from "react-icons/ri"
import AddNewDetailButton from "./AddNewDetailButton"
import { IProductDetail, ProductStatus } from "../../../types/product"
import { CiUndo } from "react-icons/ci"
import { useAppSelector, useAppDispatch } from "../../..//app/hooks"
import { updateChange, updateProduct } from "../../..//features/product"

type Props = {}

export default function Detail({}: Props) {
  const [chunks, setChunks] = useState<Array<Array<IProductDetail>>>([[]])
  const { category, detail } = useAppSelector(
    (state) => state.productSlice.product
  )
  const dispatch = useAppDispatch()
  const productSlice = useAppSelector((state) => state.productSlice)
  const product = productSlice.product
  useEffect(() => {
    if (detail.length === 0) {
      if (Object.keys(category).length > 0) {
        const requireDetail = category.requireDetail
        if (!requireDetail) return
        const requireDetailArray = requireDetail.split("/")
        dispatch(
          updateProduct({
            detail: requireDetailArray.map((x) => ({
              key: x,
              value: "",
              deleted: false,
            })),
          })
        )
      } else {
      }
    }
  }, [category])
  useEffect(() => {
    setChunks(
      detail.reduce<IProductDetail[][]>((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 2)
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] as Array<IProductDetail> // start a new chunk
        }
        resultArray[chunkIndex].push(item)
        return resultArray
      }, [])
    )
  }, [detail])
  const handleAddDetail = ({
    name,
    value,
  }: {
    name: string
    value: string
  }) => {
    if (category._id === undefined) {
      alert("Please select category first")
    } else {
      const existDetail = [...detail]
      const isExistKey = existDetail.filter((d) => d.key === name)
      if (isExistKey.length === 0) {
        dispatch(
          updateProduct({
            detail: [
              ...existDetail,
              {
                key: name,
                value: value,
                deleted: false,
              },
            ],
          })
        )
      }
    }
  }
  const handleUpdateDetail = (
    newDetail: Partial<IProductDetail> & {
      key: string
    }
  ) => {
    const index = detail.findIndex((d) => d.key === newDetail.key)
    if (index !== -1) {
      const tmpDetail = [...detail]
      tmpDetail[index] = {
        ...tmpDetail[index],
        ...newDetail,
      }
      dispatch(
        updateProduct({
          detail: tmpDetail,
        })
      )
    }
  }
  const handleRemove = (d: IProductDetail) => {
    if (product.status === ProductStatus.UPDATE) {
      dispatch(
        updateChange({
          detail: [
            ...productSlice.update.detail,
            {
              ...d,
              deleted: true,
            },
          ],
        })
      )
    }
    handleUpdateDetail({
      key: d.key,
      deleted: true,
    })
  }
  const handleRestore = (d: IProductDetail) => {
    console.log(productSlice.update.detail)
    if (product.status === ProductStatus.UPDATE) {
      dispatch(
        updateChange({
          detail: productSlice.update.detail.filter(
            (x) => x._id !== d._id || (x._id === d._id && !x.deleted)
          ),
        })
      )
    }
    handleUpdateDetail({
      key: d.key,
      deleted: false,
    })
  }
  return (
    <Box maxHeight="200px" overflowY={"auto"} position="relative">
      <Text
        borderBottom={"1px solid black"}
        position="sticky"
        top="0"
        bg="white"
        zIndex="docked"
        fontWeight={"bold"}
        marginBottom="1rem"
      >
        Chi tiết
      </Text>
      <Box>
        {chunks.length === 0 && (
          <AddNewDetailButton onAddDetail={handleAddDetail} />
        )}
        {chunks.map((row, index) => (
          <React.Fragment key={index}>
            <Box display="flex" gap="1rem" alignItems={"center"}>
              {row.map((d, jndex) => (
                <React.Fragment key={jndex}>
                  <Box
                    flex="1"
                    role="group"
                    textColor={d.deleted ? "gray.300" : ""}
                  >
                    <Box display={"flex"} alignItems="center">
                      <label htmlFor={d.key.toLocaleLowerCase()}>
                        <Text fontSize={"sm"} fontWeight="semibold">
                          {
                            // capitalize first letter
                            // shoutout to https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
                            d.key.charAt(0).toUpperCase() + d.key.slice(1)
                          }
                        </Text>
                      </label>
                      {d.deleted ? (
                        <IconButton
                          onClick={() => handleRestore(d)}
                          aria-label="undo"
                          ml="auto"
                          size="sm"
                          variant={"ghost"}
                          icon={<CiUndo color="black" size="24px" />}
                        />
                      ) : (
                        <IconButton
                          onClick={() => handleRemove(d)}
                          _groupHover={{ visibility: "visible" }}
                          visibility={"hidden"}
                          ml="auto"
                          size="sm"
                          variant={"ghost"}
                          aria-label="remove detail"
                          icon={<RiSubtractFill size="24px" />}
                        />
                      )}
                    </Box>
                    <Input
                      disabled={d.deleted}
                      id={d.key.toLocaleLowerCase()}
                      value={
                        detail.find((x) => x.key === d.key)
                          ? detail.find((x) => x.key === d.key)!.value
                          : ""
                      }
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (product.status === ProductStatus.UPDATE) {
                          dispatch(
                            updateChange({
                              detail:
                                productSlice.update.detail.length === 0
                                  ? [
                                      {
                                        ...d,
                                        value: e.target.value,
                                      },
                                    ]
                                  : productSlice.update.detail.map((x) => {
                                      if (x.key === d.key && !x.deleted) {
                                        return {
                                          ...x,
                                          value: e.target.value,
                                        }
                                      }
                                      return x
                                    }),
                            })
                          )
                        }
                        handleUpdateDetail({
                          key: d.key,
                          value: e.target.value,
                        })
                      }}
                    />
                  </Box>
                  {jndex === 0 && row.length < 2 && (
                    <AddNewDetailButton onAddDetail={handleAddDetail} />
                  )}
                </React.Fragment>
              ))}
            </Box>
            {row.length >= 2 && index === chunks.length - 1 && (
              <AddNewDetailButton onAddDetail={handleAddDetail} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  )
}
