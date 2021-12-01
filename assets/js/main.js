var noOfSlides;
var slides = document.getElementsByClassName("Slides");
var dots = document.getElementsByClassName("dots");
var videos = document.getElementsByClassName("videoslides");
var slideIndex = 1;
var muted = false;
var currentslide;
var slideaudio = new Audio('');
var dist;
var dist1;
var u;

var moveSpeed = 1;

var showSlides = function () {
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  currentslide = slides[slideIndex - 1];

  slides[slideIndex - 1].style.display = "block";

}

$(document).on('click', '.calculatorDiv', function () {
  $(".calculationsDiv,.CalcDragHeader").css("display", "block");
  calc();
});

$(document).on('click', '.calculationClose', function () {
  $(".calculationsDiv,.CalcDragHeader").css("display", "none");
});


$(document).on('click', '#closeBtn', function () {
  window.close();
});

$('#workSheetDiv').on('click', function () {
  $('#file-input').trigger('click');
});

function OpenWord() {
  var mylink = document.getElementById("MyLink");
  mylink.setAttribute("href", "assets/docs/convexlens_word.doc");
  mylink.click();
}

var movieArray = [$(".movingpaper"), $(".movingLens"), $(".projector")];
var tempfocalLnArray = [60, 70, 80, 90, 100, 110, 120, 130];
var focalLth;
var objectPosX = new Array();
var objectPosY = new Array();

$(document).ready(function () {
  initialize();
});

let initialize = function () {
  element = document.getElementById('bk6ch15ss2');
  var scaleVal = element.getBoundingClientRect().width / element.offsetWidth;
  fnscale(1);
  showSlides(slideIndex);
  obj1X = randRange(-550, -350);
  obj2X = randRange(-270, -100);
  scrX = movieArray[0]._x - obj1X;
  scrY = getPosY(5.85, obj1X);
  scrPos = getResolvedXandY(5.85, obj1X);
  if ($(movieArray[0]).hasClass('movingpaper')) {
    if (scrPos[1] + $(".projector").position().top < 191) {
      scrPos = getResolvedXandY(6.05, obj1X);
      movieArray[0].css("top", scrPos[1] + $(".projector").position().top);
    } else {
      movieArray[0].css("top", scrPos[1] + $(".projector").position().top);
    }
  }

  movieArray[0].css("left", scrPos[0] + $(".projector").position().left);

  ///////////
  scrX = movieArray[0].position().left - obj2X;
  scrY = getPosY(5.85, obj2X);
  optPos = getResolvedXandY(5.85, obj2X);
  movieArray[1].css("left", optPos[0] + $(".projector").position().left);
  movieArray[1].css("top", optPos[1] + $(".projector").position().top);
  ///////////
  for (var i = 0; i < movieArray.length; i++) {
    objectPosX[i] = movieArray[i].position().left;
    objectPosY[i] = movieArray[i].position().top;
    movieArray[i].css("left", objectPosX[i]);
    movieArray[i].css("top", objectPosY[i]);
  }
  distCalc();
  getFocalLn();
  scaleFlame();
  fnscale(scaleVal);
}

let distWh;
let distCalc = function () {
  x1 = $('.movingpaper').css('left').split("px")[0];
  x2 = $('.movingLens').css('left').split("px")[0];
  x3 = $('.projector').css('left').split("px")[0];
  y1 = $('.movingpaper').css('top').split("px")[0];
  y2 = $('.movingLens').css('top').split("px")[0];
  y3 = $('.projector').css('top').split("px")[0];
  dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  dist1 = Math.sqrt(Math.pow((x2 - x3), 2) + Math.pow((y2 - y3), 2));
  dist = dist + 3;
  distWh = dist;
  dist = Math.round(dist);
  dist1 = Math.round(dist1);
  $('.screenDistanceText').text(dist);
  $('.objectDistanceText').text(dist1);
  // scaleFlame();
  return [dist, dist1];
}

function moveFWD(num) {
  element = document.getElementById('bk6ch15ss2');
  var scaleVal = element.getBoundingClientRect().width / element.offsetWidth;
  fnscale(1);
  scrX = movieArray[num].position().left - objectPosX[num];
  scrY = getPosY(5.85, scrX);
  scrPos = getResolvedXandY(5.85, scrX);
  if (num == 0) {
    movieArray[num].css("top", Number(objectPosY[num]) + ((scrY + scrPos[1]) / 1.6));
  } else {
    movieArray[num].css("top", Number(objectPosY[num]) + scrY);
  }

  myInclinedX = getInclinedX(10, Number(movieArray[num].position().left));
  if (distCalc()[1] <= 102 && num == 1 || (distCalc()[0] <= 108 && num == 0)) {
    movieArray[num].css("left", movieArray[num].css("left"));
  } else {
    movieArray[num].css("left", movieArray[num].position().left + moveSpeed);
  }
  distCalc();
  scaleFlame(num);
  fnscale(scaleVal);
}

