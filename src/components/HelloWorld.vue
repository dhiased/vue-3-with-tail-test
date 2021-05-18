<template>
  <div class="max-w-4xl p-6 mx-auto items-center">
    <div class="header-centred header-float shadow rounded overflow-hidden">
      <MultiSelect
        class="multiselect-custom three-margin"
        @change="technologyFilter()"
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
        @change="themeFilter()"
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
        @change="folderFilter()"
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
      class="p-datatable-customers shadow rounded-lg overflow-hidden"
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
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined p-button-sm p-clear-p"
            @click="clearFilter1()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              class="p-inputtext-sm"
              v-model="filters1['global'].value"
              placeholder="Search..."
            />
          </span>
        </div>
      </template>
      <template #empty> No documents found. </template>
      <template #loading> Loading documents data. Please wait. </template>

      <Column field="id" header="ID" :sortable="true"></Column>
      <Column field="name" header="NAME" :sortable="true"></Column>
      <Column field="format" header="FORMAT" :sortable="true"></Column>
      <Column field="language" header="LANGUAGE" :sortable="true"></Column>

      <Column header="ACTION">
        <template #body="slotProps">
          <Button
            style="margin-right: 0.5em"
            icon="pi pi-pencil"
            class="p-button-warning p-mr-2 p-button-sm"
            @click="editProduct(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-danger p-button-sm"
            @click="confirmDeleteProduct(slotProps.data)"
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
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import DocumentService from "../service/DocumentServices.js";
export default {
  name: "Prime",

  data() {
    return {
      selectedFolder: null,
      selectedTechnology: null,
      selectedTheme: null,
      documents: [],
      originalDocuments: [],
      documentService: null,
      filters1: null,
      loading1: true,
      statuses: ["txt", "jpeg", "pdf", "mp3", "renewal", "proposal"],
      technologies: [],
      themes: [],
      folders: [
        // { name: "Anna Fali", image: "annafali.png" },
        // { name: "Asiya Javayant", image: "asiyajavayant.png" },
      ],
    };
  },
  created() {
    this.documentService = new DocumentService();
    this.initFilters1();
  },
  mounted() {
    this.documentService.getDocuments().then((data) => {
      this.loading1 = false;
      this.documents = data;
      this.originalDocuments = data;
      // this.technologies = getMyTechnologies(data);
      // this.themes = getMythemes(data);
      this.folders = this.getMyFolders(data);
      this.themes = this.getMyThemes(data);
      this.technologies = this.getMyTechnologies(data);
    });
  },
  methods: {
    technologyFilter() {
      // console.log("hello", filters1['techFilter'].value);
      // console.log("id=", this.selectedTechnology[0].id);
      console.log("length =", this.documents.length);
    },
    folderFilter() {
      // console.log("hello", filters1['techFilter'].value);
      // console.log("id=", this.selectedTechnology[0].id);
      console.log("length =", this.documents.length);
      var temp = [];
      for (var i = 0; i < this.selectedFolder.length; i++) {
        for (var j = 0; j < this.documents.length; j++) {
          if (this.documents[j].folder.id == this.selectedFolder[i].id) {
            temp.push(this.documents[j]);
          }
        }
      }
      this.documents = temp;
      console.log("length =", this.documents.length);
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

    clearFilter1() {
      this.initFilters1();
    },

    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        techFilter: { value: null, matchMode: FilterMatchMode.IN },
      };
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
</style>