import { Box, HStack, IconButton, Tooltip } from "@chakra-ui/react"
import React, { ChangeEvent, useEffect, useState } from "react"
import { FaPlus, FaTimes } from "react-icons/fa"
import { MyFile } from "../Image"
import sha1 from "js-sha1"
import { useAppSelector, useAppDispatch } from "../../../../../app/hooks"
import { updateProduct } from "../../../../../features/product"

type Props = {
  onPreview: (image: string) => void
}

export default function File({ onPreview }: Props) {
  const [file, setFile] = useState<File>()
  const product = useAppSelector((state) => state.productSlice.product)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (file) {
      const name = file.name
      const hasher = sha1.create()
      const newName = hasher.update(name).hex() as string
      const newFile = {
        name: newName,
        link: URL.createObjectURL(file),
        type: file.type,
        size: file.size,
      }
      const fileList = [...product.images.images]
      const isInclude = fileList.map((f) => f.name).includes(newName)
      if (!isInclude) {
        fileList.push(newFile)
        dispatch(
          updateProduct({
            images: {
              type: "file",
              images: fileList,
            },
          })
        )
        setFile(undefined)
      } else {
        // alert("Image exist")
      }
    }
  }, [file])
  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setFile(file)
      e.target.files = null
      //@ts-ignore
      e.target.value = null
    }
  }
  const onRemoveImage = (file: {
    link: string
    name?: string | undefined
    size?: number | undefined
    type?: string | undefined
  }) => {
    const newData = product.images.images.filter((f) => f.name !== file.name)
    URL.revokeObjectURL(file.link)
    dispatch(
      updateProduct({
        images: {
          type: "file",
          images: newData,
        },
      })
    )
  }
  return (
    <HStack overflowX={"auto"}>
      <input
        type="file"
        hidden
        id="choseImage"
        accept="image/png, image/jpeg"
        onChange={handleAddFile}
      />
      <Box
        width="50px"
        height="50px"
        rounded="md"
        border="1px"
        borderStyle={"dashed"}
        borderColor="blue.300"
        as="label"
        htmlFor="choseImage"
        cursor={"pointer"}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
        color={"blue.300"}
      >
        <FaPlus size="16px" />
      </Box>
      {product.images.images.map((data) => (
        <Tooltip label="View" key={data.name}>
          <Box
            cursor="pointer"
            position="relative"
            border="1px"
            borderStyle={"dotted"}
            borderColor="blue.300"
            w={"50px"}
            h="50px"
            rounded="md"
            bgSize={"contain"}
            bgRepeat="no-repeat"
            objectFit={"cover"}
            style={{
              backgroundImage: `url(${data.link})`,
            }}
            role="group"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              console.log(e.currentTarget.tagName)
              if (e.currentTarget.tagName === "DIV") onPreview(data.link)
            }}
          >
            <Tooltip label="Delete">
              <IconButton
                zIndex={100}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation()
                  if (e.currentTarget.tagName === "BUTTON") onRemoveImage(data)
                }}
                visibility={"hidden"}
                _groupHover={{
                  visibility: "visible",
                }}
                aria-label="delete image"
                display="flex"
                alignItems={"center"}
                justifyContent="center"
                size="xxs"
                icon={<FaTimes size="16px" />}
                variant={"unstyled"}
                position="absolute"
                right="0"
                top="0"
                // transform="translate(50%)"
              />
            </Tooltip>
          </Box>
        </Tooltip>
      ))}
    </HStack>
  )
}
