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
import React, { useEffect, useState } from "react"
import { IconButton } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import { RiSubtractFill } from "react-icons/ri"

type Props = {
  meta: Array<{ [key: string]: string }>
  setMeta: (meta: Array<{ [key: string]: string }>) => void
}

export default function Meta({ meta, setMeta }: Props) {
  // const [keys, setKeys] = useState([
  //   {
  //     key: "price",
  //     default: true,
  //   },
  //   {
  //     key: "stock",
  //     default: true,
  //   },
  //   {
  //     key: "images",
  //     default: true,
  //   },
  // ])

  const [addField, setAddField] = useState<boolean>(false)
  const [newField, setNewField] = useState<string>("")
  const handleAddNewColumn = () => {
    if (Object.values(meta[0]).every((x) => x === "")) {
      if (newField === "") return
      for (let i = 0; i < keys.length; i++) {
        if (keys[i].key === newField) {
          setAddField(false)
          setNewField("")
          return
        }
      }
      setKeys([
        {
          key: newField.toLocaleLowerCase(),
          default: false,
        },
        ...keys,
      ])
      setAddField(false)
      setNewField("")
    } else {
      if (newField === "") return
      setMeta(
        meta.map((m) => ({
          ...m,
          [newField.toLocaleLowerCase()]: "",
        }))
      )
      setAddField(false)
      setNewField("")
    }
  }
  const [row, setRow] = useState(meta.length)
  const onAddNewRow = () => {
    const newRow: { [key: string]: string } = {}
    keys.forEach((key) => {
      newRow[key.key] = ""
    })
    setMeta([...meta, newRow])
    setRow(row + 1)
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
              {Object.values(meta[0]).every((v) => v === "")
                ? keys.map((key, index) =>
                    key.default ? (
                      <Th key={index} position={"sticky"} textAlign="center">
                        <FormControl isRequired>
                          <FormLabel
                            textAlign={"center"}
                            fontFamily={"heading"}
                            fontWeight="bold"
                            fontSize={"xs"}
                          >
                            {key.key}
                          </FormLabel>
                        </FormControl>
                      </Th>
                    ) : (
                      <Th key={index} position={"sticky"} textAlign="center">
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
                            {key.key}
                          </FormLabel>
                          <IconButton
                            onClick={() =>
                              setKeys(keys.filter((k) => k.key !== key.key))
                            }
                            size="xs"
                            variant={"ghost"}
                            aria-label="delete key"
                            icon={<RiSubtractFill size="12px" />}
                          />
                        </FormControl>
                      </Th>
                    )
                  )
                : Object.keys(meta[0]).map((key, index) => (
                    <Th key={index} position={"sticky"} textAlign="center">
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
                          {key}
                        </FormLabel>
                        {keys
                          .map((k) => {
                            if (k.key === key) {
                              return k.default
                            }
                            return false
                          })
                          .every((x) => x === false) && (
                          <IconButton
                            onClick={() =>
                              setMeta(
                                meta.map((m) => {
                                  delete m[key]
                                  return m
                                })
                              )
                            }
                            size="xs"
                            variant={"ghost"}
                            aria-label="delete key"
                            icon={<RiSubtractFill size="12px" />}
                          />
                        )}
                      </FormControl>
                    </Th>
                  ))}
              {
                <Th>
                  {Object.values(meta[0]).some((v) => v !== "")
                    ? Object.keys(meta[0]).length < 5 &&
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
                      ))
                    : keys.length < 5 &&
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
              }
            </Tr>
          </Thead>
          <Tbody maxH={"30px"}>
            {Array(row)
              .fill(0)
              .map((_, index) => (
                <Tr key={index}>
                  <Td>{index + 1}</Td>
                  {Object.values(meta[0]).every((v) => v === "")
                    ? keys.map((key, jndex) => (
                        <Td key={jndex}>
                          {meta[index][key.key] !== undefined && (
                            <Input
                              value={meta[index][key.key]}
                              onChange={(e) => {
                                const newMeta = [...meta]
                                if (!newMeta[index]) newMeta[index] = {}
                                newMeta[index][key.key] = e.target.value
                                setMeta(newMeta)
                              }}
                            />
                          )}
                        </Td>
                      ))
                    : Object.keys(meta[0]).map((key, jndex) => (
                        <Td key={jndex}>
                          {meta[index][key] !== undefined && (
                            <Input
                              value={meta[index][key]}
                              onChange={(e) => {
                                const newMeta = [...meta]
                                if (!newMeta[index]) newMeta[index] = {}
                                newMeta[index][key] = e.target.value
                                setMeta(newMeta)
                              }}
                            />
                          )}
                        </Td>
                      ))}
                  <Td>
                    <IconButton
                      onClick={() => onRemoveRow(index)}
                      aria-label="delete row"
                      size="xs"
                      icon={<RiSubtractFill size="12px" />}
                    />
                  </Td>
                </Tr>
              ))}

            <Tr>
              <Td
                colSpan={
                  Object.values(meta[0]).every((m) => m === "")
                    ? keys.length + 2
                    : Object.keys(meta[0]).length + 2
                }
                textAlign="center"
              >
                <IconButton
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
