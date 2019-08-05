<template>
  <v-container
    fill-height
  >
    <v-layout align-center justify-center row fill-height>
      <v-flex lg12>
        <h1>Edit tourist #: {{ id }}</h1>
      </v-flex>
      <v-flex lg6 md12 sm12>
        <div class="card">
          <div class="edit-wrapper">
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
                  color="grey lighten-5"
                  class="card-button"
                  @click="$router.push('/tourists')"
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
  name: 'AppFlightEdit',
  props: {
    id: String
  },
  mixins: [editFlightsInTourist],
  mounted () {
    // Initialize flight and list of registered tourists on this flight
    TouristsRepository.getTourist(this.id).then((response) => {
      this.currentTourist = response.data
      this.registeredFlights = []
      this.currentTourist.flights.forEach((item) => {
        this.registeredFlights.push(item.id)
      })
    })
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
