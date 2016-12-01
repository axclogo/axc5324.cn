function play68_init() {
	updateShare(0)
}

function play68_submitScore(a) {
	updateShareScore(a);
	Play68.shareFriend()
}

function updateShare(b) {
	var a = "六角碎片";
	if(b > 0) {
		shareTitle = "我玩了" + b + "分，玩不到4000分以后请别在我面前那么嚣张！"
	} else {
		shareTitle = "玩不到4000分以后请别在我面前那么嚣张！"
	}
	appid = "";
	Play68.setShareInfo(shareTitle, a);
	document.title = shareTitle
}

function updateShareScore(a) {
	updateShare(a)
};