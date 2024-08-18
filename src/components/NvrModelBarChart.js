import { Bar } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

export default function NvrModelBarChart({ nvrModelData }) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'
  const gridColor = isLightMode ? '#e5e5e5' : 'white'

  const data = { ...nvrModelData }
  data.datasets[0].backgroundColor = [
    getColor('yellow', isLightMode),
    getColor('blue', isLightMode),
    getColor('red', isLightMode),
    getColor('green', isLightMode),
    getColor('gray', isLightMode),
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
        text: 'NVR Model',
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
          color: gridColor,
        },
      },
      y: {
        ticks: {
          color: fontColor,
        },
        grid: {
          color: '',
        },
      },
    },
  }

  return (
    <div className="chart-container">
      <Bar redraw height={400} options={options} data={data} />
    </div>
  )
}
