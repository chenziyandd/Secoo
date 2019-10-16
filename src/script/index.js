require(['config'], function () {
    require(['jquery'], function () {
        require(['lazyload'], function () {
            class index {
                constructor() {
                    this.bannerVideo = $("#banner .bannerMain .banner-video");//视频所在区域
                    this.videobtn = $("#banner .bannerMain .banner-video .video-play");//播放按钮
                    this.video = $("#banner .bannerMain .banner-video video");//视频
                    this.stairsBox = $("#stairs");//楼梯按钮区域
                    this.stairsbtn = $("#stairs ul li").not(".bttop");//楼梯按钮
                    this.floor = $("section");//楼层
                    this.bttop = $("#stairs ul .bttop");//回到顶部按钮
                    this.productList = $(".editorPickList");
                    this.nextbtn = $(".next");
                    this.prevbtn = $(".prev");
                }
                init() {
                    this.videoPlay();
                    this.videoPause();
                    this.stairsInit();
                    this.stairsRun();
                    this.render();
                }
                videoPlay() {//播放视频
                    let _this = this;
                    this.videobtn.on("click", function (event) {
                        _this.video[0].play();
                        $(this).hide();
                        event.stopPropagation();
                    });
                }
                videoPause() {//停止视频
                    let _this = this;
                    this.bannerVideo.on("click", function () {
                        _this.video[0].pause();
                        _this.videobtn.show();
                    });
                }
                stairsInit() {//楼梯效果初始化
                    if ($(window).scrollTop() >= 180) {//判断初始状态的楼层按钮区域消失或出现
                        this.stairsBox.show();
                    } else {
                        this.stairsBox.hide();
                    }
                }
                stairsRun() {//楼梯效果
                    let _this = this;
                    $(window).on("scroll", function () {
                        let sctop = $(this).scrollTop();
                        if (sctop >= 180) {//判断滚动条变化后楼层按钮区域的消失或出现
                            _this.stairsBox.show();
                        } else {
                            _this.stairsBox.hide();
                        }
                        _this.stairsbtn.removeClass("active");
                        _this.floor.each(function (index, value) {
                            if ($(this).offset().top >= sctop - 200) {
                                _this.stairsbtn.eq(index).addClass("active");
                                return false;
                            }
                        });
                    });
                    this.stairsbtn.on("click", function () {//点击楼层按钮后该按钮变色并运动到按钮缩对应的楼层
                        $(this).addClass("active").siblings("li").removeClass("active");
                        $("html,body").stop(true).animate({
                            scrollTop: _this.floor.eq(($(this).index())).offset().top - 10
                        });
                    });
                    this.bttop.on("click", function () {//回到顶部操作
                        $("html,body").stop(true).animate({
                            scrollTop: 0
                        });
                    })
                }
                render() {//渲染
                    let _this = this;
                    $.ajax({
                        type: 'get',
                        url: '../php/editorpick.php',
                        dataType: 'json',
                    }).done(function (getdata) {
                        let strhtml = '';
                        let count = 1;
                        $.each(getdata, function (index, value) {
                            let price = Number(value.pprice).toFixed(2);
                            if (count % 5 == 1) {
                                strhtml += `<ul class="productList">`
                            }
                            strhtml += ` <li>
                            <a href="details.html?pid=${value.pid}">
                                <div class="product-img">
                                    <img data-original=${value.ppic} alt="" width="232" height="232" class="lazy">
                                    <div class="product-img-mask"></div>
                                </div>
                                <div class="product-details">
                                    <p class="product-name">${value.ptitle}</p>
                                    <p class="product-desc">${value.pdetail}</p>
                                    <div class="line"></div>
                                    <p class="product-price">￥${price}</p>
                                </div>
                            </a>
                        </li>`
                            if (count % 5 == 0) {
                                strhtml += `</ul>`
                            }
                            count++;
                        })
                        let length = Math.ceil(count / 5) + 2;
                        _this.productList.css("width", (length * 1200));
                        _this.productList.html(strhtml);
                        let ul = $(".productList").clone();
                        let firstul = ul[0];
                        let finalul = ul[ul.length - 1];
                        _this.productList.append(firstul);
                        _this.productList.prepend(finalul);
                        _this.lunbo(length);
                        //lazyload插件加载
                        $(function () { //页面加载完成
                            $("img.lazy").lazyload({
                                effect: "fadeIn" //效果方式
                            });
                        });
                    })
                }
                lunbo(length) {//轮播图
                    let _this = this;
                    let count = 1;
                    let bstop = true;
                    this.nextbtn.on("click", function () {
                        let left = parseInt(_this.productList.css("left"));
                        if (bstop) {
                            bstop = false;
                            if (count >= length - 2) {
                                count = 1;
                                left -= 1200;
                                _this.productList.stop(true).animate({ left: left }, function () {
                                    _this.productList.css("left", -1200);
                                    bstop = true;
                                });
                            } else {
                                left -= 1200;
                                _this.productList.stop(true).animate({ left: left }, function () {
                                    bstop = true;
                                });
                                count++;

                            }
                        }
                    })
                    this.prevbtn.on("click", function () {
                        let left = parseInt(_this.productList.css("left"));
                        if (bstop) {
                            bstop = false;
                            if (count <= 1) {
                                count = length - 2;
                                left += 1200;
                                _this.productList.stop(true).animate({ left: left }, function () {
                                    let changeleft = -(length - 2) * 1200;
                                    _this.productList.css("left", changeleft);
                                    bstop = true;
                                });
                            } else {
                                left += 1200
                                _this.productList.stop(true).animate({ left: left }, function () {
                                    bstop = true;
                                });
                                count--;
                            }
                        }
                    })
                }
            }
            $('#Header').load('indexheader.html');
            $('#loginFooter').load('footer.html');
            new index().init();
           
        });
    });
});


