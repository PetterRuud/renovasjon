<template>
  <div>
    <div class="search">
      <vue-autosuggest
        ref="autocomplete"
        :suggestions="suggestions"
        :input-props="inputProps"
        :render-suggestion="renderSuggestion"
        :get-suggestion-value="getSuggestionValue"
        @input="getAdresses"
        @selected="onSelected"
      />
    </div>
    <div v-if="loading">Laster</div>
    <div class="flex">
      <div class="type" v-bind:key="tømmedag.FraksjonId" v-for="tømmedag in tømmedager">
        <h3>{{tømmedag.FraksjonId | getTypeTømming}}</h3>
        <div v-bind:key="dag" v-for="dag in tømmedag.Tommedatoer">
          <div class="day">{{dag | formaterDato}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueAutosuggest } from "vue-autosuggest";

export default {
  name: "Tømmedager",
  components: {
    VueAutosuggest
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
    onSelected: async function(item) {
      this.loading = true;
      this.tømmedager = await this.getTømmedager(item.item);
      this.loading = false;
    },

    getSuggestionValue(suggestion) {
      return suggestion.item.name;
    },

    renderSuggestion(suggestion) {
      return suggestion.item.name;
    },

    getAdresses: async function(value) {
      try {

        const response = await fetch(
          `https://services.webatlas.no/GISLINE.Web.Services.Search.SOLR3.0/Service.svc/json/addressWeighted?searchString=${value}&municipality=${this.municipality}&weightedMunicipality=${this.municipality}&firstIndex=0&maxNoOfResults=20&language=NO&coordsys=84&clientID=Android-Renovasjon-0213`,
          {
            method: "GET",
            headers: {
              Connection: "keep-alive",
              "Accept-Encoding": "gzip, deflate",
              Host: "services.webatlas.no"
            }
          }
        );

        const result = await response.json();
        const addresser = result.AddressSearchResult.Roads.map(road =>
          road.Addresses.map(adress => {
            return {
              id: adress.id,
              name: `${road.RoadName} ${adress.House}`,
              coordinates: adress.Coordinate,
              gid: adress.GID,
              place: adress.PostalPlace,
              zip: adress.Zip,
              road: road.RoadName,
              roadId: road.Id,
              house: adress.House,
              municipalityName: road.MunicipalityName,
              municipalityNo: road.MunicipalityNo
            };
          })
        );

        this.suggestions = [{ data: (addresser || [])[0] }];

        return "Got it!";
      } catch (error) {
        throw new Error(error);
      }
    },

    getTømmedager: async value => {
      const { municipalityNo, road, roadId, house } = value;
      try {
        const response = await fetch(
          `https://norkartrenovasjon.azurewebsites.net/proxyserver.ashx?server=https://komteksky.norkart.no/komtek.renovasjonwebapi/api/tommekalender/?kommunenr=${municipalityNo}&gatenavn=${encodeURI(
            road
          )}&gatekode=${roadId}&husnr=${house}`,
          {
            method: "GET",
            // mode: 'cors',
            headers: {
              "Sec-Fetch-Mode": "cors",
              RenovasjonAppKey: "AE13DEEC-804F-4615-A74E-B4FAC11F0A30",
              Kommunenr: municipalityNo,
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
      loading: false,
      tømmedager: [],
      results: [],
      timeout: null,
      selected: null,
      debounceMilliseconds: 50,
      suggestions: [],
      municipality: '3020',
      inputProps: {
        id: "autosuggest__input",
        placeholder: "Din adresse"
      }
    };
  }
};
</script>

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
