import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {
  CowinContainer,
  CowinImageContainer,
  CowinImage,
  CowinImagePara,
  CowinHeading,
  ChartsContainer,
  ErrorContainer,
  ErrorImage,
  ErrorHeading,
} from './styledComponents'

import VaccinationCoverage from '../VaccinationCoverage'

import VaccinationByGender from '../VaccinationByGender'

import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    days: '',
    genderData: '',
    age: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getApiDetails()
  }

  getApiDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    if (response.ok === true) {
      const data = await response.json()

      const formatDays = data.last_7_days_vaccination.map(item => ({
        vaccineDate: item.vaccine_date,
        dose1: item.dose_1,
        dose2: item.dose_2,
      }))

      const formatGender = data.vaccination_by_gender.map(items => ({
        count: items.count,
        gender: items.gender,
      }))

      const formatAge = data.vaccination_by_age.map(ageItem => ({
        age: ageItem.age,
        count: ageItem.count,
      }))

      this.setState({
        days: formatDays,
        genderData: formatGender,
        age: formatAge,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCharts = () => {
    const {genderData, days, age} = this.state
    return (
      <>
        <VaccinationCoverage days={days} />
        <VaccinationByGender gender={genderData} />
        <VaccinationByAge ages={age} />
      </>
    )
  }

  renderError = () => (
    <ErrorContainer>
      <ErrorImage
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <ErrorHeading>Something went wrong</ErrorHeading>
    </ErrorContainer>
  )

  renderViewsBasedOnAPIStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCharts()
      case apiStatusConstants.failure:
        return this.renderError()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <CowinContainer>
        <CowinImageContainer>
          <CowinImage
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <CowinImagePara>Co-WIN</CowinImagePara>
        </CowinImageContainer>
        <CowinHeading>CoWIN Vaccination in India</CowinHeading>
        <ChartsContainer>{this.renderViewsBasedOnAPIStatus()}</ChartsContainer>
      </CowinContainer>
    )
  }
}

export default CowinDashboard
