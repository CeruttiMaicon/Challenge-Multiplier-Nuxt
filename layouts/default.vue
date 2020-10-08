<template>
  <div>
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">{{appName}}</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item class="text-white" to="/usuario">Usuários</b-nav-item>
        <b-nav-item class="text-white" to="/category">Categorias</b-nav-item>
        <b-nav-item class="text-white" to="/product">Produtos</b-nav-item>
        <b-nav-item class="text-white" to="/pedido">Pedidos</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            {{user.name}}
          </template>
          <b-dropdown-item to="/logs">Logs</b-dropdown-item>
          <b-dropdown-item to="/usuario/criar">Cadastrar Novo Usuário</b-dropdown-item>
          <b-dropdown-item @click="logout" href="#">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <b-container class="py-5" fluid>
      <Nuxt />
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appName: this.$config.appName,
      user: this.$auth.user
    }
  },
  methods:{
    async logout(){
      await this.$auth.logout('/login')
      await this.$router.push('/login')
    }
  }
}
</script>
<style>
html {
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
