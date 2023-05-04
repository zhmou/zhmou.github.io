window.addEventListener('load', function () {
    let i = 0;
    const banner = document.querySelector('.banner_img');
    const dots = document.querySelector('.dots');
    const w = document.querySelector('.focus').offsetWidth;
    const max = dots.children.length;
    const goBack = document.querySelector('.goBack');
    const nav = document.querySelector('.nav');
    console.log(goBack);

    banner.timer = setInterval(banner_timer, 2000);

    banner.addEventListener('transitionend', function () {
        if (i == max) {
            banner.style.transition = '';
            banner.style.transform = '';
            i = 0;
        } else if (i < 0) {
            i = max - 1;
            banner.style.transition = '';
            banner.style.transform = `translateX(${-i * w}px)`;
        }
        dots.querySelector('li.current').classList.remove('current');
        dots.children[i].classList.add('current');
    });

    let startX, moveX = 0;
    banner.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(this.timer);
    });
    banner.addEventListener('touchmove', function (e) {
        moveX = e.targetTouches[0].pageX - startX;
        banner.style.transition = '';
        banner.style.transform = `translateX(${-i * w + moveX}px)`;
        e.preventDefault();
    })

    banner.addEventListener('touchend', function (e) {
        if (Math.abs(moveX) > 50) {
            if (moveX > 0) {
                i--;
            } else {
                i++;
            }
        }
        banner.style.transition = 'all 1s';
        banner.style.transform = `translateX(${-i * w}px)`;
        banner.timer = setInterval(banner_timer, 2000);
    })

    function banner_timer() {
        i++;
        banner.style.transition = 'all 1s';
        banner.style.transform = `translateX(${-i * w}px)`;
    }

    this.document.addEventListener('visibilitychange', function () {
        if (document.hidden && banner.timer) {
            clearInterval(banner.timer);
        } else {
            banner.timer = setInterval(banner_timer, 2000);
        }
    })

    this.addEventListener('scroll', function () {
        if (this.scrollY >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = '';
        }
    });

    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    })
})