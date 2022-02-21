//通过pisition实现图片轮播(所有对象通过id获取)

//应用例子：rolPic('container','list','img','buttons','span','on','prev','next',300,10,1500,600);
/*解释：objwrap：整个装轮播图的外框
    picwrap：装图片的外框
    picli：要轮播的对象（可以直接是图片，也可以是li ）
    btn：装图片对应的小按钮的容器
    btnlist：小按钮
    btnlistclass：小按钮选中时的样式
    pbtn：向左切换按钮
    nbtn：向右切换按钮
    pathtime：位移的总时间
    intime：位移间隔时间
    carouset：轮播的时间（setInterval的时间）
    picwidth：每张图片的宽（这里只写数字  不加单位）
*/
/*固定解构（不唯一 作参考）：
    <div id="container">
        <div id="list" style="left:-600px">
        <img src="images/maldives_4.jpg" alt="">
        <img src="images/maldives_1.jpg" alt="">
        <img src="images/maldives_2.jpg" alt="">
        <img src="images/maldives_3.jpg" alt="">
        <img src="images/maldives_4.jpg" alt="">
        <img src="images/maldives_1.jpg" alt="">
        </div>
        <div id="buttons">
        <span index="1" class="on"></span>
        <span index="2" ></span>
        <span index="3" ></span>
        <span index="4" ></span>
        </div>
        <a href="#" class="arrow" id="prev">&lt;</a>
        <a href="#" class="arrow" id="next">&gt;</a>
        </div>
*/
/*样式：
     body{padding: 20px;}
    #container{
        width: 600px;
        height: 400px;
        border: 2px solid black;
        overflow: hidden;
        position: relative;
    }
    #list{
        width:3600px;
        height: 100%;
        position: absolute;
        z-index: 1;
    }
    #list img{
        width: 600px;
        height: 400px;
        float: left;
    }
    #buttons{
        position: absolute;
        height: 10px;

        z-index: 2;
        bottom: 20px;
        left: 250px;
    }
    #buttons span{
        cursor: pointer;
        float: left;
        border: 1px solid #fff;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        margin: 0 5px;
        background-color:yellow;
    }
    #buttons .on{
        background:red;
    }
    .arrow{
        cursor: pointer;
        display: none;
        line-height: 39px;
        text-align: center;
        font-size: 36px;
        font-weight: bold;
        width: 40px;
        height: 40px;
        position: absolute;
        z-index: 2;
        top: 180px;
        background-color:rgba(0,0,0,.3);
        color: #fff;
    }
    .arrow:hover{background-color:rgba(0,0,0,.7);}
    #container:hover .arrow{display: block;}
    #prev{left: 20px;}
    #next{right: 20px;}*/
function rolPic(objwrap,picwrap,picli,btn,btnlist,btnlistclass,pbtn,nbtn,pathtime,intime,carouset,picwidth,){
    var container=document.getElementById(objwrap);
    var list=document.getElementById(picwrap);
    var listli=list.getElementsByTagName(picli);
    var oBtn=document.getElementById(btn).getElementsByTagName(btnlist);
    var prev=document.getElementById(pbtn);
    var next=document.getElementById(nbtn);
    var boun=listli.length-2;
    var boundry=boun*picwidth;
    var index=1;
    var timer=null;
    var tag=false;//防止点击过快造成卡顿

    //小圆点
    function  showbutton() {
        for (let i=0;i<oBtn.length;i++){
            oBtn[i].className='';
        }
        oBtn[index-1].className=btnlistclass;
    }
    //图片滑动
    function animation(offset){
        tag=true;
        var newLift=parseInt(list.style.left)+offset;
        var time=pathtime;   //位移总的时间
        var interval=intime;//位移间隔时间
        var speed=offset/(time/interval);//每次位移量
        function go(){
            if((speed<0&&parseInt(list.style.left)>newLift)||(speed>0&&parseInt(list.style.left)<newLift)){
                list.style.left=parseInt(list.style.left)+speed+'px';
                setTimeout(go,interval);
            }else{
                tag=false;
                list.style.left= newLift +'px';
                if (newLift>-picwidth){
                    list.style.left=-boundry+'px';
                }
                if (newLift<-boundry){
                    list.style.left=-picwidth+'px';
                }
            }
        }
        go();
    }
    //自动轮播
    function play(){
        timer=setInterval(function () {
            next.onclick();
        },carouset)
    };
    function stop(){
        clearInterval(timer);
    }
    container.onmouseover=stop;
    container.onmouseout=play;
    play();

    //点击右箭头、左箭头
    next.onclick=function () {
        if (index==boun){//使小圆点能够循环交替
            index=1;
        }else{
            index+=1;
        }
        showbutton();
        if (!tag){
            animation(-picwidth);
        }

    };
    prev.onclick=function () {
        if (index==1){//使小圆点能够循环交替
            index=boun;
        }else{
            index-=1;
        }
        showbutton();
        if (!tag){
            animation(picwidth);
        }
    };

    //小圆点切换图片
    // 思路：图片的偏移量=（当前的图片-初始图片）*单个图片的偏移量
    for (var i=0;i<oBtn.length;i++){
        oBtn[i].onclick=function () {
            if (this.className==btnlistclass){
                return;
            }
            var myIndex=parseInt(this.getAttribute('index'));
            var offset=-picwidth*(myIndex-index);
            if (!tag){
                animation(offset);
            }
            index=myIndex;//切换完成后 保留当前的图片index值 知道是第几张图片 做为下次切换的初始位置值
            showbutton();
        }
    }
}