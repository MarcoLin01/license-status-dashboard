import * as xlsx from 'xlsx'
import cityMapping from './cityMapping'

export const handleFileUpload = (file) => {
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

export const parseChartData = (data) => {
  // org city pei chart
  const orgCityData = {}
  data.forEach((item) => {
    const orgCity = item.organizationCity
    const country = cityMapping[orgCity] ?? 'Unknown'
    const orgID = item.organizationID
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
    const country = cityMapping[orgCity] ?? 'Unknown'
    if (!deviceCityData[country]) {
      deviceCityData[country] = {
        camera: 0,
        nvr: 0,
        nvrchannel: 0,
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
  })

  // BitRateType pei chart
  const bitRateTypeData = {}
  data.forEach((item) => {
    const bitRateType = item.bitRateType === '' ? 'Unknown' : item.bitRateType
    bitRateTypeData[bitRateType] = (bitRateTypeData[bitRateType] || 0) + 1
  })

  // camera model bar chart
  const cameraModelData = {}
  data
    .filter((item) => item.type === 'camera')
    .forEach((item) => {
      cameraModelData[item.model] = (cameraModelData[item.model] || 0) + 1
    })

  // nvr model bar chart
  const nvrModelData = {}
  data
    .filter((item) => item.type === 'nvr')
    .forEach((item) => {
      nvrModelData[item.model] = (nvrModelData[item.model] || 0) + 1
    })

  // channel type pei chart
  const channelTypeData = {}
  data.forEach((item) => {
    const channelType = item.channelType === '' ? 'Unknown' : item.channelType
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

export const getColor = (colorName, isLightMode) => {
  const variant = isLightMode ? 'DEFAULT' : 'light'
  const colorVariant = `--color-chart-${colorName}-${variant}`
  const color = getComputedStyle(document.documentElement)
    .getPropertyValue(colorVariant)
    .trim()
  return color
}
