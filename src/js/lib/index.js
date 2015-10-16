function bom() {
	var t, l, w, h;
	t = document.documentElement.scrollTop;
	l = document.documentElement.scrollLeft;
	w = document.documentElement.clientWidth;
	h = document.documentElement.clientHeight;
//    console.log(document.documentElement);
	return { top: t, left: l, width: w, height: h }
}

function client(p) {
    var t, l, w, h;
    w = p.clientWidth;
    h = p.clientHeight;
    t = p.offsetTop - document.body.scrollTop;
    l = p.offsetLeft - document.body.scrollLeft;
//    console.log(p.offsetTop - document.body.scrollTop);
    return { top: t, left: l, width: w, height: h }
}

function case1(p1, p2) {
    if(p1.height - p2.top > 0) {
        console.log('loading');
    }
}

window.onload = function() { 
    var div = document.getElementById('div');
	window.onscroll = function() {
        case1(bom(), client(div));
	}
}