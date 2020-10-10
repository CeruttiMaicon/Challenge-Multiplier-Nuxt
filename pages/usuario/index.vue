<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col>
        <table-custom buttom-add  show edit remove :fields="fields" :items="items" title="Usuários" route="usuario">
          <template v-slot:header>
            <b-icon-person font-scale="4" ></b-icon-person>
          </template>
        </table-custom>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>


export default {
  data() {
    return {
      fields: [
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'E-mail' },
      ],
      items: [
        { name: 'Stephen Hawking', email:'email@gmail.com' },
      ],
    }
  },
}
</script>
