<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container
    fill-height
  >
    <v-layout align-center justify-center row fill-height>
      <v-flex lg12>
        <h1>Adding new tourist:</h1>
      </v-flex>
      <v-flex lg6 md12 sm12>
        <div class="card tourist-add-card">
          <div v-if="step === 0" class="step-wrapper">
            <v-layout align-center justify-center row>
              <v-flex lg12>
                <v-text-field
                  v-model="firstName"
                  class="card-input"
                  label="Please enter name:"
                ></v-text-field>
              </v-flex>
              <v-flex lg12>
                <v-text-field
                  class="card-input"
                  label="Please enter surname:"
                  v-model="lastName"
                ></v-text-field>
              </v-flex>
              <v-flex lg12>
                <v-radio-group v-model="gender" :mandatory="false" class="card-input">
                  <v-radio label="Female" value="FEMALE"></v-radio>
                  <v-radio label="Male" value="MALE"></v-radio>
                </v-radio-group>
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
                  @click="$router.push('/tourists')"
                >Go back</v-btn>
              </v-flex>
            </v-layout>
          </div>
          <div v-if="step === 1" class="step-wrapper">
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
                      v-model="computedDateFormatted"
                      label="Please enter birth date"
                      hint="YYYY/MM/DD format"
                      persistent-hint
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      class="card-input"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex lg12>
                <v-text-field
                  class="card-input"
                  label="Please enter country:"
                  v-model="country"
                ></v-text-field>
              </v-flex>
              <v-flex lg12>
                <v-textarea
                  name="input-7-1"
                  label="Please enter some remarks:"
                  value=""
                  hint="Enter something..."
                  class="card-input"
                  v-model="remarks"
                ></v-textarea>
              </v-flex>
              <v-flex lg12>
                <v-btn
                  small
                  dark
                  color="deep-purple darken-1"
                  @click="createTourist()"
                  class="card-button"
                >
                  Create and Let`s select flights</v-btn>
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
                  v-model="registeredFlights"
                  :items="flightsList"
                  label="Please select flight"
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
                  @click="$router.push('/tourists')"
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
import { editFlightsInTourist } from '@/mixins/editFlightsInTourist'

const TouristsRepository = RepositoryFactory.get('tourists')

export default {
  name: 'AppTouristsAdd',
  mixins: [editFlightsInTourist],
  mounted () {
  },
  data () {
    return {
      step: 0,
      firstName: null,
      lastName: null,
      gender: null,
      country: null,
      remarks: null,
      flights: [],
      flightsList: null,
      date: new Date().toISOString().substr(0, 10),
      dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
      id: null
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
    birtdayDateFormatted () {
      return this.formatDate(this.date) + 'T00:00:00'
    }
  },
  methods: {
    incrementStep () {
      this.step++
    },
    decrementStep () {
      this.step--
    },
    createTourist () {
      const tourist = {
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        country: this.country,
        remarks: this.remarks,
        birthday: this.birtdayDateFormatted
      }
      TouristsRepository.createTourist(tourist).then((response) => {
        this.id = response.data.id
        TouristsRepository.getTourist(this.id).then((response) => {
          this.currentTourist = response.data
          this.registeredFlights = []
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
  .tourist-add-card {
  }
</style>
