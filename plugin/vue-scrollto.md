#vue-scrollto

##introduce

点击handler滚动到相应位置。  

##install

    npm i -S vue-scrollto
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-scrollto"></script>

##usage

    import Vue from 'vue'
    import VueScrollTo from 'vue-scrollto'
    Vue.use(VueScrollTo)
    // 引用同时设置默认项
    Vue.use(VueScrollTo, {
        el: '#element',
        container: 'body',
        duration: 500,
        easing: 'ease-in',
        offset: -60,
        force: true,
        cancelable: true,
        onStart: fn,
        onDone: fn,
        onCancel: fn,
        x: false, 
        y: true
    })