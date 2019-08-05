import { RepositoryFactory } from '@/api/repositoryFactory'

const FlightsRepository = RepositoryFactory.get('flights')
const TouristsRepository = RepositoryFactory.get('tourists')

export const editFlightsInTourist = {
  name: 'AppFlightEdit',
  mounted () {
    // Initialize list of all tourists
    FlightsRepository.getAll().then((response) => {
      this.flightsList = []
      response.data.forEach((item) => {
        this.flightsList.push(item.id)
      })
    })
  },
  data () {
    return {
      currentTourist: null,
      registeredFlights: null,
      flightsList: null
    }
  },
  watch: {
    // Listen changes in registeredFlights model
    registeredFlights (newValue, oldValue) {
      if (oldValue) {
        // Define ID of Flight which was added
        const diff = this.diff(newValue, oldValue)
        // Retrieve Flight by ID
        FlightsRepository.getFlight(diff[0]).then((response) => {
          const flight = response.data
          if (newValue.length > oldValue.length) {
            // Set new Flight object to Tourist
            TouristsRepository.addFlightToTourist(this.currentTourist.id, flight)
              .then(() => {
                // In response we get all Tourists object in this flight, updating our v-model
              })
          } else {
            // Set new Tourist object to Flight
            TouristsRepository.deleteFlightFromTourist(this.currentTourist.id, flight.id)
              .then(() => {
              })
          }
        })
      }
    }
  },
  methods: {
    // Util method to equal arrays
    diff (a1, a2) {
      return a1.filter(i => !a2.includes(i))
        .concat(a2.filter(i => !a1.includes(i)))
    }
  }
}
