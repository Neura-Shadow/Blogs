<template>
  <div class="space-y-6">
    <!-- Breadcrumb Header -->
    <div class="flex items-center gap-2 text-sm">
      <NuxtLink to="/admin/posts" class="text-[#00a884] hover:underline font-semibold">Blog Posts</NuxtLink>
      <span class="text-[#6B665F]">/</span>
      <span class="text-[#6B665F]">New Post</span>
    </div>

    <!-- Title Header -->
    <div>
      <h2 class="text-2xl font-display font-bold text-[#1F1E1B]">Create New Blog Post</h2>
      <p class="text-[#6B665F] text-sm mt-1">Draft a new post for your research blog.</p>
    </div>

    <!-- Reusable Editor -->
    <AdminPostEditor />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})
</script>
