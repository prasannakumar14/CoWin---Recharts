import {PieChart, Pie, Legend, Cell} from 'recharts'

import {
  VaccinationAgeContainer,
  VaccinationAgeHeading,
} from './styledComponents'

const VaccinationByAge = props => {
  const {ages} = props
  return (
    <VaccinationAgeContainer>
      <VaccinationAgeHeading>Vaccination by age</VaccinationAgeHeading>

      <PieChart width={1000} height={300}>
        <Pie cx="50%" cy="40%" data={ages} outerRadius="70%" dataKey="count">
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="45-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </VaccinationAgeContainer>
  )
}

export default VaccinationByAge
