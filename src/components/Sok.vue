<template>
  <div class="search">
    <vue-autosuggest
      ref="autocomplete"
      :suggestions="suggestions"
      :input-props="inputProps"
      :render-suggestion="renderSuggestion"
      :get-suggestion-value="getSuggestionValue"
      @input="fetchResults"
      @selected="onSelected"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { VueAutosuggest } from "vue-autosuggest";
export default {
  name: "Søk",
  components: {
    VueAutosuggest
  },

  methods: {
    onSelected(item) {
      console.log("item", item);
      this.selected = item.item;
    },

    getSuggestionValue(suggestion) {
      // console.log("suggestion", suggestion);
      return suggestion.item.name;
    },

    renderSuggestion(suggestion) {
      // console.log("suggestion", suggestion);
      return suggestion.item.name;
    },

    fetchResults: function(value) {
      /*try {

        const response = await fetch(
          `https://services.webatlas.no/GISLINE.Web.Services.Search.SOLR3.0/Service.svc/json/addressWeighted?searchString=${value}&municipality=0213&weightedMunicipality=0213&firstIndex=0&maxNoOfResults=20&language=NO&coordsys=84&clientID=Android-Renovasjon-0213`,
          {
            method: "GET",
            headers: {
              Connection: "keep-alive",
              "Accept-Encoding": "gzip, deflate",
              Host: "services.webatlas.no",
            }
          }
        );
        const result = await response.json();
        */
      const result = [
        {
          AddressSearchResult: {
            Roads: [
              {
                Addresses: [
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.725139510017435,
                      Y: 10.843017791518545
                    },
                    GID: "02130013102140000000",
                    House: "1A",
                    Id: "0213082000001   A000",
                    PostalPlace: "SKI",
                    PropertyType: "AM",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.725074939150851,
                      Y: 10.843138737017569
                    },
                    GID: "02130013102140000000",
                    House: "1B",
                    Id: "0213082000001   B000",
                    PostalPlace: "SKI",
                    PropertyType: "AM",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.725169428874359,
                      Y: 10.842165730654388
                    },
                    GID: "02130013301940000000",
                    House: "2",
                    Id: "0213082000002    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.72641470159089,
                      Y: 10.843674910314995
                    },
                    GID: "02130013200200000000",
                    House: "3",
                    Id: "0213082000003    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.725397542963073,
                      Y: 10.841911492121582
                    },
                    GID: "02130013301950000000",
                    House: "4",
                    Id: "0213082000004    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727256344598374,
                      Y: 10.84450385773663
                    },
                    GID: "02130013201730000000",
                    House: "5A",
                    Id: "0213082000005   A000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726982102389954,
                      Y: 10.844844484485661
                    },
                    GID: "02130013203460000000",
                    House: "5B",
                    Id: "0213082000005   B000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.725883189867758,
                      Y: 10.841867056734552
                    },
                    GID: "02130013000050000000",
                    House: "6A",
                    Id: "0213082000006   A000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.725597485412479,
                      Y: 10.841744630036665
                    },
                    GID: "02130013000150000000",
                    House: "6B",
                    Id: "0213082000006   B000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.725881193070833,
                      Y: 10.841368940597478
                    },
                    GID: "02130013000160000000",
                    House: "6C",
                    Id: "0213082000006   C000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726187588985105,
                      Y: 10.841296855734148
                    },
                    GID: "02130013000170000000",
                    House: "6D",
                    Id: "0213082000006   D000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726161414781593,
                      Y: 10.84188235766463
                    },
                    GID: "02130013000180000000",
                    House: "6E",
                    Id: "0213082000006   E000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727191273092423,
                      Y: 10.844660353714676
                    },
                    GID: "02130013201730000000",
                    House: "7",
                    Id: "0213082000007    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.72554562929249,
                      Y: 10.84288006745539
                    },
                    GID: "02130013200040000000",
                    House: "8",
                    Id: "0213082000008    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727197751589451,
                      Y: 10.84483857710322
                    },
                    GID: "02130013201730000000",
                    House: "9",
                    Id: "0213082000009    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726067675186549,
                      Y: 10.842802076662267
                    },
                    GID: "02130013200890000000",
                    House: "10",
                    Id: "0213082000010    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727168080239764,
                      Y: 10.845032595669654
                    },
                    GID: "02130013201730000000",
                    House: "11",
                    Id: "0213082000011    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726482270469909,
                      Y: 10.842700385262198
                    },
                    GID: "02130013201880000000",
                    House: "12",
                    Id: "0213082000012    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727167081473951,
                      Y: 10.845103687206505
                    },
                    GID: "02130013201730000000",
                    House: "13",
                    Id: "0213082000013    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726391772428521,
                      Y: 10.842748764679861
                    },
                    GID: "02130013201890000000",
                    House: "14",
                    Id: "0213082000014    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727174807941523,
                      Y: 10.84519304611057
                    },
                    GID: "02130013201730000000",
                    House: "15",
                    Id: "0213082000015    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726292299377185,
                      Y: 10.842796650009486
                    },
                    GID: "02130013201900000000",
                    House: "16",
                    Id: "0213082000016    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727173559369653,
                      Y: 10.845281910540681
                    },
                    GID: "02130013201730000000",
                    House: "17",
                    Id: "0213082000017    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.7262444338858,
                      Y: 10.842367149004659
                    },
                    GID: "02130013201820000000",
                    House: "18",
                    Id: "0213082000018    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727199235671634,
                      Y: 10.84537225857753
                    },
                    GID: "02130013201730000000",
                    House: "19",
                    Id: "0213082000019    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726326455427774,
                      Y: 10.842282730124211
                    },
                    GID: "02130013201830000000",
                    House: "20",
                    Id: "0213082000020    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727189012000686,
                      Y: 10.845460628501222
                    },
                    GID: "02130013201730000000",
                    House: "21",
                    Id: "0213082000021    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726497977562943,
                      Y: 10.842221020133232
                    },
                    GID: "02130013201840000000",
                    House: "22",
                    Id: "0213082000022    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727186014892411,
                      Y: 10.845673903178779
                    },
                    GID: "02130013201730000000",
                    House: "23",
                    Id: "0213082000023    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726605428192833,
                      Y: 10.842244716936634
                    },
                    GID: "02130013201850000000",
                    House: "24",
                    Id: "0213082000024    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727167065827174,
                      Y: 10.845744005452257
                    },
                    GID: "02130013201730000000",
                    House: "25",
                    Id: "0213082000025    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.7267136267399,
                      Y: 10.842215095884185
                    },
                    GID: "02130013201860000000",
                    House: "26",
                    Id: "0213082000026    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.72717479185841,
                      Y: 10.845833364495805
                    },
                    GID: "02130013201730000000",
                    House: "27",
                    Id: "0213082000027    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726689443395387,
                      Y: 10.842658424980996
                    },
                    GID: "02130013201870000000",
                    House: "28",
                    Id: "0213082000028    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727173792659215,
                      Y: 10.845904456014869
                    },
                    GID: "02130013201730000000",
                    House: "29",
                    Id: "0213082000029    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.726940992540968,
                      Y: 10.842654478757117
                    },
                    GID: "02130013200330000000",
                    House: "30",
                    Id: "0213082000030    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727181768396484,
                      Y: 10.845976042228848
                    },
                    GID: "02130013201730000000",
                    House: "31",
                    Id: "0213082000031    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727176337185149,
                      Y: 10.842525134499063
                    },
                    GID: "02130013200320000000",
                    House: "32A",
                    Id: "0213082000032   A000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727301737726755,
                      Y: 10.842549820366303
                    },
                    GID: "02130013200320000000",
                    House: "32B",
                    Id: "0213082000032   B000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727171544320413,
                      Y: 10.846064411914613
                    },
                    GID: "02130013201730000000",
                    House: "33",
                    Id: "0213082000033    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727560516324736,
                      Y: 10.842670778953341
                    },
                    GID: "02130013201940000000",
                    House: "34",
                    Id: "0213082000034    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727559265199169,
                      Y: 10.843399970491644
                    },
                    GID: "02130013201630000000",
                    House: "36",
                    Id: "0213082000036    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727444819222619,
                      Y: 10.844514238254465
                    },
                    GID: "02130013201730000000",
                    House: "38",
                    Id: "0213082000038    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727559996233225,
                      Y: 10.844627302944222
                    },
                    GID: "02130013201730000000",
                    House: "40",
                    Id: "0213082000040    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727415647626842,
                      Y: 10.844672712505437
                    },
                    GID: "02130013201730000000",
                    House: "42",
                    Id: "0213082000042    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727531074152324,
                      Y: 10.844768004557349
                    },
                    GID: "02130013201730000000",
                    House: "44",
                    Id: "0213082000044    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727427855262022,
                      Y: 10.84508248080849
                    },
                    GID: "02130013201730000000",
                    House: "46",
                    Id: "0213082000046    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727534306504594,
                      Y: 10.845177279809359
                    },
                    GID: "02130013201730000000",
                    House: "48",
                    Id: "0213082000048    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727407907675932,
                      Y: 10.845223675969214
                    },
                    GID: "02130013201730000000",
                    House: "50",
                    Id: "0213082000050    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727514358815064,
                      Y: 10.845318475359287
                    },
                    GID: "02130013201730000000",
                    House: "52",
                    Id: "0213082000052    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727410389299109,
                      Y: 10.845686268755136
                    },
                    GID: "02130013201730000000",
                    House: "54",
                    Id: "0213082000054    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.72752581507266,
                      Y: 10.845781564270984
                    },
                    GID: "02130013201730000000",
                    House: "56",
                    Id: "0213082000056    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.72738121629471,
                      Y: 10.845844741796348
                    },
                    GID: "02130013201730000000",
                    House: "58",
                    Id: "0213082000058    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  },
                  {
                    Coordinate: {
                      CRS: 4326,
                      X: 59.727487417165513,
                      Y: 10.845957316119971
                    },
                    GID: "02130013201730000000",
                    House: "60",
                    Id: "0213082000060    000",
                    PostalPlace: "SKI",
                    PropertyType: "G",
                    RoadName: "",
                    Type: "O",
                    Zip: "1400"
                  }
                ],
                Id: "021308200",
                MunicipalityName: "Ski",
                MunicipalityNo: 213,
                RoadBoundingBox: {
                  NorthEast: {
                    CRS: 4326,
                    X: 59.7276685106553,
                    Y: 10.846007589222026
                  },
                  NorthWest: {
                    CRS: 4326,
                    X: 59.725015215365254,
                    Y: 10.846007589222026
                  },
                  SouthEast: {
                    CRS: 4326,
                    X: 59.7276685106553,
                    Y: 10.841441026109894
                  },
                  SouthWest: {
                    CRS: 4326,
                    X: 59.725015215365254,
                    Y: 10.841441026109894
                  }
                },
                RoadName: "Vardåsveien",
                RoadNo: 8200
              }
            ],
            SearchInfoSummary: {
              AlternateQuery: null,
              FirstResultIndex: 0,
              LastResultIndex: 0,
              Message: "",
              MessageType: "Info",
              NoOfResults: 1,
              OriginalQuery: "vardåsveien",
              QueryTime: 16
            }
          }
        }
      ];

      const addresser = result[0].AddressSearchResult.Roads.map(road =>
        road.Addresses.map(adress => {
          return {
            id: adress.id,
            name: `${road.RoadName} ${adress.House}`,
            coordinates: adress.Coordinate,
            gid: adress.GID,
            place: adress.PostalPlace,
            zip: adress.Zip,
            road: road.RoadName,
            house: adress.House
          };
        })
      );

      this.suggestions = [{ data: addresser[0] }];

      console.log("adr", this.suggestions);
      return "Got it!";
      /*} catch (error) {
        throw new Error(error);
      }*/
    }
  },

  data() {
    return {
      results: [],
      timeout: null,
      selected: null,
      debounceMilliseconds: 50,
      suggestions: [],
      inputProps: {
        id: "autosuggest__input",
        placeholder: "Din adresse",
        class: "form-control",
        name: "hello"
      }
    };
  }
};
</script>

<style>
#autosuggest__input {
  outline: none;
  position: relative;
  display: block;
  border: 1px solid #616161;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

#autosuggest__input.autosuggest__input-open {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.autosuggest__results-container {
  position: relative;
  width: 100%;
}

.autosuggest__results {
  font-weight: 300;
  margin: 0;
  position: absolute;
  z-index: 10000001;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background: white;
  padding: 0px;
  max-height: 400px;
  overflow-y: scroll;
}

.autosuggest__results ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.autosuggest__results .autosuggest__results_item {
  cursor: pointer;
  padding: 15px;
}

#autosuggest ul:nth-child(1) > .autosuggest__results_title {
  border-top: none;
}

.autosuggest__results .autosuggest__results_title {
  color: gray;
  font-size: 11px;
  margin-left: 0;
  padding: 15px 13px 5px;
  border-top: 1px solid lightgray;
}

.autosuggest__results .autosuggest__results_item:active,
.autosuggest__results .autosuggest__results_item:hover,
.autosuggest__results .autosuggest__results_item:focus,
.autosuggest__results
  .autosuggest__results_item.autosuggest__results_item-highlighted {
  background-color: #f6f6f6;
}
</style>