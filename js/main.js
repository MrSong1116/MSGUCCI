








$(window).scroll(function(){
   var aaa = $(window).scrollTop();
    if((aaa>=1300)&&(aaa<=3690)){
        $(".person").css("top",(aaa-1300)*.39)
    }
});

$('.email_address_text').focus(function() {
    $(".email_address form").css("background-color","#E5DFD9");
    $(this).css("background","#E5DFD9").siblings().css("background","grey")
}).blur(function() {
    $(".email_address form").css("background-color","#000");
    $(this).css("background","#000").siblings().css("background","000")
});


var arr={
    "hebei":[{name:"请选择城市"},{name:"保定",posx:115.47,posy:38.87},{name:"廊坊",posx:116.710124,posy:39.530679},{name:"燕郊",posx:116.831383,posy:39.95065},{name:"涿州",posx:115.97,posy:39.48}],
    "henan":[{name:"请选择城市"},{name:"洛阳",posx:112.25,posy:34.38},{name:"驻马店",posx:114.02,posy:32.98},{name:"郸城",posx:115.50,posy:33.64},{name:"周口",posx:114.702331,posy:33.633512},{name:"南阳",posx:112.52,posy:33.00}],
    "sichuan":[{name:"请选择城市"},{name:"重庆",posx:106.33,posy:29.35},{name:"成都",posx:104.06,posy:30.67}],
    "heilongjiang":[{name:"请选择城市"},{name:"哈尔滨",posx:126.538736,posy:45.81224},{name:"齐齐哈尔",posx:123.97,posy:47.33},{name:"牡丹江",posx:129.58,posy:44.60}]
};


//oS1.onchange=function(){
//    //获取索引值
//    console.log(s1.value);
////        每次点击清除为0
//    oS2.options.length=0;
//    for (var i = 0; i < arr[oS1.value].length; i++) {
//        oS2.add(new Option(arr[oS1.value][i]))
//    }
//};

var flag_s = true;
var tab_s;
var ih;
var ih2;

$(".select_box1").click(function(){
    $(this).parent(".select").find(".layer").slideDown(200);
    flag_s = false;
});


$(document).click(function(ev){
    if(($(".select_one .select_box1").get(0).innerText!="请选择省")&&($(".select_two .select_box1").get(0).innerText!="请选择城市")){

        var city_post = $(".select_two .select_box1").get(0).innerText;
        setCookie("city",city_post,7);

        location.href="map.html"
    }
    if((!flag_s)&&(ev.target.className!="select_box1")){
        flag_s = true;

        $(".select").find(".layer").slideUp(150);
        }else{
        return false;
    }


    }
);
var str = "";
var posx;
var posy;
$(".select_one .layer strong").click(function(){
    $(".select_two .layer").html("");
     str="";
    ih=$(this).get(0).innerHTML+"<i></i>";
    $(this).parents(".select").find(".select_box1").get(0).innerHTML=ih;
var inn = $(this).attr("data-name");

    console.log(arr[inn].length);
            for (var i = 0; i < arr[inn].length; i++) {
                str += ` <strong>${arr[inn][i].name}</strong>`;
            }
    $(".select_two .layer").append(str);
    var iii = "<i></i>";

    $(".select_two").find(".select_box1").get(0).innerHTML = arr[inn][0].name+iii;

    $(".select_two .layer strong").click(function(){
        posx = arr[inn][$(this).index()].posx;
        posy = arr[inn][$(this).index()].posy;
        setCookie("posx",posx,7);
        setCookie("posy",posy,7);
        ih2=$(this).get(0).innerHTML+"<i></i>";
        $(".select_two").find(".select_box1").get(0).innerHTML=ih2;

    });

});








