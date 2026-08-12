<template>
  <div class="container-fluid py-5 bg-light" id="projects">
    <div class="container">
      <h1 v-reveal class="section-title text-center fw-bold mb-5 project-heading">My Projects</h1>
      <div class="row gy-4 justify-content-center">

        <div
          v-for="(project, index) in projects"
          :key="index"
          class="col-12 col-md-6 col-lg-4"
          v-reveal="{ delay: (index % 3) * 100 }"
        >
          <div class="card h-100 shadow-sm border-0 rounded-4 p-3">
            <div class="image-wrapper rounded-3 overflow-hidden p-4 text-center">
              <img :src="project.img" class="img-fluid project-img" :alt="project.alt">
            </div>
            <div class="card-body px-1 pt-3">
              <h4 class="card-title fw-bold project-card-title">{{ project.title }}</h4>
              <p class="card-text text-secondary small">{{ project.description }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import projects from '../data/projects.js'
</script>
