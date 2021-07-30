dialogcontainer = document.createElement('div');
dialoglayout = document.createElement('div');
dialogtitle = document.createElement('div');
dialogmessagecontainer = document.createElement('div');
dialogmessage = document.createElement('div');
dialogcustomlayout = document.createElement('div');
dialogbuttonscontainer = document.createElement('div');
dialogrightbuttonscontainer = document.createElement('div');
dialogleftbuttonscontainer = document.createElement('div');
dialogokbutton = document.createElement('div');
dialogcancelbutton = document.createElement('div');
dialogneutralbutton = document.createElement('div');

var dialogcolor = 'white', dialogshadowcolor = 'rgba(0, 0, 0, 0.3)', dialogtextcolor = 'black', dialogbuttonscolor = '#00bcd4';


dialogcontainer.style = 'pointer-events: none; position: fixed; left: 0; top: 0; width: 100%; height: 100%; padding: 0; z-index: 0'
dialoglayout.style = 'position: absolute; left: 4%; right: 4%; width: 92%; background-color: white; box-shadow: 0px 0px 15px #00bcd4; border-radius: 20px; max-height: calc(100% - 20px); overflow-y: scroll;';
var dialogtxtstyle = 'position: relative; overflow-wrap: anywhere; color: black; height: 100%; display: flex; align-items: center;';
dialogtitle.style = dialogtxtstyle + 'font-family: roboto-bold; font-size: 150%; top: 10px; justify-content: center; padding-top: 16px;';
dialogmessagecontainer.style = 'position: relative; margin-top: 30px; margin-bottom: 10px';
dialogmessage.style = dialogtxtstyle + 'font-family: roboto-regular; font-size: 100%; white-space: pre-line; justify-content: center; margin-left: 8px; margin-right: 8px';
dialogcustomlayout.style = 'width: 100%; height: 0; padding: 0; padding-top: 8px';
dialogbuttonscontainer.style = 'position: relative; width: 100%; padding-bottom: 20px; padding-top: 10px; height: 100%; display: flex; justify-content: center; align-items: center';
var btnstyles = 'position: relative; width: 40%; overflow-wrap : anywhere; height: 100%; display: flex; justify-content: center; align-items: center; font-family: roboto-bold; font-size: 110%; border-radius: 20px; padding: 8px; margin-left: 5%; margin-right: 5%';
dialogokbutton.style = btnstyles;
dialogokbutton.style.width = '50%';
dialogokbutton.style.color = dialogcolor;
dialogokbutton.style.backgroundColor = dialogbuttonscolor;
dialogcancelbutton.style = btnstyles;
dialogcancelbutton.style.width = '50%';
dialogcancelbutton.style.color = dialogbuttonscolor;
dialogcancelbutton.style.backgroundColor = 'rgba(0, 0, 0, .03)';

