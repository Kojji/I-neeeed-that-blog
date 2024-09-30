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
      {
        path: "",
        name: "category-posts",
        component: () => import("pages/BlogPostListPage.vue"),
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
  {
    path: "/admin/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "admin-login-page",
        component: () => import("pages/AdminLoginPage.vue"),
      },
    ],
  },
  {
    path: "/admin/preview",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "post-preview-page",
        component: () => import("pages/PreviewPage.vue"),
      },
    ],
  },
  {
    path: "/buylist",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "buylist-page",
        component: () => import("pages/BuylistPage.vue"),
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
