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
    <v-card v-for="question in questions" :key="questions.indexOf(question)" class="mb-2">
      <v-container>
        <v-layout row wrap>
          <v-flex grow pa-2>
            <v-textarea
              rows="1"
              auto-grow
              v-model="question.title"
              :color="color"
              :label="'Question '+(questions.indexOf(question)+1)+' : Intitulé'"
            />
          </v-flex>
          <v-flex shrink pa-2>
            <v-select
              :items="types"
              item-value="value"
              item-text="label"
              :prepend-icon="prependIcon(question.type)"
              :color="color"
              v-model="question.type"
            />
          </v-flex>
        </v-layout>
        <!--Si réponse ouverte, champ de texte désactivé-->
        <v-text-field v-if="question.type=='qo'" value="Réponse" disabled/>
        <!--Si choix multiples, liste de choix à paramétrer-->
        <div v-if="question.type=='cm'">
          <v-layout v-for="choice in question.choices" :key="question.choices.indexOf(choice)" row>
            <v-text-field
              prepend-icon="radio_button_unchecked"
              :label="'Option '+(question.choices.indexOf(choice)+1)"
              v-model="choice.text"
              :color="color"
            ></v-text-field>
            <v-btn flat icon :color="color" @click="cmDelOpt(question,choice)">
              <v-icon>close</v-icon>
            </v-btn>
          </v-layout>
          <v-layout row>
            <v-icon>radio_button_unchecked</v-icon>
            <v-btn flat icon :color="color" @click="cmNewOpt(question)">
              <v-icon>plus_one</v-icon>
            </v-btn>
          </v-layout>
        </div>
      </v-container>
      <v-card-actions>
        <v-spacer/>
        <v-btn flat icon :color="color" @click="delQuestion(question)">
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-btn id="save" fab dark color="green" @click="uploadForm">
      <v-icon>cloud_upload</v-icon>
    </v-btn>
    <v-btn
      bottom
      dark
      small
      color="indigo"
      @click="addQuestion"
      :style="{left: '50%', transform:'translateX(-50%)'}"
    >
      <v-icon>add</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      desc: "",
      title: "",
      color: "purple",
      questions: [
        {
          type: "cm",
          title: "",
          choices: [{ text: "" }]
        }
      ],
      types: [
        { value: "cm", label: "Choix multiples" },
        { value: "qo", label: "Question ouverte" }
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
        { value: "light-green", label: "Vert clair" },
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
  methods: {
    addQuestion() {
      this.questions.push({ type: "cm", title: "", choices: [{ text: "" }] });
    },
    delQuestion(q) {
      this.questions.splice(this.questions.indexOf(q), 1);
    },
    cmNewOpt(q, o) {
      this.questions[this.questions.indexOf(q)].choices.push({ text: "" });
    },
    cmDelOpt(q, o) {
      if (q.choices.length > 1) {
        this.questions[this.questions.indexOf(q)].choices.splice(
          this.questions[this.questions.indexOf(q)].choices.indexOf(o),
          1
        );
      }
    },
    prependIcon: function(t) {
      if (t == "cm") {
        return "radio_button_checked";
      } else {
        return "notes";
      }
    },
    generateForm: function() {
      let form = {};
      form.title = this.title;
      form.desc = this.desc;
      form.color = this.color;
      form.questions = [];
      for (let i = 0; i < this.questions.length; i++) {
        form.questions.push({
          question: this.questions[i],
          reponse: { text: "" }
        });
      }
      const formStr = JSON.stringify(form);
      return formStr;
    },
    uploadForm: function() {
      let actual = localStorage.getItem("forms");
      const f = this.generateForm();
      if (actual) {
        actual = JSON.parse(actual);
        actual.push(this.generateForm());
        localStorage.setItem("forms",JSON.stringify(actual));
      } else {
        const forms=[f];
        localStorage.setItem("forms",JSON.stringify(forms));
      }
      alert("Formulaire enregistré");
    }
  }
};
</script>

<style>
#save {
  position: fixed;
  padding: 10px;
  bottom: 15px;
  right: 15px;
}
@media (max-width: 600px) {
  #save {
    position: fixed;
    padding: 10px;
    top: 15px;
    bottom: auto;
    right: 15px;
  }
}
</style>
