<template>
  <div class="max-w-6xl p-6 mx-auto items-center">
    <Toolbar class="p-mb-4">
      <template #left>
        <!-- <template
        #left
        v-if="this.myRole.roles[0].id == 1 || this.myRole.roles[0].id == 2"
      > -->
        <Button
          label="Add Report"
          icon="pi pi-plus"
          class="p-button-primary p-mr-2 p-button-raised p-button-rounded"
          @click="openNew"
        />
      </template>

      <template #right>
        <Dropdown
          :showClear="true"
          style="margin-bottom: 0.3em"
          id="Technology"
          v-model="selectedDropDownTechnologyRight"
          :options="technologiesDropDown"
          optionLabel="name"
          placeholder="Select a Technology"
          :filter="true"
          filterPlaceholder="Find a Technology"
          @change="getTechId()"
        />
      </template>
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
      <Column field="title" header="Title" :sortable="true"></Column>

      <!-- <Column
          field="description"
          header="Description"
          :sortable="true"
        ></Column> -->

      <!-- <Dialog
        header="Dialog"
        v-model:visible="display"
        :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '55vw' }"
        :modal="true"
      > -->
      <!-- <div class="p-grid p-fluid">
          <div class="p-col-12 p-md-6 p-grid">
            <div class="card">
              <label style="margin-bottom: 0.5em" class="font-bold" for="title"
                >TITLE :</label
              >
              <InputText
                style="margin-bottom: 1em; margin-top: 0.5em"
                id="title"
                placeholder="Title you want to add"
                required="true"
                autofocus
                v-model.trim="documentsObject.title"
              />
            </div>
          </div>
        </div>

        <div class="p-grid p-fluid">
          <div class="p-col-12 p-md-6 p-grid">
            <div class="card">
              <label style="margin-bottom: 0.5em" class="font-bold" for="name"
                >DESCRIPTION :</label
              >

              <Textarea
                rows="5"
                cols="30"
                id="description"
                required="true"
                autofocus
                v-model.trim="documentsObject.description"
              />
            </div>
          </div>
        </div> -->

      <!-- <InputText
            style="margin-bottom: 1em; margin-top: 0.5em"
            id="title"
            placeholder="Title you want to add"
            required="true"
            autofocus
            v-model.trim="documentsObject.title"
          />

          <template #body="slotProps">
            {{ documentsObject.description }}
            {{ documents.description }}
            {{ documents.title }}

            {{ slotProps.title }}

            {{ slotProps.description }}
          </template> -->
      <!-- <Textarea
            rows="15"
            cols="80"
            id="description"
            required="true"
            autofocus
            v-model.trim="documentsObject.description"
          /> -->

      <!-- end -->

      <!-- <template #footer>
          <Button
            label="Dismiss"
            @click="close"
            icon="pi pi-check"
            class="p-button-secondary"
          />
        </template> -->

      <!-- </Dialog> -->

      <Dialog
        v-model:visible="display"
        :breakpoints="{ '965px': '1926px' }"
        :style="{ width: '1926px' }"
        header="Report Details"
        :modal="true"
        class="p-fluid"
      >
        <div class="p-grid p-fluid">
          <div class="p-col-12 p-md-6 p-grid">
            <div class="card">
              <label style="margin-bottom: 0.5em" class="font-bold" for="title"
                >TITLE :</label
              >
              <!-- <InputText
                style="margin-bottom: 1em; margin-top: 0.5em"
                id="titlee"
                placeholder="Title you want to add"
                required="true"
                autofocus
                v-model.trim="documentsObject.title"
              /> -->
              <pre>{{ documentsObject.title }}</pre>
            </div>
          </div>
        </div>
        <!-- <div class="p-grid p-fluid">
          <div class="p-col-12 p-md-6 p-grid"> -->
        <div class="card" style="margin-top: 0.5em">
          <label class="font-bold" for="name">DESCRIPTION :</label>

          <!-- <Textarea
                Disabled="true"
                class="dark-text"
                rows="15"
                cols="80"
                id="descriptionn"
                required="true"
                autofocus
                v-model.trim="documentsObject.description"
              /> -->

          <div>
            <pre>{{ documentsObject.description }}</pre>
          </div>
          <!-- </div>
          </div> -->
        </div>

        <template #footer>
          <Button
            label="Dismiss"
            @click="close"
            icon="pi pi-check"
            class="p-button-secondary"
          />
          <!-- <Button
            label="Cancel"
            icon="pi pi-times"
            class="p-button-text"
            @click="hideDialog"
          /> -->
          <!-- <Button
            label="Update"
            icon="pi pi-check"
            class="p-button-text"
            @click="updateDocuments(documentsObject)"
          /> -->
        </template>
      </Dialog>

      <Column header="Description">
        <!-- <template #body="slotProps">
          <Button
            label="Show"
            icon="pi pi-external-link"
            @click="open(slotProps.data)"
          />
        </template> -->
        <template #body="slotProps">
          <Button
            style="margin-right: 0.5em"
            label="Show"
            icon="pi pi-external-link"
            class="p-mr-2 p-button-sm"
            @click="showReport(slotProps.data)"
          />
        </template>
      </Column>

      <Column field="user.name" header="USER" :sortable="true"></Column>

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
      :style="{ height: '965px', width: '1726px' }"
      header="Report Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-grid p-fluid">
        <div class="p-col-12 p-md-6 p-grid">
          <div class="card">
            <label style="margin-bottom: 0.5em" class="font-bold" for="title"
              >TITLE :</label
            >
            <InputText
              style="margin-bottom: 1em; margin-top: 0.5em"
              id="title"
              placeholder="Title you want to add"
              required="true"
              autofocus
              v-model.trim="documentsObject.title"
            />
          </div>
        </div>
      </div>

      <div class="p-grid p-fluid">
        <div class="p-col-12 p-md-6 p-grid">
          <div class="card">
            <label style="margin-bottom: 0.5em" class="font-bold" for="name"
              >DESCRIPTION :</label
            >

            <Textarea
              rows="5"
              cols="30"
              id="description"
              required="true"
              autofocus
              v-model.trim="documentsObject.description"
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
      header="Add Report"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="Technology" class="p-mb-3 font-bold">Technology</label>
        <Dropdown
          style="margin-bottom: 0.3em"
          id="Technology"
          v-model="selectedDropDownTechnology"
          :options="technologiesDropDown"
          optionLabel="name"
          placeholder="Select a Technology"
          :filter="true"
          filterPlaceholder="Find a Technology"
        />
      </div>

      <div class="card">
        <label style="margin-bottom: 0.5em" class="font-bold" for="title"
          >TITLE :</label
        >
        <InputText
          style="margin-bottom: 1em; margin-top: 0.5em"
          id="title"
          placeholder="Title you want to add"
          required="true"
          autofocus
          v-model="selectedTitleName"
        />
      </div>

      <div class="p-grid p-fluid">
        <div class="p-col-12 p-md-6 p-grid">
          <div class="card">
            <label style="margin-bottom: 0.5em" class="font-bold" for="name"
              >DESCRIPTION :</label
            >

            <Textarea
              v-model="selectedDescription"
              rows="5"
              cols="30"
              id="description"
              required="true"
              autofocus
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
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="documentsObject"
          >Are you sure you want to delete <b>{{ documentsObject.title }}</b
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
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import ReportService from "../../service/ReportServices";
import AuthenticationService from "../../service/AuthenticationServices";

