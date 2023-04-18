let block = document.querySelector(".fangdajing");
let preview_img = document.querySelector(".preview_img");
let big = document.querySelector(".big");
let bigImg = big.firstElementChild;

preview_img.addEventListener('mouseover', e => {
    block.style.display = 'block';
    big.style.display = 'block';
})

preview_img.addEventListener('mouseleave', e => {
    block.style.display = 'none';
    big.style.display = 'none';
})

preview_img.addEventListener('mousemove', block_move)

function block_move (e) {
    let left = e.pageX - this.offsetLeft - 100;
    if (left < 0) {
        left = 0;
    } else if (left >= 149) {
        left = 149;
    }

    let top = e.pageY - this.offsetTop - 100;
    if (top < 0) {
        top = 0;
    } else if (top >149) {
        top = 149;
    }
    block.style.left = left + 'px';
    block.style.top = top + 'px';
    bigImg.style.left = - 2 *left + 'px';
    bigImg.style.top = - 2 * top + 'px';
}