<template>
<div class="text-center">
            <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon>mdi-login</v-icon>
                </v-btn>
            </template>
  <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Iniciar Sesión</v-toolbar-title>

              </v-toolbar>
              <v-card-text>
                <v-form v-model="isValid">
                  <v-text-field
                    label="Email"
                    name="Email"
                    v-model="credenciales.email"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="[v => !!v || 'Email is required!!']"
                    required
                  ></v-text-field>
                  
                  <v-text-field
                    label="Contraseña"
                    name="contraseña"
                    v-model="credenciales.password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                  
                <v-alert type="error" v-if="message != ''">{{message}}</v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="dialog = false" to="/registro" text color="primary">¿No tienes cuenta? Registrate</v-btn>
                <v-spacer></v-spacer>
                <div class="form-group">
                  <v-btn  @click="handleLogin" color="blue" class="white--text" :disabled="loading || !isValid">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>Login</span>
                  </v-btn>
                </div>
              </v-card-actions>
            </v-card>
            </v-dialog>
    </div>
</template>

<script>
export default {
  data() {
    return{
      loading: false,
      dialog: false,
      credenciales: {
          email: '',
          password: ''
      },
      message: '',
      isValid: true,
      reglasEmail: [
        v => !!v || "El email es obligatorio",
        v => /.+@.+\..+/.test(v) || "El email debe tener un formato válido"
      ],
      passwordRules: [
        v => !!v || 'Constraseña requerida!!',
      v => (v && v.length >= 5) || 'Almenos 5 carácteres'
        /*
        v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
        v => /(?=.*\d)/.test(v) || 'Must have one number', 
        v => /([!@$%])/.test(v) || 'Must have one special character [!@#$%]' 
        */
      ]
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;

      if(this.credenciales.email && this.credenciales.password) {
        this.$store.dispatch('auth/login', this.credenciales)
          .then((res) =>{
            this.loading = false;
            this.dialog = false;
            
            //console.log(this.$store.state.auth.user.usuario.rol)
            //console.log(this.$store.getters["auth/getRol"])
            let role = this.$store.getters["auth/getRol"]
            role =='admin'? 
              this.$router.push('/admin').catch(()=>{})
              :this.$router.push('/articulos').catch(()=>{})
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.message = this.message.message.toString();
            // this.message = 'Error, contraseña/email incorrecto'
          });
      } else {
        this.loading = false;
      }
    }
  }
}

</script>

<style>

</style>