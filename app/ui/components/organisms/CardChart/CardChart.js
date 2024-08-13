import { Suspense, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'
import Apis from '@/app/libs/apis';
import SkeletonCardChart from '@/app/ui/components/skeletons/organisms/CardChart/CardChart'

const DataChart = () => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  const [error, setError] = useState(null)

  const getSemester = () => {
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const fechaActual = new Date()
    const mesesNumber = []
    const mesesLabel = []

    for (let i = 0; i < 6; i++) {
      const fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - i, 1);
      const mes = fecha.getMonth() + 1;
      const nombreMes = meses[fecha.getMonth()]
      mesesNumber.push(mes.toString().padStart(2, '0'));
      mesesLabel.push(nombreMes)
    }

    return { mesesNumber, mesesLabel }
  }

  useEffect(() => {
    const semester = getSemester()
    const mesesLabel = semester.mesesLabel
    const mesesNumber =semester.mesesNumber
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    const data = {
      labels: mesesLabel,
        datasets: [
          {
            label: 'Ingresos',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: documentStyle.getPropertyValue('--blue-500'),
            tension: 0.4
          }
        ]
    }
    const options = {
      maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
    }
    setChartData(data)
    setChartOptions(options)
  }, [])

  if ( error ) {
    return <SkeletonCardChart />
  }

  if ( !chartData ) {
    return null
  }

  return (
    <div className="card">
      <div className='cart__header border-b p-4'>
        <h5>Ingresos por mes</h5>
      </div>
      <div className="card__body">
        <div className='card'>
          <Chart 
            type='line' 
            data={chartData}
            options={chartOptions}
          />
        </div>
      </div>
    </div>
  )
}

const CardChart = () => {
  return (
    <Suspense fallback={<SkeletonCardChart />}>
      <DataChart />
    </Suspense>
  )
}

export default CardChart
