<template>
  <div class="container-fluid py-5 bg-light" id="contact">
    <div class="container">

      <!-- TITLE -->
      <h1
        v-reveal
        class="text-center fw-bold mb-5 contact-main-title project-heading"
      >
        Contact
      </h1>

      <div class="row align-items-stretch g-4 g-lg-5">

        <!-- MAP -->
        <div
          class="col-12 col-md-6 d-flex align-items-center"
          v-reveal
        >
          <div
            class="w-100 rounded-3 overflow-hidden shadow-sm border map-wrapper"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15438.399357551283!2d121.02043096020934!3d14.678636380529046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b6d654bda83f%3A0xc1529be294f9273a!2sRamer%20Village%2C%2010%20Ruby%20St%2C%20Tandang%20Sora%2C%20Quezon%20City%2C%201116%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1779296578113!5m2!1sen!2sph"
              width="600"
              height="450"
              style="border: 0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <!-- CONTACT FORM -->
        <div
          class="col-12 col-md-6 d-flex flex-column"
          v-reveal="{ delay: 120 }"
        >
          <form
            class="w-100 d-flex flex-column h-100"
            @submit.prevent="handleSubmit"
          >

            <!-- NAME -->
            <div class="mb-3">
              <input
                v-model="form.fullName"
                type="text"
                name="fullName"
                class="form-control custom-input"
                placeholder="First Name M.I. Last Name"
                aria-label="Full Name"
                required
              />
            </div>

            <!-- EMAIL -->
            <div class="mb-3">
              <input
                v-model="form.email"
                type="email"
                name="email"
                class="form-control custom-input"
                placeholder="Email"
                aria-label="Email Address"
                required
              />
            </div>

            <!-- MESSAGE -->
            <div class="mb-4">
              <textarea
                v-model="form.message"
                name="message"
                class="form-control custom-input"
                rows="6"
                placeholder="Message"
                aria-label="Message Body"
                required
              ></textarea>
            </div>

            <!-- RECAPTCHA -->
            <div class="mb-4">

              <div
                ref="recaptchaContainer"
                class="recaptcha-container"
              ></div>

            </div>

            <!-- SOCIAL MEDIA + SUBMIT -->
            <div
              id="socmed"
              class="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-auto"
            >

              <!-- SOCIAL MEDIA -->
              <div class="d-flex gap-3 social-icons fs-4">

                <a
                  href="https://www.linkedin.com/in/paulopaco/"
                  class="text-dark-blue"
                  aria-label="Visit Paul's LinkedIn Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-linkedin"></i>
                </a>

                <a
                  href="https://www.facebook.com/senoretenten/"
                  class="text-dark-blue"
                  aria-label="Visit Paul's Facebook Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-facebook"></i>
                </a>

                <a
                  href="https://github.com/pvtopaco-arch"
                  class="text-dark-blue"
                  aria-label="Visit Paul's GitHub Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="bi bi-github"></i>
                </a>

              </div>

              <!-- SUBMIT BUTTON -->
              <button
                type="submit"
                class="btn btn-primary custom-submit-btn px-4 py-2"
                :disabled="isLoading"
              >
                {{ isLoading ? "Sending.." : "Submit" }}
              </button>

            </div>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>

import {
  reactive,
  ref,
  onMounted,
  onBeforeUnmount
} from "vue"

import { Notyf } from "notyf"

import "notyf/notyf.min.css"


/*
|--------------------------------------------------------------------------
| NOTYF
|--------------------------------------------------------------------------
*/

const notyf = new Notyf()


/*
|--------------------------------------------------------------------------
| WEB3FORMS
|--------------------------------------------------------------------------
*/

const WEB3FORMS_ACCESS_KEY =
  "4e03c52a-7a1b-4a9f-ba5d-9bf432fcdf45"

const subject =
  "New message from Portfolio Contact Form"


/*
|--------------------------------------------------------------------------
| GOOGLE reCAPTCHA V2 SITE KEY
|--------------------------------------------------------------------------
|
| This is your public Site Key.
|
*/

const RECAPTCHA_SITE_KEY =
  "6LeARYItAAAAANXnJszn5s_Skrdda0aT2OZXUz-F"


/*
|--------------------------------------------------------------------------
| FORM
|--------------------------------------------------------------------------
*/

const form = reactive({
  fullName: "",
  email: "",
  message: ""
})


/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const isLoading = ref(false)

const recaptchaContainer = ref(null)

const recaptchaWidgetId = ref(null)

const recaptchaToken = ref("")


/*
|--------------------------------------------------------------------------
| reCAPTCHA SUCCESS
|--------------------------------------------------------------------------
*/

