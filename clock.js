(function() {
  var totalTicks = 60 * 0.5;
  var ticks = 0;

  var characterMap = {
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
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var canvasContext = canvas.getContext('2d');
  window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, false);

  var clockObj = {
    hand1Rad: 0.0,
    hand1EndRad: 0.0,
    hand1Step: 0.0,
    hand1Direction: 1,
    hand2Rad: 0.0,
    hand2EndRad: 0.0,
    hand2Step: 0.0,
    hand2Direction: 1,
    centerX: 0.0,
    centerY: 0.0,
    radius: 0.0,
    tickCount: 0,
    tick: function() {
      this.tickCount += 1;
      if(this.tickCount == totalTicks - 1) {
        this.hand1Rad = this.hand1EndRad;
        this.hand2Rad = this.hand2EndRad;
      } else {
        this.hand1Rad += this.hand1Step;
        this.hand2Rad += this.hand2Step;
      }
    },
    animateHand1: function(rad) {
      this.hand1EndRad = rad;
      var dif = (this.hand1EndRad - this.hand1Rad);
      if(this.hand1Direction < 0) {
        dif = -((Math.PI * 2) - dif);
      }
      this.hand1Step = dif / this.tickCount;
    },
    animateHand2: function(rad) {
      this.hand2EndRad = rad;
        
      var dif = (this.hand2EndRad - this.hand2Rad);
      if(this.hand2Direction < 0) {
        dif = -((Math.PI * 2) - dif);
      }
      this.hand2Step = dif / this.tickCount;
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
      ctx.fillRect(topLeftX,topLeftY,radius*2.0,radius*2.0);

      // Draw a small black circle in the center
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius / 14.0, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'black';
      ctx.fill();

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
        var clock = Object.create(clockObj);
        clock.radius = radius;
        clock.centerX = (i * width) + radius;
        clock.centerY = (j * height) + radius;
        clock.tickCount = totalTicks
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
    var topLeftY = 2;
    // Loop over each character to be rendered
    for ( var i = 0; i < chars.length; i++ ) {
      var c = characterMap[chars.charAt(i)];
      if(c) {
        // Render each hand of each clock for each section
        for(var j=0;j<c.length;j++) {
          for(var k=0;k<c[j].length;k++) {
            var clock = clocks[topLeftX + k][topLeftY + j];
            var pos = c[j][k];
            var hand1Pos = 0.0;
            var hand2Pos = 1 * Math.PI;
            if(pos != "  ") { 
              hand1Pos = getHandPos(pos.charAt(0));
              hand2Pos = getHandPos(pos.charAt(1));
            }
            clock.animateHand1(hand1Pos);
            clock.animateHand2(hand2Pos);
            clock.tickCount = 0
          }
        }
        topLeftX += c.length;
      }
    }
  }

  // Draw the clocks and advance the hands 1 tick
  function drawClocks(clocks) {
    var xCount = clocks.length;
    for(var i=0;i<xCount;i++) {
      for(var j=0;j<clocks[i].length;j++) {
        clock = clocks[i][j];
        clock.tick();
        clock.render(canvasContext);
      }
    }
  }

  function animationLoop() {
    ticks +=1;
    if(ticks < totalTicks) {
      requestAnimFrame(animationLoop);
      drawClocks(clocks);
    }
  };

  function setTime() {
    var now = new Date();
    var time = now.getMinutes().toString() + ":" + now.getSeconds().toString()
    setCharacters(clocks, time);
    animationLoop();
  }

  var clocks = createClocks(8, 8*6+2);
  setTime();

  setInterval(function() {
    var now = new Date();
    var time = now.getHours().toString() + ":" + now.getMinutes().toString() + ":" + now.getSeconds().toString()
    setCharacters(clocks, time);
    ticks = 0;
    animationLoop();
  }, 1000);
})();