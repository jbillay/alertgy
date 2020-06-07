<template>
  <div>
    <v-container>
      <Message />
      <v-card max-width="500" class="mx-auto">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline">
              {{ currentUser.firstname }} {{ currentUser.lastname }}
            </v-card-title>

            <v-card-subtitle v-text="currentUser.email"></v-card-subtitle>
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <VueQRCodeComponent
              ref="QrCode"
              :size="QrCodeSize"
              color="#17a2b8"
              text="Text to encode"
            >
            </VueQRCodeComponent>
          </v-avatar>
        </div>
        <v-card-actions>
          <v-btn color="teal" text @click="createAlertGyCard()">
            Download AlertGy Card
          </v-btn>
          <v-dialog v-model="dialog" persistent max-width="500">
            <template v-slot:activator="{ on }">
              <v-btn color="teal" text v-on="on">
                Update profile
              </v-btn>
            </template>
            <UserUpdateProfile :user="currentUser" v-on:updateDialog="updateDialog" />
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Message from "@/components/Utils/Message.vue";
import UserUpdateProfile from "@/components/User/UserUpdateProfile.vue";
import VueQRCodeComponent from "vue-qrcode-component";
import jsPDF from "jspdf";

export default {
  components: {
    Message,
    VueQRCodeComponent,
    UserUpdateProfile,
  },
  data() {
    return {
      QrCodeSize: 180,
      dialog: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters["user/userInfo"];
    },
    userAllergens() {
      return this.$store.getters["userallergen/all"];
    },
  },
  async created() {
    await this.$store.dispatch("userallergen/get");
  },
  methods: {
    updateDialog(status) {
      this.dialog = status;
    },
    usernames(firstName, lastName) {
      return this.capitalize(firstName) + " " + this.capitalize(lastName);
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    createAlertGyCard() {
      const marginTop = 8;
      const marginTopAllergen = 5;
      const marginLeft = 5;
      const cardHeight = 153;
      const cardWidth = 243;
      const bgR = 23;
      const bgG = 162;
      const bgB = 184;
      const doc = new jsPDF("landscape", "mm", "credit-card");
      const QrCodeImg = this.$refs.QrCode.$vnode.elm.children[1].src;

      doc.setFontSize(12);
      doc.setTextColor(bgR, bgG, bgB);
      doc.text(
        this.usernames(this.currentUser.firstname, this.currentUser.lastname),
        marginLeft,
        marginTop
      );

      doc.setFontSize(8);
      doc.text("ID: " + this.currentUser.username, marginLeft, marginTop + 6);
      doc.text("Email: " + this.currentUser.email, marginLeft, marginTop + 11);

      doc.addImage(QrCodeImg, "PNG", marginLeft, marginTop + 17, 25, 25);

      doc.setFontSize(12);
      doc.text("AlertGy", 67, 49);

      // create page for the allergens
      doc.addPage();
      doc.setTextColor(bgR, bgG, bgB);
      doc.setFontSize(12);
      doc.text("Allergène(s):", marginLeft, marginTopAllergen);
      doc.setFontSize(8);
      // Display allergens list
      let pageIndex = 1;
      this.userAllergens.forEach((value, key) => {
        let topMargin =
          (key + 1) * 5 + marginTopAllergen - (pageIndex - 1) * 50;
        if (topMargin > 50) {
          doc.addPage();
          pageIndex++;
          topMargin -= 50;
        }
        doc.text(value.name, marginLeft, topMargin);
      });

      doc.save("AlertGyCard.pdf");
    },
  },
};
</script>

<style lang="scss" scoped></style>