function onRecaptchaSuccess(token) {

  console.log("reCAPTCHA verified.")

  recaptchaToken.value = token

}


/*
|--------------------------------------------------------------------------
| reCAPTCHA EXPIRED
|--------------------------------------------------------------------------
*/

function onRecaptchaExpired() {

  console.log("reCAPTCHA expired.")

  recaptchaToken.value = ""

}


/*
|--------------------------------------------------------------------------
| reCAPTCHA ERROR
|--------------------------------------------------------------------------
*/

function onRecaptchaError() {

  console.error("reCAPTCHA error.")

  recaptchaToken.value = ""

  notyf.error(
    "reCAPTCHA failed. Please try again."
  )

}


/*
|--------------------------------------------------------------------------
| RENDER reCAPTCHA
|--------------------------------------------------------------------------
*/

function renderRecaptcha() {

  if (!window.grecaptcha) {

    console.error(
      "Google reCAPTCHA is not loaded."
    )

    return

  }


  if (!recaptchaContainer.value) {

    console.error(
      "reCAPTCHA container not found."
    )

    return

  }


  if (recaptchaWidgetId.value !== null) {

    return

  }


  try {

    recaptchaWidgetId.value =
      window.grecaptcha.render(
        recaptchaContainer.value,
        {
          sitekey: RECAPTCHA_SITE_KEY,

          size: "normal",

          callback:
            onRecaptchaSuccess,

          "expired-callback":
            onRecaptchaExpired,

          "error-callback":
            onRecaptchaError
        }
      )


    console.log(
      "reCAPTCHA rendered successfully."
    )

  } catch (error) {

    console.error(
      "reCAPTCHA render error:",
      error
    )

  }

}


/*
|--------------------------------------------------------------------------
| LOAD reCAPTCHA
|--------------------------------------------------------------------------
*/

function loadRecaptcha() {

  if (
    window.grecaptcha &&
    typeof window.grecaptcha.render === "function"
  ) {

    renderRecaptcha()

    return

  }


  const checkRecaptcha =
    setInterval(() => {

      if (
        window.grecaptcha &&
        typeof window.grecaptcha.render ===
          "function"
      ) {

        clearInterval(checkRecaptcha)

        renderRecaptcha()

      }

    }, 100)

}


/*
|--------------------------------------------------------------------------
| RESET reCAPTCHA
|--------------------------------------------------------------------------
*/

function resetRecaptcha() {

  if (
    recaptchaWidgetId.value !== null &&
    window.grecaptcha
  ) {

    window.grecaptcha.reset(
      recaptchaWidgetId.value
    )

  }

  recaptchaToken.value = ""

}


/*
|--------------------------------------------------------------------------
| MOUNT
|--------------------------------------------------------------------------
*/

onMounted(() => {

  loadRecaptcha()

})


/*
|--------------------------------------------------------------------------
| UNMOUNT
|--------------------------------------------------------------------------
*/

onBeforeUnmount(() => {

  recaptchaToken.value = ""

  recaptchaWidgetId.value = null

})


/*
|--------------------------------------------------------------------------
| SUBMIT
|--------------------------------------------------------------------------
*/

const handleSubmit = async () => {

  /*
   * Check reCAPTCHA
   */

  if (!recaptchaToken.value) {

    notyf.error(
      "Please verify that you are not a robot."
    )

    return

  }


  isLoading.value = true


  try {

    /*
     * Submit to Web3Forms
     */

    const response =
      await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json"
          },

          body: JSON.stringify({

            access_key:
              WEB3FORMS_ACCESS_KEY,

            subject:
              subject,

            name:
              form.fullName,

            email:
              form.email,

            message:
              form.message,

            /*
             * reCAPTCHA response
             */

            "g-recaptcha-response":
              recaptchaToken.value

          })

        }
      )


    const result =
      await response.json()


    console.log(
      "Web3Forms response:",
      result
    )


    /*
     * SUCCESS
     */

    if (result.success) {

      notyf.success(
        "Message sent!"
      )


      form.fullName = ""

      form.email = ""

      form.message = ""


      resetRecaptcha()

    }


    /*
     * ERROR
     */

    else {

      console.error(
        "Web3Forms error:",
        result
      )


      notyf.error(
        result.message ||
        "Failed to send message."
      )


      resetRecaptcha()

    }

  }


  /*
   * CATCH ERROR
   */

  catch (error) {

    console.error(
      "Contact form error:",
      error
    )


    notyf.error(
      "Failed to send message."
    )


    resetRecaptcha()

  }


  /*
   * FINALLY
   */

  finally {

    isLoading.value = false

  }

}

</script>