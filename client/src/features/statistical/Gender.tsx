import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useStaticStore } from '~/app/staticStore'
import { LoadingOutlined } from '@ant-design/icons'

ChartJS.register(ArcElement, Tooltip, Legend)

type PropsType = {
  className?: string
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
  const [staticByGender, getStaticByGender] = useStaticStore(state => [
    state.staticByGender,
    state.getStaticByGender
  ])

  useEffect(() => {
    getStaticByGender()
  }, [])

  const data = {
    labels: ['Nam', 'Nữ'],
    datasets: [
      {
        label: 'Số lượng nhân khẩu: ',
        data: [staticByGender.namGioi, staticByGender.nuGioi],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1
      }
    ]
  }

  return (
    <>
      {Object.keys(staticByGender).length === 0 ? (
        <LoadingOutlined />
      ) : (
        <Pie className={className} data={data} options={options} />
      )}
    </>
  )
}

export default Gender
