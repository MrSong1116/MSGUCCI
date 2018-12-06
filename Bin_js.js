/**
 * Created by Bin on 2018/10/25.
 */
//Bin的个人js封装

/*obj  移动的对象
speed  每15ms移动的距离
target   终点距离
运动*/

/*左右*/
function moveLeft(obj, speed, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var jj = obj.offsetLeft;
        speed = Math.abs(speed);
        speed = jj < target ? speed : -speed;
        if (Math.abs(jj - target) > Math.abs(speed)) {
            jj += speed;
            obj.style.left = jj + "px";
        } else {
            jj = target;
            obj.style.left = jj + "px";
            clearInterval(obj.timer)
        }

    }, 15)
}

/*上下*/
function moveTop(obj, speed, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var jj = obj.offsetTop;
        speed = Math.abs(speed);
        speed = jj < target ? speed : -speed;
        if (Math.abs(jj - target) > Math.abs(speed)) {
            jj += speed;
            obj.style.top = jj + "px";
        } else {
            jj = target;
            obj.style.top = jj + "px";
            clearInterval(obj.timer)
        }

    }, 15)
}

/*缓慢左右*/
function hmmove(obj, target) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var objX = obj.offsetLeft;//获取对象的left
        var move = (target - objX) / 10;//将要移动的距离/10
        //得到移动距离逐渐变小
        // 因为需要配合定时器有那种缓慢移动的效果
        move > 0 ? Math.ceil(move) : Math.floor(move);//取整
        objX = objX + move;//对象当时的left加每15毫秒移动的距离
        obj.style.left = objX + "px";//赋值给对象的left

        if (objX === target) {
            //当对象的left值等于悬停后的left值时  停止定时器
            clearInterval(obj.timer)
        }
    }, 15)
}

/*Ajax 提交 请求*/
function ajax(method, url, fnSucc, fnFaild, data) {

    //1、创建Ajax实例
    try {
        var xhr = new XMLHttpRequest();
    } catch (e) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    if (method.toUpperCase() == "POST") {
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    } else if (method.toUpperCase() == "GET") {
        //2、连接服务器  打开和服务器的链接
        xhr.open(method, url + "?" + data, true);
        //3、发送
        xhr.send();
    }


    //4、接收数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                fnSucc(xhr.responseText);
            } else {
                if (fnFaild) {
                    fnFaild();
                }
            }
        }
    }

}

/*;setCss.Css();
 * 获取修改集合    Css
 * 两个参数的时候-获取
 * 第二个参数为对象时，用对象来批量修改属性样式
 *
 * 三个参数的时候-修改单个属性样式
 * */
let setCss = (function () {
    /*
     *获取元素样式Css
     * 由于我们通过style.xx只能操作行内样式
     *   所以要封装getCss
     *   特点：可以获取行内/内嵌/外部  样式    兼容
     *执行样式
     *
     * ele     //元素
     * attr    //属性
     */
    function getCss(ele, attr) {
        if (ele.currentStyle) {
            return ele.currentStyle[attr];
        } else {
            return getComputedStyle(ele)[attr];
        }

    }

    //修改元素样式
    /*
     *  * ele     //元素
     * attr    //属性
     * val     //修改后的属性的值
     * */
    function setCss(ele, attr, val) {
        ele["style"][attr] = val;
    }

    //利用对象批量修改元素样式
    /*
     *  * ele     //元素
     * obj   //对象
     */
    function setGroupCss(ele, obj) {
        for (var k in obj) {
            ele["style"][k] = obj[k];
        }
    }

    /*获取修改集合    Css
     * 两个参数的时候-获取
     * 第二个参数为对象时，用对象来批量修改属性样式
     *
     * 三个参数的时候-修改单个属性样式
     * */
    function Css() {
        var arg = [].slice.call(arguments);
        if (arguments.length === 2) {
            if ((typeof arg[1]) === "object") {
                setGroupCss(arg[0], arg[1]);
            } else {
                return getCss(arg[0], arg[1]);
            }

        } else if (arguments.length === 3) {
            setCss(arg[0], arg[1], arg[2]);
        }
    }

    return {
        Css: Css
    }
})();


//可视化宽高   client().width/client().height
function client() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0
    }
}

//滚轴top left  scroll().top/scroll().left
function scroll() {
    return {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
    };
}

/*移除所有的类名(name)  添加当前的(name)
 * x为操纵元素
 * y为被动操作元素
 * ev事件
 * name 类名
 * */
function setClassName(x, y, ev, name) {
    for (let i = 0; i < x.length; i++) {
        x[i][ev] = function () {
            for (var j = 0; j < y.length; j++) {
                x[j].classList.remove(name);
                y[j].classList.remove(name);
            }
            x[i].classList.add(name);
            y[i].classList.add(name);
            index = i;
        }
    }
}

//滚轴事件函数   scrollDown/scrollUp函数事件未定义
function mouseWheel(ev) {
    var oEvent = window.event || ev;
    if (oEvent.detail) {
        if (oEvent.detail > 0) {
            scrollDown()
        } else {
            scrollUp()
        }
    } else if (oEvent.wheelDelta) {
        if (oEvent.wheelDelta > 0) {
            scrollUp()
        } else {
            scrollDown()
        }
    }
}

