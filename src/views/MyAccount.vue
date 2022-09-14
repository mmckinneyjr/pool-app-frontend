<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      helperMessage: "",
      editUserParams: {},
      editInfo: false,
    };
  },
  created: function () {
    this.getUserInfo();
  },

  methods: {
    getUserInfo: function () {
      axios.get("/users/" + localStorage.user + ".json").then((response) => {
        this.editUserParams = response.data;
        console.log(this.editUserParams);
      });
    },

    saveAccount: function () {
      axios
        .patch("/users/9.json", this.editUserParams)
        .then((response) => {
          console.log("user updated", response);
        })
        .catch((error) => {
          console.log("user update error", error.response);
          this.errors = error.response.data.errors;
        });
      this.getUserInfo();
      this.editInfo = false;
    },
    editAccount: function () {
      this.editInfo = true;
    },
  },
};
</script>

<template>
  <div class="editAccount">
    <div class="editAccount-container-box">
      <div class="editAccount-container-title">My Account</div>
      <div style="color: red; text-align: center; padding: 10px 0px 0px 0px; height: 0px" class="errorMess">
        <label class="form-label" style="color: red">{{ helperMessage }}</label>
      </div>

      <!-- User Number -->
      <li>
        <label style="font-size: 10px">{{ " Player Number" }}</label>
        <br />
        <input type="text" v-model="editUserParams.id" :disabled="true" style="width: 100px" />
      </li>
      <!-- First Name -->
      <li>
        <input type="text" v-model="editUserParams.first_name" v-if="editInfo === true" />
        <input type="text" v-model="editUserParams.first_name" :disabled="true" v-if="editInfo === false" />
      </li>
      <!-- Last Name -->
      <li>
        <input type="text" v-model="editUserParams.last_name" v-if="editInfo === true" />
        <input type="text" v-model="editUserParams.last_name" :disabled="true" v-if="editInfo === false" />
      </li>
      <!-- Email -->
      <li>
        <input type="email" v-model="editUserParams.email" v-if="editInfo === true" />
        <input type="email" v-model="editUserParams.email" :disabled="true" v-if="editInfo === false" />
      </li>
      <!-- Password -->
      <li>
        <input type="password" v-model="editUserParams.password" v-if="editInfo === true" placeholder="Password" />
        <input
          type="password"
          v-model="editUserParams.password"
          :disabled="true"
          v-if="editInfo === false"
          style="border: none; background-color: transparent; visibility: hidden"
        />
      </li>
      <!-- Confirm Password -->
      <li>
        <input
          type="password"
          v-model="editUserParams.password_confirmation"
          v-if="editInfo === true"
          placeholder="Confirm Password"
        />
        <input
          type="password"
          v-model="editUserParams.password_confirmation"
          :disabled="true"
          v-if="editInfo === false"
          style="border: none; background-color: transparent; visibility: hidden"
        />
      </li>
      <div style="text-align: center; padding: 20px 20px 0px 20px; height: 70px !important">
        <img src="../assets/oneball.png" height="70px" class="signupimg" />
      </div>
      <li>
        <input type="submit" value="Save" class="editAccount-btn" v-on:click="saveAccount()" v-if="editInfo === true" />
        <input
          type="submit"
          value="Update My Info"
          class="editAccount-btn"
          v-on:click="editAccount()"
          v-if="editInfo === false"
        />
      </li>
    </div>
  </div>
</template>

<style>
.errorMess {
  position: relative;
  z-index: 5000;
}

.editAccount-link {
  text-align: center;
  font-size: 12px;
  color: gray;
  text-align: center;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-decoration: none;
}

.editAccount {
  margin: auto;
  padding: 150px 0px 0px 0px;
  position: absolute;
  z-index: -100;
  width: 100%;
}

.editAccount-container-box {
  border: 1px red solid;
  margin: auto;
  padding: 0px 0px 0px 0px;
  background-color: #d9d9d9;
  height: 500px;
  width: 350px;
  text-align: left;
  border-radius: 15px;
  border: solid 2px #0091d1;
  list-style: none;
  padding: 0px 0px 20px 0px;
}

.editAccount-container-box li {
  padding: 3px 40px;
}

.editAccount-container-box input {
  height: 38px;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #777676;
  box-sizing: border-box;
}

.editAccount-container-title {
  margin: 0px 0px 5px -2px;
  padding: 15px 0px;
  width: calc(100% + 4px);
  background-color: #0091d1;
  border-bottom: solid 1px #5f5f5f;
  border-radius: 13px 13px 0px 0px;
  font-size: 22px;
  color: white;
  text-align: center;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5));
}

.editAccount-btn {
  color: white;
  background-color: #0091d1;
  border-radius: 5px;
  border: 1px solid #777676;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 14px;
}
</style>
