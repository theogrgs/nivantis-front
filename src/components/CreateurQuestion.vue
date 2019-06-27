<template>
  <v-container>
    <v-card class="pa-3">
      <v-layout row wrap>
        <v-flex grow pa-2>
          <v-textarea
            rows="1"
            auto-grow
            v-model="text"
            :color="color"
            label="Titre de la question"
          />
        </v-flex>
        <v-flex shrink pa-2>
          <v-select
            :items="items"
            item-value="value"
            item-text="label"
            :prepend-icon="prependIcon"
            :color="color"
            v-model="typeQ"
          />
        </v-flex>
      </v-layout>
      <!--Si réponse ouverte, champ de texte désactivé-->
      <v-text-field v-if="typeQ=='qo'" value="Réponse" disabled/>
      <!--Si choix multiples, liste de choix à paramétrer-->
      <div v-if="typeQ=='cm'">
        <v-layout v-for="choice in choices" :key="choice.label" row>
          <v-text-field
            prepend-icon="radio_button_unchecked"
            :label="choice.label"
            v-model="choice.text"
          ></v-text-field>
          <v-btn flat icon :color="color" @click="choices.splice(choice,1)">
            <v-icon>close</v-icon>
          </v-btn>
        </v-layout>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: ["color", "type"],
  data: function() {
    return {
      text: "",
      choices: [{ label: "Option 1", text: "aff" }],
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
