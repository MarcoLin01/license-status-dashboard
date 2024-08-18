import OrgCityPieChart from './components/OrgCityPieChart'
import BitRatePieChart from './components/BitRatePieChart'
import CameraModelBarChart from './components/CameraModelBarChart'
import DeviceCityBarChart from './components/DeviceCityBarChart'
import NvrModelBarChart from './components/NvrModelBarChart'
import './Dashboard.css'

function Dashboard({
  orgCityData,
  deviceCity,
  cameraModel,
  nvrModel,
  bitRate,
  cameraCount,
  licenseAllocated,
  channelCount,
  nvrCount,
}) {
  const { allocated, notAllocated } = licenseAllocated
  const total = allocated + notAllocated
  const licenseAllocateRate = Math.round((allocated / total) * 10000) / 100

  const infoItems = [
    { label: 'Total Camera', value: cameraCount },
    { label: 'License Allocate Rate', value: licenseAllocateRate, unit: '%' },
    { label: 'Total Channel', value: channelCount },
    { label: 'Total NVR', value: nvrCount },
  ]

  const InfoItem = ({ label, value, unit = '' }) => (
    <div className="dark:text-white">
      <span className="text-lg font-black uppercase text-gray-700 dark:text-gray-400">
        {label}:{' '}
      </span>
      <span className="text-2xl">
        {value}
        {unit}
      </span>
    </div>
  )

  return (
    <>
      <div className="info-container grid max-w-2xl grid-cols-1 gap-4 py-4 sm:grid-cols-2">
        {infoItems.map(
          ({ label, value, unit }) =>
            value && (
              <InfoItem key={label} label={label} value={value} unit={unit} />
            ),
        )}
      </div>
      <div
        className="dashboard max-w-screen-xxl mx-auto grid gap-4 py-5 sm:grid-cols-1 md:grid-cols-2
          xl:grid-cols-3"
      >
        <div className="left">
          {orgCityData.labels.length > 0 && <div className="card">
            <OrgCityPieChart orgCityData={orgCityData} />
          </div>}
          {deviceCity.labels.length > 0 && <div className="card">
            <DeviceCityBarChart deviceCityData={deviceCity} />
          </div>}
        </div>
        <div className="center">
          {bitRate.labels.length > 0 && <div className="card">
            <BitRatePieChart bitRateData={bitRate} />
          </div>}
          {nvrModel.labels.length > 0 && <div className="card">
            <NvrModelBarChart nvrModelData={nvrModel} />
          </div>}
        </div>
        <div className="right">
          {cameraModel.labels.length > 0 && <div className="card">
            <CameraModelBarChart cameraModelData={cameraModel} />
          </div>}
        </div>
      </div>
    </>
  )
}

export default Dashboard
