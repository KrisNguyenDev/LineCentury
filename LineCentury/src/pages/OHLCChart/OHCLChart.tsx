/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import * as Papa from 'papaparse'
import Chart from 'react-apexcharts'
import { ChartOHLC } from '../../types/chartOHLC.type'
import { ChartOHLCApex } from '../../types/chartOHLCApex.type'
import { DatePicker } from 'antd'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'

export default function OHCLChart() {
  const [data, setData] = useState<ChartOHLC[]>([])
  const [dataChart, setDataChart] = useState<ChartOHLCApex[]>([])
  const [startDate, setStartDate] = useState<string | null>(null)
  const [endDate, setEndDate] = useState<string | null>(null)

  const options: any = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'Line Century',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  }

  useEffect(() => {
    const dataFilter: ChartOHLCApex[] = data
      ?.filter((item) => {
        const date = new Date(item.Date)
        if (startDate && endDate) {
          const dateStart = new Date(startDate)
          const dateEnd = new Date(endDate)
          return date >= dateStart && date <= dateEnd
        } else {
          return true
        }
      })
      .map((item) => ({
        x: item.Date,
        y: [item.Open, item.High, item.Low, item.Close],
      }))

    setDataChart(dataFilter)
  }, [data, startDate, endDate])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setStartDate('')
    setEndDate('')
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results: any) => {
          setData(results.data)
        },
        error: (error) => {
          console.error('Error parsing CSV:', error)
        },
      })
    }
  }

  const handleChangeRangePicker = (_: any, dateStrings: string[]) => {
    setStartDate(dateStrings[0])
    setEndDate(dateStrings[1])
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <div className="mt-4">
        <RangePicker
          value={[startDate ? dayjs(startDate, dateFormat) : null, endDate ? dayjs(endDate, dateFormat) : null]}
          format={dateFormat}
          onChange={handleChangeRangePicker}
        />
      </div>
      <div className="mt-4">
        <Chart options={options} series={[{ data: dataChart }]} type="candlestick" height={350} />
      </div>
    </div>
  )
}
