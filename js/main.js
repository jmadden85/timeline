(function () {

    var timeline = {

        //The draw object will contain methods for everything we need to draw
        'draw' : {
            //Initialize
            init : function (canvas) {
                this.canvas = canvas;
                this.context = this.canvas.getContext('2d');
            },
            setHeightAndWidth : function (options) {
                this.canvas.setAttribute('width', options.width);
                this.canvas.setAttribute('height', options.height);
            },
            circle : function (options) {
                var startAngle = options.startAngle * Math.PI;
                var endAngle = options.endAngle * Math.PI;
                this.context.beginPath();
                this.context.arc(options.x, options.y, options.radius, startAngle, endAngle, false);
                this.context.lineWidth = options.lineWidth;
                this.context.strokeStyle = options.color;
                this.context.stroke();
            },
            line : function (options) {
                this.context.beginPath();
                this.context.moveTo(options.x, options.y);
                this.context.lineTo(options.endPoints[0], options.endPoints[1]);
                this.context.strokeStyle = options.color;
                this.context.lineWidth = options.lineWidth;
                this.context.stroke();
            },
            text : function (options) {
                var fontFace = options.fontFace || 'nexaLight';
                var fontSize = options.fontSize || '14px';
                var fontStyle = options.fontStyle || 'normal';
                var fontFamily = fontStyle + ' ' + fontSize + ' ' + fontFace;
                var fontText = options.text;
                var x = options.x;
                var y = options.y;
                console.log(options);
                this.context.font = fontFamily;
                this.context.fillStyle = options.color;
                this.context.fillText(options.text, x, y);
            },
            textBox : function (options) {
                var rectWidth = options.width;
                var rectHeight = options.height;
                var x = options.x;
                var y = options.y;
                var cornerRadius = options.radius;

                this.context.beginPath();
                this.context.moveTo(x + cornerRadius, y);
                this.context.lineTo(x + rectWidth - cornerRadius, y);
                this.context.arcTo(x + rectWidth, y, x + rectWidth, y + cornerRadius, cornerRadius);
                this.context.lineTo(x + rectWidth, y + rectHeight - cornerRadius);
                this.context.arcTo(x + rectWidth, y + rectHeight, x + rectWidth - cornerRadius, y + rectHeight, cornerRadius);
                this.context.lineTo(x + cornerRadius, y + rectHeight);
                this.context.arcTo(x, y + rectHeight,  x, y + rectHeight - cornerRadius, cornerRadius);
                this.context.lineTo(x, y + cornerRadius);
                this.context.arcTo(x, y, x + cornerRadius, y, cornerRadius);

                this.context.strokeStyle = options.color;
                this.context.lineWidth = options.lineWidth;
                this.context.stroke();
            },
            icon : function (options) {
                var icon;
                console.log(options);
                switch ( options.icon ) {
                    case 'video' :
                        icon = '\uF03D';
                        break;
                    case 'audio' :
                        icon = '\uF028';
                        break;
                    case 'clipboard' :
                        icon = '\uF046';
                        break;
                    case 'star' :
                        icon = '\uF005';
                        break;
                    case 'chat' :
                        icon = '\uF0E6';
                        break;
                    case 'lock' :
                        icon = '\uF023';
                        break;
                    case 'paper' :
                        icon = '\uF016';
                        break;
                    default :
                        break;
                }
                this.text({
                    'fontFace' : 'FontAwesome',
                    'color' : options.color,
                    'x' : options.x,
                    'y' : options.y,
                    'fontSize' : options.fontSize,
                    'text' : icon
                })
            }
        },
        //The module object will contain methods to create everything a module has
        'module' : {
            create : function () {

            },
            createActivity : function () {

            },
            createTest : function () {

            },
            createQuiz : function () {

            },
            createAssignment : function () {

            },
            createDiscussion : function () {

            },
            createSlides : function () {

            },
            createAudio : function () {

            }
        }
    };
    //End timeline

    var myTimeline = Object.create(timeline);
    var canvas = document.getElementById('timeline');
    myTimeline.draw.init(canvas);
    myTimeline.draw.setHeightAndWidth({
        'width' : 1000,
        'height' : 1000
    })
    myTimeline.draw.line({
        'x' : 20,
        'y' : 20,
        'endPoints' : [430, 130],
        'lineWidth' : 7,
        'color' : 'blue'
    });
    myTimeline.draw.circle({
        'x' : 320,
        'y' : 320,
        'startAngle' : 0,
        'endAngle' : 2,
        'radius' : 150,
        'lineWidth' : 10,
        'color' : 'red'
    });
    myTimeline.draw.textBox({
        'x' : 150,
        'y' : 150,
        'height' : 600,
        'width' : 700,
        'radius' : 25,
        'lineWidth' : 15,
        'color' : 'green'
    });
    myTimeline.draw.text({
        'x' : 200,
        'y' : 200,
        'fontSize' : '75px',
        'color' : 'orange',
        'text' : 'Testing if this works.'
    });
    myTimeline.draw.icon({
        'x' : 50,
        'y' : 50,
        'fontSize' : '50px',
        'icon' : 'lock',
        'color' : 'black'
    });

})();