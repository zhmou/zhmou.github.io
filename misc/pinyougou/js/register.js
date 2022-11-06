let phoneNumber = document.getElementById('tel');
let smsCode = document.getElementById('sms_code');
let pwd = document.getElementById('password');
let confirm_pwd = document.getElementById('confirm_pwd');
let span = document.getElementsByTagName('span');
let btn = document.querySelector('button');
let checkbox = document.querySelector('#ag');

phoneNumber.onkeyup = function () {
    this.value = this.value.replace(/\D/g, '')
    if (/^1\d{10}$/.test(this.value)) {
        span[0].innerHTML = "<i class='success_icon'></i> 手机号输入正确";
        span[0].className = "success";
    }
    else if (!/^1\d{10}$/.test(this.value) && this.value.length != 0) {
        span[0].innerHTML = "<i class='error_icon'></i> 手机号输入错误";
        span[0].className = "error";
    }
    else if (this.value.length == 0) {
        span[0].innerHTML = "<i class='info_icon'></i> 请输入11位中国大陆手机号";
        span[0].className = "info";
    }
    checkStatus();
}

smsCode.onkeyup = function () {
    this.value = this.value.replace(/\D/g, '')
    if (this.value.length == 6) {
        span[1].innerHTML = "<i class='success_icon'></i> 验证码输入正确";
        span[1].className = "success";
    }
    checkStatus();
}

pwd.onkeyup = function () {
    if (this.value.length < 8 && this.value.length > 0) {
        span[2].innerHTML = "<i class='error_icon'></i> 密码长度不足";
        span[2].className = "error";
    }
    else if (this.value.length == 0) {
        span[2].innerHTML = "<i class='info_icon'></i> 请输入长度为8~16位的密码（包含大写英文字母、小写英文字母和数字）"
        span[2].className = "info";
    }
    else if (/^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,}$/.test(this.value)) {
        span[2].innerHTML = "<i class='success_icon'></i> 密码输入成功";
        span[2].className = "success";
    }
    else {
        span[2].innerHTML = "<i class='error_icon'></i> 密码不满足要求，请重新输入";
        span[2].className = "error";
    }
    checkStatus();
}

confirm_pwd.onkeyup = function () {
    if (this.value.length = 0) {
        span[3].innerHTML = "<i class='info_icon'></i> 请重复输入的密码";
        span[3].className = "info";
    }
    if (this.value != pwd.value) {
        span[3].innerHTML = "<i class='error_icon'></i> 两次密码输入不一致，请重新输入";
        span[3].className = "error";
    } else {
        span[3].innerHTML = "<i class='success_icon'></i> 两次密码输入相同";
        span[3].className = "success";
    }
    checkStatus();
}

checkbox.onchange = function () {
    checkStatus();
}

function checkStatus() {
    let status;
    if (checkbox.checked == true) {
        status = true;
        for (let i = 0; i < span.length; i++) {
            if (span[i].className != "success") {
                status = false;
            }
        }
    } else status = false;
    btn.disabled = !status;
}