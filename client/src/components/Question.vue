<template>
    <div class="col-4 mb-3" >
        <div class="card mx-auto">
            <center><p style="padding:5px"><strong>{{ question.title }}</strong></p></center>
            <div class="card-body">

                <div class="row" style="padding:5px">
                    <div class="col-sm-6">
                        <p> IDR {{ question.description }}</p>
                    </div>
                    <!-- <div class="col-sm-3">
                        <router-link class="btn btn-primary" id="detail_button" :to="{name: 'product-details', params: {id: product.id}}">Coba</router-link>
                    </div> -->
                    <div class="col-sm-3">
                        <router-link class="btn btn-primary" id="detail_button" :to="'/products/' + product._id ">See</router-link>
                    </div>
                    <div class="col-sm-3">
                        <button class="btn btn-primary" id="buy_button" @click.prevent="addToCart(product)">Reply</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script>
import server from '@/api/server.js';
import swal from 'sweetalert';

export default {
  props: ['question'],
  name: 'question',
  methods: {
    addToCart(product) {
      console.log("masuk sini ke method add to cart:", product)
      if (!localStorage.getItem("token")) {
        swal("you have to login first!", {
          buttons: ["continue browsing", "login now"]
        }).then(value => {
          if (value) this.$route.push("/login");
        });
      } else {
        server
          .post("/carts", {
              _id: product._id,
              amount: 1 },
            { headers: {
                token: localStorage.getItem("token")
              }})
          .then(({ data }) => {
            console.log("berhasil add to cart")
            this.$route.push({ path: "/carts" });
          })
          .catch(({ response }) => {
            console.error(response);
          });
      }
    }
  }
};
</script>
