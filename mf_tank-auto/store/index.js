import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => new Vuex.Store({

  state: {
    passengers: [],
    partsCategories: [],
    models: [],
    modifications: [],
    selectedManufacturer: null,
    selectedModel: null,
    selectedModification: null,
    currentSections: [],
    expandedSectionIds: [],
    mobileMenuOpened: false
  },
  mutations: {
    setPassengers(state, array) {
      state.passengers = array
    },
    setMobileMenuOpened(state, opened) {
      state.mobileMenuOpened = opened
    },
    setPartsCategories(state, array) {
      state.partsCategories = array
    },
    setModels(state, array) {
      state.models = array
    },
    setModifications(state, array) {
      state.modifications = array
    },
    setSelectedModification(state, modification) {
      state.selectedModification = modification
    },
    setSelectedModel(state, model) {
      state.selectedModel = model
    },
    setSelectedManufacturer(state, manufacturer) {
      state.selectedManufacturer = manufacturer
    },
    setSections(state, sections) {
      state.currentSections = sections
    },
    setExpandedSectionIds(state, expandedSectionIds) {
      state.expandedSectionIds = expandedSectionIds
    }
  },
  getters: {
    getPassengers(state) {
      return state.passengers
    },
    getMobileMenuOpened(state) {
      return state.mobileMenuOpened
    },
    getPartsCategories(state) {
      return state.partsCategories
    },
    getModels(state) {
      return state.models
    },
    getModifications(state) {
      return state.modifications
    },
    getSelectedModification(state) {
      return state.selectedModification
    },
    getSelectedModel(state) {
      return state.selectedModel
    },
    getSelectedManufacturer(state) {
      return state.selectedManufacturer
    },
    getSections(state) {
      return state.currentSections
    },
    getExpandedSectionIds(state) {
      return state.expandedSectionIds
    }
  }
});

export default store