function moveBACK(num) {
  element = document.getElementById('bk6ch15ss2');
  var scaleVal = element.getBoundingClientRect().width / element.offsetWidth;
  fnscale(1);
  scrX = movieArray[num].position().left - objectPosX[num];
  scrY = getPosY(5.85, scrX);
  scrPos = getResolvedXandY(5.85, scrX);
  if (num == 0) {
    movieArray[num].css("top", Number(objectPosY[num]) + ((scrY + scrPos[1]) / 1.6));
  } else {
    movieArray[num].css("top", Number(objectPosY[num]) + scrY);
  }
  myInclinedX = getInclinedX(5.85, Number(movieArray[num].position().left));
  if (distCalc()[0] <= 108 && num == 1) {
    movieArray[num].css("left", movieArray[num].css("left"));
  } else {
    movieArray[num].css("left", movieArray[num].position().left - moveSpeed);
  }
  if (num == 0 && movieArray[num].css("left").split('px')[0] < 51) {
    movieArray[num].css("left", "51.45px");
  }
  distCalc();
  scaleFlame(num);
  fnscale(scaleVal);
}

function fnscale(val) {
  $('#bk6ch15ss2').css({
    '-webkit-transform': 'scale(' + val + ')',
    '-moz-transform': 'scale(' + val + ')',
    '-ms-transform': 'scale(' + val + ')',
    '-o-transform': 'scale(' + val + ')',
    'transform': 'scale(' + val + ')'
  });
}

var intervalId;
var timeoutId;
$('.paperLeftArrow').on('touchstart mousedown', function () {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  moveBACK(0);
  timeoutId = setTimeout(function () {
    intervalId = setInterval(function () { moveBACK(0) }, 100);
  }, 500);

}).on('touchend mouseup', function () {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
});

$('.paperRightArrow').on('touchstart mousedown', function () {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  // intervalId = setInterval(function () { moveFWD(0) }, 100);
  moveFWD(0)
  timeoutId = setTimeout(function () {
    intervalId = setInterval(function () { moveFWD(0) }, 100);
  }, 500);

}).on('touchend mouseup', function () {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
});

$('.lensLeftArrow').on('touchstart mousedown', function () {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  // intervalId = setInterval(function () { moveBACK(1) }, 100);
  moveBACK(1);
  timeoutId = setTimeout(function () {
    intervalId = setInterval(function () { moveBACK(1) }, 100);
  }, 500);
}).on('touchend mouseup', function () {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
});

$('.lensRightArrow').on('touchstart mousedown', function () {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  // intervalId = setInterval(function () { moveFWD(1) }, 100);
  moveFWD(1)
  timeoutId = setTimeout(function () {
    intervalId = setInterval(function () { moveFWD(1) }, 100);
  }, 500);

}).on('touchend mouseup', function () {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
});

$(document).on('touchend mouseup', function () {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
})



$('.paperLeftArrow').on('click', function () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    moveBACK(0);
  }
});

$('.paperRightArrow').on('click', function () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    moveFWD(0);
  }
});

$('.lensLeftArrow').on('click', function () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    moveBACK(1);
  }
});

$('.lensRightArrow').on('click', function () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    moveFWD(1);
  }
});



function randRange(min, max) {
  var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
}

function getFocalLn() {
  let indexVal = randRange(0, tempfocalLnArray.length - 1);
  curr_focalLn = tempfocalLnArray[indexVal];
  tempfocalLnArray.splice(indexVal, 1);
  focalLth = curr_focalLn;
  if (tempfocalLnArray.length == 1) {
    tempfocalLnArray = [60, 70, 80, 90, 100, 110, 120, 130];
  }
  return curr_focalLn;
}


function scaleFlame() {
  posLeft0 = $(movieArray[0]).position().left - $(".projector").position().left;
  posLeft1 = $(movieArray[1]).position().left - $(".projector").position().left+2;
  u = Math.round((getInclinedX(5.85, posLeft1) * (-1)));
  s = Math.round((getInclinedX(5.85, posLeft0) * (-1)));
  w = (s - u);
  scaleF = (w / u);
  $(movieArray[0]).children().children('.flame_mc').css('transform', 'scale(' + scaleF + ')');
  v = (u * focalLth) / (u - focalLth);
  distDiff = Math.abs(v - w);
  if (distDiff < 3) {
    blurValue = (distDiff / v) * 30;
  }
  else {
    blurValue = (distDiff / v) * 100;
  }
  // //trace("BLURVALUE = " + blurValue);
  // //....to take care when U = Focal lth
  if (blurValue < 65) {
    blurFlame(blurValue);
  }
  else {
    $(movieArray[0]).children().children('.flame_mc').css('display', 'none');
  }
  calc();
}

