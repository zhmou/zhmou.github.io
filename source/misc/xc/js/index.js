window.onload = function () {
    let i = 0;
    const banner = document.querySelector('.banner_img');
    const dots = document.querySelector('.dots');
    const w = document.querySelector('.focus').offsetWidth;
    const max = dots.children.length;
    banner.timer = setInterval(function () {
        i++;
        banner.style.transition = 'all 1s';
        banner.style.transform = `translateX(${-i * w}px)`;
    }, 2000);

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
    })
}