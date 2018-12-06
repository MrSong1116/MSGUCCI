/**
 * Created by 宋大业 on 2018/11/11.
 */
var inon=true;
var inon2=true;

$(".search-inner input").focus(function() {
    inon=false;
    $(this).css({"width": 300}).attr({"placeholder": "搜索商品"}).addClass("active").parent(".search-inner").css("background", "white").end().nextUntil(1).css("background-color", "#d0d0d1");
});
$(".search-inner input").blur(function(){
    inon=true;
    $(this).css({"width":40}).attr({"placeholder":"搜索"}).removeClass("active").parent(".search-inner").css("background"," #1b1b1b").end().nextUntil(1).css("background-color","#1b1b1b");
});

var num = 0;
var num1 = 0;
var timer1;
var timer2;


$(".women .nav-lunbo").mouseenter(function(){
    clearInterval(timer1)
}).mouseleave(function(){
    timer1 = setInterval(function(){
        playnext($(".women .nav-lunbo ul li"),$(".women .nav-lunbo .point span"));
    },1500);
});
$(".women .nav-lunbo .point span").mouseenter(function(ev){
    ev.stopPropagation();
    num=$(this).index()-1;
    playnext($(".women .nav-lunbo ul li"),$(".women .nav-lunbo .point span"));
});
timer1 = setInterval(function(){
    playnext($(".women .nav-lunbo ul li"),$(".women .nav-lunbo .point span"));
},1500);



$(".men .nav-lunbo").mouseenter(function(){
    clearInterval(timer2)
}).mouseleave(function(){
    timer2 = setInterval(function(){
        playnext1($(".men .nav-lunbo ul li"),$(".men .nav-lunbo .point span"));
    },1500);
});
$(".men .nav-lunbo .point span").mouseenter(function(ev){
    console.log($(this).index());
    ev.stopPropagation();
    num1=$(this).index()-1;
    playnext1($(".men .nav-lunbo ul li"),$(".men .nav-lunbo .point span"));
});

timer2 = setInterval(function(){
    playnext1($(".men .nav-lunbo ul li"),$(".men .nav-lunbo .point span"));
},1500);




//$(".women .nav-lunbo").mouseenter(function(){
//    clearInterval(timer2)
//}).mouseleave(function(){
//    timer2 = setInterval(function(){
//        playnext($(".women .nav-lunbo ul li"),$(".women .nav-lunbo .point span"),num2);
//    },1500);
//});
//$(".women .nav-lunbo .point span").mouseover(function(){
//    num2=$(this).index()-1;
//    playnext($(".women .nav-lunbo ul li"),$(".women .nav-lunbo .point span"),num2)
//});
//
//timer2 = setInterval(function(){
//    playnext($(".women .nav-lunbo ul li"),$(".women .nav-lunbo .point span"),num2);
//},1500);

function playnext(x,y){
    num++;
    if(num==9){
        num=0;
    }
    x.fadeOut(300);
    y.removeClass("active");

    x.eq(num).fadeIn(300);
    y.eq(num).addClass("active");
}

function playnext1(x,y){
    num1++;
    if(num1==9){
        num1=0;
    }
    x.fadeOut(300);
    y.removeClass("active");

    x.eq(num1).fadeIn(300);
    y.eq(num1).addClass("active");
}

flag = true;
/*.mouseenter(function(){
 if(target!="li"){
 $(".nav-menu .nav-pills>ul>li").find(".splice-sub-menu").css({"top":71,"display":"none"});
 }
 })*/

$(".nav-menu .nav-pills>ul").mouseleave(function(){
        flag=true;
    }
);

$(".nav-menu .nav-pills>ul>li").hover(function(){
    $(".nav-pills>ul>li>a").removeClass("active");
    $(".nav-pills>ul>li").eq($(this).index()).find("a").addClass("active");


    if(flag){
        flag=false;
        $(this).find(".splice-sub-menu")
            .css({"display":"block","z-index":200,"top":71}).delay(100)
            .animate({"top":51,"opacity":.95},200,"linear",function(){$(".nav-menu .nav-pills>ul>li")
                .css("top",51)}).end().siblings().find(".splice-sub-menu")
            .css({"display":"none","top":51});

    }else if(flag==false){
        $(this).find(".splice-sub-menu")
            .css({"display":"block","z-index":200,"opacity":.95})
            .end().siblings().find(".splice-sub-menu")
            .css({"display":"none"});
    }
},function() {
    $(".nav-pills>ul>li>a").removeClass("active");
    nnn = $(this).index();
    $(this).find(".splice-sub-menu").animate({"top": 71, "opacity": 0}, 200, "linear",function(){
        $(".nav-menu .nav-pills>ul>li").eq(nnn).find(".splice-sub-menu").css("display","none")
    }).end().siblings().find(".splice-sub-menu").css({"display":"none","top":51})});




$(".splice>ul>li").hover(function(){
    if(inon&&inon2){
        inon2=false;
        $(this).find(".splice-box").slideDown(250,"linear")
    }
},function(){
    if(inon) {
        $(this).find(".splice-box").slideUp(0,function(){
            inon2=true;
        });
    }
});

$(".nav-pills>ul>li:first-of-type>a").click(function(){
    window.open("show.html")
});
$(".nav-pills>ul>.women>a").click(function(){
    window.open("shop.html")
});
$(".nav-pills>ul>li:nth-of-type(5)>a").click(function(){
    window.open("home.html")
});
$(".nav-pills>ul>li:last-of-type>a").click(function(){
    window.open("story.html")
});
$(".nav-logo").click(function(){
    window.location.href = "index.html"
});
