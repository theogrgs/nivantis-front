<template>
  <v-container>
    <v-layout column>
      <v-expansion-panel popout expand>
        <v-expansion-panel-content v-for="form in forms" :key="forms.indexOf(form)">
          <template v-slot:header :color="form.color">
            <h3 :class="form.color+'--text'">{{form.title}}</h3>
          </template>
          <h2 class="text-xs-center">{{form.title}}</h2>
          <p class="text-xs-center">{{form.desc}}</p>
          <v-card
            v-for="question in form.questions"
            :key="form.questions.indexOf(question)"
            class="ma-2 pa-3"
          >
            <h4
              :style="'color:'+form.color"
            >{{(form.questions.indexOf(question)+1)}}. {{question.question.title}}</h4>
            <v-textarea
              :color="form.color"
              rows="1"
              auto-grow
              v-if="question.question.type=='qo'"
              v-model="question.reponse.text"
              label="Réponse"
            ></v-textarea>
            <v-radio-group v-if="question.question.type=='cm'" v-model="question.reponse.text">
              <v-radio
                v-for="choice in question.question.choices"
                :key="question.question.choices.indexOf(choice)"
                :label="choice.text"
                :value="choice.text"
                :color="form.color"
              ></v-radio>
            </v-radio-group>
          </v-card>
          <div class="text-xs-right">
            <v-btn dark color="green" @click="send(form)">
              <v-icon>send</v-icon>
            </v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>
    <v-btn id="refresh" @click="refresh" fab dark color="indigo">
      <v-icon dark>refresh</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      forms: []
    };
  },
  methods: {
    refresh: function() {
      let f = JSON.parse(localStorage.getItem("forms"));
      let fo = [];
      if (f) {
        for (let i = 0; i < f.length; i++) {
          fo.push(JSON.parse(f[i]));
        }
        this.forms = fo;
      }
    },
    send: function(f){
      let resultsStr = JSON.stringify(f);
      console.log(resultsStr);
    }
  }
};
</script>

<style>
#refresh {
  position: fixed;
  padding: 10px;
  top: 81px;
  right: 15px;
}
@media (max-width: 600px) {
  #refresh {
    position: fixed;
    padding: 10px;
    top: 5px;
    bottom: auto;
    right: 5px;
  }
}
</style>
