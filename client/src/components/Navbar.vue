<template>
    <div class="col pt-3" style="background-color:#FFFDD0;">
        <div class="row">
        <div class="col-sm-8">
            <h3>Hacktiv8 Overflow</h3>
        </div>
        <div class="col-sm-1"><router-link to="/"> Home </router-link></div>
        <div class="col-sm-1"><router-link to="/questions/create"> Ask Now </router-link></div>
        <div class="col-sm-1" v-if="!isLogin"><router-link to="/login"> Login </router-link></div>
        <div class="col-sm-1" v-if="isLogin"> <a href @click.prevent="signout">Logout</a> </div>
        <div class="col-sm-1"><a href @click.prevent="onParent"><router-link to="/questions"> Questions </router-link></a></div>
        </div>
    </div>

</template>

<script>
import { mapState } from "vuex";
import swal from 'sweetalert';

export default {
  name: 'navbar',
  computed: {
    ...mapState(["isLogin"])
  },
  methods: {
      signout() {
        console.log("masuk ke konfirmasi logout")
        swal({
                title: "Are you sure?",
                text: "You will log out",
                icon: "warning",
                buttons: true,
                dangerMode: true
                })
        .then(agree => {
          if (agree) {
            console.log("eksekusi logout berhasil")
            localStorage.removeItem("token")
            localStorage.removeItem("id")
            this.$store.dispatch('offLoginStatus')
            this.$router.push('/');
          }
        })
      },
      onParent() {
        console.log("masuk ke on parent")
        this.$store.dispatch('onParentStatus')
      }
  },
  created() {
    if (!localStorage.getItem('token')) {
      this.$store.dispatch('offLoginStatus')
    } else {
      this.$store.dispatch('onLoginStatus')
    }

  },
};
</script>