dialoglayout.appendChild(dialogtitle);
dialogmessagecontainer.appendChild(dialogmessage);
dialoglayout.appendChild(dialogmessagecontainer);
dialoglayout.appendChild(dialogcustomlayout);
dialogbuttonscontainer.appendChild(dialogcancelbutton);
dialogbuttonscontainer.appendChild(dialogokbutton);
dialoglayout.appendChild(dialogbuttonscontainer);
dialogcontainer.appendChild(dialoglayout);
document.body.appendChild(dialogcontainer);
dialoglayout.style.display = 'none';
var dialogimportant = false;
var dialoganim = new ValueAnimator();
dialoganim.setduration(500);
function setdialogcolor(color) {
  dialogcolor = color;
  dialoglayout.style.backgroundColor = color;
  dialogokbutton.style.color = color;
}
function setdialogshadowcolor(color) {
  dialogshadowcolor = color;
}
function setdialogtextcolor(color) {
  dialogtextcolor = color;
  dialogtext.style.color = color;
}
function setdialogbuttonscolor(color) {
  dialogbuttonscolor = color;
  dialogokbutton.style.color = color;
  dialogcancelbutton.style.color = color;
  dialogneutralbutton.style.color = color;
  dialogokbutton.style.backgroundColor = color;
}
dialogshown = false;
function hideDialog() {
  if (!dialogshown) {return}
  dialogshown = false;
  dialogcontainer.style.pointerEvents = 'none';
  dialoganim.setrange(0, 1);
  dialoganim.setinterpolator(new AnticipateInterpolator());
  dialoganim.start();
  dialoganim.onend = function(){};
}
function dialog(title, message, okbutton, cancelbutton, important) {
  dialogshown = true;
  dialogimportant = important;
  dialogcontainer.style.backgroundColor = 'transparent';
  dialogcontainer.style.pointerEvents = 'all';
  dialoglayout.style.display = 'block';
  dialogtitle.innerHTML = title;
  dialogmessage.innerHTML = message;
  dialogokbutton.innerHTML = okbutton;
  dialogcancelbutton.innerHTML = cancelbutton;
  dialogokbutton.style.display = 'flex';
  dialogcancelbutton.style.display = 'flex';
  dialogmessage.style.display = 'flex';
  dialogokbutton.style.width = '40%';
  dialogcancelbutton.style.width = '40%';
  if (okbutton === undefined || okbutton === null || okbutton === '') {
    dialogokbutton.style.display = 'none';
    dialogcancelbutton.style.width = '80%';
  }
  if (cancelbutton === undefined || cancelbutton === null || cancelbutton === '') {
    dialogcancelbutton.style.display = 'none';
    dialogokbutton.style.width = '80%';
  }
  if (message === undefined || message === null || message === '') {
    dialogmessage.style.display = 'none';
  }
  dialoganim.setlisteners([function(frac, time) {
    dialogcontainer.style.backgroundColor = 'rgba(0, 0, 0, '.concat((1-frac)*0.8 > 0.8 ? 0.8 : (1-frac)*0.8).concat(')');
    dialoglayout.style.transform = "translateY(".concat(100 * frac).concat("%)");
    dialoglayout.style.opacity = 1 - frac;
    dialoglayout.style.bottom = 10*(1-frac) + 'px';
    dialoglayout.style.boxShadow = "0px 2px ".concat(15 * (1 - frac)).concat("px " + dialogshadowcolor);
  }]);
  dialoganim.setrange(1, 0);
  dialoganim.setinterpolator(new OvershotInterpolator());
  dialoganim.start();
}

dialogcontainer.addEventListener('click', function(e) {
  if (e.target === e.currentTarget && !dialogimportant) {
    hideDialog();
  }
}, false);


dialogokbutton.addEventListener('click', function(e) {
  ondialogbuttonmtend(dialogokbutton, e);
  if (e.target === e.currentTarget && !dialogimportant) {
    hideDialog();
  }
  ondialogokbuttonclicked(e);
}, false);
dialogokbutton.addEventListener('mouseover', function(e) {
  ondialogbuttonmtstart(dialogokbutton, e);
}, false);
dialogokbutton.addEventListener('mouseout', function(e) {
  ondialogbuttonmtend(dialogokbutton, e);
}, false);


dialogcancelbutton.addEventListener('click', function(e) {
  ondialogbuttonmtend(dialogcancelbutton, e);
  hideDialog();
  ondialogcancelbuttonclicked(e);
}, false);
dialogcancelbutton.addEventListener('mouseover', function(e) {
  ondialogbuttonmtstart(dialogcancelbutton, e);
}, false);
dialogcancelbutton.addEventListener('mouseout', function(e) {
  ondialogbuttonmtend(dialogcancelbutton, e);
}, false);

anim = new ValueAnimator();
anim.setduration(300);
anim.setinterpolator(new DecelerateInterpolator());

function ondialogbuttonmtstart(button, e) {
  anim.stop();
  anim.setrange(1, .5);
  anim.setlisteners([function(progress, time) {
    button.style.opacity = progress;
    if (button === dialogneutralbutton) {
    button.style.backgroundColor = 'rgba(0, 188, 212, ' + (1-progress) + ')';
    }
  }]);
  anim.start();
}

function ondialogbuttonmtend(button, e) {
  anim.stop();
  anim.setrange(.5, 1);
  anim.setlisteners([function(progress, time) {
    button.style.opacity = progress;
    if (button === dialogneutralbutton) {
      button.style.backgroundColor = 'rgba(0, 188, 212, ' + (1-progress) + ')';
    }
  }]);
  anim.start();
}

function ondialogokbuttonclicked(e) {
  
}

function ondialogcancelbuttonclicked(e) {
  
}