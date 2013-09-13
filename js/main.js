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
                this.context.fillStyle = options.fillColor;
                if ( options.fill ) {
                    this.context.lineTo(options.x, options.y);
                    this.context.closePath();
                    this.context.fill();
                }
                this.context.strokeStyle = options.color;
                this.context.stroke();
            },
            pie : function (options) {
                //If not 100% starting angle is 1.5
                var startAngle = options.percentage === 1 ? 0 : 1.5;
                var endAngle = options.percentage * 2 + 1.5;
                var x = options.x;
                var y = options.y;
                var radius = options.radius;
                var color = options.color;
                this.circle({
                    'x' : x,
                    'y' : y,
                    'radius' : radius,
                    'startAngle' : startAngle,
                    'endAngle' : endAngle,
                    'fillColor' : color,
                    'color' : color,
                    'fill' : true
                });
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



    //Generate some bullshit JSON
    var generateCourse = function () {
        var modules = 41;
        var courseJSON = {};
        var videoTitles = ['What to eat?', 'What not to eat?', 'Kale Party', 'Joshua talks about Joshua', 'Green stuff'];
        var audioTitles = ['Health Foods', 'Bad Foods', 'Green Foods', 'Yellow Foods', 'Joshua talks about other people talking about Joshua', 'What eating kale sounds like'];
        var assignmentTitles = ['Exercise for a week', 'Don\'t eat for a month', 'Eat kale for a week', 'Do a headstand', 'Take a picture of something you ate', 'Talk to someone about Joshua'];
        var quizTitles = ['Quiz 1 - About Joshua', 'Quiz 2 - Foods you can eat', 'Quiz 3 - Foods you shouldn\'t eat', 'Quiz 4 - All about juices'];
        var activityTypes = ['Test', 'Quiz', 'Video', 'Audio', 'Assignment'];
        var currNodeId = 1;
        var currTest = 1;

        var buildActivities = function () {
            var numberOfActivities = 4 + Math.ceil(6 * Math.random());
            var activities = [];
            for ( var i = 0; i < numberOfActivities; i++ ) {
                var thisActivity = Math.floor(Math.random() * 4);
                var thisPercentage = Math.floor(Math.random() * 101);
                var thisTitle = '';
                switch ( thisActivity ) {
                    case 0 :
                        thisTitle = 'Test ' + currTest;
                        currTest++;
                        break;
                    case 1 :
                        thisTitle = quizTitles[Math.floor(Math.random() * quizTitles.length)];
                        break;
                    case 2 :
                        thisTitle = videoTitles[Math.floor(Math.random() * videoTitles.length)];
                        break;
                    case 3 :
                        thisTitle = audioTitles[Math.floor(Math.random() * audioTitles.length)];
                        break;
                    case 4 :
                        thisTitle = assignmentTitle[Math.floor(Math.random() * assignmentTitles.length)];
                        break;
                    default:
                        break;
                }
                var thisNodeId = currNodeId;
                currNodeId++;
                activities.push({
                    'nodeId' : thisNodeId,
                    'type' : activityTypes[thisActivity],
                    'title' : thisTitle,
                    'complete' : thisPercentage
                });
            }
            return activities;
        };

        for ( var i = 1; i < modules; i++ ) {
            courseJSON[i] = {
                'title' : 'Module ' + i,
                'complete' : 0,
                'time' : Math.ceil(16 * Math.random()) + 'h : ' + Math.ceil(Math.random() * 60) + 'm',
                'activities' : buildActivities()
            }

            var numActivities = courseJSON[i].activities;
            var percentFinished = 0;
            for ( var k= 0; k < numActivities.length; k++ ) {
                percentFinished += parseInt(numActivities[k].complete, 10);
            }
            courseJSON[i].complete = parseInt(percentFinished, 10) / parseInt(numActivities.length, 10);

        }

        console.log(courseJSON);
        return courseJSON;

    };

    var thisCourse = generateCourse();

    myTimeline.draw.init(canvas);
    myTimeline.draw.setHeightAndWidth({
        'width' : 1000,
        'height' : 1000
    })
    myTimeline.draw.line({
        'x' : 20,
        'y' : 20,
        'endPoints' : [430, 330],
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
        'icon' : 'video',
        'color' : 'black'
    });
    myTimeline.draw.pie({
        'x' : 300,
        'y' : 145,
        'color' : 'orange',
        'radius' : 150,
        'percentage' : .90
    });

})();