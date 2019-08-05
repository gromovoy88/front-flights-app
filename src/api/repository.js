import axios from 'axios'

const baseDomain = 'https://spring-flights-app.herokuapp.com/'
const baseURL = `${baseDomain}`

/*
    Creating and initialize Axios instance
 */
export default axios.create({
  baseURL: baseURL
})
