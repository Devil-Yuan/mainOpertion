//getStyle（）函数用来获取元素的非行内元素
// 使用方法：getStyle(元素,"属性名")

function getStyle(obj,attr){
    if (window.getComputedStyle){
        return getComputedStyle(obj)[attr]
    }else{
        return obj.currentStyle[attr];
    }
};



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