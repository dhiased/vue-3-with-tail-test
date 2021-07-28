<template>
  <div class="max-w-6xl p-6 mx-auto items-center">
    <Sidebar />
    <div :style="{ 'margin-left': sidebarWidth }">
      <Toolbar class="p-mb-4">
        <template #left>
          <Button
            label="Add Manager"
            icon="pi pi-plus"
            class="p-button-primary p-mr-2 p-button-raised p-button-rounded"
            @click="openNew"
          />
        </template>

        <template #right> </template>
      </Toolbar>

      <DataTable
        sortField="id"
        :sortOrder="-1"
        v-model:selection="selectedDoc"
        ref="dt"
        dataKey="id"
        class="
          p-datatable-customers p-datatable-sm
          shadow
          rounded
          overflow-hidden
        "
        :value="documents"
        :globalFilterFields="['id', 'name']"
        :filters="filters1"
        filterDisplay="menu"
        :loading="loading1"
        removableSort
        responsiveLayout="scroll"
        :paginator="true"
        :rows="10"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 20, 50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
      >
        <template #header>
          <div>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                @change="searchFilterBackEnd()"
                class="p-inputtext"
                v-model="selectedSearch"
                placeholder="Search..."
              />
            </span>
          </div>
        </template>
        <template #empty> No documents found. </template>
        <template #loading> Loading documents data. Please wait. </template>

        <Column field="id" header="ID" :sortable="true"></Column>
        <Column field="name" header="Name" :sortable="true"></Column>
        <Column field="last_name" header="Last Name" :sortable="true"></Column>
        <Column
          field="registration_number"
          header="Registration Number"
          :sortable="true"
        ></Column>
        <Column
          field="profession"
          header="Profession"
          :sortable="true"
        ></Column>
        <Column field="email" header="Email" :sortable="true"></Column>

        <Column field="created_at" header="CREATED" :sortable="true"></Column>

        <Column header="ACTION">
          <template #body="slotProps">
            <Button
              style="margin-right: 0.5em"
              icon="pi pi-pencil"
              class="p-button-warning p-mr-2 p-button-sm"
              @click="editDocument(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-danger p-button-sm"
              @click="confirmDeleteDocument(slotProps.data)"
            />
          </template>
        </Column>

        <template #paginatorLeft>
          <!-- <Button type="button" icon="pi pi-refresh" class="p-button-text" /> -->
        </template>
        <template #paginatorRight>
          <!-- <Button type="button" icon="pi pi-cloud" class="p-button-text" /> -->
        </template>
      </DataTable>

      <Dialog
        v-model:visible="documentsDialog"
        :style="{ width: '450px' }"
        header="Manager Details"
        :modal="true"
        class="p-fluid"
      >
        <div class="p-grid p-fluid">
          <div class="p-col-12 p-md-6 p-grid">
            <div class="card">
              <label style="margin-bottom: 0.5em" class="font-bold" for="name"
                >First Name :</label
              >
              <InputText
                style="margin-bottom: 1em; margin-top: 0.5em"
                placeholder="First Name"
                required="true"
                autofocus
                v-model.trim="documentsObject.name"
              />
            </div>
            <div class="card">
              <label style="margin-bottom: 0.5em" class="font-bold" for="name"
                >Last Name :</label
              >
              <InputText
                style="margin-bottom: 1em; margin-top: 0.5em"
                placeholder="Last Name"
                required="true"
                autofocus
                v-model.trim="documentsObject.last_name"
              />
            </div>

            <div class="card">
              <label style="margin-bottom: 0.5em" class="font-bold" for="name"
                >Registration Number :</label
              >
              <InputText
                style="margin-bottom: 1em; margin-top: 0.5em"
                placeholder="Last Name"
                required="true"
                autofocus
                v-model.trim="documentsObject.registration_number"
              />
            </div>

            <div class="card">
              <label style="margin-bottom: 0.5em" class="font-bold" for="name"
                >Profession :</label
              >
              <InputText
                style="margin-bottom: 1em; margin-top: 0.5em"
                placeholder="Last Name"
                required="true"
                autofocus
                v-model.trim="documentsObject.profession"
              />
            </div>

            <div class="mb-1 text-left sm:mb-2">
              <label for="email-address" class="inline-block mb-1 font-bold"
                >E-mail</label
              >
              <input
                v-model.trim="documentsObject.email"
                placeholder="john@draexlmaier.com"
                required=""
                type="email"
                class="
                  flex-grow
                  w-full
                  h-12
                  px-4
                  mb-2
                  transition
                  duration-200
                  bg-white
                  border border-gray-300
                  rounded
                  shadow-sm
                  appearance-none
                  focus:border-cyan-400
                  focus:outline-none
                  focus:shadow-outline
                "
                id="email-address"
                name="email"
              />
            </div>

            <div class="mb-1 text-left sm:mb-2">
              <label for="password" class="inline-block mb-1 font-bold right-0"
                >Password</label
              >
              <input
                v-model.trim="documentsObject.password"
                placeholder="********"
                required=""
                type="Password"
                class="
                  flex-grow
                  w-full
                  h-12
                  px-4
                  mb-2
                  transition
                  duration-200
                  bg-white
                  border border-gray-300
                  rounded
                  shadow-sm
                  appearance-none
                  focus:border-cyan-400
                  focus:outline-none
                  focus:shadow-outline
                "
                id="Password"
                name="Password"
              />
            </div>
          </div>
        </div>

        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
          />
          <Button
            label="Update"
            icon="pi pi-check"
            class="p-button-text"
            @click="updateDocuments(documentsObject)"
          />
        </template>
      </Dialog>

      <Dialog
        v-model:visible="documentsAddDialog"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
        :style="{ width: '50vw' }"
        header="Add Manager"
        :modal="true"
        class="p-fluid"
      >
        <div class="card">
          <label style="margin-bottom: 0.5em" class="font-bold" for="name"
            >First Name :</label
          >
          <InputText
            style="margin-bottom: 1em; margin-top: 0.5em"
            placeholder="First Name"
            required="true"
            autofocus
            v-model="selectedFirstName"
          />
        </div>

        <div class="card">
          <label style="margin-bottom: 0.5em" class="font-bold" for="name"
            >Last Name :</label
          >
          <InputText
            style="margin-bottom: 1em; margin-top: 0.5em"
            placeholder="Last Name"
            required="true"
            autofocus
            v-model="selectedLastName"
          />
        </div>

        <div class="card">
          <label style="margin-bottom: 0.5em" class="font-bold" for="name"
            >Registration Number :</label
          >
          <InputText
            style="margin-bottom: 1em; margin-top: 0.5em"
            placeholder="Registration Number"
            required="true"
            autofocus
            v-model="selectedRegistrationNumber"
          />
        </div>

        <div class="card">
          <label style="margin-bottom: 0.5em" class="font-bold" for="name"
            >Profession :</label
          >
          <InputText
            style="margin-bottom: 1em; margin-top: 0.5em"
            placeholder="Profession"
            required="true"
            autofocus
            v-model="selectedProfession"
          />
        </div>

        <div class="mb-1 text-left sm:mb-2">
          <label for="email-address" class="inline-block mb-1 font-bold"
            >E-mail</label
          >
          <input
            v-model="emailInput"
            placeholder="john@draexlmaier.com"
            required=""
            type="email"
            class="
              flex-grow
              w-full
              h-12
              px-4
              mb-2
              transition
              duration-200
              bg-white
              border border-gray-300
              rounded
              shadow-sm
              appearance-none
              focus:border-cyan-400
              focus:outline-none
              focus:shadow-outline
            "
            id="email-address"
            name="email"
          />
        </div>

        <div class="mb-1 text-left sm:mb-2">
          <label for="password" class="inline-block mb-1 font-bold right-0"
            >Password</label
          >
          <input
            v-model="passwordInput"
            placeholder="********"
            required=""
            type="Password"
            class="
              flex-grow
              w-full
              h-12
              px-4
              mb-2
              transition
              duration-200
              bg-white
              border border-gray-300
              rounded
              shadow-sm
              appearance-none
              focus:border-cyan-400
              focus:outline-none
              focus:shadow-outline
            "
            id="Password"
            name="Password"
          />
        </div>

        <template #footer>
          <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
          />
          <Button
            label="Save"
            icon="pi pi-check"
            class="p-button-text"
            @click="saveDocuments()"
          />
        </template>
      </Dialog>

      <Dialog
        v-model:visible="deleteDocumentsDialog"
        :style="{ width: '450px' }"
        header="Confirm"
        :modal="true"
      >
        <div class="confirmation-content">
          <i
            class="pi pi-exclamation-triangle p-mr-3"
            style="font-size: 2rem"
          />
          <span v-if="documentsObject"
            >Are you sure you want to delete <b>{{ documentsObject.name }}</b
            >?</span
          >
        </div>
        <template #footer>
          <Button
            label="No"
            icon="pi pi-times"
            class="p-button-text"
            @click="deleteDocumentsDialog = false"
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            class="p-button-text"
            @click="deleteDocuments(documentsObject)"
          />
        </template>
      </Dialog>
      <router-view />
    </div>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import UserService from "../../service/UserServices";

