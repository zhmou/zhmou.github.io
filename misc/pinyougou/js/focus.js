let wrapper = document.querySelector('.wrapper');
let dots = document.querySelector('.dots');
wrapper.style.width = wrapper.childElementCount * wrapper.firstElementChild.offsetWidth + 'px';

let minThershold = 0;
let maxThershold = - (wrapper.childElementCount - 1) * wrapper.firstElementChild.offsetWidth;

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

prevButton.addEventListener('click', ()=>{
    const currLeft = parseInt(getComputedStyle(wrapper).left.replace('px', ''));
    if (currLeft != 0) {
        move(wrapper, 700 + currLeft, whichSelected);
    }
})

nextButton.addEventListener('click', ()=>{
    const currLeft = parseInt(getComputedStyle(wrapper).left.replace('px', ''));
    if (currLeft != maxThershold) {
        move(wrapper, -700 + currLeft, whichSelected);
    }
})

let dot = [];
for (let i = 0; i < wrapper.childElementCount; i++) {
    dot[i] = '<li class="dot"></li>';
}

dots.innerHTML = dot.join("");

window.addEventListener('DOMContentLoaded', whichSelected);

function whichSelected() {
    const currLeft = parseInt(getComputedStyle(wrapper).left.replace('px', ''));
    for (let i=0; i < dots.children.length; i++) {
        dots.children[i].classList.remove('selected');
    }
    dots.children[-currLeft / wrapper.firstElementChild.offsetWidth].classList.add('selected');
}

dots.addEventListener('click', e => {
    if (e.target.classList == 'dot') {
        for (let i = 0; i < dots.children.length; i++) {
            if (e.target == dots.children[i]) {
                move(wrapper, -700 * i, whichSelected);
            }
        }
    }
})