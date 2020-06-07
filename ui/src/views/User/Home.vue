<template>
  <div class="home">
    <v-container>
      <Message />
      <MyAllergen />
    </v-container>
  </div>
</template>

<script>
import Message from '@/components/Utils/Message.vue';
import MyAllergen from '@/components/User/MyAllergen.vue';

export default {
  components: {
    Message,
    MyAllergen,
  },
};
</script>
