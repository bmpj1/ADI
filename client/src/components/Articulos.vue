<template>
    <v-container fluid>
        <!-- Filtros -->
            <v-row >
                <v-col cols="12" xs="12" >
                     <v-row v-if="loading" justify="center">
                        <v-progress-circular
                        :width="4"
                        :size="100"
                        color="primary"
                        indeterminate
                        ></v-progress-circular>
                    </v-row>
                    <v-expansion-panels
                        v-else
                        multiple
                        v-model="panel"
                    >
                        <v-expansion-panel>
                            <v-expansion-panel-header>Categorias</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-checkbox v-for="categoria in categorias" 
                                :key="categoria.id" 
                                v-model="selected_categoria" 
                                :label="categoria.nombre" 
                                :value="categoria.id"
                                ></v-checkbox>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Marcas</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-checkbox v-for="marca in marcas" 
                                :key="marca.id" 
                                v-model="selected_marca" 
                                :label="marca.marca" 
                                :value="marca.id"
                                ></v-checkbox>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Precio</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                    <v-range-slider
                                    v-model="rangoPrecio"
                                    :max="this.max"
                                    :min="0"
                                    hide-details
                                    thumb-label="always"
                                    :thumb-size="24"
                                    class="mt-3"
                                    ></v-range-slider>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                         <v-expansion-panel>
                            <v-expansion-panel-header>Ordenar por</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list>
                                    <v-list-item>
                                        <v-list-item-title>Precio</v-list-item-title>
                                        <v-list-item-action>
                                            <v-btn @click="ordenArticulos('precio_up')" class="mx-3" fab dark small color="pink">
                                                <v-icon dark>mdi-arrow-up-bold</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                        <v-list-item-action>
                                            <v-btn  @click="ordenArticulos('precio_down')" class="mx-2" fab dark small color="pink">
                                                <v-icon dark>mdi-arrow-down-bold</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>

                                    <v-divider></v-divider>

                                    <v-list-item>
                                        <v-list-item-title>Nombre</v-list-item-title>
                                        <v-list-item-action>
                                            <v-btn @click="ordenArticulos('nombre_up')" class="mx-3" fab dark small color="pink">
                                                <v-icon dark>mdi-arrow-up-bold</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                        <v-list-item-action>
                                            <v-btn  @click="ordenArticulos('nombre_down')" class="mx-2" fab dark small color="pink">
                                                <v-icon dark>mdi-arrow-down-bold</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>

                                    <v-divider></v-divider>

                                    <v-list-item>
                                        <v-list-item-title>Valoracion</v-list-item-title>
                                        <v-list-item-action>
                                            <v-btn @click="ordenArticulos('valoracion_up')" class="mx-3" fab dark small color="pink">
                                                <v-icon dark>mdi-arrow-up-bold</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                        <v-list-item-action>
                                            <v-btn  @click="ordenArticulos('valoracion_down')" class="mx-2" fab dark small color="pink">
                                                <v-icon dark>mdi-arrow-down-bold</v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Valoración</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-rating :half-increments=true v-model="rating"></v-rating>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    
                </v-col>
                <!-- Articulos -->
                <v-col cols="12" xs="12">
                    <h1 v-if="listaArticulos.length === 0 && !loading">No hay articulos que cumplan los filtros</h1>
                    <v-row v-if="loading" justify="center">
                        <v-progress-circular
                            :width="4"
                            :size="100"
                            color="primary"
                            indeterminate
                        ></v-progress-circular>
                    </v-row>
                    <v-row v-else>
                        <v-col v-for="articulo in this.listaArticulos" v-bind:key="articulo.id" cols="12" xs="12" sm="6" md="4" lg="3" >
                            <v-hover v-slot:default="{ hover }">
                                <v-card
                                    class="mx-auto"
                                    color="grey lighten-4"
                                    max-width="600"
                                    height="100%"
                                >
                                <router-link style="width: 100%;height: auto; text-decoration: none;" :to="`/articulos/${articulo.id}`">
                                <v-img
                                    :alt="articulo.nombre"
                                    src="../../public/images/noImage.png"
                                >
                                    <v-expand-transition>
                                    <div
                                        v-if="hover"
                                        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                                        style="height: 100%;"
                                    >
                                        Ver
                                    </div>
                                    </v-expand-transition>
                                </v-img>
                                    <h3 class="display-1 font-weight-light orange--text mb-2" style="text-align:center">{{articulo.nombre.substring(0,15)}}</h3>
                                </router-link>
                                <v-card-text style="width:100%; height: auto;">
                                    <div class="font-weight-light title mb-2">
                                        {{articulo.detalles? articulo.detalles.substring(0,25) : 'Sin descripción'}}...
                                    </div>
                                </v-card-text>
                                
                                <v-card-actions 
                                class="pa-3">
                                    <v-rating
                                    
                                    :half-increments=true
                                    readonly
                                    v-bind:value="articulo.valoracion"
                                    ></v-rating>
                                </v-card-actions>
                                
                                <v-card-text
                                    class="pt-6 display-2 text-center"
                                    style="position: relative;"
                                    
                                    v-text="articulo.pvp + '€'"
                                >   
                                </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-snackbar v-model="mostrar_snackbar" color="success" top class="title">
                {{snackbar}}
                <v-btn dark text @click="mostrar_snackbar = false">
                    Cerrar
                </v-btn>
            </v-snackbar>
    </v-container>
