<template>
  <div class="max-w-4xl p-6 mx-auto items-center">
    <Toolbar class="p-mb-4">
      <template #left>
        <Button
          label="Add Document"
          icon="pi pi-plus"
          class="p-button-primary p-mr-2 p-button-raised p-button-rounded"
          @click="openNew"
        />
      </template>

      <template #right>
        <!-- <FileUpload
          mode="basic"
          accept="image/*"
          :maxFileSize="1000000"
          label="Import"
          chooseLabel="Import"
          class="p-mr-2 p-d-inline-block"
        /> -->
        <Button
          label="Export"
          icon="pi pi-upload"
          class="p-button-secondary p-button-raised p-button-rounded"
          @click="exportCSV($event)"
        />
      </template>
    </Toolbar>

    <div class="header-centred header-float shadow rounded overflow-hidden">
      <MultiSelect
        class="multiselect-custom three-margin"
        @change="technologyFilterBackEnd()"
        v-model="selectedTechnology"
        :options="technologies"
        optionLabel="name"
        placeholder="Select a Technology"
      >
        <template #value="slotProps">
          <div
            class="country-item country-item-value"
            v-for="option of slotProps.value"
            :key="option.name"
          >
            <span :class="'flag flag-' + option.name.toLowerCase()" />
            <div>{{ option.name }}</div>
          </div>
          <template v-if="!slotProps.value || slotProps.value.length === 0">
            <div class="country-placeholder">Select Technologies</div>
          </template>
        </template>
        <template #option="slotProps">
          <div class="country-item">
            <span :class="'flag flag-' + slotProps.option.name.toLowerCase()" />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </MultiSelect>

      <MultiSelect
        class="multiselect-custom three-margin"
        @change="themeFilterBackEnd()"
        v-model="selectedTheme"
        :options="themes"
        optionLabel="name"
        placeholder="Select a Theme"
      >
        <template #value="slotProps">
          <div
            class="country-item country-item-value"
            v-for="option of slotProps.value"
            :key="option.name"
          >
            <span :class="'flag flag-' + option.name.toLowerCase()" />
            <div>{{ option.name }}</div>
          </div>
          <template v-if="!slotProps.value || slotProps.value.length === 0">
            <div class="country-placeholder">Select Themes</div>
          </template>
        </template>
        <template #option="slotProps">
          <div class="country-item">
            <span :class="'flag flag-' + slotProps.option.name.toLowerCase()" />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </MultiSelect>

      <MultiSelect
        class="multiselect-custom three-margin"
        @change="folderFilterBackEnd()"
        v-model="selectedFolder"
        :options="folders"
        optionLabel="name"
        placeholder="Select a Folder"
      >
        <template #value="slotProps">
          <div
            class="country-item country-item-value"
            v-for="option of slotProps.value"
            :key="option.name"
          >
            <span :class="'flag flag-' + option.name.toLowerCase()" />
            <div>{{ option.name }}</div>
          </div>
          <template v-if="!slotProps.value || slotProps.value.length === 0">
            <div class="country-placeholder">Select Folders</div>
          </template>
        </template>
        <template #option="slotProps">
          <div class="country-item">
            <span :class="'flag flag-' + slotProps.option.name.toLowerCase()" />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </MultiSelect>
    </div>

    <DataTable
      v-model:selection="selectedDoc"
      ref="dt"
      dataKey="id"
      class="p-datatable-customers p-datatable-sm shadow rounded overflow-hidden"
      :value="documents"
      :globalFilterFields="['id', 'name', 'format', 'language', 'folders']"
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
          <!-- <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined p-button p-clear-p"
            @click="clearFilter1()"
          /> -->
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
      <Column selectionMode="multiple" headerStyle="width: 3em"></Column>
      <Column field="id" header="ID" :sortable="true"></Column>
      <Column field="name" header="NAME" :sortable="true"></Column>
      <Column field="format" header="FORMAT" :sortable="true"></Column>
      <Column field="language" header="LANGUAGE" :sortable="true"></Column>
      <Column field="created_at" header="CREATED" :sortable="true"></Column>
      <Column field="user.name" header="USER" :sortable="true"></Column>

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
              :class="{ 'p-invalid': submitted && !documentsObject.name }"
            />
            <small class="p-error" v-if="submitted && !documentsObject.name"
              >Name is required.</small
            >
          </div>

          <div class="card">
            <label style="margin-bottom: 2em" class="font-bold" for="name"
              >LANGUAGE :</label
            >
            <div id="flex-property" class="p-grid">
              <div class="p-col-12 p-md-4">
                <div class="p-field-radiobutton">
                  <RadioButton
                    style="margin-right: 0.5em; margin-top: 0.5em"
                    id="language1"
                    name="language"
                    value="German"
                    v-model="documentsObject.language"
                    required
                  />
                  <label style="margin-right: 2em" for="option1">German</label>
                </div>
              </div>
              <div class="p-col-12 p-md-4">
                <div class="p-field-radiobutton">
                  <RadioButton
                    style="margin-right: 0.5em; margin-top: 0.5em"
                    id="language2"
                    name="language"
                    value="English"
                    v-model="documentsObject.language"
                  />
                  <label for="language2">English</label>
                </div>
              </div>
            </div>
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
      header="Add Document"
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
        />
        <!-- <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' + slotProps.value.value">{{
                slotProps.value.label
              }}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span
                :class="'product-badge status-' + slotProps.value.toLowerCase()"
                >{{ slotProps.value }}</span
              >
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
        </Dropdown> -->
      </div>

      <div class="p-field">
        <label for="Theme" class="p-mb-3 font-bold">Theme</label>
        <Dropdown
          style="margin-bottom: 0.3em"
          id="Theme"
          v-model="selectedDropDownTheme"
          :options="themesDropDown"
          optionLabel="name"
          placeholder="Select a Theme"
        />
      </div>

      <div class="p-field">
        <label for="Folder" class="p-mb-3 font-bold">Folder</label>
        <Dropdown
          style="margin-bottom: 0.3em"
          id="Folder"
          v-model="selectedDropDownFolder"
          :options="foldersDropDown"
          optionLabel="name"
          placeholder="Select a Folder"
        />
      </div>

      <div class="p-field">
        <label for="foldername" class="font-bold"
          >Create a folder if it doesn't exist</label
        >
        <InputText
          style="margin-bottom: 0.5em"
          id="foldername"
          placeholder="Name of the folder you want to create"
          :class="{ 'p-invalid': submitted && !documentsObject.name }"
        />
        <small class="p-error" v-if="submitted && !documentsObject.name"
          >Folder Name is required.</small
        >
      </div>

      <input
        style="margin-bottom: 0.4em; margin-top: 0.2em"
        type="file"
        multiple
        id="fileUpload"
      />

      <div class="card">
        <label style="margin-bottom: 1em" class="font-bold" for="name"
          >Language</label
        >
        <div id="flex-property" class="p-grid">
          <div class="p-col-12 p-md-4">
            <div class="p-field-radiobutton">
              <RadioButton
                style="margin-right: 0.5em; margin-top: 0.5em"
                id="language1"
                name="language"
                value="German"
                v-model="documentsObject.language"
                required
              />
              <label style="margin-right: 2em" for="option1">German</label>
            </div>
          </div>
          <div class="p-col-12 p-md-4">
            <div class="p-field-radiobutton">
              <RadioButton
                style="margin-right: 0.5em; margin-top: 0.5em"
                id="language2"
                name="language"
                value="English"
                v-model="documentsObject.language"
              />
              <label for="language2">English</label>
            </div>
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
          @click="saveDocuments"
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
          @click="deleteDocuments"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import DocumentService from "../../service/DocumentServices";

