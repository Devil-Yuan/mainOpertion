

//选项卡

//oTab获取对象的id名
// window.onload=function () {
//     var obj= new TabSwitch('tab');
// };

//标准结构
    /*<div id="tab">
        <div class="btn">
        <input type="button" class="active" value="按钮1">
        <input type="button"  value="按钮2">
        <input type="button"  value="按钮3">
        </div>
        <div class="con">
        <div class="active">内容1</div>
        <div>内容2</div>
        <div>内容3</div>
        </div>
        </div>*/
//样式
    /*#tab .btn .active{
        background-color:yellow;
    }
    #tab .con{
        width: 200px;
        height: 200px;
        background-color: pink;
    }
    #tab .con>div{display: none;}
    #tab .con .active{display:block;}*/



function TabSwitch(oTab) {
    var oTab = document.getElementById(oTab);
    this.oBtn = oTab.firstElementChild.children;
    this.oCon = oTab.lastElementChild.children;
    for (var i = 0; i < this.oBtn.length; i++) {
        this.oBtn[i].index = i;
        var _this=this;
        this.oBtn[i].onclick =function () {
            _this.tab(this);
        };
    }
};
TabSwitch.prototype.tab=function (oBtnl) {
    for (var j=0;j<this.oBtn.length;j++){
        this.oBtn[j].className=this.oCon[j].className='';
    }
    oBtnl.className=this.oCon[oBtnl.index].className='active'
};