export const DATA_LABELS_OPTIONS = {
  datalabels: {
    formatter: (value) => {
      if (value === 0) {
        return ''
      }
      return value
    },
    color: 'white',
    font: { weight: 'bold', size: 14 },
  },
}

export const CHART_OPTIONS = {
  plugins: {
    tooltip: {
      enabled: false,
    },
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
  },
}
