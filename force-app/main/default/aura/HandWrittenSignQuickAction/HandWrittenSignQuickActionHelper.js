({

    initCanvas : function(cmp, helper){
        var can = cmp.find('sign-canvas').getElement();
        console.log(can);
        var ct = can.getContext('2d');
        
        var canvasContainer = cmp.find('sign-canvas-container').getElement();
        console.log('W:' + canvasContainer.clientWidth);
        cmp.find('sign-canvas').getElement().setAttribute('width', (canvasContainer.clientWidth - 2));
        var can;
        var ct;
        var ox=0,oy=0,x=0,y=0;
        var mf=false;
        can.addEventListener("touchstart",onDown,false);
        can.addEventListener("touchmove",onMove,false);
        can.addEventListener("touchend",onUp,false);
        can.addEventListener("mousedown",onMouseDown,false);
        can.addEventListener("mousemove",onMouseMove,false);
        can.addEventListener("mouseup",onMouseUp,false);
        ct.strokeStyle="#000000";
        ct.lineWidth=5;
        ct.lineJoin="round";
        ct.lineCap="round";
        clearCan();
        function onDown(event){
            mf=true;
            ox=event.touches[0].pageX-event.target.getBoundingClientRect().left;
            oy=event.touches[0].pageY-event.target.getBoundingClientRect().top;
            event.stopPropagation();
        }
        function onMove(event){
            if(mf){
                x=event.touches[0].pageX-event.target.getBoundingClientRect().left;
                y=event.touches[0].pageY-event.target.getBoundingClientRect().top;
                drawLine();
                ox=x;
                oy=y;
                event.preventDefault();
                event.stopPropagation();
            }
        }
        function onUp(event){
            mf=false;
            event.stopPropagation();
            
        }
        
        function onMouseDown(event){
            ox=event.clientX-event.target.getBoundingClientRect().left;
            oy=event.clientY-event.target.getBoundingClientRect().top ;
            mf=true;
        }
        function onMouseMove(event){
            if(mf){
                x=event.clientX-event.target.getBoundingClientRect().left;
                y=event.clientY-event.target.getBoundingClientRect().top ;
                drawLine();
                ox=x;
                oy=y;
            }
        }
        function onMouseUp(event){
            mf=false;
            
        }
        function drawLine(){
            ct.beginPath();
            ct.moveTo(ox,oy);
            ct.lineTo(x,y);
            ct.stroke();
        }
        function clearCan(){
            ct.fillStyle="rgb(255,255,255)";
            ct.fillRect(0,0,can.getBoundingClientRect().width,can.getBoundingClientRect().height);
        }
        
    },
    goto : function(cmp, target){
        var page = {page1: false, page2: false};
        page[target] = true;
        cmp.set('v.page', page);
    },
    createPdf : function(cmp, evt, helper){
        var can = cmp.find('sign-canvas').getElement();
        var imgB64 = can.toDataURL().split(',')[1];
        var action = cmp.get("c.aSaveSign");
        action.setParams({
            b64: imgB64,
            rid: cmp.get('v.recordId')
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (cmp.isValid() && state === "SUCCESS") {
                var ret = response.getReturnValue();
                if (ret != 'error'){
					$A.get('e.force:refreshView').fire();
                    $A.get("e.force:closeQuickAction").fire();
                }
            }
        });
        $A.enqueueAction(action);
        
        
    }
})