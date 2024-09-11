'use client'

import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

type Props = {
  data: GraphData[]
}

type GraphData = {
  day: string
  date: string
  totalAmount: number
}

export default function BarGraph({ data }: Props) {
  console.log(data)

  const labels = data.map((item) => item.day)
  const amounts = data.map((item) => item.totalAmount)

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Sale Amount',
        data: amounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderwidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return <Bar data={chartData} options={options}></Bar>
}
