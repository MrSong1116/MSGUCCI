$.ajax({
    url:"https://www.easy-mock.com/mock/5be8d43bd5824839429c2b38/guccishow",
    type:"get",
    async:true,
    datatype:"json"
}).done(function(result){
var data = result.data;

    for (var i = 0; i < data.length; i++) {
    $("article .show_inner>ul").append(`
        <li>
            <div class="li_inner">
                <img src=${data[i].images} alt="">
                <div class="li_text">
                <p>Look ${data[i].tit}</p>
                <a>浏览 look ></a>
                </div>
            </div>jl,
        </li>
            `);

}
    $("article .show_inner>ul").delegate("li","mouseenter",function(){
        var num =  $(this).index();
        $(this).find(".li_inner").css({
            "box-shadow":"0 1px 3px lightgrey",
            "height": "105%",
            "z-index": 20,
            "background":"#fff"
        }).end().find(".li_text").show().end().find("img").attr("src",data[num].himages)
    }).delegate("li","mouseleave",function(){
        var num =  $(this).index();
        $(this).find(".li_inner").css({
            "box-shadow":"none",
            "height": "100%",
            "z-index": 10,
            "background":"#e7e7e7"
        }).end().find(".li_text").hide().end().find("img").attr("src",data[num].images)
    }).delegate("li","click",function(){
        var inum = $(this).index();
        location.href = "show_detail.html?id="+data[inum].mid
    });
});



var timer_map;
var num_map=0;
$(".qijian_point a").click(function(){
    num_map=$(this).index();
    $(".qijian_point a").removeClass("active");
    console.log($(this).index());
    $(".qijian_screen ul").animate({"left":-422*$(this).index()},300,"linear");
    $(this).addClass("active")
});

$(".qijian_lunbo").mouseenter(function(){
    clearInterval(timer_map)
}).mouseleave(function(){
    timer_map = setInterval(function(){
        if(num_map==3){
            num_map=-1;
        }
        num_map++;
        $(".qijian_point a").removeClass("active").eq(num_map).addClass("active");
        $(".qijian_screen ul").animate({"left":-422*num_map},300,"linear");

    },2000);
});

timer_map = setInterval(function(){
    if(num_map==3){
        num_map=-1;
    }
    num_map++;
    $(".qijian_point a").removeClass("active").eq(num_map).addClass("active");
    $(".qijian_screen ul").animate({"left":-422*num_map},300,"linear");
},2000);