export default {
  name: "Prime",
  props: ["folder"],
  data() {
    return {
      selectedDoc: null,
      selectedDropDownTechnology: null,
      selectedDropDownTheme: null,
      selectedDropDownFolder: null,
      myparams: {},
      products: null,
      selectedSearch: null,
      selectedFolder: null,
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
      statuses: ["txt", "jpeg", "pdf", "mp3", "renewal", "proposal"],
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
    this.documentService = new DocumentService();
    // this.initFilters1();
  },
  mounted() {
    this.documentService.getDocuments(this.myparams).then((data) => {
      this.loading1 = false;
      this.documents = data;
      this.originalDocuments = data;
      // this.documentsObject = data;
      // this.technologies = getMyTechnologies(data);
      // this.themes = getMythemes(data);
      this.folders = this.getMyFolders(data);
      this.themes = this.getMyThemes(data);
      this.technologies = this.getMyTechnologies(data);

      this.technologiesDropDown = this.getMyTechnologies(data);
      this.themesDropDown = this.getMyThemes(data);
      this.foldersDropDown = this.getMyFolders(data);

      // this.myparams = this.folderFilterBackEnd(data);
    });
  },

  methods: {
    editDocument(documentsObject) {
      this.documentsObject = { ...documentsObject };
      console.log("edit documentObject", documentsObject);
      this.documentsDialog = true;
    },
    updateDocuments(documentsObject) {
      var id = documentsObject.id;
      var name = documentsObject.name;
      var language = documentsObject.language;
      console.log("myid", id);

      this.documentService.putDocuments(id, name, language).then((data) => {
        this.documentsObject = this.editDocument(data);
        this.documentsDialog = false;
        this.loading1 = false;
        console.log("data", data);
      });
      this.loading1 = true;
      // this.$toast.add({
      //   severity: "info",
      //   summary: "Document Updated",
      //   detail: "Name: " + documentsObject.name,
      //   life: 3000,
      // });
    },

    // folderFilter() {
    //   // console.log("hello", filters1['techFilter'].value);
    //   // console.log("id=", this.selectedTechnology[0].id);
    //   console.log("length =", this.documents.length);
    //   var temp = [];
    //   var folderNames = [];
    //   for (var i = 0; i < this.selectedFolder.length; i++) {
    //     for (var j = 0; j < this.documents.length; j++) {
    //       if (this.documents[j].folder.id == this.selectedFolder[i].id) {
    //         temp.push(this.documents[j]);
    //         folderNames = this.selectedFolder[i];
    //       }
    //     }
    //   }
    //   this.documents = temp;
    //   this.$route.params.folder = folderNames;
    //   console.log("length =", this.documents.length);
    // },
    // showTechnologyDropDown(data) {
    //   console.log("data DropDown tech length", data.length);
    //   var technologies = [];
    //   var technologiesIds = [];

    //   for (var i = 0; i < data.length; i++) {
    //     if (!technologiesIds.includes(data[i].folder.theme.technology.id)) {
    //       technologiesIds.push(data[i].folder.theme.technology.id);
    //       technologies.push(data[i].folder.theme.technology);
    //     }
    //   }
    //   console.log("technologies DropDown tech length", technologies.length);

    //   return technologies;
    // },

    // showThemeDropDown(data) {
    //   console.log("data.length", data.length);
    //   var themes = [];
    //   var themesIds = [];

    //   for (var i = 0; i < data.length; i++) {
    //     if (!themesIds.includes(data[i].folder.theme.id)) {
    //       themesIds.push(data[i].folder.theme.id);
    //       themes.push(data[i].folder.theme);
    //     }
    //   }
    //   console.log("themes length", themes.length);

    //   return themes;
    // },

    // showFolderDropDown(data) {
    //   console.log("data.length", data.length);
    //   var folders = [];
    //   var foldersIds = [];

    //   for (var i = 0; i < data.length; i++) {
    //     if (!foldersIds.includes(data[i].folder.id)) {
    //       foldersIds.push(data[i].folder.id);
    //       folders.push(data[i].folder);
    //     }
    //   }
    //   console.log("folders length", folders.length);

    //   return folders;
    // },

    searchFilterBackEnd() {
      console.log("search backend", this.selectedSearch);
      var stringSearch = "";
      var tabSearch = [];

      // this.selectedSearch.forEach((element) => {
      //   tabSearch.push(element);
      // });
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

    themeFilterBackEnd() {
      console.log("Themebackend", this.selectedTheme);
      var tabTheme = "";

      this.selectedTheme.forEach((element) => {
        tabTheme = tabTheme + "," + element.name;
      });

      console.log("ThemeTab", tabTheme);
      this.myparams.theme = tabTheme;
      console.log("myparams of theme", this.myparams);
    },

    folderFilterBackEnd() {
      console.log("folderbackend", this.selectedFolder);
      var tabFolder = "";
      this.selectedFolder.forEach((element) => {
        tabFolder = tabFolder + "," + element.name;
      });

      console.log("foldertab", tabFolder);
      this.myparams.folder = tabFolder;
      console.log("myparams of folders", this.myparams);
      // this.myparams=
    },
    getMyFolders(data) {
      console.log("data.length", data.length);
      var folders = [];
      var foldersIds = [];

      for (var i = 0; i < data.length; i++) {
        if (!foldersIds.includes(data[i].folder.id)) {
          foldersIds.push(data[i].folder.id);
          folders.push(data[i].folder);
        }
      }
      console.log("folders length", folders.length);

      return folders;
    },

    getMyThemes(data) {
      console.log("data.length", data.length);
      var themes = [];
      var themesIds = [];

      for (var i = 0; i < data.length; i++) {
        if (!themesIds.includes(data[i].folder.theme.id)) {
          themesIds.push(data[i].folder.theme.id);
          themes.push(data[i].folder.theme);
        }
      }
      console.log("themes length", themes.length);

      return themes;
    },

    getMyTechnologies(data) {
      console.log("data.length", data.length);
      var technologies = [];
      var technologiesIds = [];

      for (var i = 0; i < data.length; i++) {
        if (!technologiesIds.includes(data[i].folder.theme.technology.id)) {
          technologiesIds.push(data[i].folder.theme.technology.id);
          technologies.push(data[i].folder.theme.technology);
        }
      }
      console.log("technologies length", technologies.length);

      return technologies;
    },

    // clearFilter1() {
    //   this.initFilters1();
    // },

    // initFilters1() {
    //   this.filters1 = {
    //     global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    //     representative: { value: null, matchMode: FilterMatchMode.IN },
    //     techFilter: { value: null, matchMode: FilterMatchMode.IN },
    //   };
    // },
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

    deleteDocuments() {
      this.products = this.products.filter(
        (val) => val.id !== this.documentsObject.id
      );
      this.deleteDocumentsDialog = false;
      this.documentsObject = {};

      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Document Deleted",
        life: 3000,
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
        this.documentService.getDocuments(this.myparams).then((data) => {
          this.loading1 = false;
          this.documents = data;
          this.originalDocuments = data;
          this.documentsObject = data;
          // this.technologies = getMyTechnologies(data);
          // this.themes = getMythemes(data);
          // this.folders = this.getMyFolders(data);
          // this.themes = this.getMyThemes(data);
          // this.technologies = this.getMyTechnologies(data);
          // this.myparams = this.folderFilterBackEnd(data);
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
