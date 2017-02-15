require('UIColor');
defineClass('ViewController', {
    onClick: function() {

        testLabel.setText("点击发现补丁修改");
        testLabel.setBackgroundColor(UIColor.redColor());
    },
});