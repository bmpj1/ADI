<template>
    <v-container>
    <h1>Listado Marcas <v-btn @click="addMarca()" color="primary">Añadir Marca</v-btn></h1>
        <v-card>
            <v-card-title>
            <v-text-field
                v-model="search"
                label="Buscar"
                single-line
                hide-details
            ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="marcas"
                
                :loading="loading" loading-text="Cargando datos..."
                :search="search"
                no-data-text="No hay datos que mostrar"
                class="elevation-1"
            >
            <!-- Sin "item.action" no se muestran las acciones :/ -->
            <template v-slot:item.action="{ item }">
                <v-btn @click="editarMarca(item)">
                    <v-icon class="mr-2">
                        mdi-pen
                    </v-icon>
                </v-btn>
                <v-btn @click="deleteMarca(item)">
                    <v-icon class="mr-2">
                        mdi-delete
                    </v-icon>
                </v-btn>
            </template>
            
            </v-data-table>
        </v-card>
        <v-dialog v-model="dialog" max-width="500px">
            <v-form ref="form" v-on:submit.prevent="save" v-model="valid">
                <v-card>
                    <v-card-title>{{tituloDialog}}</v-card-title>
                    <v-card-text>
                        <v-text-field v-model="editedMarca.marca" :rules="reglas" label="Nombre*"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error darken-1" text @click="close">Cancelar</v-btn>
                        <v-btn color="success darken-1" text @click="save">Guardar</v-btn>
                    </v-card-actions>
                </v-card>
                <v-alert type="error" v-if="message != ''">{{message}}</v-alert>
            </v-form>
        </v-dialog>
    </v-container>
</template>

<script>
import MarcaService from '../../services/marca.service';

export default {
    data: function(){
        return {
            loading: true,
            valid: true,
            reglas: [v => !!v || "El campo es obligatorio"],
            dialog: false,
            editedMarca: {
                id: -1,
                marca: "",
            },
            defaultMarca: {
                id: -1,
                marca: "",
            },
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Marca', value: 'marca'},
                {text: 'Acciones', value: 'action', sortable: false}
            ],
            marcas: [],
            message: ''
        }
    },
    created() {
        this.getMarcas();
    },
    methods: {
        getMarcas() {
            MarcaService.getMarcas().then(
                res => {
                    this.marcas = res.data;
                    this.loading = false;
            }).catch(err =>{
                console.log(err.response);
            })
        },
        // Abre el v-dialog y lo prepara para crear una marca
        addMarca(){
            this.dialog = true;
            this.message = ''
            this.editedMarca = Object.assign({}, this.defaultMarca)
        },
        // Abre el v-dialog y lo prepara para editar una marca
        editarMarca(marca){
            this.dialog = true;
            this.message = ''
            this.editedMarca = Object.assign({}, marca)
        },
        deleteMarca(marca){
            MarcaService.deleteMarca(marca.id)
                .then(res =>{
                    this.marcas.splice(this.marcas.indexOf(marca),1)
                }).catch(err =>{
                    console.log(err.response)
                })
        },
        save(){
            if (this.$refs.form.validate()) {
                // Creamos una nueva marca
                if(this.editedMarca.id === -1){
                    MarcaService.addMarca({
                        marca: this.editedMarca.marca,
                    }).then(res =>{
                        MarcaService.getMarcaById(res.data)
                        .then(res => {
                            this.marcas.push(res.data)
                            this.close()
                        })
                    }).catch(error =>{
                        // console.log(error.response)
                        this.loading = false;
                        this.message =
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString();
                        this.message = this.message.message.toString();                        
                    })
                    
                }
                // Editamos una marca existente
                else {                    
                    MarcaService.updateMarca({
                        id: this.editedMarca.id,
                        marca: this.editedMarca.marca
                    }).then(res =>{
                        var index = this.marcas.findIndex(m => m.id == this.editedMarca.id)
                        Object.assign(this.marcas[index], this.editedMarca)
                        this.close() 
                    }).catch(error => {
                        //console.log(error.response)
                        this.message =
                            (error.response && error.response.data) ||
                            error.message ||
                            error.toString();
                        this.message = this.message.message.toString();
                    })
                   
                }
            }
        },
        close(){
            this.dialog = false 
            setTimeout(() => {
                this.editedMarca = Object.assign({}, this.defaultMarca) //se vacia el modal
            }, 300)
        },
        noop () {
            // do nothing ?
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },
    computed: {
        tituloDialog() {
            return this.editedMarca.id === -1 ? 'Nueva Marca' : 'Editar Marca'
        }
    }

}
</script>

<style>

</style>