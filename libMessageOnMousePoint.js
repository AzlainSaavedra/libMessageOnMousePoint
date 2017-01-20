/**
 * Created by Azlain Saavedra on 1/20/2017.
 */
var messageOnMouse = function() {

    $('head').append('<style>.messageBox{position: absolute;' +
        'z-index: 9999999;display: none;' +
        '-webkit-box-shadow: 2px 3px 15px 0px rgba(168, 153, 168, 1);' +
        '-moz-box-shadow: 2px 3px 15px 0px rgba(168, 153, 168, 1);' +
        'box-shadow: 2px 3px 15px 0px rgba(168, 153, 168, 1);' +
        'border-radius: 5px;padding: 15px;' +
        '}' +
        '.btnClose{ position: absolute;' +
        'float: right;' +
        'top: 0px;' +
        'right: 5px;' +
        'color: darkgray;cursor: pointer;' +
        '}</style>');

    function IDGenerator() {

        this.length = 8;
        this.timestamp = +new Date;

        var _getRandomInt = function (min, max) {
            return Math.floor(Math.random() * ( max - min + 1 )) + min;
        }

        this.generate = function () {
            var ts = this.timestamp.toString();
            var parts = ts.split("").reverse();
            var id = "";

            for (var i = 0; i < this.length; ++i) {
                var index = _getRandomInt(0, parts.length - 1);
                id += parts[index];
            }
            return id;
        }
    }


    var generator = new IDGenerator();
    var mousePosX,mousePosY;
    $(document).mousemove(function (e) {
        mousePosX = e.pageX;
        mousePosY = e.pageY;
    });

    function showMessage(type, template, callbackClose, btnClose, timeout ) {
        var idBoxMessage = generator.generate();
        $('message-box').append('<message-' + idBoxMessage + ' class="messageBox"></message-' + idBoxMessage + '>');
        $('message-' + idBoxMessage).html(template);
        if (btnClose) {
            $('message-' + idBoxMessage).append('<div id="btnClose' + idBoxMessage + '" class="btnClose">x</div>');
            $('#btnClose' + idBoxMessage).click(function () {
                $('message-' + idBoxMessage).remove();
                callbackClose
            });
        }

        var anchoPantalla = $(document).width();
        var altoPantalla = $(document).height();
        var anchoDiv = Number($('message-' + idBoxMessage).css('width').replace('px', ''));
        var altoDiv = Number($('message-' + idBoxMessage).css('height').replace('px', ''));
        var sumX = anchoDiv + mousePosX;
        var sumY = altoDiv + mousePosY;

        if (type.toLowerCase() === 'success') {
            $('message-' + idBoxMessage).css('color', '#3c763d');
            $('message-' + idBoxMessage).css('background-color', '#dff0d8');
            $('message-' + idBoxMessage).css('border-color', '#d6e9c6');
        }

        if (type.toLowerCase() === 'info') {
            $('message-' + idBoxMessage).css('color', '#31708f');
            $('message-' + idBoxMessage).css('background-color', '#d9edf7');
            $('message-' + idBoxMessage).css('border-color', '#bce8f1');
        }


        if (type.toLowerCase() === 'warning') {
            $('message-' + idBoxMessage).css('color', '#8a6d3b');
            $('message-' + idBoxMessage).css('background-color', '#fcf8e3');
            $('message-' + idBoxMessage).css('border-color', '#faebcc');
        }


        if (type.toLowerCase() === 'alert') {
            $('message-' + idBoxMessage).css('color', '#a94442');
            $('message-' + idBoxMessage).css('background-color', '#f2dede');
            $('message-' + idBoxMessage).css('border-color', '#ebccd1');
        }

        //$('#spnCursor').html("document width : " + $(document).width() + "/ document height : " + $(document).height() + "/ X Axis : " + mousePosX + "/ Y Axis : " + mousePosY);
        $('message-' + idBoxMessage).css('top', mousePosY + 'px');
        $('message-' + idBoxMessage).css('left', mousePosX + 'px');

        if (sumX > anchoPantalla) {
            $('message-' + idBoxMessage).css('left', (mousePosX - anchoDiv) + 'px');
        }

        if (sumY > altoPantalla) {
            $('message-' + idBoxMessage).css('top', (mousePosY - altoDiv) + 'px');
        }

        $('message-' + idBoxMessage).fadeIn();
        if (timeout) {
            setTimeout(function () {
                $('message-' + idBoxMessage).fadeOut(null,callbackClose);
                $('message-' + idBoxMessage).remove();
            }, timeout)
        } else {
            setTimeout(function () {
                $('message-' + idBoxMessage).fadeOut(null,callbackClose);
                $('message-' + idBoxMessage).remove();
            }, 3000)
        }
    }
    return {
        showMessage: showMessage
    }
}();