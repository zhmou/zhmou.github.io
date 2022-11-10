let body = document.body;
let keys = document.getElementsByClassName('key');
let textArea = document.getElementById('Keylog');
body.addEventListener('keydown', keydown_listener);
body.addEventListener('keyup', keyup_listener);

function keydown_listener(e) {
    e.preventDefault();
    let ele;
    ele = document.getElementById(e.code);
    if (ele.className.indexOf(' active') === -1) {
        ele.className += ' active';
    }

    textArea.value = time() + '你按下了' + e.code + '键\n' + textArea.value;
    ele.querySelector('.before').style.background = "linear-gradient(90deg, #f90, #fc8)";
}

function keyup_listener(e) {
    e.preventDefault();
    let ele;
    ele = document.getElementById(e.code);
    ele.className = ele.className.replace(' active', '');
    textArea.value = time() + '你松开了' + e.code + '键\n' + textArea.value;
    ele.querySelector('.before').style.background = "linear-gradient(90deg, #fff888, #fffbbb)";
}

function time() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    if (m < 10) {
        m = '0' + m;
    }
    let s = date.getSeconds();
    if (s < 10) {
        s = '0' + s;
    }
    let ms = date.getMilliseconds();
    return h + ':' + m + ':' + s + '.' + ms + '\t';
}