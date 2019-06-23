<template>
  <v-container>
    <v-card class="pa-3">
      <v-layout row wrap>
        <v-flex grow pa-2>
          <v-textarea
            auto-grow
            rows="1"
            v-model="question"
            :color="color"
            label="Titre de la question"
          ></v-textarea>
        </v-flex>
        <v-flex shrink pa-2>
          <v-select
            :items="items"
            item-value="value"
            item-text="label"
            :prepend-icon="prependIcon"
            :color="color"
            v-model="typeQ"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["color", "type"],
  data: function() {
    return {
      question: "",
      choix: [],
      items: [
        { value: "cm", label: "Choix multiples", icon: "radio_button_checked" },
        { value: "qo", label: "Question ouverte", icon: "notes" }
      ],
      typeQ: this.type
    };
  },
  computed: {
    prependIcon: function() {
      if (this.typeQ == "cm") {
        return "radio_button_checked";
      } else {
        return "notes";
      }
    }
  }
};
</script>

<style>
</style>
