import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import {
  VaccinationCoverageContainer,
  VaccinationCoverageHeading,
} from './styledComponents'

const VaccinationCoverage = props => {
  const {days} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 600).toString()}k`
    }
    return number.toString()
  }

  return (
    <VaccinationCoverageContainer>
      <VaccinationCoverageHeading>
        Vaccination Coverage
      </VaccinationCoverageHeading>
      <ResponsiveContainer width={1000} height={400}>
        <BarChart
          data={days}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#5a8dee"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            barSize="20%"
            radius={[5, 5, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </VaccinationCoverageContainer>
  )
}

export default VaccinationCoverage
