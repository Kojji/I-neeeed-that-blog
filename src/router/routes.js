const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CategoriesPage.vue") },
    ],
  },
  {
    path: "/category/:alias",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/BlogPostsPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
