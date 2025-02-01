import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const usePostsStore = defineStore("postsStore", {
  state: () => {
    return {
      errors: {},
    };
  },
  actions: {
    /******************** Get all posts ********************/
    async getAllPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      return data;
    },

    /******************** Get a post ********************/
    async getPost(post) {
      const res = await fetch(`/api/posts/${post}`);
      const data = await res.json();
      return data.post;
    },

    /******************** Create a post ********************/
    async createPost(formData) {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.router.push({ name: "home" });
      }
    },

    /******************** Delete a post ********************/
    async deletePost(post) {
      const authStore = useAuthStore();
      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.ok) {
          this.router.push({ name: "home" });
        }

        const data = await res.json();
      }
    },

    /******************** Update a post ********************/
    async updatePost(post, formData) {
      const authStore = useAuthStore();
      if (authStore.user.id === post.user_id) {
        const res = await fetch(`/api/posts/${post.id}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.ok) {
          this.router.push({ name: "show", params: { id: post.id } });
          this.errors = {};
        } else if (data.errors) {
          this.errors = data.errors;
        }
      }
    },
  },
});
