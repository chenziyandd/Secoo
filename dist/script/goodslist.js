"use strict";var _createClass=function(){function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}require(["config"],function(){require(["jquery"],function(){function e(){_classCallCheck(this,e),this.ptype=$(".goodsType span"),this.pul=$("#goodslist .goodslistMain ul"),this.pagetitle=$("title")}(new(_createClass(e,[{key:"init",value:function(){var e=location.search.split("=")[1];this.pagetitle.html("寺库网-"+e),$(this.ptype).html(e),this.render(e)}},{key:"render",value:function(e){var t=this;$.ajax({type:"post",url:"../php/goodslist.php",dataType:"json",data:{ptype:e}}).done(function(e){var a='<div class="goodsTitle">\n                                    <a href="javascript:;" class="on">商城</a>\n                                    <a href="javascript:;">拍卖</a>\n                                    </div>\n                                    <div class="goodsSearch"></div>';$.each(e,function(e,t){var n=Number(t.pprice).toFixed(2);a+='<li>\n                                    <a href="details.html?pid='+t.pid+'">\n                                        <img src='+t.ppic+' alt="">\n                                        <div class="line"></div>\n                                        <p>'+t.pdetail+"</p>\n                                        <strong>￥"+n+"</strong>\n                                        <i>库存<span>"+t.pamount+"</span>件</i>\n                                    </a>\n                                </li>"}),t.pul.html(a)})}}]),e)).init(),$("#Header").load("indexheader.html"),$("#loginFooter").load("footer.html")})});