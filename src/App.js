import { useState } from 'react'
import { handleFileUpload, parseChartData } from './utils'
import Dashboard from './Dashboard'
import Header from './Header'
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
import './App.css'

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  SubTitle,
)

function App() {
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
    <div className="app mt-5 w-full p-5">
      <Header />
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

export default App
