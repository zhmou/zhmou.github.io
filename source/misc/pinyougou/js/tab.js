let tab_lists = document.getElementsByClassName('tab_list')
let ul_lists = [];

for (let i = 0; i < tab_lists.length; i++) {
    ul_lists.push(tab_lists[i].querySelector('ul'));
}

let a_lists = [];
let tab_contents = document.getElementsByClassName('tab_content');

for (let j = 0; j < ul_lists.length; j++) {
    a_per_tab = ul_lists[j].getElementsByTagName('a')
    for (let k = 0; k < a_per_tab.length; k++) {
        a_per_tab[k].setAttribute('which_tab', j);
        a_per_tab[k].setAttribute('which_page', k);
        a_per_tab[k].onclick = function () {
            for (let k = 0; k < a_lists[this.getAttribute('which_tab')].length; k++) {
                a_lists[this.getAttribute('which_tab')][k].className = "";
            }
            this.className = "style_red";
            for (let m = 0; m < tab_contents[this.getAttribute('which_tab')].getElementsByClassName('tab_list_item').length; m++) {
                tab_contents[this.getAttribute('which_tab')].getElementsByClassName('tab_list_item')[m].className = 'tab_list_item display_none';
            }
            tab_contents[this.getAttribute('which_tab')].getElementsByClassName('tab_list_item')[this.getAttribute('which_page')].className = 'tab_list_item';
        }
    }
    a_lists.push(a_per_tab)
}






