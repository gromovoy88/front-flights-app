import Vue from 'vue'
import Router from 'vue-router'
import AppHomepage from '@/components/AppHomepage'
import AppTourists from '@/components/AppTourists'
import AppTouristsAdd from '@/components/AppTouristsAdd'
import AppTouristsEdit from '@/components/AppTouristsEdit'
import AppFlights from '@/components/AppFlights'
import AppFlightsAdd from '@/components/AppFlightsAdd'
import AppFlightsEdit from '@/components/AppFlightsEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppHomepage',
      component: AppHomepage
    }, {
      path: '/flights',
      name: 'AppFlights',
      component: AppFlights
    }, {
      path: '/tourists',
      name: 'AppTourists',
      component: AppTourists
    }, {
      path: '/tourists/add',
      name: 'AppTouristsAdd',
      component: AppTouristsAdd
    }, {
      path: '/tourists/edit/:id',
      name: 'AppTouristsEdit',
      component: AppTouristsEdit,
      props: true
    }, {
      path: '/flights/add',
      name: 'AppFlightsAdd',
      component: AppFlightsAdd
    }, {
      path: '/flights/edit/:id',
      name: 'AppFlightsEdit',
      component: AppFlightsEdit,
      props: true
    }
  ]
})