export default {
  name: "AddLesson",

  data() {
    return {
      display: false,
      selectedDoc: null,
      selectedLanguage: null,
      selectedDescription: null,

      selectedTitleName: null,
      selectedTechnologyName: null,
      selectedDropDownTechnology: null,
      selectedDropDownTechnologyRight: null,
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

      allReports: [],

      documentService: null,
      filters1: null,
      loading1: true,

      technologies: [],

      themes: [],
      techParam: {},

      folders: [],
      technologiesDropDown: [],

      themesDropDown: [],

      foldersDropDown: [],
      updateDocument: [],
      myRole: {},
    };
  },
  created() {
    this.reportService = new ReportService();
    this.authenticationService = new AuthenticationService();
  },
  mounted() {
    this.reportService.getReports(this.myparams).then((data) => {
      this.loading1 = false;
      this.documents = data;
      this.originalDocuments = data;
      this.allReports = data;
    });

    this.reportService.getTechnologies().then((data) => {
      this.technologiesDropDown = data;
    });

    this.reportService.getReportsByTech(this.techParam).then((data) => {
      console.log("  data of getReportsByTech param", this.techParam);

      console.log("data of getReportsByTech param", data);
      this.themesDropDown = data;
      console.log("techsDropDown", data);
    });

    // this.authenticationService.getUser().then((data) => {
    //   this.myRole = data;
    //   console.log("myRole DATA", this.myRole);
    // });
  },

  methods: {
    open() {
      this.display = true;
    },
    close() {
      this.display = false;
    },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    saveDocuments() {
      let formData = new FormData();

      var technology_id = this.selectedDropDownTechnology.id;
      console.log("technology_id", technology_id);

      var description = this.selectedDescription;
      console.log("description", description);

      var title = this.selectedTitleName;
      console.log("title", title);

      formData.append("technology_id", technology_id);
      formData.append("title", title);
      formData.append("description", description);

      this.reportService.postReports(formData).then((data) => {
        this.documentsAddDialog = false;

        console.log("data", data);
        this.documents.push(data);
      });

      this.selectedDropDownTechnology = null;
      this.selectedTitleName = null;
      this.selectedDescription = null;
    },

    editDocument(data) {
      this.documentsObject = { ...data };
      console.log("edit data", data);
      this.documentsDialog = true;
    },

    showReport(data) {
      this.documentsObject = { ...data };
      console.log("edit data", data);
      this.display = true;
    },
    updateDocuments(documentsObject) {
      var id = documentsObject.id;
      var title = documentsObject.title;
      var description = documentsObject.description;
      console.log("myid", id);

      this.reportService.putReports(id, title, description).then((data) => {
        var updatedDoc = data.data;
        this.documents.map((item) => {
          if (item.id == id) {
            item.title = updatedDoc.title;
            item.description = updatedDoc.description;
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

    getTechId() {
      console.log("getTechId", this.selectedDropDownTechnologyRight);

      if (this.selectedDropDownTechnologyRight != null) {
        var tech_id = this.selectedDropDownTechnologyRight.id;
        // if (tech_id !== null) {
        //  console.log("tech_id is null ", tech_id);

        console.log("tech_id", tech_id);
        this.techParam = tech_id;
        console.log("techParam of technology_id", this.techParam);
        // }
      } else {
        this.myparams = {};
        console.log("getTechId myparams", this.myparams);
      }
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

      this.reportService.deleteReports(id).then((data) => {
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
        this.reportService.getReports(this.myparams).then((data) => {
          this.loading1 = false;
          this.documents = data;
          this.originalDocuments = data;
          this.documentsObject = data;
        });
      },
      deep: true, // mandatory
    },

    techParam: {
      handler: function (_) {
        console.log(" watch techParam has changed to = ", this.techParam);
        this.reportService.getReportsByTech(this.techParam).then((data) => {
          console.log(" techParam data of theme param", this.techParam);

          // console.log("data of theme param", data);
          // this.themesDropDown = data;
          // console.log("themesDropDown", data);
          this.loading1 = false;
          this.documents = data;
          this.originalDocuments = data;
          this.documentsObject = data;
        });
      },
      deep: true,
    },
  },
};
</script>







<style scoped >
pre {
  white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
  white-space: -pre-wrap; /* Opera */
  white-space: -o-pre-wrap; /* Opera */
  white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
  word-wrap: break-word; /* IE 5.5+ */
}

/* ::v-deep(.dark-text.p-inputtextarea) .p-inputtextarea {
  background: #00ff00;
  color: #81ecec;
}

::v-deep(.dark-text.p-dialog) .p-panel-title {
  background: #00ff00;
} */

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
