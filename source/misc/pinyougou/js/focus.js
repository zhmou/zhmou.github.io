let carouselFlag = false;
let wrapper = document.querySelector('.wrapper');
wrapper.appendChild(wrapper.children[0].cloneNode(true));
let dots = document.querySelector('.dots');
let current = 0;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
for (let i = 0; i < wrapper.childElementCount - 1; i++) {
    let li = document.createElement('li');
    li.classList.add('dot');
    li.setAttribute('data-index', i);
    li.addEventListener('click', function () {
        if (!carouselFlag) {
            carouselFlag = true;
            for (let j = 0; j < dots.children.length; j++) {
                dots.children[j].classList.remove('selected');
            }
            this.classList.add('selected');
            move(wrapper, - li.getAttribute('data-index') * wrapper.firstElementChild.offsetWidth, function () {
                carouselFlag = false;
            });
            current = parseInt(li.getAttribute('data-index'));
        }
    })
    dots.appendChild(li);
}
dots.children[0].classList.add('selected');
wrapper.style.width = wrapper.childElementCount * wrapper.firstElementChild.offsetWidth + 'px';
let timer = setInterval(() => {
    nextButton.click();
}, 2000);

wrapper.addEventListener('mouseenter', () => {
    clearInterval(timer)
})

wrapper.addEventListener('mouseleave', () => {
    timer = setInterval(() => {
        nextButton.click();
    }, 2000);
})


prevButton.addEventListener('click', function () {
    if (!carouselFlag) {
        carouselFlag = true;
        if (current == 0) {
            wrapper.style.left = - (wrapper.childElementCount - 1) * wrapper.firstElementChild.offsetWidth + 'px';
            current = wrapper.childElementCount - 1;
        }
        current = current - 1;
        for (let i = 0; i < dots.children.length; i++) {
            dots.children[i].classList.remove('selected');
        }
        move(wrapper, - current * wrapper.firstElementChild.offsetWidth, function () {
            carouselFlag = false;
        });
        if (current == wrapper.childElementCount - 1) {
            current = 0;
        }
        dots.children[current].classList.add('selected');
    }
});

nextButton.addEventListener('click', function () {
    if (!carouselFlag) {
        carouselFlag = true;
        if (current == 0) {
            wrapper.style.left = '0px';
        }
        current = current + 1;
        for (let i = 0; i < dots.children.length; i++) {
            dots.children[i].classList.remove('selected');
        }
        move(wrapper, - current * wrapper.firstElementChild.offsetWidth, function () {
            carouselFlag = false;
        });
        if (current == wrapper.childElementCount - 1) {
            current = 0;
        }
        dots.children[current].classList.add('selected');
    }
});