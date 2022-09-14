<script>
export default {
  data: function () {
    return {
      skillLevels: [0, 14, 19, 25, 31, 38, 46, 55, 65, 75],
      // player [points, turn, skill level, Name]
      player1: [0, true, 0, ""],
      player2: [0, false, 0, ""],
      deadBalls: 0,
      innings: 0,
      winnerMsg: "",
    };
  },
  created: function () {},
  methods: {
    switchPlayers: function () {
      if (
        this.skillLevels[this.player1[2]] - this.player1[0] > 1 &&
        this.skillLevels[this.player2[2]] - this.player2[0] > 1
      ) {
        if (this.player1[1] === true) {
          this.player1[1] = false;
          this.player2[1] = true;
          document.getElementById("scoreP1").className = "flex-item2";
          document.getElementById("scoreP2").className = "flex-item";
        } else if (this.player2[1] === true) {
          this.player1[1] = true;
          this.player2[1] = false;
          document.getElementById("scoreP1").className = "flex-item";
          document.getElementById("scoreP2").className = "flex-item2";
          this.innings++;
        }
      }
    },
    addPoints: function () {
      //Player 1 added points
      let player1Left = this.skillLevels[this.player1[2]] - this.player1[0];
      if (this.player1[1] === true) {
        if (player1Left > 0) {
          this.player1[0]++;
        }
        if (player1Left === 1) {
          this.winnerMsg = this.player1[3] + " Wins!";
        }
      }
      //Player 2 added points
      let player2Left = this.skillLevels[this.player2[2]] - this.player2[0];
      if (this.player2[1] === true) {
        if (player2Left > 0) {
          this.player2[0]++;
        }
        if (player2Left === 1) {
          this.winnerMsg = this.player2[3] + " Wins!";
        }
      }
    },
    addDeadBalls: function () {
      if (
        this.skillLevels[this.player1[2]] - this.player1[0] > 1 &&
        this.skillLevels[this.player2[2]] - this.player2[0] > 1
      ) {
        this.deadBalls++;
      }
    },

    newMatch: function () {
      this.player1 = [0, true, 0, ""];
      this.player2 = [0, false, 0, ""];
      this.deadBalls = 0;
      this.innings = 0;
      this.winnerMsg = "";

      const modal = document.querySelector("#modal");
      const overlay = document.getElementById("overlay");
      modal.classList.add("active");
      overlay.classList.add("active");
    },

    okModalBtn: function () {
      if (this.player1[3] === "") {
        this.player1[3] = "Player 1";
      }
      if (this.player2[3] === "") {
        this.player2[3] = "Player 2";
      }

      let player1Skill1 = document.getElementById("skillLevelSelect1").selectedIndex;
      console.log(player1Skill1);
      this.player1[2] = player1Skill1 + 1;

      let player2Skill2 = document.getElementById("skillLevelSelect2").selectedIndex;
      this.player2[2] = player2Skill2 + 1;

      const modal = document.querySelector("#modal");
      const overlay = document.getElementById("overlay");
      modal.classList.remove("active");
      overlay.classList.remove("active");
    },
    cancelModalBtn: function () {
      const modal = document.querySelector("#modal");
      const overlay = document.getElementById("overlay");
      modal.classList.remove("active");
      overlay.classList.remove("active");
    },
  },
};
</script>

