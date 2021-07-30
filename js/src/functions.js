function pageWidth() {
  return window.innerWidth || document.documentElement.clientWidth ||
    document.body.clientWidth;
}

function pageHeight() {
  return window.innerHeight || document.documentElement.clientHeight ||
    document.body.clientHeight;
}

function dip(v) {
  return (pageWidth() <= pageHeight() ? pageWidth() : pageHeight())*v/160;
}

dontupdate = false;
function resizePage() {
  if (dontupdate) { return }
  dontupdate = true;
  if (pageWidth() > pageHeight()) {
    document.body.style.height = '50%';
    document.body.style.width = '75%';
    document.body.style.left = '12.5%';
  } else {
    document.body.style.height = '75%';
    document.body.style.width = '100%';
    document.body.style.left = '0px';
  }
  dontupdate = false;
}