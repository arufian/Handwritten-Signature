({
    afterRender: function (cmp, helper) {
        this.superAfterRender();
        window.setTimeout(
            $A.getCallback(function(){
                helper.initCanvas(cmp, helper);
            }), 500
        );
    },
})