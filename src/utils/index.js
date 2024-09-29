import * as xlsx from 'xlsx'
import cityMapping from './cityMapping'

export function handleFileUpload(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result)
      const workbook = xlsx.read(data, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const jsonData = xlsx.utils.sheet_to_json(sheet)
      resolve(jsonData)
    }
    reader.onerror = (error) => reject(error)
    reader.readAsArrayBuffer(file)
  })
}

export function parseChartData(data) {
  // org city pei chart
  const orgCityData = {}
  data.forEach((item) => {
    const orgCity = item.organizationCity
    const country = cityMapping[orgCity]
    const orgID = item.organizationID
    if (!country) {
      return
    }
    if (!orgCityData[country]) {
      orgCityData[country] = {
        allOrganizations: [orgID],
        totalOrganizations: 1,
      }
    } else {
      if (!orgCityData[country].allOrganizations.includes(orgID)) {
        orgCityData[country].allOrganizations.push(orgID)
        orgCityData[country].totalOrganizations++
      }
    }
  })

  // device city bar chart
  const deviceCityData = {}
  data.forEach((item) => {
    const orgCity = item.organizationCity
    const country = cityMapping[orgCity]
    if (!country) {
      return
    }
    if (!deviceCityData[country]) {
      deviceCityData[country] = {
        camera: 0,
        nvr: 0,
        nvrchannel: 0,
        totalDevices: 0,
      }
    }
    switch (item.type) {
      case 'camera':
        deviceCityData[country].camera++
        break
      case 'nvr':
        deviceCityData[country].nvr++
        break
      case 'nvrchannel':
        deviceCityData[country].nvrchannel++
        break
      default:
        break
    }
    deviceCityData[country].totalDevices++
  })

  // BitRateType pei chart
  const bitRateTypeData = {}
  data.forEach((item) => {
    const bitRateType = item.bitRateType
    if (!bitRateType) {
      return
    }
    bitRateTypeData[bitRateType] = (bitRateTypeData[bitRateType] || 0) + 1
  })

  // camera model bar chart
  const cameraModelRawData = {}
  data
    .filter((item) => item.type === 'camera')
    .forEach((item) => {
      cameraModelRawData[item.model] = (cameraModelRawData[item.model] || 0) + 1
    })
  const cameraModelData = Object.entries(cameraModelRawData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

  // nvr model bar chart
  const nvrModelRawData = {}
  data
    .filter((item) => item.type === 'nvr')
    .forEach((item) => {
      nvrModelRawData[item.model] = (nvrModelRawData[item.model] || 0) + 1
    })
  const nvrModelData = Object.entries(nvrModelRawData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})

  // channel type pei chart
  const channelTypeData = {}
  data.forEach((item) => {
    const channelType = item.channelType
    if (!channelType) {
      return
    }
    if (!channelTypeData[channelType]) {
      channelTypeData[channelType] = 1
    } else {
      channelTypeData[channelType]++
    }
  })

  // camera count
  const cameraCount = data.filter((item) => item.type === 'camera').length

  // license distributed ratio
  const licenseAllocatedData = {
    allocated: data.filter((item) => item.licenseAllocated === true).length,
    notAllocated: data.filter((item) => item.licenseAllocated === false).length,
  }

  // channel count
  const channelCount = data.filter((item) => item.type === 'nvrchannel').length

  // nvr count
  const nvrCount = data.filter((item) => item.type === 'nvr').length

  return {
    orgCityData,
    deviceCityData,
    cameraCount,
    licenseAllocatedData,
    bitRateTypeData,
    cameraModelData,
    nvrModelData,
    channelCount,
    nvrCount,
    channelTypeData,
  }
}

export function getColor(colorName, isLightMode) {
  const variant = isLightMode ? 'DEFAULT' : 'light'
  const colorVariant = `--color-chart-${colorName}-${variant}`
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(colorVariant)
    .trim()
  return color
}
