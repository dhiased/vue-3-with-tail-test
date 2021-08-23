<template>
  <div class="max-w-6xl p-6 mx-auto items-center">
    <div v-if="myRoleNumber == 1 || myRoleNumber == 2">
      <Toolbar class="p-mb-4">
        <template #left>
          <Button
            label="Add Document"
            icon="pi pi-cloud-upload"
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
          <!-- <Button
          label="Export"
          icon="pi pi-upload"
          class="p-button-secondary p-button-raised p-button-rounded"
          @click="exportCSV($event)"
        /> -->
        </template>
      </Toolbar>
    </div>

    <Toast position="top-right" />
    <div class="header-centred header-float shadow rounded overflow-hidden">
      <MultiSelect
        :filter="true"
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
        :filter="true"
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
        :filter="true"
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

      <!-- <Column selectionMode="multiple" headerStyle="width: 3em"></Column> -->
      <Column>
        <template #body="slotProps">
          <!-- working -->
          <!-- <a
            download
            href="http://127.0.0.1:8000/storage/tech%203/theme%20of%20tech3/first/consigne.pdf"
            >download</a
          > -->

          <!-- end of working -->

          <a
            :href="slotProps.data.fullPath"
            download
            icon="pi pi-download"
            class="
              p-button-success
              p-button-outlined
              p-button-rounded
              p-mr-2
              p-button-sm
            "
            ><Button
              icon="pi pi-download"
              class="
                p-button-success
                p-button-outlined
                p-button-rounded
                p-mr-2
                p-button-sm
              "
            ></Button
          ></a>

          <!-- <Button
            style="margin-right: 0.5em"
            icon="pi pi-download"
            class="p-button-success p-button-outlined p-button-rounded p-mr-2 p-button-sm"
            @click="downloadDoc(slotProps.data)"
            ><a href="{path}" download></a
          ></Button> -->
          <!-- 
          <a
            href="public//technology 2/Work instruction/Maintenance/MiniProjet Dhia Sedki 3LM2 Tp2-May 27, 2021, 12-50-43 pm.pdf"
            download
            >Link</a
          > -->
        </template>
      </Column>
      <Column field="id" header="ID" :sortable="true"></Column>
      <Column field="name" header="NAME" :sortable="true"></Column>
      <Column field="format" header="FORMAT" :sortable="true"></Column>
      <Column field="language" header="LANGUAGE" :sortable="true"></Column>
      <Column field="created_at" header="CREATED" :sortable="true"></Column>

      <div v-if="myRoleNumber == 1 || myRoleNumber == 2">
        <Column field="user.name" header="USER" :sortable="true"></Column>
      </div>

      <div v-if="myRoleNumber == 1 || myRoleNumber == 2">
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
      </div>

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
          :showClear="true"
          style="margin-bottom: 0.3em"
          id="Technology"
          v-model="selectedDropDownTechnology"
          :options="technologiesDropDown"
          optionLabel="name"
          placeholder="Select a Technology"
          :filter="true"
          filterPlaceholder="Find a Technology"
          @change="getThemesByTech()"
        />
      </div>

      <div class="p-field" v-if="selectedDropDownTechnology != null">
        <label for="Theme" class="p-mb-3 font-bold">Theme</label>
        <Dropdown
          :showClear="true"
          style="margin-bottom: 0.3em"
          id="Theme"
          v-model="selectedDropDownTheme"
          :options="themesDropDown"
          optionLabel="name"
          placeholder="Select a Theme"
          :filter="true"
          filterPlaceholder="Find a Theme"
          @change="getFoldersByThemes()"
        />
      </div>

      <div class="p-field" v-if="selectedDropDownTheme != null">
        <label for="Folder" class="p-mb-3 font-bold">Folder</label>
        <Dropdown
          :showClear="true"
          style="margin-bottom: 0.3em"
          id="Folder"
          v-model="selectedDropDownFolder"
          :options="foldersDropDown"
          optionLabel="name"
          placeholder="Select a Folder"
          :filter="true"
          filterPlaceholder="Find a Folder"
        />
      </div>

      <div class="p-field" v-if="selectedDropDownTheme != null">
        <label for="foldername" class="font-bold"
          >Create a folder if it doesn't exist</label
        >
        <InputText
          style="margin-bottom: 0.5em"
          id="foldername"
          placeholder="Name of the folder you want to create"
          v-model="selectedFolderName"
        />
        <!-- <small class="p-error" v-if="submitted && !documentsObject.name"
          >Folder Name is required.</small
        > -->
      </div>

      <!-- <FileUpload name="demo[]" url="./upload" /> -->
      <!-- <InputText
        style="margin-bottom: 0.4em; margin-top: 0.2em"
        type="file"
        id="fileUpload"
        v-model="selectedFile"
      /> -->
      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
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
                v-model="selectedLanguage"
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
                v-model="selectedLanguage"
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
          @click="deleteDocuments(documentsObject)"
        />
      </template>
    </Dialog>
    <Toast />
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import DocumentService from "../../service/DocumentServices";
// import Toast from "primevue/toast";
// import ToastService from "primevue/toastservice";
// import { useToast } from "primevue/usetoast";
export default {
  name: "AddDocument",

  data() {
    return {
      file: "",
      selectedFile: null,
      selectedDoc: null,
      selectedLanguage: null,
      selectedFolderName: null,
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
      themesDropDown: {},
      foldersDropDown: [],
      updateDocument: [],
      themeParam: {},
      folderParam: {},
      myRole: null,
      myRoleNumber: null,
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

      this.myRole = JSON.parse(localStorage.getItem("user"));
      console.log("myRole", this.myRole);

      this.myRoleNumber = this.myRole.roles[0].id;
      console.log("myRoleNumber", this.myRoleNumber);

      // this.technologiesDropDown = this.getAllTechnologies(data);
      // this.foldersDropDown = this.getMyFolders(data);

      // this.myparams = this.folderFilterBackEnd(data);
    });

    this.documentService.getTechnologies().then((data) => {
      this.technologiesDropDown = this.getAllTechnologies(data);
    });

    this.documentService.getThemes(this.themeParam).then((data) => {
      console.log(" themeParam data of theme param", this.themeParam);

      console.log("data of theme param", data);
      this.themesDropDown = data;
      console.log("themesDropDown", data);
    });

    this.documentService.getFolders(this.folderParam).then((data) => {
      console.log(" folderParam data ", this.folderParam);

      console.log("data of folderParam", data);

      this.foldersDropDown = data;
      console.log("foldersDropDown", data);
    });
  },

  methods: {
    // downloadDoc(documents) {
    //   var str = this.documents.path;
    //   console.log("old str", str);

    //   str.replace("public", "storage");
    //   console.log("new str", str);

    //   var ret = "data-123".replace("data-", "");
    //   console.log(ret); //prints: 123
    //   return str;
    // },

    // downloadItem({ path, name }) {
    //   // this.documentService.getDocuments(path, name).then((data) => {

    //   // axios
    //   //   .get(path, { responseType: "blob" })
    //   //   .then((response) => {
    //   //     const blob = new Blob([response.data], { type: "application/pdf" });
    //   var binaryData = [];
    //   binaryData.push(path);
    //   window.URL.createObjectURL(
    //     new Blob(binaryData, { type: "application/pdf" })
    //   );
    //   // const blob = path;
    //   console.log("path", path);
    //   const link = document.createElement("a");
    //   // link.href = URL.createObjectURL(blob);
    //   link.download = name;
    //   link.click();
    //   URL.revokeObjectURL(link.href);
    //   // })
    //   // .catch(console.error);
    // },

    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    saveDocuments() {
      let formData = new FormData();

      var technology_id = this.selectedDropDownTechnology.id;
      console.log("technology_id", technology_id);

      var theme_id = this.selectedDropDownTheme.id;
      console.log("theme_id", theme_id);
      if (this.selectedDropDownFolder != null)
        var folder_id = this.selectedDropDownFolder.id;
      console.log("folder_id", folder_id);

      var folder_name = this.selectedFolderName;
      console.log("folder_name", folder_name);

      // var file = this.selectedFile;
      // console.log("file", file);

      var language = this.selectedLanguage;
      console.log("language", language);

      // var username = this.documents.user_id.user.name;
      // console.log("my username", username);

      // var user_id = this.documentsObject.user_id;
      // console.log("my user_id", user_id);

      formData.append("file", this.file);
      formData.append("folder_name", folder_name);
      if (folder_id != null) formData.append("folder_id", folder_id);
      formData.append("theme_id", theme_id);
      formData.append("technology_id", technology_id);
      formData.append("language", language);
      // formData.append("user_id", user_id);
      // formData.append("username", username);

      this.documentService.postDocuments(formData).then((data) => {
        this.documentsAddDialog = false;

        console.log("data", data);
        this.documents.push(data.data);
      });

      this.selectedDropDownTechnology = null;
      this.selectedDropDownTheme = null;
      this.selectedDropDownFolder = null;
      this.selectedFolderName = null;
      this.selectedLanguage = null;
    },

    editDocument(data) {
      this.documentsObject = { ...data };
      console.log("edit data", data);
      this.documentsDialog = true;
    },
    updateDocuments(documentsObject) {
      var id = documentsObject.id;
      var name = documentsObject.name;
      var language = documentsObject.language;
      console.log("myid", id);

      this.documentService.putDocuments(id, name, language).then((data) => {
        var updatedDoc = data.data;
        this.documents.map((item) => {
          if (item.id == id) {
            item.name = updatedDoc.name;
            item.language = updatedDoc.language;
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
      // const toast = useToast();
      // toast.add({
      //   severity: "info",
      //   summary: "Info Message",
      //   detail: "Message Content",
      //   life: 3000,
      // });

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

    getThemesByTech() {
      console.log("getThemesByTech", this.selectedDropDownTechnology);

      var tabTheme = this.selectedDropDownTechnology.id;

      console.log("ThemeTab", tabTheme);
      this.themeParam = tabTheme;
      console.log("themeParam of technology_id", this.themeParam);
    },

    getFoldersByThemes() {
      console.log("getFoldersByThemes", this.selectedDropDownTheme);

      var tabFolder = this.selectedDropDownTheme.id;

      console.log("ThemeTab", tabFolder);
      this.folderParam = tabFolder;
      console.log("folderParam of theme_id", this.folderParam);
    },

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

    getAllTechnologies(data) {
      console.log("data.length", data.length);
      var technologies = [];

      for (var i = 0; i < data.length; i++) {
        technologies.push(data[i]);
      }
      console.log("technologies length", technologies.length);

      return technologies;
    },

    getAllThemes(data) {
      console.log("data.length", data.length);
      var themes = [];

      for (var i = 0; i < data.length; i++) {
        themes.push(data[i]);
      }
      console.log(" getAllThemes themes length", themes.length);

      return themes;
    },
    getAllFolders(data) {
      console.log("data.length", data.length);
      var folders = [];

      for (var i = 0; i < data.length; i++) {
        folders.push(data[i]);
      }
      console.log("folders length", folders.length);

      return folders;
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

    deleteDocuments(documentsObject) {
      var id = documentsObject.id;

      console.log("my id delete me  ", id);

      this.documentService.deleteDocuments(id).then((data) => {
        // this.documents.map((item) => {
        //   if (item.id == id) {
        //     item = null;
        //   }

        //   return item;
        // });

        this.documents = this.documents.filter(function (item) {
          return item.id != id;
        });
        this.deleteDocumentsDialog = false;
      });

      // this.deleteDocumentsDialog = false;
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

    themeParam: {
      handler: function (_) {
        console.log(" watch themeParam has changed to = ", this.themeParam);
        this.documentService.getThemes(this.themeParam).then((data) => {
          console.log(" themeParam data of theme param", this.themeParam);

          console.log("data of theme param", data);
          this.themesDropDown = data;
          console.log("themesDropDown", data);
        });
      },
      deep: true,
    },

    folderParam: {
      handler: function (_) {
        console.log(" watch folderParam has changed to = ", this.folderParam);
        this.documentService.getFolders(this.folderParam).then((data) => {
          console.log(" folderParam data ", this.folderParam);

          console.log("data of folderParam", data);

          this.foldersDropDown = data;
          console.log("foldersDropDown", data);
        });
      },
      deep: true,
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
