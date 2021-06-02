<template>
  <div class="max-w-6xl p-6 mx-auto items-center">
    <Toolbar class="p-mb-4">
      <template #left>
        <Button
          label="Add Technology"
          icon="pi pi-plus"
          class="p-button-primary p-mr-2 p-button-raised p-button-rounded"
          @click="openNew"
        />
      </template>
    </Toolbar>

    <DataTable
      sortField="id"
      :sortOrder="-1"
      v-model:selection="selectedDoc"
      ref="dt"
      dataKey="id"
      class="p-datatable-customers p-datatable-sm shadow rounded overflow-hidden"
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
      <Column field="name" header="NAME" :sortable="true"></Column>

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
      header="Document Details"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-grid p-fluid">
        <div class="p-col-12 p-md-6 p-grid">
          <div class="card">
            <label style="margin-bottom: 0.5em" class="font-bold" for="name"
              >NAME :</label
            >
            <InputText
              style="margin-bottom: 1em; margin-top: 0.5em"
              id="name"
              v-model.trim="documentsObject.name"
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
      header="Add Technology"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <!-- <label for="foldername" class="font-bold"
          >Create a folder if it doesn't exist</label
        > -->
        <InputText
          style="margin-bottom: 0.5em"
          id="foldername"
          placeholder="Name of technology you want to add"
          v-model="selectedFolderName"
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
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
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
          @click="deleteTechnologies(documentsObject)"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import TechnologyService from "../../service/TechnologyServices";

export default {
  name: "Technology",
  props: ["folder"],
  data() {
    return {
      selectedDoc: null,

      selectedFolderName: null,

      myparams: {},
      products: null,
      selectedSearch: null,

      documentsDialog: false,
      documentsAddDialog: false,
      deleteDocumentsDialog: false,
      documentsObject: {},
      submitted: false,
      documents: [],
      originalDocuments: [],
      technologyService: null,
      filters1: null,
      loading1: true,

      technologies: [],

      technologiesDropDown: [],

      updateDocument: [],
    };
  },
  created() {
    this.technologyService = new TechnologyService();
    // this.initFilters1();
  },
  mounted() {
    this.technologyService.getTechnologies(this.myparams).then((data) => {
      this.loading1 = false;
      this.documents = data;
      this.originalDocuments = data;

      this.technologies = this.getMyTechnologies(data);

      // this.myparams = this.folderFilterBackEnd(data);
    });
  },

  methods: {
    saveDocuments() {
      let formData = new FormData();

      var name = this.selectedFolderName;
      console.log("tech_name", name);

      formData.append("name", name);

      this.technologyService.postTechnologies(formData).then((data) => {
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

      console.log("myid", id);
      console.log("myname", name);

      this.technologyService.putTechnologies(id, name).then((data) => {
        var updatedDoc = data;
        console.log("updatedDoc", updatedDoc);
        this.documents.map((item) => {
          if (item.id == id) {
            item.name = updatedDoc.name;
            console.log("item.name", item.name);
            console.log("updatedDoc.name", updatedDoc.name);
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

    technologyFilterBackEnd() {
      console.log("tech backend", this.selectedTechnology);
      var tabTechnology = "";

      this.selectedTechnology.forEach((element) => {
        tabTechnology = tabTechnology + "," + element.name;
      });

      console.log("tabTechnology", tabTechnology);
      this.myparams.tech = tabTechnology;
      console.log("myparams of technology", this.myparams);
    },

    getMyTechnologies(data) {
      console.log("data.length", data.length);
      var technologies = [];
      var technologiesIds = [];

      for (var i = 0; i < data.length; i++) {
        // if (!technologiesIds.includes(data[i].technology)) {
        //   technologiesIds.push(data[i].technology);
        technologies.push(data[i].technology);
        // }
      }
      console.log("technologies length", technologies.length);

      return technologies;
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

    deleteTechnologies(documentsObject) {
      var id = documentsObject.id;

      console.log("my id delete me  ", id);

      this.technologyService.deleteTechnologies(id).then((data) => {
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
        this.technologyService.getTechnologies(this.myparams).then((data) => {
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