import Sidebar from "@/components/sidebar/Sidebar";
import { sidebarWidth } from "@/components/sidebar/state";

export default {
  name: "Manager",

  components: { Sidebar },
  setup() {
    return { sidebarWidth };
  },

  data() {
    return {
      selectedProfession: null,
      selectedRegistrationNumber: null,
      selectedLastName: null,
      selectedFirstName: null,
      emailInput: "",
      passwordInput: null,
      selectedDoc: null,

      selectedTechnologyName: null,
      selectedDropDownTechnology: null,
      selectedDropDownTheme: null,

      myparams: {},
      products: null,
      selectedSearch: null,

      selectedTechnology: null,
      selectedTheme: null,
      documentsDialog: false,
      documentsAddDialog: false,
      deleteDocumentsDialog: false,
      documentsObject: {},
      submitted: false,
      documents: [],
      originalDocuments: [],
      documentService: null,
      filters1: null,
      loading1: true,

      technologies: [],

      themes: [],

      folders: [],
      technologiesDropDown: [],

      themesDropDown: [],

      foldersDropDown: [],
      updateDocument: [],
    };
  },
  created() {
    this.userService = new UserService();
  },
  mounted() {
    this.userService.getManagers(this.myparams).then((data) => {
      this.loading1 = false;
      this.documents = data;
      this.originalDocuments = data;
    });
  },

  methods: {
    saveDocuments() {
      let formData = new FormData();

      var name = this.selectedFirstName;
      console.log("name", name);

      var last_name = this.selectedLastName;
      console.log("last_name", last_name);

      var Registration = this.selectedRegistrationNumber;
      console.log("registration_number", Registration);

      var Profession = this.selectedProfession;
      console.log("profession", Profession);

      var email = this.emailInput;
      console.log("email", email);

      var password = this.passwordInput;
      console.log("password", password);

      formData.append("name", name);
      formData.append("last_name", last_name);
      formData.append("registration_number", Registration);
      formData.append("profession", Profession);
      formData.append("email", email);
      formData.append("password", password);

      this.userService.postManagers(formData).then((data) => {
        this.documentsAddDialog = false;

        console.log("data", data);
        this.documents.push(data);
      });
    },

    editDocument(data) {
      this.documentsObject = { ...data };
      console.log("edit data", data);
      this.documentsDialog = true;
    },
    updateDocuments(documentsObject) {
      var id = documentsObject.id;
      var name = documentsObject.name;
      var last_name = documentsObject.last_name;
      var registration_number = documentsObject.registration_number;
      var profession = documentsObject.profession;
      var email = documentsObject.email;

      // let formData = new FormData();
      var password = documentsObject.password;

      // formData.append("password", password);

      console.log("myid", id);

      this.userService
        .putManagers(
          id,
          name,
          last_name,
          registration_number,
          profession,
          email,
          password
        )
        .then((data) => {
          var updatedDoc = data;
          this.documents.map((item) => {
            if (item.id == id) {
              item.name = updatedDoc.name;
              item.last_name = updatedDoc.last_name;
              item.registration_number = updatedDoc.registration_number;
              item.profession = updatedDoc.profession;
              item.email = updatedDoc.email;
              item.password = updatedDoc.password;
            }
            return item;
          });
          // console.log("old", old);
          console.log("new", updatedDoc);

          this.documentsDialog = false;
          this.loading1 = false;
          console.log("data", data);
        });
      this.loading1 = true;
    },

    searchFilterBackEnd() {
      console.log("search backend", this.selectedSearch);
      var stringSearch = "";
      var tabSearch = [];

      console.log("tabSearch", tabSearch);
      this.myparams.search = this.selectedSearch;
      console.log("myparams of Search", this.myparams);
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },

    openNew() {
      this.documentsObject = {};
      this.submitted = false;
      this.documentsAddDialog = true;
    },
    hideDialog() {
      this.documentsDialog = false;
      this.submitted = false;
      this.documentsAddDialog = false;
    },

    deleteDocuments(documentsObject) {
      var id = documentsObject.id;

      console.log("my id delete me  ", id);

      this.userService.deleteManagers(id).then((data) => {
        this.documents = this.documents.filter(function (item) {
          return item.id != id;
        });
        this.deleteDocumentsDialog = false;
      });
    },

    confirmDeleteDocument(documentsObject) {
      this.documentsObject = documentsObject;
      this.deleteDocumentsDialog = true;
    },
  },
  watch: {
    myparams: {
      handler: function (_) {
        console.log("myparams has changed to = ", this.myparams);
        this.userService.getManagers(this.myparams).then((data) => {
          this.loading1 = false;
          this.documents = data;
          this.originalDocuments = data;
          this.documentsObject = data;
        });
      },
      deep: true, // mandatory
    },
  },
};
</script>







