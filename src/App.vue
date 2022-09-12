<template>
  <!-- <router-link to="/about"><li>About</li></router-link> -->

  <nav style="position: fixed; z-index: 10001">
    <div style="width: 100%; float: right; position: fixed">
      <router-link to="/login" class="login-btn" v-if="!isLoggedIn">Login</router-link>
      <router-link to="/" class="login-btn" v-if="isLoggedIn">{{ userName }}</router-link>
    </div>
    <div class="nav-back"></div>
    <div id="cursor"></div>
    <div class="logo-div">
      <img id="moveable-logo-img" src="./assets/logo.png" />
    </div>

    <div class="sidebar" style="display: none" id="sidebar">
      <div class="sidebar-header"></div>

      <div class="sidebar-inside-container">
        <router-link class="sidebar-btn" to="/" v-on:click="moveSidebar()">
          <li>Home</li>
        </router-link>

        <router-link class="sidebar-btn" to="/mytournaments" v-on:click="moveSidebar()" v-if="isLoggedIn">
          <li>My Tournaments</li>
        </router-link>

        <router-link class="sidebar-btn" to="/nineballscorer" v-on:click="moveSidebar()">
          <li>9 Ball Score Keeper</li>
        </router-link>

        <router-link class="sidebar-btn" to="/tournaments" v-on:click="moveSidebar()">
          <li>Find Local Tournament</li>
        </router-link>

        <router-link class="sidebar-btn" to="/tournament" v-on:click="moveSidebar()">
          <li>View On Going Tournament</li>
        </router-link>

        <router-link class="sidebar-btn" to="/signup" v-on:click="moveSidebar()" v-if="!isLoggedIn">
          <li>Sign Up</li>
        </router-link>

        <router-link class="sidebar-btn" to="/myaccount" v-on:click="moveSidebar()" v-if="isLoggedIn">
          <li>My Account</li>
        </router-link>

        <router-link class="sidebar-btn" to="/logout" v-on:click="moveSidebar()" v-if="isLoggedIn">
          <li>Sign Out</li>
        </router-link>
      </div>
    </div>

    <button class="burger-btn" v-on:click="moveSidebar()">☰</button>

    <!-- Switch between login and display logged in user -->
  </nav>

  <router-view />
</template>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      toggle: true,
      isLoggedIn: false,
      userName: "",
    };
  },
  mounted: function () {
    this.moveLogo();
  },
  methods: {
    getUser: function () {
      if (this.isLoggedIn) {
        axios.get("/users/" + localStorage.getItem("user") + ".json").then((response) => {
          this.userName = response.data.first_name + " " + response.data.last_name;
        });
      }
    },
    computed: function () {
      document.addEventListener("mouseup", function (event) {
        var obj = document.getElementById("sidebar");
        if (!obj.contains(event.target)) {
          obj.style.top = "-340px";
          this.toggle = true;
        }
      });
    },

    moveSidebar: function () {
      var show = document.getElementById("sidebar");
      if (this.toggle === true) {
        this.toggle = false;

        show.style.display = "block";
        window.setTimeout(function () {
          show.style.top = "0px";
        });
      } else {
        show.style.top = "-340px";
        this.toggle = true;
      }

      document.addEventListener("mouseup", function (event) {
        var obj = document.getElementById("sidebar");
        if (!obj.contains(event.target)) {
          obj.style.top = "-340px";
          this.toggle = true;
        }
      });
    },

    moveLogo: function () {
      dragElement(document.getElementById("moveable-logo-img"));
      function dragElement(elmnt) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
          /* if present, the header is where you move the DIV from:*/
          document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
          /* otherwise, move the DIV from anywhere inside the DIV:*/
          elmnt.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = elmnt.offsetTop - pos2 + "px";
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
        }
        function closeDragElement() {
          /* stop moving when mouse button is released:*/
          document.onmouseup = null;
          document.onmousemove = null;
        }
      }
    },
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
      this.getUser();
    },
  },
};
</script>

<style>
#footer {
  position: fixed;
  border-top: 1px solid lightgray;
  bottom: 0;
  width: 100%;
  z-index: 10000;

  /* Footer height */
  background-color: #111111;
}

.footer-div1 {
  bottom: 0;
  font-size: 12px;
  padding: 0px 0px 0px 20px;
  float: left;
}

.footer-div2 {
  bottom: 0;
  font-size: 12px;
  padding: 10px 20px 5px 20px;
  float: right;
  text-align: right;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  background: white;
  color: #cdcdcd;
  font-family: "Avenir Next", "Avenir", sans-serif;
  background-color: dimgray;
}

.logo-div {
  clip: inherit;
  padding: 0px 80% 0px 0px;
  margin: 0px 0px 0px 100px;
  filter: drop-shadow(3px 3px 3px rgba(0, 0, 0, 0.5));
}

#moveable-logo-img {
  margin: 0px 0px 0px 0px;
  clip: inherit;
  height: 100px;
  position: absolute;
  cursor: move;
  z-index: 10;
}

.nav-back {
  position: fixed;
  background-color: #232323;
  border-bottom: solid 1px #a8a8a8;
  height: 75px;
  width: 100%;
  margin: 0px;
  padding: 0px;
  z-index: -50;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.5));
}

.sidebar-header {
  width: 100%;
  height: 30px;
  background-color: #832626;
  /* border-bottom: 2px solid black; */
  filter: drop-shadow(0px 3px 2px rgba(0, 0, 0, 0.6));
}

.sidebar-btn {
  list-style: none;
  color: black;
  text-decoration: none;
  font-size: 16px;
}
.sidebar-btn li {
  padding: 10px 30px 10px 30px;
  border-top: solid 2px black;
}

.sidebar-btn.router-link-active {
  color: #832626;
}

.sidebar-btn:hover {
  color: #0091d1;
}

.login-btn {
  position: relative;
  float: right;
  color: white;
  margin: 30px 40px 0px 0px;
  z-index: 0;
  font-size: 14px;
  text-decoration: none;
}

.burger-btn {
  position: absolute;
  font-size: 42px;
  width: 50px;
  float: left;
  padding: 0px;
  margin: 10px 0px 0px -10px;
  white-space: normal;
  border: none;
  color: white;
  background-color: inherit;
  cursor: pointer;
  z-index: 100;
}

.sidebar {
  margin: 75px 0px 0px 30px;
  padding: 0px 0px 0px 0px;
  background: #cecece;
  color: red;
  transform: translate(0, -340);
  position: fixed;
  /* transition: left 0.1s linear;
  left: -200px;
  top: 0px; */
  transition: top 0.2s linear;
  left: 0px;
  top: -340px;
  z-index: -99;
  text-align: left;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.3));
  border-radius: 10px 10px 10px 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
}

.sidebar-inside-container {
  padding: 0px 0px 0px 0px;
}

.container-title {
  margin: 0px 0px 5px -2px;
  padding: 15px 0px;
  width: calc(100% + 4px);
  background-color: #0091d1;
  border-bottom: solid 1px #5f5f5f;
  border-radius: 10px 10px 0px 0px;
  font-size: 22px;
  color: white;
  text-align: center;
  font-family: "norwester", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.7));
}

.form-label {
  font-size: 12px;
  text-align: left;
  color: black;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

.input-box {
  font-family: none;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4) inset;
}
</style>
