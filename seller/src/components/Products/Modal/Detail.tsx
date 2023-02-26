import { Box, IconButton, Input, Text } from "@chakra-ui/react"
import React, { useContext, useEffect, useState } from "react"
import { RiSubtractFill } from "react-icons/ri"
import { ICategory } from "../../../types/category"
import AddNewDetailButton from "./AddNewDetailButton"
import { IProductDetail } from "../../../types/product"
import product from "../../../features/product"
import ProductContext from "../Context"
import { setDeletedDetail, undeoDeletedDetail } from "../Reducer"
import { CiUndo } from "react-icons/ci"
import {
  addNewDetail,
  updateDetail,
  setProductDetail,
  setProductCategory,
} from "../Reducer"

type Props = {}

export default function Detail({}: Props) {
  const [chunks, setChunks] = useState<Array<Array<IProductDetail>>>([[]])
  const [{ detail, category }, dispatch] = useContext(ProductContext)
  useEffect(() => {
    if (detail.length === 0) {
      if (Object.keys(category).length > 0) {
        const requireDetail = category.requireDetail
        if (!requireDetail) return
        const requireDetailArray = requireDetail.split("/")
        dispatch(
          setProductDetail(
            requireDetailArray.map((x) => ({
              key: x,
              value: "",
            }))
          )
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
      dispatch(
        addNewDetail({
          key: name,
          value: value,
        })
      )
    }
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
        Details
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
                          onClick={() => dispatch(undeoDeletedDetail(d.key))}
                          aria-label="undo"
                          ml="auto"
                          size="sm"
                          variant={"ghost"}
                          icon={<CiUndo color="black" size="24px" />}
                        />
                      ) : (
                        <IconButton
                          onClick={() => {
                            dispatch(setDeletedDetail(d.key))
                          }}
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
                      onChange={(e) => {
                        dispatch(
                          updateDetail({
                            _id: d._id,
                            key: d.key,
                            value: e.target.value,
                          })
                        )
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
