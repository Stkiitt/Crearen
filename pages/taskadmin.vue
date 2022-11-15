<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-warning bg-warning mb-3">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav4"
                aria-controls="navbarNav4" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="./index.html"> <img style="width: 9em;" id="logo" src="~/assets/logo/logo.png"></a>
            <div class="collapse navbar-collapse justify-content-end">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <button type="button" class="btn btn-dark">使い方</button>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container mt-5">
            <h2>タスク管理画面</h2>
            <div class="row">
                <div class="col-8">
                    <div class="m-2 p-3 border">
                        <h2 class="my-4" id="ToDo">ToDo</h2>
                        <button id="openAddTask" class="button-add">＋追加</button>
                        <!--追加ポップアップここから-->
                        <section id="addTask" class="modalArea">
                            <div id="addTaskBg" class="modalBg"></div>
                            <div class="modalWrapper">
                                <div class="addContents">
                                    <h1>追加用ポップアップだよ～ん</h1>
                                    <p>追加をするならさっさと追加しろ</p>
                                </div>
                                <div id="closeAddTask" class="closeModal">
                                    ×
                                </div>
                            </div>
                        </section>
                        <!--追加ポップアップここまで-->

                        <!-- phpで繰り返す -->
                        <div class="border my-3" id="openEditTask">
                            <h4 class="task-title">課題をやる</h4>
                            <span class="task-content">期限</span>
                            <span class="task-content">優先度</span>
                        </div>
                        <div class="border my-3">
                            <h4 class="task-title">飲み物を飲む</h4>
                        </div>

                        <!--編集ポップアップここから-->
                        <section id="editTask" class="modalArea">
                            <div id="editTaskBg" class="modalBg"></div>
                            <div class="modalWrapper">
                                <div class="editContents">
                                    <h1>編集用ポップアップです</h1>
                                    <p>編集をしたいならさっさと編集しろ</p>
                                </div>
                                <div id="closeEditTask" class="closeModal">
                                    ×
                                </div>
                            </div>
                        </section>
                        <!--編集ポップアップここまで-->

                    </div>
                </div>

                <div class="col-4">
                    <div class="m-2 p-3 border">
                        <h2 class="my-4">遊び要素</h2>
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
                                <a href="#">利用規約・プライバシーポリシー</a>
                            </h6>
                        </div>
                        <!-- Grid column -->

                        <!-- Grid column -->
                        <div class="col-3 mx-auto mb-4">
                            <!-- Links -->
                            <h6 class="fw-bold mb-4">
                                <a href="#">ヘルプ</a>
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
                © 2021 Copyright:
                <a class="text-reset fw-bold" href="#">卒業制作を頑張る会</a>
            </div>
            <!-- Copyright -->
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
    },
    methods: {
    }
}
</script>

<style>
#ToDo{
    display: inline;
}

.button-add {
    float: right; 
    width: 6em; 
    height: 2.5em; 
    border-radius: 3em; 
    background-color: greenyellow;
    color: black;
    border: none;
}

.task{
    height: 3em;
}

.task-title{
    line-height: 2.5em;
    margin: 0;
    padding-left: 1em;
    display: inline;
}

.task-content{
    float: right;
    margin-right: 3em;
    line-height: 4em;
}

#openEditTask{
    cursor:pointer
}

/* モーダルCSS */
.modalArea {
    display: none;
    position: fixed;
    z-index: 10;
    /*サイトによってここの数値は調整 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.modalBg {
    width: 100%;
    height: 100%;
    background-color: rgba(30, 30, 30, 0.9);
}

.modalWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    max-width: 500px;
    padding: 10px 30px;
    background-color: #fff;
}

.closeModal {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    cursor: pointer;
}


/* 以下ボタンスタイル */
button {
    padding: 10px;
    background-color: #fff;
    border: 1px solid #282828;
    border-radius: 2px;
    cursor: pointer;
}
</style>

