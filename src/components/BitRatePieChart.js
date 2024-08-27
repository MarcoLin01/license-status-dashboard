import { useRef, useEffect, useState } from 'react'
import { Doughnut, getElementAtEvent } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

export default function BitRatePieChart({ bitRateData, handleChartClick }) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'
  const bitRateRef = useRef(null)
  const [clickColor, setClickColor] = useState(null)
  const [isClicked, setIsClicked] = useState(false)
  const [chartData, setChartData] = useState(bitRateData)

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
        labels: {
          color: fontColor,
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Bit Rate Type',
        color: fontColor,
        font: { size: 16, weight: 'bold' },
      },
    },
  }

  function handleClick(event) {
    const chart = bitRateRef.current
    const element = getElementAtEvent(bitRateRef.current, event)
    if (element.length === 0) {
      return
    }
    const index = element[0].index
    const color = chart.data.datasets[0].backgroundColor[index]
    const label = bitRateData.labels[index]
    setClickColor(color)
    setIsClicked((prev) => !prev)
    handleChartClick('bitRate', index, label)
    chart.update()
  }

  useEffect(() => {
    const newData = { ...bitRateData }
    setChartData({
      labels: newData.labels,
      datasets: [
        {
          data: newData.datasets[0].data,
          backgroundColor: isClicked ? [clickColor] : originalBackgroundColor,
        },
      ],
    })
  }, [bitRateData, isLightMode])

  return (
    <div className="chart-container">
      <Doughnut
        ref={bitRateRef}
        height={400}
        options={options}
        data={chartData}
        onClick={handleClick}
      />
    </div>
  )
}
