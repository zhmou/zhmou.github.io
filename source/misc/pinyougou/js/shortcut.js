li = document.querySelector('.fr').children[0].children[2]
ul = li.children[1]

li.onmouseover = function () {
    ul.style.display = 'block';
    li.style.backgroundColor = 'white';
}

li.onmouseleave = function () {
    ul.style.display = '';
    li.style.backgroundColor = '';
}