//getStyle（）函数用来获取元素的非行内元素
// 使用方法：getStyle(元素,"属性名")

function getStyle(obj,attr){
    if (window.getComputedStyle){
         return getComputedStyle(obj)[attr]
    }else{
        return obj.currentStyle[attr];
    }
};


/*move运动框架
*使用方法：move(元素，'方向','速度(步长)',终止值,要求时间,回调函数（）);
*例子： move(oBox,'top',20,0,50,function(){
            move(oBox,'left',20,900,50,function(){
                move(oBox,'top',30,400,30,function(){
                    move(oBox,'left',20,0,20)
                })
            });
        });

 */
//元素 属性 步长 终止值 要求时间 回调函数
function move(obj,attr,dir,target,tim,endFn) {
    clearInterval(obj.timer);
    var cur=parseInt(getStyle(obj,attr));
    dir=cur>target?-dir:dir;
    obj.timer=setInterval(function () {
        var speed=parseInt(getStyle(obj,attr))+dir;
        if(speed<target && dir<0 || speed>target && dir>0){
            speed=target
        };
        obj.style[attr]=speed+'px';
        if(speed==target){
            clearInterval(obj.timer);
            if(endFn){
                endFn();
            }
        }
    },tim)
};


//事件绑定函数
//使用方法：bind(document,'click',fn2);
//obj要绑定的对象  type事件类型  fn事件函数
function bind(obj,type,fn) {
    if (obj.attachEvent){
        obj.attachEvent('on'+type,fn);
    } else{
        obj.addEventListener(type,fn);
    }
};


//拖拽
//handle 拖拽时鼠标按下的位置  obj拖拽的对象
//用法 drag(cur,oBx);
function drag(handle,obj){
    cur.onmousedown=function (ev) {
        var oEv=ev||event;
        var disX=oEv.clientX-obj.offsetLeft;
        var disY=oEv.clientY-obj.offsetTop;
        //判断元素是否有全局捕获
        if(handle.setCapture){
            handle.setCapture();
        }
        document.onmousemove=function (ev) {
            var oEv=ev||event;
            var le=oEv.clientX-disX;
            var tp=oEv.clientY-disY;
            var sW=document.documentElement.clientWidth-obj.offsetWidth;//一屏的宽-元素的宽
            var sH=document.documentElement.clientHeight-obj.offsetHeight;//一屏的高-元素的高
            //限制左侧、右侧
            if(le<50){
                le=0;
            }else if(le>sW-50){
                le=sW
            }
            //限制上侧、下侧
            if(tp<50){
                tp=0;
            }else if(tp>sH-50){
                tp=sH;
            }
            obj.style.left=le+'px';
            obj.style.top=tp+'px';
        };
        document.onmouseup=function () {
            document.onmousemove=document.onmouseup=null;
            //鼠标抬起释放全局捕获
            if(handle.releaseCapture){
                handle.releaseCapture();
            }
        };
        if (oEv.preventDefault) {
            oEv.preventDefault();
        }
        return false;
    };

}


//平滑运动
//uniform(oBx,'left',500,10,20);
//obj 对象 attr方向属性 target边界 dir 步长 tim时间
function uniform(obj,attr,target,dir,tim){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var speed=parseInt(getStyle(obj,attr));
        speed+=dir;
        if (speed>=target){
            speed=target;
            clearInterval(obj.timer);
        }
        obj.style[attr]=speed+'px';
    },tim)
}


//缓冲运动
//buffer(oBx,'left',500,10,20);
//obj 对象 attr方向属性 target边界 dir步长 tim时间
function buffer(obj,attr,target,dir,tim){
        clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var cur=parseInt(getStyle(obj,attr));//获取当前元素的attr值
        var speed=(target-cur)/dir;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);//速度（向右走向上取整，向左走向下取整）
        if (cur==target){                      //位置到500停止计时
            clearInterval(obj.timer);
        }
        obj.style[attr]=cur+speed+'px';
    },tim)
}


