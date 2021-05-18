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


createApp(App).use(router, PrimeVue, VueAxios, axios).component('DataTable', DataTable).component('Toolbar', Toolbar).component('FilterMatchMode', FilterMatchMode).component('Button', Button).component('Dropdown', Dropdown).component('InputText', InputText).component('MultiSelect', MultiSelect).component('Column', Column).mount('#app')