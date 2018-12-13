<template>
  <div class="posts">
    <h1>예약 수정</h1>
      <div class="form">
        <div>
          <input type="text" name="title" placeholder="예약자" v-model="title">
        </div>
        <div>
          <textarea rows="15" cols="15" placeholder="반납할 책" v-model="description"></textarea>
        </div>
        <div class="row">
          <div class="col-md-12">
            현재 예약 한 시간 : {{date}}
            <date-picker v-model="date" placeholder="변경할 날짜를 선택하세요"></date-picker>
          </div>
        </div>
        <div>
          <button class="app_post_btn" @click="updatePost">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
import PostsService from '@/services/PostsService'
import datePicker from 'vue-bootstrap-datetimepicker'
import 'bootstrap/dist/css/bootstrap.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

export default {
  name: 'editpost',
  data () {
    return {
      title: '',
      description: '',
      date: '',
      options: {
        format: 'DD/MM/YYYY',
        useCurrent: false
      }
    }
  },
  mounted () {
    this.getPost()
  },
  components: {
    datePicker
  },
  methods: {
    async getPost () {
      const response = await PostsService.getPost({
        id: this.$route.params.id
      })
      this.title = response.data.title
      this.description = response.data.description
      this.date = response.data.date
      // this.$router.push({ name: 'Posts' })
    },
    async updatePost () {
      await PostsService.updatePost({
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        date: this.date
      })
      this.$swal(
        'Great!',
        `Your post has been updated!`,
        'success'
      )
      this.$router.push({ name: 'Posts' })
    }
  }
}
</script>
<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>

