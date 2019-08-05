<template>
  <v-flex
    lg3
    class="card__wrapper flight-card__wrapper"
  >
    <div class="card flight-card">
      <div class="card__title flight-card__title">
        <span>Flight #{{ id }}</span>
      </div>
      <div class="card__body flight-card__body">
        <span>Departure: <b>{{ departureDateTime }}</b></span>
        <span>Arrival: <b>{{ arrivalDateTime }}</b></span>
        <span>Seats count: <b>{{ seatsCount }}</b></span>
        <span>Ticket price: <b>{{ ticketPrice }}</b></span>
        <span>Tourists:
          <b
            class="id"
            v-for="(tourist, key) in tourists"
            :key="key"
        >{{ tourist.id }}</b></span>
      </div>
      <div class="card_actions flight-card__actions">
        <v-btn
          class="mx-2"
          fab
          small
          dark
          color="deep-purple darken-1"
          @click="editFlight(id)"
        >
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          small
          dark
          color="deep-purple darken-1"
          @click="removeFlight(id)"
        >
          <v-icon>remove</v-icon>
        </v-btn>
      </div>
    </div>
  </v-flex>
</template>

<script>
export default {
  name: 'AppFlightCard',
  props: {
    flight: Object
  },
  data () {
    return {
      id: this.flight.id,
      departureDateTime: this.flight.departureDateTime,
      arrivalDateTime: this.flight.arrivalDateTime,
      seatsCount: this.flight.seatsCount,
      ticketPrice: this.flight.ticketPrice,
      tourists: this.flight.tourists
    }
  },
  methods: {
    editFlight (id) {
      this.$router.push('/flights/edit/' + id)
    },
    removeFlight (id) {
      this.$emit('removeFlight', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../styles/variables";
  @import "../styles/mixins";
</style>
