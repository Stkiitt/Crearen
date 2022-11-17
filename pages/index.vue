<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
        aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <NuxtLink class="navbar-brand" to="/"> <img style="width: 9em;" src="~/assets/logo/logo.png"></NuxtLink>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NuxtLink to="/manual" target="_blank" rel="noopener noreferrer"><button type="button"
                class="btn btn-dark">使い方</button></NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
    <NuxtLink to="index.vue"></NuxtLink>

    <div style="text-align: center; width: 100%;">
      <img src="~/assets/top/犬.jpg" alt="犬">
    </div>

    <div class="container mt-5">
      <div class="row">
        <div class="col-7">
          <div class="m-2 p-3 border">
            <h2 class="my-4">お知らせ</h2>
          </div>
        </div>
        <div class="col-5">
          <div class="m-2 p-3 border">
            <h2 class="my-4">ログイン</h2>
            <label for="exampleInputEmail1">メールアドレス</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              placeholder="Enter email">
            <label for="exampleInputPassword1">パスワード</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            <button type="submit" class="btn btn-primary mt-3">ログイン</button>
            <p class="mt-3"><a href="#">パスワードを忘れた</a></p>
            <p><a href="./signup.html" target="_blank" rel="noopener noreferrer">新規登録</a></p>
          </div>

        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="text-center text-lg-start bg-light text-muted mt-4">


      <!-- Section: Links  -->
      <section class="border-top">
        <div class="container mt-5">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="fw-bold mb-4">
                <a href="#">お問い合わせ</a>
              </h6>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Links -->
              <h6 class="fw-bold mb-4">
                <NuxtLink to="/terms" target="_blank" rel="noopener noreferrer">利用規約・プライバシーポリシー</NuxtLink>
              </h6>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-3 mx-auto mb-4">
              <!-- Links -->
              <h6 class="fw-bold mb-4">
                <NuxtLink to="/help" target="_blank" rel="noopener noreferrer">ヘルプ</NuxtLink>
              </h6>
            </div>
            <!-- Grid column -->

          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->

      <!-- Copyright -->
      <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.05);">
        © 2022 Copyright:
        <a class="text-reset fw-bold" href="#">卒業制作を頑張る会</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <!-- <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        loop: true,
      },
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style>
.splide__slide img {
  width: 100%;
  height: auto;
}
</style>