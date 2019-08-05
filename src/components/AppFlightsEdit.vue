<template>
  <v-container
    fill-height
  >
    <v-layout align-center justify-center row fill-height>
      <v-flex lg12>
        <h1>Edit flight #: {{ id }}</h1>
      </v-flex>
      <v-flex lg6 md12 sm12>
        <div class="card">
          <div class="edit-wrapper">
            <v-layout align-center justify-center row>
              <v-flex lg12>
                <v-select
                  v-model="registeredTourists"
                  :items="touristList"
                  label="Please select users"
                  multiple
                  chips
                  hint="Click arrow down to see all users"
                  persistent-hint
                  class="card-input"
                ></v-select>
              </v-flex>
              <v-flex lg12>
                <v-btn
                  small
                  color="grey lighten-5"
                  class="card-button"
                  @click="$router.push('/flights')"
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
  name: 'AppFlightEdit',
  props: {
    id: String
  },
  mixins: [editTouristsInFlight],
  mounted () {
    // Initialize flight and list of registered tourists on this flight
    FlightsRepository.getFlight(this.id).then((response) => {
      this.currentFlight = response.data
      this.registeredTourists = []
      this.currentFlight.tourists.forEach((item) => {
        this.registeredTourists.push(item.id)
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
