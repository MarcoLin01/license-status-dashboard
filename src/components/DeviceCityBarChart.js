import { Bar } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

export default function DeviceCityBarChart({ deviceCityData }) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'
  const gridColor = isLightMode ? '#e5e5e5' : 'white'

  const data = { ...deviceCityData }
  data.datasets[0].backgroundColor = [
    getColor('red', isLightMode),
    getColor('green', isLightMode),
    getColor('yellow', isLightMode),
    getColor('gray', isLightMode),
    getColor('blue', isLightMode),
  ]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Device',
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

  return (
    <div className="chart-container">
      <Bar redraw height={400} options={options} data={deviceCityData} />
    </div>
  )
}
