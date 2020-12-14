<template>
  <v-container>
      <v-tabs>
          <v-tab ripple>Articulos</v-tab>
          <v-tab riple>Marcas</v-tab>
          <v-tab ripple>Usuarios</v-tab>
          <v-tab ripple>Categorias</v-tab>
          
          <v-tab-item>
              <adminArticulos></adminArticulos>
          </v-tab-item>
          <v-tab-item>
              <adminMarcas></adminMarcas>
          </v-tab-item>
          <v-tab-item>
              <adminUsuarios></adminUsuarios>
          </v-tab-item>
          <v-tab-item>
              <adminCategorias></adminCategorias>
          </v-tab-item>
      </v-tabs>
  </v-container>
</template>

<script>
import AdminMarcas from "./AdminMarcas"
import AdminCategorias from "./AdminCategorias"
import AdminUsuarios from "./AdminUsuarios"
import AdminArticulos from "./AdminArticulos"
export default {
    components: {
        AdminMarcas,
        AdminCategorias,
        AdminUsuarios,
        AdminArticulos
    }
}
</script>

<style>

</style>