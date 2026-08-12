<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white sticky-top" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container">

      <a id="logo" class="navbar-brand" href="#landing" aria-label="Paul Opaco Portfolio - Back to Home">
        <img src="/images/logo.png" alt="PaulOpaco Logo" class="img-fluid">
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li v-for="link in navLinks" :key="link.id" class="nav-item">
            <a class="nav-link" :class="{ active: activeId === link.id }" :href="`#${link.id}`">{{ link.label }}</a>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { id: 'landing', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'tools', label: 'Tools' },
  { id: 'contact', label: 'Contact' },
]

const activeId = ref('landing')
const isScrolled = ref(false)
let sectionObserver = null

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  )

  navLinks.forEach((link) => {
    const section = document.getElementById(link.id)
    if (section) sectionObserver.observe(section)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  sectionObserver?.disconnect()
})
</script>
