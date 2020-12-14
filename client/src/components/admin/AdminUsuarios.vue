<template>
  <v-main>
    <h1>
      Listado Usuarios
      <v-btn @click="addUsuario()" color="primary">Añadir Usuario</v-btn>
    </h1>
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" label="Buscar" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="usuarios"
        :loading="loading"
        loading-text="Cargando datos..."
        :search="search"
      >
        <template v-slot:item.action="{ item }">
          <v-btn @click="changeRol(item)" v-if="item.id!=1">
            <v-icon class="mr-2" v-if="item.rol=='admin'">Hacer Usuario</v-icon>
            <v-icon class="mr-2" v-else>Hacer Admin</v-icon>
          </v-btn>
          <v-btn @click="eliminarUsuario(item)" v-if="item.rol=='usuario'">
            <v-icon class="mr-2" >mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" max-width="800px">
        <v-card>
             <registro @registrado="usuarioRegistrado"></registro>
             <v-btn color="error darken-1" text @click="close">Cancelar</v-btn>
        </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import UsuarioService from "../../services/user.service"
import Registro from "../Registro"

export default {
    components: {
        Registro
    },
    data: function(){
        return {
            loading: true,
            dialog: false,
            search: '',
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Email', value: 'email'},
                {text: 'Nombre', value: 'nombre'},
                {text: 'Apellidos', value: 'apellidos'},
                {text: 'Rol', value: 'rol'},
                {text: 'Fecha Nacimiento', value: 'fechaNac'},
                {text: 'Acciones', value: 'action', sortable: false}
            ],
            usuarios: []
        }
    },
    created() {
        this.getUsuarios();
    },
    methods: {
        getUsuarios() {
            UsuarioService.getUsuarios()
            .then(res =>{
                this.usuarios = res.data
                this.loading = false
            }).catch(err =>{
                console.log(err.response)
            })
        },
        addUsuario(){
            this.dialog = true;
        },
        usuarioRegistrado(usuario){
            this.dialog = false
            this.usuarios.push(usuario)
        },
        eliminarUsuario(usuario){
            UsuarioService.deleteUsuario(usuario.id)
                .then(res =>{
                    this.usuarios.splice(this.usuarios.indexOf(usuario),1)
                }).catch(err =>{
                    console.log(err.response)
                })
        },
        close(){
            this.dialog = false   
        },
        changeRol(usuario) {
            UsuarioService.updateUsuario({
              id: usuario.id,
              email: usuario.email,
              nombre: usuario.nombre,
              apellidos: usuario.apellidos,
              rol: (usuario.rol=='admin')? 'usuario' : 'admin'
            }).then(res =>{
              var index = this.usuarios.findIndex(m => m.id == usuario.id)
              usuario.rol = (usuario.rol=='admin')? 'usuario' : 'admin'
              Object.assign(this.usuarios[index].rol, usuario)
            }).catch(err => {
              console.log(err)
            });
        }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    }
};
</script>

<style>
</style>