(function() {
  var updateInterval = 2000.0;
  var clocks = null;
  var canvas = document.getElementById('clock');
  var canvasContext = canvas.getContext('2d');

  var characterMap = {
    " ": [
        ["**", "**", "**", "**", "**"],
        ["**", "**", "**", "**", "**"],
        ["**", "**", "**", "**", "**"],
        ["**", "**", "**", "**", "**"],
        ["**", "**", "**", "**", "**"],
        ["**", "**", "**", "**", "**"],
    ],
    ":": [
        ["**", "**", "**", "**", "**"],
        ["**", ",>", "<,", "**", "**"],
        ["**", "^>", "<^", "**", "**"],
        ["**", ",>", "<,", "**", "**"],
        ["**", "^>", "<^", "**", "**"],
        ["**", "**", "**", "**", "**"],
    ],
    "0": [ 
        [",>", "<>", "<>", "<>", "<,"],
        [",^", ",>", "<>", "<,", ",^"],
        [",^", ",^", "**", ",^", ",^"],
        [",^", ",^", "**", ",^", ",^"],
        [",^", "^>", "<>", "<^", ",^"],
        ["^>", "<>", "<>", "<>", "<^"]
      ],
   "1": [ 
        ["**", ",>", "<>", "<,", "**"],
        ["**", "^>", "<,", ",^", "**"],
        ["**", "**", ",^", ",^", "**"],
        ["**", "**", ",^", ",^", "**"],
        ["**", ",>", "<^", "^>", "<,"],
        ["**", "^>", "<>", "<>", "<^"]
      ],
    "2": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^>", "<>", "<>", "<,", ",^"],
        [",>", "<>", "<>", "<^", ",^"],
        [",^", ",>", "<>", "<>", "<^"],
        [",^", "^>", "<>", "<>", "<,"],
        ["^>", "<>", "<>", "<>", "<^"]
      ],
    "3": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^>", "<>", "<>", "<,", ",^"],
        ["**", ",>", "<>", "<^", ",^"],
        ["**", "^>", "<>", "<,", ",^"],
        [",>", "<>", "<>", "<^", "^,"],
        ["^>", "<>", "<>", "<>", "<^"]
      ],
    "4": [ 
        [",>", "<,", "**", ",>", "<,"],
        [",^", ",^", "**", ",^", ",^"],
        [",^", "^>", "<>", "<^", ",^"],
        ["^>", "<>", "<>", "<,", ",^"],
        ["**", "**", "**", ",^", ",^"],
        ["**", "**", "**", "^>", "<^"]
      ],
    "5": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<>", "<^"],
        ["^,", "^>", "<>", "<>", "<,"],
        ["^>", "<>", "<>", "<,", ",^"],
        [",>", "<>", "<>", "<^", "^,"],
        ["^>", "<>", "<>", "<>", "<^"]
      ],
    "6": [ 
        [",>", "<>", "<>", "<>", "<,"],
        [",^", ",>", "<>", "<>", "<^"],
        [",^", "^>", "<>", "<>", "<,"],
        [",^", ",>", "<>", "<,", ",^"],
        [",^", "^>", "<>", "<^", ",^"],
        ["^>", "<>", "<>", "<>", "<^"]
      ],
    "7": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^>", "<>", "<>", "<,", ",^"],
        ["**", "**", "**", ",^", ",^"],
        ["**", "**", "**", ",^", ",^"],
        ["**", "**", "**", ",^", ",^"],
        ["**", "**", "**", "^>", "<^"],
      ],
    "8": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        [",^", "^>", "<>", "<^", ",^"],
        ["^>", "<>", "<>", "<>", "<^"],
      ],
    "9": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^>", "<>", "<>", "<,", ",^"],
        ["**", "**", "**", ",^", ",^"],
        ["**", "**", "**", "^>", "<^"],
      ],
    "A": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ], // done
    "B": [ 
        [",>", "<>", "<>", "<\\", "**"],
        ["^,", ",>", "<>", "<,", "u,"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        [",^", "^>", "<>", "<^", "d^"],
        ["^>", "<>", "<>", "</", "**"],
      ], // done
    "C": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "D": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "E": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<>", "<^"],
        ["^,", "^>", "<>", "<,", "**"],
        ["^,", ",>", "<>", "<^", "**"],
        [",^", "^>", "<>", "<>", "<,"],
        ["^>", "<>", "<>", "<>", "<^"],
      ], // done
    "F": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "G": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "H": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ], // done
    "I": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^>", "<,", "**", ",>", "<^"],
        ["**", ",^", "**", ",^", "**"],
        ["**", ",^", "**", ",^", "**"],
        [",>", "<^", "**", "^>", "<,"],
        ["^>", "<>", "<>", "<>", "<^"]
      ], // done
    "J": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "K": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "L": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "M": [ 
        [",>", "<\\", "**", "d>", "<,"],
        ["^,", ",\\", "u/", "d,", ",^"],
        ["^,", ",^", "u/", ",^", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ], // done
    "N": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "O": [ 
        [",>", "<>", "<>", "<>", "<,"],
        [",^", ",>", "<>", "<,", ",^"],
        [",^", ",^", "**", ",^", ",^"],
        [",^", ",^", "**", ",^", ",^"],
        [",^", "^>", "<>", "<^", ",^"],
        ["^>", "<>", "<>", "<>", "<^"]
      ], // done
    "P": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "Q": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "R": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "S": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^,", ",>", "<>", "<>", "<^"],
        ["^,", "^>", "<>", "<>", "<,"],
        ["^>", "<>", "<>", "<,", ",^"],
        [",>", "<>", "<>", "<^", "^,"],
        ["^>", "<>", "<>", "<>", "<^"]
      ], // done
    "T": [ 
        [",>", "<>", "<>", "<>", "<,"],
        ["^>", "<,", "**", ",>", "<^"],
        ["**", ",^", "**", ",^", "**"],
        ["**", ",^", "**", ",^", "**"],
        ["**", ",^", "**", ",^", "**"],
        ["**", "^>", "<>", "<^", "**"]
      ], // done
    "U": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "V": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "W": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "X": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "Y": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ],
    "Z": [ 
        [",>", "<,", "**", ",>", "<,"],
        ["^,", ",^", "**", "^,", ",^"],
        ["^,", "^>", "<>", "<^", ",^"],
        ["^,", ",>", "<>", "<,", ",^"],
        ["^,", ",^", "**", ",^", ",^"],
        ["^>", "<^", "**", "^>", "<^"],
      ]
    }

  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  var clockObj = {
    hidden: true,
    hand1Rad: 0.0,
    hand1EndRad: 0.0,
    hand1StartRad: 0.0,
    hand1DifRad: 0.0,
    hand1Direction: 1,
    hand2Rad: 1 * Math.PI,
    hand2StartRad: 1 * Math.PI,
    hand2EndRad: 1 * Math.PI,
    hand2DifRad: 0.0,
    hand2Direction: 1,
    centerX: 0.0,
    centerY: 0.0,
    originalRadius: 0.0,
    radius: 0.0,
    startRadius: 0.0,
    endRadius: 0.0,
    difRadius: 0.0,
    tick: function(percentageComplete) {
      var t1 = this.hand1Rad;
      var t2 = this.hand2Rad;

      // If we have reached the end of the animation set the end to the correct amount
      if(this.precentageComplete >= 1.0) {
        this.hand1Rad = this.hand1EndRad;
        this.hand2Rad = this.hand2EndRad;
        this.radius = this.endRadius;
      } else {
        // Calculate the new hand positions given the percentage of animation complete
        this.hand1Rad = this.hand1StartRad + (this.hand1DifRad * percentageComplete);
        this.hand2Rad = this.hand2StartRad + (this.hand2DifRad * percentageComplete);
        if(this.difRadius !== 0) {
          this.radius = this.startRadius + (this.difRadius * percentageComplete);
        }
      }
      
      // Return true if the clock hand positions changed
      return this.hand1Rad !== t1 || this.hand2Rand !== t2;
    },
    animateRadius: function(radius) {
      this.startRadius = this.radius;
      this.endRadius = radius;
      this.difRadius = this.endRadius - this.startRadius;
    },
    setHand1Pos: function(rad) {
      this.hand1EndRad = this.hand1StartRad = this.hand1Rad = rad;
    },
    animateHand1: function(rad) {
      // Calculate the difference in radians from the current posistion to new position
      this.hand1EndRad = rad;
      this.hand1StartRad = this.hand1Rad;

      var dif = (this.hand1EndRad - this.hand1Rad);
      if(this.hand1Direction < 0) {
        dif = -((Math.PI * 2) - dif);
      }

      this.hand1DifRad = dif;
    },
    setHand2Pos: function(rad) {
      this.hand2EndRad = this.hand2StartRad = this.hand2Rad = rad;
    },
    animateHand2: function(rad) {
      // Calculate the difference in radians from the current posistion to new position
      this.hand2EndRad = rad;
      this.hand2StartRad = this.hand2Rad;

      var dif = (this.hand2EndRad - this.hand2Rad);
      if(this.hand2Direction < 0) {
        dif = -((Math.PI * 2) - dif);
      }
      this.hand2DifRad = dif;
    },
    render: function(ctx) {
      var centerX = this.centerX;
      var centerY = this.centerY;
      var radius = this.radius;
      var hand1Rad = this.hand1Rad;
      var hand2Rad = this.hand2Rad;

      // Fill in the background white
      var topLeftX = centerX - this.originalRadius;
      var topLeftY = centerY - this.originalRadius;
      ctx.fillStyle='white';
      ctx.fillRect(topLeftX, topLeftY, this.originalRadius*2.0, this.originalRadius*2.0);
      if(this.hidden && this.endRadius === this.radius) {
        return;
      }

      // Draw a small black circle in the center
      //ctx.beginPath();
      //ctx.arc(centerX, centerY, radius / 14.0, 0, 2 * Math.PI, false);
      //ctx.fillStyle = 'black';
      //ctx.fill();

      // Draw the hands at the positions required
      ctx.beginPath()
      ctx.moveTo(centerX, centerY);
      ctx.fillStyle = 'black';

      // Calculate the X and Y of the hand 1 position on the circumference of the circle
      var hand1x = radius * Math.cos(hand1Rad) + centerX;
      var hand1y = radius * Math.sin(hand1Rad) + centerY;
      ctx.lineTo(hand1x, hand1y);
      ctx.stroke();

      ctx.beginPath()
      ctx.moveTo(centerX, centerY);
      ctx.fillStyle = 'black';

      // Calculate the X and Y of the hand 2 position on the circumference of the circle
      var hand2x = radius * Math.cos(hand2Rad) + centerX;
      var hand2y = radius * Math.sin(hand2Rad) + centerY;
      ctx.lineTo(hand2x, hand2y);
      ctx.stroke();
    }
  }

  // Create a matrix of clocks
  function createClocks(yCount, reqXCount, canvasWidth, canvasHeight) {
    // Split screen up into squares
    var height = canvasHeight / yCount;
    var width = (canvasWidth - 20) / reqXCount;
    if(height > width) {
      height = width;
    }
    var radius = height / 2.0;
    var xCount = Math.floor(canvasWidth / height);
    if(xCount > reqXCount) {
      xCount = reqXCount
    }

    var matrix = [];
    for(var i=0;i<xCount;i++) {
      matrix[i] = [];
      for(var j=0;j<yCount;j++) {
        // Create a clock for for each grid entry
        var clock = Object.create(clockObj);
        clock.originalRadius = clock.radius = radius;
        clock.centerX = (i * width) + radius;
        clock.centerY = (j * height) + radius;
        matrix[i][j] = clock;
      }
    }
    return matrix;
  }

  // Translate the ASCII hand positions into radians for each hand
  function getHandPos(character) {
    switch(character) {
      case "^": return Math.PI * 1.5;
      case ",": return Math.PI * 0.5;
      case "<": return Math.PI * 1.0;
      case ">": return 0.0;
      case " ": return -1.0;
      case "u": return Math.PI * 1.25;
      case "\\": return Math.PI * 0.25;
      case "/": return Math.PI * 1.75;
      case "d": return Math.PI * 0.75; 
      default:
        console.log("Unknown char - " + character)
        return 0.0
    }
  }

  // Set up the final hand positions for each clock to render
  // the characters specified
  function setCharacters(clocks, chars) {
    var topLeftX = 0;
    var xCount = clocks.length;

    // Loop over each character to be rendered
    for ( var i = 0; i < chars.length; i++ ) {
      var c = characterMap[chars.charAt(i)];
      if(c) {
        for(var j=0;j<c.length;j++) {
          for(var k=0;k<c[j].length;k++) {
            var clock = clocks[k + topLeftX][j];
            var pos = c[j][k];
            // Set the final position for each hand of the clock for this animation
            
            if(pos == "**") {
              clock.animateHand1(0.0);
              clock.animateHand2(1 * Math.PI);
              clock.animateRadius(0);
              clock.hidden = true;
            } else if(pos == "  ") {
              // Set the hands to the default position if no position specified
              clock.animateHand1(0.0);
              clock.animateHand2(1 * Math.PI);
              clock.animateRadius(clock.originalRadius);
              clock.hidden = false;
            } else {
              // Set end position for hands
              var hand1Pos = getHandPos(pos.charAt(0));
              var hand2Pos = getHandPos(pos.charAt(1));
              clock.animateHand1(hand1Pos);
              clock.animateHand2(hand2Pos);
              clock.animateRadius(clock.originalRadius);
              clock.hidden = false;
            }
          }
        }
        topLeftX += c.length-1;
      }
    }
  }

  // Draw the clocks and advance the hands
  function drawClocks(clocks, percentageComplete) {
    var total = 0;
    var xCount = clocks.length;
    for(var i=0;i<xCount;i++) {
      for(var j=0;j<clocks[i].length;j++) {
        clock = clocks[i][j];

        if(clock.tick(percentageComplete) == true || percentageComplete === 0) {
          total += 1
          clock.render(canvasContext);
        }
      }
    }
  }

  // Main animation loop, takes (updateInterval - 500ms) to do one animation
  var animStartTime = 0;
  var cancel = false;
  function animationLoop() {
    if(cancel) { return }
    var diff = new Date() - animStartTime;
    if(diff < updateInterval - 500) {
      requestAnimFrame(animationLoop);
      drawClocks(clocks, diff / (updateInterval - 500));
    } else {
      drawClocks(clocks, 1.0);
    }
  };

  // Setup the clocks on the canvas and make sure to reset up whenever there
  // is a window resize event
  function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Account for retina devices
    var devicePixelRatio = window.devicePixelRatio || 1
    var backingStoreRatio = canvasContext.webkitBackingStorePixelRatio ||
                        canvasContext.mozBackingStorePixelRatio ||
                        canvasContext.msBackingStorePixelRatio ||
                        canvasContext.oBackingStorePixelRatio ||
                        canvasContext.backingStorePixelRatio || 1

    var ratio = devicePixelRatio / backingStoreRatio;
    if (devicePixelRatio !== backingStoreRatio) {
      canvas.width = canvas.width * ratio;
      canvas.style.width = window.innerWidth + "px";
      canvas.height = canvas.height * ratio;
      canvas.style.height = window.innerHeight + "px";
      canvasContext.scale(ratio, ratio);   
    }
    clocks = createClocks(6, 8*5, window.innerWidth, window.innerHeight);
  }
  setupCanvas();
  window.addEventListener('resize', setupCanvas, false);

  // Every second update the display with the new time
  function updateDisplay(message, callback) {
    var now = new Date (new Date().getTime() + updateInterval);
    var seconds = now.getSeconds();
    var hours = now.getHours();
    if(hours < 10) {
      hours = " " + hours;
    }
    function zeroPad(h) { return (h < 10) ? ("0" + h) : h; }
    var timeString = null;
    if(typeof(message) == "undefined") {
      timeString = hours + ":" + zeroPad(now.getMinutes()) + ":" + zeroPad(now.getSeconds());
    } else {
      timeString = message;
    }
    setCharacters(clocks, timeString);
    animStartTime = new Date();
    animationLoop();
    if(typeof(callback) !== "undefined") {
      setTimeout(callback, updateInterval);
    }
  }

  var timer = null; 
  updateInterval = 4000;
  updateDisplay("THE TIME", function() {
    updateDisplay("   IS   ", function() {
      updateInterval = 2000;
      updateDisplay();
      timer = setInterval(updateDisplay, updateInterval);
    })
  });

  var e = document.getElementById("update-speed");
  e.addEventListener('change', function(event) {
    updateInterval = (10 - event.currentTarget.value) * 1000.0;
    cancel = true;
    clearInterval(timer);
    timer = setInterval(updateTime, updateInterval);
    cancel = false; // Will not always work :)
    updateTime();
  }, false);
})();