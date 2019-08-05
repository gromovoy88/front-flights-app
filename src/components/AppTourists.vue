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
            <h1>Tourists Management</h1>
            <v-btn
              class="mx-2"
              fab
              dark
              color="deep-purple darken-1"
              to="/tourists/add"
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
            <v-flex v-if="!tourists || tourists.length === 0">
              <h1>Empty list</h1>
            </v-flex>
            <app-tourist-card
              v-else
              v-for="(tourist, i) in tourists"
              :key="i"
              :tourist="tourist"
              @removeTourist="removeTourist"
            >
            </app-tourist-card>
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
import AppTouristCard from './AppTouristCard'

const TouristsRepository = RepositoryFactory.get('tourists')

export default {
  name: 'AppTourists',
  components: {
    'app-tourist-card': AppTouristCard
  },
  mounted () {
    TouristsRepository.getAllByPage(0).then((response) => {
      this.tourists = response.data
    })
  },
  data () {
    return {
      page: 1,
      tourists: null
    }
  },
  watch: {
    page (newValue) {
      this.tourists = this.fetchTourists(newValue)
    }
  },
  methods: {
    removeTourist (id) {
      TouristsRepository.deleteTourist(id).then(() => {
        TouristsRepository.getAllByPage(this.page - 1).then((response) => {
          this.tourists = null
          this.tourists = response.data
        })
      })
    },
    fetchTourists (pageNumber) {
      TouristsRepository.getAllByPage(pageNumber - 1).then((response) => {
        this.tourists = response.data
        return response.data
      })
    }
  }
}
</script>

<style lang="scss">
</style>
