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
var gid = getParam("id");

var indexes;

$.ajax({
    url:"https://www.easy-mock.com/mock/5be8d43bd5824839429c2b38/guccishow",
    type:"get",
    async:false,
    datatype:"json"
}).done(function(result) {
    var data = result.data;
    for (var i = 0; i < data.length; i++) {
        $("section .screen ul").append(`
           <li>
               <img src=${data[i].images} alt="">
           </li>
       `);
        if (data[i].mid == gid) {
            indexes = i;
            console.log(indexes);
        }
    }
    $("section .screen ul").css("left", -indexes * 960);

    shops();
    front();

    function front() {
        $("section .screen ul li").eq(indexes).find("img").attr("src", data[indexes].images);
        $("article section").css("background-color", "#e7e7e7").find(".zhengfan p").removeClass("active");
        $(".zhengfan .front").addClass("active");
        $(".layer h2").get(0).innerHTML="Look "+data[indexes].tit
    }

    function shops() {
        $(".section_footer ul").html("");
        for (var i = 0; i < data[indexes].arrs.length; i++) {
            $(".section_footer ul").append(`
           <li>
            <div class="li_inner">
               <img src=${data[indexes].arrs[i]} alt="">
               <div class="li_text">
               <p class="t_title">999纯银造旧戒指</p>
               <p class="price">￥12800</p>
               <a href="">浏览 ></a>
               </div>
            </div>
           </li>
       `);
        }
    }

    $(".front").click(function () {
        front()
    });
    $(".back").click(function () {
        $("section .screen ul li").eq(indexes).find("img").attr("src", data[indexes].himages);
        $("article section").css("background-color", "#fff").find(".zhengfan p").removeClass("active");
        $(".zhengfan .back").addClass("active")
    });

    $(".next").click(function () {
        indexes++;
        if (indexes == data.length) {
            indexes = 0
        }
        $("section .screen ul").animate({"left": -indexes * 960}, 400, "linear");
        front();
        shops();
    });

    $(".prev").click(function () {
        indexes--;
        if (indexes == -1) {
            indexes = data.length - 1
        }
        $("section .screen ul").animate({"left": -indexes * 960}, 400, "linear");
        front();
        shops();
    });


    var imgsrc;
    $(".section_footer>ul").delegate("li", "mouseenter", function () {
        var srcc = $(this).find(".li_inner").find("img").attr("src");
        for (var i = 0; i < data[indexes].arrs.length; i++) {
            if (srcc == data[indexes].arrs[i]) {
                imgsrc = data[indexes].uarrs[i];
            }
        }
        $(this).find(".li_inner").css({"height": "125%","z-index":30}).find(".li_text").show().end().find("img").attr("src", imgsrc);

    }).delegate("li", "mouseleave", function () {
        var srcc = $(this).find(".li_inner").find("img").attr("src");
        for (var i = 0; i < data[indexes].arrs.length; i++) {
            if (srcc == data[indexes].uarrs[i]) {
                imgsrc = data[indexes].arrs[i];
            }
        }
        $(this).find(".li_inner").css({"height": "100%","z-index":20}).find(".li_text").hide().end().find("img").attr("src", imgsrc);
    })

});






