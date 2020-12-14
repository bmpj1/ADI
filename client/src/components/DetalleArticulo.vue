<template>
    <v-container fluid>    
        <v-row>
            <v-col cols="1">
                <!-- 2 es el numero de imagenes del articulo -->
                <v-hover v-for="index in 2" v-bind:key="index" class="mb-4"
                    v-slot:default="{ hover }">
                    <v-card :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                        <v-img src="../../public/images/noImage.png" aspect-ratio=1 max-height="70" width="100%" height="auto"></v-img>
                    </v-card>
                </v-hover>
            </v-col>
            <v-col cols="8" justify="center">

                <v-row justify="center">
                    <v-img id="img" src="../../public/images/noImage.png" aspect-ratio="1" class="grey lighten-2" max-width="800"
                        max-height="600" width="100%" height="auto">
                    </v-img>

                </v-row>

            </v-col>
            <v-col justify="center">

                <p class="display-2">{{articulo.nombre}}</p>
                <p class="headline">Descripcion:</p>
                <p class="body-2">{{articulo.detalles}}</p>
                <v-row justify="center">
                    <p class="body-2">Total: {{articulo.pvp}}€</p>
                </v-row>
                <v-row justify="center">
                    <v-rating readonly :half-increments="true" color="orange" v-model="articulo.valoracion" justify-center></v-rating>
                    
                </v-row>
                    <v-row>
                        <v-divider></v-divider>
                    </v-row>
                <v-row>
                    <v-btn color="success" :disabled="!loggedIn" >
                        <v-icon>mdi-cart</v-icon>Añadir al carrito
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="pink" class="white--text" :disabled="!loggedIn" >
                        <v-icon>mdi-heart</v-icon> Añadir a Deseados
                    </v-btn>
                </v-row>
                <v-row class="mt-5">
                    
                </v-row>
                <v-divider class="mb-4 mt-2 green"></v-divider>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8">
                <v-divider class="mb-4 mt-2"></v-divider>
                <v-tabs :grow="true" color="cyan" dark slider-color="yellow">
                    <v-tab ripple>
                        <v-badge v-if="listaComentarios.length > 0" :content="listaComentarios.length">
                            Comentarios
                        </v-badge>
                        <span v-else>
                            Comentarios
                        </span>
                    </v-tab>
                    <v-tab v-if="loggedIn" ripple>
                        Comentar
                    </v-tab>
                    <v-tab-item>
                        <v-card text>
                            <v-list three-line>
                                <v-card-text v-if="listaComentarios.length==0"> <h3>No hay ningún comentario todavía, dejanos tu opinión ;). </h3></v-card-text>
                                
                            </v-list>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card>
                            <v-form v-on:submit.prevent="noop()">
                                <v-rating :x-large="true" :half-increments="true" color="orange" v-model="valoracion" justify-center> </v-rating>
                                <v-textarea v-model="comentario" solo name="input-7-4" label="Comentario"></v-textarea>
                                <v-btn color="success" class="mr-4" @click="noop()">Comentar</v-btn>
                            </v-form>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
                <p class="display-1 mt-3">Articulos relacionados</p>
                <v-row>
                    <v-card v-for="articulo in this.listaArticulos" v-bind:key="articulo.id" class="mx-auto mb-6"
                        max-width="250">
                        <v-img class="orange--text align-end" @click="verArticulo(articulo)" src="../../public/images/noImage.png">
                            <v-card-title>{{articulo.nombre}}</v-card-title>
                        </v-img>
                        <v-card-subtitle class="pb-0">{{articulo.pvp}}€</v-card-subtitle>
                        <v-card-text class="text--primary">
                            {{articulo.detalles}}
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="orange" text @click="verArticulo(articulo)">
                                Ver
                            </v-btn>
                            <v-btn color="green" :disabled="!loggedIn" text >
                                Añadir
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ArticuloService from '../services/articulo.service'
    export default {
        name: 'articulo',
        data() {
            return {
                user: {},
                contadorImagen: 0,
                articulo: {},
                listaArticulos: [],
                comentario: "",
                valoracion: 0,
                edit: -1,
                listaComentarios: [],
                listaArticulosRelacionados: [],
                listaImagenes: [],
                imagen: "../../public/images/noImage.png",
                snackbar: '',
                mostrar_snackbar: false
            }
        },
        mounted() {
            this.getArticulo();
        },
        methods: {
            getArticulo() {
                //articulo con ID especifica, recuperamos las imagenes del articulo
                ArticuloService.getArticuloById(this.$route.params.id)
                .then(res => {
                    this.articulo = res.data;
                    
                    //lista de articulos recomendados
                    ArticuloService.getArticulos()  // Cambiarlo por un metodo que permita obtener articulos de una marca...
                    .then(response => {
                        this.listaArticulos = response.data;
                    }).catch(err => {
                        console.log(err.response)
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            verArticulo(articulo){
                this.$router.push( {path: '/articulos/'+articulo.id})
                this.$router.go()
            },
            noop () {
                // do nothing ?
            }
        },
        computed: {
            loggedIn() {
                return this.$store.getters['auth/loggedIn'];
            },
            currentUser() {
                return this.$store.getters['auth/currentUser'];
            },
        }
        
    }
</script>

<style>

</style>