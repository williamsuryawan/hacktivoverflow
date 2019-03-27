<template>
    <div>
        <h1 class="mt-2">Edit Answer</h1>
        <form v-on:submit.prevent="EditAnswer">
            <div class="form-group row">
                <label for="inputContent" class="col-sm-2 col-form-label">Answer Content </label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="answer.content" id="inputContent">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Post</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import server from '@/api/server.js'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
    name: "app",
    data() {
        return {
            answer: {
                    _id: '',
                    upvoters: '',
                    downvoters: '',
                    author: '',
                    questionId:'',
                    content: '',
                    cm_enabled: false,
            },
            content: "",
            isLoading: false,
            errors : "",
        }
    },
    created() {
        this.getOneAnswer()
    },
    methods: {
        EditAnswer () {
            this.isLoading = true;
            this.content = this.answer.content;
            console.log("data answer siap kirim utk edit ==>", this.content, this.answer.questionId, localStorage.getItem("token"))
            
            server
                .put(`/answers/${this.$route.params.id}`, {
                content: this.content}, {headers: {
                    token: localStorage.getItem("token"),
                }})
                .then(response => {
                    console.log("berhasil edit answer", response)
                    this.isLoading = false;
                    this.content = '';
                    this.$router.push(`/questions/${this.answer.questionId}`);
                })
                .catch (({ error }) => {
                    this.errors = '';
                    if(error.data.err) {
                    for (let key in error.data.err.errors) {
                            this.errors = error.data.err.errors[key].message;
                        }
                    }
                    console.log("berhasil create questions", error, this.errors);
                })
        },
        getOneAnswer() {
            console.log('masuk ke get one answer', this.$route.params.id)
            server
                .get(`/answers/one/${this.$route.params.id}`, {headers: {
                    token: localStorage.getItem("token"),
                }})
                .then(({ data }) => {
                    this.$store.dispatch('offParentStatus')
                    this.answer = data.data;
                    this.content = this.answer.content;
                    console.log("berhasil fetch answer detail for edit", this.answer)
                })
                .catch((err) => {
                    console.log(err);
                })
        },
    }
}
</script>