<style scoped >
::v-deep(.p-paginator) .p-paginator-current {
  margin-left: auto;
}
::v-deep(.p-progressbar) {
  height: 0.5rem;
  background-color: #d8dadc;
}
::v-deep(.p-progressbar) .p-progressbar-value {
  background-color: #607d8b;
}
::v-deep(.p-datepicker) {
  min-width: 25rem;
}
::v-deep(.p-datepicker) td {
  font-weight: 400;
}
::v-deep(.p-datatable.p-datatable-customers) .p-datatable-header {
  padding: 0.5rem;
  text-align: right;
  font-size: 0.5rem;
}
::v-deep(.p-datatable.p-datatable-customers) .p-paginator {
  padding: 1rem;
}
::v-deep(.p-datatable.p-datatable-customers) .p-datatable-thead > tr > th {
  text-align: left;
}
::v-deep(.p-datatable.p-datatable-customers) .p-datatable-tbody > tr > td {
  cursor: auto;
}
::v-deep(.p-datatable.p-datatable-customers)
  .p-dropdown-label:not(.p-placeholder) {
  text-transform: uppercase;
}

::v-deep(.p-multiselect) {
  min-width: 15rem;
}
.multiselect-custom-virtual-scroll .p-multiselect {
  min-width: 20rem;
}
::v-deep(.multiselect-custom .p-multiselect-label) {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
.multiselect-custom .country-item.country-item-value {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: inline-flex;
  margin-right: 0.5rem;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
}
.multiselect-custom .country-item.country-item-value span.flag {
  width: 10px;
}
.country-item {
  display: flex;
  align-items: center;
}
.country-item span.flag {
  width: 18px;
  height: 12px;
  margin-right: 0.5rem;
}
.multiselect-custom .country-placeholder {
  padding: 0.25rem;
}

.p-multiselect {
  width: 10rem;
}
::v-deep(.multiselect-custom) .p-multiselect-label:not(.p-placeholder) {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
}
::v-deep(.multiselect-custom) .country-item-value {
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
  display: inline-flex;
  margin-right: 0.5rem;
  background-color: var(--primary-color);
  color: var(--primary-color-text);
}
::v-deep(.multiselect-custom) .country-item-value img.flag {
  width: 10px;
}
@media screen and (max-width: 640px) {
  .p-multiselect {
    width: 100%;
  }
}

.header-centred {
  text-align: center;
}

.header-float {
  margin-bottom: 1rem;
  background-color: rgb(248, 249, 250);
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.three-margin {
  margin-right: 1rem;
}

.p-button.p-clear-p {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
}

.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

#flex-property {
  display: flex;
}

input[type="file"]::file-selector-button {
  border: 2px solid #00cec9;
  padding: 0.2em 0.4em;
  border-radius: 0.2em;
  background-color: #81ecec;
  transition: 1s;
}

input[type="file"]::file-selector-button:hover {
  background-color: #81ecec;
  border: 2px solid #00cec9;
}
</style>
