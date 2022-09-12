<script>
import axios from "axios";

export default {
  data: function () {
    return {
      tournaments: [],
    };
  },
  created: function () {
    this.getTournament();
  },

  methods: {
    getTournament: function () {
      axios.get("/tournaments.json").then((response) => {
        const tourns = response.data;
        this.tournaments = tourns;
        console.log(this.tournaments);
      });
    },

    convertDate: function (value) {
      let dateStr = value.split("-")[1] + "/" + value.split("-")[2] + "/" + value.split("-")[0];
      return dateStr;
    },
  },
};
</script>

<style>
.all-tournament-container {
  padding: 200px 0px 150px 0px;
  text-align: center;
  color: white;
  text-align: center;
  font-size: 12px;
  margin: 0 auto;
}

.all-tournament-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  width: 70%;
  margin: 0 auto;
}

.inside-all {
  margin: 0 auto;
  padding: 60px 0px;
  border: 4px solid gray;
  margin: 0 auto;
  color: #d5d5d5;
  text-decoration: none !important;
  box-shadow: none;
  background-color: gray;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

a {
  text-decoration: none;
}

.inside-all:hover {
  background-color: #798690;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.6) inset;
}

.inner-stuff {
  text-decoration: none !important;
}
</style>

<template>
  <div class="all-tournament-container">
    <div class="all-tournament-wrapper">
      <div v-for="tournament in tournaments" v-bind:key="tournament">
        <a href="">
          <div class="inside-all">
            <div class="inner-stuff" style="font-weight: bold; font-size: 18px; color: white">
              {{ tournament.tournament_name }}
            </div>
            <div class="inner-stuff">{{ tournament.street_address }}</div>
            <div class="inner-stuff">{{ tournament.city + " " + tournament.state + " " + tournament.zipcode }}</div>
            <div class="inner-stuff">{{ convertDate(tournament.date) }}</div>
            <div class="gallery-links d-flex align-items-center justify-content-center"></div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
