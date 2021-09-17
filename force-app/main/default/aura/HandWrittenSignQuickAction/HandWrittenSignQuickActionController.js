({
	doInit : function(cmp, evt, helper) {
        helper.goto(cmp, 'page1');
	},
    afterLoaded : function(cmp, evt, helper) {
        // FastClick.attach(cmp.find('main').getElement());
	},
    goto2 : function(cmp, evt, helper){
        helper.createPdf(cmp, evt, helper);
        helper.goto(cmp, 'page2');
    },
    resetSign : function(cmp, evt, helper){
        helper.initCanvas(cmp, helper);
    }

})