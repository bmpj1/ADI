<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-widget widget-user">
          <div class="widget-user-header text-white" style="background-image:url('./images/perfilBackground.jpg'); background-size:cover; background-position:center; border-radius:20%;">
            <h2 class="widget-user-desc text-center" style="color: black; margin-left:1%;">{{currentUser.usuario.rol}}</h2>
            <h3 class="widget-user-username text-center" style="color: black; margin-left:1%;">{{currentUser.usuario.nombre}} </h3>
            <h3 class="widget-user-username text-center" style="color: black; margin-left:1%;">{{currentUser.usuario.apellidos}} </h3>
            
            <div class="widget-user-image text-center">
              <img class="img-circle border-right" style="border-radius:50%; margin-left:1%;" alt="User Avatar" src="images/noImagenPerfil.png">
            </div>
                  <h4 class="widget-user-email text-center" style="color:azure; margin-left:1%;">Email: {{currentUser.usuario.email}}</h4>
                  <h4 class="widget-user-email text-center" style="color:azure; margin-left:1%;">Telefono: {{currentUser.usuario.telefono}}</h4>
                  <h4 class="widget-user-email text-center" style="color:azure; margin-left:1%;">Nacido el: {{fechaFormateada}}</h4>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-4 col-4" style="border-right: 0.1em dotted gray">
                <div class="description-block text-center">
                  <h5 class="description-header">{{totalGastado}}€</h5>
                  <span class="description-text">Compras</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-4 col-4" style="border-right: 0.1em dotted gray">
                <div class="description-block text-center">
                  <h5 class="description-header">{{totalPedidos}}</h5>
                  <span class="description-text">Pedidos</span>

                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-4">
                <div class="description-block text-center">
                  <h5 class="description-header">{{totalArticulos}}</h5>
                  <span class="description-text">Productos</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data: () => ({
    user: {},
    totalPedidos: {},
    totalArticulos: {},
    totalGastado: {}
  }),
  computed: {
    currentUser() {
        return this.$store.getters['auth/currentUser'];
    },
    fechaFormateada() {
      if (this.currentUser.usuario.fechaNac) {
        var split = this.currentUser.usuario.fechaNac.split("-");
        return split[2] + "/" + split[1] + "/" + split[0];
      }
      return "";
    }
  }
};
</script>

<style>
</style>