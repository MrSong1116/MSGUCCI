$.ajax({
    url:"https://www.easy-mock.com/mock/5be8d43bd5824839429c2b38/GUCCI_STORY",
    type:"get",
    async:true,
    datatype:"json"
}).done(function(result) {
    var data1 = result.data_one;
    var data2 = result.data_two;
    var data3 = result.data_three;
    var data4 = result.data_four;
    var data5 = result.data_five;


    for (var i = 0; i < data1.length; i++) {
        $("section>.lis_1>ul").append(`
        <li>
              <img src=${data1[i].img} alt="">
              <div class="li_text">
                    <h2>${data1[i].date}</h2>
                    <div class="li_text_main">
                        ${data1[i].main}
                    </div>
              </div>
        </li>
            `);
    }

    for (var j = 0; j < data2.length; j++) {
        $("section>.lis_2>ul").append(`
        <li>
              <img src=${data2[j].img} alt="">
              <div class="li_text">
                    <h2>${data2[j].date}</h2>
                    <div class="li_text_main">
                        ${data2[j].main}
                    </div>
              </div>
        </li>
            `);
    }

    for (var p = 0; p < data3.length; p++) {
        $("section>.lis_3>ul").append(`
        <li>
              <img src=${data3[p].img} alt="">
              <div class="li_text">
                    <h2>${data3[p].date}</h2>
                    <div class="li_text_main">
                        ${data3[p].main}
                    </div>
              </div>
        </li>
            `);
    }

    for (var u = 0; u < data4.length; u++) {
        $("section>.lis_4>ul").append(`
        <li>
              <img src=${data4[u].img} alt="">
              <div class="li_text">
                    <h2>${data4[u].date}</h2>
                    <div class="li_text_main">
                        ${data4[u].main}
                    </div>
              </div>
        </li>
            `);
    }

    for (var o = 0; o < data5.length; o++) {
        $("section>.lis_5>ul").append(`
        <li>
              <img src=${data5[o].img} alt="">
              <div class="li_text">
                    <h2>${data5[o].date}</h2>
                    <div class="li_text_main">
                        ${data5[o].main}
                    </div>
              </div>
        </li>
            `);
    }




});
