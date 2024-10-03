import { useRef, useEffect, useState } from 'react'
import { Bar, getElementAtEvent } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '@/utils'
import { DATA_LABELS_OPTIONS, CHART_OPTIONS } from '@/constant/options'

export default function DeviceCityBarChart({
  deviceCityData,
  handleChartClick,
}) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'
  const gridColor = isLightMode ? '#e5e5e5' : 'white'
  const deviceCityRef = useRef(null)
  const [chartData, setChartData] = useState(deviceCityData)
  const countryCounts = sumDeviceCountsByCountry(deviceCityData)

  const options = {
    ...CHART_OPTIONS.options,
    plugins: {
      ...DATA_LABELS_OPTIONS,
      ...CHART_OPTIONS.plugins,
      legend: {
        position: 'bottom',
        display: true,
        labels: {
          color: fontColor,
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Country of Device',
        color: fontColor,
        font: { size: 16, weight: 'bold', lineHeight: 2 },
      },
      subtitle: {
        display: true,
        text: `${Object.keys(countryCounts)
          .map((country) => `${country}: ${countryCounts[country]}`)
          .join('  ')}`,
        color: fontColor,
        font: { size: 14 },
        position: 'bottom',
      },
    },
    scales: {
      x: {
        ticks: {
          color: fontColor,
        },
        grid: {
          color: '',
        },
      },
      y: {
        ticks: {
          color: fontColor,
        },
        grid: {
          color: gridColor,
        },
      },
    },
  }

  function sumDeviceCountsByCountry(data) {
    const result = {}
    data.labels.forEach((label, index) => {
      const totalDevices = data.datasets[0].data[index].totalDevices
      result[label] = totalDevices
    })
    return result
  }

  function handleClick(event) {
    const element = getElementAtEvent(deviceCityRef.current, event)
    if (element.length === 0) {
      return
    }
    const { index } = element[0]
    const label = chartData.labels[index]
    handleChartClick('deviceCity', index, label)
  }

  useEffect(() => {
    if (deviceCityData.datasets[0].data.length === 0) {
      setChartData({
        labels: [],
        datasets: [],
      })
      return
    }
    if (
      deviceCityData &&
      deviceCityData.datasets &&
      deviceCityData.datasets[0].data
    ) {
      const newChartData = {
        labels: deviceCityData.labels,
        datasets: [
          {
            label: 'Camera',
            data: deviceCityData.datasets[0].data.map((item) => item.camera),
            backgroundColor: getColor('red', isLightMode),
          },
          {
            label: 'NVR',
            data: deviceCityData.datasets[0].data.map((item) => item.nvr),
            backgroundColor: getColor('green', isLightMode),
          },
          {
            label: 'NVR Channel',
            data: deviceCityData.datasets[0].data.map(
              (item) => item.nvrchannel,
            ),
            backgroundColor: getColor('blue', isLightMode),
          },
        ],
      }
      setChartData(newChartData)
    }
  }, [deviceCityData, isLightMode])

  return (
    <div className="chart-container">
      {chartData.datasets.length > 0 ? (
        <Bar
          ref={deviceCityRef}
          height={400}
          options={options}
          data={chartData}
          onClick={handleClick}
        />
      ) : (
        <div
          className={`text-center font-bold ${isLightMode ? 'text-gray-500' : 'text-white'}`}
        >
          Country of Device No Data
        </div>
      )}
    </div>
  )
}
