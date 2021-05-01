
 document.getElementById("video").addEventListener('timeupdate', function() {
    document.getElementById("timer").innerHTML = this.currentTime;
    currentTime = this.currentTime;
});


  function capture() {
    var canvas = document.getElementById('canvas');     
    var video = document.getElementById('video');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
   }

function getCurTime() { 
  alert(video.currentTime);
} 


(function(){

/* predefine zoom and rotate */
  var zoom = 1,
      rotate = 0;

/* Grab the necessary DOM elements */
  var stage = document.getElementById('stage'),
      v = document.getElementsByTagName('video')[0],
      operations = document.getElementById('operations');
  
/* Array of possible browser specific settings for transformation */
  var properties = ['transform', 'WebkitTransform', 'MozTransform',
                    'msTransform', 'OTransform'],
      prop = properties[0];


/* Position video */
  v.style.left = 0;
  v.style.top = 0;


  if(operations){
    operations.innerHTML =  '<button class="play">Play</button>'+
                             '<div id="change">' +
                            '<button class="zoomin">Zoom-In</button>' +
                            '<button class="zoomout">Zoom-Out</button>' +
                            '<button class="left">Left</button>' +
                            '<button class="right">Right</button>' +
                            '<button class="up">Up</button>' +
                            '<button class="down">Down</button>' +
                            '<button class="reset">Reset</button>' +
                            '</div>'
                          ;
  }

/* If a button was clicked (uses event delegation)...*/
  operations.addEventListener('click',function(e){
    t = e.target;
    if(t.nodeName.toLowerCase()==='button'){

/* Check the class name of the button and act accordingly */    
      switch(t.className){

/* Toggle play functionality and button label */    
        case 'play':
          if(v.paused){
            v.play();
            t.innerHTML = 'Pause';
          } else {
            v.pause();
            t.innerHTML = 'Play';
          }
        break;

/* Increase zoom and set the transformation */
        case 'zoomin':
          zoom = zoom + 0.1;
          v.style[prop]='scale('+zoom+')';
        break;

/* Decrease zoom and set the transformation */
        case 'zoomout':
          zoom = zoom - 0.1;
          v.style[prop]='scale('+zoom+') rotate('+rotate+'deg)';
        break;

/* Move video around by reading its left/top and altering it */
        case 'left':
          v.style.left = (parseInt(v.style.left,10) - 5) + 'px';
        break;
        case 'right':
          v.style.left = (parseInt(v.style.left,10) + 5) + 'px';
        break;
        case 'up':
          v.style.top = (parseInt(v.style.top,10) - 5) + 'px';
        break;
        case 'down':
          v.style.top = (parseInt(v.style.top,10) + 5) + 'px';
        break;

/* Reset all to default */
        case 'reset':
          zoom = 1;
          v.style.top = 0 + 'px';
          v.style.left = 0 + 'px';
          v.style[prop]='scale('+zoom+')';
        break;
      }        

      e.preventDefault();
    }
  },false);
})();