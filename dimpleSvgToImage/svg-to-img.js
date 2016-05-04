function render(svg, width, height) {
    var c = document.createElement('canvas');
    c.width = width || 500;
    c.height = height || 500;
    document.getElementById('canvas').innerHTML = '';
    document.getElementById('canvas').appendChild(c);
    canvg(c, svg, { log: true, renderCallback: function (dom) {
        var svg = (new XMLSerializer()).serializeToString(dom);
        document.getElementById('svg').innerHTML = svg;
    }});

    var theImage = c.toDataURL('image/png');
    $("#hiddenPng").attr('href', theImage);
    document.getElementById('hiddenPng').click();

}

function renderCustom() {
    var height = 400;
    var width = 600;
    render(document.getElementById('input').value, width, height);
}
