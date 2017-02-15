require('UIColor');
defineClass('ViewController', {
    onClick: function() {

        self.testLabel().setText("点击发现补丁修改");
        self.testLabel().setBackgroundColor(UIColor.clearColor());
    },
});