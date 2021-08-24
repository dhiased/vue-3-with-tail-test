<script>
import Sidebar from "@/components/sidebar/Sidebar";
import { sidebarWidth } from "@/components/sidebar/state";
import NavBar from "../components/NavBar.vue";

import AuthenticationService from "../service/AuthenticationServices";
import DocumentService from "../service/DocumentServices";
import ReportService from "../service/ReportServices";

import UserService from "../service/UserServices";

export default {
  components: { Sidebar, NavBar },
  setup() {
    return { sidebarWidth };
  },
  data() {
    return {
      user: {},
      numberOfDocuments: null,
      numberOfAdmins: null,

      numberOfManagers: null,

      numberOfUsers: null,
      numberOfReports: null,
      myRole: null,
      myRoleNumber: null,
    };
  },
  created() {
    this.authenticationService = new AuthenticationService();
    this.documentService = new DocumentService();
    this.reportService = new ReportService();

    this.userService = new UserService();
  },

  mounted() {
    this.documentService.getDocumentNumbers().then((data) => {
      this.numberOfDocuments = data;
    });

    this.reportService.getReportNumbers().then((data) => {
      this.numberOfReports = data;
      this.myRole = JSON.parse(localStorage.getItem("user"));
      console.log("myRole", this.myRole);

      this.myRoleNumber = this.myRole.roles[0].id;
      console.log("myRoleNumber", this.myRoleNumber);
    });

    this.userService.getUserNumbers().then((data) => {
      this.numberOfUsers = data;
    });

    this.userService.getManagerNumbers().then((data) => {
      this.numberOfManagers = data;
    });

    this.userService.getAdminNumbers().then((data) => {
      this.numberOfAdmins = data;
    });
  },

  methods: {
    // myRoleNumber() {
    //   this.getRole = localStorage.getItem("user");
    //   console.log("this.getRole", this.getRole);
    // },
    // this.authenticationService.getUser().then((data) => {
    //   this.user = data;
    //   console.log("data", this.user);
    // });
    // getUser() {
    // this.user = this.authenticationService.getItem("user");
    // console.log("user", this.user);
    // },
  },
};
</script>
<template>
  <div>
    <NavBar />

    <div v-if="myRoleNumber == 3">
      <div
        class="
          max-w-screen-xl
          p-4
          bg-white
          dark:bg-gray-800
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          relative
          py-26
          lg:mt-20
        "
      >
        <div class="relative">
          <div
            class="
              lg:grid lg:grid-flow-row-dense lg:grid-cols-2
              lg:gap-8
              lg:items-center
            "
          >
            <div class="lg:col-start-2 lg:max-w-2xl ml-auto">
              <!-- <p
                class="
                  text-base
                  leading-6
                  text-indigo-500
                  font-semibold
                  uppercase
                "
              >
                Interactive
              </p> -->
              <h4
                class="
                  mt-2
                  text-2xl
                  leading-8
                  font-extrabold
                  text-gray-900
                  dark:text-white
                  sm:text-3xl
                  sm:leading-9
                "
              >
                Taking responsibility together
              </h4>
              <p
                class="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300"
              >
                "We have to remain true to the values that have always
                characterized us: cooperation within the company; thinking and
                acting for each other and with each other; and absolute
                reliability."
              </p>
              <br />
              <p
                class="
                  text-base
                  leading-6
                  text-indigo-500
                  font-semibold
                  uppercase
                "
              >
                Fritz Dräxlmaier Sr., company founder
              </p>
              <ul class="mt-8 md:grid md:grid-cols-2 gap-6">
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span
                      class="
                        flex-shrink-0 flex
                        items-center
                        justify-center
                        h-6
                        w-6
                        rounded-full
                        bg-green-100
                        text-green-800
                        dark:text-green-500
                        drark:bg-transparent
                      "
                    >
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span
                      class="
                        ml-4
                        text-base
                        leading-6
                        font-medium
                        text-gray-500
                        dark:text-gray-200
                      "
                    >
                      20 countries
                    </span>
                  </div>
                </li>
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span
                      class="
                        flex-shrink-0 flex
                        items-center
                        justify-center
                        h-6
                        w-6
                        rounded-full
                        bg-green-100
                        text-green-800
                        dark:text-green-500
                        drark:bg-transparent
                      "
                    >
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span
                      class="
                        ml-4
                        text-base
                        leading-6
                        font-medium
                        text-gray-500
                        dark:text-gray-200
                      "
                    >
                      75.000 employees
                    </span>
                  </div>
                </li>
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span
                      class="
                        flex-shrink-0 flex
                        items-center
                        justify-center
                        h-6
                        w-6
                        rounded-full
                        bg-green-100
                        text-green-800
                        dark:text-green-500
                        drark:bg-transparent
                      "
                    >
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span
                      class="
                        ml-4
                        text-base
                        leading-6
                        font-medium
                        text-gray-500
                        dark:text-gray-200
                      "
                    >
                      65 sites
                    </span>
                  </div>
                </li>
                <li class="mt-6 lg:mt-0">
                  <div class="flex">
                    <span
                      class="
                        flex-shrink-0 flex
                        items-center
                        justify-center
                        h-6
                        w-6
                        rounded-full
                        bg-green-100
                        text-green-800
                        dark:text-green-500
                        drark:bg-transparent
                      "
                    >
                      <svg
                        class="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span
                      class="
                        ml-4
                        text-base
                        leading-6
                        font-medium
                        text-gray-500
                        dark:text-gray-200
                      "
                    >
                      60 years of tradition
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div
              class="mt-10 lg:-mx-4 relative relative-20 lg:mt-0 lg:col-start-1"
            >
              <div class="relative space-y-4">
                <div
                  class="
                    flex
                    items-end
                    justify-center
                    lg:justify-start
                    space-x-4
                  "
                >
                  <img
                    class="rounded-lg shadow-lg w-32 md:w-56"
                    width="200"
                    src="../assets/worker.jpg"
                    alt="1"
                  />

                  <img
                    class="rounded-lg shadow-lg w-40 md:w-64"
                    width="260"
                    src="../assets/world.png"
                    alt="2"
                  />
                </div>
                <div
                  class="
                    flex
                    items-start
                    justify-center
                    lg:justify-start
                    space-x-4
                    ml-12
                  "
                >
                  <img
                    class="rounded-lg shadow-lg w-24 md:w-40"
                    width="170"
                    src="../assets/site.jpg"
                    alt="3"
                  />
                  <img
                    class="rounded-lg shadow-lg w-32 md:w-56"
                    width="200"
                    src="../assets/car.jpg"
                    alt="4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="myRoleNumber == 1 || myRoleNumber == 2">
      <Sidebar />
    </div>
    <div :style="{ 'margin-left': sidebarWidth }">
      <!-- <h1 v-if="this.user.roles.id !== 3">Dashboard Page</h1> -->
      <!-- <h1>Documents {{ numberOfDocuments }}</h1> -->
      <!-- <div class="col-md-3">
        <div class="stati turquoise left">
          <i class="icon-docs icons"></i>
          <div>
            <b>{{ numberOfDocuments }}</b>
            <span>Documents</span>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="stati turquoise left">
          <i class="icon-docs icons"></i>
          <div>
            <b>{{ numberOfAdmins }}</b>
            <span>Admins</span>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="stati turquoise left">
          <i class="icon-docs icons"></i>
          <div>
            <b>{{ numberOfManagers }}</b>
            <span>Managers</span>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="stati turquoise left">
          <i class="icon-docs icons"></i>
          <div>
            <b>{{ numberOfUsers }}</b>
            <span>Users</span>
          </div>
        </div>
      </div> -->

      <!-- what manager can see -->
      <div
        v-if="myRoleNumber == 2"
        class="container mx-auto px-6 p-6 bg-white dark:bg-gray-800"
      >
        <div
          class="
            px-4
            py-16
            mx-auto
            sm:max-w-xl
            md:max-w-full
            lg:max-w-screen-xl
            md:px-24
            lg:px-8
            lg:py-20
          "
        >
          <div
            class="
              grid grid-cols-5
              flex flex-wrap
              justify-center
              lg:justify-between
              md:grid-cols-2
            "
          >
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                {{ numberOfDocuments }}
              </h6>
              <p
                class="
                  text-sm
                  font-medium
                  tracking-widest
                  text-gray-800
                  uppercase
                  lg:text-base
                "
              >
                Documents
              </p>
            </div>
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                {{ numberOfReports }}
              </h6>
              <p
                class="
                  text-sm
                  font-medium
                  tracking-widest
                  text-gray-800
                  uppercase
                  lg:text-base
                "
              >
                Reports
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- End of what manager can see -->

      <div
        v-if="myRoleNumber == 1"
        class="container mx-auto px-6 p-6 bg-white dark:bg-gray-800"
      >
        <div
          class="
            px-4
            py-16
            mx-auto
            sm:max-w-xl
            md:max-w-full
            lg:max-w-screen-xl
            md:px-24
            lg:px-8
            lg:py-20
          "
        >
          <div
            class="
              grid grid-cols-5
              flex flex-wrap
              justify-center
              lg:justify-between
              md:grid-cols-5
            "
          >
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                {{ numberOfDocuments }}
              </h6>
              <p
                class="
                  text-sm
                  font-medium
                  tracking-widest
                  text-gray-800
                  uppercase
                  lg:text-base
                "
              >
                Documents
              </p>
            </div>
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                {{ numberOfReports }}
              </h6>
              <p
                class="
                  text-sm
                  font-medium
                  tracking-widest
                  text-gray-800
                  uppercase
                  lg:text-base
                "
              >
                Reports
              </p>
            </div>

            <div>
              <div class="text-center md:border-r">
                <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                  {{ numberOfAdmins }}
                </h6>
                <p
                  class="
                    text-sm
                    font-medium
                    tracking-widest
                    text-gray-800
                    uppercase
                    lg:text-base
                  "
                >
                  Admins
                </p>
              </div>
            </div>

            <div v-if="myRoleNumber == 1">
              <div class="text-center md:border-r">
                <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                  {{ numberOfManagers }}
                </h6>
                <p
                  class="
                    text-sm
                    font-medium
                    tracking-widest
                    text-gray-800
                    uppercase
                    lg:text-base
                  "
                >
                  Managers
                </p>
              </div>
            </div>

            <div v-if="myRoleNumber == 1">
              <div class="text-center">
                <h6 class="text-4xl font-bold lg:text-5xl xl:text-6xl">
                  {{ numberOfUsers }}
                </h6>
                <p
                  class="
                    text-sm
                    font-medium
                    tracking-widest
                    text-gray-800
                    uppercase
                    lg:text-base
                  "
                >
                  Users
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="p-col-12 p-lg-4">
        <div class="card summary">
          <span class="title">Documents</span>
          <span class="detail">Number of Documents</span>
          <span class="count visitors">{{ numberOfDocuments }}</span>
        </div>
      </div>
      <div class="p-col-12 p-lg-4">
        <div class="card summary">
          <span class="title">Sales</span>
          <span class="detail">Number of purchases</span>
          <span class="count purchases">534</span>
        </div>
      </div>
      <div class="p-col-12 p-lg-4">
        <div class="card summary">
          <span class="title">Revenue</span>
          <span class="detail">Income for today</span>
          <span class="count revenue">$3,200</span>
        </div>
      </div> -->
        <router-view />
      </div>

      <!-- <section class="p-6 dark:bg-coolGray-800 dark:text-coolGray-100">
        <div class="flex flex-wrap justify-center lg:justify-between">
          <div class="flex flex-col justify-start m-2 lg:m-6">
            <p class="text-4xl font-bold leading-none lg:text-6xl">
              {{ numberOfAdmins }}
            </p>
            <p class="text-sm sm:text-base">Admins</p>
          </div>
          <div class="flex flex-col justify-start m-2 lg:m-6">
            <p class="text-4xl font-bold leading-none lg:text-6xl">
              {{ numberOfManagers }}
            </p>
            <p class="text-sm sm:text-base">Managers</p>
          </div>
          <div class="flex flex-col justify-start m-2 lg:m-6">
            <p class="text-4xl font-bold leading-none lg:text-6xl">
              {{ numberOfUsers }}
            </p>
            <p class="text-sm sm:text-base">Users</p>
          </div>

          <div class="flex flex-col justify-start m-2 lg:m-6">
            <p class="text-4xl font-bold leading-none lg:text-6xl">
              {{ numberOfDocuments }}
            </p>
            <p class="text-sm sm:text-base">Documents</p>
          </div>
          <div class="flex flex-col justify-start m-2 lg:m-6">
            <p class="text-4xl font-bold leading-none lg:text-6xl">
              {{ numberOfReports }}
            </p>
            <p class="text-sm sm:text-base">Reports</p>
          </div>
        </div>
      </section> -->
    </div>
  </div>
