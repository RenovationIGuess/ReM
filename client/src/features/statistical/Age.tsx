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

const getData = (staticByAge: any) => {
  let data: any = [0, 0, 0, 0, 0, 0]

  for (let i = 0; i < 100; i++) {
    if (i <= 5) {
      data[0] += staticByAge[i]
    }
    if (i >= 6 && i <= 10) {
      data[1] += staticByAge[i]
    }
    if (i >= 11 && i <= 15) {
      data[2] += staticByAge[i]
    }
    if (i >= 16 && i <= 18) {
      data[3] += staticByAge[i]
    }
    if (i >= 19 && i <= 65) {
      data[4] += staticByAge[i]
    }
    if (i >= 66) {
      data[5] += staticByAge[i]
    }
  }

  return data
}

const Age = () => {
  const [staticByAge, getStaticByAge] = useStaticStore(state => [
    state.staticByAge,
    state.getStaticByAge
  ])

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
