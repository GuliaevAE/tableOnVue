<script setup>

</script>

<template>
  <table>
    <tr>
      <th>
        <h2>Дата</h2>
      </th>
      <th>
        <h2 @click="this.$store.commit('sortering', 'Название' )">Название</h2>
      </th>
      <th>
        <h2 @click="this.$store.commit('sortering', 'Количество' )">Количество</h2>
      </th>
      <th>
        <h2 @click="this.$store.commit('sortering', 'Расстояние' )">Расстояние</h2>
      </th>
    </tr>
    <TransitionGroup name="list">
      <tr v-for="(item, key) in $store.state.datas.slice(page, page+5)" :key="key">
        <th>{{item.Дата}}</th>
        <th>{{item.Название}}</th>
        <th class="шт">{{item.Количество}}</th>
        <th class="м">{{item.Расстояние}}</th>
      </tr>
    </TransitionGroup>
  </table>

  <div class="pagination">
    <div v-for="item in $store.state.pages" :key="item"  >
      <div :id="item" @click="selectPage" class="selectedpage" v-if="this.page===item">{{item/5+1}}</div>
      <div :id="item" @click="selectPage" v-else="this.page===item">{{item/5+1}}</div>
    </div>

  </div>

  <div style="display:flex;justify-content:space-between">
    <div class="filtmenu">
      <span>Фильтр №1</span><span @click="isFilt1.isOn=!isFilt1.isOn">x</span>
      <Transition name="fade">
        <div v-if="isFilt1.isOn" class="selectsAndInput">
          <select v-model="isFilt1.filtOption.col">
            <option value="Дата">Дата</option>
            <option value="Название">Название</option>
            <option value="Количество">Количество</option>
            <option value="Расстояние">Расстояние</option>
          </select>
          <select v-if="isFilt1.isOn && isFilt1.filtOption.col!=='Название'&&isFilt1.filtOption.col!=='Дата'"
            v-model="isFilt1.filtOption.simb">
            <option value=">">></option>
            <option value="<">&lt</option>
            <option value="=">=</option>
          </select>
          <input id="firstInput" v-if="isFilt1.isOn" type="text" @input="inputchange">
        </div>
      </Transition>

    </div>


    <div class="filtmenu">
      <span>Фильтр №2</span><span @click="isFilt2.isOn=!isFilt2.isOn">x</span>
      <Transition name="fade">
        <div v-if="isFilt2.isOn" class="selectsAndInput">
          <select v-model="isFilt2.filtOption.col">
            <option value="Дата">Дата</option>
            <option value="Название">Название</option>
            <option value="Количество">Количество</option>
            <option value="Расстояние">Расстояние</option>
          </select>
          <select v-if="isFilt2.filtOption.col!=='Название'&&isFilt2.filtOption.col!=='Дата'"
            v-model="isFilt2.filtOption.simb">
            <option value=">">></option>
            <option value="<">&lt</option>
            <option value="=">=</option>
          </select>
          <input id="secondInput" v-if="isFilt2.isOn" type="text" @input="inputchange">
        </div>
      </Transition>
    </div>
  </div>

</template>

<script>
export default {
  data: function () {
    return {
      filt: 'Расстояние',
      isFilt1: { isOn: false, filtOption: { col: 'Дата', simb: '', inp: '' } },
      isFilt2: { isOn: false, filtOption: { col: 'Количество', simb: '', inp: '' } },
      page: 0
    }
  },
  mounted() {
    this.$store.commit('pagenumber')
  },
  methods: {
    inputchange(e) {
      if (e.target.id === "firstInput") {
        this.isFilt1.filtOption.inp = e.target.value
        this.$store.commit('filtering', this.isFilt1.filtOption)
      } else {
        this.isFilt2.filtOption.inp = e.target.value
        this.$store.commit('filteringTwice', this.isFilt2.filtOption)
      }
      this.$store.commit('pagenumber')
    },
    selectPage(e) {
      this.page = Number(e.target.id)
    }
  }
}
</script>

<style>
table {
  background: rgb(220, 220, 220);
  color: black;
  width: 100%;
  border: 2px solid black;
  padding: 10px;
  border-radius: 15px;
}

.selectedpage {
  color: red;
  border:2px solid black;
  height: 20px;
  width: 20px;
  text-align: center;
  font-weight: 800;
}

.filtmenu {
  margin-top: 10px;
  width: 49%;
  background: rgb(220, 220, 220);
  border: 2px solid black;
  border-radius: 15px;
  min-height: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
}

.pagination {
  margin-top: 10px;
  width: 100%;
  background: rgb(220, 220, 220);
  border: 2px solid black;
  border-radius: 15px;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  padding: 5px 0;
}

select,
input {
  width: 95%;
  background: rgba(0, 0, 0, 0);
  font-size: 18px;
  margin: 5px;
  border-radius: 15px
}

.selectsAndInput {
  position: absolute;
  top: 45px;
  background: rgb(220, 220, 220);
  width: 95%;
  border: 2px solid black;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  transform: scaleY(1);
  transition: all .5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-40px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.м::after {
  content: ' м'
}

.шт::after {
  content: ' шт';
}
</style>