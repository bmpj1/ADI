<template>
    <v-container>
    <h1>Listado Categorias <v-btn @click="addCategoria()" color="primary">Añadir Categoria</v-btn></h1>
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
                :items="categorias"
                :loading="loading" loading-text="Cargando datos..."
                :search="search"
                no-data-text="No hay datos que mostrar"
                class="elevation-1"
            >
            
            <template v-slot:item.action="{ item }">
                <v-btn @click="editarCategoria(item)">
                    <v-icon class="mr-2">
                        mdi-pen
                    </v-icon>
                </v-btn>
                <v-btn @click="deleteCategoria(item)">
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
                        <v-text-field v-model="editedCategoria.nombre" :rules="reglas" label="Nombre*"></v-text-field>
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
import CategoriaService from '../../services/categoria.service';

export default {
    data: function(){
        return {
            loading: true,
            valid: true,
            reglas: [v => !!v || "El campo es obligatorio"],
            dialog: false,
            editedCategoria: {
                id: -1,
                nombre: "",
            },
            defaultCategoria: {
                id: -1,
                nombre: "",
            },
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Categoria', value: 'nombre'},
                {text: 'Acciones', value: 'action', sortable: false}
            ],
            categorias: [],
            message: ''
        }
    },
    created() {
        this.getCategorias();
    },
    methods: {
        getCategorias() {
            CategoriaService.getCategorias().then(
                res => {
                    this.categorias = res.data;
                    this.loading = false;
            }).catch(err =>{
                console.log(err.response);
            })
        },
        // Abre el v-dialog y lo prepara para crear una categoria
        addCategoria(){
            this.dialog = true;
            this.message = ''
            this.editedCategoria = Object.assign({}, this.defaultCategoria)
        },
        // Abre el v-dialog y lo prepara para editar una categoria
        editarCategoria(categoria){
            this.dialog = true;
            this.message = ''
            this.editedCategoria = Object.assign({}, categoria)
        },
        deleteCategoria(categoria){
            CategoriaService.deleteCategoria(categoria.id)
                .then(res =>{
                    this.categorias.splice(this.categorias.indexOf(categoria),1)
                }).catch(err =>{
                    console.log(err.response)
                })
        },
        save(){
            if (this.$refs.form.validate()) {
                // Creamos una nueva categoria
                if(this.editedCategoria.id === -1){
                    CategoriaService.addCategoria({
                        nombre: this.editedCategoria.nombre,
                    }).then(res =>{
                        CategoriaService.getCategoriaById(res.data)
                        .then(res => {
                            this.categorias.push(res.data)
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
                // Editamos una categoria existente
                else {                    
                    CategoriaService.updateCategoria({
                        id: this.editedCategoria.id,
                        nombre: this.editedCategoria.nombre
                    }).then(res =>{
                        var index = this.categorias.findIndex(m => m.id == this.editedCategoria.id)
                        Object.assign(this.categorias[index], this.editedCategoria)
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
                this.editedCategoria = Object.assign({}, this.defaultCategoria) //se vacia el modal
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
            return this.editedCategoria.id === -1 ? 'Nueva Categoria' : 'Editar Categoria'
        }
    }

}
</script>

<style>

</style>