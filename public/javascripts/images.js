  var images = [ 
  "archimedes", "bell", "conway", "curie", "davinci", "edison", "einstein", "feynman", "franklin", "fuller",
  "gould", "harvey", "hawking", "jobs", "lovelace", "musk", "newell", "newton", "plato", "pythagoras",
  "sagan", "savage", "stallman", "tesla", "turing", "tyson"
  ]; 

  var imageHTML = [];
  for (var index in images) {
    imageHTML.push("<img id=" + images[index] +  " src='/images/p-" + images[index] + ".png''>");
  }
  $("#sourceImages").append(imageHTML.join(""));
  $("#sourceImages img")
    .click(function() {
      loadImage(this);
    });
