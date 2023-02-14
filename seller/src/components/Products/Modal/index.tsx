import {
  Box,
  Button,
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
  Text,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { FaCheck, FaTimes } from "react-icons/fa"
import { categories } from "../../../sampleData"
import { ICategory } from "../../../types/category"
import { IProduct } from "../type"
type Props = {
  name: string
  isOpen: boolean
  onClose: () => void
  product?: IProduct
  onSubmit: (product: IProduct) => void
}

function AddNewDetailButton({
  onAddDetail,
}: {
  onAddDetail: ({ name, value }: { name: string; value: string }) => void
}) {
  const [detailName, setDetailName] = React.useState<string>("")
  const [detailValue, setDetailValue] = React.useState<string>("")
  const handleAddDetail = () => {
    onAddDetail({ name: detailName, value: detailValue })
    setDetailName("")
    setDetailValue("")
  }
  return (
    <Box flex="1">
      <Input
        fontSize={"sm"}
        size="sm"
        fontWeight="semibold"
        placeholder="Detail name"
        id="detail-name"
        variant={"unstyled"}
        value={detailName.charAt(0).toUpperCase() + detailName.slice(1)}
        onChange={(e) => setDetailName(e.target.value)}
        // on enter next input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            document.getElementById("detail-value")?.focus()
          }
        }}
      />
      <Box
        minHeight={"40px"}
        boxSizing="border-box"
        display={"flex"}
        rounded="lg"
        alignItems={"center"}
        border="1px dotted #eaeaee"
        pr=".2rem"
        _focusWithin={{
          boxShadow: "0 0 1px 1px #3182ce",
          borderColor: "#3182ce",
          borderStyle: "solid",
          zIndex: 1,
        }}
      >
        <Input
          flex="4"
          placeholder="Detail value"
          variant={"unstyled"}
          px="1rem"
          id="detail-value"
          value={detailValue}
          onChange={(e) => setDetailValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (detailName.length > 0) handleAddDetail()
              else {
                alert("You must enter detail name first")
                document.getElementById("detail-name")?.focus()
              }
            }
          }}
        />
        {detailValue.length > 0 && detailName.length > 0 && (
          <IconButton
            flex="1"
            size="sm"
            aria-label="add new detail"
            icon={<FaCheck />}
            onClick={handleAddDetail}
          />
        )}
      </Box>
    </Box>
  )
}

export default function ModalProduct({
  name,
  isOpen,
  onClose,
  onSubmit,
  product,
}: Props) {
  const [productName, setProductName] = React.useState<string>(
    product?.name || ""
  )
  const [productPrice, setProductPrice] = React.useState<number>(
    product?.price || 0
  )
  const [productCategory, setProductCategory] = React.useState<ICategory>(
    {} as ICategory
  )
  const [productDetail, setProductDetail] = React.useState<any>(
    {} as {
      [key: string]: string
    }
  )
  const [productStock, setProductStock] = React.useState<number>(
    product?.stock || 0
  )
  const [productDescription, setProductDescription] = React.useState<string>(
    product?.description || ""
  )
  const [requireDetail, setRequireDetail] = React.useState<string[]>([])
  useEffect(() => {
    const category = categories.find((c) => c._id === productCategory._id)
    setRequireDetail(category?.requireDetail || [])
  }, [productCategory])
  const [chunks, setChunks] = React.useState<Array<Array<string>>>([[]])
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
    setProductDetail({ ...productDetail, [name]: value })
    setRequireDetail((prev) => [...prev, name])
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent padding="1rem">
        <ModalHeader borderBottom={"1px solid #eaeaee"}>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDirection={"column"} gap="1rem">
          {/* row1 */}
          <Box display={"flex"} gap="1rem">
            <Box flex="1">
              <label htmlFor="productName">
                <Text fontSize={"sm"} fontWeight="bold">
                  Product Name
                </Text>
              </label>
              <Input
                id="productName"
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
              />
            </Box>
            <Box flex="1">
              <label htmlFor="category">
                <Text fontSize={"sm"} fontWeight="bold">
                  Category
                </Text>
              </label>
              <Select
                onChange={(e) => {
                  const category = categories.find(
                    (c) => c._id === +e.target.value
                  )
                  setProductCategory(category || ({} as ICategory))
                }}
              >
                <option value="0">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Box>
          </Box>
          {/* row2 */}
          <Box maxHeight="250px" overflowY={"auto"} position="relative">
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
              {
                // split requireDetail to array with every 2 element
                // then map to render 2 element in 1 row
                //   shoutout to https://stackoverflow.com/questions/8495687/split-array-into-chunks
                chunks.map((row, index) => (
                  <>
                    <Box display="flex" gap="1rem">
                      {row.map((detail, jndex) => (
                        <>
                          <Box flex="1">
                            <label htmlFor={detail}>
                              <Text fontSize={"sm"} fontWeight="semibold">
                                {
                                  // capitalize first letter
                                  // shoutout to https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
                                  detail.charAt(0).toUpperCase() +
                                    detail.slice(1)
                                }
                              </Text>
                            </label>
                            <Input
                              id={detail}
                              onChange={(e) => {
                                setProductDetail({
                                  ...productDetail,
                                  [detail]: e.target.value,
                                })
                              }}
                              value={productDetail[detail]}
                            />
                          </Box>
                          {jndex === 0 &&
                            detail ===
                              requireDetail[requireDetail.length - 1] && (
                              <AddNewDetailButton
                                onAddDetail={handleAddDetail}
                              />
                            )}
                        </>
                      ))}
                    </Box>
                    {row.length >= 2 && index === chunks.length - 1 && (
                      <AddNewDetailButton onAddDetail={handleAddDetail} />
                    )}
                  </>
                ))
              }
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter justifyContent={"flex-start"}>
          <Button colorScheme="facebook" mr={3} onClick={onClose}>
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
