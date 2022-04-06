/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2019, Codrops
 * http://www.codrops.com
 */
 

 var orientationEl = document.getElementById('orientation'),
 accelerationEl = document.getElementById('acceleration'),
 accIncGravEl = document.getElementById('accincgrav'),
 rotationEl = document.getElementById('rotation'),
 intervalEl = document.getElementById('interval');

if (window.DeviceOrientationEvent) {
 window.addEventListener('deviceorientation', deviceOrientationHandler, false)
}

function deviceOrientationHandler(evt) {
 var orientationData = evt;
 // compass direction
 orientationEl.children[1].innerHTML = evt.alpha;

 // vertical tilt
 orientationEl.children[3].innerHTML = evt.beta;

 // horizontal tilt
 orientationEl.children[5].innerHTML = evt.gamma;
}

if (window.DeviceMotionEvent) {
 window.addEventListener('devicemotion', deviceMotionHandler, false);
}

function deviceMotionHandler(evt) {
 var motionData = evt;
 // acceleration
 var evAcceleration = evt.acceleration;

 accelerationEl.children[1].innerHTML = evAcceleration.x;
 accelerationEl.children[3].innerHTML = evAcceleration.y;
 accelerationEl.children[5].innerHTML = evAcceleration.z;

 // acceleration including gravity
 var accIncGravity = evt.accelerationIncludingGravity;

 accIncGravEl.children[1].innerHTML = accIncGravity.x;
 accIncGravEl.children[3].innerHTML = accIncGravity.y;
 accIncGravEl.children[5].innerHTML = accIncGravity.z;

 // rotation rate
 var rotationRate = evt.rotationRate;

 rotationEl.children[1].innerHTML = rotationRate.alpha;
 rotationEl.children[3].innerHTML = rotationRate.beta;
 rotationEl.children[5].innerHTML = rotationRate.gamma;

 // interval
 var interval = evt.interval;
 intervalEl.children[1].innerHTML = interval;
}

window.onresize = function(){ location.reload(); }
if(window.innerHeight > window.innerWidth){
    alert("Please use landscape.  Then tilt your phone left or right to wiggle.");
}
 {
    const body = document.body;
    const docEl = document.documentElement;

    const MathUtils = {
        lineEq: (y2, y1, x2, x1, currentVal) => {
            // y = mx + b 
            var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
            return m * currentVal + b;
        },
        lerp: (a, b, n) =>  (1 - n) * a + n * b,
        distance: (x1, x2, y1, y2) => {
            var a = x1 - x2;
            var b = y1 - y2;
            return Math.hypot(a,b);
        }
    };

    let winsize;
    const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    const getMousePos = (ev) => {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) {
            posx = ev.pageX;
            posy = ev.pageY;
        }
        else if (ev.clientX || ev.clientY) 	{
            posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
            posy = ev.clientY + body.scrollTop + docEl.scrollTop;
        }
        return {x: posx, y: posy};
    }
    handleMotionEvent = (handlemMotionEvent.addEventListener) ->
  
    x = handlemMotionEvent.addEventListener.accelerationIncludingGravity.x
    y = handlemMotionEvent.addEventListener.accelerationIncludingGravity.y
    z = handlemMotionEvent.addEventListener.accelerationIncludingGravity.z
    
    $(".x").text(Math.round(x))
    $(".y").text(Math.round(y))
    $(".z").text(Math.round(z))
    
    console.log("hi")
    
  
  window.addEventListener("devicemotion", handleMotionEvent, true)
  
  handleMotionEvent()
  console.log("hello")
    let mousePos = {x: winsize.width/0.5, y: winsize.height/0.5};
    window.addEventListener('mousemove', ev => mousePos = getMousePos(ev));

    const imgs = [...document.querySelectorAll('.content__img')];
    const imgsTotal = imgs.length;
    let imgTranslations = [...new Array(imgsTotal)].map(() => ({x: 0, y: 0}));

    const elem = document.querySelector('.content__text');
    const textEl = elem.querySelector('span.content__text-inner');

    var textvh = $(window).innerHeight() * 0.198; // 5.33 vh


    const createBlotterText = () => {
        const text = new Blotter.Text(textEl.innerHTML, {
            family : "'Righteous', 'url(Righteous-Regular.ttf)",
            weight: 1000,
            size : textvh,
            fill: '#554f41',
        

        });

        function myFunction(x) {
            if (x.matches) { // If media query matches
              createBlotterText.size = 60;
            } 
          var x = window.innerWidth > 768 ? 150 : 60;
          myFunction(x) // Call listener function at run time
          x.addListener(myFunction) // Attach listener function on state changes
        };

        elem.removeChild(textEl);

        const material = new Blotter.LiquidDistortMaterial();
        material.uniforms.uSpeed.value = 1.1;
        material.uniforms.uVolatility.value = 0.77;
        material.uniforms.uSeed.value = 0.7;
        const blotter = new Blotter(material, {texts: text});
        const scope = blotter.forText(text);
        scope.appendTo(elem);

        let lastMousePosition = {x: winsize.width, y: winsize.height};
        let volatility = 2;

        const render = () => {
            const docScrolls = {left : body.scrollLeft + docEl.scrollLeft, top : body.scrollTop + docEl.scrollTop};
            const relmousepos = {x : mousePos.x - docScrolls.left, y : mousePos.y - docScrolls.top };
            const mouseDistance = MathUtils.distance(lastMousePosition.x, relmousepos.x, lastMousePosition.y, relmousepos.y);

            volatility = MathUtils.lerp(volatility, Math.min(MathUtils.lineEq(0.9, 0, 100, 0, mouseDistance),0.9), 0.05);
            material.uniforms.uVolatility.value = volatility;

            for (let i = 0; i <= imgsTotal - 1; ++i) {
                imgTranslations[i].x = MathUtils.lerp(imgTranslations[i].x, MathUtils.lineEq(40, -40, winsize.width, 0, relmousepos.x), i === imgsTotal - 1 ? 0.15 : 0.03*i + 0.03);
                imgTranslations[i].y = MathUtils.lerp(imgTranslations[i].y, MathUtils.lineEq(40, -40, winsize.height, 0, relmousepos.y), i === imgsTotal - 1 ? 0.15 : 0.03*i + 0.03);
                imgs[i].style.transform = `translateX(${(imgTranslations[i].x)}px) translateY(${imgTranslations[i].y}px)`;
            };

            lastMousePosition = {x: relmousepos.x, y: relmousepos.y};
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    };

    WebFont.load({
        google: {
            families: ['Righteous']
        },
        active: () => createBlotterText()
    });

    // Preload all the images in the page.
    imagesLoaded(document.querySelectorAll('.content__img'), {background: true}, () => body.classList.remove('loading'));
} 