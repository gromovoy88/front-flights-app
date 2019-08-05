import Repository from './repository'

const resource = '/tourists'

const PAGE_SIZE = 4

export default {
  getAll () {
    return Repository.get(`${resource}`)
  },
  getAllByPage (pageCounter) {
    return Repository.get(`${resource}/?page=${pageCounter}&size=${PAGE_SIZE}`)
  },
  getTourist (touristId) {
    return Repository.get(`${resource}/${touristId}`)
  },
  createTourist (payload) {
    return Repository.post(`${resource}`, payload)
  },
  deleteTourist (touristId) {
    return Repository.delete(`${resource}/${touristId}`)
  },
  addFlightToTourist (touristId, payload) {
    return Repository.put(`${resource}/${touristId}/flights`, payload)
  },
  deleteFlightFromTourist (touristId, flightId) {
    return Repository.delete(`${resource}/${touristId}/flights/${flightId}`)
  }
}
