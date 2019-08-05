import Repository from './repository'

const resource = '/flights'

const PAGE_SIZE = 4

export default {
  getAll () {
    return Repository.get(`${resource}`)
  },
  getAllByPage (pageCounter) {
    return Repository.get(`${resource}/?page=${pageCounter}&size=${PAGE_SIZE}`)
  },
  getFlight (flightId) {
    return Repository.get(`${resource}/${flightId}`)
  },
  createFlight (payload) {
    return Repository.post(`${resource}`, payload)
  },
  deleteFlight (flightId) {
    return Repository.delete(`${resource}/${flightId}`)
  },
  addTouristToFlight (flightId, payload) {
    return Repository.put(`${resource}/${flightId}/tourists`, payload)
  },
  deleteTouristFromFlight (flightId, touristId) {
    return Repository.delete(`${resource}/${flightId}/tourists/${touristId}`)
  }
}
