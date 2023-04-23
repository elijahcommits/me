// ====================
//  avatar mousefollow
// ====================

let mouseOverContainer = document.body;
let facingFaceImage = document.getElementById("my_avatar");

let followCursorEnabled = false;

// ==========================
//  follow mouse (transform)
// ==========================


let constrain = 15;

function transforms(x, y, el) {
  let box = el.getBoundingClientRect();
  let calcX = -(y - box.y - (box.height / 2)) / constrain;
  let calcY = (x - box.x - (box.width / 2)) / constrain;
  
  return "perspective(100px) "
    + "   rotateX("+ calcX +"deg) "
    + "   rotateY("+ calcY +"deg) ";
};

function transformElement(el, xyEl) {
  el.style.transform = transforms.apply(null, xyEl);
}

// ============================
//  to center (undo transform)
// ============================

function resetElementTransform(el) {
  el.style.transform = "perspective(none) "
                  + "   rotateX(0deg) "
                  + "   rotateY(0deg) ";
};

// ================================
//  on mouse move, transform image
// ================================

mouseOverContainer.onmousemove = function(e) {
  let xy = [e.clientX, e.clientY];
  let position = xy.concat([facingFaceImage]);

  if (followCursorEnabled) {
    window.requestAnimationFrame(function(){
      transformElement(facingFaceImage, position);
    });
  }
};

// ==========================================
//  when mouse leaves container, reset image
// ==========================================


mouseOverContainer.onmouseleave = function(e) {
  window.requestAnimationFrame(function(){
    resetElementTransform(facingFaceImage);
  });
};

  // ===============================================
  //  on avatar clicked, disable/enable mousefollow
  // ===============================================

facingFaceImage.onmousedown = function() {
  followCursorEnabled = !followCursorEnabled;
}


// ------------------------------------------------------
// ------------------------------------------------------



// ===================
//  scroll down arrow
// ===================

const arrow = document.querySelector('#arrow_down');

window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 60) {
    arrow.style.opacity = 0;
  } else {
    arrow.style.opacity = 1;
  }
});