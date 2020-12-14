<template>
    <v-container>
    <h1>Listado Categorias <v-btn @click="addArticulo()" color="primary">Añadir Articulo</v-btn></h1>
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
                :items="articulos"
                :loading="loading" loading-text="Cargando datos..."
                :search="search"
                no-data-text="No hay datos que mostrar"
                class="elevation-1"
            >
            
            <template v-slot:item.action="{ item }">
                <v-btn @click="editarArticulo(item)">
                    <v-icon class="mr-2">
                        mdi-pen
                    </v-icon>
                </v-btn>
                <v-btn @click="deleteArticulo(item)">
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
                        <v-text-field v-model="editedArticulo.codigo" :rules="reglas" label="Codigo*" type="text"></v-text-field>
                        <v-text-field v-model="editedArticulo.nombre" :rules="reglas" label="Nombre*"></v-text-field>
                        <v-text-field v-model="editedArticulo.pvp" :rules="reglasPVP" label="PVP*" type="number"></v-text-field>
                        <v-text-field v-model="editedArticulo.valoracion" :rules="reglasValoracion" label="Valoracion*" type="number"></v-text-field>
                        <v-text-field v-model="editedArticulo.marca_id" :rules="reglasPVP" label="Marca*" type="number"></v-text-field>
                        <v-text-field v-model="editedArticulo.categoria_id" :rules="reglasPVP" label="Categoria*" type="number"></v-text-field>
                        <v-text-field v-model="editedArticulo.detalles" label="Detalles"></v-text-field>
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
import ArticuloService from '../../services/articulo.service';

export default {
    data: function(){
        return {
            loading: true,
            valid: true,
            reglas: [v => !!v || "El campo es obligatorio"],
            reglasValoracion: [
              v => !!v || "El campo es obligatorio",
              v => (v>=0 && v<=5) || "La valoracion debe estar entre 0 y 5",
            ],
            reglasPVP: [
              v => !!v || "El campo es obligatorio",
              v => v>0 || "Introduzca un valor positivo"
            ],
            dialog: false,
            editedArticulo: {
                id: -1,
                codigo: null,
                nombre: null,
                pvp: null,
                valoracion: null,
                marca_id: null,
                categoria_id: null,
                detalles: null
            },
            defaultArticulo: {
                id: -1,
                codigo: null,
                nombre: null,
                pvp: null,
                valoracion: 0.01,
                marca_id: null,
                categoria_id: null,
                detalles: null
            },
            search: '',
            headers: [
                {text: 'Acciones', value: 'action', sortable: false},
                {text: 'ID', value: 'id'},
                {text: 'Codigo', value: 'codigo'},
                {text: 'Nombre', value: 'nombre'},
                {text: 'pvp', value: 'pvp'},
                {text: 'Valoracion', value: 'valoracion'},
                {text: 'Marca_id', value: 'marca_id'},
                {text: 'Categoria_id', value: 'categoria_id'}
            ],
            articulos: [],
            message: ''
        }
    },
    created() {
        this.getArticulos();
    },
    methods: {
        getArticulos() {
            ArticuloService.getArticulos().then(
                res => {
                    this.articulos = res.data;
                    this.loading = false;
            }).catch(err =>{
                console.log(err.response);
            })
        },
        // Abre el v-dialog y lo prepara para crear un articulo
        addArticulo(){
            this.dialog = true;
            this.message = ''
            this.editedArticulo = Object.assign({}, this.defaultArticulo)
        },
        // Abre el v-dialog y lo prepara para editar una articulo
        editarArticulo(articulo){
            this.dialog = true;
            this.message = ''
            this.editedArticulo = Object.assign({}, articulo)
        },
        deleteArticulo(articulo){
            ArticuloService.deleteArticulo(articulo.id)
                .then(res =>{
                    this.articulos.splice(this.articulos.indexOf(articulo),1)
                }).catch(err =>{
                    console.log(err.response)
                })
        },
        save(){
            if (this.$refs.form.validate()) {
                // Creamos un nuevo articulo
                if(this.editedArticulo.id === -1){
                    ArticuloService.addArticulo({
                        codigo: this.editedArticulo.codigo,
                        nombre: this.editedArticulo.nombre,
                        pvp: this.editedArticulo.pvp,
                        valoracion: this.editedArticulo.valoracion,
                        marca_id: this.editedArticulo.marca_id,
                        categoria_id: this.editedArticulo.categoria_id,
                        detalles: this.editedArticulo.detalles
                    }).then(res =>{
                        ArticuloService.getArticuloById(res.data)
                        .then(res => {
                            this.articulos.push(res.data)
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
                // Editamos un articulo existente
                else {                    
                    ArticuloService.updateArticulo({
                        id: this.editedArticulo.id,
                        codigo: this.editedArticulo.codigo,
                        nombre: this.editedArticulo.nombre,
                        pvp: this.editedArticulo.pvp,
                        valoracion: this.editedArticulo.valoracion,
                        marca_id: this.editedArticulo.marca_id,
                        categoria_id: this.editedArticulo.categoria_id,
                        detalles: this.editedArticulo.detalles
                    }).then(res =>{
                        var index = this.articulos.findIndex(m => m.id == this.editedArticulo.id)
                        Object.assign(this.articulos[index], this.editedArticulo)
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
                this.editedArticulo = Object.assign({}, this.defaultArticulo) //se vacia el modal
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
            return this.editedArticulo.id === -1 ? 'Nuevo Articulo' : 'Editar Articulo'
        }
    }

}
</script>

<style>

</style>