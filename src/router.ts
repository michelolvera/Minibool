import { createRouter, createWebHistory } from "vue-router";
import LoginComponent from "./components/pages/LoginComponent.vue";

const routes = [
  { path: "/", component: LoginComponent },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    //Return router to savedPosition
    if (savedPosition) {
      return savedPosition
    }
    //Return router to anchor tag (custom id element)
    if (to.hash) {
      return {
        el: to.hash
      }
    }
    //Return router to top.
    return { top: 0 }
  }
});

export default router;