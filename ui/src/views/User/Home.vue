<template>
  <div class="home">
    <v-container>
      <Message />
      <MyAllergen />
    </v-container>
  </div>
</template>

<script>
import MyAllergen from '@/components/User/MyAllergen.vue';

export default {
  components: {
    MyAllergen,
  },
};
</script>
