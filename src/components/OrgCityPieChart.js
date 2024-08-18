import { Doughnut } from 'react-chartjs-2'
import { useThemeMode } from 'flowbite-react'
import { getColor } from '../utils'

export default function OrgCityPieChart({ orgCityData }) {
  const { mode } = useThemeMode()
  const isLightMode = mode === 'light'
  const fontColor = isLightMode ? '#666666' : 'white'

  const data = { ...orgCityData }
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
        labels: {
          color: fontColor,
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: 'Organization',
        color: fontColor,
        font: { size: 16, weight: 'bold' },
      },
    },
  }

  return (
    <div className="chart-container">
      <Doughnut redraw height={400} options={options} data={data} />
    </div>
  )
}
