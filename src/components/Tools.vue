<template>
  <div class="container-fluid py-5 bg-white" id="tools">
    <div class="container">
      <h1 v-reveal class="text-center fw-bold mb-5 tools-main-title project-heading">Tools</h1>
      <div class="row g-5 justify-content-center">

        <div
          v-for="(group, index) in toolGroups"
          :key="group.category"
          class="col-12 col-md-6 col-lg-4 text-center"
          v-reveal="{ delay: index * 120 }"
        >
          <h3 class="fw-bold mb-4 tools-category-title">{{ group.category }}</h3>
          <div class="row g-4 justify-content-center align-items-center">
            <div v-for="tool in group.items" :key="tool.name" class="col-6">
              <img :src="tool.img" :alt="tool.name" :title="tool.name" class="img-fluid tool-logo">
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import toolGroups from '../data/tools.js'
</script>
