"use strict";require(["config"],function(){require(["jquery"],function(){var m,q;$("#Header").load("indexheader.html"),$("#loginFooter").load("footer.html"),m=$("#Tbody"),q="",$.ajax({type:"get",url:"../php/getcart.php",dataType:"json",data:{userid:localStorage.getItem("adminname")}}).done(function(t){if(t){var n=t[0].usercart.split("-"),u=[],v=[];$.each(n,function(t,e){var a=n[t].split(",");u.push(a[0]),v.push(a[1])});var e=u.join(",");$.ajax({type:"get",url:"../php/cartgetgoods.php",dataType:"json",data:{pidstr:e}}).done(function(t){var e,a,n,c,r,o,i,p,d,l,s;function h(){var a=$(".shownum"),n=$(".total"),c=$(".checkedd"),t=$("#totalamount"),e=$("#totalprice"),r=0,o=0;$.each(c,function(t,e){c.eq(t).prop("checked")&&(r+=parseInt(a.eq(t).val()),o+=parseFloat(n.eq(t).html()))}),t.html(r),e.html(o.toFixed(2))}$.each(t,function(t,e){var a=Number(e.pprice).toFixed(2);q+='<tr>\n                            <td>\n                                <input type="checkbox" class="checkedd">\n                            </td>\n                            <td>\n                                <div class="cartPic">\n                                    <a href="details.html?pid='+e.pid+'">\n                                        <img src='+e.ppic+'></a>\n                                </div>\n                                <div class="cartTitle">\n                                    <p><a href="details.html?pid='+e.pid+'">'+e.pdetail+'</a></p>\n                                </div>\n                                <div class="cartAttr">\n                                    <p>颜色：'+e.pcolor+" 尺码："+e.psize+'</p>\n                                </div>\n                            </td>\n                            <td class="amount">'+e.pamount+' 件</td>\n                            <td><span class="perprice">'+a+'</span></td>\n                            <td>\n                                <div class="countNum">\n                                    <div class="minus">-</div>\n                                    <input class="shownum" type="text" value='+v[t]+'>\n                                    <div class="add">+</div>\n                                </div>\n                            </td>\n                            <td>\n                                <strong class="total">'+(a*parseInt(v[t])).toFixed(2)+'</strong>\n                            </td>\n                            <td valign="top"><a href="javascript:;" class="shanchu" qqq="'+e.pid+'">删除</a>\n                            </td>\n                        </tr>'}),m.html(q),e=$("#choseAll"),a=$(".cartListMain table tbody .checkedd"),e.on("click",function(){$(this).prop("checked")?a.prop("checked",!0):a.prop("checked",!1),h()}),a.on("click",function(){$(".cartListMain table tbody .checkedd:checked").length==a.length?e.prop("checked",!0):e.prop("checked",!1),h()}),n=$(".shownum"),c=$(".add"),r=$(".minus"),o=$(".amount"),i=$(".total"),p=$(".perprice"),d=$(".checkedd"),$.each(c,function(a,t){$(t).on("click",function(){var t=parseInt(n.eq(a).val());t<parseInt(o.eq(a).html())?t++:t=parseInt(o.eq(a).html()),n.eq(a).val(t);var e=parseFloat(p.eq(a).html())*parseInt(n.eq(a).val());i.eq(a).html(e.toFixed(2)),d.eq(a).prop("checked")&&h()})}),$.each(r,function(a,t){$(t).on("click",function(){var t=parseInt(n.eq(a).val());1<t?t--:t=1,n.eq(a).val(t);var e=parseFloat(p.eq(a).html())*parseInt(n.eq(a).val());i.eq(a).html(e.toFixed(2)),d.eq(a).prop("checked")&&h()})}),$.each(n,function(a,t){$(t).on("blur",function(){var t=parseInt(n.eq(a).val());t<1?t=1:t>parseInt(o.eq(a).html())&&(t=parseInt(o.eq(a).html())),n.eq(a).val(t);var e=parseFloat(p.eq(a).html())*parseInt(n.eq(a).val());i.eq(a).html(e.toFixed(2)),d.eq(a).prop("checked")&&h()})}),l=$(".shanchu"),s=$("tbody tr"),$.each(l,function(t,e){$(e).on("click",function(){s.eq(t).remove();var c=$(this).attr("qqq"),r="";$.each(u,function(t,e){if(e==c){u.splice(t,1),v.splice(t,1);for(var a=[],n=0;n<u.length;n++)a[n]=u[n]+","+v[n];r=a.join("-")}}),$.ajax({type:"post",url:"../php/sendcart.php",dataType:"json",data:{userid:localStorage.getItem("adminname"),usercart:r}}),h()})})})}})})});