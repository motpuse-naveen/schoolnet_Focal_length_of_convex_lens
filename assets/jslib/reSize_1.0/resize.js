var game_resize_function = function (container) {
var mainDiv = $(container);
var mainDivWidth = mainDiv.outerWidth();
var mainDivHeight = mainDiv.outerHeight();

	resizeGame = function () {

		var newMainDivHeight, newMainDivWidth, mainDivScaleX = 1,
			mainDivScaleY = 1,
			mainDivProportion = true;
			
			if(mainDivWidth<window.innerWidth && mainDivHeight<window.innerHeight){
				var windowWidth = window.innerWidth;
				var windowHeight = window.innerHeight;

				mainDivScaleX = 1;
				mainDivScaleY = 1;

				if ( mainDivProportion ) {
					mainDivScaleX = 1;
					mainDivScaleY = 1;
				}
				zoom = mainDivScaleY;
				var translationX = Math.round( ( windowWidth - ( mainDivWidth * mainDivScaleX ) ) / 2 );
				var translationY = Math.round( ( windowHeight - ( mainDivHeight * mainDivScaleY ) ) / 2 );

				mainDiv.css( {
					"position": "absolute",
					"left": translationX + "px",
					"top": translationY + "px",
					"-webkit-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
					"-webkit-transform-origin": "0 0",
					"-moz-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
					"-moz-transform-origin": "0 0",
					"-khtml-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
					"-khtml-transform-origin": "0 0",
					"-ms-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
					"-ms-transform-origin": "0 0",
					"-o-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
					"-o-transform-origin": "0 0",
					"transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
					"transform-origin": "0 0"
				} );
			}else{
				var windowWidth = window.innerWidth;
		var windowHeight = window.innerHeight;

		mainDivScaleX = windowWidth / mainDivWidth;
		mainDivScaleY = windowHeight / mainDivHeight;

		if ( mainDivProportion ) {
			mainDivScaleX = Math.min( mainDivScaleX, mainDivScaleY );
			mainDivScaleY = mainDivScaleX;
		}
		zoom = mainDivScaleY;
		var translationX = Math.round( ( windowWidth - ( mainDivWidth * mainDivScaleX ) ) / 2 );
		var translationY = Math.round( ( windowHeight - ( mainDivHeight * mainDivScaleY ) ) / 2 );

		mainDiv.css( {
			"position": "absolute",
			"left": translationX + "px",
			"top": translationY + "px",
			"-webkit-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
			"-webkit-transform-origin": "0 0",
			"-moz-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
			"-moz-transform-origin": "0 0",
			"-khtml-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
			"-khtml-transform-origin": "0 0",
			"-ms-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
			"-ms-transform-origin": "0 0",
			"-o-transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
			"-o-transform-origin": "0 0",
			"transform": "scale(" + mainDivScaleX + ", " + mainDivScaleY + ")",
			"transform-origin": "0 0"
		} );
			}

		

	};
	window.addEventListener( "resize", resizeGame );
	resizeGame();
};