<template>
  <div id="modal" class="modal">
    <div class="modal-header">
      <div class="modal-title">Player Info</div>
    </div>
    <div class="modal-body">
      <div class="modal-lable-div">
        <br />
        <input
          type="text"
          class="modal-label"
          placeholder="Name of Player 1"
          v-model="player1[3]"
          style="margin-right: 5px"
        />
        <select size="1" class="modal-label" id="skillLevelSelect1" style="margin-left: 5px">
          <option>Skill Level 1: {{ skillLevels[1] + " balls" }}</option>
          <option>Skill Level 2: {{ skillLevels[2] + " balls" }}</option>
          <option>Skill Level 3: {{ skillLevels[3] + " balls" }}</option>
          <option>Skill Level 4: {{ skillLevels[4] + " balls" }}</option>
          <option>Skill Level 5: {{ skillLevels[5] + " balls" }}</option>
          <option>Skill Level 6: {{ skillLevels[6] + " balls" }}</option>
          <option>Skill Level 7: {{ skillLevels[7] + " balls" }}</option>
          <option>Skill Level 8: {{ skillLevels[8] + " balls" }}</option>
          <option>Skill Level 9: {{ skillLevels[9] + " balls" }}</option>
        </select>
      </div>
      <div class="modal-lable-div">
        <input
          type="text"
          class="modal-label"
          placeholder="Name of player 2"
          v-model="player2[3]"
          style="margin-right: 5px"
        />
        <select size="1" class="modal-label" id="skillLevelSelect2" style="margin-left: 5px">
          <option>Skill Level 1: {{ skillLevels[1] + " balls" }}</option>
          <option>Skill Level 2: {{ skillLevels[2] + " balls" }}</option>
          <option>Skill Level 3: {{ skillLevels[3] + " balls" }}</option>
          <option>Skill Level 4: {{ skillLevels[4] + " balls" }}</option>
          <option>Skill Level 5: {{ skillLevels[5] + " balls" }}</option>
          <option>Skill Level 6: {{ skillLevels[6] + " balls" }}</option>
          <option>Skill Level 7: {{ skillLevels[7] + " balls" }}</option>
          <option>Skill Level 8: {{ skillLevels[8] + " balls" }}</option>
          <option>Skill Level 9: {{ skillLevels[9] + " balls" }}</option>
        </select>
      </div>
      <br />
      <div>
        <button v-on:click="okModalBtn()" class="new-match-btn" style="margin-right: 10px">Start</button>
        <button v-on:click="cancelModalBtn()" class="new-match-btn" style="margin-left: 10px">Cancel</button>
      </div>
    </div>
  </div>
  <div id="overlay"></div>

  <div class="nineballscorer">
    <div
      class="winner-sign"
      style="
        margin: 150px 0px 0px 0px;
        text-align: center;
        width: 100%;
        font-weight: bold;
        font-size: 45px;
        position: absolute;
      "
    >
      {{ winnerMsg }}
    </div>
    <div style="margin: 120px 0px 0px -50px; text-align: right; width: 100%; position: absolute">
      <button data-modal-target="#modal" class="new-match-btn" v-on:click="newMatch()">New Match</button>
    </div>

    <div id="flex-container">
      <!--  -->
      <div class="">
        Skill Level: {{ player1[2] }}
        <div class="flex-item" id="scoreP1">
          <div class="ballsRight">{{ skillLevels[player1[2]] - player1[0] }}</div>
          <div class="ballsCenter">{{ player1[0] }}</div>
          <div class="ballsLeft"></div>
        </div>
      </div>
      <div class="flex-item-middle">
        <br />
        <div>{{ "Total Innings: " + innings }}</div>

        <div>{{ "Dead Balls: " + deadBalls }}</div>

        <div>{{ "Total Ball Count: " + (deadBalls + player1[0] + player2[0]) }}</div>
      </div>
      <!--  -->
      <div class="">
        Skill Level: {{ player2[2] }}
        <div class="flex-item2" id="scoreP2">
          <div class="ballsRight">{{ skillLevels[player2[2]] - player2[0] }}</div>
          <div class="ballsCenter">{{ player2[0] }}</div>
          <div class="ballsLeft"></div>
        </div>
      </div>
    </div>
    <!-- --------- -->
    <div id="flex-container-btns">
      <!--  -->
      <div class="flex-item-btns">
        {{ player1[3] }}
        <br />
        <button class="circle-btn" v-if="player1[1] === true" v-on:click="addPoints()">+</button>
      </div>
      <div class="flex-item-btns">
        <button class="switch-player-btn" v-on:click="switchPlayers()">Switch Player</button>
        <button class="dead-ball-btn" v-on:click="addDeadBalls">Dead Ball</button>
      </div>
      <div class="flex-item-btns">
        {{ player2[3] }}
        <br />
        <button class="circle-btn" v-if="player2[1] === true" v-on:click="addPoints()">+</button>
      </div>
    </div>
  </div>
</template>

<style>
.modal {
  transition: 200ms ease-in-out;
  position: fixed;
  top: 50%;
  box-sizing: border-box;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  border: 1px black solid;
  border-radius: 10px;
  z-index: 10000;
  background-color: #c6c6c6;
  width: 500px;
  max-width: 500px;
}

