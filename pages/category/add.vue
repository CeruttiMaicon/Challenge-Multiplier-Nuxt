<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <category-form @change="submit" title="Adicionar Categoria" :error-message="error_message"></category-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      error_message:""
    }
  },
  methods: {
    submit(form){
      this.$axios
        .$post(
          'category', form
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            Swal.fire(
              'Registrado!',
              message,
              'success'
            ).then(() => {
                this.$router.push('/category')
            })
          }
        }).catch((error) => {
            this.error_message = error.response.data.error_message;
            Swal.fire(
              'Erro!',
              error.response.data.message,
              'error'
            )
        }).finally(()=>{
          this.$nuxt.$loading.finish()
        })
    }
  },
}
</script>
