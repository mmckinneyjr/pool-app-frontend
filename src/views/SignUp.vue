<script>
import axios from "axios";

export default {
  data: function () {
    return {
      errors: [],
      helperMessage: "",
      newUserParams: {},
    };
  },
  created: function () {},
  methods: {
    signUserUp: function () {
      // Create new tournament
      this.errors = [];
      axios
        .post("/users.json", this.newUserParams)
        .then((response) => {
          console.log("User: ", response);
          this.helperMessage = this.tournamentParams.tournament_name + " has been created";
          this.tournamentParams = {};
          this.getMyTournaments();
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log("User create error", error.response.data);
          this.errors.push(error.response.data["message"]);
          this.errors = error.response.data.errors;
          this.helperMessage = this.errors.sort()[0];
          console.log(this.errors[0]);
        });
    },
  },
};
</script>

<template>
  <div class="signup">
    <div class="signup-container-box">
      <div class="signup-container-title">Sign Up</div>
      <div style="color: red; text-align: center; padding: 10px 0px 0px 0px; height: 30px" class="errorMess">
        <label class="form-label" style="color: red">{{ helperMessage }}</label>
      </div>

      <form v-on:submit.prevent="signUserUp()">
        <li><input type="text" placeholder="First Name" v-model="newUserParams.first_name" /></li>
        <li>
          <input type="text" placeholder="Last Name" v-model="newUserParams.last_name" />
        </li>
        <li>
          <input type="email" placeholder="Email address" v-model="newUserParams.email" />
        </li>
        <li>
          <input type="password" placeholder="Password" v-model="newUserParams.password" />
        </li>
        <li>
          <input type="password" placeholder="Confirm password" v-model="newUserParams.password_confirmation" />
        </li>
        <div style="text-align: center; padding: 20px 20px 20px 20px; height: 70px !important">
          <img src="../assets/oneball.png" height="70px" class="signupimg" />
        </div>
        <li>
          <input type="submit" value="Sign Up" class="signup-btn" />
        </li>
        <li class="sign-link">
          <span>Already have an account?&nbsp;&nbsp;</span>
          <a href="./login" style="text-decoration: none; color: #0091d1">Login</a>
        </li>
      </form>
    </div>
  </div>
</template>

<style>
.errorMess {
  position: relative;
  z-index: 5000;
}

.sign-link {
  text-align: center;
  font-size: 12px;
  color: gray;
  text-align: center;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  text-decoration: none;
}

.signup {
  margin: auto;
  padding: 150px 0px 0px 0px;
  position: absolute;
  z-index: -100;
  width: 100%;
}

.signup-container-box {
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

.signup-container-box li {
  padding: 3px 40px;
}

.signup-container-box input {
  height: 38px;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #777676;
  box-sizing: border-box;
}

.signup-container-title {
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

.signup-btn {
  color: white;
  background-color: #0091d1;
  border-radius: 5px;
  border: 1px solid #777676;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 14px;
}
</style>
