

<Dialog v-model:visible="documentsDialog" :style="{width: '450px'}" header="Document Details" :modal="true" class="p-fluid">
            <div class="p-field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="documentsObject.name" required="true" autofocus :class="{'p-invalid': submitted && !documentsObject.name}" />
                <small class="p-error" v-if="submitted && !documentsObject.name">Name is required.</small>
            </div>
          

            

            <div class="p-field">
                <label class="p-mb-3">Category</label>
                <div class="p-formgrid p-grid">
                    <div class="p-field-radiobutton p-col-6">
                        <RadioButton id="category1" name="German" value="German" v-model="documentsObject.language" />
                        <label for="category1">German</label>
                    </div>
                    <div class="p-field-radiobutton p-col-6">
                        <RadioButton id="category2" name="English" value="English" v-model="documentsObject.language" />
                        <label for="category2">English</label>
                    </div>
                   
                </div>
            </div>




            <div class="card">
				<h5>Language</h5>
				<div class="p-grid">
					<div class="p-col-12 p-md-4">
						<div class="p-field-radiobutton">
							<RadioButton id="language1" name="German" value="German" v-model="documentsObject.language" />
							<label for="option1">German</label>
						</div>
					</div>
					<div class="p-col-12 p-md-4">
						<div class="p-field-radiobutton">
							<RadioButton id="language2" name="English" value="English" v-model="documentsObject.language" />
							<label for="language2">English</label>
						</div>
					</div>
				
				</div>

				
			</div>

           
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveDocuments" />
            </template>
        </Dialog>



         saveDocuments() {
            this.submitted = true;

			if (this.documentsObject.name.trim()) {
                if (this.documentsObject.id) {
                   
                    this.products[this.findIndexById(this.documentsObject.id)] = this.documentsObject;
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Document Updated', life: 3000});
                }
                else {
                    this.documentsObject.id = this.createId();
                    
                    this.documentsObject.technology = this.documentsObject.technology.value ;
                    this.documentsObject.theme = this.documentsObject.theme.value ;
                    this.documentsObject.folder = this.documentsObject.folder.value ;

                    this.products.push(this.documentsObject);
                    this.$toast.add({severity:'success', summary: 'Successful', detail: 'Document Created', life: 3000});
                }

                this.documentsDialog = false;
                this.documentsObject = {};
            }
        },