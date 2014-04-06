var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};



function init(){
  //init data
  //end
  //init TreeMap
  var tm = new $jit.TM.Squarified({
    //where to inject the visualization
    injectInto: 'infovis',
    //parent box title heights
    titleHeight: 28,
    //enable animations
    animate: animate,
    //box offsets
    offset: 1,
    //Attach left and right click events
    Events: {
      enable: true,
      onClick: function(node) {
        if(node) tm.enter(node);
      },
      onRightClick: function() {
        tm.out();
      }
    },
    duration: 1000,
    //Enable tips
    Tips: {
      enable: true,
      //add positioning offsets
      offsetX: 20,
      offsetY: 20,
      //implement the onShow method to
      //add content to the tooltip when a node
      //is hovered
      onShow: function(tip, node, isLeaf, domElement) {
        var html = "<div class=\"tip-title\">" + node.name 
          + "</div><div class=\"tip-text\">";
        var data = node.data;
        if(data.playcount) {
          html += "play count: " + data.playcount;
        }
        if(data.image) {
          html += "<img src=\""+ data.image +"\" class=\"album\" />";
        }
        tip.innerHTML =  html; 
      }  
    },
    //Add the name of the node in the correponding label
    //This method is called once, on label creation.
    onCreateLabel: function(domElement, node){
        domElement.innerHTML = node.name;
        var style = domElement.style;
        style.display = '';
        style.border = '1px solid transparent';
        domElement.onmouseover = function() {
          style.border = '1px solid #9FD4FF';
        };
        domElement.onmouseout = function() {
          style.border = '1px solid transparent';
        };
    }
  });
  var json = {  
  "children": [  
   {  
     "children": [  
       {  
         "children": [],   
         "data": {  
           "playcount": "276",   
           "$color": "#9bd5a5",   
           "image": "http://userserve-ak.last.fm/serve/300x300/11403219.jpg",   
           "$area": 276  
         },   
         "id": "album-Thirteenth Step",   
         "name": "Implement that Stuff"  
       },   
       {  
         "children": [],   
         "data": {  
           "playcount": "271",   
           "$color": "#DCD33A",   
           "image": "http://userserve-ak.last.fm/serve/300x300/11393921.jpg",   
           "$area": 271  
         },   
         "id": "album-Mer De Noms",   
         "name": "Deploy To Mist"  
       }  
     ],   
     "data": {  
       "playcount": 547,   
       "$area": 547  
     },   
     "id": "artist_A Perfect Circle",   
     "name": "Greatness"  
   },   
   {  
     "children": [  
       {  
         "children": [],   
         "data": {  
           "playcount": "209",   
           "$color": "#728288",   
           "image": "http://userserve-ak.last.fm/serve/300x300/32349839.jpg",   
           "$area": 209  
         },   
         "id": "album-Above",   
         "name": "Deploy"  
       }  
     ],   
     "data": {  
       "playcount": 209,   
       "$area": 209  
     },   
     "id": "artist_Mad Season",   
     "name": "Further Greatness"  
   }
 ],   
 "data": {},   
 "id": "root",   
 "name": "Build the Next Facebook"  
 };
  tm.loadJSON(json);
  tm.canvas.resize(1200,268);
  tm.refresh();

  //end
  //add events to radio buttons
  var sq = $jit.id('r-sq'),
      st = $jit.id('r-st'),
      sd = $jit.id('r-sd');
  var util = $jit.util;
  util.addEvent(sq, 'change', function() {
    if(!sq.checked) return;
    util.extend(tm, new $jit.Layouts.TM.Squarified);
    tm.refresh();
  });
  util.addEvent(st, 'change', function() {
    if(!st.checked) return;
    util.extend(tm, new $jit.Layouts.TM.Strip);
    tm.layout.orientation = "v";
    tm.refresh();
  });
  util.addEvent(sd, 'change', function() {
    if(!sd.checked) return;
    util.extend(tm, new $jit.Layouts.TM.SliceAndDice);
    tm.layout.orientation = "v";
    tm.refresh();
  });
  //add event to the back button
  var back = $jit.id('back');
  $jit.util.addEvent(back, 'click', function() {
    tm.out();
  });
}