<script>
import axios from "axios";

export default {
  data: function () {
    return {
      cancel_edit_btn: true,
      tournamentParams: {},
      playerParams: {},
      standingParams: {},
      errors: [],
      myTournaments: [],
      players: [],
      helperMessage: "",
    };
  },
  created: function () {
    this.getMyTournaments();
  },
  methods: {
    doToTournament: function () {
      // Create new tournament
      if (this.cancel_edit_btn === true) {
        this.errors = [];
        axios
          .post("/tournaments.json", this.tournamentParams)
          .then((response) => {
            console.log("Tournament: ", response);
            this.helperMessage = this.tournamentParams.tournament_name + " has been created";
            this.tournamentParams = {};
            this.getMyTournaments();
          })
          .catch((error) => {
            console.log("tournament create error", error.response.data);
            this.errors.push(error.response.data["message"]);
            this.errors = error.response.data.errors;
            alert(this.errors.join("\n"));
          });
      }
      // Edit tournament
      if (this.cancel_edit_btn === false) {
        let e = document.getElementById("selectedTourn").selectedIndex;
        axios
          .patch("/tournaments/" + this.myTournaments[e].id + ".json", this.tournamentParams)
          .then((response) => {
            console.log("posts create", response);
          })
          .catch((error) => {
            console.log("tournament edit save error", error.response);
            this.errors = error.response.data.errors;
          });
        this.cancel_edit_btn = true;
        this.tournamentParams = {};
        this.helperMessage = "Tournament has been updated";
      }
    },

    addPlayerBtn: function () {
      let e = document.getElementById("selectedTourn").selectedIndex;
      if (e > -1) {
        this.standingParams.tournament_id = this.myTournaments[e]["id"];
        console.log("tourn id: " + this.standingParams.tournament_id);
        axios
          .post("/standings.json", this.standingParams)
          .then((response) => {
            console.log("Standing: ", response);
            this.getTournamentPlayers();
            let element = document.querySelector(".helpermessage-style");
            element.style.color = "green";
            this.helperMessage = "Player has been added";
          })
          .catch((error) => {
            console.log("Standing create error", error.response.data);
            this.errors.push(error.response.data["message"]);
            this.errors = error.response.data.errors;
            let element = document.querySelector(".helpermessage-style");
            element.style.color = "red";
            this.helperMessage = this.errors.join("\n");
          });
      } else {
        let element = document.querySelector(".helpermessage-style");
        element.style.color = "red";
        this.helperMessage = "Please select a tournament first";
      }
    },

    removePlayerBtn: function () {
      let p = document.getElementById("selectedPlayer").selectedIndex;
      if (p > -1) {
        axios.delete("/standings/" + this.players[p].id + ".json").then((response) => {
          console.log("Player Removed!", response.data);

          this.standingParams = {};
          this.players = [];
          this.getTournamentPlayers();
          let element = document.querySelector(".helpermessage-style");
          element.style.color = "green";
          this.helperMessage = "Player has been removed";
        });
      } else {
        let element = document.querySelector(".helpermessage-style");
        element.style.color = "red";
        this.helperMessage = "You must select a tournament first";
      }
    },

    clickDeleteBtn: function () {
      let e = document.getElementById("selectedTourn").selectedIndex;
      axios.delete("/tournaments/" + this.myTournaments[e].id + ".json").then((response) => {
        console.log("Tournament Deleted!", response.data);
      });
      this.getMyTournaments();
      let element = document.querySelector(".helpermessage-style");
      element.style.color = "green";
      this.helperMessage = "Tournament has been removed";
      this.tournamentParams = {};
      this.getMyTournaments();
    },

    getMyTournaments: function () {
      axios.get("/tournaments.json").then((response) => {
        const tourns = response.data;
        this.myTournaments = tourns.filter((tourn) => tourn.admin_user_id == localStorage.user);
        for (var i = 0; i < this.myTournaments.length; i++) {
          this.myTournaments[i]["start_time"] = this.myTournaments[i]["start_time"].split("T").pop().split(".")[0];
        }
      });
    },

    getTournamentPlayers: function () {
      this.helperMessage = "";
      let e = document.getElementById("selectedTourn").selectedIndex;
      axios.get("/standings.json").then((response) => {
        const standings = response.data;
        let tempPlayerArray = standings.filter((standing) => standing.tournament_id == this.myTournaments[e].id);
        this.players = tempPlayerArray.filter((v, i, a) => a.findIndex((v2) => v2["user_id"] === v["user_id"]) === i);
      });
    },

    clickCancelBtn: function () {
      this.tournamentParams = {};
      document.getElementById("selectedTourn").selectedIndex = -1;
      this.cancel_edit_btn = true;
      document.getElementById("add-player-input").selectedIndex = -1;
    },

    clickEditBtn: function () {
      this.helperMessage = "";
      let e = document.getElementById("selectedTourn").selectedIndex;
      if (e >= null) {
        this.tournamentParams = this.myTournaments[e];
        this.cancel_edit_btn = false;
      } else {
        let element = document.querySelector(".helpermessage-style");
        element.style.color = "red";
        this.helperMessage = "You must select a tournament first";
      }
    },
  },
};
</script>

