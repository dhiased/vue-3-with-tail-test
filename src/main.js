import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

//Prime vue shit 
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { FilterMatchMode } from 'primevue/api';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import MultiSelect from 'primevue/multiselect';
import Toolbar from 'primevue/toolbar';
import FileUpload from 'primevue/fileupload';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import RadioButton from 'primevue/radiobutton';
import ToastService from 'primevue/toastservice';
import Toast from "primevue/toast";


createApp(App).use(router, PrimeVue, VueAxios, axios).component('Toast', Toast).component('ToastService', ToastService).component('DataTable', DataTable).component('RadioButton', RadioButton).component('ConfirmDialog', ConfirmDialog).component('Dialog', Dialog).component('FileUpload', FileUpload).component('Toolbar', Toolbar).component('FilterMatchMode', FilterMatchMode).component('Button', Button).component('Dropdown', Dropdown).component('InputText', InputText).component('MultiSelect', MultiSelect).component('Column', Column).mount('#app')