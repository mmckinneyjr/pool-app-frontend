<script>
import axios from "axios";
export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");
    this.$router.push("/");
  },
};
</script>

<template>
  <div class="logout"></div>
</template>
