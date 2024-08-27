import { useRef, useEffect, useState } from 'react'
import { Pie, getElementAtEvent } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

export default function OrgCityPieChart({ orgCityData, handleChartClick }) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'
  const orgCityRef = useRef(null)
  const [clickColor, setClickColor] = useState(null)
  const [isClicked, setIsClicked] = useState(false)
  const [chartData, setChartData] = useState(orgCityData)

  const originalBackgroundColor = [
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
        labels: {
          color: fontColor,
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Org City',
        color: fontColor,
        font: { size: 16, weight: 'bold' },
      },
    },
  }

  function handleClick(event) {
    const chart = orgCityRef.current
    const element = getElementAtEvent(orgCityRef.current, event)
    if (element.length === 0) {
      return
    }
    const index = element[0].index
    const color = chart.data.datasets[0].backgroundColor[index]
    const label = orgCityData.labels[index]
    setClickColor(color)
    setIsClicked((prev) => !prev)
    handleChartClick('orgCity', index, label)
    chart.update()
  }

  useEffect(() => {
    const newData = { ...orgCityData }
    setChartData({
      labels: newData.labels,
      datasets: [
        {
          data: newData.datasets[0].data,
          backgroundColor: isClicked ? [clickColor] : originalBackgroundColor,
        },
      ],
    })
  }, [orgCityData, isLightMode])

  return (
    <div className="chart-container">
      <Pie
        ref={orgCityRef}
        height={400}
        options={options}
        data={chartData}
        onClick={handleClick}
      />
    </div>
  )
}
