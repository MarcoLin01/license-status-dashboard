import { useState, useEffect } from 'react'
import { parseChartData } from './utils'
import OrgCityPieChart from './components/OrgCityPieChart'
import BitRatePieChart from './components/BitRatePieChart'
import CameraModelBarChart from './components/CameraModelBarChart'
import DeviceCityBarChart from './components/DeviceCityBarChart'
import NvrModelBarChart from './components/NvrModelBarChart'
import './Dashboard.css'

function Dashboard({ rawData, statistics: initialStatistics }) {
  const [activeElement, setActiveElement] = useState(null)
  const [statistics, setStatistics] = useState(initialStatistics)
  useEffect(() => {
    if (activeElement) {
      const filteredData = filterKey(
        activeElement.chartName,
        activeElement.label,
      )
      const newStatistics = parseChartData(filteredData)
      setStatistics(newStatistics)
    } else {
      setStatistics(initialStatistics)
    }
  }, [activeElement, rawData, initialStatistics])

  function filterKey(chartName, label) {
    let result = null
    switch (chartName) {
      case 'orgCity':
        result = filterByOrgCity(label)
        return result
      case 'deviceCity':
        result = filterByDeviceCity(label)
        return result
      case 'cameraModel':
        result = filterByCameraModel(label)
        return result
      case 'nvrModel':
        result = filterByNvrModel(label)
        return result
      case 'bitRate':
        result = filterByBitRate(label)
        return result
      default:
        return null
    }
  }

  function filterByOrgCity(label) {
    return rawData.filter((item) => item.organizationCity === label)
  }

  function filterByDeviceCity(label) {
    return rawData.filter((item) => item.organizationCity === label)
  }

  function filterByCameraModel(label) {
    return rawData.filter(
      (item) => item.type === 'camera' && item.model === label,
    )
  }

  function filterByNvrModel(label) {
    return rawData.filter((item) => item.type === 'nvr' && item.model === label)
  }

  function filterByBitRate(label) {
    return rawData.filter((item) => item.BitRateType === label)
  }

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
  } = statistics

  const orgCityChart = createChartData(orgCityData)
  const deviceCityChart = createChartData(deviceCityData, 'Device Count')
  const cameraModelChart = createChartData(cameraModelData)
  const nvrModelChart = createChartData(nvrModelData, 'NVR Count')
  const bitRateTypeChart = createChartData(bitRateTypeData)

  const { allocated, notAllocated } = licenseAllocatedData
  const total = allocated + notAllocated
  const licenseAllocateRate = Math.round((allocated / total) * 10000) / 100

  const infoItems = [
    { label: 'Total Camera', value: cameraCount },
    { label: 'License Allocate Rate', value: licenseAllocateRate, unit: '%' },
    { label: 'Total Channel', value: channelCount },
    { label: 'Total NVR', value: nvrCount },
  ]

  const InfoItem = ({ label, value, unit = '' }) => (
    <div className="dark:text-white">
      <span className="text-lg font-black uppercase text-gray-700 dark:text-gray-400">
        {label}:{' '}
      </span>
      <span className="text-2xl">
        {value}
        {unit}
      </span>
    </div>
  )

  function createChartData(data, label = '') {
    return {
      labels: Object.keys(data),
      datasets: [
        {
          label,
          data: Object.values(data),
        },
      ],
    }
  }

  function handleChartClick(chartName, elementIndex, label) {
    setActiveElement((prev) => {
      if (prev && prev.chartName === chartName && prev.label === label) {
        return null
      } else {
        return { chartName, elementIndex, label }
      }
    })
  }

  return (
    <>
      <div className="info-container grid max-w-2xl grid-cols-1 gap-4 py-4 sm:grid-cols-2">
        {infoItems.map(({ label, value, unit }) => (
          <InfoItem key={label} label={label} value={value} unit={unit} />
        ))}
      </div>
      <div
        className="dashboard max-w-screen-xxl mx-auto grid gap-4 py-5 sm:grid-cols-1 md:grid-cols-2
          xl:grid-cols-3"
      >
        <div className="left">
          {orgCityChart && (
            <div className="card">
              <OrgCityPieChart
                orgCityData={orgCityChart}
                handleChartClick={handleChartClick}
              />
            </div>
          )}
          {deviceCityChart && (
            <div className="card">
              <DeviceCityBarChart
                deviceCityData={deviceCityChart}
                handleChartClick={handleChartClick}
              />
            </div>
          )}
        </div>
        <div className="center">
          {bitRateTypeChart && (
            <div className="card">
              <BitRatePieChart
                bitRateData={bitRateTypeChart}
                handleChartClick={handleChartClick}
              />
            </div>
          )}
          {nvrModelChart && (
            <div className="card">
              <NvrModelBarChart
                nvrModelData={nvrModelChart}
                handleChartClick={handleChartClick}
              />
            </div>
          )}
        </div>
        <div className="right">
          {cameraModelChart && (
            <div className="card">
              <CameraModelBarChart
                cameraModelData={cameraModelChart}
                handleChartClick={handleChartClick}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
