// const live2d_path = "./";
const live2d_path = "https://cdn.jsdelivr.net/gh/RedamancyAY/live2dCDN@v0.5/";

try {
    $('body').append('<div class="waifu"  style="position: fixed; right: 1px;"><div class="waifu-tips"> </div><canvas id="live2d" class="live2d"></canvas></div>')
	$.ajax({url: live2d_path + "pixi/pixi.min.js", dataType:"script", cache: true, success: function() {
        $.ajax({url: live2d_path + "framework/live2dcubismpixi.js", dataType:"script", cache: true, success: function() {
			$.ajax({url: live2d_path + "core/live2dcubismcore.min.js", dataType:"script", cache: true, success: function() {
				$.ajax({url: live2d_path + "framework/live2dcubismframework.js", dataType:"script", cache: true, success: function() {
					$.ajax({url:live2d_path +"waifu/waifu-tipsHome.js", dataType:"script", cache: true, success: function() {
						$.ajax({url:live2d_path +"loadModelHome.js", dataType:"script", cache: true, success: function() {
							new loadModel();
						}});
					}});
				}});
            }});
        }});	
    }});
} catch(err) { console.log("[Error] JQuery is not defined.") }


// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载js css
if (screen.width >= 500) {
	Promise.all([
		loadExternalResource(live2d_path +"js/polyfill.min.js", "js"),
		loadExternalResource(live2d_path +"js/jquery.min.js", "js"),
		//loadExternalResource(live2d_path + "waifu/waifu-tipsHome.js", "js"),
		loadExternalResource(live2d_path +"waifu/waifu.css", "css")
	])
}

console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`);