//淡入淡出
//fade(oBx,'opacity',50,10,100);
//obj 对象 attr属性 target边界 dir步长 tim时间
function fade(obj,attr,target,dir,tim){
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var cur=parseInt(getStyle(obj,attr)*100);//获取当前元素的attr值
        var speed=(target-cur)/dir;
        speed=speed<0?Math.floor(speed):Math.ceil(speed);//速度（向右走向上取整，向左走向下取整）
        if (cur==target){                      //位置到500停止计时
            clearInterval(obj.timer);
        }
        console.log((cur+speed)/100);
        obj.style[attr]=(cur+speed)/100;
    },tim)
}



//淡入淡出+缓冲
//buffade(oBx,'opacity',50,10,100,function(){
// buffade(oBx1,'left',500,10,100)
// };
//obj 对象 attr属性 target边界 dir步长 tim时间 endFn回调函数
// function buffade(obj,attr,target,dir,tim,endFn){
//     clearInterval(obj.timer);
//     if(attr=='opacity'&& target<1){
//         target=parseInt(target*100)
//     }
//     obj.timer=setInterval(function(){
//         if (attr=='opacity'){
//             var cur=parseInt(getStyle(obj,attr)*100);
//         }else{
//             var cur=parseInt(getStyle(obj,attr));
//         }
//         console.log(getStyle(obj,attr));
//         var speed=(target-cur)/dir;
//         speed=speed>0?Math.ceil(speed):Math.floor(speed);
//
//         if (attr=='opacity'){
//             obj.style[attr]=(cur+speed)/100;
//         }else{
//             obj.style[attr]=cur+speed+'px';
//         }
//         if (cur==target){
//             clearInterval(obj.timer);
//             if (endFn){
//                 endFn();
//             }
//         }
//     },tim)
// }


//淡入淡出+缓冲()
/*用法：buffade(oBox,{"opacity":0.3,"left":500},function(){
         buffade(oBox,{'top': 500})
    });*/
//obj 对象 json=attr:target dir步长 tim时间 endFn回调函数
function buffade(obj,json,dir,tim,endFn){
    clearInterval(obj.timer);
    for(var attr in json){
        if (attr == "opacity" && json[attr] < 1) {
            json[attr] = parseInt(json[attr] * 100);
        }
        obj.timer = setInterval(function(){
            var tag = 1; //状态值，判断是否到达终点 值为1，所有的运动都到达终点

            for(var attr in json){
                var cur = 0;
                if(attr == "opacity"){
                    cur = parseInt(getStyle(obj,attr) * 100);
                }else{
                    cur = parseInt(getStyle(obj,attr));
                }
                var speed = (json[attr]  - cur)/dir;//速度
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                if(cur != json[attr]){ //只要有一个运动未达到其对应的运动终点，则tag值为0
                    tag = 0;
                }
                console.log(cur);
                if(attr == "opacity"){
                    obj.style[attr] = (cur + speed)/100;
                }else{
                    obj.style[attr] = cur + speed + 'px';
                }

                if(tag == 1){//当所有运动都到达各自对应的运动终点时  才开始终止定时器 否则将一直进行。知道所有运动完成。
                    clearInterval(obj.timer);
                    if(endFn){
                        endFn();
                    }
                }
            }
        },tim);
    }
}




//cookie
//设置cookie
//key名称  value值 t过期时间以天为单位
//setCookie('name','12345',1)
function setCookie(key,value,t) {
    var dat=new Date();
    dat.setDate(dat.getDate()+t);
    document.cookie=key+'='+value+';expires='+dat.toGMTString();
}
//获取cookie
//getCookie('name')
function getCookie(key) {
    var arr=document.cookie.split('; ');
    for (var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if (key==arr2[0]){
            return decodeURI(arr2[1]);//将编码转成汉子
        }
    }
}
//删除cookie数据
//removeCookie('name')
function removeCookie(key){
    setCookie(key,'',-1);
}



//数组去重
/*应用： var arr1=[1,2,3,3];
console.log(only(arr1));//写在箭头函数后边*/
  var only=(arr)=>Array.from(new Set(arr));
// function only(arr){
//     return Array.from(new Set(arr));
// }




















