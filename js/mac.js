/* 
*网站的交互效果实现：
*	1.运动部分： 利用css3 transition效果即可
*	2.进入可视区的加载;
*	3.逐个加载，延时定时器解决;
*/
var xcDemo = {};//挂在属性与方法
//清静安心从体检开始
	var oSection2 = document.getElementById('section2');
	var s2Images = oSection2.getElementsByTagName('img');
	//节约空间 一键解决
	var oSection3 = document.getElementById('section3');
	//管理自如 得心应手
	var oSection4 = document.getElementById('section4');
	//手机空间 轻松释放
	var oSection5 = document.getElementById('section5');
	//方寸信息 了如指掌
	var oSection6 = document.getElementById('section6');
	//包罗万象 以小见大
	var oSection7 = document.getElementById('section7');
	//以微知著
	var oSection8 = document.getElementById('section8');

xcDemo.init = function(){
	headerFn();
	section2();
	saveSpaceFn();
	window.onscroll = scrollFn;
}
xcDemo.init();
//第一个页面的交互
function headerFn(){
	var oHeader = document.getElementById('header');
	var oAnimateLeft = oHeader.getElementsByClassName('animation-l')[0];
	var oAnimateRight = oHeader.getElementsByClassName('animation-r')[0];
	var aTabsLi = oAnimateLeft.getElementsByTagName('li'); //获取li
	var oIconTab = oHeader.getElementsByClassName('icon-tab')[0];
	var aIconTab = oIconTab.children[0];
	
	var aRightImgs = oAnimateRight.getElementsByClassName('image');
	var aRightFonts = oAnimateRight.getElementsByClassName('font');
	
	var aMovingImgs = oAnimateRight.children;
	
	
	var headTimer = null; //头部自动切换的定时器;
	var iNow = 0; //记录当前的活跃状态索引;
	var num = 0;
	var onoff = true;
	
	headTimer = setInterval( tabsChange, 2000 )
	
	//左侧活跃状态的切换
	function tabsChange(){
		
		iNow++;
		//aIconTab.style.top = iNow * 56 + 'px';
		
		//循环num，判断处理;
		if( iNow === aTabsLi.length ){
			iNow = 0;
		}
		for( var i = 0; i < aTabsLi.length; i++ ){
			aTabsLi[i].className = '';
			aRightImgs[i].style.right = '-150px';
			aRightImgs[i].style.opacity = 0;
			aRightFonts[i].style.top = '80px';
			aRightFonts[i].style.opacity = 0;
		}
		aTabsLi[iNow].className = 'active';
		aRightImgs[iNow].style.right = '-90px';
		aRightImgs[iNow].style.opacity = 1;
		aRightFonts[iNow].style.top = '150px';
		aRightFonts[iNow].style.opacity = 1;
		//delayFn(iNow);
		aIconTab.style.top = iNow * aIconTab.offsetHeight + 'px'; //tab div的移动;
		
		
	}
	/*function delayFn(index,cb){
		aRightFonts[index].style.top = '80px';
		aRightFonts[index].style.opacity = 0;
		cb&&cb
	}
	*/
	for( var i = 0; i<aTabsLi.length;i++){
		aTabsLi[i].index = i;
		aTabsLi[i].onmouseover = function(){
			iNow = this.index
			clearInterval( headTimer );
			for( var i = 0; i < aTabsLi.length; i++ ){
			aTabsLi[i].className = '';
			aRightImgs[i].style.right = '-150px';
			//aRightImgs[i].style.display = 'none';
			aRightImgs[i].style.opacity = 0;
			aRightFonts[i].style.top = '80px';
			aRightFonts[i].style.opacity = 0;
		}
		aTabsLi[iNow].className = 'active';
		aRightImgs[iNow].style.right = '-90px';
		//aRightImgs[iNow].style.display = 'inline';
		aRightImgs[iNow].style.opacity = 1;
		aRightFonts[iNow].style.top = '150px';
		aRightFonts[iNow].style.opacity = 1;
		aIconTab.style.top = iNow * aIconTab.offsetHeight + 'px'; //tab div的移动;
		}
		aTabsLi[i].onmouseout = function(){
			clearInterval( headTimer );
			headTimer = setInterval( tabsChange, 2000 );
		}
	
	}
}


//section2
//四个图片的移入移出的宽度变化效果
function section2(){
	
	
	for(var i = 1; i < s2Images.length; i++){
		s2Images[i].onmouseover = function(){
			this.style.width = '210px';
		};
		s2Images[i].onmouseout = function(){
			this.style.width = '200px';
		};
	}
}

//section2()

