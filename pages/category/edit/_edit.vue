<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <category-form edit title="Editar Categoria" @change="submit" :error-message="error_message"></category-form>
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
      console.log(form)
      this.$axios
        .$patch(
          `category/${form.id}`, form
        )
        .then(({success, data, message, error_message}) => {
          if(success == true)
          {
            Swal.fire(
              'Atualizado!',
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
        })
    }
  },
}
</script>
