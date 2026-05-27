<template>
  <div class="space-y-6">
    <!-- Breadcrumb Header -->
    <div class="flex items-center gap-2 text-sm">
      <NuxtLink to="/admin/projects" class="text-[#00a884] hover:underline font-semibold">Showcase Projects</NuxtLink>
      <span class="text-[#6B665F]">/</span>
      <span class="text-[#6B665F]">New Project</span>
    </div>

    <!-- Title Header -->
    <div>
      <h2 class="text-2xl font-display font-bold text-[#1F1E1B]">Create Showcase Project</h2>
      <p class="text-[#6B665F] text-sm mt-1">Publish a new engineering project or research repository.</p>
    </div>

    <!-- Reusable Editor -->
    <AdminProjectEditor />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth'
})
</script>
