var analytics = {
  start: Date.now(),
  last: Date.now(),
  end: Date.now(),
  diff: function(text) {
    this.last = Date.now();
    // milliseconds
    var timeElapsed = (this.last - this.start) / 1000;
    // milliseconds
    var timeDelta = (this.last - this.end) / 1000;
    this.end = this.last;
    console.log(text + ": ", timeElapsed, timeDelta);
  }
};
