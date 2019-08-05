<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container
    fill-height
  >
    <v-layout align-center justify-center row fill-height>
      <v-flex lg12>
        <h1>Adding new flight:</h1>
      </v-flex>
      <v-flex lg6 md12 sm12>
        <div class="card flight-add-card">
          <div v-if="step === 0" class="step-wrapper">
            <v-layout align-center justify-center row>
              <v-flex lg12>
                <v-menu
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                  class="card-input"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="computedDepartureDateFormatted"
                      label="Please set flight departure time:"
                      hint="YYYY/MM/DD format"
                      persistent-hint
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      class="card-input"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="departureDateTime" no-title></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex lg12>
                <v-menu
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                  class="card-input"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="computedArrivalDateFormatted"
                      label="Please set flight arrival time:"
                      hint="YYYY/MM/DD format"
                      persistent-hint
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      class="card-input"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="arrivalDateTime" no-title></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex lg12>
                <v-btn
                  small
                  dark
                  color="deep-purple darken-1"
                  @click="incrementStep()"
                >Add more info</v-btn>
              </v-flex>
              <v-flex lg12>
                <v-btn
                  small
                  color="grey lighten-5"
                  class="card-button"
                  @click="$router.push('/flights')"
                >Go back</v-btn>
              </v-flex>
            </v-layout>
          </div>
          <div v-if="step === 1" class="step-wrapper">
            <v-layout align-center justify-center row>
              <v-flex lg12>
                <v-text-field
                  v-model="seatsCount"
                  class="card-input"
                  label="Please enter seats count:"
                ></v-text-field>
              </v-flex>
              <v-flex lg12>
                <v-text-field
                  class="card-input"
                  label="Please enter ticket price:"
                  v-model="ticketPrice"
                ></v-text-field>
              </v-flex>
              <v-flex lg12>
                <v-btn
                  small
                  dark
                  color="deep-purple darken-1"
                  @click="createFlight()"
                >Create flight and Go next</v-btn>
              </v-flex>
              <v-flex lg12>
                <v-btn
                  small
                  color="grey lighten-5"
                  class="card-button"
                  @click="decrementStep()"
                >Go back</v-btn>
              </v-flex>
            </v-layout>
          </div>
          <div v-if="step === 2" class="step-wrapper">
            <v-layout align-center justify-center row>
              <v-flex lg12>
                <v-select
                  v-model="registeredTourists"
                  :items="touristList"
                  label="Please select tourists to flight"
                  multiple
                  chips
                  hint="What are favorite route?"
                  persistent-hint
                  class="card-input"
                ></v-select>
              </v-flex>
              <v-flex lg12>
                <v-btn
                  small
                  dark
                  color="deep-purple darken-1"
                  @click="$router.push('/flights')"
                  class="card-button"
                >Done</v-btn>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { RepositoryFactory } from '@/api/repositoryFactory'
import { editTouristsInFlight } from '@/mixins/editTouristsInFlight'
const FlightsRepository = RepositoryFactory.get('flights')

export default {
  name: 'AppFlightsAdd',
  mixins: [editTouristsInFlight],
  mounted () {
  },
  data () {
    return {
      step: 0,
      seatsCount: null,
      ticketPrice: null,
      departureDateTime: new Date().toISOString().substr(0, 10),
      arrivalDateTime: new Date().toISOString().substr(0, 10),
      id: null
    }
  },
  computed: {
    computedDepartureDateFormatted () {
      return this.formatDate(this.departureDateTime) + 'T00:00:00'
    },
    computedArrivalDateFormatted () {
      return this.formatDate(this.arrivalDateTime) + 'T00:00:00'
    }
  },
  methods: {
    incrementStep () {
      this.step++
    },
    decrementStep () {
      this.step--
    },
    createFlight () {
      const flight = {
        seatsCount: this.seatsCount,
        ticketPrice: this.ticketPrice,
        departureDateTime: this.computedDepartureDateFormatted,
        arrivalDateTime: this.computedArrivalDateFormatted
      }
      FlightsRepository.createFlight(flight).then((response) => {
        this.id = response.data.id
        FlightsRepository.getFlight(this.id).then((response) => {
          this.currentFlight = response.data
          this.registeredTourists = []
          this.incrementStep()
        })
      })
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${year}-${month}-${day}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
