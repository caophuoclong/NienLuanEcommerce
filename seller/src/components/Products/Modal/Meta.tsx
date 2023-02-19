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
import { defaulKeysHeader } from "./index"

type Props = {
  meta: Array<{ [key: string]: string }>
  setMeta: (meta: Array<{ [key: string]: string }>) => void
}

export default function Meta({ meta, setMeta }: Props) {
  const [addField, setAddField] = useState<boolean>(false)
  const [newField, setNewField] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [stock, setStock] = useState<number>(0)
  const [images, setImages] = useState<string>("")

  const [row, setRow] = useState(meta.length)
  const handleAddNewColumn = () => {
    // if exist field in meta
    if (Object.keys(meta[0]).includes(newField.toLocaleLowerCase())) {
      setAddField(false)
      setNewField("")
      alert("Field existed")
      return
    }
    const newMeta = meta.map((m) => ({
      ...m,
      [newField.toLocaleLowerCase()]: "",
    }))
    setMeta(newMeta)
    setAddField(false)
    setNewField("")
  }
  const onDeleteColumn = (key: string) => {
    const newMeta = meta.map((m) => {
      delete m[key]
      return m
    })
    setMeta(newMeta)
  }
  const onAddNewRow = () => {
    const newRow: { [key: string]: string } = {}
    Object.keys(meta[0]).forEach((key) => {
      newRow[key] = ""
    })
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
              {Object.keys(meta[0]).map((k, index) =>
                k.toLocaleLowerCase() === "default" ? null : (
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
                        {k}
                      </FormLabel>
                      {!defaulKeysHeader
                        .map((k) => k.default && k.key)
                        .includes(k) && (
                        <IconButton
                          onClick={() => onDeleteColumn(k)}
                          size="xs"
                          variant={"ghost"}
                          aria-label="delete key"
                          icon={<RiSubtractFill size="12px" />}
                        />
                      )}
                    </FormControl>
                  </Th>
                )
              )}
              <Th>
                {Object.keys(meta[0]).length < 5 &&
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
            {meta.map((value, i) => (
              <Tr key={i}>
                <Td>{i + 1}</Td>
                {Object.keys(value).map((key, jndex) => (
                  <Td key={jndex}>
                    <Input
                      value={value[key]}
                      onChange={(e) => {
                        const newMeta = [...meta]
                        newMeta[i][key] = e.target.value
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
            ))}

            <Tr>
              <Td textAlign="center" colSpan={Object.keys(meta[0]).length + 2}>
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
