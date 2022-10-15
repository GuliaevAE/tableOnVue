/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import { createStore } from 'vuex'
import mix from './components/Mixins/datamix.js'

const store = createStore({
    state() {
        return {
            datas: mix.objs,
            sort: '',
            afterfirstfilt: mix.objs,
            aftersecondfilt: mix.objs,
            pages:[]
        }
    },
    mutations: {
        pagenumber(state){
            let numberOfPages = Math.ceil(state.datas.length/5)
            let allpages= [] 
            for(let i=0; i<numberOfPages; i++){
                allpages.push(i*5)
            }
            state.pages=allpages
              
        },
        sortering(state, sort) {
            if (state.sort === sort) {
                state.datas.sort((a, b) => a[sort] < b[sort] ? 1 : -1)
                state.sort = ''
            } else {
                state.datas.sort((a, b) => b[sort] < a[sort] ? 1 : -1)
                state.sort = sort
            }
        },
        filtering(state, filt) {
            if (filt.inp === '') {
                state.afterfirstfilt = mix.objs
                return state.datas = state.aftersecondfilt
            }
            if (filt.col === 'Название' || filt.col === 'Дата') {
                state.afterfirstfilt = mix.objs.filter(x => x[filt.col].indexOf(filt.inp) !== -1)
                return state.datas = state.aftersecondfilt.filter(x => x[filt.col].indexOf(filt.inp) !== -1)
            } else {

                switch (filt.simb) {
                    case '<':
                        state.afterfirstfilt = mix.objs.filter(x => x[filt.col] < filt.inp)
                        return state.datas = state.aftersecondfilt.filter(x => x[filt.col] < filt.inp)
                    case '>':
                        state.afterfirstfilt = mix.objs.filter(x => x[filt.col] > filt.inp)
                        return state.datas = state.aftersecondfilt.filter(x => x[filt.col] > filt.inp)
                    case '=':
                        state.afterfirstfilt = mix.objs.filter(x => x[filt.col] == filt.inp)
                        return state.datas = state.aftersecondfilt.filter(x => x[filt.col] == filt.inp)
                }
            }
        },
        filteringTwice(state, filt) {
            if (filt.inp === '') {
                state.aftersecondfilt = mix.objs
                return state.datas = state.afterfirstfilt
            }
            if (filt.col === 'Название' || filt.col === 'Дата') {
                state.aftersecondfilt = mix.objs.filter(x => x[filt.col].indexOf(filt.inp) !== -1)
                return state.datas = state.afterfirstfilt.filter(x => x[filt.col].indexOf(filt.inp) !== -1)
            } else {

                switch (filt.simb) {
                    case '<':
                        state.aftersecondfilt = mix.objs.filter(x => x[filt.col] < filt.inp)
                        return state.datas = state.afterfirstfilt.filter(x => x[filt.col] < filt.inp)
                    case '>':
                        state.aftersecondfilt = mix.objs.filter(x => x[filt.col] > filt.inp)
                        return state.datas = state.afterfirstfilt.filter(x => x[filt.col] > filt.inp)
                    case '=':
                        state.aftersecondfilt = mix.objs.filter(x => x[filt.col] == filt.inp)
                        return state.datas = state.afterfirstfilt.filter(x => x[filt.col] == filt.inp)
                }
            }
        }
    }
})

import App from "./App.vue";
createApp(App).use(store).mount("#app");
