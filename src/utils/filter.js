import cityMapping from './cityMapping'

export function filterByOrgCity(rawData, label) {
  return rawData.filter((item) => {
    const orgCity = item.organizationCity
    const country = cityMapping[orgCity]
    return country === label
  })
}

export function filterByDeviceCity(rawData, label) {
  return rawData.filter((item) => {
    const orgCity = item.organizationCity
    const country = cityMapping[orgCity]
    return country === label
  })
}

export function filterByCameraModel(rawData, label) {
  return rawData.filter(
    (item) => item.type === 'camera' && item.model === label,
  )
}

export function filterByNvrModel(rawData, label) {
  return rawData.filter((item) => item.type === 'nvr' && item.model === label)
}

export function filterByBitRate(rawData, label) {
  return rawData.filter((item) => {
    const bitRateType = item.bitRateType
    return bitRateType === label
  })
}

export function filterByChannelType(rawData, label) {
  return rawData.filter((item) => {
    const channelType = item.channelType
    return channelType === label
  })
}
