import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  indexAxis: 'y' as const,
  scales: {
    x: { beginAtZero: true, stacked: true },
    y: { stacked: true }
  },
  elements: {
    bar: {
      borderWidth: 2
    }
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const
    }
  }
}

const labels = ['65+', '55-64', '45-54', '35-44', '25-34', '18+']

const data = {
  labels,
  datasets: [
    {
      label: 'Nam',
      data: [18, 12, 6, 9, 12, 3, 9],
      backgroundColor: ['rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)']
    },
    {
      label: 'Nữ',
      data: [7, 8, 12, 3, 10, 6, 4],
      backgroundColor: ['rgba(255, 25, 104, 0.2)'],
      borderColor: ['rgba(255, 25, 104, 1)']
    }
  ]
}

const Age = () => {
  return <Bar options={options} data={data} />
}

export default Age
