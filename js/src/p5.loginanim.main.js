function setup() {

  LoginAnimationCanvas = createCanvas(windowWidth, windowHeight);
  LoginAnimationCanvas.parent('animationcontainer');
  document.body.onresize = function() {
    resizePage();
    resizeCanvas(pageWidth(), pageHeight());
  }
  cstyle = canvas.style;
  cstyle.left = 0;
  cstyle.top = 0;
  cstyle.position = 'absolute';
}


function draw() {
  clear();
  ballfrac1 = millis() / 5000;
  ballfrac1 %= 1.05;
  ballfrac2 = millis() / 5500;
  ballfrac2 %= 1.1;
  ballfrac3 = millis() / 5600;
  ballfrac3 %= 1.15;
  ballfrac4 = millis() / 5850;
  ballfrac4 %= 1.2;
  ballfrac5 = millis() / 6000;
  ballfrac5 %= 1.3;
  ballfrac6 = millis() / 6500;
  ballfrac6 %= 1.5;
  _color = color('#00bcd4');
  stroke(_color);
  ballfrac1 = new BounceInterpolator().getinterpolation(ballfrac1);
  ballfrac2 = new BounceInterpolator().getinterpolation(ballfrac2);
  ballfrac3 = new BounceInterpolator().getinterpolation(ballfrac3);
  ballfrac4 = new BounceInterpolator().getinterpolation(ballfrac4);
  ballfrac5 = new BounceInterpolator().getinterpolation(ballfrac5);
  ballfrac6 = new BounceInterpolator().getinterpolation(ballfrac6);
  strokeWeight(dip(5));
  point((pageWidth()/6)-dip(7.5), (pageHeight()*ballfrac1)-dip(2));
  strokeWeight(dip(7));
  point((2*pageWidth()/6)-dip(8.5), (pageHeight()*ballfrac2)-dip(3));
  strokeWeight(dip(8));
  point((3*pageWidth()/6)-dip(9), (pageHeight()*ballfrac3)-dip(4));
  strokeWeight(dip(10));
  point((4*pageWidth()/6)-dip(10), (pageHeight()*ballfrac4)-dip(5));
  strokeWeight(dip(13));
  point((5*pageWidth()/6)-dip(11.5), (pageHeight()*ballfrac5)-dip(6));
  strokeWeight(dip(20));
  point(pageWidth()-dip(15), (pageHeight() * ballfrac6) - dip(10));
}