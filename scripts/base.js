// Basic functionality

var displayed_page = 0;

var display = function() {
  var img = document.getElementById("page");
  img.src = images + ("0000" + displayed_page).slice(-4) + image_extension;
  magnify(2);
}

var search = function(event) {
  if (event.keyCode == 13) {
    var field = document.getElementById("search");
    field.select();
    var text = field.value;
    displayed_page = headwords.length - 1;
    for (var i = 0; i < headwords.length; ++i) {
      var cmp = wordCompare(text, headwords[i]);
      if (cmp == "less") {
        displayed_page = i - 1;
        break;
      } else if (cmp == "equal") {
        displayed_page = i;
        break;
      }
    }
    if (displayed_page < 0)
      displayed_page = 0;
    else if (displayed_page >= headwords.length)
      displayed_page = headwords.length - 1;
    display();
  }
};

var prevPage = function() {
  if (displayed_page > 0) {
    --displayed_page;
    display();
  }
};

var nextPage = function() {
  if (displayed_page < headwords.length - 1) {
    ++displayed_page;
    display();
  }
};

// Magnifier based on: https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp

var listeners = {};

var magnify = function(zoom) {
  var display_lens = true;
  var img = document.getElementById("page");
  var glass = document.getElementById("magnifier-glass");
  glass.style.display = "inline";
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
  var w = glass.offsetWidth / 2;
  var h = glass.offsetHeight / 2;

  var getCursorPos = function(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return [x, y];
  };

  var moveMagnifier = function(e) {
    var x, y;
    [x, y] = getCursorPos(e);
    if (x > img.width - (w / zoom))
      x = img.width - (w / zoom);
    if (x < w / zoom)
      x = w / zoom;
    if (y > img.height - (h / zoom))
      y = img.height - (h / zoom);
    if (y < h / zoom)
      y = h / zoom;
    glass.style.left = (x - w) + "px";
    glass.style.top = (y - h) + "px";
    glass.style.backgroundPosition = "-" + ((x * zoom) - w) + "px -" + ((y * zoom) - h) + "px";
    return false;
  };

  var toggleMagnifier = function(e) {
    display_lens = !display_lens;
    if (display_lens) {
      glass.style.display = "inline";
      moveMagnifier(e);
    } else {
      glass.style.display = "none";
      document.getElementById("search").focus();
    }
  };

  for (var event in listeners) {
    if (listeners[event] != undefined) {
      img.removeEventListener(event, listeners[event]);
      glass.removeEventListener(event, listeners[event]);
    }
  }

  listeners["click"] = toggleMagnifier;
  img.addEventListener("click", toggleMagnifier);
  glass.addEventListener("click", toggleMagnifier);

  listeners["mousemove"] = moveMagnifier;
  img.addEventListener("mousemove", moveMagnifier);
  glass.addEventListener("mousemove", moveMagnifier);

  toggleMagnifier(null);
};
