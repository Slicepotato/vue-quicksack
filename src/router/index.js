import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/FeedList.vue";
import Episode from "@/components/Episode.vue";

const routes = [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/:episodeId",  // <-- notice the colon
      name: "Details",
      component: Episode,
    },
  ];

  const router = createRouter({
    history: createWebHistory(),
    mode: history,
    base: '/',
    routes,
  });
  
  export default router;