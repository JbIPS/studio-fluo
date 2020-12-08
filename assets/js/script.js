(function () {
    'use strict';



    // Sticky Menu
    window.onscroll = function () {
        const distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 100,
            header = document.querySelector(".navigation");
        if (distanceY > shrinkOn) {
            header.classList.add("nav-bg");
        } else {
            header.classList.remove("nav-bg");
        }
    };

    /* ########################################### hero parallax ############################################## */
    window.onload = function () {
        var parallaxBox = document.getElementById('parallax');
        if(!parallaxBox) return;

        const elements = [];
        let i = 2;
        let elemExist = true;
        const offsets = [25, 20, 35, 30, 45, 30, 25, 40];
        while(elemExist) {
            const id = `l${i}`;
            const el = document.getElementById(id);
            i += 1;
            if(!el) elemExist = false
            else elements.push({
                id,
                left: el.offsetLeft,
                top: el.offsetTop
            });
        }

        parallaxBox.onmousemove = function (event) {
            event = event || window.event;
            var x = event.clientX - parallaxBox.offsetLeft,
                y = event.clientY - parallaxBox.offsetTop;

            elements.forEach((el, index) => {
                mouseParallax(el.id, el.left, el.top, x, y, offsets[index % offsets.length]);
            })
        };

    };

    function mouseParallax(id, left, top, mouseX, mouseY, speed) {
        var obj = document.getElementById(id);
        var parentObj = obj.parentNode,
            containerWidth = parseInt(parentObj.offsetWidth),
            containerHeight = parseInt(parentObj.offsetHeight);
        obj.style.left = left - (((mouseX - (parseInt(obj.offsetWidth) / 2 + left)) / containerWidth) * speed) + 'px';
        obj.style.top = top - (((mouseY - (parseInt(obj.offsetHeight) / 2 + top)) / containerHeight) * speed) + 'px';
    }
    /* ########################################### /hero parallax ############################################## */

    // Shuffle js filter and masonry
    const shuffleWrapper = document.querySelector('.shuffle-wrapper');
    if(shuffleWrapper) {
        var Shuffle = window.Shuffle;
        var jQuery = window.jQuery;

        const selectFilter = function(category) {
            const cat = category === "" ? "all" : category;
            const el = document.querySelector(`input[name="shuffle-filter"][value="${cat}"]`)
            if(el) {
                el.checked = true;
                el.parentElement.classList.add("active");
            }
        }

        const category = decodeURI(window.location.hash.substr(1));
        selectFilter(category);

        var myShuffle = new Shuffle(shuffleWrapper, {
            itemSelector: '.shuffle-item',
            buffer: 1,
            group: category || Shuffle.ALL_ITEMS
        });

        const filters = document.querySelectorAll('input[name="shuffle-filter"]');
        filters.forEach(input => {
            input.oninput = (e) => {
                const input = e.currentTarget;
                if (input.checked) {
                    myShuffle.filter(input.value);
                    window.location.hash = input.value
                }
               }
        })
    }

})();