<template>
  <div class="create-tournament">
    <div class="createtournament-container-box">
      <div class="container-title">My Tournaments</div>
      <!-- create tournament  -->
      <div style="color: gray; text-align: center; padding: 20px 0px 0px 0px; height: 20px">
        <label class="form-label helpermessage-style">{{ helperMessage }}</label>
      </div>
      <div id="edit_is_true">
        <form v-on:submit.prevent="doToTournament()">
          <!--  -->
          <div class="container1">
            <!-------- Name --------->
            <label class="form-label" style="color: gray">Tournament Info</label>

            <div style="text-align: left; padding-bottom: 10px">
              <input
                type="text"
                placeholder="Tournament Name"
                v-model="tournamentParams.tournament_name"
                class="input-box create-inputs"
                style="width: 410px"
              />
            </div>

            <!-------- Start Date & Start Time --------->
            <div style="display: inline-block; padding-bottom: 10px">
              <div style="text-align: left; float: left; width: 200px; padding-right: 5px">
                <input type="date" v-model="tournamentParams.date" class="input-box create-inputs" />
              </div>
              <div style="text-align: left; float: right; width: 200px; padding-left: 5px">
                <input type="time" class="input-box create-inputs" v-model="tournamentParams.start_time" />
              </div>
            </div>

            <!-------- Address & City --------->
            <div style="display: inline-block; padding-bottom: 10px">
              <div style="text-align: left; float: left; width: 200px; padding-right: 5px">
                <input
                  type="text"
                  class="input-box create-inputs"
                  v-model="tournamentParams.street_address"
                  placeholder="Address"
                />
              </div>
              <div style="text-align: left; float: right; width: 200px; padding-left: 5px">
                <input type="text" v-model="tournamentParams.city" class="input-box create-inputs" placeholder="City" />
              </div>
            </div>

            <!-------- State & Zipcode --------->
            <div style="display: inline-block; padding-bottom: 10px">
              <div style="text-align: left; float: left; width: 200px; padding-right: 5px">
                <input
                  type="state"
                  class="input-box create-inputs"
                  v-model="tournamentParams.state"
                  placeholder="State"
                />
              </div>
              <div style="text-align: left; float: right; width: 200px; padding-left: 5px">
                <input
                  type="text"
                  v-model="tournamentParams.zipcode"
                  class="input-box create-inputs"
                  placeholder="Zipcode"
                />
              </div>
            </div>

            <!-------- Details --------->
            <div style="text-align: left; width: 400px; padding-bottom: 10px">
              <textarea
                style="
                  height: 89px !important;
                  width: 388px !important;
                  resize: none;
                  border-radius: 5px;
                  padding: 10px;
                "
                type="text"
                class="input-box create-inputs"
                v-model="tournamentParams.details"
                placeholder="Details"
              ></textarea>
            </div>

            <!-------- Create & Cancel buttons --------->
            <div style="display: inline-block; text-align: left; float: left">
              <!----- Create new ------->
              <input
                type="submit"
                class="cancel-btn"
                value="Create"
                style="float: left; width: 200px !important"
                v-if="cancel_edit_btn === true"
                v-on:click="cancel_edit_btn()"
              />
              <!----- Save ------->
              <input
                type="submit"
                class="cancel-btn"
                value="Save"
                style="float: left; width: 200px !important"
                v-if="cancel_edit_btn === false"
                v-on:click="cancel_cancel_btn()"
              />
              <div class="cancel_btn" style="float: right; padding-left: 10px; float: right">
                <button
                  class="cancel-btn"
                  v-if="cancel_edit_btn === false"
                  v-on:click="clickCancelBtn()"
                  style="width: 200px !important"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
        <div class="container2">
          <div>
            <label class="form-label" style="color: gray">My Tournaments</label>
            <!-- Tournaments Selector -->
            <select id="selectedTourn" class="choicebox input-box" size="6" v-on:change="getTournamentPlayers()">
              <template v-for="tournament in myTournaments" :key="tournament">
                <option>{{ tournament.tournament_name }}</option>
              </template>
            </select>
            <div style="height: 40px; text-align: center">
              <button
                id="edit-tourn-btn"
                class="small-edit-btn"
                v-if="cancel_edit_btn === true"
                v-on:click="clickEditBtn()"
              >
                Edit Tournament
              </button>
              <button
                id="edit-tourn-btn"
                class="edit-btn"
                v-if="cancel_edit_btn === false"
                v-on:click="clickDeleteBtn()"
              >
                Delete Tournament
              </button>
            </div>
            <label class="form-label" style="color: gray">Player List</label>
            <br />
            <input
              id="add-player-input"
              type="text"
              placeholder="Player ID"
              v-model="standingParams.user_id"
              style="width: 100px; height: 25px"
            />
            <button
              id="edit-tourn-btn"
              class="small-edit-btn"
              v-if="cancel_edit_btn === true"
              v-on:click="addPlayerBtn()"
            >
              Add Player
            </button>
            <!-- Players Selector -->
            <select id="selectedPlayer" class="choicebox input-box" size="6">
              <template v-for="player in players" :key="player">
                <option>{{ player.user.first_name + " " + player.user.last_name }}</option>
              </template>
            </select>
          </div>

          <div style="padding: 0px 0px 0px 0px; text-align: center">
            <button
              id="edit-tourn-btn"
              class="small-edit-btn"
              v-if="cancel_edit_btn === true"
              v-on:click="removePlayerBtn()"
            >
              Remove Player
            </button>
          </div>
          <div style="padding: 8px 0px 0px 0px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.helpermessage-style {
}

