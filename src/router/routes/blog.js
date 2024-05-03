export default [
  {
    path: "/blog",
    name: "Blog",
    component: () =>
      import(/* webpackChunkName: "Blog" */ "@/views/Blog/Index.vue"),
    meta: {
      title: "Blog - Our Space",
    },
  },
  {
    path: "/blog/:id",
    name: "ViewBlog",
    component: () =>
      import(/* webpackChunkName: "Blog" */ "@/views/Blog/view-blog/Index.vue"),
    meta: {
      title: "View Blog - Our Space",
    },
  },
];
