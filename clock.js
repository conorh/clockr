(function() {
  var characterMap = {
    " ": [
        ["  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  "],
        ["  ", "  ", "  ", "  ", "  "],
    ],
    ":": [
        ["  ", ",>", "<>", "<,", "  "],
        ["  ", ",^", "  ", ",^", "  "],
        ["  ", "^>", "<>", "<^", "  "],
        ["  ", ",>", "<>", "<,", "  "],
        ["  ", ",^", "  ", ",^", "  "],
        ["  ", "^>", "<>", "<^", "  "],
    ],
    "0": [ 
        [",>", "<>", "<>", "<>", "<,"],
        [",^", ",>", "<>", "<,", ",^"],
        [",^", ",^", "  ", ",^", ",^"],
        [",^", ",^", "  ", ",^", ",^"],
        [",^", "^>", "<>", "<^", ",^"],
        ["^>", "<>", "<>", "<>", "<^"]
      ],
    "1": [ 
        ["  ", ",>", "<>", "<,", "  "],
        ["  ", ",^", "  ", ",^", "  "],
        ["  ", ",^", "  ", ",^", "  "],
        ["  ", ",^", "  ", ",^", "  "],
        ["  ", ",^", "  ", ",^", "  "],
        ["  ", "^>", "<>", "<^", "  "]
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
        ["  ", ",>", "<>", "<^", ",^"],
        ["  ", "^>", "<>", "<,", ",^"],
        [",>", "<>", "<>", "<^", "^,"],
        ["^>", "<>", "<>", "<>", "<^"]
      ],
    "4": [ 
        [",>", "<,", "  ", ",>", "<,"],
        [",^", ",^", "  ", ",^", ",^"],
        [",^", "^>", "<>", "<^", ",^"],
        ["^>", "<>", "<>", "<,", ",^"],
        ["  ", "  ", "  ", ",^", ",^"],
        ["  ", "  ", "  ", "^>", "<^"]
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
        ["  ", "  ", "  ", ",^", ",^"],
        ["  ", "  ", "  ", ",^", ",^"],
        ["  ", "  ", "  ", ",^", ",^"],
        ["  ", "  ", "  ", "^>", "<^"],
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
        ["  ", "  ", "  ", ",^", ",^"],
        ["  ", "  ", "  ", "^>", "<^"],
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

  var canvas = document.getElementById('clock');
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight;
  var canvasContext = canvas.getContext('2d');

  var clockObj = {
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
    radius: 0.0,
    tick: function(percentageComplete) {
      var t1 = this.hand1Rad;
      var t2 = this.hand2Rad;

      // If we have reached the end of the animation set the end to the correct amount
      if(this.precentageComplete >= 1.0) {
        this.hand1Rad = this.hand1EndRad;
        this.hand2Rad = this.hand2EndRad;
      } else {
        // Calculate the new hand positions given the percentage of animation complete
        this.hand1Rad = this.hand1StartRad + (this.hand1DifRad * percentageComplete)
        this.hand2Rad = this.hand2StartRad + (this.hand2DifRad * percentageComplete)
      }
      
      // Return true if the clock hand positions changed
      return this.hand1Rad !== t1 || this.hand2Rand !== t2
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

      var topLeftX = centerX - radius;
      var topLeftY = centerY - radius;

      // Fill in the background white
      ctx.fillStyle='white';
      ctx.fillRect(topLeftX, topLeftY, radius*2.0, radius*2.0);

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
  function createClocks(yCount, xCount) {
    // Split screen up into squares
    var height = canvas.height / yCount;
    var width = canvas.width / xCount;
    if(height > width) {
      height = width;
    }
    var radius = height / 2.0;
    var xCount = Math.floor(canvas.width / height);

    var matrix = [];
    for(var i=0;i<xCount;i++) {
      matrix[i] = [];
      for(var j=0;j<yCount;j++) {
        // Create a clock for for each grid entry
        var clock = Object.create(clockObj);
        clock.radius = radius;
        clock.centerX = (i * width) + radius + 10;
        clock.centerY = (j * height) + radius + 10;
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
            var hand1Pos = 0.0;
            var hand2Pos = 1 * Math.PI;
            if(pos != "  ") { 
              hand1Pos = getHandPos(pos.charAt(0));
              hand2Pos = getHandPos(pos.charAt(1));
              clock.animateHand1(hand1Pos);
              clock.animateHand2(hand2Pos);
            } else {
              clock.animateHand1(hand2Pos);
              clock.animateHand2(hand1Pos);
            }
          }
        }
        topLeftX += c.length;
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

  var animStartTime = 0;
  function animationLoop() {
    var diff = new Date() - animStartTime;
    if(diff < 500) {
      requestAnimFrame(animationLoop);
      drawClocks(clocks, diff / 500.0);
    } else {
      drawClocks(clocks, 1.0);
    }
  };

  var clocks = createClocks(6, 8*6-1);
 // window.addEventListener('resize', function() {
 //   canvas.width = window.innerWidth;
 //   canvas.height = window.innerHeight;
 //   clocks = createClocks(6, 8*6-1);
 // }, false);

  function zeroPad(h) {
    return (h < 10) ? ("0" + h) : h;
  }

  // Every second update the display with the new time
  setInterval(function() {
    var now = new Date(); 
    var seconds = now.getSeconds();
    var hours = now.getHours();
    if(hours < 10) {
      hours = " " + hours;
    }
    var timeString = hours + ":" + zeroPad(now.getMinutes()) + ":" + zeroPad(now.getSeconds());
    setCharacters(clocks, timeString);
    animStartTime = new Date();
    animationLoop();
  }, 1000);
})();