//各个区域进入可视区的动画执行
function scrollFn(){
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var H = scrollTop + document.documentElement.clientHeight;
	var h3 = oSection3.offsetHeight/2;
	var h4 = oSection4.offsetHeight/2;
	var h5 = oSection5.offsetHeight/2;
	var h6 = oSection6.offsetHeight/2;
	var h7 = oSection7.offsetHeight/2;
	var h8 = oSection8.offsetHeight/2;
	//section2 的逐个显示;
	
	//四个部分的逐个显示
	if( scrollTop > getPos(oSection2).top ){
		S2Fn(1, 0);
		S2Fn(2, 200);
		S2Fn(3, 400);
		S2Fn(4, 600);
	};
	
	if( H > getPos(oSection3).top + h3 ){
		move( oSection3, 'section3-l','left', 0, '1.2s','0' )
		move( oSection3, 'move-title','top', 0, '.7s','0' );
		move( oSection3, 'text', 'top', 0, '.7s','0' );
		move( oSection3, 'img-tabs', 'top', 0, '.7s','0' );
		
	
	}
	if( H  > getPos(oSection4).top + h4 ){
		move( oSection4, 'move-image','left', 0, '1.2s','0' )
		move( oSection4, 'move-title','top', 0, '.7s','0' );
		move( oSection4, 'move-ul', 'top', 0, '.7s','0');
		
	
	}
	if( H  > getPos(oSection5).top + h5 ){
		move( oSection5, 'move-image','left', 0, '1.2s','0' )
		move( oSection5, 'move-title','top', 0, '.7s' ,'0');
		move( oSection5, 'text', 'top', 0, '.7s','0' );
		
	
	}
	if( H > getPos(oSection6).top + h6 ){
		move( oSection6, 'move-image','left', 0, '1.2s','0' )
		move( oSection6, 'move-title','top', 0, '.7s','0' );
		move( oSection6, 'text', 'top', 0, '.7s','0' );
	}
	if( H > getPos(oSection7).top + h7 ){
		//图片的先后运动利用transition的延迟参数;
		move( oSection7, 'move-title','top', 0, '.7s','0' );
		move( oSection7, 'text', 'top', 0, '.7s','0' );
		move( oSection7, 'move-image','left', 0, '1.2s ease-in-out','0' )
		move( oSection7, 'move-image','left', 1, '1s 0.2s ease-in-out','100px' )
		move( oSection7, 'move-image','right', 2, '0.8s 0.4s ease-in-out','50px' )
	}
	
	if( H > getPos(oSection8).top + h8  ){
	

		move( oSection8, 'move-title', 'top', 0, '.7s','0' );
		move( oSection8, 'text', 'bottom', 0, '.7s','0' );
		
		move( oSection8, 'move-image','left', 0, '1.2s 0.5s ease-in-out','0' )
		move( oSection8, 'move-image','top', 0, '1.2s 0.5s ease-in-out','100px' )
		move( oSection8, 'move-image','top', 1, '1.2s 1.2s ease-in-out','100px' )
		move( oSection8, 'move-image','top', 2, '0.8s ease-in-out','70px' )
	}
	
}

//进入可是区的延迟加载函数封装;
function S2Fn(index, delay){
	setTimeout(function(){
		s2Images[index].style.transform = 'scale(1,1)';
	}, delay)
}
//运动效果实现函数 利用css3 transition属性
function move(oParent, className, attr, i, time, target) {
	var obj = oParent.getElementsByClassName(className)[i];
	obj.style[attr] = target;
	obj.style.opacity = 1;
	obj.style.transition = time;
}

//获取封装绝对位置的函数
function getPos(obj){
    var pos = { left: 0, top: 0 };
    while(obj){
        pos.left += obj.offsetLeft;
        pos.top += obj.offsetTop;
        obj = obj.offsetParent;
    }
    return pos;
}

//节约空间  一件解决区域的自动切换效果;
function saveSpaceFn(){
	var oS3Left = oSection3.getElementsByClassName('section3-l')[0];
	var aS3Lists = oS3Left.getElementsByTagName('li');
	var aS3ListIcons = oS3Left.getElementsByTagName('span');
	var aImgBtns = oSection3.getElementsByClassName('img-btn');
	var num = 0
	var s3Timer = null;
	//console.log(aImgBtns.length)
	clearInterval( s3Timer );
	s3Timer = setInterval( autoplay, 2000 );
	
	console.log(aS3ListIcons.length)  //8
	
	function autoplay(){
		num++;
		if ( num === aImgBtns.length ) {
			num = 0;
		}
		//先还原初始状态
		for( var i = 0; i<aImgBtns.length;i++){
			aImgBtns[i].style.borderColor = '#e2e7eb';
			aS3Lists[i].style.opacity = 0;
			aS3ListIcons[i].style.backgroundPositionY = '0';
		};
		//当前的选中i状态
		aImgBtns[num].style.borderColor = '#51b164';
		aS3Lists[num].style.opacity = 1;
		aS3ListIcons[num].style.backgroundPositionY = '-13px';
	}
	
	for( var i = 0; i<aImgBtns.length;i++){
		aImgBtns[i].index = i;
		aImgBtns[i].onmouseover = function(){
			
			clearInterval( s3Timer );	//关闭定时器
			num = this.index;
			for( var i = 0; i<aImgBtns.length;i++){
				aImgBtns[i].style.borderColor = '#e2e7eb';
				aS3Lists[i].style.opacity = 0;
				aS3ListIcons[i].style.backgroundPositionY = '0';
			};
			aImgBtns[num].style.borderColor = '#51b164';
			aS3Lists[num].style.opacity = 1;
			aS3ListIcons[num].style.backgroundPositionY = '-13px';
		
		}
		aImgBtns[i].onmouseout = function(){		
			clearInterval( s3Timer );
			s3Timer = setInterval( autoplay, 2000 );	
		}
	};
}


