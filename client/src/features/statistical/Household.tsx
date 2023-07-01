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

type PropsType = {
  className?: string
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
}

const labels = ['2017', '2018', '2019', '2020', '2021', '2022', '2023']

const data = {
  labels,
  datasets: [
    {
      label: 'Số lượng nhân khẩu: ',
      data: [60, 87, 92, 170, 213, 256, 371],
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    }
  ]
}

const Household = ({ className }: PropsType) => {
  return <Bar className={className} options={options} data={data} />
}

export default Household
