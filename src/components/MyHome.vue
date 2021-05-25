<template>
<!-- <NavBar/> -->
<!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/MyHome">MyHome</router-link> -->
  <div class="relative">
    <img
      src="https://www.draexlmaier.com/fileadmin/_processed_/9/6/csm_Weltkarte_iStock_2019-11_d34b7a6a56.png"
      class="absolute inset-0 object-cover w-full h-full"
      alt="Draexlmaier Cover"
    />
    <div class="relative bg-opacity-75 bg-cyan-700">
      <svg
        class="absolute inset-x-0 bottom-0 text-white"
        viewBox="0 0 1160 163"
      >
        <path
          fill="currentColor"
          d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
        ></path>
      </svg>
      <div
        class="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20"
      >
        <div class="flex flex-col items-center justify-between xl:flex-row">
          <div class="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
          <img class="max-w-lg mx-auto mb-0 w-64 h-124" src="../assets/dr-logo-png.png" alt="Draexlmaier logo" />
           
           <br class="hidden md:block" />
<!--            
            <h2
              class="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl sm:leading-none"
            >
              DRÄXLMAIER Group <br class="hidden md:block" />
            </h2> -->
            <p class="max-w-xl mb-4 font-serif  text-gray-200 md:text-5xl">
              Strong solutions with character
             <b class="max-w-xl mb-4 font-semibold font-sans text-gray-200 md:text-2xl">for premium vehicles</b> 
            </p> 
            
             <p class="max-w-xl mb-4 font-mono text-gray-200 md:text-lg">
              Our products help shape the character of the fastest, most luxurious and most innovative vehicles in the world.
            </p>
            <!-- <a
              href="/"
              aria-label=""
              class="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
            >
              Learn more
              <svg
                class="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path
                  d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"
                ></path>
              </svg>
            </a> -->
          </div>
          <div class="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div class="bg-white rounded shadow-2xl p-7 sm:p-10">
              <h3
                class="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl"
              >
                Sign in
              </h3>
              <form action="{{ route('login') }}" method="post">
                <div class="mb-1 text-left sm:mb-2">
                  <label for="email-address" class="inline-block mb-1 font-bold"
                    >E-mail</label
                  >
                  <input
                    placeholder="john@draexlmaier.com"
                    required=""
                    type="email"
                    class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-cyan-400 focus:outline-none focus:shadow-outline"
                    id="email-address"
                    name="email"
                  />
                </div>

                <div class="mb-1 text-left sm:mb-2">
                  <label
                    for="password"
                    class="inline-block mb-1 font-bold right-0"
                    >Password</label
                  >
                  <input
                    placeholder="********"
                    required=""
                    type="Password"
                    class="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-cyan-400 focus:outline-none focus:shadow-outline"
                    id="Password"
                    name="Password"
                  />
                </div>

                <div class="mt-4 mb-2 sm:mb-4">
                  <button
                    type="submit"
                    class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-cyan-600 hover:bg-cyan-500 focus:shadow-outline focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                <!-- <p class="text-xs text-gray-600 sm:text-sm">
                We respect your privacy. Unsubscribe at any time.
              </p> -->
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
  name: "MyHome",
  components:{
    NavBar,
  }
};
</script>

<style>
</style>