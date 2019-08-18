<template>
  <div class="flex">
    <div class="type" v-bind:key="tømmedag.FraksjonId" v-for="tømmedag in tømmedager">
      <h3>{{tømmedag.FraksjonId | getTypeTømming}}</h3>
      <div v-bind:key="dag" v-for="dag in tømmedag.Tommedatoer">
        <div class="day">{{dag | formaterDato}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tømmedager",

  async created() {
    this.tømmedager = await this.getTømmedager();
  },

  filters: {
    formaterDato: value => {
      const date = new Date(value);
      const year = date.getFullYear();
      const month =
        date.getMonth() + 1 <= 9
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1;
      const day = date.getDate() <= 9 ? `0${date.getDate()}` : date.getDate();

      return `${day}.${month}.${year}`;
    },

    getTypeTømming: value => {
      let typeTømming = "";
      switch (value) {
        case 1:
          typeTømming = "Restavfall";
          break;
        case 2:
          typeTømming = "Papir";
          break;
        case 21:
          typeTømming = "Hageavfall";
          break;
      }
      return typeTømming;
    }
  },

  methods: {
    getTømmedager: async value => {
      const { kommunenr, gatenavn, gatekode, husnr } = value;
      try {
        const response = await fetch(
          `https://norkartrenovasjon.azurewebsites.net/proxyserver.ashx?server=https://komteksky.norkart.no/komtek.renovasjonwebapi/api/tommekalender/?kommunenr=${kommunenr}&gatenavn=${gatenavn}&gatekode=${gatekode}&husnr=${husnr}`,
          {
            method: "GET",
            // mode: 'cors',
            headers: {
              "Sec-Fetch-Mode": "cors",
              RenovasjonAppKey: "AE13DEEC-804F-4615-A74E-B4FAC11F0A30",
              Kommunenr: kommunenr,
              DNT: "1",
              Referer: "https://www.folloren.no/",
              "Content-Type": "application/json"
            }
          }
        );
        return await response.json();
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  data() {
    return {
      tømmedager: []
    };
  },

  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flex {
  display: flex;
  justify-content: center;
}

.type {
  margin: 0 30px;
}

.day {
  margin-bottom: 6px;
}
</style>
