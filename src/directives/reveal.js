export default {
  mounted(el, binding) {
    el.classList.add('reveal')

    const delay = binding.value?.delay ?? 0
    if (delay) {
      el.style.transitionDelay = `${delay}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    el.__revealObserver__ = observer
  },
  unmounted(el) {
    el.__revealObserver__?.disconnect()
  },
}
