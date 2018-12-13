<template>
  <div class="posts">
    <h1>새로운 예약추가</h1>
      <div align="center" class="form">
        <div>
          <input type="text" name="title" placeholder="예약자" v-model="title">
        </div>
        <div>
          <textarea rows="3" cols="5" placeholder="반납할 책" v-model="description"></textarea>
        </div>

        <div class="row">
          <div class="col-md-12">
            <date-picker v-model="date" placeholder="날짜 선택을 위해 클릭하세요"></date-picker>
          </div>
        </div>

         <div>
    <div>
      <h2>픽업받으실 곳을 핀하세요</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace" v-model="center">
        </gmap-autocomplete>
        <button @click="addMarker">장소추가</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:70%;  height: 300px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>

        <div>
          <button class="app_post_btn" @click="addPost">예약추가하기</button>
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
  name: 'addpost',
  data () {
    return {
      title: '',
      description: '',
      date: new Date(),
      center: {lat: 36.10, lng: 129.38},
      markers: [],
      places: [],
      currentPlace: '',
      options: {
        format: 'DD/MM/YYYY',
        useCurrent: false
      }
    }
  },
  mounted () {
    this.geolocate()
  },
  components: {
    datePicker
  },
  methods: {
    async addPost () {
      await PostsService.addPost({
        title: this.title,
        description: this.description,
        date: this.date,
        lat: this.center.lat,
        lng: this.center.lng
      })
      this.$swal(
        'Great!',
        `Your post has been added!`,
        'success'
      )
      this.$router.push({ name: 'Posts' })
    },
    setPlace (place) {
      this.currentPlace = place
    },
    addMarker () {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.currentPlace = null
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
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