.cancel-btn {
  width: 195px !important;
  height: 38px;
  color: white;
  background-color: #0091d1;
  border-radius: 5px;
  border: 1px solid #777676;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 14px;
}

.create-inputs {
  height: 30px !important;
}

.create-container {
  display: block;
  margin: 0 auto;
  width: 80%;
  padding: 30px 0px 0px 0px;
}

.container1 {
  width: 410px;
  float: left;
  text-align: left;
  padding: 0px 0px 0px 0px;
  margin-left: 70px;
}

.error-display {
  color: red;
  font-size: 10px;
}

.container2 {
  float: right;
  width: 200px;
  margin-right: 70px;
}

.edit-btn {
  width: 200px !important;
  height: 38px;
  color: white;
  background-color: #0091d1;
  border-radius: 5px;
  border: 1px solid #777676;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 14px;
  margin: 0 auto;
}

.small-edit-btn {
  border: none;
  background: none;
  color: #0091d1;
}

.choicebox {
  width: 200px;
  border: none;
  padding: 10px;
  border-radius: 5px;
}

.create-tourn-btn {
  color: white;
  background-color: #0091d1;
  border-radius: 5px;
  border: 1px solid #777676;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 14px;
}

.create-tournament {
  margin: auto;
  padding: 150px 0px 0px 0px;
  position: absolute;
  z-index: -100;
  width: 100%;
}
.createtournament-container-box {
  border: 1px red solid;
  margin: auto;
  padding: 0px 0px 0px 0px;
  background-color: #d9d9d9;
  height: 500px;
  width: 800px;
  text-align: left;
  border-radius: 15px;
  border: solid 2px #0091d1;
  list-style: none;
}

.createtournament-container-box li {
  padding: 0px 40px;
}
.createtournament-container-box input {
  height: 38px;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #777676;
  box-sizing: border-box;
}
</style>
