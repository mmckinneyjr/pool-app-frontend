import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateTournament from "../views/CreateTournament.vue";
import NineBallScorer from "../views/NineBallScore.vue";
import SignUp from "../views/SignUp.vue";
import Login from "../views/LoginView.vue";
import Logout from "../views/LogOut.vue";
import TournamentShow from "../views/TournamentShow.vue";
import TournamentsAll from "../views/TournamentsAll.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/mytournaments",
    name: "create-tournament",
    component: CreateTournament,
  },
  {
    path: "/nineballscorer",
    name: "nine-ball-scorer",
    component: NineBallScorer,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/tournament",
    name: "tournament",
    component: TournamentShow,
  },
  {
    path: "/tournaments",
    name: "tournaments",
    component: TournamentsAll,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
