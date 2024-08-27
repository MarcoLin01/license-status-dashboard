import { useRef, useEffect, useState } from 'react'
import { Bar, getElementAtEvent } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Device Types by Org City',
        color: fontColor,
        font: { size: 16, weight: 'bold', lineHeight: 2 },
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
      <Bar
        ref={deviceCityRef}
        height={400}
        options={options}
        data={chartData}
        onClick={handleClick}
      />
    </div>
  )
}