</template>

<style scoped>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* body {
  background: url("http://rybd.com/wp-content/uploads/2014/12/blue-polygon.png");
} */

.stati {
  background: #fff;
  height: 6em;
  padding: 1em;
  margin: 1em 0;
  -webkit-transition: margin 0.5s ease, box-shadow 0.5s ease; /* Safari */
  transition: margin 0.5s ease, box-shadow 0.5s ease;
  -moz-box-shadow: 0px 0.2em 0.4em rgb(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0.2em 0.4em rgb(0, 0, 0, 0.8);
  box-shadow: 0px 0.2em 0.4em rgb(0, 0, 0, 0.8);
}
.stati:hover {
  margin-top: 0.5em;
  -moz-box-shadow: 0px 0.4em 0.5em rgb(0, 0, 0, 0.8);
  -webkit-box-shadow: 0px 0.4em 0.5em rgb(0, 0, 0, 0.8);
  box-shadow: 0px 0.4em 0.5em rgb(0, 0, 0, 0.8);
}
.stati i {
  font-size: 3.5em;
}
.stati div {
  width: calc(100% - 3.5em);
  display: block;
  float: right;
  text-align: right;
}
.stati div b {
  font-size: 2.2em;
  width: 100%;
  padding-top: 0px;
  margin-top: -0.2em;
  margin-bottom: -0.2em;
  display: block;
}
.stati div span {
  font-size: 1em;
  width: 100%;
  color: rgb(0, 0, 0, 0.8);
  display: block;
}

.stati.left div {
  float: left;
  text-align: left;
}

.stati.bg-turquoise {
  background: rgb(26, 188, 156);
  color: white;
}
.stati.bg-emerald {
  background: rgb(46, 204, 113);
  color: white;
}
.stati.bg-peter_river {
  background: rgb(52, 152, 219);
  color: white;
}
.stati.bg-amethyst {
  background: rgb(155, 89, 182);
  color: white;
}
.stati.bg-wet_asphalt {
  background: rgb(52, 73, 94);
  color: white;
}
.stati.bg-green_sea {
  background: rgb(22, 160, 133);
  color: white;
}
.stati.bg-nephritis {
  background: rgb(39, 174, 96);
  color: white;
}
.stati.bg-belize_hole {
  background: rgb(41, 128, 185);
  color: white;
}
.stati.bg-wisteria {
  background: rgb(142, 68, 173);
  color: white;
}
.stati.bg-midnight_blue {
  background: rgb(44, 62, 80);
  color: white;
}
.stati.bg-sun_flower {
  background: rgb(241, 196, 15);
  color: white;
}
.stati.bg-carrot {
  background: rgb(230, 126, 34);
  color: white;
}
.stati.bg-alizarin {
  background: rgb(231, 76, 60);
  color: white;
}
.stati.bg-clouds {
  background: rgb(236, 240, 241);
  color: white;
}
.stati.bg-concrete {
  background: rgb(149, 165, 166);
  color: white;
}
.stati.bg-orange {
  background: rgb(243, 156, 18);
  color: white;
}
.stati.bg-pumpkin {
  background: rgb(211, 84, 0);
  color: white;
}
.stati.bg-pomegranate {
  background: rgb(192, 57, 43);
  color: white;
}
.stati.bg-silver {
  background: rgb(189, 195, 199);
  color: white;
}
.stati.bg-asbestos {
  background: rgb(127, 140, 141);
  color: white;
}

.stati.turquoise {
  color: rgb(26, 188, 156);
}
.stati.emerald {
  color: rgb(46, 204, 113);
}
.stati.peter_river {
  color: rgb(52, 152, 219);
}
.stati.amethyst {
  color: rgb(155, 89, 182);
}
.stati.wet_asphalt {
  color: rgb(52, 73, 94);
}
.stati.green_sea {
  color: rgb(22, 160, 133);
}
.stati.nephritis {
  color: rgb(39, 174, 96);
}
.stati.belize_hole {
  color: rgb(41, 128, 185);
}
.stati.wisteria {
  color: rgb(142, 68, 173);
}
.stati.midnight_blue {
  color: rgb(44, 62, 80);
}
.stati.sun_flower {
  color: rgb(241, 196, 15);
}
.stati.carrot {
  color: rgb(230, 126, 34);
}
.stati.alizarin {
  color: rgb(231, 76, 60);
}
.stati.clouds {
  color: rgb(236, 240, 241);
}
.stati.concrete {
  color: rgb(149, 165, 166);
}
.stati.orange {
  color: rgb(243, 156, 18);
}
.stati.pumpkin {
  color: rgb(211, 84, 0);
}
.stati.pomegranate {
  color: rgb(192, 57, 43);
}
.stati.silver {
  color: rgb(189, 195, 199);
}
.stati.asbestos {
  color: rgb(127, 140, 141);
}
.days {
  width: 280px;
  margin: 0 auto;
}
.days.day {
  display: block;
  float: left;
  width: (100% / 7);
  font-size: 9px;
  color: #949494;
  line-height: 30px;
  text-transform: uppercase;
  text-align: center;
}
</style>
