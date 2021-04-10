import axios from 'axios';
import { createStore } from 'vuex';
// import throttle from 'lodash.throttle';
import MediaService from './services/MediaService';

const store = createStore({
  state: {
    version: 1.0,
    user: null,
    token: '',
    status: '',
    storeLoaded: false,
    currentItem: null,
    showFileOperations: false,
    showVideos: true,
    showPictures: true,
    itemsSelected: {}, // should be a Set() ?
    nefItemsToDelete: {}, // should be a Set() ?
  },

  mutations: {
    AUTH_REQUEST: state => {
      const changeState = state;
      changeState.status = 'loading';
    },
    AUTH_SUCCESS: (state, token) => {
      const changeState = state;
      changeState.status = 'success';
      changeState.token = token;
    },
    AUTH_ERROR: state => {
      const changeState = state;
      changeState.status = 'error';
      changeState.token = '';
    },
    AUTH_LOGOUT: state => {
      const changeState = state;
      changeState.status = '';
      changeState.token = null;
      changeState.user = null;
    },
    SET_TOKEN: (state, token) => {
      const changeState = state;
      changeState.token = token;
    },
    SET_USER: (state, user) => {
      const changeState = state;
      changeState.user = user;
    },

    setStoreLoaded(state, payload) {
      const changeState = state;
      changeState.storeLoaded = payload;
    },
    resetState(state, payload) {
      this.replaceState(Object.assign(state, payload));
    },
    setCurrentItem(state, payload) {
      state.currentItem = payload;
    },
    setShowFileOperations(state, payload) {
      state.showFileOperations = payload;
    },
    addNefItemToDelete(state, item) {
      const key = item.path;
      state.nefItemsToDelete[key] = item;
    },
    removeNefItemToDelete(state, item) {
      const key = item.path;
      delete state.nefItemsToDelete[key];
    },
    clearNefItemsToDelete(state) {
      state.nefItemsToDelete = {};
    },
    addItemSelected(state, item) {
      const key = item.path;
      state.itemsSelected[key] = item;
    },
    removeItemSelected(state, item) {
      const key = item.path;
      delete state.itemsSelected[key];
    },
    toggleItemsSelected(state, item) {
      const key = item.path;
      if (key in state.itemsSelected) {
        delete state.itemsSelected[key];
      } else {
        state.itemsSelected[key] = item;
      }    
    },
    clearItemsSelected(state) {
      state.itemsSelected = {};
    },
    setShowVideos(state, payload) {
      state.showVideos = payload;
    },
    setShowPictures(state, payload) {
      state.showPictures = payload;
    },
  },

  actions: {
    initialiseStore(context) {
      return new Promise(resolve => {
        if (context.getters.storeLoaded) {
          resolve();
        }

        // this method is called from the Vue initialization
        // Check if the store exists
        if (localStorage.getItem('store')) {
          const storedObj = JSON.parse(localStorage.getItem('store'));
          // Check the version stored against current. If different, don't
          // load the cached version
          if (storedObj.version === context.state.version) {
            context.commit('resetState', storedObj);
            if (context.state.token) {
              axios.defaults.headers.common.Authorization = `${context.state.token}`;
              context.dispatch('AUTH_VERIFY');
            }
          }
        }
        context.commit('setStoreLoaded', true);
        resolve();
      });
    },

    AUTH_VERIFY({ commit }) {
      return new Promise((resolve, reject) => {
        MediaService.verify().then(
          () => {
            resolve();
          },
          err => {
            if (err.response.status === 401) {
              // wrong login, so clear the existing user data
              commit('AUTH_ERROR', err);
              commit('SET_TOKEN', null);
              commit('SET_USER', null);
            }
            reject(err);
          },
        );
      });
    },

    AUTH_REQUEST({ dispatch, commit }, formdata) {
      const { email, password } = formdata;
      return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST');
        MediaService.login(email, password).then(
          response => {
            commit('SET_TOKEN', response.data.user.token);
            commit('SET_USER', response.data.user);
            axios.defaults.headers.common.Authorization = `${response.data.user.token}`;
            dispatch('AUTH_VERIFY');
          },
          err => {
            if (err.response.status === 401) {
              // wrong login, so clear the existing user data
              commit('AUTH_ERROR', err);
              commit('SET_TOKEN', null);
              commit('SET_USER', null);
            }
            reject(err);
          },
        );
      });
    },

    AUTH_LOGOUT({ commit }) {
      return new Promise(resolve => {
        commit('AUTH_LOGOUT');
        commit('SET_TOKEN', null);
        commit('SET_USER', null);

        delete axios.defaults.headers.common.Authorization;
        resolve();
      });
    },

    REMOVE_SELECTED_ITEMS({ commit, getters }) {
      // const throttledDelete = throttle(MediaService.delete, 500);
      return new Promise((resolve, reject) => {
        const todo = Object.values(getters.getItemsSelected);
        const all = [];
        todo.forEach(item => {
          all.push(
            // throttledDelete(item).then(() => {
            //   commit('removeItemSelected', item);
            // }),
            MediaService.delete(item).then(() => {
              commit('removeItemSelected', item);
            }),            
          );
        });
        Promise.all(all)
          .then(() => {
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
    },
  },

  getters: {
    // isLoggedIn: state => !!state.user,

    isLoggedIn(state) {
      return !!state.user;
    },
    getToken(state) {
      return state.token;
    },

    isAdmin: state => state.user && state.user.access === 'admin',
    authStatus: state => state.status,

    storeLoaded(state) {
      return state.storeLoaded;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    email(state) {
      if (state.user) {
        return state.user.email;
      }
      return null;
    },
    userId(state) {
      if (state.user) {
        return state.user.email;
      }
      return null;
    },
    user(state) {
      if (state.user) {
        return state.user;
      }
      return null;
    },
    role(state) {
      if (state.user) {
        return state.user.access;
      }
      return null;
    },
    currentItem(state) {
      return state.currentItem;
    },
    showFileOperations(state) {
      return state.showFileOperations;
    },
    getNefItemsToDelete(state) {
      return state.nefItemsToDelete;
    },
    getShowVideos(state) {
      return state.showVideos;
    },
    getShowPictures(state) {
      return state.showPictures;
    },
    getItemsSelected(state) {
      return state.itemsSelected;
    },
    getNumberOfItemsSelected(state) {
      return state.itemsSelected ? Object.keys(state.itemsSelected).length : 0;
    },

  },
});

store.subscribe((mutation, state) => {
  const itemsToStore = {
    version: state.version,
    user: state.user,
    token: state.token,
    status: state.status,
    showFileOperations: state.showFileOperations,
    showVideos: state.showVideos,
    showPictures: state.showPictures,
    nefItemsToDelete: state.nefItemsToDelete,
    itemsSelected: state.itemsSelected,
  };

  localStorage.setItem('store', JSON.stringify(itemsToStore));
});

export default store;
