import { Box, IconButton, Input } from "@chakra-ui/react"
import React, { ChangeEvent } from "react"
import { FaCheck } from "react-icons/fa"

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
        height={"32px"}
        fontWeight="semibold"
        placeholder="Tên"
        id="detail-name"
        variant={"unstyled"}
        value={detailName.charAt(0).toUpperCase() + detailName.slice(1)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDetailName(e.target.value)
        }
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
          placeholder="Giá trị"
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
export default AddNewDetailButton
