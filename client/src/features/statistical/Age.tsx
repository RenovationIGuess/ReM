import React, { useEffect } from 'react'
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
import { useStaticStore } from '~/app/staticStore'
import { LoadingOutlined } from '@ant-design/icons'

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

const labels = ['0-5', '6-10', '11-15', '16-18', '15-65', '66+']

const Age = () => {
  const [staticByAge, getStaticByAge] = useStaticStore(state => [
    state.staticByAge,
    state.getStaticByAge
  ])

  const data = {
    labels,
    datasets: [
      {
        label: 'Dân số',
        data: [
          staticByAge['0-4'],
          staticByAge['5-9'],
          staticByAge['10-14'],
          staticByAge['15-19'],
          staticByAge['15-19'] +
            staticByAge['20-24'] +
            staticByAge['25-29'] +
            staticByAge['30-34'] +
            staticByAge['35-39'] +
            staticByAge['40-44'] +
            staticByAge['45-49'] +
            staticByAge['50-54'] +
            staticByAge['55-59'] +
            staticByAge['60-64'],
          staticByAge['65-69'] +
            staticByAge['70-74'] +
            staticByAge['75-79'] +
            staticByAge['80-84'] +
            staticByAge['85-89'] +
            staticByAge['90-94'] +
            staticByAge['95-99'] +
            staticByAge['100+']
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)']
      }
    ]
  }

  useEffect(() => {
    getStaticByAge()
  }, [])

  return (
    <>
      {Object.keys(staticByAge).length === 0 ? (
        <LoadingOutlined />
      ) : (
        <Bar options={options} data={data} />
      )}
    </>
  )
}

export default Age
