<template>
    <div class="container">
        <div>   
            <router-view />
        </div>
            
        <div v-if="showParent">    
            All Question List:
            <div class="row" v-for="question in allQuestions" :key="question._id">
                <div class="col-12 mb-3" >
                    <div class="card mx-auto">
                        <p style="padding:5px"><strong> Title: {{ question.title }}</strong></p>
                        <div class="card-body">

                            <div class="row" >
                                <div class="col-sm-10">
                                    Question: <p v-html="question.description"> </p> <br>
                                    <p> Posted By: {{ question.author.name }}</p>
                                    <p> Answered By: {{ question.answers.length }} People</p>
                                </div>
                                <div class="col-sm-2">
                                    <router-link class="btn btn-primary" id="detail_button" :to="'/questions/' + question._id ">Detail</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>


<script>
import { mapState } from "vuex";
// import { mapActions } from "vuex";
import question from '@/components/Question.vue';
import swal from "sweetalert";

export default {
  name: "AllQuestions",
  component: {
      question,
  },
  created() {
    this.$store.dispatch('onParentStatus')
    this.$store.dispatch('getAllQuestions')
    
  },
  computed: {
    ...mapState(["allQuestions", "showParent"])
  },
  methods: {
  }
}
</script>