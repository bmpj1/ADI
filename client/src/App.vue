<template>
    <v-app id="inspire">
        <v-card class="overflow-hidden">
            <!-- HEADER -->
            <v-app-bar app color="black" dark>
                <v-app-bar-nav-icon @click="$router.push('/').catch(()=>{})">
                    <v-img class="mr-3" :src="logoImgUrl" height="80px" width="90px"> </v-img>
                </v-app-bar-nav-icon>
                <v-toolbar-title @click="$router.push('/').catch(()=>{})">TiendaOnline</v-toolbar-title>
                
                <v-spacer></v-spacer>

                <v-expand-transition>
                    <v-text-field v-on:keyup.enter="searchbyname" v-model="search" v-show="hideDetails" single-line label="Buscar"></v-text-field>
                </v-expand-transition>

                <v-btn @click="hideDetails = ! hideDetails" icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <div v-if="loggedIn">
                    <v-btn icon @click="{}">
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>

                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon>mdi-account</v-icon>          
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="{}">
                                <v-list-item-title>Lista de deseos</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="{}">
                                <v-list-item-title>Mis Pedidos</v-list-item-title>
                            </v-list-item>
                            <v-list-item to="/perfil">
                                <v-list-item-title>Mi Cuenta</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="{}">
                                <v-list-item-title>Editar Perfil</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    
                    <v-btn @click="logOut" icon>
                        <v-icon color="error">mdi-logout</v-icon>
                    </v-btn>
                </div>

                <login v-else></login>

                <template v-slot:extension>
                    <v-tabs fixed-tabs background-color="transparent" dark align-with-title>
                        <v-tab to="/">Home</v-tab>
                        <v-tab to="/articulos">Articulos</v-tab>
                        <v-tab to="">Contacto</v-tab>
                        <v-tab to="">Tiendas</v-tab>
                        <v-tab v-if="isAdmin" to="/admin">Admin</v-tab>
                    </v-tabs>
                </template>
            </v-app-bar>
            <!-- END HEADER -->

            <!-- BODY -->
            <v-main>
                <router-view />
            </v-main>
            <!-- END BODY -->

            <!-- FOOTER -->
            <v-footer dark padless>
                <v-card flat tile class="black lighten-1 white--text text-center">
                    <v-card-text>
                        <v-img src="../public/images/logo.png" height="175" contain></v-img>
                    </v-card-text>
                    <v-card-text>
                        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                            <v-icon size="24px">{{ icon }}</v-icon>
                        </v-btn>
                    </v-card-text>

                    <v-card-text class="white--text pt-0">
                        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo
                        interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa
                        consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
                        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin.
                        Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et
                        magnis dis parturient montes, nascetur ridiculus mus.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-text class="white--text">
                        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
            <!-- END FOOTER-->

        </v-card>
    </v-app>
</template>

<script>
    import login from './components/Login'
    export default {
        data: function () {
            return {
                hideDetails: false,
                search: '',
                icons: [
                    'mdi-twitter',
                    'mdi-facebook',
                    'mdi-linkedin',
                    'mdi-instagram',
                ],
                logoImgUrl: require('../public/images/logo.png')
            }
        },
        methods: {
            logOut() {
              this.$store.dispatch('auth/logout');
              this.$router.push('/home').catch(()=>{});
            },
            searchbyname(){

            }
        },
        computed: {
            currentUser() {
                return this.$store.getters['auth/currentUser'];
            },
            loggedIn() {
                return this.$store.getters['auth/loggedIn'];
            },
            isAdmin() {
                return this.$store.getters['auth/isAdmin']
            }
        },
        components: {
            'login': login
        }
    };
</script>

<style>
</style>