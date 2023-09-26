<template>
  <div class="container">
    <div class="text-center mt-3">
      <h2>Блок данных</h2>
      <div v-if="currentRoute === '#home'">
        <h3>Главная страница!</h3>
      </div>
      <table v-else class="table table-bordered mt-3" style="max-width: 800px; margin: 0 auto;">
        <thead>
        <tr>
          <th>Место</th>
          <th>ФИО</th>
          <th>Статус</th>
          <th>Опыт</th>
          <th>Монеты</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in dataTop" :key="index">
          <td>{{ item.place }}</td>
          <td>{{ item.fio }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.experience }}</td>
          <td>{{ item.coins }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      currentRoute: this.$route.hash,
      dataTop: [],
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$route.hash;
      if (this.currentRoute === "#top") {
        this.fetchTopFive();
      }
      if (this.currentRoute === "#full") {
        this.fetchAllData();
      }
    },
  },
  methods: {
    async fetchTopFive() {
      try {
        const response = await axios.get("http://localhost:3000/api/getData");
        this.dataTop = response.data;
        const transformedData = this.transformedData(this.dataTop);
        this.dataSort(transformedData);
        const endIndex = transformedData.findIndex(item => item.place === 6);
        this.dataTop = transformedData.slice(0, endIndex);
      } catch (e) {
        console.error("Ошибка загрузки данных с сервера", e);
      }
    },
    transformedData(responseData) {
      return responseData.map((item) => {
        const resources = JSON.parse(item.resources);
        const coins = resources.find(resource => resource.resource === "MONEY").value;
        const experience = resources.find(resource => resource.resource === "ACTIVERATE").value +
            resources.find(resource => resource.resource === "PASSIVERATE").value;

        return {
          fio: item.fio,
          status: item.level,
          experience: experience,
          coins: coins,
          place: 0
        };
      });
    },

    dataSort(data) {
      data.sort((a, b) => {
        if (a.experience === b.experience) {
          return b.coins - a.coins;
        }
        return b.experience - a.experience;
      });

      let currentPlace = 1;
      let currentExperience = data[0].experience;
      let currentCoins = data[0].coins;

      for (let i = 0; i < data.length - 1; i++) {
        if ((data[i].experience === currentExperience) && (data[i].coins === currentCoins)) {
          data[i].place = currentPlace;
        } else {
          currentPlace++;
          data[i].place = currentPlace;
          currentExperience = data[i].experience;
          currentCoins = data[i].coins;
        }
      }
    },
    async fetchAllData() {
      try {
        const response = await axios.get("http://localhost:3000/api/getData");
        this.dataTop = response.data;
        this.dataTop = this.transformedData(this.dataTop);
        this.dataSort(this.dataTop);
      } catch (e) {
        console.error("Ошибка загрузки данных с сервера", e);
      }
    }
  },
};
</script>
