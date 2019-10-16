//配置模块
require.config({ 
    baseUrl:'https://cdnjs.cloudflare.com/ajax/libs/',//公有的路径
    paths:{
        'jquery':'jquery/1.12.4/jquery.min',  //插件名称必须交jquery
        'lazyload':'jquery.lazyload/1.9.1/jquery.lazyload.min'
    }
});