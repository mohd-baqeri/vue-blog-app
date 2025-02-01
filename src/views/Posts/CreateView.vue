<script setup>
import { reactive } from "vue";
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(usePostsStore());
const { createPost } = usePostsStore();

const formData = reactive({
  title: "",
  body: "",
});
</script>

<template>
  <main>
    <h1 class="title">Create a new post</h1>

    <form
      @submit.prevent="createPost(formData)"
      class="w-1/2 mx-auto space-y-6"
    >
      <div>
        <input type="text" placeholder="Post Title" v-model="formData.title" />
        <p v-if="errors.title" class="error">{{ errors.title[0] }}</p>
      </div>

      <div>
        <textarea
          placeholder="Post Body"
          rows="6"
          v-model="formData.body"
        ></textarea>
        <p v-if="errors.body" class="error">{{ errors.body[0] }}</p>
      </div>

      <button class="primary-btn">Create</button>
    </form>
  </main>
</template>
