<template>
  <div class="container">
    <div>
      <Logo />
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="E-mail:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
            :state="validation"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Senha:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            required
            :state="validation"
          ></b-form-input>
          <b-form-invalid-feedback class="text-center" :state="validation">
            {{messageError}}
          </b-form-invalid-feedback>
        </b-form-group>
        <b-button type="submit" block variant="primary">Login</b-button>
        <div class="text-center text-danger" v-if="status">
          <b-spinner type="grow" label="Loading..."></b-spinner>
          Server offline
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  mounted() {
    this.statusServer()
  },
  data() {
      return {
        form: {
          email: '',
          password: '',
        },
        show:true,
        validation:null,
        messageError: "",
        status: false
      }
    },
    methods: {
      statusServer() {
        this.$nextTick(function () {
            window.setInterval(() => {
              this.$axios
                .$get(
                  'status'
                )
                .then((data) => {
                  data == 1 ? this.status = false : this.status = true
                }).catch((error) => {
                  this.status = true
                })
            },3000);
        })
      },
      onSubmit(e) {
        e.preventDefault()
         this.$auth
        .loginWith("local", {
          data: {
            email: this.form.email,
            password: this.form.password
          }
        })
        .then((response) => {
          this.validation = true
          this.$router.push('/')
        }).catch(({response: {
          data: { error },
          status
        }}) => {
          if(status == 400)
          {
            this.validation = false,
            this.messageError = error
          }
        })
      },
    }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
