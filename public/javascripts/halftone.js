// Sample object
var sampleSize = { 
  width: 4, 
  height: 4 
}; 
sampleSize.numPixels = 
sampleSize.width * sampleSize.height * 3; 
// 3 is for R, G, and B

var loadImage = function(img) {
  // draw image with the correct scaling
  var width = 360;
  var height = 480;
  //var ratio = img.width() / img.height(); 
  //var width = parseInt(height * ratio);
  ctx.drawImage(img, 0, 0, width, height);
};

 
var reset = function() {
  clearInterval(drawInterval);
  drawIndex = 0;
  points = [];
  paper.clear();
  paper
    .rect(0, 0, 360, 480)
    .attr({ fill: "#000", "stroke-width": 0});
};


// calculate average pixel colour
var drawSampledPixel = function(x, y) {

  // does pixel fit on the image?
  if (
    x + sampleSize.width > c.width || 
    y + sampleSize.height > c.height ||
    x < 0 || 
    y < 0
  ) {
    return;
  };

  // average out the colour
  var myImageData = ctx.getImageData(x, y, sampleSize.width, sampleSize.height);
  var data = myImageData.data;
  var avg = 0;
  for (var i = 0; i < data.length; i += 4) {
    avg += data[i] + data[i + 1] + data[i + 2];
  }; 
  avg /= sampleSize.numPixels;
  avg = (avg < 0) ? 0: avg;

  // draw square pixel

  // draw round pixel
  //var radius = (sampleSize.width / 2) * ((255 - avg) / 255);
  var radius = (sampleSize.width / 2) * (avg / 255);
  radius = radius < 0.5 ? 0 : radius;
  if (radius > 0) {
    if (radius > sampleSize.width / 2) {
      radius = sampleSize.width / 2;
    }
    paper.circle(x, y, radius).attr({ fill: "#DDD", "stroke-width": 0 });
  } 
};


////////////////////////////

// an array of all the relevant points an image
var points = [];

var pushPoints = function(x, y) {
  if (x >= 0 && y >= 0 && x < c.width && y < c.height ) { 
    points.push([x, y]);
  }
};

var roundPixelsHalftone = function() {
  reset();
  for (var x = 0; x < c.width; x += sampleSize.width + 2) {
    for (var y = 0; y < c.height; y += sampleSize.height + 2) {
      pushPoints(x, y);
    }
  }
  run();
};

var roundOffsetPixelsHalftone = function() {
  reset();
  var yStep = parseInt(sampleSize.height / Math.sqrt(3)) + 1.5;
  var pixelRow = 0;
  for (var x = 0; x < c.width; x += sampleSize.width + 3) {
    for (var y = 0; y < c.height; y += sampleSize.height + 2) {
      if (pixelRow % 2 === 0) {
        pushPoints(x + yStep, y);
      } else {
        pushPoints(x, y);
      }
      pixelRow++;
    }
  }
  run();
};

/*
var roundOffsetPixelsHalftone = function() {
  reset();
  var yStep = parseInt(sampleSize.height / Math.sqrt(3));
  var pixelRow = 0;
  for (var x = 0; x < c.width; x += sampleSize.width * 2 + 1) {
    for (var y = 0; y < c.height; y += yStep + 1.5) {
      if (pixelRow % 2 === 0) {
        pushPoints(x + yStep * 2 + .75, y);
      } else {
        pushPoints(x, y);
      }
      pixelRow++;
    }
  }
  run();
};
*/

var verticalLinesHalftone = function() {
  reset();
  for (var x = 0; x < c.width; x += sampleSize.width) {
    for (var y = 0; y < c.height; y += 1) {
      pushPoints(x, y);
    }
  }
};

var diagonalLineHalftone = function() {
  reset();
  var yStep = 1 || parseInt(sampleSize.height / Math.sqrt(3));
  for (var x = 0; x < c.height; x += yStep) {
    for (var y = -c.height; y < c.height; y += sampleSize.height * 2) {
      pushPoints(x + y, x);
    }
  }
};

var horizontalLinesHalftone = function() {
  reset();
  for (var x = 0; x < c.width; x += 1) {
    for (var y = 0; y < c.height; y += sampleSize.height) {
      pushPoints(x, y);
    }
  }
};

var circularLineHalftone = function() {
  reset();
  var xCenter = 150;
  var yCenter = 340;
  var rStep = 10;
  for (var r = 0; r < 550; r += rStep) {
    var rad = 0;
    for (var d = 0; d <= Math.PI * 2; d += Math.PI / r / 4) {
      var x = xCenter + Math.sin(d) * r;
      var y = yCenter + Math.cos(d) * r;
      pushPoints(x, y);
    }
    if (rStep >= 6) {
    //rStep *= 0.95;
  };
  }
};


var drawIndex = 0;
var drawInterval;
var draw = function() {
  var nextDrawIndex = drawIndex + 200;
  for (var i = drawIndex; i < nextDrawIndex; i++) {
    if (points[i]) {
      drawSampledPixel(points[i][0], points[i][1]);
      drawIndex++;
    }
    if (drawIndex >= points.length - 1) {
      clearInterval(drawInterval);
      drawIndex = 0;
    }
  }
  if (drawIndex % 2000 == 0) {
    analytics.diff(drawIndex);
  }
};

var run = function() {
  clearInterval(drawInterval);
  var FRAME_RATE = 20;
  var intervalTime = 1000/FRAME_RATE;
  drawInterval = setInterval(draw, intervalTime);
};

$("#rp").click(function() { roundPixelsHalftone(); });
$("#rop").click(function() { roundOffsetPixelsHalftone(); });

/*
$("#cl").click = function() {
  circularLineHalftone(); run();
};
document.getElementById("dl").onclick = function() {
  diagonalLineHalftone(); run();
};
document.getElementById("vl").onclick = function() {
  verticalLinesHalftone(); run();
};
document.getElementById("hl").onclick = function() {
  horizontalLinesHalftone(); run();
};
*/
