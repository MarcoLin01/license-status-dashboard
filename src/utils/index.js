import * as xlsx from 'xlsx'

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
    if (item.organizationCity) {
      orgCityData[item.organizationCity] =
        (orgCityData[item.organizationCity] || 0) + 1
    }
  })

  // device city bar chart
  const deviceCityData = {}
  data.forEach((item) => {
    if (item.city) {
      deviceCityData[item.city] = (deviceCityData[item.city] || 0) + 1
    }
  })

  // camera count
  const cameraCount = data.filter((item) => item.type === 'camera').length

  // license distributed ratio
  const licenseAllocatedData = {
    allocated: data.filter((item) => item.licenseAllocated === true).length,
    notAllocated: data.filter((item) => item.licenseAllocated === false).length,
  }

  // BitRateType pei chart
  const bitRateTypeData = {}
  data.forEach((item) => {
    if (item.BitRateType) {
      bitRateTypeData[item.BitRateType] =
        (bitRateTypeData[item.BitRateType] || 0) + 1
    }
  })

  // camera model bar chart
  const cameraModelData = {}
  data
    .filter((item) => item.type === 'camera')
    .forEach((item) => {
      cameraModelData[item.model] = (cameraModelData[item.model] || 0) + 1
    })

  // channel count
  const channelCount = data.filter((item) => item.type === 'nvrchannel').length

  // nvr count
  const nvrCount = data.filter((item) => item.type === 'nvr').length

  // nvr model bar chart
  const nvrModelData = {}
  data
    .filter((item) => item.type === 'nvr')
    .forEach((item) => {
      nvrModelData[item.model] = (nvrModelData[item.model] || 0) + 1
    })

  // final result data
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
