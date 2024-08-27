import { useRef, useEffect, useState } from 'react'
import { Bar, getElementAtEvent } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

export default function CameraModelBarChart({
  cameraModelData,
  handleChartClick,
}) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'
  const gridColor = isLightMode ? '#e5e5e5' : 'white'
  const cameraModelRef = useRef(null)
  const [chartData, setChartData] = useState(cameraModelData)

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

  function handleClick(event) {
    const chart = cameraModelRef.current
    const element = getElementAtEvent(cameraModelRef.current, event)
    if (element.length === 0) {
      return
    }
    const index = element[0].index
    const label = cameraModelData.labels[index]
    handleChartClick('cameraModel', index, label)
    chart.update()
  }

  useEffect(() => {
    const newData = { ...cameraModelData }
    setChartData({
      labels: newData.labels,
      datasets: [
        {
          data: newData.datasets[0].data,
          backgroundColor: [getColor('blue', isLightMode)],
        },
      ],
    })
  }, [cameraModelData, isLightMode])

  return (
    <div className="chart-container">
      <Bar
        ref={cameraModelRef}
        height={600}
        options={options}
        data={chartData}
        onClick={handleClick}
      />
    </div>
  )
}
