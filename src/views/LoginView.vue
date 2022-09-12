<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
      helperMessage: "",
    };
  },
  methods: {
    loginBtn: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user", response.data.user_id);
          console.log(response.data.jwt);
          console.log(response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
          this.helperMessage = this.errors[0];
        });
    },
  },
};
</script>

<template>
  <div class="login">
    <div class="login-container-box">
      <div class="login-container-title">Login</div>
      <div style="color: ; text-align: center; padding: 10px 0px 0px 0px; height: 30px" class="errorMess">
        <label class="form-label" style="color: red">{{ helperMessage }}</label>
      </div>

      <form v-on:submit.prevent="loginBtn()">
        <li><input type="text" placeholder="Email address" v-model="newSessionParams.email" /></li>
        <li>
          <input type="password" placeholder="Password" v-model="newSessionParams.password" />
        </li>
        <div style="text-align: center; padding: 20px 20px 150px 20px; height: 70px !important">
          <img src="../assets/noneballrack2.png" height="200px" class="signupimg" />
        </div>
        <li>
          <input type="submit" value="Login" class="signup-btn" />
        </li>
        <li class="sign-link">
          <span>Don't have an account?&nbsp;&nbsp;</span>
          <a href="./signup" style="text-decoration: none; color: #0091d1">Sign Up</a>
        </li>
      </form>
    </div>
  </div>
</template>
<style>
.login {
  margin: auto;
  padding: 150px 0px 0px 0px;
  position: absolute;
  z-index: -100;
  width: 100%;
}

.signupimg {
  /* opacity: 0.9; */
  filter: drop-shadow(2px 2px 1.5px rgba(0, 0, 0, 0.7));
}

.login-container-box {
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

.login-container-box li {
  padding: 3px 40px;
}

.login-container-box input {
  height: 38px;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #777676;
  box-sizing: border-box;
}

.login-container-title {
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
