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
 
 $(function() {
    var isMobile = window.matchMedia("only screen and (max-width: 768px)");
    var moveForce = 30; // max popup movement in pixels
    var rotateForce = 5; // max popup rotation in deg
    $(".wrap").mousemove(function(e) {
      var docX = $(this).outerWidth();
      var docY = $(this).outerHeight();
  
      var moveX = (e.pageX - docX / 2) / (docX / 2) * -moveForce;
      var moveY = (e.pageY - docY / 2) / (docY / 2) * -moveForce;
  
      var rotateY = (e.pageX / docX * rotateForce * 2) - rotateForce;
      var rotateX = -((e.pageY / docY * rotateForce * 2) - rotateForce);
  
      $('.wrap').css({
        '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
      });
    });
    if (isMobile.matches) {
      function onDeviceMotion(event) {
        rotateForce = 10; // max popup rotation in deg
        var accel = event.accelerationIncludingGravity;
  
        var docX = $(this).outerWidth();
        var docY = $(this).outerHeight();
  
        var accelX = ((accel.x + 10) / 20) * docX;
        var accelY = ((accel.y + 10) / 20) * docY;
  
        var moveX = (accelX - docX) / (docX) * -moveForce;
        var moveY = (accelY - docY) / (docY) * -moveForce;
  
        var rotateY = -((accelX / docX * rotateForce * 2) - rotateForce);
        var rotateX = -((accelY / docY * rotateForce * 2) - rotateForce);
  
        $('.').css({
          '-moz-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
          '-webkit-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
          '-ms-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
          '-o-transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
          'transform': 'rotateX(' + rotateX + 'deg' + ') rotateY(' + rotateY + 'deg' + ') translateZ(0)',
        });
      };
      window.addEventListener("devicemotion", onDeviceMotion, false);
    }
  });
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

    let mousePos = {x: winsize.width/2, y: winsize.height/2};
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