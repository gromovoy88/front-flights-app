<template>
  <v-flex
    lg3
    class="card__wrapper tourist-card__wrapper"
  >
    <div class="card tourist-card">
      <div class="card__title tourist-card__title">
        <span>{{ firstName }}</span>
        <span>{{ lastName }}</span>
      </div>
      <div class="card__body tourist-card__body">
        <span>Gender: <b>{{ gender }}</b></span>
        <span>Date of birth: <b>{{ birthday }}</b></span>
        <span>Country: <b>{{ country }}</b></span>
        <span>Remarks: <b>{{ remarks }}</b></span>
        <span>Flights:
          <b
            class="id"
            v-for="(flight, key) in flights"
            :key="key"
          >{{ flight.id }}</b>
        </span>
      </div>
      <div class="card__actions tourist-card__actions">
        <v-btn
          class="mx-2"
          fab
          small
          dark
          color="deep-purple darken-1"
          @click="editTourist(id)"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          small
          dark
          color="deep-purple darken-1"
          @click="removeTourist(id)"
        >
          <v-icon>remove</v-icon>
        </v-btn>
      </div>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: 'AppTouristCard',
  props: {
    tourist: Object
  },
  data () {
    return {
      id: this.tourist.id,
      firstName: this.tourist.firstName,
      lastName: this.tourist.lastName,
      gender: this.tourist.gender,
      remarks: this.tourist.remarks,
      country: this.tourist.country,
      birthday: this.tourist.birthday,
      flights: this.tourist.flights
    }
  },
  methods: {
    editTourist (id) {
      this.$router.push('/tourists/edit/' + id)
    },
    removeTourist (id) {
      this.$emit('removeTourist', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/variables";
  @import "../styles/mixins";
</style>
