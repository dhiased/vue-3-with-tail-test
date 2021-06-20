<template>
  <div
    class="
      px-4
      py-5
      mx-auto
      sm:max-w-xl
      md:max-w-full
      lg:max-w-screen-xl
      md:px-24
      lg:px-8
    "
  >
    <div class="relative flex items-center justify-between">
      <!-- <router-link to="/MyHome">  -->
      <img
        class="w-24 h-10 mb-0"
        src="../assets/dr-logo-png.png"
        alt="Draexlmaier logo"
      />
      <!-- </router-link> -->

      <ul class="flex items-center hidden space-x-8 lg:flex">
        <li>
          <router-link
            aria-label="Dashboard"
            title="Dashboard"
            class="
              exact
              font-medium
              tracking-wide
              text-gray-700
              transition-colors
              duration-200
              hover:text-cyan-400
            "
            to="/Dashboard"
            >Dashboard</router-link
          >
        </li>

        <li>
          <router-link
            aria-label="Technical"
            title="Technical"
            class="
              exact
              font-medium
              tracking-wide
              text-gray-700
              transition-colors
              duration-200
              hover:text-cyan-400
            "
            to="/Technical"
            >Technical Documentation</router-link
          >
        </li>
        <li>
          <router-link
            aria-label="Lessons"
            title="Lessons"
            class="
              exact
              font-medium
              tracking-wide
              text-gray-700
              transition-colors
              duration-200
              hover:text-cyan-400
            "
            to=""
            >Lessons Learned</router-link
          >
        </li>
        <li>
          <a
            href="/"
            aria-label="About us"
            title="About us"
            class="
              exact
              font-medium
              tracking-wide
              text-gray-700
              transition-colors
              duration-200
              hover:text-cyan-400
            "
            >Staff Qualifications</a
          >
        </li>
      </ul>
      <ul class="flex items-center hidden space-x-8 lg:flex">
        <li>
          <button
            class="
              inline-flex
              items-center
              justify-center
              h-10
              px-5
              font-medium
              tracking-wide
              text-white
              transition
              duration-200
              rounded
              shadow-md
              bg-cyan-400
              hover:bg-cyan-700
              focus:shadow-outline
              focus:outline-none
            "
            @click="logOut()"
            aria-label="Logout"
            title="Logout"
          >
            Logout
          </button>
        </li>
      </ul>
      <div class="lg:hidden">
        <button
          aria-label="Open Menu"
          title="Open Menu"
          class="
            p-2
            -mr-1
            transition
            duration-200
            rounded
            focus:outline-none
            focus:shadow-outline
            hover:bg-deep-purple-50
            focus:bg-deep-purple-50
          "
          @click="isMenuOpen = true"
        >
          <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
            ></path>
            <path
              fill="currentColor"
              d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
            ></path>
            <path
              fill="currentColor"
              d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
            ></path>
          </svg>
        </button>
        <div v-if="isMenuOpen" class="absolute top-0 left-0 w-full">
          <div class="p-5 bg-white border rounded shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <div>
                <img
                  class="w-24 h-10 mb-0"
                  src="../assets/dr-logo-png.png"
                  alt="Draexlmaier logo"
                />
              </div>
              <div>
                <button
                  aria-label="Close Menu"
                  title="Close Menu"
                  class="
                    p-2
                    -mt-2
                    -mr-2
                    transition
                    duration-200
                    rounded
                    hover:bg-gray-200
                    focus:bg-gray-200
                    focus:outline-none
                    focus:shadow-outline
                  "
                  @click="isMenuOpen = false"
                >
                  <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <nav>
              <ul class="space-y-4">
                <li>
                  <router-link
                    aria-label="Dashboard"
                    title="Dashboard"
                    class="
                      exact
                      font-medium
                      tracking-wide
                      text-gray-700
                      transition-colors
                      duration-200
                      hover:text-cyan-400
                    "
                    to="/Dashboard"
                    >Dashboard</router-link
                  >
                </li>
                <li>
                  <router-link
                    aria-label="Technical"
                    title="Technical"
                    class="
                      exact
                      font-medium
                      tracking-wide
                      text-gray-700
                      transition-colors
                      duration-200
                      hover:text-cyan-400
                    "
                    to="/Technical"
                    >Technical Documentation</router-link
                  >
                </li>
                <li>
                  <router-link
                    aria-label="Lessons"
                    title="Lessons"
                    class="
                      exact
                      font-medium
                      tracking-wide
                      text-gray-700
                      transition-colors
                      duration-200
                      hover:text-cyan-400
                    "
                    to=""
                    >Lessons Learned</router-link
                  >
                </li>
                <li>
                  <router-link
                    aria-label="Staff"
                    title="Staff"
                    class="
                      exact
                      font-medium
                      tracking-wide
                      text-gray-700
                      transition-colors
                      duration-200
                      hover:text-cyan-400
                    "
                    to=""
                    >Staff Qualifications</router-link
                  >
                </li>
                <li>
                  <router-link
                    @click="logOut()"
                    aria-label="Logout"
                    title="Logout"
                    class="
                      inline-flex
                      items-center
                      justify-center
                      w-full
                      h-10
                      px-5
                      font-medium
                      tracking-wide
                      text-white
                      transition
                      duration-200
                      rounded
                      shadow-md
                      bg-cyan-400
                      hover:bg-cyan-700
                      focus:shadow-outline
                      focus:outline-none
                    "
                    to="/Login"
                    >Logout</router-link
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthenticationService from "../service/AuthenticationServices";

export default {
  name: "NavBar",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  created() {
    this.authenticationService = new AuthenticationService();
  },

  methods: {
    logOut() {
      this.authenticationService.postLogOut().then(() => {
        localStorage.removeItem("token");
        this.$router.push("Login");

        // console.log("removed an item + cleared all items in data", data);
      });
    },
  },
};
</script>


<style>
/* .router-link-exact-active {
  color: #0097a7;
} */
</style>