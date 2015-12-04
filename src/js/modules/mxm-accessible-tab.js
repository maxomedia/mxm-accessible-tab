$(document).ready(function (){
	//return;


	var attribShowName = "aria-controls";
	var attribSelected = "aria-selected";
	var attribGroupName = "mxm-group"

	var tabButtons = $("["+attribGroupName+"]");
	
	var lastWindowWidth = -1;
	

	var LEFT_ARROW = 37;
	var UP_ARROW = 38;
	var RIGHT_ARROW = 39;
	var DOWN_ARROW = 40;
	var ENTER_KEY = 13;
	var SPACE_KEY = 32;

	var keyList = [LEFT_ARROW,UP_ARROW,RIGHT_ARROW,DOWN_ARROW,ENTER_KEY,SPACE_KEY];

	var groups = $("["+attribGroupName+"]");
	var groupNameList = [];

	tabButtons.each(function(index,elem){		
		var cRef = $(this);
		var isSelected = false;


		var gName = cRef.attr(attribGroupName);
		if(groupNameList.indexOf(gName) == -1){
			groupNameList.push(gName);
		}	
		

		if(cRef.attr(attribSelected) == "true"){
			isSelected = true;
		}
		hideTab(cRef);		
		if(isSelected){
			//cRef.trigger("click");
			showTab(cRef);
		}
	});




	tabButtons.on("click keydown",tabButtonClick)
	$(window).resize(resizeTabs);
	resizeTabs();

	

	function resizeTabs(){
		var winWidth = $(window).width()
		if(lastWindowWidth == winWidth){
			return;
		}
		lastWindowWidth = winWidth;
		
		tabButtons.css("height","");
		tabButtons.css("width","");

		for(var i = 0 ; i < groupNameList.length;i++){
			resizeGroup(groupNameList[i]);
		}

	}
	function resizeGroup (groupName) {
		var gTabs = $("[mxm-group='"+groupName+"']");
		
		var gParent = gTabs.parent();
		if(!gParent.hasClass("tab-horizontal")){
			return;
		}
		var parentWidth = gParent.width();
		var tWidth = gTabs.eq(0).outerWidth(false);
		var sIndex =0;
		var eIndex = 0;

		for(var i = 1 ; i < gTabs.length; i++){
			var cWidth = gTabs.eq(i).outerWidth(false);			
			if(tWidth+cWidth > parentWidth){				
				eIndex = i -1;
				spread(sIndex,eIndex,tWidth,parentWidth,gTabs);
				sIndex = i;
				tWidth = 0; 
			}
			tWidth += cWidth;
		}
		
		if(sIndex < gTabs.length){
			spread(sIndex,gTabs.length-1,tWidth,parentWidth,gTabs);
		}
		
		return;
		var maxHeight = 0 ;
		gTabs.each(function (){
			var tab = $(this);
			maxHeight = Math.max(tab.height(),maxHeight);
		});
		gTabs.css("height",maxHeight);
		

	}
	function spread(sIndex,eIndex,addedWidths,parentWidth,gTabs){
		//console.log("spread",sIndex,eIndex,addedWidths,parentWidth,gTabs.length)
		var remainW = parentWidth - (addedWidths);
		//console.log(remainW);
		var itemCount = (eIndex-sIndex+1);
		var addW = Math.floor( remainW / (itemCount));
		var remainder =  remainW - (addW*itemCount);
		
		//remainder = Math.floor(remainder);
		

		for(var i = sIndex; i <= eIndex ;i++){
			var ctab = gTabs.eq(i);
			var tabWidth = ctab.outerWidth(false);
			var newWidth = tabWidth + addW;
			if(i==eIndex){
				newWidth+=remainder;
				ctab.css("margin-right","-3px");
			}
			ctab.css("width",newWidth);
		}
	}
	


	function hideTab(elem){
		elem.attr("aria-selected","false");
		elem.attr("tabindex",0);
		var targetID = elem.attr(attribShowName);
		var tabContent = $("#" + targetID);
		tabContent.hide();
		tabContent.attr("aria-hidden","true");
		//tabContent.attr("role","tabpanel");
		
	}

	function showTab(elem){
		var targetID = elem.attr(attribShowName);
		elem.attr(attribSelected,"true");
		var tabContent = $("#" +  targetID);
		tabContent.show();
		tabContent.attr("aria-hidden","false");
		return tabContent;
	}


	

	function tabButtonClick(event){

		var target = this;

		if(event.type == "keydown"){
			

			var cKey = event.which;
			//console.log(cKey);

			if(keyList.indexOf(cKey) == -1){
				return;
			}

			if(cKey == LEFT_ARROW || cKey == UP_ARROW){
				var prevSibling = $(this).prev();
				if(prevSibling.length == 0){
					var siblingsList = $(this).siblings();
					prevSibling = $(siblingsList[siblingsList.length-1]);
				}
				//prevSibling.trigger("click");
				event.preventDefault();
				prevSibling.focus();
				return;
			}
			if(cKey == RIGHT_ARROW || cKey == DOWN_ARROW){
				var nextSibling = $(this).next();
				if(nextSibling.length == 0){					
					var siblingsList = $(this).siblings();
					nextSibling = $(siblingsList[0]);
				}
				//nextSibling.trigger("click");
				event.preventDefault();
				nextSibling.focus();
				return;
			
			}			
			
		}
		event.preventDefault()

		var me = $(target);		
		var tabGroupName = me.attr(attribGroupName);
		$("["+attribGroupName+"='"+tabGroupName+"']").each(function(index, elem){
			hideTab($(this));
		});
		var tabContent = showTab(me);



		var wind = $(window);

		var windowHeight = wind.height();
		var scrollValue = wind.scrollTop();
		var topValue = tabContent.offset().top;
		if(topValue + (topValue / 3) > windowHeight+scrollValue){
			//wind.scrollTop(topValue-windowHeight/3);
			$("body").animate({ scrollTop:topValue-windowHeight/3});

		}


	}




});