//事件监听  解决兼容性问题
/*dom2/dom0事件   ele元素  type 事件   listener 执行函数*/
function addEvent(ele, type, listener) {
    if (ele.addEventListener) {
        ele.addEventListener(type, listener);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, listener);
    } else {
        ele["on" + type] = listener;
    }
}

//定义向上滚动的事件函数模板    参考即可
/*
 function scrollUp() {
 if (!isRunning) {
 isRunning = true;
 // 設置定時器  儅1秒之後  滾軸繼續可以使用
 setTimeout(function () {
 isRunning = false;
 }, 1000);
 if (page > 0) {
 //page>0的时候  page-- 意味着放置所有小盒子的可以向上移动
 //--操作  并把相应的值赋给放置所有小盒子的top值
 page--;
 oAllScreen.style.top = -page * screenH + "px";
 }
 }
 }
 */

//定义向下滚动的事件函数模板    参考即可
/*
 function scrollDown() {
 if (!isRunning) {
 isRunning = true;
 setTimeout(function () {
 isRunning = false;
 }, 1000);
 if (page < arrScreen.length - 1) {
 //page<小盒子的最大索引值的时候  page++ 意味着放置所有小盒子的可以向下移动
 //++操作  并把相应的值赋给放置所有小盒子的top值
 page++;
 oAllScreen.style.top = -page * screenH + "px";
 }
 }
 }*/


/**
 * 通过传递不同的参数获取不同的元素
 * @param str
 * @returns {*}
 */
function $(str) {
    var str1 = str.charAt(0);
    if (str1 === "#") {
        return document.getElementById(str.slice(1));
    } else if (str1 === ".") {
        return document.getElementsByClassName(str.slice(1));
    } else {
        return document.getElementsByTagName(str);
    }
}

/*吸顶盒  模板*/
//仅供参考
//原理为 当滚轴的距离大于元素的距html页面最顶部的时候
//将元素固定到页面窗口
/*window.onscroll=function(){
 if(scroll().top>topPart.offsetHeight){
 navBar.className="nav fixed";
 mainPart.style.paddingTop=navBar.offsetHeight+"px";
 }else {
 navBar.className="nav";
 mainPart.style.paddingTop=0;
 }
 }*/

//放大镜 效果模板  仅供参考
/*
 //    鼠标移入移出显示隐藏
 xbox.onmouseover = function () {
 bbox.style.display = "block";
 lay.style.display = "block";
 };
 xbox.onmouseout = function () {
 bbox.style.display = "none";
 lay.style.display = "none";
 }

 //    遮罩层跟随鼠标移动
 xbox.onmousemove = function (event) {
 var event = event || window.event;

 var pageX = event.pageX || event.clientX + document.documentElement.offsetLeft;//浏览器中X轴坐标
 var pageY = event.pageY || event.clientY + document.documentElement.offsetTop;//浏览器中Y轴坐标


 var boxX=pageX-zbox.offsetLeft,
 boxY=pageY-zbox.offsetTop;
 //用浏览器XY坐标减去盒子距离left0和top0的位置就是鼠标在盒子中坐标

 var layX=boxX-lay.offsetWidth/2;
 var layY=boxY-lay.offsetHeight/2;
 //因为要通过鼠标移动实施获得遮罩层的位置
 //鼠标应该在遮罩层的中间，所以用鼠标在盒子的坐标减去遮罩层宽高的一半
 //就是遮罩层应该在盒子中的left和top值

 //控制最小
 if(layX<0){
 layX=0;
 }
 if(layY<0){
 layY=0;
 //遮罩层的位置不能超出盒子，所以不能小于0，小于0的时候为0
 }
 //控制最大
 if(layX>xbox.offsetWidth-lay.offsetWidth){
 layX=xbox.offsetWidth-lay.offsetWidth
 }
 if(layY>xbox.offsetHeight-lay.offsetHeight){
 layY=xbox.offsetHeight-lay.offsetHeight
 }
 //遮罩层的位置不能超出盒子，所以不能大于大盒子-遮罩层的宽高，大于的时候为大盒子-遮罩层的宽高

 lay.style.left=layX+"px";
 lay.style.top=layY+"px";
 //把遮罩层实时位置赋给遮罩层


 //rate是大盒子的宽/遮罩层的宽，也就是一个倍数，
 var rate=bbox.offsetWidth/lay.offsetWidth;

 //设置实时移动遮罩层，大图移动的位置
 Img.style.left=-rate*layX+"px";
 Img.style.top=-rate*layY+"px";
 }*/

