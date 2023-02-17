import { Box, IconButton, Input, Text } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { RiSubtractFill } from "react-icons/ri"
import { ICategory } from "../../../types/category"
import AddNewDetailButton from "./AddNewDetailButton"

type Props = {
  selectedCategory: ICategory
  productDetail: {
    [key: string]: string
  }
  onAddProductDetail: (name: string, value: string) => void
}

export default function Detail({
  selectedCategory,
  productDetail,
  onAddProductDetail,
}: Props) {
  const [requireDetail, setRequireDetail] = React.useState<string[]>([])
  const [chunks, setChunks] = useState<Array<Array<string>>>([[]])
  useEffect(() => {
    if (Object.keys(selectedCategory).length > 0) {
      const requireDetail = selectedCategory.requireDetail
      if (!requireDetail) return
      const requireDetailArray = requireDetail.split("/")
      setRequireDetail(requireDetailArray)
    } else {
      setRequireDetail([])
    }
  }, [selectedCategory])
  useEffect(() => {
    setChunks(
      requireDetail.reduce<string[][]>((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 2)
        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = [] as Array<string> // start a new chunk
        }
        resultArray[chunkIndex].push(item)
        return resultArray
      }, [])
    )
  }, [requireDetail])
  const handleAddDetail = ({
    name,
    value,
  }: {
    name: string
    value: string
  }) => {
    if (selectedCategory._id === undefined) {
      alert("Please select category first")
    } else {
      if (
        requireDetail
          .map((value) => value.toLocaleLowerCase())
          .includes(name.toLocaleLowerCase())
      ) {
        alert("This detail already exist")
        document.getElementById(name.toLocaleLowerCase())?.focus()
      } else {
        onAddProductDetail(name, value)
        setRequireDetail((prev) => [...prev, name])
      }
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
              {row.map((detail, jndex) => (
                <React.Fragment key={jndex}>
                  <Box flex="1" role="group">
                    <Box display={"flex"} alignItems="center">
                      <label htmlFor={detail.toLocaleLowerCase()}>
                        <Text fontSize={"sm"} fontWeight="semibold">
                          {
                            // capitalize first letter
                            // shoutout to https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
                            detail.charAt(0).toUpperCase() + detail.slice(1)
                          }
                        </Text>
                      </label>
                      <IconButton
                        onClick={() => {
                          if (
                            productDetail[detail] !== undefined &&
                            productDetail[detail] !== ""
                          ) {
                            const conf = window.confirm(
                              "Are you sure delelte this detail?"
                            )

                            conf &&
                              setRequireDetail((prev) =>
                                prev.filter((value) => value !== detail)
                              )
                          } else {
                            setRequireDetail((prev) =>
                              prev.filter((value) => value !== detail)
                            )
                          }
                        }}
                        _groupHover={{ visibility: "visible" }}
                        visibility={"hidden"}
                        ml="auto"
                        size="sm"
                        variant={"ghost"}
                        aria-label="remove detail"
                        icon={<RiSubtractFill size="24px" />}
                      />
                    </Box>
                    <Input
                      id={detail.toLocaleLowerCase()}
                      value={productDetail[detail] || ""}
                      onChange={(e) => {
                        onAddProductDetail(detail, e.target.value)
                      }}
                    />
                  </Box>
                  {jndex === 0 &&
                    detail === requireDetail[requireDetail.length - 1] && (
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
