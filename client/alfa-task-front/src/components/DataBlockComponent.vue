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
        <!-- ВСТАВИТЬ ДАННЫЕ -->
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
    },
  },
  methods: {
    async fetchTopFive() {
      try {
        const response = await axios.get("http://localhost:3000/api/getData");
        this.dataTop = response.data.slice(0, 5);
        const transformedData = this.transformedData(this.dataTop);
        this.dataSort(transformedData);
      } catch (e) {
        console.error("Ошибка загрузки данных с сервера", e);
      }
    },
    transformedData(responseData) {
      return responseData.map(item => {
        const resources = JSON.parse(item.resources);
        const coins = resources.find(resource => resource.resource === "MONEY").value;
        const experience = resources.find(resource => resource.resource === "ACTIVERATE").value +
            resources.find(resource => resource.resource === "PASSIVERATE").value;

        return {
          fio: item.fio,
          status: item.level,
          experience: experience,
          coins: coins
        }
      });
    },
    dataSort(data) {
      data.sort((a, b) => {
        if (a.experience === b.experience) {
          return b.coins - a.coins;
        }
        return b.experience - a.experience;
      });
    }
  },
};
</script>
