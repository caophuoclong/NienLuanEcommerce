import React, { ChangeEvent, useEffect, useRef, useState } from "react"
import {
  Box,
  Button,
  Input,
  Select,
  Table,
  Text,
  IconButton,
} from "@chakra-ui/react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ChartData,
} from "chart.js"
import { Line } from "react-chartjs-2"
import faker from "@faker-js/faker"
import moment from "moment"
import { FaCheck, FaPlus } from "react-icons/fa"
import { IProduct } from "../../../types/product"
import { ICategory } from "../../../types/category"
import { useDebounce, useAppSelector } from "../../../app/hooks"
import { ProductService } from "../../../service/api/product"
import { CategoryService } from "../../../service/api/category"
type Props = {}
const monthLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "Septemper",
  "October",
  "November",
  "December",
]
const timeFrom = (X: number) => {
  var dates = []
  for (let I = 0; I < Math.abs(X); I++) {
    dates.push(
      moment(
        new Date(
          new Date().getTime() - (X >= 0 ? I : I - I - I) * 24 * 60 * 60 * 1000
        )
      ).format("DD/MM")
    )
  }
  return dates
}
const dayLabels = timeFrom(7)
const options = {
  reponsive: true,
  tension: 0.4,
  borderWidth: 5,
  plugins: {
    tooltip: {
      enabled: true,
      usePointStyle: true as const,
    },
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Quantity",
      },
    },
  },
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
)
export default function LineChart({}: Props) {
  const [showBy, setShowBy] = useState<"year" | "month" | "day">("day")
  const [line, setLine] = useState<ILine>({} as ILine)
  const [lineArray, setLineArray] = useState<Array<ILine>>([])

  const [lineInput, setLineInput] = useState("")
  const [searchResult, setSearchResult] = useState<
    {
      [key: string]: any
    }[]
  >([])
  const [searchBy, setSearchBy] = useState<"product" | "category">("product")
  const lang = useAppSelector((state) => state.homeSlice.lang)
  const onDone = () => {
    setLine({} as ILine)
    setLineArray([...lineArray, line])
  }

  const [data, setData] = useState<ChartData<"line">>({
    labels:
      (showBy === "day" && dayLabels.reverse()) ||
      (showBy === "month" && monthLabels) ||
      dayLabels,
    datasets: [],
  })
  useEffect(() => {
    console.log(
      (showBy === "day" && dayLabels.reverse()) ||
        (showBy === "month" && monthLabels) ||
        dayLabels
    )
    const newDataSets = lineArray.map((l) => ({
      data: (
        (showBy === "day" && dayLabels.reverse()) ||
        (showBy === "month" && monthLabels) ||
        []
      ).map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderColor: l.color,
      pointStyle: "circle" as const,
      pointBorderWidth: 0,
      pointRadius: 0,
    }))
    // {
    //     label: "",
    //     data: (
    //       (showBy === "day" && dayLabels.reverse()) ||
    //       (showBy === "month" && monthLabels) ||
    //       dayLabels
    //     ).map(() => Math.floor(Math.random() * 1000)),
    //     backgroundColor: "rgba(53, 162, 235, 0.5)",
    //     borderColor: "rgba(232,225,122)",
    //     pointStyle: "circle" as const,
    //     pointBorderWidth: 0,
    //     pointRadius: 0,
    //   },
    setData({
      ...data,
      labels:
        (showBy === "day" && dayLabels.reverse()) ||
        (showBy === "month" && monthLabels) ||
        dayLabels,
      datasets: newDataSets,
    })
  }, [lineArray, showBy])
  interface ILine {
    value?: IProduct
    color?: string
    done: boolean
  }

  const onAddLineClick = () => {
    const line = {
      value: undefined,
      color: "#faef34",
      done: false,
    }
    setLine(line)
  }
  const debounceLineInput = useDebounce(lineInput, 500)

  useEffect(() => {
    if (line.value && Object.keys(line.value).length > 0) {
      setSearchResult([])
      setLineInput("")
    }
  }, [line])
  useEffect(() => {
    ;(async () => {
      if (debounceLineInput.length > 0) {
        if (searchBy === "product") {
          const response = await ProductService.getProducts(debounceLineInput)
          setSearchResult(response)
        } else {
          // const response = await CategoryService.findCategoryByName(
          //   debounceLineInput,
          //   lang
          // )
          // setSearchResult(response)
        }
      }
    })()
  }, [debounceLineInput, searchBy])
  const onChangeLineInput = async (e: ChangeEvent<HTMLInputElement>) => {
    setLineInput(e.target.value)
  }
  const onChangeLineColorInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLine({
      ...line,
      color: e.target.value,
    })
  }
  return (
    <Box
      w="full"
      h="500px"
      bg="gray.100"
      rounded="lg"
      padding="1rem"
      position={"relative"}
    >
      <Text fontSize={"1.5rem"} position="absolute" top=".5rem" left="1rem">
        Sales
      </Text>
      <Box
        position={"absolute"}
        right=".5rem"
        top=".5rem"
        display={"flex"}
        alignItems={"center"}
        rounded="xl"
        border="1px"
        borderColor={"gray.100"}
        gap=".1rem"
        bg="white"
      >
        <Button
          onClick={() => setShowBy("month")}
          width="70px"
          variant={"unstyled"}
          size="sm"
          bg={showBy === "month" ? "blue.300" : ""}
          px=".5rem"
          py=".2rem"
          rounded={"none"}
          roundedLeft={"xl"}
        >
          Month
        </Button>
        <Button
          onClick={() => setShowBy("day")}
          width="70px"
          variant={"unstyled"}
          size="sm"
          bg={showBy === "day" ? "blue.300" : ""}
          px=".5rem"
          py=".2rem"
          rounded={"none"}
          roundedRight={"xl"}
        >
          Day
        </Button>
      </Box>
      <Box w="100%" h="full" my="2rem" display={"flex"}>
        <Line options={options} data={data} />
        <Box flex={1}>
          <Select
            variant={"filled"}
            placeholder="Select Type"
            bg="whiteAlpha.600"
            width="150px"
          >
            <option>Category</option>
            <option>Product</option>
          </Select>
          <Box
            height="70%"
            bg="whiteAlpha.600"
            w="full"
            my="1rem"
            rounded="lg"
            overflowY={"auto"}
            padding="1rem"
            display="flex"
            flexDirection={"column"}
            gap="1rem"
          >
            {lineArray.map((l, i) => (
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems="center"
                gap="1rem"
              >
                <Text>{i + 1}</Text>
                <Input value={l.value ? l.value.name : ""} disabled />
                <Input type="color" value={l.color ? l.color : ""} disabled />
              </Box>
            ))}
            {Object.keys(line).length > 0 ? (
              <Box
                display="flex"
                justifyContent={"center"}
                alignItems="center"
                gap="1rem"
                position={"relative"}
              >
                <Text> {lineArray.length + 1}</Text>
                <Input
                  value={
                    lineInput ? lineInput : line.value ? line.value.name : ""
                  }
                  onChange={onChangeLineInput}
                  onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                    e.target.value = ""
                  }}
                />
                <Input
                  type="color"
                  defaultValue={line.color}
                  onChange={onChangeLineColorInput}
                />
                <IconButton
                  aria-label="done add line"
                  onClick={onDone}
                  icon={<FaCheck size="24px" />}
                />
                {searchResult.length > 0 && (
                  <Box
                    position={"absolute"}
                    bg="white"
                    shadow={"xl"}
                    height="100px"
                    overflowY="auto"
                    width="full"
                    color="black"
                    top="50%"
                    transform={"translate(0, 50%)"}
                  >
                    {searchResult.map((r, i) => {
                      return (
                        <Text
                          onClick={() => {
                            setLine({
                              ...line,
                              value: r as IProduct,
                            })
                          }}
                          key={i}
                        >
                          {r.name}
                        </Text>
                      )
                    })}
                  </Box>
                )}
              </Box>
            ) : (
              ""
            )}
          </Box>
          <IconButton
            width="100%"
            onClick={onAddLineClick}
            bg="whiteAlpha.600"
            aria-label="add line"
            icon={<FaPlus size="24px" />}
            textAlign="center"
          />
        </Box>
      </Box>
    </Box>
  )
}
