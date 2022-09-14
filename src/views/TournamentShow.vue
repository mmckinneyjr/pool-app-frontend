<script>
import axios from "axios";
const defaultRounds = [256, 128, 64, 32, 16, 8, 4, 2, 1];

export default {
  data: function () {
    return {
      brackets: [],
      tournamentID: 1,
      winnerParams: {},
      errors: [],
      helperShowMessage: "",
      isLoggedIn: false,
      title: "",
      players: [],
    };
  },
  mounted: function () {
    this.getTournament();
  },
  computed: {
    rounds() {
      return defaultRounds.filter((rounds) => rounds <= 8);
    },
  },
  methods: {
    getTournament: function () {
      axios.get("/standings.json").then((response) => {
        const tourns = response.data.filter((tourn) => tourn.tournament_id == this.tournamentID);
        this.brackets = tourns;
        this.players = tourns.filter((v, i, a) => a.findIndex((v2) => v2["user_id"] === v["user_id"]) === i);
        console.log(tourns);
        this.title = tourns[0].tournament.tournament_name;
      });
      if (localStorage.user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },

    addWinner: function () {
      let e = document.getElementById("winSelectedPlayer").selectedIndex;
      this.winnerParams.user_id = this.players[e].user_id;

      let tempArray = [];
      for (let x = 0; x < this.brackets.length; x++) {
        if (this.brackets[x].user_id === this.players[e].user_id) {
          tempArray.push(this.brackets[x]);
        }
      }

      this.winnerParams.round = tempArray.sort((a, b) => (a.round < b.round ? 1 : -1))[0].round + 1;
      this.winnerParams.tournament_id = this.tournamentID;
      this.winnerParams.bracket_position = 1;

      axios
        .post("/standings.json", this.winnerParams)
        .then((response) => {
          console.log("Tournament: ", response);
          this.winnerParams = {};
          this.getTournament();
        })
        .catch((error) => {
          console.log("User create error", error.response.data);
          this.errors.push(error.response.data["message"]);
          this.errors = error.response.data.errors;
          this.helperShowMessage = this.errors.sort()[0];
        });

      location.reload();
    },

    removePlayerFromBracket: function (standingId) {
      axios.delete("/standings/" + standingId + ".json").then((response) => {
        console.log("Player Removed!", response.data);
        this.getTournament();
      });

      // alert("Users: ");
    },
  },
};
</script>

<template>
  <div class="tournament-brackets">
    <div class="bracket_container">
      <div style="text-align: right; padding: 0px 100px 30px 0px">
        <br />
        <button v-on:click="addWinner()" v-if="isLoggedIn" class="win-btn">Enter Winner</button>
        <select id="winSelectedPlayer" class="choicebox input-box" v-if="isLoggedIn">
          <template v-for="player in players" :key="player">
            <option>{{ player.user.first_name + " " + player.user.last_name }}</option>
          </template>
        </select>
      </div>
      <div class="bracket">
        <template v-for="(roundNum, index) in rounds" v-bind:key="index">
          <div class="round" :class="['roundNum-' + roundNum]">
            <template v-for="(match, matchIndex) in roundNum" v-bind:key="matchIndex">
              <div class="match">
                <div class="match__content matchStyle">
                  <template v-for="bracket in brackets" v-bind:key="bracket">
                    <div v-if="bracket.round === index + 1 && bracket.bracket_position === match">
                      <button class="bracket-btn" v-on:click="removePlayerFromBracket(bracket.id)">
                        {{ bracket.user.first_name + " " + bracket.user.last_name }}
                      </button>
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>

    <br />
    <br />
  </div>
</template>

<style>
.win-btn {
  margin: 0px 20px 0px 20px;
  padding: 8px 20px;
  color: white;
  background-color: #0091d1;
  border-radius: 5px;
  border: 1px solid #777676;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 14px;
}

.bracket-btn {
  background-color: Transparent;
  border: none;
}

.matchStyle {
  border: 1px solid black;
  width: 100%;
  height: 40px;
  position: relative;
  box-sizing: border-box;
  line-height: 40px;
  background-color: darkgray;
  border-radius: 3px;
}

.bracket_container {
  padding: 150px 0px 0px 0px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
}

.bracket {
  margin: 0 auto;
  display: flex;
  width: 80%;
  height: 100%;
  box-sizing: border-box;
}

.round {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  box-sizing: border-box;
}

.round:first-child .match::before {
  box-sizing: border-box;
  display: none;
}

.round:first-child .match__content::before {
  box-sizing: border-box;
  display: none;
}

.round:last-child .match::after {
  box-sizing: border-box;
  display: none;
}

.match {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 10px;
  padding: 10px 0;
  flex-grow: 1;
  position: relative;
  box-sizing: border-box;
  color: black;
}

.match::before {
  content: "";
  display: block;
  min-height: 30px;
  border-left: 2px solid #0091d1;
  position: absolute;
  left: -10px;
  top: 50%;
  margin-top: -15px;
  margin-left: -2px;
  box-sizing: border-box;
}

.match:nth-child(odd)::after {
  content: "";
  display: block;
  border: 2px solid transparent;
  border-top-color: #0091d1;
  border-right-color: #0091d1;
  height: 50%;
  position: absolute;
  right: -10px;
  width: 10px;
  top: 50%;
  box-sizing: border-box;
}

.match:nth-child(even)::after {
  content: "";
  display: block;
  border: 2px solid transparent;
  border-bottom-color: #0091d1;
  border-right-color: #0091d1;
  height: 50%;
  position: absolute;
  right: -10px;
  width: 10px;
  bottom: 50%;
  box-sizing: border-box;
}

.match__content::before {
  content: "";
  display: block;
  width: 10px;
  border-bottom: 2px solid #0091d1;
  margin-left: -2px;
  position: absolute;
  top: 50%;
  left: -10px;
  box-sizing: border-box;
}
</style>
