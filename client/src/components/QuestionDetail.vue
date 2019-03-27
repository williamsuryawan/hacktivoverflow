<template>
    <div v-if="QuestionLoading">
        <p>Please wait</p>
    </div>
    <div class="container" v-else>

        <div class="container col-12" style="background-color: rgb(220,220,220); color: black; padding:10px">    
            <div class="row">
                <div class="col-sm-2">
                    {{ question.upvoters.length }} 
                    <button class="btn btn-primary" id="upvote_button" @click.prevent="upVote(question._id)">Up</button> <br>
                    {{ question.downvoters.length }} 
                    <button class="btn btn-primary" id="downvote_button" @click.prevent="downVote(question._id)">Down</button>
                </div>
                <div class="col-sm-10">
                    <h3> Question Title: {{ question.title }} </h3>
                    Description: <p v-html="question.description"> </p>
                    <div class ="row">
                        <div class="col-2">
                            <button class="btn btn-primary" id="answer_button" @click.prevent="giveAnswer(question)">Answer</button>
                        </div>
                        <div class="col-2" v-if="AuthorQueVerification(question)">
                            <router-link :to="'/questions/' + question._id + '/edit'"><button class="btn btn-primary" id="edit_button">Edit</button></router-link>  
                        </div>
                        <div class="col-2" v-if="AuthorQueVerification(question)">
                            <button class="btn btn-primary" id="answer_button" @click.prevent="deleteQuestion(question)">Delete</button>
                        </div>
                    </div>
                </div>
                
            </div>
            
        </div>
        <div v-if="answerAdd">
            <h4>Yuk kasi answer</h4>
            <form v-on:submit.prevent="addAnswer">
                <div class="form-group row">
                    <label for="inputName" class="col-sm-2 col-form-label"> Your Answer: </label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" v-model="answercontent" id="inputName" placeholder="Answer Content Here">
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Post Answer</button>
                    </div>
                </div>
            </form>
        </div>    
        
        <div v-if="!answerAdd">
            <br>The answer:<br>
            <div class="container col-12" v-for="answer in question.answers" :key="answer._id"> 
                <div class ="row">
                    <div class="col-sm-3">
                        {{ answer.upvoters.length }} 
                        <button class="btn btn-primary" id="upvote_button" @click.prevent="upAnsVote(answer._id)">Up</button> <br>
                        {{ answer.downvoters.length }} 
                        <button class="btn btn-primary" id="downvote_button" @click.prevent="downAnsVote(answer._id)">Down</button>
                    </div>
                    <div class="col-sm-9">
                        <div class="row" style="background-color: rgb(192,192,192); color: black; padding:10px">
                            <div class="col-10" >
                                
                                {{ answer.content }} <br>
                                Posted by: {{ answer.author.name }}
                            </div>
                            <div class="col-2" v-if="AuthorAnsVerification(answer)">
                                <router-link :to="'/answers/' + answer._id + '/edit'"><button class="btn btn-primary" id="edit_button">Edit</button></router-link>
                                <button class="btn btn-primary" id="answer_button" @click.prevent="deleteAnswer(answer._id)">Delete</button>
                            </div>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import server from '@/api/server.js';
import { mapState } from "vuex";
import swal from 'sweetalert';

export default {
    name: 'question-details',
    data() {
        return {
            question: {
                    _id: '',
                    upvoters: '',
                    downvoters: '',
                    tags: '',
                    answers: [],
                    author: '',
                    title: '',
                    description: '',
                    cm_enabled: false,
            },
            answercontent: '',
            QuestionLoading: true,
            AnswerLoading: true
        };
    },
    methods: {
        fetchQuestion() {
            this.QuestionLoading = true;
            server
                .get(`/questions/${this.$route.params.id}`)
                .then(({ data }) => {
                    this.$store.dispatch('offParentStatus')
                    this.question = data.data;
                    this.QuestionLoading = false;
                    console.log("berhasil fetch question detail", this.question)
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        AuthorAnsVerification(input) {
            console.log("cek verification utk edit/del answer", input)
            return (input.author._id.toString() == localStorage.getItem("id").toString());
        },
        AuthorQueVerification(input) {
            console.log("cek verification utk edit/del question", input)
            return (input.author._id.toString() == localStorage.getItem("id").toString());
        },
        fetchAnswer () {
            this.AnswerLoading = true;
            console.log("masuk fetch answer")
        },
        upVote(question){
            server
                .put(`questions/upvote/${this.$route.params.id}`,{}, {
                        headers: {
                            token: localStorage.getItem("token")
                            }
                    })
                .then(({ data }) => {
                    this.fetchQuestion();
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        downVote(question){
            server
                .put(`questions/downvote/${this.$route.params.id}`,{}, {
                    headers: {
                        token: localStorage.getItem("token")
                        }
                })
                .then(({ data }) => {
                    this.fetchQuestion();
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        upAnsVote(inputUpVote){
            console.log("masuk upAnsVote ===>", inputUpVote)
            server
                .put(`answers/upvote/${inputUpVote}`,{}, {
                        headers: {
                            token: localStorage.getItem("token")
                            }
                    })
                .then(({ data }) => {
                    this.fetchQuestion();
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        downAnsVote(inputDownVote){
            server
                .put(`answers/downvote/${inputDownVote}`,{}, {
                    headers: {
                        token: localStorage.getItem("token")
                        }
                })
                .then(({ data }) => {
                    this.fetchQuestion();
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        giveAnswer(input) {
            console.log("munculkan form answer:", input)
            if (!localStorage.getItem("token")) {
                swal("You have to login first!", {buttons: ["Continue Without Login", "Login Now"]
                })
                .then(value => {
                if (value) 
                    this.$router.push("/login");
                });
            } else {  
                this.$store.dispatch('onAnswerAddStatus')
            }
        },
        addAnswer() {
            console.log("masuk ke method add answer:", this.answercontent, this.question._id)
            server
                .post("/answers", {
                    content: this.answercontent,
                    questionId: this.question._id },
                    { headers: {
                        token: localStorage.getItem("token")
                    }})
                .then(({ data }) => {
                    console.log("berhasil add answer")
                    this.$store.dispatch('offAnswerAddStatus')
                    this.fetchQuestion();
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        deleteQuestion() {
            console.log(`delete questions ===>`, this.$route.params.id);
            swal({
                title: "Are you sure?",
                text: "It will permanently delete your question",
                icon: "warning",
                buttons: true,
                dangerMode: true
                })
                .then(agreeDelete => {
                if (agreeDelete) {
                    return server
                        .delete(`/questions/${this.$route.params.id}`, {
                            headers: {
                            token: localStorage.getItem("token")
                            }
                        })
                    .then(() => {
                        console.log("berhasil delete question");
                        this.$router.push({ path: "/questions" });
                    });
                }
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        },
        deleteAnswer(inputAnswerId) {
            console.log(`delete answers ===>`, inputAnswerId);
            swal({
                title: "Are you sure?",
                text: "It will permanently delete your answer",
                icon: "warning",
                buttons: true,
                dangerMode: true
                })
                .then(agreeDelete => {
                if (agreeDelete) {
                    return server
                        .delete(`/answers/${inputAnswerId}`, {
                            headers: {
                            token: localStorage.getItem("token")
                            }
                        })
                    .then(() => {
                        console.log("berhasil delete question");
                        this.fetchQuestion();
                    });
                }
                })
                .catch(({ response }) => {
                    console.error(response);
                });
        }
    },
    created() {
    this.fetchQuestion(),
    this.fetchAnswer()
    },
    computed: {
    ...mapState(["answerAdd"])
    },

}

</script>