<script setup>
import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "@/stores/posts";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { reactive } from "vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { user } = storeToRefs(useAuthStore());
const { errors } = storeToRefs(usePostsStore());

const formData = reactive({
  title: "",
  body: "",
});

const { getPost, updatePost } = usePostsStore();

const post = ref(null);

onMounted(async () => {
  errors.value = {};
  post.value = await getPost(route.params.id);
  if (post.value.user_id !== user.value.id) {
    router.push({ name: "home" });
  }
  formData.title = post.value.title;
  formData.body = post.value.body;
});
</script>

<template>
  <main>
    <h1 class="title">Update a post</h1>

    <form
      @submit.prevent="updatePost(post, formData)"
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

      <button class="primary-btn">Update</button>
    </form>
  </main>
</template>
