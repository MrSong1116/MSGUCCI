/**
 * Created by 宋大业 on 2018/11/12.
 */
// 百度地图API功能
var city = getCookie("city");
var posx = getCookie("posx");
var posy = getCookie("posy");
console.log(posy);
console.log(posx);
console.log(city);
var map = new BMap.Map("allmap");    // 创建Map实例
map.centerAndZoom(new BMap.Point(posx,posy), 11);

// 初始化地图,设置中心点坐标和地图级别
//添加地图类型控件
map.addControl(new BMap.MapTypeControl({
    mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
    ]}));
map.setCurrentCity(city);
// 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放




var myIcon = new BMap.Icon("img/icon-map_03.png", new BMap.Size(300,157));
 // 创建标注

// 随机向地图添加25个标注
var bounds = map.getBounds();
var sw = bounds.getSouthWest();
var ne = bounds.getNorthEast();
var lngSpan = Math.abs(sw.lng - ne.lng);
var latSpan = Math.abs(ne.lat - sw.lat);



for (var i = 0; i < 10; i ++) {
    var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7),{icon:myIcon});
    var marker2 = new BMap.Marker(point,{icon:myIcon});
    map.addOverlay(marker2);
}



var timer_map;
var num_map=0;
$(".qijian_point a").click(function(){
    num_map=$(this).index();
    $(".qijian_point a").removeClass("active");
    console.log($(this).index());
    $(".qijian_screen ul").animate({"left":-396*$(this).index()},300,"linear");
    $(this).addClass("active")
});

$(".qijian").mouseenter(function(){
    clearInterval(timer_map)
}).mouseleave(function(){
    timer_map = setInterval(function(){
        if(num_map==2){
            num_map=-1;
        }
        num_map++;
        $(".qijian_point a").removeClass("active").eq(num_map).addClass("active");
        $(".qijian_screen ul").animate({"left":-396*num_map},300,"linear");

    },1500);
});

timer_map = setInterval(function(){
    if(num_map==2){
        num_map=-1;
    }
    num_map++;
    $(".qijian_point a").removeClass("active").eq(num_map).addClass("active");
    $(".qijian_screen ul").animate({"left":-396*num_map},300,"linear");
},1500);


removeCookie("city","",-1);
removeCookie("posx","",-1);
removeCookie("posy","",-1);