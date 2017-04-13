// JavaScript Document

//线条的移动以及二级下拉菜单的显示影藏;
/*原首页效果是只有中间三个有二级菜单，此处仿写就不用js实现，而是用css 的hover为诶实现更好;*/
var oHeader = document.getElementById('header');
var oNavLine = oHeader.getElementsByClassName('navline')[0];
var aNavItem = oHeader.getElementsByClassName('nav-item'); //length 5
//控制线条的移动;
for( var i = 0; i<aNavItem.length; i++ ){
	aNavItem[i].onmouseover  = function(){
			startMove( oNavLine, { 
				width: this.offsetWidth,
				left: this.offsetLeft 
			}, 7, 30 );
		}
		aNavItem[i].onmouseout  = function(){
			startMove( oNavLine, { 
				width: aNavItem[0].offsetWidth, 
				left: aNavItem[0].offsetLeft 
			}, 7, 30 )
		}
	}
	
//轮播效果;
var oMain = document.getElementById('main');
var carouselList = oMain.getElementsByClassName('carousel-list')[0];
var aCarouselLi = carouselList.getElementsByTagName('li');
var aDot = oMain.getElementsByClassName('dot')[0];
var dotBtns = aDot.getElementsByTagName('a');
var iNow = 0;
var tabTimer = null;
var last = aCarouselLi[0];//记录上一个
var lastBtns = dotBtns[0];
//var isRun = true;


//开启定时器;
tabTimer = setInterval( carousel,3000 );
//移入移除;
for( var i = 0; i<aCarouselLi.length; i++ ){
	dotBtns[i].index = i;
	aCarouselLi[i].onmouseover = function(){
		clearInterval( tabTimer )
	}
	aCarouselLi[i].onmouseout = function(){
		tabTimer = setInterval( carousel,3000 );
	}
	//点的移入
	dotBtns[i].onmouseover = function(){
		clearInterval(tabTimer)
		iNow = this.index;
		lastBtns.className = '';
		startMove( last, { opacity: 0 }, 7, 30 );
		dotBtns[iNow].className = 'active';
		aCarouselLi[iNow].style.display = 'block';
		aCarouselLi[iNow].style.zIndex = 1;
	
		startMove( aCarouselLi[iNow], { opacity: 100 }, 7, 30, function(){
		
			last = this;
			lastBtns = dotBtns[iNow];
		})
	
	}
	dotBtns[i].onmouseout = function(){
		tabTimer = setInterval( carousel, 3000 ) ;
	}
}
//切换函数的封装
function carousel(){
		iNow++;
		//循环判断
		if( iNow === 3 ){
			iNow = 0;
		}
		lastBtns.className = '';//上一个类名置空;
		startMove( last, { opacity: 0 }, 7, 30 );//上一个透明度变化
		//当前的变化
		dotBtns[iNow].className = 'active';
		aCarouselLi[iNow].style.display = 'block';
		aCarouselLi[iNow].style.zIndex = 1;
		startMove(aCarouselLi[iNow], { opacity: 100 }, 7, 30, function(){
			//运动结束修改上一个保存的对象;
			last = this;
			lastBtns = dotBtns[iNow];
		})
		
	}

/*运动函数*/
function startMove( obj, json,adjust,timeInterval,cb) {
    clearInterval(obj.iTimer);
    var iCur = 0;
    var iSpeed = 0;
	
    obj.iTimer = setInterval(function() {

        var iBtn = true;

        for ( var attr in json ) {

            var iTarget = json[attr];

            if (attr == 'opacity') {
                iCur = Math.round(getStyle( obj, 'opacity' ) * 100);
            } else {
                iCur = parseInt(getStyle( obj, attr));
            }

            iSpeed = ( iTarget - iCur ) / adjust;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != iTarget) {
                iBtn = false;
                if (attr == 'opacity') {
                    obj.style.opacity = (iCur + iSpeed) / 100;
                    obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
                } else {
                    obj.style[attr] = iCur + iSpeed + 'px';
                }
            }

        }

        if (iBtn) {
            clearInterval(obj.iTimer);
            cb && cb.call(obj);
        }

    },timeInterval);
}

function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}