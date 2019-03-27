<template>
    <div>
        <h1 class="mt-2">Add A New Question</h1>
        <form v-on:submit.prevent="AddQuestion">
            <div class="form-group row">
                <label for="inputName" class="col-sm-2 col-form-label">Question Title</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="title" id="inputName" placeholder="Question Title Here">
                </div>
            </div>
            <div class="form-group row">
                <label for="inputPrice" class="col-sm-2 col-form-label">Product Price</label>
                <div id="app">
                    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
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
            title: "",
            image: "",
            imagePreviewURL: "",
            isLoading: false,
            errors : "",
            editor: ClassicEditor,
            editorData: '',
            editorConfig: {
                // The configuration of the rich-text editor.
            }
        }
    },
    methods: {
        AddQuestion () {
            this.isLoading = true
            console.log("data question siap kirim utk create ==>", this.title, localStorage.getItem("token"))
            server
                .post('/questions/', {
                title: this.title,
                description: this.editorData}, {headers: {
                    token: localStorage.getItem("token"),
                }})
                .then(response => {
                    console.log("berhasil create questions", response)
                    this.isLoading = false;
                    this.title = '';
                    this.editorData ='';
                    this.$router.push("/questions");
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
        }
    }
}
</script>