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
  const totalOrganizations = orgCityData.datasets[0].data.reduce(
    (acc, curr) => acc + curr.totalOrganizations,
    0,
  )

  const originalBackgroundColor = [
    getColor('red', isLightMode),
    getColor('green', isLightMode),
    getColor('yellow', isLightMode),
    getColor('gray', isLightMode),
    getColor('blue', isLightMode),
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
        text: 'Country of Organization',
        color: fontColor,
        font: { size: 16, weight: 'bold' },
      },
      subtitle: {
        display: true,
        text: `Total Organizations: ${totalOrganizations}`,
        color: fontColor,
        font: { size: 14 },
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
    const countryData = orgCityData.datasets[0].data.map(
      (item) => item.totalOrganizations,
    )
    if (orgCityData.datasets[0].data.length === 0) {
      setChartData({
        labels: [],
        datasets: [],
      })
      return
    }
    setChartData({
      labels: orgCityData.labels,
      datasets: [
        {
          data: countryData,
          backgroundColor: isClicked ? [clickColor] : originalBackgroundColor,
        },
      ],
    })
  }, [orgCityData, isLightMode])

  return (
    <div className="chart-container">
      {chartData.datasets.length > 0 ? (
        <Pie
          ref={orgCityRef}
          height={400}
          options={options}
          data={chartData}
          onClick={handleClick}
        />
      ) : (
        <div
          className={`text-center font-bold ${isLightMode ? 'text-gray-500' : 'text-white'}`}
        >
          Country of Organization No Data
        </div>
      )}
    </div>
  )
}
