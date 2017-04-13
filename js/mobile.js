// JavaScript Document
/*
*banner图的切换： 透明度 定位左右值;
*进入可视区的动画：判断
*/
bannerFn();
scrollFn();
function bannerFn(){
	//元素的获取;
	var oBanner = document.getElementById('banner');
	var oWechat = oBanner.getElementsByClassName('wechat')[0];
	var oWxCode = oBanner.getElementsByClassName('wx-code')[0];
	var aMoveImgs = oBanner.getElementsByClassName('move-img');
	var aMoveTexts = oBanner.getElementsByClassName('move-text');
	var oTabBtn = oBanner.getElementsByClassName('tab-btn')[0];
	var aTabBtns = oTabBtn.getElementsByTagName('span');
	var iNow = 0;
	var timer = null;
	
	//定义存放left值的组；数
	var originPicLeft = [ -100, -300,  -300, -100 ];
	var nowPicLeft = [ 10, -200,  -200, 80 ];
	var textRight = [120, 80, 120, 60]
	//页面加载运动第一个
	startMove( aMoveImgs[0],{
			left: nowPicLeft[0],
			opacity: 100
			}, 7, 30 )
	startMove( aMoveTexts[0],{
		right: textRight[0],
		opacity: 100
		}, 7, 30 )
	autoplay();
	//移入关闭定时器
	oBanner.onmouseover = function(){
		clearInterval(timer);
	}
	oBanner.onmouseout  = function(){
		autoplay();
	}
	
	//移入移除关注我们  二维码的显示与隐藏
	oWechat.onmouseover  = function(){
		oWxCode.style.display = 'block';
	}
	
	oWechat.onmouseout  = function(){
		oWxCode.style.display = 'none';
	}
	//每一个按钮的点击切换;
	for( var j = 0; j<aTabBtns.length; j++ ){
		aTabBtns[j].index = j;
		aTabBtns[j].onclick = function(){
			iNow = this.index;
			clearInterval(timer);
			stateChange();
		}
			
	}
	//自动播放
	function autoplay(){
		timer = setInterval( carousel, 3500 );
	}
	function carousel(){
		iNow++;
		if( iNow == 4 ){
			iNow = 0;
		};
		stateChange();	
	}
	//状态切换函数
	function stateChange(){
	//状态的还原
		for( var i = 0; i<aMoveImgs.length; i++ ){
			aTabBtns[i].className = '';
			aMoveImgs[i].style.left = originPicLeft[i] + 'px';
			aMoveTexts[i].style.right = '-100px'
			aMoveImgs[i].style.opacity = 0;
			aMoveTexts[i].style.opacity = 0;
			//console.log(i)
			}
		//当前选中的按钮	
		aTabBtns[iNow].className = 'active';
		//运动当前该运动的;
		startMove( aMoveImgs[iNow],{
			left: nowPicLeft[iNow],
			opacity: 100
			}, 7, 30 );
		startMove( aMoveTexts[iNow],{
			right: textRight[iNow],
			opacity: 100
			}, 7, 30 );
	}
}



//进入可视区的加载

function scrollFn(){
	var oMain = document.getElementById('main');
	var aSections = oMain.getElementsByClassName('section');
	var aSImages = oMain.getElementsByClassName('s-img');
	var aSTexts = oMain.getElementsByClassName('s-text');
	var oSHeight = aSections[0].offsetHeight; //保存一个section的高度
	window.onscroll = function(){
		
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var H = scrollTop + document.documentElement.clientHeight;
		/*
		if( H > getPos(aSections[0]).top + oSHeight  ){
			startMove( aSImages[0], { left: 0, opacity: 100}, 7, 30 );
			startMove( aSTexts[0], { right: 0, opacity: 100}, 7, 30 );
		
		};
		if( H > getPos(aSections[1]).top + oSHeight  ){
			startMove( aSImages[1], { right: 0, opacity: 100}, 7, 30 );
			startMove( aSTexts[1], { left: 0, opacity: 100}, 7, 30 );
		
		};*/
		//循环判断
		for( var i = 0; i < aSections.length; i++ ){
			
			if(i%2 == 0){
				if( H > getPos(aSections[i]).top + oSHeight  ){
					startMove( aSImages[i], { left: 0, opacity: 100}, 7, 30)
					startMove( aSTexts[i], { right: 0, opacity: 100}, 7, 30)
				};
			}else{
				if( H > getPos(aSections[i]).top + oSHeight  ){
					startMove( aSImages[i], { right: 0, opacity: 100}, 7, 30 );
					startMove( aSTexts[i], { left: 0, opacity: 100}, 7, 30 );
				
				};
			};
		
		}
	}
}

/*运动函数*/
function startMove( obj, json, adjust, timeInterval, cb) {
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

    },timeInterval );
}

function getStyle(obj, attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj,null)[attr];
    }
}

function getPos(obj){
    var pos = { left: 0, top: 0 };
    while(obj){
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
}