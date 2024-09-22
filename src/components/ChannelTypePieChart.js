import { useRef, useEffect, useState } from 'react'
import { Doughnut, getElementAtEvent } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

export default function ChannelTypePieChart({
  channelTypeData,
  handleChartClick,
}) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'
  const channelTypeRef = useRef(null)
  const [clickColor, setClickColor] = useState(null)
  const [isClicked, setIsClicked] = useState(false)
  const [chartData, setChartData] = useState(channelTypeData)

  const originalBackgroundColor = [
    getColor('yellow', isLightMode),
    getColor('blue', isLightMode),
    getColor('red', isLightMode),
    getColor('green', isLightMode),
    getColor('gray', isLightMode),
    getColor('orange', isLightMode),
  ]

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: fontColor,
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Channel Type',
        color: fontColor,
        font: { size: 16, weight: 'bold' },
      },
    },
  }

  function handleClick(event) {
    const chart = channelTypeRef.current
    const element = getElementAtEvent(channelTypeRef.current, event)
    if (element.length === 0) {
      return
    }
    const index = element[0].index
    const color = chart.data.datasets[0].backgroundColor[index]
    const label = channelTypeData.labels[index]
    setClickColor(color)
    setIsClicked((prev) => !prev)
    handleChartClick('channelType', index, label)
    chart.update()
  }

  useEffect(() => {
    if (channelTypeData.datasets[0].data.length === 0) {
      setChartData({
        labels: [],
        datasets: [],
      })
      return
    }
    setChartData({
      labels: channelTypeData.labels,
      datasets: [
        {
          data: channelTypeData.datasets[0].data,
          backgroundColor: isClicked ? [clickColor] : originalBackgroundColor,
        },
      ],
    })
  }, [channelTypeData, isLightMode])

  return (
    <div className="chart-container">
      {chartData.datasets.length > 0 ? (
        <Doughnut
          ref={channelTypeRef}
          height={400}
          options={options}
          data={chartData}
          onClick={handleClick}
        />
      ) : (
        <div className={`text-center font-bold ${isLightMode ? 'text-gray-500' : 'text-white'}`}>Channel Type No Data</div>
      )}
    </div>
  )
}
