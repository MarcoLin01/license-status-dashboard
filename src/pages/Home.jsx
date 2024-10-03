import { useState } from 'react'
import { handleFileUpload, parseChartData } from '../utils'
import Dashboard from '../components/Dashboard'
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  SubTitle,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  SubTitle,
  ChartDataLabels,
)

function Home() {
  const [rawData, setRawData] = useState(null)
  const [statistics, setStatistics] = useState(null)

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0]
      const data = await handleFileUpload(file)
      const chartStatistics = parseChartData(data)
      setRawData(data)
      setStatistics(chartStatistics)
    } catch (error) {
      console.error('Error processing file:', error)
    }
  }

  return (
    <div className="app">
      <div className="w-fit">
        <input
          id="file"
          className="file-input"
          type="file"
          onChange={handleFileChange}
        />
      </div>
      {statistics && <Dashboard rawData={rawData} statistics={statistics} />}
    </div>
  )
}

export default Home
