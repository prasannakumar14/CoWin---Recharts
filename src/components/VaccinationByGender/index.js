import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import {
  VaccinationGenderContainer,
  VaccinationGenderHeading,
} from './styledComponents'

const VaccinationByGender = props => {
  const {gender} = props
  return (
    <VaccinationGenderContainer>
      <VaccinationGenderHeading>Vaccination by gender</VaccinationGenderHeading>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="60%"
          data={gender}
          startAngle={180}
          endAngle={-0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="male" fill="#f54394" />
          <Cell name="female" fill=" #5a8dee" />
          <Cell name="others" fill="#2cc6c6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </VaccinationGenderContainer>
  )
}

export default VaccinationByGender
