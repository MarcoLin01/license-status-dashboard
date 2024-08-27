import { useRef, useEffect, useState } from 'react'
import { Bar, getElementAtEvent } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

export default function NvrModelBarChart({ nvrModelData, handleChartClick }) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'
  const gridColor = isLightMode ? '#e5e5e5' : 'white'
  const nvrModelRef = useRef(null)
  const [clickColor, setClickColor] = useState(null)
  const [isClicked, setIsClicked] = useState(false)
  const [chartData, setChartData] = useState(nvrModelData)

  const originalBackgroundColor = [
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

  function handleClick(event) {
    const chart = nvrModelRef.current
    const element = getElementAtEvent(nvrModelRef.current, event)
    if (element.length === 0) {
      return
    }
    const index = element[0].index
    const color = chart.data.datasets[0].backgroundColor[index]
    const label = nvrModelData.labels[index]
    setClickColor(color)
    setIsClicked((prev) => !prev)
    handleChartClick('nvrModel', index, label)
    chart.update()
  }

  useEffect(() => {
    const newData = { ...nvrModelData }
    setChartData({
      labels: newData.labels,
      datasets: [
        {
          data: newData.datasets[0].data,
          backgroundColor: isClicked ? [clickColor] : originalBackgroundColor,
        },
      ],
    })
  }, [nvrModelData, isLightMode])

  return (
    <div className="chart-container">
      <Bar
        ref={nvrModelRef}
        height={400}
        options={options}
        data={chartData}
        onClick={handleClick}
      />
    </div>
  )
}