</template>

<script>
import MarcaService from '../services/marca.service';
import CategoriaService from '../services/categoria.service';
import ArticuloService from '../services/articulo.service';

export default {
    name: 'articulos',

    data(){
        return{
            mostrar_snackbar: false,
            snackbar: '',
            listaArticulos: [],
            listaArticulosSinFiltro: [],
            selected_categoria: [],
            rangoPrecio: [0, 0],
            categorias:[],
            max: 0,
            loading: true,
            rating: 0,
            marcas: [],
            selected_marca: [],
            panel:[],
        }
    },
    async created(){
        try{
            this.getMarcas();
            this.getCategorias();
            this.getArticulos();
        }catch(err){
            console.log(err)
        }
    },
        methods: {
            getMarcas() {
                MarcaService.getMarcas().then(
                    res => {
                        this.marcas = res.data;
                }).catch(err =>{
                    console.log(err.response);
                })
            },
            getCategorias() {
                CategoriaService.getCategorias().then(
                    res => {
                        this.categorias = res.data;
                }).catch(err =>{
                    console.log(err.response);
                })
            },
            ordenArticulos(tipo){
                switch(tipo){
                    case 'precio_up':
                         this.listaArticulos.sort((a, b) => (a.pvp > b.pvp) ? 1 : -1)
                        break
                    case 'precio_down':
                        this.listaArticulos.sort((a, b) => (a.pvp < b.pvp) ? 1 : -1)
                        break
                    case 'nombre_up':
                        this.listaArticulos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1)
                        break
                    case 'nombre_down':
                        this.listaArticulos.sort((a, b) => (a.nombre < b.nombre) ? 1 : -1)
                        break
                    case 'valoracion_up':
                        this.listaArticulos.sort((a, b) => (a.valoracion > b.valoracion) ? 1 : -1)
                        break
                    case 'valoracion_down':
                        this.listaArticulos.sort((a, b) => (a.valoracion < b.valoracion) ? 1 : -1)
                        break
                }
            },
            getArticulos: function (){
                this.loading = true
                ArticuloService.getArticulos()
                .then(response => {
                    this.listaArticulos = response.data
                    this.max = this.listaArticulos.reduce((res, current) =>{
                        return (current.pvp > res) ? current.pvp : res
                    }, -1)
                    this.rangoPrecio[1] = this.max
                    this.loading = false;
                    this.listaArticulosSinFiltro = this.listaArticulos
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            filtroGeneral(){
                this.listaArticulos = this.listaArticulosSinFiltro.filter((articulo) =>{
                    let marca = (this.selected_marca.length != 0)? this.selected_marca.includes(articulo.marca_id):true
                    let precio = (articulo.pvp >= this.rangoPrecio[0]) && (articulo.pvp <= this.rangoPrecio[1]) 
                    let valoracion = this.rating <= articulo.valoracion
                    let categoria = (this.selected_categoria.length != 0)? this.selected_categoria.includes(articulo.categoria_id):true
                    return categoria && marca && precio && valoracion
                })
            },
            close(){
                this.dialog = false 
                setTimeout(() => {
                    this.editedCategoria = Object.assign({}, this.defaultCategoria) //se vacia el modal
                }, 300)
            },
        },
         watch: {
            $route(to, from) {
                this.selected_categoria = [];
                this.rangoPrecio = [0,500]
                this.rating = 0
                this.selected_marca = []
                this.getMarcas()
                this.getCategorias()
                this.getArticulos()
            },
            selected_categoria(){
                this.filtroGeneral()
            },
            rangoPrecio(){
                this.filtroGeneral()
            },
            rating(){
               this.filtroGeneral()
            },
            selected_marca(){
                this.filtroGeneral()
            },
            watch: {
                dialog (val) {
                    val || this.close()
                },
            },
         }

    }
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}

</style>