function preload() {
  font_nevis_bold = loadFont('assets/fonts/nevis-bold.ttf');
  viperview_loadingpage = document.getElementById('viperview-loadingpage');
}

function setup() {
  LoadingPageCanvas = createCanvas(windowWidth, windowHeight);
  LoadingPageCanvas.parent('viperview-loadingpage');
  cstyle = canvas.style;
  cstyle.left = 0;
  cstyle.top = 0;
  cstyle.position = 'absolute';
  setTimeout(function() {
  
  indexmain();
  }, 3000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();
  background(255);
  animFrac = millis() / 500;
  if (animFrac >= 1) {animFrac = 1;}
  animFrac = Math.sin(animFrac*Math.PI*0.75)/0.7071;
  animcolor = color('#00BCD4');
  stroke(animcolor);
  strokeWeight(dip(2));
  noFill();
  rect((pageWidth()/2)-dip(19), (pageHeight()/2)-dip(21), dip(40)*animFrac, dip(40)*animFrac, dip(5));
  fill(animcolor);
  textFont(font_nevis_bold);
  textAlign(LEFT, TOP);
  textSize(dip(23));
  noStroke();
  text('FL', (pageWidth()*animFrac/2)-dip(6), (pageHeight()/2)-dip(5.5));
  animLineFrac = millis()/1000;
  animLineAlphaFrac = millis()/1000;
  if (animLineAlphaFrac >= 1) {animLineAlphaFrac = 1;}
  lightlinecolor = color('#00bcd4');
  lightlinecolor.setAlpha(100*animLineAlphaFrac);
  linecolor = color('#00bcd4');
  linecolor.setAlpha(255*animLineAlphaFrac);
  if (animLineFrac <= 1) {
    animLineFrac = Math.sin(animLineFrac*Math.PI/2);
  } else {
    animLineFrac = 1 + Math.sin((animLineFrac-1)*Math.PI/2);
  }
  if (animLineFrac <= 1) {
    animLineFrac1 = 0.25;
    animLineFrac2 = (0.25+animLineFrac*0.5);
  } else if (animLineFrac >= 1 && animLineFrac <= 2) {
    animLineFrac2 = 0.75;
    animLineFrac1 = (0.25+(animLineFrac-1)*0.5);
  }
  stroke(lightlinecolor);
  noFill();
  line(0.25*pageWidth(), 0.75*pageHeight(), 0.75*pageWidth(), 0.75*pageHeight());
  stroke(linecolor);
  noFill();
  line(animLineFrac1*pageWidth(), 0.75*pageHeight(), animLineFrac2*pageWidth(), 0.75*pageHeight());
}