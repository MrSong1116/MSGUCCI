/**
 * Created by 宋大业 on 2018/11/12.
 */
    $.ajax({
        url:"https://www.easy-mock.com/mock/5be8d43bd5824839429c2b38/GUCCI_HOME",
        type:"get",
        data:"",
        async:true,
        dataType:"json"
    }).done(function(result){
        var data = result.data;
        for (let i = 0; i < data.length; i++) {
            $("section .shop_inner>ul").append(`
             <li>
                <div class="li_inner">
                    <i class="xin"></i>
                    <i class="next li_btn"></i>
                    <i class="prev li_btn"></i>
                    <img src="${data[i].images}" alt="">
                    <div class="li_text">
                        <p class="li_title">${data[i].title}</p>
                        <p class="li_size">${data[i].price}</p>
                        <p class="li_buy">立即购买 ></p>
                    </div>
                </div>
            </li>
            `);
            $("section .shop_inner>ul>li").eq(i).hover(function(){
                $(this).find(".li_inner").css({
                    "background":"#fff",
                    "height":"115%",
                    "z-index":300
                }).find("img").attr("src",data[i].himages)
            },function(){
                $(this).find(".li_inner").css({
                    "background":"#e7e7e7",
                    "height":"100%",
                    "z-index":20
                }).find("img").attr("src",data[i].images)
            }).click(function(){
                window.location.href = "home_detail.html?sid="+$(this).index()
            });
        }
    });



