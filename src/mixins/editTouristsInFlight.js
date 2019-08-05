import { RepositoryFactory } from '@/api/repositoryFactory'

const FlightsRepository = RepositoryFactory.get('flights')
const TouristsRepository = RepositoryFactory.get('tourists')

export const editTouristsInFlight = {
  name: 'AppFlightEdit',
  mounted () {
    // Initialize list of all tourists
    TouristsRepository.getAll().then((response) => {
      this.touristList = []
      response.data.forEach((item) => {
        this.touristList.push(item.id)
      })
    })
  },
  data () {
    return {
      currentFlight: null,
      registeredTourists: null,
      touristList: null
    }
  },
  watch: {
    registeredTourists (newValue, oldValue) {
      if (oldValue) {
        // Define ID of Tourist which was added
        const diff = this.diff(newValue, oldValue)
        // Retrieve Tourist by ID
        TouristsRepository.getTourist(diff[0]).then((response) => {
          const tourist = response.data
          if (newValue.length > oldValue.length) {
            // Set new Tourist object to Flight
            FlightsRepository.addTouristToFlight(this.currentFlight.id, tourist)
              .then(() => {
                // In response we get all Tourists object in this flight, updating our v-model
              })
          } else {
            // Set new Tourist object to Flight
            FlightsRepository.deleteTouristFromFlight(this.currentFlight.id, tourist.id)
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
