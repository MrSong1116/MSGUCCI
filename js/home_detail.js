/**
 * Created by 宋大业 on 2018/11/15.
 */
/**
 * Created by 宋大业 on 2018/11/13.
 */
function getParam(name) {
    var str = location.search.substring(1);
    //解析Url地址信息
    // 获取？后面的信息   字符串形式
    var strReg = "(^|&)" + name + "=(\\w+)(&|$)";
    //用字符串拼接一个含有变量的正则字符串strReg
    var reg = new RegExp(strReg);
    //利用正则构造函数将strReg变成正则赋值给reg
    var arr = reg.exec(str);
    //exec() 方法用于检索字符串中的正则表达式的匹配
    //并得到数组形式    数组索引为2的就是对应正则的值val
    if (arr) {
        //如果数组存在
        var val = arr[2];
        return val;
        //返回对应的值
    } else {
        //否则返回null
        return null;
    }
}
var gid = getParam("sid");

$.ajax({
    url:"https://www.easy-mock.com/mock/5be8d43bd5824839429c2b38/GUCCI_HOME",
    type:"get",
    async:true,
    datatype:"json"
}).done(function(result) {
    var data = result.data;

    for (var i = 0; i < data[gid].arrs.length; i++) {
        $("article section>ul").append(`
        <li>
                <img src=${data[gid].arrs[i]} alt="">
        </li>
            `);
    }
    console.log(data[gid].describe);
    $(".aside_inner h2").html(data[gid].title);
    $(".aside_inner .goods-price").html("￥ "+data[gid].price);
    $(".choose_type img").attr("src",data[gid].arrs[0]);
    $(".choose_type span").html(data[gid].describe);






    $(".b_bottom_left>ul>li").click(function(){
        console.log(1);
        $(".b_bottom_left>ul>li").removeClass("active").find(".li_menu").slideUp(0);
        $(this).addClass("active").find(".li_menu").slideDown(0);
    });

    $(window).scroll(function(){
        console.log($(document).scrollTop());
        if($(document).scrollTop()<=3370){
            $("aside").css({"position":"fixed","top":196});
            $("")
        }else if($(document).scrollTop()>3370){
            $("aside").css({"position":"absolute","top":3448})
        }

        if($(document).scrollTop()>=2850 && $(document).scrollTop()<=3370){
            $("section").css({"position":"fixed","top":-2760})
        }else if($(document).scrollTop()<2850){
            $("section").css({"position":"absolute","top":15})
        }else if($(document).scrollTop()>3370){
            $("section").css({"position":"absolute","top":515})
        }
    });

})


