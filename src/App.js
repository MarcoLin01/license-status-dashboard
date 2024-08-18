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
  const [orgCity, setOrgCity] = useState(null)
  const [deviceCity, setDeviceCity] = useState(null)
  const [cameraModel, setCameraModel] = useState(null)
  const [nvrModel, setNvrModel] = useState(null)
  const [bitRate, setBitRate] = useState(null)
  const [totalCamera, setTotalCamera] = useState(null)
  const [licenseAllocated, setLicenseAllocated] = useState(null)
  const [totalChannel, setTotalChannel] = useState(null)
  const [totalNvr, setTotalNvr] = useState(null)

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0]
      const data = await handleFileUpload(file)
      const chartStatistics = parseChartData(data)
      const {
        orgCityData,
        deviceCityData,
        cameraModelData,
        nvrModelData,
        bitRateTypeData,
        cameraCount,
        licenseAllocatedData,
        channelCount,
        nvrCount,
      } = chartStatistics

      const orgCityChart = createChartData(orgCityData)
      setOrgCity(orgCityChart)

      const deviceCityChart = createChartData(deviceCityData, 'Device Count')
      setDeviceCity(deviceCityChart)

      const cameraModelChart = createChartData(cameraModelData)
      setCameraModel(cameraModelChart)

      const nvrModelChart = createChartData(nvrModelData, 'NVR Count')
      setNvrModel(nvrModelChart)

      const bitRateTypeChart = createChartData(bitRateTypeData)
      setBitRate(bitRateTypeChart)

      setTotalCamera(cameraCount)
      setLicenseAllocated(licenseAllocatedData)
      setTotalChannel(channelCount)
      setTotalNvr(nvrCount)
    } catch (error) {
      console.error('Error processing file:', error)
    }
  }

  const createChartData = (data, label = '') => ({
    labels: Object.keys(data),
    datasets: [
      {
        label,
        data: Object.values(data),
      },
    ],
  })

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
      {orgCity && (
        <Dashboard
          orgCityData={orgCity}
          deviceCity={deviceCity}
          cameraModel={cameraModel}
          nvrModel={nvrModel}
          bitRate={bitRate}
          cameraCount={totalCamera}
          licenseAllocated={licenseAllocated}
          channelCount={totalChannel}
          nvrCount={totalNvr}
        />
      )}
    </div>
  )
}

export default App
