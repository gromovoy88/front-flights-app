<template>
  <v-container
    fill-height
  >
    <v-layout row wrap>
      <v-flex lg12 md12 sm12>
        <div
          class="content-page__wrapper"
        >
          <div class="content-page__header">
            <h1>Flights Management</h1>
            <v-btn
              class="mx-2"
              fab
              dark
              color="deep-purple darken-1"
              to="/flights/add"
            >
              <v-icon
                dark
              >add</v-icon>
            </v-btn>
          </div>
        </div>
      </v-flex>
      <v-flex lg12 md12 sm12>
        <div class="content-page__content">
          <v-layout
            align-center
            justify-flex-start
            row
            fill-height
          >
            <v-flex v-if="!flights || flights.length === 0">
              <h1>Empty list</h1>
            </v-flex>
            <app-flight-card
              v-else
              v-for="(flight, i) in flights"
              :key="i"
              :flight="flight"
              @removeFlight="removeFlight"
            >
            </app-flight-card>
          </v-layout>
        </div>
      </v-flex>
      <v-flex lg12 md12 sm12>
        <v-pagination
          v-model="page"
          :length="6"
        ></v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { RepositoryFactory } from '@/api/repositoryFactory'
import AppFlightCard from './AppFlightCard'

const FlightsRepository = RepositoryFactory.get('flights')

export default {
  name: 'AppFlights',
  components: {
    'app-flight-card': AppFlightCard
  },
  mounted () {
    FlightsRepository.getAllByPage(0).then((response) => {
      this.flights = response.data
    })
  },
  data () {
    return {
      page: 1,
      flights: null
    }
  },
  watch: {
    page (newValue) {
      this.flights = this.fetchFlight(newValue)
    }
  },
  methods: {
    removeFlight (id) {
      FlightsRepository.deleteFlight(id).then(() => {
        this.flights = null
        FlightsRepository.getAllByPage(this.page - 1).then((response) => {
          this.flights = response.data
        })
      })
    },
    fetchFlight (pageNumber) {
      FlightsRepository.getAllByPage(pageNumber - 1).then((response) => {
        this.flights = response.data
        return response.data
      })
    }
  }
}
</script>

<style scoped>

</style>
