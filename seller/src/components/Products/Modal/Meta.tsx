import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import React, { ChangeEvent, useEffect, useState } from "react"
import { IconButton } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import { RiSubtractFill } from "react-icons/ri"
import { defaulKeysHeader } from "./index"
import { IProductMeta } from "../../../types/product"

type Props = {
  meta: Array<IProductMeta>
  setMeta: (meta: Array<IProductMeta>) => void
}

const generateObject = (obj: IProductMeta) => {
  // obj : {price: number, stock: number}
  const newMeta = JSON.parse(JSON.stringify(obj))
  const keys = Object.keys(obj) as (keyof typeof obj)[]
  // i would like keys is ["price", "stock"]
  keys.forEach((key) => {
    let xxx = newMeta[key]
    switch (typeof xxx) {
      case "number":
        newMeta[key] = 0
        return
      case "object":
        if (Array.isArray(xxx)) {
          xxx.forEach((x) => (x.value = ""))
        }
        break
      default:
        newMeta[key] = ""
        return
    }
  })
  return newMeta
}
export default function Meta({ meta, setMeta }: Props) {
  const [addField, setAddField] = useState<boolean>(false)
  const [newField, setNewField] = useState<string>("")
  const [row, setRow] = useState(meta.length)
  const handleAddNewColumn = () => {
    const newMeta = meta.map((m) => ({
      ...m,
      attribute: [
        ...m.attribute,
        {
          key: newField.toLocaleLowerCase(),
          value: "",
        },
      ],
    }))
    console.log(newMeta)
    setMeta(newMeta)
    setAddField(false)
    setNewField("")
  }
  const onDeleteColumn = (key: { key: string; value: any }) => {
    const newMeta = meta.map((m) => {
      const attribute = m.attribute.filter((x) => x.key !== key.key)
      m.attribute = attribute
      return m
    })
    setMeta(newMeta)
  }
  const onAddNewRow = () => {
    const newRow = generateObject(meta[0])
    console.log("🚀 ~ file: Meta.tsx:80 ~ onAddNewRow ~ newRow:", newRow)
    setMeta([...meta, newRow])
  }
  const onRemoveRow = (index: number) => {
    if (meta.length > 1) {
      const newMeta = meta.filter((m, i) => i !== index)
      setMeta(newMeta)
      setRow(row - 1)
    }
  }
  return (
    <Box position={"relative"}>
      <Text
        borderBottom={"1px solid black"}
        position="sticky"
        top="0"
        bg="white"
        zIndex="docked"
        fontWeight={"bold"}
        marginBottom="1rem"
      >
        Meta
      </Text>
      <TableContainer overflowY={"auto"} h="300px">
        <Table>
          <Thead position={"sticky"} top="0" zIndex={"docked"} bg="white">
            <Tr>
              <Th title="STT" w={"10%"} position={"sticky"}>
                STT
              </Th>
              {meta[0] &&
                Object.keys(meta[0]).map((k, index) =>
                  k.toLocaleLowerCase() === "default" ||
                  k.toLocaleLowerCase() === "sold" ||
                  k.toLocaleLowerCase() === "attribute" ||
                  k.toLocaleLowerCase() === "_id" ? null : (
                    <Th key={k} position={"sticky"} textAlign="center">
                      <FormControl
                        isRequired
                        display="flex"
                        alignItems={"center"}
                      >
                        <FormLabel
                          textAlign={"center"}
                          fontFamily={"heading"}
                          fontWeight="bold"
                          fontSize={"xs"}
                          m="0"
                        >
                          {k}
                        </FormLabel>
                      </FormControl>
                    </Th>
                  )
                )}
              {meta[0] &&
                meta[0].attribute.map((x, ii) => (
                  <Th key={ii}>
                    {x.key}
                    <IconButton
                      onClick={() => onDeleteColumn(x)}
                      size="xs"
                      mx={1}
                      variant="ghost"
                      aria-label="delete column"
                      icon={<RiSubtractFill />}
                    />
                  </Th>
                ))}
              <Th>
                {meta[0] &&
                  meta[0].attribute.length < 1 &&
                  (addField ? (
                    <Input
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddNewColumn()
                        }
                      }}
                      display={"inline-block"}
                      value={
                        newField.charAt(0).toUpperCase() + newField.slice(1)
                      }
                      onChange={(e) => setNewField(e.target.value)}
                      width="100px"
                    />
                  ) : (
                    <IconButton
                      onClick={() => setAddField(true)}
                      size="sm"
                      title="Add field"
                      aria-label="add feild"
                      icon={<FaPlus size="18px" />}
                    />
                  ))}
              </Th>
            </Tr>
          </Thead>
          <Tbody maxH={"30px"}>
            {meta.map(
              (value, i) =>
                Object.keys(value).length > 0 && (
                  <Tr key={i} user-data-id={value._id}>
                    <Td>{i + 1}</Td>
                    {Object.keys(value)
                      .filter(
                        (k) =>
                          k.toLocaleLowerCase() !== "default" &&
                          k.toLocaleLowerCase() !== "sold" &&
                          k.toLocaleLowerCase() !== "attribute" &&
                          k.toLocaleLowerCase() !== "_id"
                      )
                      .map((key, jndex) => (
                        <Td key={jndex}>
                          <Input
                            value={
                              meta[i][
                                key as keyof Omit<IProductMeta, "attribute">
                              ]
                            }
                            onChange={(e) => {
                              const newMeta = [...meta]
                              console.log(key)
                              if (key === "images") {
                                newMeta[i].images = e.target.value
                              }
                              if (key === "price") {
                                newMeta[i].price = +e.target.value
                              }
                              if (key === "stock") {
                                newMeta[i].stock = +e.target.value
                              }
                              setMeta(newMeta)
                            }}
                          />
                        </Td>
                      ))}
                    {value.attribute.map((v, ii) => (
                      <Td key={ii}>
                        <Input
                          value={v.value}
                          onChange={({
                            target: { value: value1 },
                          }: ChangeEvent<HTMLInputElement>) => {
                            const newMeta = JSON.parse(JSON.stringify(meta))
                            value.attribute[ii].value = value1
                            newMeta[i].attribute = value.attribute
                            setMeta(newMeta)
                          }}
                        />
                      </Td>
                    ))}
                    <Td>
                      <IconButton
                        onClick={() => onRemoveRow(i)}
                        aria-label="delete row"
                        size="xs"
                        icon={<RiSubtractFill size="12px" />}
                      />
                    </Td>
                  </Tr>
                )
            )}

            <Tr>
              <Td
                textAlign="center"
                colSpan={
                  meta[0]
                    ? Object.keys(meta[0]).length + meta[0].attribute.length
                    : 0
                }
              >
                <IconButton
                  // add new row
                  onClick={onAddNewRow}
                  size="sm"
                  title="Add field"
                  aria-label="add feild"
                  icon={<FaPlus size="18px" />}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
