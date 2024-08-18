import { Bar } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

export default function CameraModelBarChart({ cameraModelData }) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'
  const gridColor = isLightMode ? '#e5e5e5' : 'white'

  const data = { ...cameraModelData }
  const dataCount = cameraModelData.datasets[0].data.length
  data.datasets[0].backgroundColor = [getColor('blue', isLightMode)]

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Camera Model',
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
      <Bar
        redraw
        height={`${dataCount * 40}px`}
        options={options}
        data={data}
      />
    </div>
  )
}
