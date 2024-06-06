import { useState } from 'react'
import * as Papa from 'papaparse'

export default function OHCLChart() {
  const [data, setData] = useState<object>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setData(results.data)
        },
        error: (error) => {
          console.error('Error parsing CSV:', error)
        },
      })
    }
  }

  console.log(data)
  return (
    <div className="max-w-7xl mx-auto p-4">
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />
    </div>
  )
}