function blurFlame(num) {
  var blurValue = num;
  // myTempFilters[0].blurX = blurValue;
  // myTempFilters[0].blurY = blurValue;
  if (u <= focalLth) {
    //trace("flame off");
    $(".flame_mc").css('display', 'none');
  } else {
    //trace("flame on");
    $(".flame_mc").css('display', 'block');
  }
  // myTempFilters[0].quality = 3;
  // blurMC.filters = myTempFilters;
  doBlur($(".flame_mc"), blurValue)
}

function doBlur(obj, blurValue) {
  blurValue = blurValue / 8;
  $(obj).css({
    "-webkit-filter": "blur(" + blurValue + "px)",
    "-moz-filter": "blur(" + blurValue + "px)",
    "-o-filter": "blur(" + blurValue + "px)",
    "-ms-filter": "blur(" + blurValue + "px)"
  })
}

function getPosY(gradientValueDeg, mcPosX) {
  gradientValueRad = Math.PI * (gradientValueDeg / 180);
  mcPosY = Math.tan(gradientValueRad) * mcPosX;
  return mcPosY;
}

function getInclinedX(gradientValueDeg, mcPosX) {
  gradientValueRad = Math.PI * (gradientValueDeg / 180);
  mcInclinedX = mcPosX / Math.cos(gradientValueRad);
  return mcInclinedX;
}

function getResolvedXandY(gradientValueDeg, myInclinedX) {
  //
  gradientValueRad = Math.PI * (gradientValueDeg / 180);
  //
  myPosX = myInclinedX * Math.cos(gradientValueRad);
  myPosY = myInclinedX * Math.sin(gradientValueRad);
  //
  var resPosArray = [];
  resPosArray[0] = myPosX;
  resPosArray[1] = myPosY;
  return resPosArray;
}

function calc() {
  let sis = v.toFixed(2);
  let hi = (30 / dist1) * (sis);
  $('.calcText1').text($('.objectDistanceText').text());
  $('.calcText2').text(focalLth);
  $('.calcText3').text(sis);
  $('.calcText4').text(hi.toFixed(2));
}

$('.repeatDiv').on('click', function () {
  initialize();
});

var click = {};

$('.CalcDragHeader').draggable({
  start: function (e, ui) {
    click.x = e.clientX;
    click.y = e.clientY;
  },
  drag: function (e, ui) {
    var original = ui.originalPosition;
    var last = (e.pageX - click.x + original.left) / zoom;
    var last1 = (e.pageY - click.y + original.top) / zoom;
    console.log(last);
    if (last < 0 && last1 < 34) {
      ui.position = {
        left: 0,
        top: 34
      };
      $('.calculationsDiv').css({ top: 34, left: 0 });
    } else if (last > 540 && last1 < 34) {
      ui.position = {
        left: 540,
        top: 34
      };
      $('.calculationsDiv').css({ top: 34, left: 540 });
    } else if (last < 0 && last1 > 94) {
      ui.position = {
        left: 0,
        top: 94
      };
      $('.calculationsDiv').css({ top: 94, left: 0 });
    } else if (last > 540 && last1 > 94) {
      ui.position = {
        left: 540,
        top: 94
      };
      $('.calculationsDiv').css({ top: 94, left: 540 });
    } else if (last < 0) {
      ui.position = {
        left: 0,
        top: last1
      };
      $('.calculationsDiv').css({ top: last1, left: 0 });
    } else if (last > 540) {
      ui.position = {
        left: 540,
        top: last1
      };
      $('.calculationsDiv').css({ top: last1, left: 540 });
    } else if (last1 < 34) {
      ui.position = {
        left: last,
        top: 34
      };
      $('.calculationsDiv').css({ top: 34, left: last });
    } else if (last1 > 94) {
      ui.position = {
        left: last,
        top: 94
      };
      $('.calculationsDiv').css({ top: 94, left: last });
    } else {
      ui.position = {
        left: last,
        top: last1
      };
      $('.calculationsDiv').css({ top: last1, left: last });
    }
    // $('.calculationsDiv').css('left', last);
    // $('.calculationsDiv').css('top', last1);
  }
});