.modal.active {
  transform: translate(-50%, -50%) scale(1);
}
.modal-header {
  font-weight: 500;
  font-size: 18px;
  color: black;
  padding: 15px 0px 5px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
}

.model-header .title .hidden {
  display: none;
}

.modal-body {
  padding: 20px 0px 30px 0px;
}

.modal-lable-div {
  padding: 5px 5px 5px 5px;
}

#overlay {
  transition: 200ms ease-in-out;
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  pointer-events: none;
  z-index: 9999;
}

#overlay.active {
  opacity: 1;
  pointer-events: all;
}

.modal-label {
  padding: 0px 10px 0px 10px;
  width: 180px;
  height: 26px;
  border-radius: 5px;
  border: 1px solid gray;
}

.close-button {
  width: 150px;
  height: 35px;
  background-color: #0091d1;
  border: 2px solid gray;
  border-radius: 5px;
  color: white;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#flex-container {
  padding-top: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 65%;
  margin: 0 auto;
}

#flex-container-btns {
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 65%;
  margin: 0 auto;
}

.switch-player-btn {
  margin: 40px 0px 0px 0px;
  padding: 0px 0px 330px 0px;
  width: 100%;
  height: 45px;
  padding: 0px 0px 0px 0px;
  background: #0091d1;
  font-weight: bold;
  border: none;
  color: white;
  border-radius: 7px;
  border: 2px solid #e2e2e2;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.6));
}

.new-match-btn {
  width: 100px;
  height: 30px;
  padding: 0px 0px 0px 0px;
  background: #0091d1;
  font-weight: bold;
  border: none;
  color: white;
  border-radius: 7px;
  border: 2px solid #e2e2e2;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.6));
}

.new-match-btn:hover {
  background: #5aa2ce;
}

.switch-player-btn:hover {
  background: #5aa2ce;
}

.dead-ball-btn {
  margin: 20px 0px 0px 0px;
  width: 100%;
  height: 45px;
  padding: 0px 0px 0px 0px;
  background: #e2e2e2;
  font-weight: bold;
  color: #0091d1;
  border-radius: 7px;
  border: 2px solid #0091d1;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.6));
}

.dead-ball-btn:hover {
  background: #f7f7f7;
}

.flex-item-btns {
  min-width: 200px;
  width: 200px;
  height: 200px;
  padding: 0px 0px 0px 0px;
  /* background: white; */

  font-weight: bold;
  text-align: center;
}

.circle-btn {
  margin: 0 auto;
  margin-top: 30px;
  display: block;
  height: 40%;
  width: 40%;
  line-height: 40%;
  border-radius: 50%;
  border: 8px white solid;
  background: #0091d1;
  font-size: 60px;
  color: white;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.6));
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.6) inset;
}

.circle-btn:hover {
  background: #5aa2ce;
}

.flex-item-middle {
  min-width: 200px;
  width: 200px;
  height: 200px;
  line-height: 25px;
  padding: 40px 10px 0px 10px;
  color: white;
  font-weight: bold;
  border-radius: 7px;
  background: url("../assets/nineballrack.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.flex-item {
  width: 200px;
  height: 200px;
  border: 10px #0091d1 solid;
  background: white;
  line-height: 160px;
  font-weight: bold;
  border-radius: 7px;
  filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.5));
  box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.6) inset;
}

.flex-item2 {
  width: 200px;
  height: 200px;
  border: 10px gray solid;
  background: white;
  line-height: 160px;
  font-weight: bold;
  border-radius: 7px;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
  box-shadow: 2.5px 2.5px 2.5px rgba(0, 0, 0, 0.6) inset;
}

.ballsCenter {
  width: 100px;
  padding: 0px 0px 0px 0px;
  line-height: 200px;
  font-size: 95px;
  float: right;
  filter: drop-shadow(2px 2px 1.5px rgba(0, 0, 0, 0.6));
}

.ballsRight {
  width: 40px;
  padding: 10px 10px 0px 0px;
  line-height: 30px;
  font-size: 20px;
  float: right;
  font-weight: bold;
}
.ballsLeft {
  width: 40px;
  padding: 0px 0px 0px 0px;
  line-height: 30px;
  font-size: 20px;
  float: left;
}
</style>