//旋转木马  效果模板   仅供参考
/*
 //封装一个函数
 function setTab(obj, json, fn) {
 clearInterval(obj.timer);//清除定时器
 obj.timer = setInterval(function () {
 //定义定时器要执行的操作
 var flag = true;
 //定义一个状态  //初始为true
 for (var k in json) {
 //遍历对象
 if (k === "opacity") {
 //如果对象的键为opacity的话
 obj.style.opacity = json[k];
 //对应的值就给了obj的opacity属性
 } else if (k === "zIndex") {
 //如果对象的键为ozIndex的话
 obj.style.zIndex = json[k];
 //对应的值就给了obj的zIndex属性
 } else {
 //否则
 //先获取obj其他键值对应的属性值，没有的话  为0
 //赋值给leader
 var leader = parseInt(getStyle(obj, k)) || 0;

 //将遍历到的对应的其他属性值赋值给target
 var target = json[k];

 var step = (target - leader) / 10;
 step = step > 0 ? Math.ceil(step) : Math.floor(step);
 leader = leader + step;
 obj.style[k] = leader + "px";
 //由快到慢运动
 //把json对象对应的值给对应的属性
 }
 if (leader != target) {
 //如果对应属性值还没有给obj的属性
 flag = false;
 //flag状态为false
 }
 }
 if (flag) {
 clearInterval(obj.timer);
 //清除定时器
 if (fn) {
 fn();
 //如果fn函数存在
 //就执行fn()
 }
 }

 }, 15)
 }

 //封装一个获取元素样式函数
 function getStyle(obj, attr) {
 if (window.getComputedStyle) {
 return window.getComputedStyle(obj, null)[attr];
 } else {
 return obj.currentStyle[attr];
 }
 }

 //节流阀状态定义   true表示打开节流阀
 var flag = true;

 //配置json数据
 var json = [
 {
 "width": 400,
 "top": 20,
 "left": 50,
 "opacity": 0.2,
 "zIndex": 2
 },//0
 {
 "width": 600,
 "top": 70,
 "left": 0,
 "opacity": 0.8,
 "zIndex": 3
 },//1
 {
 "width": 800,
 "top": 100,
 "left": 200,
 "opacity": 1,
 "zIndex": 4
 },//2
 {
 width: 600,
 top: 70,
 left: 600,
 opacity: 0.8,
 zIndex: 3
 },//3
 {
 "width": 400,
 "top": 20,
 "left": 750,
 "opacity": 0.2,
 "zIndex": 2
 }//4
 ]

 var wrap = document.getElementById("wrap");
 var slide = document.getElementById("slide");
 var arrow = document.getElementById("arrow");
 var ul = slide.children[0];
 var lis = ul.children;
 var next = document.getElementById("arrLeft");
 var prev = document.getElementById("arrRight");


 wrap.onmouseover = function () {
 arrow.style.opacity = 1;
 //鼠标悬停显示左右
 };
 wrap.onmouseout = function () {
 arrow.style.opacity = 0;
 //鼠标离开隐藏左右
 }

 //封装一个函数，将配置好的json数据放入li
 function assign() {
 for (var i = 0; i < lis.length; i++) {
 setTab(lis[i], json[i], function () {
 flag = true;
 //执行完动画打开节流阀
 //表示可以继续操作
 })

 }
 }
 assign();

 //配置左右按钮next prev
 //next
 next.onclick=function(){
 if(flag){
 flag=false;
 //关闭节流阀
 json.push(json.shift());
 //把最前面的数据放到最后面
 assign();
 }
 };
 prev.onclick=function(){
 if(flag){
 flag=false;
 json.unshift(json.pop());
 //将最后的数据放在最前面
 assign();
 }
 };*/
//index为当前索引
// eles为操纵元素的类数组
//f 执行的函数事件

//左右点击事件
/*
 * index为当前元素的索引
 * ele为元素的集合
 * ev为事件
 * f为执行函数
 */
function right(index, ele, ev, f) {
    index++;
    if (index > ele.length - 1) {
        index = 0;
    }
    ele[index][ev] = f;
}
function left(index, ele, ev, f) {
    index--;
    if (index < 0) {
        index = ele.length - 1;
    }
    ele[index][ev] = f;
}

//设置cookie
let Cookie = {
    //获取
    getCookieByName: function (name) {
        var arr = document.cookie.split("; ")
        for (var i = 0; i < arr.length; i++) {
            newarr = arr[i].split("=")
            if (newarr[0] == name) {
                return newarr[1]
            }
        }
    },
    //设置
    setCookie: function (key, value, expiresDate) {

        var oDate = new Date();
        oDate.setDate(oDate.getDate() + expiresDate)
        document.cookie =
            key + "=" +
            value +
            ";expires=" +
            oDate
    },
    //清除
    removeCookie: function (key) {
        setCookie(key, "", -1)
    }
};

//解析前地址中?后面的信息  name为=前的名字  返回值
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
        return val
        //返回对应的值
    } else {
        //否则返回null
        return null;
    }
}

//解除事件绑定
function removeEvent(ele, e, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(e, fn);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + e, fn);
    } else {
        ele['on' + e] = null;
    }
}
///阻止冒泡
//.onclick = function (ev) {
//    var oEven = window.event||ev;
//    oEven.stopImmediatePropagation();}//阻止冒泡