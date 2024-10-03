import { useState, useEffect, useCallback } from 'react'
import { parseChartData } from '../utils'
import OrgCityPieChart from './OrgCityPieChart.jsx'
import BitRatePieChart from './BitRatePieChart.jsx'
import CameraModelBarChart from './CameraModelBarChart.jsx'
import DeviceCityBarChart from './DeviceCityBarChart.jsx'
import NvrModelBarChart from './NvrModelBarChart.jsx'
import ChannelTypePieChart from './ChannelTypePieChart.jsx'
import {
  filterByOrgCity,
  filterByDeviceCity,
  filterByCameraModel,
  filterByNvrModel,
  filterByBitRate,
  filterByChannelType,
} from '../utils/filter'
import './Dashboard.css'

function Dashboard({ rawData, statistics: initialStatistics }) {
  const [activeElement, setActiveElement] = useState(null)
  const [statistics, setStatistics] = useState(initialStatistics)

  const filterKey = useCallback(
    (chartName, label) => {
      let result = null
      switch (chartName) {
        case 'orgCity':
          result = filterByOrgCity(rawData, label)
          return result
        case 'deviceCity':
          result = filterByDeviceCity(rawData, label)
          return result
        case 'cameraModel':
          result = filterByCameraModel(rawData, label)
          return result
        case 'nvrModel':
          result = filterByNvrModel(rawData, label)
          return result
        case 'bitRate':
          result = filterByBitRate(rawData, label)
          return result
        case 'channelType':
          result = filterByChannelType(rawData, label)
          return result
        default:
          return null
      }
    },
    [rawData],
  )

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
  }, [activeElement, rawData, initialStatistics, filterKey])

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
    channelTypeData,
  } = statistics

  const orgCityChart = createChartData(orgCityData)
  const deviceCityChart = createChartData(deviceCityData, 'Device Count')
  const cameraModelChart = createChartData(cameraModelData)
  const nvrModelChart = createChartData(nvrModelData, 'NVR Count')
  const bitRateTypeChart = createChartData(bitRateTypeData)
  const channelTypeChart = createChartData(channelTypeData)

  const { allocated, notAllocated } = licenseAllocatedData
  const total = allocated + notAllocated
  const licenseAllocateRate = Math.round((allocated / total) * 10000) / 100
  const totalOrganizations = orgCityChart.datasets[0].data.reduce(
    (acc, curr) => acc + curr.totalOrganizations,
    0,
  )

  const mostDevicesCountry = Object.entries(deviceCityData).reduce(
    (max, [country, info]) => {
      return info.totalDevices > (max.totalDevices || 0)
        ? { country, totalDevices: info.totalDevices }
        : max
    },
    {},
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

  const organizationAndDeviceItems = [
    { label: 'Total Organizations', value: totalOrganizations },
    { label: 'Most Devices Country', value: mostDevicesCountry.country },
  ]

  const cameraAndLicenseItems = [
    { label: 'Total Camera', value: cameraCount },
    { label: 'License Allocate Rate', value: licenseAllocateRate, unit: '%' },
  ]

  const nvrAndChannelItems = [
    { label: 'Total NVR', value: nvrCount },
    { label: 'Total Channel', value: channelCount },
  ]

  const InfoItem = ({ label, value, unit = '' }) => (
    <div className="info-item">
      <span className="info-item-title">{label}</span>
      <span className="text-2xl">
        {value}
        {unit}
      </span>
    </div>
  )

  return (
    <>
      <div className="dashboard max-w-screen-xxl">
        <div className="left">
          <div className="info-card">
            {organizationAndDeviceItems.map(({ label, value }) => (
              <InfoItem key={label} label={label} value={value} />
            ))}
          </div>
          <div className="card">
            {orgCityChart && (
              <OrgCityPieChart
                orgCityData={orgCityChart}
                handleChartClick={handleChartClick}
              />
            )}
          </div>
          <div className="card">
            {deviceCityChart && (
              <DeviceCityBarChart
                deviceCityData={deviceCityChart}
                handleChartClick={handleChartClick}
              />
            )}
          </div>
        </div>
        <div className="center">
          <div className="info-card">
            {cameraAndLicenseItems.map(({ label, value, unit }) => (
              <InfoItem key={label} label={label} value={value} unit={unit} />
            ))}
          </div>
          {bitRateTypeChart && (
            <div className="card">
              <BitRatePieChart
                bitRateData={bitRateTypeChart}
                handleChartClick={handleChartClick}
              />
            </div>
          )}
          {cameraModelChart && (
            <div className="card">
              <CameraModelBarChart
                cameraModelData={cameraModelChart}
                handleChartClick={handleChartClick}
              />
            </div>
          )}
        </div>
        <div className="right">
          <div className="info-card">
            {nvrAndChannelItems.map(({ label, value }) => (
              <InfoItem key={label} label={label} value={value} />
            ))}
          </div>
          {channelTypeChart && (
            <div className="card">
              <ChannelTypePieChart
                channelTypeData={channelTypeChart}
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
      </div>
    </>
  )
}

export default Dashboard
