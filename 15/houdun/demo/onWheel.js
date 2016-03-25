function onWheel(obj,fn){
			function wheel(ev){
				var oEvent = ev || event;
				var bCur = oEvent.detail?oEvent.detail>0:oEvent.wheelDelta <0;
				fn.call(obj,bCur);
				if(oEvent.preventDefault){
					oEvent.preventDefault();
				}
				return false;
			}
			addEvent(obj,'DOMMouseScroll',wheel)
			addEvent(obj,'mousewheel',wheel)
}
function addEvent(obj,sEv,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+sEv,fn);
	}else{
		obj.addEventListener(sEv,fn,false)
	}
}		