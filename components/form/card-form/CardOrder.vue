<template>
  <b-card>
    <template v-slot:header>
      <b-row>
        <b-col cols="7" class="font-weight-bold">
          Produto
        </b-col>
        <b-col cols="5" class="font-weight-bold">
          Quantidade
        </b-col>
      </b-row>
    </template>
    <slot></slot>
    <template v-slot:footer>
      <slot name="footer"></slot>
    </template>
  </b-card>
</template>

<script>
export default {

}
</script>
