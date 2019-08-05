import TouristsRepository from './touristsRepository'
import FlightsRepository from './flightsRepository'

// Repositories names
const repositories = {
  tourists: TouristsRepository,
  flights: FlightsRepository
}

export const RepositoryFactory = {
  get: (name) => {
    return repositories[name]
  }
}
