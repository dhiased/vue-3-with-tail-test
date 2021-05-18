<template>
  <div class="max-w-4xl p-6 mx-auto items-center">
    <DataTable
      class="p-datatable-sm min-w-full leading-normal inline-block min-w-full shadow rounded-lg overflow-hidden"
      :value="documents"
      :globalFilterFields="['id', 'name', 'format', 'language']"
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
        <div class="p-d-flex p-jc-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined"
            @click="clearFilter1()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters1['global'].value"
              placeholder="Keyword Search"
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
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success p-mr-2"
            @click="editProduct(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
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
      documents: [],
      documentService: null,
      filters1: null,
      loading1: true,
      statuses: ["txt", "jpeg", "pdf", "mp3", "renewal", "proposal"],
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
    });
  },
  methods: {
    clearFilter1() {
      this.initFilters1();
    },

    initFilters1() {
      this.filters1 = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        representative: { value: null, matchMode: FilterMatchMode.IN },
      };
    },
  },
};
</script>

<style>
</style>