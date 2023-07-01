import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { academicLevel } from '~/app/config'

ChartJS.register(ArcElement, Tooltip, Legend)

type PropsType = {
  className?: string
}

const data = {
  labels: Object.values(academicLevel),
  datasets: [
    {
      label: 'Số lượng nhân khẩu: ',
      data: [12, 19, 32, 15, 21, 14, 24],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 1, 0.4)',
        'rgba(180, 180, 180, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 1, 1)',
        'rgba(180, 180, 180, 1)'
      ],
      borderWidth: 1
    }
  ]
}

const options = {
  layout: {},
  plugins: {
    legend: {
      position: 'right' as const
    }
  },
  interaction: {
    intersect: false,
    mode: 'nearest' as const
  }
}

const Level = ({ className }: PropsType) => {
  return <Pie className={className} data={data} options={options} />
}

export default Level
