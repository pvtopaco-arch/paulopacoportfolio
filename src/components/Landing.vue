<template>
  <div class="container-fluid text-center p-3 bg-light" id="landing">
    <div id="landinginfo" class="row mt-3 mb-3 align-items-center justify-content-center">

      <div class="col-12 col-md-4 col-lg-3 order-1 d-flex justify-content-center align-items-center">
        <div class="profile-card rounded-circle overflow-hidden ratio ratio-1x1 shadow-sm">
          <img src="/images/landingphoto.jpg" class="img-fluid w-100 h-100 object-fit-cover bg-secondary main-img" alt="Paul Opaco Avatar">
          <img src="/images/landingphoto1.png" class="img-fluid w-100 h-100 object-fit-cover bg-secondary hover-img" alt="Paul Opaco Real">
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-5 offset-lg-1 order-2 text-md-start px-md-4 mt-4 mt-md-0 hero-copy">
        <span class="tech-badge mb-2 d-inline-block">Full Stack Web Developer</span>
        <h1 class="display-5 fw-bold mb-3 text-dark">
          Hi, I'm <span class="text-gradient text-nowrap">Paul Opaco</span>
        </h1>
        <p class="lead text-secondary mb-4">
          I enjoy building things that live on the internet, from websites to web apps. I am currently better at the first one, but I'm always learning.
        </p>
        <div class="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
          <a class="btn btn-dark btn-lg px-3 py-2 custom-btn shadow-sm" href="#projects">
            View work <i class="bi bi-arrow-right ms-1"></i>
          </a>

          <a class="btn btn-outline-dark btn-lg px-3 py-2 custom-btn shadow-sm" href="/PaulOpaco_Resume.pdf" target="_blank" rel="noopener noreferrer">
            View Resume <i class="bi bi-file-earmark-pdf ms-1"></i>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
</script>
