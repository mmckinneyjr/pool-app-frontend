<template>
  <div class="home">
    <div class="flex-container2" style="height: 130px; text-align: center"></div>
    <img src="../../src/assets/rack.png" class="poolimage" />
    <div
      style="
        height: 3px;

        position: relative;
        z-index: 3;
        text-align: center;
        background-color: gray;
        border-top: 0.5px solid white;
        border-bottom: 0.5px solid white;
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.6));
      "
    ></div>
    <div
      style="
        padding: 10px 0px 10px 0px;
        /* height: 80px; */
        font-size: 50px;
        position: relative;
        z-index: 2;
        text-align: center;
        background-color: lightgray;
        border-top: 1px solid white;
        border-bottom: 1px solid white;
        filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.6));
      "
    >
      SHOP
    </div>
    <div class="flex-container">
      <span class="flex-child">
        <a href="https://www.billiardfactory.com/"><img src="../assets/shopImage1.jpg" height="100%" /></a>
      </span>
      <span class="flex-child">
        <a href="https://www.pooldawg.com/"><img src="../assets/shopImage2.jpg" height="100%" /></a>
      </span>
      <span class="flex-child">
        <a href="https://www.ozonebilliards.com/"><img src="../assets/shopImage3.jpg" height="100%" /></a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
};
</script>

<style>
.flex-container {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 20px 0px 120px 0px;
  background-color: darkgray;
  border: 0px solid red;
  filter: drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.5));
}

.flex-child {
  display: inline-block;
  width: 230px !important;
  height: 230px !important;
  /* padding: 40px; */
  margin: 40px;
  border: 0px solid yellow;
  color: white;
  filter: drop-shadow(5px 7px 7px rgba(0, 0, 0, 0.6));
  border: 4px solid #5a5a5a;
  border-radius: 10px;
  overflow: hidden;
}

.poolimage {
  filter: drop-shadow(5px 7px 7px rgba(0, 0, 0, 0.6));
}
</style>
