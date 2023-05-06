function move(obj, target, callback) {
    if (!obj.timer) {
        obj.timer = setInterval(() => {
            let step = (target - obj.offsetLeft) / 15;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            obj.style.left = obj.offsetLeft + step + 'px';
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                delete obj.timer;
                if (callback) {
                    callback();
                }
            }
        }, 10);
    }
}