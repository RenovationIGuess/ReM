import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

type PropsType = {
  className?: string
}

const data = {
  labels: ['Nam', 'Nữ'],
  datasets: [
    {
      label: 'Số lượng nhân khẩu: ',
      data: [298, 312],
      backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }
  ]
}

const options = {
  plugins: {
    legend: {
      position: 'bottom' as const
    }
  },
  interaction: {
    intersect: false,
    mode: 'nearest' as const
  }
}

const Gender = ({ className }: PropsType) => {
  return <Pie className={className} data={data} options={options} />
}

export default Gender
