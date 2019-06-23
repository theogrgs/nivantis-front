<template>
  <v-container>
    <v-text-field label="Titre" v-model="title" :color="color" box></v-text-field>
    <v-textarea label="Description" auto-grow box :color="color" rows="1" v-model="desc"></v-textarea>
    <v-select
      :color="color"
      v-model="color"
      :items="colors"
      item-text="label"
      item-value="value"
      label="Couleur"
      prepend-icon="color_lens"
      box
    ></v-select>
    <createur-question :color="color" type="cm"></createur-question>
    <createur-question :color="color" type="cm"></createur-question>
  </v-container>
</template>

<script>
import CreateurQuestion from "./CreateurQuestion";
export default {
  data: function() {
    return {
      desc: "",
      title: "",
      color: "indigo",
      questions: [
        {
          type: "cm",
          texte: "Que vaut la pharmacie bit",
          choix: ["Bof", "Ok", "Top"]
        },
        { type: "ouv", texte: "Que vaut la pharmacie bit ?" }
      ],
      colors: [
        { value: "red", label: "Rouge" },
        { value: "pink", label: "Rose" },
        { value: "purple", label: "Violet" },
        { value: "deep-purple", label: "Violet foncé" },
        { value: "indigo", label: "Indigo" },
        { value: "blue", label: "Bleu" },
        { value: "light-blue", label: "Bleu clair" },
        { value: "cyan", label: "Cyan" },
        { value: "teal", label: 'Bleu "sarcelle"' },
        { value: "green", label: "Vert" },
        { value: "light-green", label: "Vert foncé" },
        { value: "lime", label: "Citron" },
        { value: "yellow", label: "Jaune" },
        { value: "amber", label: "Ambre" },
        { value: "orange", label: "Orange" },
        { value: "deep-orange", label: "Orange foncé" },
        { value: "brown", label: "Marron" },
        { value: "blue-grey", label: "Gris-Bleu" },
        { value: "grey", label: "Gris" },
        { value: "black", label: "Noir" }
      ]
    };
  },
  components: {
    CreateurQuestion
  }
};
</script>

<style>
</style>
