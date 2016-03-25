var dmH = document.documentElement.clientHeight || document.body.clientHeight;
window.onload=function(){
	
	$('.listBox').css('height',dmH);
	setConHeight();
	channelControl()
}
function setConHeight(){
	$('#main .content').each(function(){
		var aImg = $(this).find('img');
		var count = 0;
		aImg.each(function(){
			count += $(this)[0].offsetHeight;
		})
		$(this).css('height',count);
	})
	listControl();
	pinControl();
	document.getElementById('loading').style.display = 'none';
	document.getElementById('bodyKeep').style.display = 'none';
}




/***
 *
 * 对每一个内容块的控制
 *  
 */
function pinControl(){
	
	$('#main .pin').hover(function(){
		
		$(this).find('.keepbj').css('display','block').stop().animate({
			opacity:0.6
		},600)
		$(this).find('.introduce').stop().animate({
			opacity:1
		},600)
	},function(){
		$(this).find('.keepbj').css({
			display:'none',
			opacity:0
		});
		$(this).find('.introduce').stop().animate({
			opacity:0
		},600)
	})
}



/***
 *	对每列的控制
 *  包括拖拽，以及鼠标滚轮
 */
function listControl(){
	var oItem,
		oCon,
		iConLimitH,
		iItemLimitH,
		aListBox = $('#main .listBox');
	// 给每列添加鼠标移入事件	
	aListBox.mouseover(function(){
		oItem = $(this).find('.item')[0];
		oCon = $(this).find('.content')[0];
		iConLimitH = dmH-oCon.offsetHeight-60;
		iItemLimitH = dmH-oItem.offsetHeight-60;
		//给类目导航，添加拖拽
		drag(oItem,{},function(site){
			move(site.top);
		})
	})
	//给每列添加鼠标滚轮事件
	aListBox.each(function(){
		onWheel(this,function(bCur){
			var iTop = 0;
			if(bCur){
				iTop = oItem.offsetTop +10;	
			}else{
				iTop = oItem.offsetTop -10;
			}
			move(iTop);
		});
	})
	//共用移动
	function move(top){
		if(top <=0){
			top=0;
		}
		if(top >=iItemLimitH){
			top=iItemLimitH;
		}
		var scale = top/iItemLimitH;
		oCon.style.top = Math.floor(scale*iConLimitH) + 'px'
		oItem.style.top = top + 'px';
	}
	
}

function channelControl(){
	
	$('#webLink a').each(function(i){
		$(this).click(function(){
			move(i)
		})
	})
	
	function move(index){
		if(index == 0){
			$('#box').animate({
				height:0
			},600)
		}else{
			$('#box .hide').css('display','none');
			var oChannel = $('#box .hide').eq(index-1);
			var oFooter = $('#box .footer');
			oChannel.css('display','block');
			var iHeight = oChannel[0].offsetHeight+43
			oChannel.css('opacity',0);
			oFooter.css('opacity',0);
			$('#box').animate({
				height:iHeight
			},600,'',function(){
				oChannel.animate({
					opacity:1
				},1000,'',function(){
					clearInterval(t);
					if(index == 1){
						woZaiHouDun()
					}
				})
				oFooter.animate({
					opacity:1
				},1000)
			})
		}
		

		
		
	}
	
}

var t=null;

function woZaiHouDun(){
	var oUl = document.getElementById('woZaiHouDun').getElementsByTagName('ul')[0];
	oUl.innerHTML += oUl.innerHTML;
	var aLi = oUl.getElementsByTagName('li');
	var oBtnLeft = document.getElementById('btnLeft');
	var oBtnRight = document.getElementById('btnRight');
	oUl.style.width = aLi[0].offsetWidth*aLi.length + 'px';
	var iTarget = 0;
	var iSpeed = 3;
	oBtnLeft.onclick=function(){
		iSpeed = 3;
	}
	oBtnRight.onclick=function(){
		iSpeed = -3;
	}
	t=setInterval(function(){
		iTarget = oUl.offsetLeft - iSpeed;
		if(iTarget<-oUl.offsetWidth/2){
			oUl.style.left = 0 + 'px';
			iTarget = oUl.offsetLeft - iSpeed;
		}
		if(iTarget>0){
			oUl.style.left = -oUl.offsetWidth/2 + 'px';
			iTarget = oUl.offsetLeft - iSpeed;
		}
		oUl.style.left = iTarget + 'px';
	},30)
	
	
	
}

