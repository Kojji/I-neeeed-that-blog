const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/CategoriesPage.vue") },
      {
        path: "/category/:alias",
        name: "category-posts",
        component: () => import("pages/BlogPostsPage.vue"),
      },
    ],
  },
  {
    path: "/category/:alias/post/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "post-page",
        component: () => import("pages/PostPage.vue"),
      },
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
