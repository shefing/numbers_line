/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};    fonts['Alef']='<link rel=\"stylesheet\" href=\"ALef-Webfont-v2/alef-webfont.css\" type=\"text/css\" charset=\"utf-8\" />';
    fonts['Lateef']='<link rel=\"stylesheet\" href=\"Lateef-Webfont-v2/stylesheet.css\" type=\"text/css\" charset=\"utf-8\" />';

var opts = {};
var resources = [
];
var symbols = {
"stage": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
            {
                id: 'BG',
                type: 'rect',
                rect: ['0%', '0%','100%','100%','auto', 'auto'],
                fill: ["rgba(97,102,108,1)"],
                stroke: [0,"rgb(255, 255, 255)","solid"]
            },
            {
                id: 'question',
                type: 'rect',
                rect: ['2.3%', '15.1%','95.4%','23%','auto', 'auto'],
                userClass: "title"
            },
            {
                id: 'hint50',
                type: 'rect',
                rect: ['92%', '88.2%','5.8%','9.6%','auto', 'auto'],
                cursor: ['pointer'],
                userClass: "edge-btn hint-50"
            },
            {
                id: 'hintReplace',
                type: 'rect',
                rect: ['85%', '88.2%','auto','auto','auto', 'auto'],
                cursor: ['pointer'],
                userClass: "edge-btn hint-replace"
            },
            {
                id: 'hintTime',
                type: 'rect',
                rect: ['78%', '88.2%','5.8%','9.6%','auto', 'auto'],
                cursor: ['pointer'],
                userClass: "edge-btn hint-time"
            },
            {
                id: 'timer',
                type: 'rect',
                rect: ['90.1%', '1.3%','7.7%','12.2%','auto', 'auto'],
                userClass: "timer",
                transform: [[],[],[],['1.06061','1.06061']]
            },
            {
                id: 'option1',
                type: 'rect',
                rect: ['2.3%', '38.7%','95.4%','11.7%','auto', 'auto'],
                userClass: "option"
            },
            {
                id: 'option2',
                type: 'rect',
                rect: ['2.3%', '50.7%','auto','auto','auto', 'auto'],
                userClass: "option"
            },
            {
                id: 'option3',
                type: 'rect',
                rect: ['2.3%', '62.8%','auto','auto','auto', 'auto'],
                userClass: "option"
            },
            {
                id: 'option4',
                type: 'rect',
                rect: ['2.3%', '74.8%','auto','auto','auto', 'auto'],
                userClass: "option"
            },
            {
                id: 'score',
                type: 'rect',
                rect: ['2.3%', '4.1%','auto','auto','auto', 'auto'],
                userClass: "score"
            },
            {
                id: 'feedback',
                display: 'none',
                type: 'rect',
                rect: ['0%', '0%','100%','100%','auto', 'auto'],
                userClass: "feedback-he"
            },
            {
                id: 'feedback_AR',
                display: 'none',
                type: 'rect',
                rect: ['0%', '0%','auto','auto','auto', 'auto'],
                userClass: "feedback-ar"
            },
            {
                id: 'btnRestart',
                type: 'rect',
                rect: ['9.3%', '88%','5.8%','9.6%','auto', 'auto'],
                cursor: ['pointer'],
                userClass: "edge-btn btn-restart"
            },
            {
                id: 'progres',
                type: 'rect',
                rect: ['33.3%', '5.7%','auto','auto','auto', 'auto'],
                userClass: "progress"
            },
            {
                id: 'opening',
                type: 'rect',
                rect: ['0%', '0%','100%','100%','auto', 'auto'],
                userClass: "welcome-screen"
            },
            {
                id: 'opening_teacher',
                display: 'none',
                type: 'rect',
                rect: ['0px', '1px','auto','auto','auto', 'auto'],
                userClass: "student-not-played-yet-he"
            },
            {
                id: 'opening_teacher_AR',
                display: 'none',
                type: 'rect',
                rect: ['0px', '1px','auto','auto','auto', 'auto'],
                userClass: "student-not-played-yet-ar"
            },
            {
                id: 'mute',
                type: 'rect',
                rect: ['2.3%', '88%','5.8%','9.6%','auto', 'auto'],
                userClass: "mute"
            }],
            symbolInstances: [
            {
                id: 'score',
                symbolName: 'score',
                autoPlay: {

                }
            },
            {
                id: 'opening_teacher',
                symbolName: 'opening_teacher',
                autoPlay: {

                }
            },
            {
                id: 'option3',
                symbolName: 'option',
                autoPlay: {

                }
            },
            {
                id: 'hintReplace',
                symbolName: 'hintReplace',
                autoPlay: {

                }
            },
            {
                id: 'mute',
                symbolName: 'mute',
                autoPlay: {

                }
            },
            {
                id: 'btnRestart',
                symbolName: 'btnRestart',
                autoPlay: {

                }
            },
            {
                id: 'opening_teacher_AR',
                symbolName: 'opening_teacher_AR',
                autoPlay: {

                }
            },
            {
                id: 'opening',
                symbolName: 'opening',
                autoPlay: {

                }
            },
            {
                id: 'progres',
                symbolName: 'progres',
                autoPlay: {

                }
            },
            {
                id: 'question',
                symbolName: 'question',
                autoPlay: {

                }
            },
            {
                id: 'feedback',
                symbolName: 'feedback',
                autoPlay: {

                }
            },
            {
                id: 'feedback_AR',
                symbolName: 'feedback_AR',
                autoPlay: {

                }
            },
            {
                id: 'hintTime',
                symbolName: 'hintTime',
                autoPlay: {

                }
            },
            {
                id: 'option1',
                symbolName: 'option',
                autoPlay: {

                }
            },
            {
                id: 'timer',
                symbolName: 'timer',
                autoPlay: {

                }
            },
            {
                id: 'option4',
                symbolName: 'option',
                autoPlay: {

                }
            },
            {
                id: 'option2',
                symbolName: 'option',
                autoPlay: {

                }
            },
            {
                id: 'hint50',
                symbolName: 'hint50',
                autoPlay: {

                }
            }
            ]
        },
    states: {
        "Base State": {
            "${_opening}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_option4}": [
                ["style", "top", '74.79%']
            ],
            "${_hint50}": [
                ["style", "top", '88.15%'],
                ["style", "height", '9.63%'],
                ["style", "left", '91.98%'],
                ["style", "cursor", 'pointer'],
                ["style", "width", '5.82%']
            ],
            "${_question}": [
                ["style", "height", '22.96%'],
                ["style", "top", '15.14%'],
                ["style", "width", '95.35%']
            ],
            "${_feedback_AR}": [
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ],
            "${_hintTime}": [
                ["style", "top", '88.15%'],
                ["style", "height", '9.63%'],
                ["style", "left", '78.02%'],
                ["style", "cursor", 'pointer'],
                ["style", "width", '5.82%']
            ],
            "${_feedback}": [
                ["style", "display", 'none'],
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_mute}": [
                ["style", "height", '9.63%'],
                ["style", "width", '5.82%']
            ],
            "${_score}": [
                ["style", "left", '2.33%'],
                ["style", "top", '4.07%']
            ],
            "${_timer}": [
                ["style", "top", '1.29%'],
                ["transform", "scaleY", '1.06061'],
                ["transform", "scaleX", '1.06061'],
                ["style", "height", '12.22%'],
                ["style", "left", '90.12%'],
                ["style", "width", '7.69%']
            ],
            "${_option3}": [
                ["style", "top", '62.75%']
            ],
            "${_opening_teacher}": [
                ["style", "top", '1px'],
                ["style", "left", '0px'],
                ["style", "display", 'none']
            ],
            "${_progres}": [
                ["style", "left", '33.26%'],
                ["style", "top", '5.74%']
            ],
            "${_option1}": [
                ["style", "height", '11.67%'],
                ["style", "top", '38.73%'],
                ["style", "width", '95.35%']
            ],
            "${_btnRestart}": [
                ["style", "top", '87.96%'],
                ["style", "height", '9.63%'],
                ["style", "left", '9.3%'],
                ["style", "cursor", 'pointer'],
                ["style", "width", '5.82%']
            ],
            "${_Stage}": [
                ["color", "background-color", 'rgba(255,255,255,0.00)'],
                ["style", "width", '860px'],
                ["style", "height", '540px'],
                ["style", "overflow", 'hidden']
            ],
            "${_hintReplace}": [
                ["style", "top", '88.15%'],
                ["style", "left", '85%'],
                ["style", "cursor", 'pointer']
            ],
            "${_opening_teacher_AR}": [
                ["style", "top", '1px'],
                ["style", "left", '0px'],
                ["style", "display", 'none']
            ],
            "${_option2}": [
                ["style", "top", '50.72%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1000,
            autoPlay: true,
            timeline: [
                { id: "eid1013", tween: [ "style", "${_feedback}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1010", tween: [ "style", "${_opening_teacher}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1012", tween: [ "style", "${_feedback_AR}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1011", tween: [ "style", "${_opening_teacher_AR}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 }            ]
        }
    }
},
"BG": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    tag: 'img',
                    id: 'trivia_bg',
                    userClass: 'img',
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_bg.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_bg}": [
                ["style", "left", '0%'],
                ["style", "top", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"question": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    id: 'Rectangle',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'rect',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    userClass: 'text',
                    rect: ['3.3%', '16.1%', '94.4%', '67.7%', 'auto', 'auto'],
                    type: 'text',
                    align: 'right',
                    id: 'Text',
                    text: 'לפניכם המצאות שונות בתחום החקלאות שנועדו לסייע לגידול היבולים תנאים הסביבתיים המיוחדים של הנגב. עמדו עם העכבר על התמונה, קראו את התיאור לכל המצאה מסייעת לפתור',
                    cursor: ['default'],
                    font: ['Alef', [156.25, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_Rectangle}": [
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["color", "background-color", 'rgba(51,56,59,1.00)']
            ],
            "${_Text}": [
                ["style", "line-height", '108%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "left", '3.28%'],
                ["style", "font-size", '156.25%'],
                ["style", "top", '16.13%'],
                ["style", "cursor", 'default'],
                ["style", "text-indent", '0%'],
                ["style", "height", '67.74%'],
                ["style", "font-family", 'Alef'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '94.4%']
            ],
            "${symbolSelector}": [
                ["style", "height", '22.96%'],
                ["style", "width", '95.35%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"score": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '-2.7%', '100%', '100%', 'auto', 'auto'],
                    id: 'trivia_scoreBg',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_scoreBg.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    userClass: 'text ltr',
                    rect: ['9.3%', '0%', '90.1%', '89.2%', 'auto', 'auto'],
                    type: 'text',
                    align: 'left',
                    id: 'Text',
                    text: '835',
                    cursor: ['default'],
                    font: ['Arial, Helvetica, sans-serif', [193.75, '%'], 'rgba(255,255,255,1)', 'normal', 'none', 'normal']
                },
                {
                    rect: ['7.3%', '46%', '86.1%', '5.4%', 'auto', 'auto'],
                    id: 'topLine',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(51,56,59,1)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_Text}": [
                ["style", "letter-spacing", '0.59em'],
                ["style", "left", '9.32%'],
                ["style", "width", '90.05%'],
                ["style", "top", '-0.05%'],
                ["style", "text-align", 'left'],
                ["style", "text-indent", '0%'],
                ["style", "height", '89.23%'],
                ["style", "cursor", 'default'],
                ["style", "word-spacing", '0em'],
                ["style", "font-size", '193.75%']
            ],
            "${symbolSelector}": [
                ["style", "height", '6.85%'],
                ["style", "width", '12.56%']
            ],
            "${_trivia_scoreBg}": [
                ["style", "top", '-2.7%'],
                ["style", "left", '0%'],
                ["style", "height", '100%']
            ],
            "${_topLine}": [
                ["style", "height", '5.41%'],
                ["style", "top", '46.01%'],
                ["style", "left", '7.31%'],
                ["style", "width", '86.12%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"progressCurrent": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    transform: [],
                    tag: 'img',
                    id: 'trivia_progresCurrent',
                    type: 'image',
                    rect: ['0%', '0%', '25px', '18px', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresCurrent.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_progresCurrent}": [
                ["style", "-webkit-transform-origin", [54,50], {valueTemplate:'@@0@@% @@1@@%'} ],
                ["style", "-moz-transform-origin", [54,50],{valueTemplate:'@@0@@% @@1@@%'}],
                ["style", "-ms-transform-origin", [54,50],{valueTemplate:'@@0@@% @@1@@%'}],
                ["style", "msTransformOrigin", [54,50],{valueTemplate:'@@0@@% @@1@@%'}],
                ["style", "-o-transform-origin", [54,50],{valueTemplate:'@@0@@% @@1@@%'}],
                ["transform", "scaleY", '1'],
                ["style", "top", '0.26%'],
                ["style", "height", '18px'],
                ["transform", "scaleX", '1'],
                ["style", "left", '114.03%'],
                ["style", "width", '25px']
            ],
            "${symbolSelector}": [
                ["style", "height", '18px'],
                ["style", "width", '25px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 500,
            autoPlay: false,
            timeline: [
                { id: "eid610", tween: [ "style", "${_trivia_progresCurrent}", "top", '26.89%', { fromValue: '0.26%'}], position: 0, duration: 250 },
                { id: "eid611", tween: [ "style", "${_trivia_progresCurrent}", "top", '0.26%', { fromValue: '26.89%'}], position: 250, duration: 250 },
                { id: "eid570", tween: [ "style", "${_trivia_progresCurrent}", "left", '76.87%', { fromValue: '114.03%'}], position: 0, duration: 250 },
                { id: "eid578", tween: [ "style", "${_trivia_progresCurrent}", "left", '0%', { fromValue: '76.87%'}], position: 250, duration: 250 },
                { id: "eid663", tween: [ "style", "${_trivia_progresCurrent}", "height", '9px', { fromValue: '18px'}], position: 0, duration: 250 },
                { id: "eid664", tween: [ "style", "${_trivia_progresCurrent}", "height", '18px', { fromValue: '9px'}], position: 250, duration: 250 },
                { id: "eid661", tween: [ "style", "${_trivia_progresCurrent}", "width", '12px', { fromValue: '25px'}], position: 0, duration: 250 },
                { id: "eid662", tween: [ "style", "${_trivia_progresCurrent}", "width", '25px', { fromValue: '12px'}], position: 250, duration: 250 }            ]
        }
    }
},
"error": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'image',
                    id: 'trivia_progresEror',
                    tag: 'img',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresEror.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_progresEror}": [
                ["style", "top", '0%'],
                ["style", "left", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"right": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'image',
                    id: 'trivia_progresRight',
                    tag: 'img',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresRight.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_progresRight}": [
                ["style", "top", '0%'],
                ["style", "left", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"timerArrow": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    id: 'trivia_timer',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_timer.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${symbolSelector}": [
                ["style", "height", '75.8%'],
                ["style", "width", '75.75%']
            ],
            "${_trivia_timer}": [
                ["style", "left", '0%'],
                ["style", "top", '0%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"hint50": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'ellipse',
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    rect: ['0%', '0%', '99.9%', '96.2%', 'auto', 'auto'],
                    id: 'Ellipse',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    cursor: ['pointer'],
                    fill: ['rgba(230,138,62,1.00)']
                },
                {
                    id: 'icon50Anim',
                    type: 'rect',
                    rect: ['27.9%', '-107.7%', 'auto', 'auto', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'icon50Anim',
                symbolName: 'icon50Anim'
            }            ]
        },
    states: {
        "Base State": {
            "${_icon50Anim}": [
                ["style", "top", '13.4%'],
                ["style", "opacity", '1'],
                ["style", "left", '27.87%']
            ],
            "${_Ellipse}": [
                ["style", "top", '1.92%'],
                ["style", "cursor", 'pointer'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["color", "background-color", 'rgba(230,138,62,1.00)']
            ],
            "${symbolSelector}": [
                ["style", "height", '9.63%'],
                ["style", "width", '5.82%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 3000,
            autoPlay: false,
            labels: {
                "normal": 0,
                "hover": 1000,
                "down": 2000,
                "disable": 3000
            },
            timeline: [
                { id: "eid115", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '1.92%'}], position: 0, duration: 0 },
                { id: "eid113", tween: [ "style", "${_Ellipse}", "top", '0%', { fromValue: '1.92%'}], position: 1000, duration: 0 },
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid745", tween: [ "style", "${_icon50Anim}", "top", '13.4%', { fromValue: '13.4%'}], position: 0, duration: 0 },
                { id: "eid746", tween: [ "style", "${_icon50Anim}", "top", '11.54%', { fromValue: '13.4%'}], position: 1000, duration: 0 },
                { id: "eid747", tween: [ "style", "${_icon50Anim}", "top", '15.38%', { fromValue: '9.62%'}], position: 2000, duration: 0 },
                { id: "eid748", tween: [ "style", "${_icon50Anim}", "top", '13.46%', { fromValue: '13.46%'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid749", tween: [ "style", "${_icon50Anim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid750", tween: [ "style", "${_icon50Anim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(230,138,62,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(230,138,62,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,174,82,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(230,138,62,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,174,82,1.00)'}], position: 3000, duration: 0 },
                { id: "eid751", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_icon50Anim}', [] ], ""], position: 1000 },
                { id: "eid973", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_icon50Anim}', [0] ], ""], position: 3000 }            ]
        }
    }
},
"hintReplace": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '99.9%', '96.2%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'Ellipse',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(230,138,62,1.00)']
                },
                {
                    id: 'replaceAnim',
                    type: 'rect',
                    rect: ['30%', '26.9%', '38%', '46.2%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'replaceAnim',
                symbolName: 'replaceAnim'
            }            ]
        },
    states: {
        "Base State": {
            "${_replaceAnim}": [
                ["style", "top", '26.92%'],
                ["style", "height", '46.15%'],
                ["style", "opacity", '1'],
                ["style", "left", '29.97%'],
                ["style", "width", '37.97%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(230,138,62,1.00)'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${symbolSelector}": [
                ["style", "height", '9.63%'],
                ["style", "width", '5.82%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 3000,
            autoPlay: false,
            labels: {
                "normal": 0,
                "hover": 1000,
                "down": 2000,
                "disable": 3000
            },
            timeline: [
                { id: "eid115", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '1.92%'}], position: 0, duration: 0 },
                { id: "eid113", tween: [ "style", "${_Ellipse}", "top", '0%', { fromValue: '1.92%'}], position: 1000, duration: 0 },
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid707", tween: [ "style", "${_replaceAnim}", "top", '26.92%', { fromValue: '26.92%'}], position: 0, duration: 0 },
                { id: "eid708", tween: [ "style", "${_replaceAnim}", "top", '25%', { fromValue: '26.92%'}], position: 1000, duration: 0 },
                { id: "eid709", tween: [ "style", "${_replaceAnim}", "top", '28.85%', { fromValue: '25%'}], position: 2000, duration: 0 },
                { id: "eid710", tween: [ "style", "${_replaceAnim}", "top", '26.92%', { fromValue: '28.85%'}], position: 3000, duration: 0 },
                { id: "eid711", tween: [ "style", "${_replaceAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid712", tween: [ "style", "${_replaceAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(230,138,62,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(230,138,62,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,174,82,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(230,138,62,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,174,82,1.00)'}], position: 3000, duration: 0 },
                { id: "eid713", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_replaceAnim}', [] ], ""], position: 1000 },
                { id: "eid974", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_replaceAnim}', [0] ], ""], position: 3000 }            ]
        }
    }
},
"hintTime": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '99.9%', '96.2%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'Ellipse',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(230,138,62,1.00)']
                },
                {
                    id: 'timeIconAnim',
                    type: 'rect',
                    rect: ['24%', '25%', 'auto', 'auto', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'timeIconAnim',
                symbolName: 'timeIconAnim'
            }            ]
        },
    states: {
        "Base State": {
            "${_timeIconAnim}": [
                ["style", "top", '25%'],
                ["style", "opacity", '1'],
                ["style", "left", '23.98%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(230,138,62,1.00)'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${symbolSelector}": [
                ["style", "height", '9.63%'],
                ["style", "width", '5.82%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 3000,
            autoPlay: false,
            labels: {
                "normal": 0,
                "hover": 1000,
                "down": 2000,
                "disable": 3000
            },
            timeline: [
                { id: "eid115", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '1.92%'}], position: 0, duration: 0 },
                { id: "eid113", tween: [ "style", "${_Ellipse}", "top", '0%', { fromValue: '1.92%'}], position: 1000, duration: 0 },
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid758", tween: [ "style", "${_timeIconAnim}", "top", '25%', { fromValue: '25%'}], position: 0, duration: 0 },
                { id: "eid759", tween: [ "style", "${_timeIconAnim}", "top", '23.08%', { fromValue: '25%'}], position: 1000, duration: 0 },
                { id: "eid760", tween: [ "style", "${_timeIconAnim}", "top", '26.92%', { fromValue: '23.08%'}], position: 2000, duration: 0 },
                { id: "eid761", tween: [ "style", "${_timeIconAnim}", "top", '25%', { fromValue: '26.92%'}], position: 3000, duration: 0 },
                { id: "eid762", tween: [ "style", "${_timeIconAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid763", tween: [ "style", "${_timeIconAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(230,138,62,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(230,138,62,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,174,82,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(230,138,62,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,174,82,1.00)'}], position: 3000, duration: 0 },
                { id: "eid764", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_timeIconAnim}', [] ], ""], position: 1000 },
                { id: "eid975", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timeIconAnim}', [0] ], ""], position: 3000 }            ]
        }
    }
},
"btnBgPlaceholder": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    id: 'trivia_btnBg',
                    type: 'image',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_btnBg.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_btnBg}": [
                ["style", "left", '0%'],
                ["style", "top", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '96.15%'],
                ["style", "width", '99.94%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"btnRestart": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '99.9%', '96.2%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'Ellipse',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(230,138,62,1.00)']
                },
                {
                    id: 'restartIconAnim',
                    type: 'rect',
                    rect: ['26%', '26.9%', 'auto', 'auto', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'restartIconAnim',
                symbolName: 'restartIconAnim'
            }            ]
        },
    states: {
        "Base State": {
            "${_restartIconAnim}": [
                ["style", "top", '26.92%'],
                ["style", "opacity", '1'],
                ["style", "left", '25.93%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(235,255,230,1.00)'],
                ["style", "opacity", '0.3'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${symbolSelector}": [
                ["style", "height", '9.63%'],
                ["style", "width", '5.82%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 3000,
            autoPlay: false,
            labels: {
                "normal": 0,
                "hover": 1000,
                "down": 2000,
                "disable": 3000
            },
            timeline: [
                { id: "eid115", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '1.92%'}], position: 0, duration: 0 },
                { id: "eid113", tween: [ "style", "${_Ellipse}", "top", '0%', { fromValue: '1.92%'}], position: 1000, duration: 0 },
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid683", tween: [ "style", "${_restartIconAnim}", "top", '26.92%', { fromValue: '26.92%'}], position: 0, duration: 0 },
                { id: "eid684", tween: [ "style", "${_restartIconAnim}", "top", '25%', { fromValue: '26.92%'}], position: 1000, duration: 0 },
                { id: "eid685", tween: [ "style", "${_restartIconAnim}", "top", '28.85%', { fromValue: '-3.94%'}], position: 2000, duration: 0 },
                { id: "eid686", tween: [ "style", "${_restartIconAnim}", "top", '26.92%', { fromValue: '4.06%'}], position: 3000, duration: 0 },
                { id: "eid687", tween: [ "style", "${_restartIconAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid688", tween: [ "style", "${_restartIconAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '0.3', { fromValue: '0.3'}], position: 0, duration: 0 },
                { id: "eid125", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '0.3'}], position: 1000, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(235,255,230,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(235,255,230,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(168,201,159,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(235,255,230,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,153,69,1.00)'}], position: 3000, duration: 0 },
                { id: "eid694", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_restartIconAnim}', [] ], ""], position: 1000 }            ]
        }
    }
},
"btnMuteOn": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100.1%', '96.2%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'Ellipse',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(230,138,62,1.00)']
                },
                {
                    id: 'muteIconOnAnim',
                    type: 'rect',
                    rect: ['16%', '26.9%', '60.1%', '48.1%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'muteIconOnAnim',
                symbolName: 'muteIconOnAnim'
            }            ]
        },
    states: {
        "Base State": {
            "${_muteIconOnAnim}": [
                ["style", "top", '26.86%'],
                ["style", "height", '48.08%'],
                ["style", "opacity", '1'],
                ["style", "left", '16.01%'],
                ["style", "width", '60.05%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(235,255,230,1.00)'],
                ["style", "opacity", '0.3'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '99.94%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 3000,
            autoPlay: false,
            labels: {
                "normal": 0,
                "hover": 1000,
                "down": 2000,
                "disable": 3000
            },
            timeline: [
                { id: "eid115", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '1.92%'}], position: 0, duration: 0 },
                { id: "eid113", tween: [ "style", "${_Ellipse}", "top", '0%', { fromValue: '1.92%'}], position: 1000, duration: 0 },
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid884", tween: [ "style", "${_muteIconOnAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid885", tween: [ "style", "${_muteIconOnAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '0.3', { fromValue: '0.3'}], position: 0, duration: 0 },
                { id: "eid125", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '0.3'}], position: 1000, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid880", tween: [ "style", "${_muteIconOnAnim}", "top", '26.86%', { fromValue: '26.86%'}], position: 0, duration: 0 },
                { id: "eid881", tween: [ "style", "${_muteIconOnAnim}", "top", '25%', { fromValue: '26.86%'}], position: 1000, duration: 0 },
                { id: "eid882", tween: [ "style", "${_muteIconOnAnim}", "top", '28.85%', { fromValue: '25%'}], position: 2000, duration: 0 },
                { id: "eid883", tween: [ "style", "${_muteIconOnAnim}", "top", '26.92%', { fromValue: '28.85%'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(235,255,230,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(235,255,230,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(168,201,159,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(235,255,230,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,153,69,1.00)'}], position: 3000, duration: 0 },
                { id: "eid886", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_muteIconOnAnim}', [] ], ""], position: 1000 }            ]
        }
    }
},
"btnMuteOff": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100.1%', '96.2%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'Ellipse',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(230,138,62,1.00)']
                },
                {
                    id: 'muteIconOffAnim',
                    type: 'rect',
                    rect: ['18%', '26.9%', '60.1%', '48.1%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'muteIconOffAnim',
                symbolName: 'muteIconOffAnim'
            }            ]
        },
    states: {
        "Base State": {
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(235,255,230,1.00)'],
                ["style", "opacity", '0.3'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${_muteIconOffAnim}": [
                ["style", "top", '26.86%'],
                ["style", "height", '48.08%'],
                ["style", "opacity", '1'],
                ["style", "left", '18.01%'],
                ["style", "width", '60.05%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '99.94%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 3000,
            autoPlay: false,
            labels: {
                "normal": 0,
                "hover": 1000,
                "down": 2000,
                "disable": 3000
            },
            timeline: [
                { id: "eid115", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '1.92%'}], position: 0, duration: 0 },
                { id: "eid113", tween: [ "style", "${_Ellipse}", "top", '0%', { fromValue: '1.92%'}], position: 1000, duration: 0 },
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '0.3', { fromValue: '0.3'}], position: 0, duration: 0 },
                { id: "eid125", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '0.3'}], position: 1000, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid952", tween: [ "style", "${_muteIconOffAnim}", "top", '26.86%', { fromValue: '26.86%'}], position: 0, duration: 0 },
                { id: "eid953", tween: [ "style", "${_muteIconOffAnim}", "top", '25%', { fromValue: '26.86%'}], position: 1000, duration: 0 },
                { id: "eid954", tween: [ "style", "${_muteIconOffAnim}", "top", '28.85%', { fromValue: '25%'}], position: 2000, duration: 0 },
                { id: "eid955", tween: [ "style", "${_muteIconOffAnim}", "top", '26.92%', { fromValue: '28.85%'}], position: 3000, duration: 0 },
                { id: "eid956", tween: [ "style", "${_muteIconOffAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid957", tween: [ "style", "${_muteIconOffAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(235,255,230,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(235,255,230,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(168,201,159,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(235,255,230,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,153,69,1.00)'}], position: 3000, duration: 0 },
                { id: "eid958", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_muteIconOffAnim}', [] ], ""], position: 1000 }            ]
        }
    }
},
"mute": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    userClass: 'mute-off edge-btn',
                    type: 'rect',
                    id: 'btnMuteOff',
                    display: 'none',
                    cursor: ['pointer'],
                    rect: ['0%', '0%', '99.9%', '100%', 'auto', 'auto']
                },
                {
                    userClass: 'mute-on edge-btn',
                    id: 'btnMuteOn',
                    type: 'rect',
                    cursor: ['pointer'],
                    rect: ['0%', '0%', '99.9%', '100%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'btnMuteOff',
                symbolName: 'btnMuteOff'
            },
            {
                id: 'btnMuteOn',
                symbolName: 'btnMuteOn'
            }            ]
        },
    states: {
        "Base State": {
            "${_btnMuteOn}": [
                ["style", "top", '0%'],
                ["style", "height", '100%'],
                ["style", "left", '0%'],
                ["style", "cursor", 'pointer'],
                ["style", "width", '99.91%']
            ],
            "${_btnMuteOff}": [
                ["style", "top", '0%'],
                ["style", "height", '100%'],
                ["style", "display", 'none'],
                ["style", "left", '0%'],
                ["style", "cursor", 'pointer'],
                ["style", "width", '99.91%']
            ],
            "${symbolSelector}": [
                ["style", "height", '9.63%'],
                ["style", "width", '5.82%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: false,
            timeline: [
                { id: "eid143", tween: [ "style", "${_btnMuteOff}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 }            ]
        }
    }
},
"optionBtn": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    id: 'Rectangle',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(255,255,255,1.00)']
                },
                {
                    rect: ['95.2%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    type: 'ellipse',
                    id: 'Ellipse2',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    display: 'none',
                    fill: ['rgba(255,255,255,1)']
                },
                {
                    rect: ['95.2%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                    id: 'trivia_answerBullit',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_answerBullit.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    type: 'text',
                    userClass: 'text',
                    rect: ['4.4%', '15.9%', '89.3%', '63.5%', 'auto', 'auto'],
                    id: 'Text',
                    text: 'לפניכם המצאות שונות בתחום החקלאות שנועדו לסייע לגידול היבולים החקלאיים בתנאים הסביבתיים המיוחדים של הנגב. עמדו עם העכבר על התמונה?',
                    align: 'right',
                    font: ['Alef', [106.25, '%'], 'rgba(0,0,0,1.00)', 'normal', 'none', 'normal']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_Ellipse2}": [
                ["color", "background-color", 'rgba(255,255,255,1)'],
                ["style", "display", 'none']
            ],
            "${_Text}": [
                ["style", "line-height", '121%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(0,0,0,1.00)'],
                ["style", "opacity", '1'],
                ["style", "left", '4.39%'],
                ["style", "font-size", '106.25%'],
                ["style", "top", '17.4%'],
                ["style", "text-indent", '0%'],
                ["style", "height", '63.49%'],
                ["style", "font-family", 'Alef'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '89.27%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_trivia_answerBullit}": [
                ["style", "top", '34.92%'],
                ["style", "left", '95.24%']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(255,255,255,1.00)'],
                ["style", "height", '100%'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "top", '0%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 3000,
            autoPlay: false,
            labels: {
                "normal": 0,
                "hover": 1000,
                "down": 2000,
                "disable": 3000
            },
            timeline: [
                { id: "eid131", tween: [ "style", "${_Ellipse2}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid130", tween: [ "style", "${_Ellipse2}", "display", 'block', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid138", tween: [ "style", "${_Ellipse2}", "display", 'none', { fromValue: 'block'}], position: 3000, duration: 0 },
                { id: "eid133", tween: [ "style", "${_Text}", "top", '17.4%', { fromValue: '17.4%'}], position: 0, duration: 0 },
                { id: "eid134", tween: [ "style", "${_Text}", "top", '17.46%', { fromValue: '17.4%'}], position: 2000, duration: 0 },
                { id: "eid135", tween: [ "style", "${_Text}", "top", '17.4%', { fromValue: '17.46%'}], position: 3000, duration: 0 },
                { id: "eid136", tween: [ "style", "${_Text}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid137", tween: [ "style", "${_Text}", "opacity", '0.33333333333333', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid129", tween: [ "color", "${_Ellipse2}", "background-color", 'rgba(146,168,170,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,255,255,1)'}], position: 1000, duration: 0 },
                { id: "eid127", tween: [ "style", "${_Rectangle}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid132", tween: [ "style", "${_Rectangle}", "opacity", '0.89929062381704', { fromValue: '1'}], position: 1000, duration: 0 }            ]
        }
    }
},
"option": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    id: 'optionError',
                    type: 'rect',
                    userClass: 'option-error',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto']
                },
                {
                    id: 'optionRight',
                    type: 'rect',
                    userClass: 'option-right',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto']
                },
                {
                    type: 'rect',
                    id: 'optionBtn',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    cursor: ['pointer'],
                    userClass: 'edge-btn option-normal'
                }
            ],
            symbolInstances: [
            {
                id: 'optionBtn',
                symbolName: 'optionBtn',
                autoPlay: {

               }
            },
            {
                id: 'optionRight',
                symbolName: 'optionRight',
                autoPlay: {

               }
            },
            {
                id: 'optionError',
                symbolName: 'optionError',
                autoPlay: {

               }
            }            ]
        },
    states: {
        "Base State": {
            "${symbolSelector}": [
                ["style", "height", '11.67%'],
                ["style", "width", '95.35%']
            ],
            "${_optionBtn}": [
                ["style", "top", '0%'],
                ["style", "height", '99.97%'],
                ["style", "left", '0%'],
                ["style", "cursor", 'pointer'],
                ["style", "width", '100%']
            ],
            "${_optionError}": [
                ["style", "height", '99.97%'],
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${_optionRight}": [
                ["style", "height", '99.97%'],
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: false,
            timeline: [
            ]
        }
    }
},
"optionError": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    id: 'Rectangle',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(247,222,222,1.00)']
                },
                {
                    type: 'text',
                    userClass: 'text',
                    rect: ['4.4%', '17.4%', '89.3%', '63.5%', 'auto', 'auto'],
                    id: 'Text',
                    text: 'לפניכם המצאות שונות בתחום החקלאות שנועדו לסייע לגידול היבולים החקלאיים בתנאים הסביבתיים המיוחדים של הנגב. עמדו עם העכבר על התמונה?',
                    align: 'right',
                    font: ['Alef-Regular', [106.25, '%'], 'rgba(0,0,0,1.00)', 'normal', 'none', 'normal']
                },
                {
                    rect: ['95.2%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                    id: 'trivia_progresEror',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresEror.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(247,222,222,1.00)'],
                ["style", "height", '100%'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "top", '0%']
            ],
            "${_trivia_progresEror}": [
                ["style", "top", '34.92%'],
                ["style", "height", '31.75%'],
                ["style", "left", '95.24%'],
                ["style", "width", '2.44%']
            ],
            "${_Text}": [
                ["style", "line-height", '121%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(0,0,0,1.00)'],
                ["style", "opacity", '1'],
                ["style", "left", '4.39%'],
                ["style", "font-size", '106.25%'],
                ["style", "top", '17.4%'],
                ["style", "text-indent", '0%'],
                ["style", "height", '63.49%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '89.27%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 3000,
            autoPlay: false,
            timeline: [
            ]
        }
    }
},
"optionRight": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    id: 'Rectangle',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(227,235,189,1.00)']
                },
                {
                    type: 'text',
                    userClass: 'text',
                    rect: ['4.4%', '17.4%', '89.3%', '63.5%', 'auto', 'auto'],
                    id: 'Text',
                    text: 'לפניכם המצאות שונות בתחום החקלאות שנועדו לסייע לגידול היבולים החקלאיים בתנאים הסביבתיים המיוחדים של הנגב. עמדו עם העכבר על התמונה?',
                    align: 'right',
                    font: ['Alef-Regular', [106.25, '%'], 'rgba(0,0,0,1.00)', 'normal', 'none', 'normal']
                },
                {
                    rect: ['95.2%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                    id: 'trivia_progresRight',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresRight.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    rect: ['95.2%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_answerBullit.svg', '0px', '0px'],
                    display: 'none',
                    type: 'image',
                    id: 'trivia_answerBullit',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_progresRight}": [
                ["style", "top", '34.92%'],
                ["style", "height", '31.75%'],
                ["style", "display", 'block'],
                ["style", "left", '95.24%'],
                ["style", "width", '2.44%']
            ],
            "${_Text}": [
                ["style", "line-height", '121%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(0,0,0,1.00)'],
                ["style", "opacity", '1'],
                ["style", "left", '4.39%'],
                ["style", "font-size", '106.25%'],
                ["style", "top", '17.4%'],
                ["style", "text-indent", '0%'],
                ["style", "height", '63.49%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '89.27%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_trivia_answerBullit}": [
                ["style", "top", '34.92%'],
                ["style", "left", '95.24%'],
                ["style", "display", 'none']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(227,235,189,1.00)'],
                ["style", "height", '100%'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "top", '0%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1000,
            autoPlay: false,
            labels: {
                "right": 0,
                "no_V": 1000
            },
            timeline: [
                { id: "eid141", tween: [ "style", "${_trivia_progresRight}", "display", 'block', { fromValue: 'block'}], position: 0, duration: 0 },
                { id: "eid142", tween: [ "style", "${_trivia_progresRight}", "display", 'none', { fromValue: 'block'}], position: 1000, duration: 0 },
                { id: "eid139", tween: [ "style", "${_trivia_answerBullit}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid140", tween: [ "style", "${_trivia_answerBullit}", "display", 'block', { fromValue: 'none'}], position: 1000, duration: 0 }            ]
        }
    }
},
"opening": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'rect',
                    id: 'Rectangle2Copy',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(51,56,59,1)']
                },
                {
                    type: 'rect',
                    id: 'Rectangle',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    rect: ['2.2%', '15.2%', '95.5%', '71.5%', 'auto', 'auto'],
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    type: 'rect',
                    id: 'Rectangle2',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    rect: ['22.9%', '1.1%', '54.1%', '13.3%', 'auto', 'auto'],
                    fill: ['rgba(97,102,108,1.00)']
                },
                {
                    type: 'image',
                    id: 'trivia_openingBg',
                    tag: 'img',
                    rect: ['2.7%', '15.7%', '95.4%', '70.4%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_openingBg.svg', '0px', '0px']
                },
                {
                    userClass: 'edge-btn edge-btn-start',
                    id: 'btnStart',
                    type: 'rect',
                    cursor: ['pointer'],
                    rect: ['40.9%', '38.2%', '18%', '29.1%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'btnStart',
                symbolName: 'btnStart'
            }            ]
        },
    states: {
        "Base State": {
            "${_Rectangle2}": [
                ["color", "background-color", 'rgba(97,102,108,1.00)'],
                ["style", "height", '13.33%'],
                ["style", "top", '1.1%'],
                ["style", "left", '22.91%'],
                ["style", "width", '54.07%']
            ],
            "${_btnStart}": [
                ["style", "top", '38.15%'],
                ["style", "height", '29.07%'],
                ["style", "left", '40.93%'],
                ["style", "cursor", 'pointer'],
                ["style", "width", '18.03%']
            ],
            "${_trivia_openingBg}": [
                ["style", "top", '15.73%'],
                ["style", "left", '2.65%'],
                ["style", "width", '95.4%']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '71.48%'],
                ["style", "top", '15.16%'],
                ["style", "left", '2.21%'],
                ["style", "width", '95.47%']
            ],
            "${_Rectangle2Copy}": [
                ["style", "top", '-0.01%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "overflow", 'hidden']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"btnStart": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100%', '98.7%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'Ellipse',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(230,138,62,1.00)']
                },
                {
                    id: 'startIconAnim',
                    type: 'rect',
                    rect: ['39.1%', '27.4%', '28.4%', '45.9%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'startIconAnim',
                symbolName: 'startIconAnim'
            }            ]
        },
    states: {
        "Base State": {
            "${_startIconAnim}": [
                ["style", "top", '25.48%'],
                ["style", "height", '45.87%'],
                ["style", "opacity", '1'],
                ["style", "left", '39.13%'],
                ["style", "width", '28.38%']
            ],
            "${_Ellipse}": [
                ["style", "top", '0.64%'],
                ["color", "background-color", 'rgba(230,138,62,1.00)'],
                ["style", "height", '98.73%'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${symbolSelector}": [
                ["style", "height", '29.07%'],
                ["style", "width", '18.03%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 3000,
            autoPlay: false,
            labels: {
                "normal": 0,
                "hover": 1000,
                "down": 2000,
                "disable": 3000
            },
            timeline: [
                { id: "eid1001", tween: [ "style", "${_startIconAnim}", "top", '25.48%', { fromValue: '25.48%'}], position: 0, duration: 0 },
                { id: "eid1002", tween: [ "style", "${_startIconAnim}", "top", '24.21%', { fromValue: '25.48%'}], position: 1000, duration: 0 },
                { id: "eid1003", tween: [ "style", "${_startIconAnim}", "top", '26.76%', { fromValue: '-1.4%'}], position: 2000, duration: 0 },
                { id: "eid1004", tween: [ "style", "${_startIconAnim}", "top", '25.48%', { fromValue: '1.39%'}], position: 3000, duration: 0 },
                { id: "eid1005", tween: [ "style", "${_startIconAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid1006", tween: [ "style", "${_startIconAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid115", tween: [ "style", "${_Ellipse}", "top", '0.64%', { fromValue: '0.64%'}], position: 0, duration: 0 },
                { id: "eid113", tween: [ "style", "${_Ellipse}", "top", '0%', { fromValue: '0.64%'}], position: 1000, duration: 0 },
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '1.27%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '0.64%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(230,138,62,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(230,138,62,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,174,82,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(230,138,62,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,174,82,1.00)'}], position: 3000, duration: 0 },
                { id: "eid1009", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_startIconAnim}', [] ], ""], position: 1000 }            ]
        }
    }
},
"feedback": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '-0.2%', '100%', '100%', 'auto', 'auto'],
                    id: 'Rectangle2',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(51,56,59,1)']
                },
                {
                    rect: ['2.3%', '15.2%', '95.5%', '71.5%', 'auto', 'auto'],
                    id: 'Rectangle',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'rect',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    transform: [],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_openingBg.svg', '0px', '0px'],
                    type: 'image',
                    id: 'trivia_openingBg',
                    opacity: 1,
                    rect: ['2.3%', '16.3%', '95.5%', '70.4%', 'auto', 'auto'],
                    tag: 'img'
                },
                {
                    rect: ['5.1%', '19.3%', '89.7%', '61.9%', 'auto', 'auto'],
                    id: 'trivia_feedbackBg',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_feedbackBg.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    id: 'feedback_elements',
                    type: 'rect',
                    rect: ['50.4%', '32.4%', '18.4%', '11.1%', 'auto', 'auto']
                },
                {
                    id: 'feedback_elementsCopy',
                    type: 'rect',
                    rect: ['50.4%', '44.4%', '18.4%', '11.1%', 'auto', 'auto']
                },
                {
                    rect: ['50.4%', '56.5%', '18.4%', '11.1%', 'auto', 'auto'],
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    id: 'Rectangle3',
                    opacity: 0.8,
                    type: 'rect',
                    fill: ['rgba(255,148,59,1.00)']
                },
                {
                    rect: ['31.1%', '56.5%', '18.4%', '11.1%', 'auto', 'auto'],
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    id: 'Rectangle3Copy',
                    opacity: 0.8,
                    type: 'rect',
                    fill: ['rgba(255,148,59,1.00)']
                },
                {
                    id: 'feedback_elementsCopy3',
                    type: 'rect',
                    rect: ['31.1%', '32.4%', 'auto', 'auto', 'auto', 'auto']
                },
                {
                    id: 'feedback_elementsCopy2',
                    type: 'rect',
                    rect: ['31.1%', '44.4%', 'auto', 'auto', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [387.5, '%'], 'rgba(126,203,210,1.00)', 'normal', 'none', ''],
                    id: 'Text',
                    text: 'תוצאות',
                    type: 'text',
                    rect: ['38.8%', '17.8%', '21.1%', '15.7%', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [143.75, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal'],
                    type: 'text',
                    id: 'Text2',
                    text: 'סה\'\'כ שאלות',
                    align: 'left',
                    rect: ['51.5%', '33.5%', '10.4%', '8.9%', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [143.75, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal'],
                    type: 'text',
                    id: 'Text2Copy',
                    text: 'תשובות נכונות',
                    align: 'left',
                    rect: ['51.5%', '45.6%', '10.4%', '8.9%', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [312.5, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal'],
                    type: 'text',
                    id: 'Text2Copy2',
                    text: 'ניקוד',
                    align: 'left',
                    rect: ['51.5%', '58.7%', '14%', '8.9%', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [237.5, '%'], 'rgba(255,255,255,1)', 'normal', 'none', 'normal'],
                    rect: ['31.1%', '32.8%', '16.4%', '34.4%', 'auto', 'auto'],
                    type: 'text',
                    id: 'Text_xml',
                    text: '10<br>5<br>123456',
                    align: 'right',
                    userClass: 'feedback-current-score text'
                }
            ],
            symbolInstances: [
            {
                id: 'feedback_elementsCopy',
                symbolName: 'feedback_elements'
            },
            {
                id: 'feedback_elementsCopy2',
                symbolName: 'feedback_elements'
            },
            {
                id: 'feedback_elements',
                symbolName: 'feedback_elements'
            },
            {
                id: 'feedback_elementsCopy3',
                symbolName: 'feedback_elements'
            }            ]
        },
    states: {
        "Base State": {
            "${_feedback_elementsCopy}": [
                ["style", "top", '44.44%'],
                ["style", "height", '11.11%'],
                ["style", "opacity", '0'],
                ["style", "left", '69.82%'],
                ["style", "width", '18.39%']
            ],
            "${_Rectangle2}": [
                ["style", "top", '-0.19%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%']
            ],
            "${_feedback_elements}": [
                ["style", "top", '32.41%'],
                ["style", "height", '11.11%'],
                ["style", "opacity", '0'],
                ["style", "left", '75.63%'],
                ["style", "width", '18.39%']
            ],
            "${_Text_xml}": [
                ["style", "line-height", '166%'],
                ["style", "letter-spacing", '0em'],
                ["style", "opacity", '0'],
                ["style", "left", '31.05%'],
                ["style", "font-size", '237.5%'],
                ["style", "top", '32.78%'],
                ["style", "text-align", 'right'],
                ["style", "text-indent", '0%'],
                ["style", "height", '34.44%'],
                ["style", "font-family", 'Arial, Helvetica, sans-serif'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '16.4%']
            ],
            "${_Rectangle3}": [
                ["color", "background-color", 'rgba(255,148,59,1.00)'],
                ["style", "top", '56.48%'],
                ["style", "height", '11.11%'],
                ["style", "opacity", '0'],
                ["style", "left", '63.49%'],
                ["style", "width", '18.38%']
            ],
            "${_trivia_feedbackBg}": [
                ["style", "top", '19.26%'],
                ["style", "opacity", '0'],
                ["style", "left", '5.12%']
            ],
            "${_Text2}": [
                ["style", "line-height", '96%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "opacity", '0'],
                ["style", "left", '51.51%'],
                ["style", "font-size", '143.75%'],
                ["style", "top", '33.52%'],
                ["style", "text-align", 'left'],
                ["style", "text-indent", '0%'],
                ["style", "height", '8.89%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '10.35%']
            ],
            "${_feedback_elementsCopy3}": [
                ["style", "top", '32.41%'],
                ["style", "opacity", '0'],
                ["style", "left", '4.3%']
            ],
            "${_Text2Copy2}": [
                ["style", "line-height", '44%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "opacity", '0'],
                ["style", "left", '51.51%'],
                ["style", "font-size", '312.5%'],
                ["style", "top", '58.7%'],
                ["style", "text-align", 'left'],
                ["style", "text-indent", '0%'],
                ["style", "height", '8.89%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '13.96%']
            ],
            "${_Rectangle3Copy}": [
                ["color", "background-color", 'rgba(255,148,59,1.00)'],
                ["style", "top", '56.48%'],
                ["style", "height", '11.11%'],
                ["style", "opacity", '0'],
                ["style", "left", '14.54%'],
                ["style", "width", '18.38%']
            ],
            "${_Text}": [
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(126,203,210,1.00)'],
                ["style", "opacity", '0'],
                ["style", "left", '38.84%'],
                ["style", "font-size", '387.5%'],
                ["style", "top", '2.98%'],
                ["style", "text-indent", '0%'],
                ["style", "height", '15.74%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '21.05%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_trivia_openingBg}": [
                ["style", "top", '16.26%'],
                ["transform", "scaleY", '1'],
                ["transform", "rotateZ", '180deg'],
                ["transform", "scaleX", '1'],
                ["style", "opacity", '0'],
                ["style", "left", '2.33%']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "top", '15.16%'],
                ["style", "height", '71.48%'],
                ["style", "opacity", '0'],
                ["style", "left", '2.29%'],
                ["style", "width", '95.5%']
            ],
            "${_feedback_elementsCopy2}": [
                ["style", "top", '44.44%'],
                ["style", "opacity", '0'],
                ["style", "left", '8.72%']
            ],
            "${_Text2Copy}": [
                ["style", "line-height", '96%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "opacity", '0'],
                ["style", "left", '51.51%'],
                ["style", "width", '10.35%'],
                ["style", "top", '45.56%'],
                ["style", "text-align", 'left'],
                ["style", "text-indent", '0%'],
                ["style", "height", '8.89%'],
                ["style", "word-spacing", '0em'],
                ["style", "font-size", '143.75%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1000,
            autoPlay: true,
            timeline: [
                { id: "eid825", tween: [ "style", "${_Text2}", "opacity", '0', { fromValue: '0'}], position: 0, duration: 0 },
                { id: "eid819", tween: [ "style", "${_Text2}", "opacity", '1', { fromValue: '0'}], position: 703, duration: 297, easing: "easeInOutQuad" },
                { id: "eid770", tween: [ "style", "${_feedback_elementsCopy2}", "left", '31.05%', { fromValue: '8.72%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid811", tween: [ "style", "${_Rectangle3}", "opacity", '0.80851063829787', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid810", tween: [ "style", "${_Rectangle3Copy}", "opacity", '0.80851063829787', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid778", tween: [ "style", "${_feedback_elementsCopy}", "left", '50.4%', { fromValue: '69.82%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid808", tween: [ "style", "${_feedback_elementsCopy3}", "opacity", '1', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid831", tween: [ "style", "${_Text}", "opacity", '1', { fromValue: '0'}], position: 0, duration: 1000, easing: "easeInQuad" },
                { id: "eid780", tween: [ "style", "${_Rectangle3}", "left", '50.35%', { fromValue: '63.49%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid846", tween: [ "style", "${_trivia_feedbackBg}", "opacity", '1', { fromValue: '0'}], position: 250, duration: 639, easing: "easeInOutQuad" },
                { id: "eid829", tween: [ "style", "${_Text}", "top", '17.78%', { fromValue: '2.98%'}], position: 0, duration: 1000, easing: "easeOutQuad" },
                { id: "eid826", tween: [ "style", "${_Text2Copy}", "opacity", '0', { fromValue: '0'}], position: 0, duration: 0 },
                { id: "eid821", tween: [ "style", "${_Text2Copy}", "opacity", '1', { fromValue: '0'}], position: 703, duration: 297, easing: "easeInOutQuad" },
                { id: "eid772", tween: [ "style", "${_Rectangle3Copy}", "left", '31.05%', { fromValue: '14.54%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid806", tween: [ "style", "${_feedback_elementsCopy}", "opacity", '1', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid852", tween: [ "style", "${_trivia_openingBg}", "opacity", '1', { fromValue: '0'}], position: 250, duration: 639, easing: "easeInOutQuad" },
                { id: "eid807", tween: [ "style", "${_feedback_elementsCopy2}", "opacity", '1', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid827", tween: [ "style", "${_Text_xml}", "opacity", '0', { fromValue: '0'}], position: 0, duration: 0 },
                { id: "eid823", tween: [ "style", "${_Text_xml}", "opacity", '1', { fromValue: '0'}], position: 703, duration: 297, easing: "easeInOutQuad" },
                { id: "eid809", tween: [ "style", "${_feedback_elements}", "opacity", '1', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid824", tween: [ "style", "${_Text2Copy2}", "opacity", '0', { fromValue: '0'}], position: 0, duration: 0 },
                { id: "eid817", tween: [ "style", "${_Text2Copy2}", "opacity", '1', { fromValue: '0'}], position: 703, duration: 297, easing: "easeInOutQuad" },
                { id: "eid766", tween: [ "style", "${_feedback_elementsCopy3}", "left", '31.05%', { fromValue: '4.3%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid774", tween: [ "style", "${_feedback_elements}", "left", '50.4%', { fromValue: '75.63%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid833", tween: [ "style", "${_Rectangle}", "opacity", '1', { fromValue: '0.000000'}], position: 0, duration: 250, easing: "easeInOutQuad" }            ]
        }
    }
},
"feedback_elements": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    opacity: 0.8,
                    id: 'Rectangle3',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(87,97,105,1.00)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${symbolSelector}": [
                ["style", "height", '11.11%'],
                ["style", "width", '18.38%']
            ],
            "${_Rectangle3}": [
                ["color", "background-color", 'rgba(87,97,105,1.00)'],
                ["style", "top", '0%'],
                ["style", "height", '100.03%'],
                ["style", "opacity", '0.8'],
                ["style", "left", '0%'],
                ["style", "width", '99.96%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"bgOpening": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    userClass: 'background',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_bg.svg', '0px', '0px'],
                    id: 'trivia_bgCopy',
                    type: 'image',
                    rect: ['-48.2%', '0%', '166.3%', '730.4%', 'auto', 'auto'],
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_bgCopy}": [
                ["style", "left", '-48.16%'],
                ["style", "top", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '13.7%'],
                ["style", "width", '60.12%'],
                ["style", "overflow", 'hidden']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"timerColorRight": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['-100%', '0%', '200%', '100%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'placeholder_colors',
                    stroke: [0, 'rgba(255,255,255,1.00)', 'solid'],
                    type: 'ellipse',
                    fill: ['rgba(255,255,255,1.00)']
                },
                {
                    rect: ['-93.9%', '3%', '187.9%', '93.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'placeholder_top',
                    stroke: [0, 'rgba(255,255,255,1.00)', 'solid'],
                    type: 'ellipse',
                    fill: ['rgba(97,102,108,1.00)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_placeholder_top}": [
                ["color", "background-color", 'rgba(97,102,108,1.00)'],
                ["style", "top", '3.03%'],
                ["style", "left", '-93.94%'],
                ["style", "border-style", 'solid'],
                ["style", "height", '93.94%'],
                ["color", "border-color", 'rgba(255,255,255,1.00)'],
                ["style", "border-width", '0px'],
                ["style", "width", '187.88%']
            ],
            "${_placeholder_colors}": [
                ["color", "background-color", 'rgba(255,255,255,1.00)'],
                ["style", "top", '0%'],
                ["style", "border-width", '0px'],
                ["color", "border-color", 'rgba(255,255,255,1.00)'],
                ["style", "height", '100%'],
                ["style", "border-style", 'solid'],
                ["style", "left", '-100%'],
                ["style", "width", '200%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "overflow", 'hidden'],
                ["style", "width", '50%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 14000,
            autoPlay: false,
            timeline: [
                { id: "eid148", tween: [ "color", "${_placeholder_colors}", "background-color", 'rgba(183,220,174,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,255,255,1.00)'}], position: 0, duration: 7000 },
                { id: "eid149", tween: [ "color", "${_placeholder_colors}", "background-color", 'rgba(180,206,64,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(183,220,174,1.00)'}], position: 7000, duration: 7000 }            ]
        }
    }
},
"timerAnimRight": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    id: 'timerColorRight2',
                    type: 'rect',
                    rect: ['-100.2%', '0%', '200.4%', '100%', 'auto', 'auto'],
                    transform: [[0, 0], [], [], ['0.99798', '1.00051']]
                }
            ],
            symbolInstances: [
            {
                id: 'timerColorRight2',
                symbolName: 'timerColorRight2'
            }            ]
        },
    states: {
        "Base State": {
            "${_timerColorRight2}": [
                ["style", "top", '0.03%'],
                ["transform", "scaleY", '1.00051'],
                ["transform", "rotateZ", '0deg'],
                ["style", "height", '99.97%'],
                ["transform", "scaleX", '0.99798'],
                ["style", "left", '-100.21%'],
                ["style", "width", '200.41%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100.01%'],
                ["style", "overflow", 'hidden'],
                ["style", "width", '50%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 14000,
            autoPlay: false,
            timeline: [
                { id: "eid154", tween: [ "transform", "${_timerColorRight2}", "rotateZ", '180deg', { fromValue: '0deg'}], position: 0, duration: 14000 },
                { id: "eid504", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [0] ], ""], position: 0 },
                { id: "eid505", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [1000] ], ""], position: 1000 },
                { id: "eid506", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [2000] ], ""], position: 2000 },
                { id: "eid507", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [3000] ], ""], position: 3000 },
                { id: "eid508", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [4000] ], ""], position: 4000 },
                { id: "eid509", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [5000] ], ""], position: 5000 },
                { id: "eid510", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [6000] ], ""], position: 6000 },
                { id: "eid511", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [7000] ], ""], position: 7000 },
                { id: "eid512", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [8000] ], ""], position: 8000 },
                { id: "eid513", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [9000] ], ""], position: 9000 },
                { id: "eid514", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [10000] ], ""], position: 10000 },
                { id: "eid515", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [11000] ], ""], position: 11000 },
                { id: "eid516", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [12000] ], ""], position: 12000 },
                { id: "eid517", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [13000] ], ""], position: 13000 },
                { id: "eid518", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight2}', [14000] ], ""], position: 14000 }            ]
        }
    }
},
"timerColorRight2": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    id: 'timerColorRight',
                    type: 'rect',
                    rect: ['50%', '0%', '50%', '100%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'timerColorRight',
                symbolName: 'timerColorRight'
            }            ]
        },
    states: {
        "Base State": {
            "${symbolSelector}": [
                ["style", "height", '100.01%'],
                ["style", "width", '200%']
            ],
            "${_timerColorRight}": [
                ["style", "height", '100%'],
                ["style", "top", '0%'],
                ["style", "width", '50%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 14792,
            autoPlay: false,
            timeline: [
                { id: "eid519", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [0] ], ""], position: 0 },
                { id: "eid520", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [1000] ], ""], position: 1000 },
                { id: "eid521", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [2000] ], ""], position: 2000 },
                { id: "eid522", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [3000] ], ""], position: 3000 },
                { id: "eid523", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [4000] ], ""], position: 4000 },
                { id: "eid524", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [5000] ], ""], position: 5000 },
                { id: "eid525", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [6000] ], ""], position: 6000 },
                { id: "eid526", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [7000] ], ""], position: 7000 },
                { id: "eid527", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [8000] ], ""], position: 8000 },
                { id: "eid528", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [9000] ], ""], position: 9000 },
                { id: "eid529", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [10000] ], ""], position: 10000 },
                { id: "eid530", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [11000] ], ""], position: 11000 },
                { id: "eid531", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [12000] ], ""], position: 12000 },
                { id: "eid532", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [13000] ], ""], position: 13000 },
                { id: "eid533", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [14000] ], ""], position: 14000 },
                { id: "eid534", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorRight}', [15000] ], ""], position: 14792 }            ]
        }
    }
},
"timerAnimLeft": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    id: 'timerColorLeft2',
                    type: 'rect',
                    rect: ['0%', '0%', 'auto', 'auto', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'timerColorLeft2',
                symbolName: 'timerColorLeft2'
            }            ]
        },
    states: {
        "Base State": {
            "${_timerColorLeft2}": [
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["transform", "rotateZ", '0deg']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '50%'],
                ["style", "overflow", 'hidden']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 29000,
            autoPlay: false,
            timeline: [
                { id: "eid458", tween: [ "transform", "${_timerColorLeft2}", "rotateZ", '0deg', { fromValue: '0deg'}], position: 0, duration: 0 },
                { id: "eid220", tween: [ "transform", "${_timerColorLeft2}", "rotateZ", '180deg', { fromValue: '0deg'}], position: 14500, duration: 14500 },
                { id: "eid535", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [0] ], ""], position: 0 },
                { id: "eid536", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [1000] ], ""], position: 1000 },
                { id: "eid537", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [2000] ], ""], position: 2000 },
                { id: "eid538", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [3000] ], ""], position: 3000 },
                { id: "eid539", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [4000] ], ""], position: 4000 },
                { id: "eid540", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [5000] ], ""], position: 5000 },
                { id: "eid541", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [6000] ], ""], position: 6000 },
                { id: "eid542", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [7000] ], ""], position: 7000 },
                { id: "eid543", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [8000] ], ""], position: 8000 },
                { id: "eid544", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [9000] ], ""], position: 9000 },
                { id: "eid545", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [10000] ], ""], position: 10000 },
                { id: "eid546", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [11000] ], ""], position: 11000 },
                { id: "eid547", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [12000] ], ""], position: 12000 },
                { id: "eid548", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [13000] ], ""], position: 13000 },
                { id: "eid549", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [14000] ], ""], position: 14000 },
                { id: "eid550", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [15000] ], ""], position: 15000 },
                { id: "eid551", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [16000] ], ""], position: 16000 },
                { id: "eid552", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [17000] ], ""], position: 17000 },
                { id: "eid553", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [18000] ], ""], position: 18000 },
                { id: "eid554", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [19000] ], ""], position: 19000 },
                { id: "eid555", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [20000] ], ""], position: 20000 },
                { id: "eid556", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [21000] ], ""], position: 21000 },
                { id: "eid557", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [22000] ], ""], position: 22000 },
                { id: "eid558", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [23000] ], ""], position: 23000 },
                { id: "eid559", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [24000] ], ""], position: 24000 },
                { id: "eid560", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [25000] ], ""], position: 25000 },
                { id: "eid561", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [26000] ], ""], position: 26000 },
                { id: "eid562", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [27000] ], ""], position: 27000 },
                { id: "eid563", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [28000] ], ""], position: 28000 },
                { id: "eid564", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft2}', [29000] ], ""], position: 29000 }            ]
        }
    }
},
"timerColorLeft2": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    id: 'timerColorLeft',
                    type: 'rect',
                    rect: ['0%', '0%', 'auto', 'auto', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'timerColorLeft',
                symbolName: 'timerColorLeft'
            }            ]
        },
    states: {
        "Base State": {
            "${_timerColorLeft}": [
                ["style", "top", '0%'],
                ["style", "left", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '200%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 29000,
            autoPlay: false,
            timeline: [
                { id: "eid383", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [0] ], ""], position: 0 },
                { id: "eid384", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [1000] ], ""], position: 1000 },
                { id: "eid385", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [2000] ], ""], position: 2000 },
                { id: "eid386", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [3000] ], ""], position: 3000 },
                { id: "eid387", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [4000] ], ""], position: 4000 },
                { id: "eid388", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [5000] ], ""], position: 5000 },
                { id: "eid389", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [6000] ], ""], position: 6000 },
                { id: "eid390", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [7000] ], ""], position: 7000 },
                { id: "eid391", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [8000] ], ""], position: 8000 },
                { id: "eid392", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [9000] ], ""], position: 9000 },
                { id: "eid393", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [10000] ], ""], position: 10000 },
                { id: "eid394", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [11000] ], ""], position: 11000 },
                { id: "eid395", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [12000] ], ""], position: 12000 },
                { id: "eid396", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [13000] ], ""], position: 13000 },
                { id: "eid397", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [14000] ], ""], position: 14000 },
                { id: "eid398", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [15000] ], ""], position: 15000 },
                { id: "eid399", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [16000] ], ""], position: 16000 },
                { id: "eid400", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [17000] ], ""], position: 17000 },
                { id: "eid401", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [18000] ], ""], position: 18000 },
                { id: "eid402", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [19000] ], ""], position: 19000 },
                { id: "eid403", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [20000] ], ""], position: 20000 },
                { id: "eid404", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [21000] ], ""], position: 21000 },
                { id: "eid405", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [22000] ], ""], position: 22000 },
                { id: "eid406", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [23000] ], ""], position: 23000 },
                { id: "eid407", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [24000] ], ""], position: 24000 },
                { id: "eid408", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [25000] ], ""], position: 25000 },
                { id: "eid409", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [26000] ], ""], position: 26000 },
                { id: "eid410", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [27000] ], ""], position: 27000 },
                { id: "eid411", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [28000] ], ""], position: 28000 },
                { id: "eid412", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_timerColorLeft}', [29000] ], ""], position: 29000 }            ]
        }
    }
},
"timerColorLeft": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '200%', '100%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'placeholder_colors',
                    stroke: [0, 'rgba(255,255,255,1.00)', 'solid'],
                    type: 'ellipse',
                    fill: ['rgba(255,255,255,1.00)']
                },
                {
                    rect: ['6.1%', '3%', '187.9%', '93.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'placeholder_top',
                    stroke: [0, 'rgba(255,255,255,1.00)', 'solid'],
                    type: 'ellipse',
                    fill: ['rgba(97,102,108,1.00)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_placeholder_top}": [
                ["color", "background-color", 'rgba(97,102,108,1.00)'],
                ["style", "top", '3.03%'],
                ["style", "border-width", '0px'],
                ["color", "border-color", 'rgba(255,255,255,1.00)'],
                ["style", "height", '93.94%'],
                ["style", "border-style", 'solid'],
                ["style", "left", '6.06%'],
                ["style", "width", '187.88%']
            ],
            "${_placeholder_colors}": [
                ["color", "background-color", 'rgba(255,255,255,1.00)'],
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["style", "border-style", 'solid'],
                ["style", "height", '100%'],
                ["color", "border-color", 'rgba(255,255,255,1.00)'],
                ["style", "border-width", '0px'],
                ["style", "width", '200%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '50%'],
                ["style", "overflow", 'hidden']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 29000,
            autoPlay: false,
            timeline: [
                { id: "eid274", tween: [ "color", "${_placeholder_colors}", "background-color", 'rgba(183,220,174,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,255,255,1.00)'}], position: 0, duration: 6759 },
                { id: "eid275", tween: [ "color", "${_placeholder_colors}", "background-color", 'rgba(180,206,64,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(183,220,174,1.00)'}], position: 6759, duration: 6759 },
                { id: "eid276", tween: [ "color", "${_placeholder_colors}", "background-color", 'rgba(255,174,82,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(180,206,64,1.00)'}], position: 13517, duration: 7724 },
                { id: "eid277", tween: [ "color", "${_placeholder_colors}", "background-color", 'rgba(218,94,94,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,174,82,1.00)'}], position: 21241, duration: 1931 },
                { id: "eid222", tween: [ "color", "${_placeholder_colors}", "background-color", 'rgba(218,94,94,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(218,94,94,1.00)'}], position: 29000, duration: 0 }            ]
        }
    }
},
"round": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '200.1%', '100%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'colorsCopy',
                    stroke: [0, 'rgba(255,255,255,1.00)', 'solid'],
                    type: 'ellipse',
                    fill: ['rgba(97,102,108,1.00)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_colorsCopy}": [
                ["color", "background-color", 'rgba(97,102,108,1.00)'],
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["style", "border-style", 'solid'],
                ["style", "height", '99.95%'],
                ["color", "border-color", 'rgba(255,255,255,1.00)'],
                ["style", "border-width", '0px'],
                ["style", "width", '200.1%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100.05%'],
                ["style", "overflow", 'hidden'],
                ["style", "width", '49.99%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"half_round_left": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    id: 'round_left2',
                    type: 'rect',
                    rect: ['50%', '0%', '50%', '100%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'round_left2',
                symbolName: 'round_left'
            }            ]
        },
    states: {
        "Base State": {
            "${_round_left2}": [
                ["style", "top", '0%'],
                ["style", "height", '100.02%'],
                ["style", "left", '49.98%'],
                ["style", "width", '49.98%']
            ],
            "${symbolSelector}": [
                ["style", "height", '99.98%'],
                ["style", "width", '200.1%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"round_left_sivuv": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '0%', '200.1%', '100%', 'auto', 'auto'],
                    id: 'trivia_roundRight',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_roundRight.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_roundRight}": [
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["transform", "rotateZ", '0deg']
            ],
            "${symbolSelector}": [
                ["style", "height", '100.05%'],
                ["style", "overflow", 'hidden'],
                ["style", "width", '49.99%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 29000,
            autoPlay: true,
            timeline: [
                { id: "eid1015", tween: [ "transform", "${_trivia_roundRight}", "rotateZ", '180deg', { fromValue: '0deg'}], position: 14000, duration: 15000 }            ]
        }
    }
},
"timer": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['2.9%', '2.9%', '94.3%', '94.3%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'colors',
                    stroke: [0, 'rgba(255,255,255,1.00)', 'solid'],
                    type: 'ellipse',
                    fill: ['rgba(255,255,255,1.00)']
                },
                {
                    display: 'none',
                    type: 'rect',
                    id: 'half_round_right',
                    rect: ['48.6%', '0%', '50%', '100%', 'auto', 'auto']
                },
                {
                    display: 'none',
                    type: 'rect',
                    id: 'round_left_sivuv',
                    rect: ['0%', '0%', '50%', '100%', 'auto', 'auto']
                },
                {
                    type: 'image',
                    id: 'trivia_timer',
                    tag: 'img',
                    rect: ['5.7%', '5.7%', '88.6%', '88.6%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_timer.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            {
                id: 'round_left_sivuv',
                symbolName: 'round_left_sivuv'
            },
            {
                id: 'half_round_right',
                symbolName: 'half_round_right'
            }            ]
        },
    states: {
        "Base State": {
            "${_trivia_timer}": [
                ["style", "top", '5.72%'],
                ["style", "left", '5.71%'],
                ["transform", "rotateZ", '0deg']
            ],
            "${symbolSelector}": [
                ["style", "height", '12.96%'],
                ["style", "width", '8.14%']
            ],
            "${_colors}": [
                ["color", "background-color", 'rgba(255,255,255,1.00)'],
                ["style", "border-style", 'solid'],
                ["style", "border-width", '0px'],
                ["style", "width", '94.29%'],
                ["style", "top", '2.86%'],
                ["style", "height", '94.31%'],
                ["color", "border-color", 'rgba(255,255,255,1.00)'],
                ["style", "display", 'block'],
                ["style", "left", '2.86%']
            ],
            "${_round_left_sivuv}": [
                ["style", "height", '100.02%'],
                ["style", "display", 'none'],
                ["style", "width", '49.99%']
            ],
            "${_half_round_right}": [
                ["style", "height", '100.02%'],
                ["style", "display", 'none'],
                ["style", "left", '48.55%'],
                ["style", "width", '49.99%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 29000,
            autoPlay: false,
            labels: {
                "1": 0,
                "2": 1000,
                "3": 2000,
                "4": 3000,
                "5": 4000,
                "6": 5000,
                "7": 6000,
                "8": 7000,
                "9": 8000,
                "10": 9000,
                "11": 10000,
                "12": 11000,
                "13": 12000,
                "14": 13000,
                "15": 14000,
                "16": 15000,
                "17": 16000,
                "18": 17000,
                "19": 18000,
                "20": 19000,
                "21": 20000,
                "22": 21000,
                "23": 22000,
                "24": 23000,
                "25": 24000,
                "26": 25000,
                "27": 26000,
                "28": 27000,
                "29": 28000,
                "30": 29000
            },
            timeline: [
                { id: "eid1018", tween: [ "transform", "${_trivia_timer}", "rotateZ", '180deg', { fromValue: '0deg'}], position: 0, duration: 14000 },
                { id: "eid1019", tween: [ "transform", "${_trivia_timer}", "rotateZ", '360deg', { fromValue: '180deg'}], position: 14000, duration: 15000 },
                { id: "eid862", tween: [ "style", "${_round_left_sivuv}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid864", tween: [ "style", "${_round_left_sivuv}", "display", 'block', { fromValue: 'none'}], position: 14000, duration: 0 },
                { id: "eid867", tween: [ "style", "${_round_left_sivuv}", "display", 'none', { fromValue: 'block'}], position: 29000, duration: 0 },
                { id: "eid587", tween: [ "color", "${_colors}", "background-color", 'rgba(175,214,149,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,255,255,1.00)'}], position: 0, duration: 6000 },
                { id: "eid965", tween: [ "color", "${_colors}", "background-color", 'rgba(183,218,159,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(175,214,149,1.00)'}], position: 6000, duration: 5000 },
                { id: "eid589", tween: [ "color", "${_colors}", "background-color", 'rgba(255,174,82,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(183,218,159,1.00)'}], position: 11000, duration: 5000 },
                { id: "eid590", tween: [ "color", "${_colors}", "background-color", 'rgba(218,94,94,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,174,82,1.00)'}], position: 16000, duration: 5000 },
                { id: "eid591", tween: [ "color", "${_colors}", "background-color", 'rgba(218,94,94,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(218,94,94,1.00)'}], position: 29000, duration: 0 },
                { id: "eid660", tween: [ "style", "${_colors}", "display", 'block', { fromValue: 'block'}], position: 0, duration: 0 },
                { id: "eid659", tween: [ "style", "${_colors}", "display", 'none', { fromValue: 'block'}], position: 29000, duration: 0 },
                { id: "eid863", tween: [ "style", "${_half_round_right}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid861", tween: [ "style", "${_half_round_right}", "display", 'block', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid866", tween: [ "style", "${_half_round_right}", "display", 'none', { fromValue: 'block'}], position: 29000, duration: 0 },
                { id: "eid613", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [0] ], ""], position: 0 },
                { id: "eid614", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [0] ], ""], position: 0 },
                { id: "eid615", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [1000] ], ""], position: 1000 },
                { id: "eid616", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [1000] ], ""], position: 1000 },
                { id: "eid617", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [2000] ], ""], position: 2000 },
                { id: "eid618", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [2000] ], ""], position: 2000 },
                { id: "eid619", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [3000] ], ""], position: 3000 },
                { id: "eid620", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [3000] ], ""], position: 3000 },
                { id: "eid621", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [4000] ], ""], position: 4000 },
                { id: "eid622", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [4000] ], ""], position: 4000 },
                { id: "eid623", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [5000] ], ""], position: 5000 },
                { id: "eid624", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [5000] ], ""], position: 5000 },
                { id: "eid625", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [6000] ], ""], position: 6000 },
                { id: "eid626", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [6000] ], ""], position: 6000 },
                { id: "eid627", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [7000] ], ""], position: 7000 },
                { id: "eid628", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [7000] ], ""], position: 7000 },
                { id: "eid629", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [8000] ], ""], position: 8000 },
                { id: "eid630", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [8000] ], ""], position: 8000 },
                { id: "eid631", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [9000] ], ""], position: 9000 },
                { id: "eid632", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [9000] ], ""], position: 9000 },
                { id: "eid633", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [10000] ], ""], position: 10000 },
                { id: "eid634", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [10000] ], ""], position: 10000 },
                { id: "eid635", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [11000] ], ""], position: 11000 },
                { id: "eid636", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [11000] ], ""], position: 11000 },
                { id: "eid637", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [12000] ], ""], position: 12000 },
                { id: "eid638", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [12000] ], ""], position: 12000 },
                { id: "eid639", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [13000] ], ""], position: 13000 },
                { id: "eid640", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [13000] ], ""], position: 13000 },
                { id: "eid641", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [14000] ], ""], position: 14000 },
                { id: "eid642", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [14000] ], ""], position: 14000 },
                { id: "eid643", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_half_round_right}', [15000] ], ""], position: 15000 },
                { id: "eid644", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [15000] ], ""], position: 15000 },
                { id: "eid645", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [16000] ], ""], position: 16000 },
                { id: "eid646", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [17000] ], ""], position: 17000 },
                { id: "eid647", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [18000] ], ""], position: 18000 },
                { id: "eid648", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [19000] ], ""], position: 19000 },
                { id: "eid649", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [20000] ], ""], position: 20000 },
                { id: "eid650", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [21000] ], ""], position: 21000 },
                { id: "eid651", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [22000] ], ""], position: 22000 },
                { id: "eid652", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [23000] ], ""], position: 23000 },
                { id: "eid653", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [24000] ], ""], position: 24000 },
                { id: "eid654", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [25000] ], ""], position: 25000 },
                { id: "eid655", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [26000] ], ""], position: 26000 },
                { id: "eid656", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [27000] ], ""], position: 27000 },
                { id: "eid657", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [28000] ], ""], position: 28000 },
                { id: "eid658", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${_round_left_sivuv}', [29000] ], ""], position: 29000 }            ]
        }
    }
},
"half_round": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    id: 'round',
                    type: 'rect',
                    rect: ['0%', '0%', '50%', '100%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'round',
                symbolName: 'round'
            }            ]
        },
    states: {
        "Base State": {
            "${_round}": [
                ["style", "top", '0%'],
                ["style", "height", '100.02%'],
                ["style", "left", '0%'],
                ["style", "width", '49.98%']
            ],
            "${symbolSelector}": [
                ["style", "height", '70px'],
                ["style", "width", '70px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"half_round_right": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['-100%', '0%', '200%', '100%', 'auto', 'auto'],
                    id: 'tiriva_roundLeft',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tiriva_roundLeft.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_tiriva_roundLeft}": [
                ["style", "top", '0%'],
                ["style", "left", '-100%'],
                ["transform", "rotateZ", '0deg']
            ],
            "${symbolSelector}": [
                ["style", "height", '100.05%'],
                ["style", "overflow", 'hidden'],
                ["style", "width", '50%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 14000,
            autoPlay: false,
            timeline: [
                { id: "eid1014", tween: [ "transform", "${_tiriva_roundLeft}", "rotateZ", '180deg', { fromValue: '0deg'}], position: 0, duration: 14000 }            ]
        }
    }
},
"round_left": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['-100%', '0%', '200.1%', '100%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'colorsCopy3',
                    stroke: [0, 'rgba(255,255,255,1.00)', 'solid'],
                    type: 'ellipse',
                    fill: ['rgba(97,102,108,1.00)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_colorsCopy3}": [
                ["color", "background-color", 'rgba(97,102,108,1.00)'],
                ["style", "top", '0%'],
                ["style", "left", '-100.05%'],
                ["style", "border-style", 'solid'],
                ["style", "height", '99.95%'],
                ["color", "border-color", 'rgba(255,255,255,1.00)'],
                ["style", "border-width", '0px'],
                ["style", "width", '200.1%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100.05%'],
                ["style", "overflow", 'hidden'],
                ["style", "width", '49.99%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"progressBg": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['73%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'Ellipse',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['83.2%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'EllipseCopy',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['93.7%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'EllipseCopy2',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['41.8%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'EllipseCopy5',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['51.9%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'EllipseCopy4',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['62.5%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'EllipseCopy3',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['10.5%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'EllipseCopy8',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['0%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'EllipseCopy9',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['3.2%', '44.4%', '92.6%', '11.1%', 'auto', 'auto'],
                    id: 'Rectangle',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(51,56,59,1)']
                },
                {
                    rect: ['20.7%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'EllipseCopy7',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['31.2%', '0%', '6.3%', '99.9%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'EllipseCopy6',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(51,56,59,1.00)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_EllipseCopy6}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '31.23%'],
                ["style", "width", '6.32%']
            ],
            "${symbolSelector}": [
                ["style", "height", '69.32%'],
                ["style", "width", '97.27%']
            ],
            "${_EllipseCopy7}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '20.7%'],
                ["style", "width", '6.32%']
            ],
            "${_EllipseCopy3}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '62.46%'],
                ["style", "width", '6.32%']
            ],
            "${_EllipseCopy9}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["style", "width", '6.32%']
            ],
            "${_Rectangle}": [
                ["style", "top", '44.39%'],
                ["style", "height", '11.11%'],
                ["style", "left", '3.19%'],
                ["style", "width", '92.6%']
            ],
            "${_EllipseCopy4}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '51.93%'],
                ["style", "width", '6.32%']
            ],
            "${_EllipseCopy8}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '10.53%'],
                ["style", "width", '6.32%']
            ],
            "${_EllipseCopy5}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '41.75%'],
                ["style", "width", '6.32%']
            ],
            "${_EllipseCopy}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '83.16%'],
                ["style", "width", '6.32%']
            ],
            "${_EllipseCopy2}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '93.68%'],
                ["style", "width", '6.32%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '99.89%'],
                ["style", "top", '0%'],
                ["style", "left", '72.98%'],
                ["style", "width", '6.32%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"restartIconAnim": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'image',
                    id: 'trivia_hintIcon50',
                    tag: 'img',
                    rect: ['0.1%', '-36%', '100.2%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_restartIcon.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_hintIcon50}": [
                ["style", "top", '0.07%'],
                ["transform", "rotateZ", '0deg'],
                ["style", "height", '100%'],
                ["style", "opacity", '1'],
                ["style", "left", '0.07%'],
                ["style", "width", '100.14%']
            ],
            "${symbolSelector}": [
                ["style", "height", '48.08%'],
                ["style", "width", '49.91%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1000,
            autoPlay: false,
            timeline: [
                { id: "eid701", tween: [ "transform", "${_trivia_hintIcon50}", "rotateZ", '50deg', { fromValue: '0deg'}], position: 0, duration: 500 },
                { id: "eid702", tween: [ "transform", "${_trivia_hintIcon50}", "rotateZ", '0deg', { fromValue: '50deg'}], position: 500, duration: 500 }            ]
        }
    }
},
"replaceAnim": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'image',
                    id: 'trivia_hintIconReplace2',
                    tag: 'img',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIconReplace2.svg', '0px', '0px']
                },
                {
                    type: 'image',
                    id: 'trivia_hintIconReplace1',
                    tag: 'img',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIconReplace1.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_hintIconReplace2}": [
                ["style", "top", '0%'],
                ["style", "left", '0%']
            ],
            "${_trivia_hintIconReplace1}": [
                ["style", "top", '0%'],
                ["style", "left", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '24px'],
                ["style", "width", '19px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1000,
            autoPlay: false,
            timeline: [
                { id: "eid703", tween: [ "style", "${_trivia_hintIconReplace1}", "left", '-21.05%', { fromValue: '0%'}], position: 0, duration: 500 },
                { id: "eid706", tween: [ "style", "${_trivia_hintIconReplace1}", "left", '-5.26%', { fromValue: '-21.05%'}], position: 500, duration: 500 },
                { id: "eid704", tween: [ "style", "${_trivia_hintIconReplace2}", "left", '21.05%', { fromValue: '0%'}], position: 0, duration: 500 },
                { id: "eid705", tween: [ "style", "${_trivia_hintIconReplace2}", "left", '0%', { fromValue: '21.05%'}], position: 500, duration: 500 }            ]
        }
    }
},
"progresNumbers": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['92.4%', '-22.2%', '9%', '144.4%', 'auto', 'auto'],
                    id: 'trivia_progresCurrent',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresCurrent.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    id: 'trivia_progres1',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres1.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres2.svg', '0px', '0px'],
                    id: 'trivia_progres2',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                },
                {
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres3.svg', '0px', '0px'],
                    id: 'trivia_progres3',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                },
                {
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres4.svg', '0px', '0px'],
                    id: 'trivia_progres4',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                },
                {
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres5.svg', '0px', '0px'],
                    id: 'trivia_progres5',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                },
                {
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres6.svg', '0px', '0px'],
                    id: 'trivia_progres6',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                },
                {
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres7.svg', '0px', '0px'],
                    id: 'trivia_progres7',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                },
                {
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres8.svg', '0px', '0px'],
                    id: 'trivia_progres8',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                },
                {
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres9.svg', '0px', '0px'],
                    id: 'trivia_progres9',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                },
                {
                    type: 'image',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres10.svg', '0px', '0px'],
                    id: 'trivia_progres10',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_progres3}": [
                ["style", "top", '0%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ],
            "${_trivia_progres4}": [
                ["style", "top", '0%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ],
            "${_trivia_progresCurrent}": [
                ["style", "top", '-22.18%'],
                ["transform", "scaleY", '1'],
                ["transform", "scaleX", '1'],
                ["style", "height", '144.44%'],
                ["style", "left", '92.48%'],
                ["style", "width", '9.03%']
            ],
            "${_trivia_progres6}": [
                ["style", "top", '0%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ],
            "${_trivia_progres7}": [
                ["style", "top", '0%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ],
            "${_trivia_progres10}": [
                ["style", "top", '0%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ],
            "${_trivia_progres1}": [
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["style", "display", 'block']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_trivia_progres8}": [
                ["style", "top", '0%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ],
            "${_trivia_progres9}": [
                ["style", "top", '0%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ],
            "${_trivia_progres5}": [
                ["style", "top", '0%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ],
            "${_trivia_progres2}": [
                ["style", "top", '0%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "display", 'none']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 10750,
            autoPlay: false,
            timeline: [
                { id: "eid1134", tween: [ "style", "${_trivia_progres3}", "opacity", '1', { fromValue: '0'}], position: 2500, duration: 250 },
                { id: "eid1123", tween: [ "style", "${_trivia_progres8}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1169", tween: [ "style", "${_trivia_progres8}", "display", 'block', { fromValue: 'none'}], position: 7500, duration: 0 },
                { id: "eid1170", tween: [ "style", "${_trivia_progres8}", "display", 'none', { fromValue: 'block'}], position: 8000, duration: 0 },
                { id: "eid1157", tween: [ "style", "${_trivia_progres4}", "opacity", '1', { fromValue: '0'}], position: 3500, duration: 250 },
                { id: "eid1163", tween: [ "style", "${_trivia_progres6}", "opacity", '1', { fromValue: '0'}], position: 5500, duration: 250 },
                { id: "eid1125", tween: [ "style", "${_trivia_progres6}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1162", tween: [ "style", "${_trivia_progres6}", "display", 'block', { fromValue: 'none'}], position: 5500, duration: 0 },
                { id: "eid1164", tween: [ "style", "${_trivia_progres6}", "display", 'none', { fromValue: 'block'}], position: 6000, duration: 0 },
                { id: "eid1174", tween: [ "style", "${_trivia_progres10}", "opacity", '1', { fromValue: '0'}], position: 9500, duration: 250 },
                { id: "eid1120", tween: [ "style", "${_trivia_progres1}", "display", 'block', { fromValue: 'block'}], position: 0, duration: 0 },
                { id: "eid1130", tween: [ "style", "${_trivia_progres1}", "display", 'none', { fromValue: 'block'}], position: 1000, duration: 0 },
                { id: "eid1158", tween: [ "style", "${_trivia_progres5}", "opacity", '1', { fromValue: '0'}], position: 4500, duration: 250 },
                { id: "eid1122", tween: [ "style", "${_trivia_progres9}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1173", tween: [ "style", "${_trivia_progres9}", "display", 'block', { fromValue: 'none'}], position: 8500, duration: 0 },
                { id: "eid1172", tween: [ "style", "${_trivia_progres9}", "display", 'none', { fromValue: 'block'}], position: 9000, duration: 0 },
                { id: "eid1324", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 1000, duration: 250 },
                { id: "eid1325", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 1250, duration: 250 },
                { id: "eid1417", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 2000, duration: 250 },
                { id: "eid1418", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 2250, duration: 250 },
                { id: "eid1421", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 3000, duration: 250 },
                { id: "eid1422", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 3250, duration: 250 },
                { id: "eid1425", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 4000, duration: 250 },
                { id: "eid1426", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 4250, duration: 250 },
                { id: "eid1429", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 5000, duration: 250 },
                { id: "eid1430", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 5250, duration: 250 },
                { id: "eid1433", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 6000, duration: 250 },
                { id: "eid1434", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 6250, duration: 250 },
                { id: "eid1437", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 7000, duration: 250 },
                { id: "eid1438", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 7250, duration: 250 },
                { id: "eid1441", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 8000, duration: 250 },
                { id: "eid1442", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 8250, duration: 250 },
                { id: "eid1445", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 9000, duration: 250 },
                { id: "eid1446", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 9250, duration: 250 },
                { id: "eid1322", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 1000, duration: 250 },
                { id: "eid1323", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 1250, duration: 250 },
                { id: "eid1419", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 2000, duration: 250 },
                { id: "eid1420", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 2250, duration: 250 },
                { id: "eid1423", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 3000, duration: 250 },
                { id: "eid1424", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 3250, duration: 250 },
                { id: "eid1427", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 4000, duration: 250 },
                { id: "eid1428", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 4250, duration: 250 },
                { id: "eid1431", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 5000, duration: 250 },
                { id: "eid1432", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 5250, duration: 250 },
                { id: "eid1435", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 6000, duration: 250 },
                { id: "eid1436", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 6250, duration: 250 },
                { id: "eid1439", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 7000, duration: 250 },
                { id: "eid1440", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 7250, duration: 250 },
                { id: "eid1443", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 8000, duration: 250 },
                { id: "eid1444", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 8250, duration: 250 },
                { id: "eid1447", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 9000, duration: 250 },
                { id: "eid1448", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 9250, duration: 250 },
                { id: "eid1326", tween: [ "style", "${_trivia_progresCurrent}", "left", '81.93%', { fromValue: '92.48%'}], position: 1000, duration: 500 },
                { id: "eid1454", tween: [ "style", "${_trivia_progresCurrent}", "left", '71.5%', { fromValue: '81.93%'}], position: 2000, duration: 500 },
                { id: "eid1456", tween: [ "style", "${_trivia_progresCurrent}", "left", '61.08%', { fromValue: '71.5%'}], position: 3000, duration: 500 },
                { id: "eid1458", tween: [ "style", "${_trivia_progresCurrent}", "left", '50.65%', { fromValue: '61.08%'}], position: 4000, duration: 500 },
                { id: "eid1460", tween: [ "style", "${_trivia_progresCurrent}", "left", '40.23%', { fromValue: '50.65%'}], position: 5000, duration: 500 },
                { id: "eid1462", tween: [ "style", "${_trivia_progresCurrent}", "left", '29.8%', { fromValue: '40.23%'}], position: 6000, duration: 500 },
                { id: "eid1464", tween: [ "style", "${_trivia_progresCurrent}", "left", '19.38%', { fromValue: '29.8%'}], position: 7000, duration: 500 },
                { id: "eid1467", tween: [ "style", "${_trivia_progresCurrent}", "left", '8.95%', { fromValue: '19.38%'}], position: 8000, duration: 500 },
                { id: "eid1469", tween: [ "style", "${_trivia_progresCurrent}", "left", '-1.48%', { fromValue: '8.95%'}], position: 9000, duration: 500 },
                { id: "eid1127", tween: [ "style", "${_trivia_progres4}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1156", tween: [ "style", "${_trivia_progres4}", "display", 'block', { fromValue: 'none'}], position: 3000, duration: 0 },
                { id: "eid1135", tween: [ "style", "${_trivia_progres4}", "display", 'block', { fromValue: 'block'}], position: 4000, duration: 0 },
                { id: "eid1161", tween: [ "style", "${_trivia_progres4}", "display", 'none', { fromValue: 'block'}], position: 4250, duration: 0 },
                { id: "eid1171", tween: [ "style", "${_trivia_progres9}", "opacity", '1', { fromValue: '0'}], position: 8500, duration: 250 },
                { id: "eid1126", tween: [ "style", "${_trivia_progres5}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1159", tween: [ "style", "${_trivia_progres5}", "display", 'block', { fromValue: 'none'}], position: 4500, duration: 0 },
                { id: "eid1160", tween: [ "style", "${_trivia_progres5}", "display", 'none', { fromValue: 'block'}], position: 5000, duration: 0 },
                { id: "eid1128", tween: [ "style", "${_trivia_progres3}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1133", tween: [ "style", "${_trivia_progres3}", "display", 'block', { fromValue: 'none'}], position: 2500, duration: 0 },
                { id: "eid1154", tween: [ "style", "${_trivia_progres3}", "display", 'none', { fromValue: 'block'}], position: 3000, duration: 0 },
                { id: "eid1129", tween: [ "style", "${_trivia_progres2}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1131", tween: [ "style", "${_trivia_progres2}", "display", 'block', { fromValue: 'none'}], position: 1500, duration: 0 },
                { id: "eid1155", tween: [ "style", "${_trivia_progres2}", "display", 'none', { fromValue: 'block'}], position: 2000, duration: 0 },
                { id: "eid1153", tween: [ "style", "${_trivia_progres2}", "display", 'none', { fromValue: 'none'}], position: 3000, duration: 0 },
                { id: "eid1119", tween: [ "style", "${_trivia_progres2}", "opacity", '1', { fromValue: '0'}], position: 1500, duration: 250 },
                { id: "eid1121", tween: [ "style", "${_trivia_progres10}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1175", tween: [ "style", "${_trivia_progres10}", "display", 'block', { fromValue: 'none'}], position: 9500, duration: 0 },
                { id: "eid1176", tween: [ "style", "${_trivia_progres10}", "display", 'none', { fromValue: 'block'}], position: 10750, duration: 0 },
                { id: "eid1168", tween: [ "style", "${_trivia_progres8}", "opacity", '1', { fromValue: '0'}], position: 7500, duration: 250 },
                { id: "eid1124", tween: [ "style", "${_trivia_progres7}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1165", tween: [ "style", "${_trivia_progres7}", "display", 'block', { fromValue: 'none'}], position: 6500, duration: 0 },
                { id: "eid1167", tween: [ "style", "${_trivia_progres7}", "display", 'none', { fromValue: 'block'}], position: 7000, duration: 0 },
                { id: "eid1166", tween: [ "style", "${_trivia_progres7}", "opacity", '1', { fromValue: '0'}], position: 6500, duration: 250 }            ]
        }
    }
},
"icon50Anim": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'image',
                    id: 'trivia_hintIcon502',
                    tag: 'img',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIcon502.svg', '0px', '0px']
                },
                {
                    type: 'image',
                    id: 'trivia_hintIcon503',
                    tag: 'img',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIcon503.svg', '0px', '0px']
                },
                {
                    type: 'image',
                    id: 'trivia_hintIcon501',
                    tag: 'img',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIcon501.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_hintIcon502}": [
                ["style", "top", '0%'],
                ["style", "left", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '76.92%'],
                ["style", "width", '45.97%']
            ],
            "${_trivia_hintIcon501}": [
                ["style", "top", '0%'],
                ["style", "left", '0%']
            ],
            "${_trivia_hintIcon503}": [
                ["style", "top", '0%'],
                ["style", "left", '0%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 575,
            autoPlay: false,
            timeline: [
                { id: "eid742", tween: [ "style", "${_trivia_hintIcon503}", "top", '-50%', { fromValue: '0%'}], position: 0, duration: 575 },
                { id: "eid741", tween: [ "style", "${_trivia_hintIcon501}", "top", '50%', { fromValue: '0%'}], position: 0, duration: 575 }            ]
        }
    }
},
"timeIconAnim": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'image',
                    id: 'trivia_hintIconTime2',
                    tag: 'img',
                    rect: ['0%', '0%', '100.1%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIconTime2.svg', '0px', '0px']
                },
                {
                    type: 'image',
                    id: 'trivia_hintIconTime2Copy',
                    tag: 'img',
                    rect: ['0%', '0%', '100.1%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIconTime2.svg', '0px', '0px']
                },
                {
                    type: 'image',
                    id: 'trivia_hintIconTime1',
                    tag: 'img',
                    rect: ['0%', '0%', '100.1%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIconTime1.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_hintIconTime2Copy}": [
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["transform", "rotateZ", '0deg']
            ],
            "${_trivia_hintIconTime1}": [
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["transform", "rotateZ", '0deg']
            ],
            "${_trivia_hintIconTime2}": [
                ["style", "left", '0%'],
                ["style", "top", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '50%'],
                ["style", "width", '51.97%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1000,
            autoPlay: false,
            timeline: [
                { id: "eid752", tween: [ "transform", "${_trivia_hintIconTime2Copy}", "rotateZ", '-42deg', { fromValue: '0deg'}], position: 0, duration: 500 },
                { id: "eid757", tween: [ "transform", "${_trivia_hintIconTime2Copy}", "rotateZ", '0deg', { fromValue: '-42deg'}], position: 500, duration: 500 },
                { id: "eid753", tween: [ "transform", "${_trivia_hintIconTime1}", "rotateZ", '-42deg', { fromValue: '0deg'}], position: 0, duration: 500 },
                { id: "eid756", tween: [ "transform", "${_trivia_hintIconTime1}", "rotateZ", '0deg', { fromValue: '-42deg'}], position: 500, duration: 500 }            ]
        }
    }
},
"muteIconOnAnim": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'image',
                    id: 'trivia_muteOnIcon',
                    tag: 'img',
                    rect: ['13.6%', '0%', '85%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_muteOnIcon.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_muteOnIcon}": [
                ["style", "top", '0%'],
                ["transform", "scaleX", '1'],
                ["transform", "scaleY", '1'],
                ["style", "left", '13.6%']
            ],
            "${symbolSelector}": [
                ["style", "height", '48.08%'],
                ["style", "width", '60.05%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 500,
            autoPlay: false,
            timeline: [
                { id: "eid989", tween: [ "transform", "${_trivia_muteOnIcon}", "scaleX", '1.1', { fromValue: '1'}], position: 0, duration: 250 },
                { id: "eid990", tween: [ "transform", "${_trivia_muteOnIcon}", "scaleX", '1', { fromValue: '1.1'}], position: 250, duration: 250 },
                { id: "eid991", tween: [ "transform", "${_trivia_muteOnIcon}", "scaleY", '1.1', { fromValue: '1'}], position: 0, duration: 250 },
                { id: "eid992", tween: [ "transform", "${_trivia_muteOnIcon}", "scaleY", '1', { fromValue: '1.1'}], position: 250, duration: 250 }            ]
        }
    }
},
"muteIconOffAnim": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['3.3%', '0%', '93.3%', '100%', 'auto', 'auto'],
                    id: 'trivia_muteOffIcon',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_muteOffIcon.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_muteOffIcon}": [
                ["style", "top", '0%'],
                ["transform", "scaleX", '1'],
                ["transform", "scaleY", '1'],
                ["style", "left", '3.33%']
            ],
            "${symbolSelector}": [
                ["style", "height", '48.08%'],
                ["style", "width", '60.05%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 500,
            autoPlay: false,
            timeline: [
                { id: "eid997", tween: [ "transform", "${_trivia_muteOffIcon}", "scaleX", '1.1', { fromValue: '1'}], position: 0, duration: 250 },
                { id: "eid998", tween: [ "transform", "${_trivia_muteOffIcon}", "scaleX", '1', { fromValue: '1.1'}], position: 250, duration: 250 },
                { id: "eid999", tween: [ "transform", "${_trivia_muteOffIcon}", "scaleY", '1.1', { fromValue: '1'}], position: 0, duration: 250 },
                { id: "eid1000", tween: [ "transform", "${_trivia_muteOffIcon}", "scaleY", '1', { fromValue: '1.1'}], position: 250, duration: 250 }            ]
        }
    }
},
"startIconAnim": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'image',
                    id: 'trivia_hintIcon50',
                    tag: 'img',
                    rect: ['0.2%', '-52.7%', '100.1%', '100.1%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_openingIcon.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_hintIcon50}": [
                ["style", "top", '-0.01%'],
                ["style", "height", '99.97%'],
                ["style", "opacity", '1'],
                ["style", "left", '0.06%'],
                ["style", "width", '100.05%']
            ],
            "${symbolSelector}": [
                ["style", "height", '45.87%'],
                ["style", "width", '28.38%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 500,
            autoPlay: false,
            timeline: [
                { id: "eid1007", tween: [ "style", "${_trivia_hintIcon50}", "left", '11.14%', { fromValue: '0.06%'}], position: 0, duration: 250 },
                { id: "eid1008", tween: [ "style", "${_trivia_hintIcon50}", "left", '0.01%', { fromValue: '11.14%'}], position: 250, duration: 250 }            ]
        }
    }
},
"opening_teacher": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'rect',
                    id: 'Rectangle2Copy',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(51,56,59,1)']
                },
                {
                    type: 'rect',
                    id: 'Rectangle',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    rect: ['2.2%', '15.2%', '95.5%', '71.5%', 'auto', 'auto'],
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['7.7%', '40.4%', '84.5%', '9.6%', 'auto', 'auto'],
                    userClass: 'text',
                    align: 'center',
                    id: 'Text',
                    text: 'התלמיד לא ביצע את הפעילות',
                    font: ['Arial, Helvetica, sans-serif', [218.75, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', ''],
                    type: 'text'
                },
                {
                    type: 'rect',
                    id: 'Rectangle3',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    rect: ['26.3%', '0%', '47.3%', '13%', 'auto', 'auto'],
                    fill: ['rgba(97,102,108,1.00)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_Rectangle3}": [
                ["color", "background-color", 'rgba(97,102,108,1.00)'],
                ["style", "left", '26.28%']
            ],
            "${_Text}": [
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "left", '7.68%'],
                ["style", "font-size", '218.75%'],
                ["style", "top", '40.37%'],
                ["style", "text-align", 'center'],
                ["style", "text-indent", '0%'],
                ["style", "height", '9.62%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '84.54%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '71.48%'],
                ["style", "top", '15.16%'],
                ["style", "left", '2.21%'],
                ["style", "width", '95.47%']
            ],
            "${_Rectangle2Copy}": [
                ["style", "top", '-0.01%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "overflow", 'hidden']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"feedback_AR": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    rect: ['0%', '-0.2%', '100%', '100%', 'auto', 'auto'],
                    id: 'Rectangle2',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(51,56,59,1)']
                },
                {
                    rect: ['2.3%', '15.2%', '95.5%', '71.5%', 'auto', 'auto'],
                    id: 'Rectangle',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'rect',
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    transform: [],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_openingBg.svg', '0px', '0px'],
                    type: 'image',
                    id: 'trivia_openingBg',
                    opacity: 1,
                    rect: ['2.3%', '15.7%', '95.5%', '70.4%', 'auto', 'auto'],
                    tag: 'img'
                },
                {
                    rect: ['5.1%', '19.3%', '89.7%', '61.9%', 'auto', 'auto'],
                    id: 'trivia_feedbackBg',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_feedbackBg.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    id: 'feedback_elements',
                    type: 'rect',
                    rect: ['50.4%', '32.4%', '18.4%', '11.1%', 'auto', 'auto']
                },
                {
                    id: 'feedback_elementsCopy',
                    type: 'rect',
                    rect: ['50.4%', '44.4%', '18.4%', '11.1%', 'auto', 'auto']
                },
                {
                    rect: ['50.4%', '56.5%', '18.4%', '11.1%', 'auto', 'auto'],
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    id: 'Rectangle3',
                    opacity: 0.8,
                    type: 'rect',
                    fill: ['rgba(255,148,59,1.00)']
                },
                {
                    rect: ['31.1%', '56.5%', '18.4%', '11.1%', 'auto', 'auto'],
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    id: 'Rectangle3Copy',
                    opacity: 0.8,
                    type: 'rect',
                    fill: ['rgba(255,148,59,1.00)']
                },
                {
                    id: 'feedback_elementsCopy3',
                    type: 'rect',
                    rect: ['31.1%', '32.4%', 'auto', 'auto', 'auto', 'auto']
                },
                {
                    id: 'feedback_elementsCopy2',
                    type: 'rect',
                    rect: ['31.1%', '44.4%', 'auto', 'auto', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [400, '%'], 'rgba(126,203,210,1.00)', 'normal', 'none', ''],
                    type: 'text',
                    id: 'Text',
                    text: 'النتيجة',
                    align: 'center',
                    rect: ['39.4%', '17.8%', '21.1%', '13.5%', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [175, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal'],
                    type: 'text',
                    id: 'Text2',
                    text: 'مجموع الأسئلة',
                    align: 'left',
                    rect: ['51.5%', '35.2%', '17.6%', '10%', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [175, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal'],
                    type: 'text',
                    id: 'Text2Copy',
                    text: 'إجابات صحيحة',
                    align: 'left',
                    rect: ['51.5%', '47%', '16.4%', '8.9%', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [175, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal'],
                    type: 'text',
                    id: 'Text2Copy2',
                    text: 'العلامة',
                    align: 'left',
                    rect: ['51.5%', '59.6%', '14%', '7.8%', 'auto', 'auto']
                },
                {
                    font: ['Arial, Helvetica, sans-serif', [237.5, '%'], 'rgba(255,255,255,1)', 'normal', 'none', 'normal'],
                    rect: ['31.1%', '32.8%', '16.4%', '34.4%', 'auto', 'auto'],
                    type: 'text',
                    id: 'Text_xml',
                    text: '10<br>5<br>123456',
                    align: 'right',
                    userClass: 'feedback-current-score text'
                }
            ],
            symbolInstances: [
            {
                id: 'feedback_elementsCopy',
                symbolName: 'feedback_elements'
            },
            {
                id: 'feedback_elementsCopy2',
                symbolName: 'feedback_elements'
            },
            {
                id: 'feedback_elements',
                symbolName: 'feedback_elements'
            },
            {
                id: 'feedback_elementsCopy3',
                symbolName: 'feedback_elements'
            }            ]
        },
    states: {
        "Base State": {
            "${_feedback_elementsCopy}": [
                ["style", "top", '44.44%'],
                ["style", "height", '11.11%'],
                ["style", "opacity", '0'],
                ["style", "left", '69.82%'],
                ["style", "width", '18.39%']
            ],
            "${_Rectangle2}": [
                ["style", "top", '-0.19%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%']
            ],
            "${_feedback_elements}": [
                ["style", "top", '32.41%'],
                ["style", "height", '11.11%'],
                ["style", "opacity", '0'],
                ["style", "left", '75.63%'],
                ["style", "width", '18.39%']
            ],
            "${_feedback_elementsCopy3}": [
                ["style", "top", '32.41%'],
                ["style", "opacity", '0'],
                ["style", "left", '4.3%']
            ],
            "${_Rectangle3Copy}": [
                ["color", "background-color", 'rgba(255,148,59,1.00)'],
                ["style", "top", '56.48%'],
                ["style", "height", '11.11%'],
                ["style", "opacity", '0'],
                ["style", "left", '14.54%'],
                ["style", "width", '18.38%']
            ],
            "${_trivia_feedbackBg}": [
                ["style", "top", '19.26%'],
                ["style", "opacity", '0'],
                ["style", "left", '5.12%']
            ],
            "${_Text2}": [
                ["style", "line-height", '83%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "opacity", '0'],
                ["style", "left", '51.51%'],
                ["style", "font-size", '175%'],
                ["style", "top", '35.15%'],
                ["style", "text-align", 'left'],
                ["style", "text-indent", '0%'],
                ["style", "height", '10%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '17.56%']
            ],
            "${_Text_xml}": [
                ["style", "line-height", '166%'],
                ["style", "letter-spacing", '0em'],
                ["style", "opacity", '0'],
                ["style", "left", '31.05%'],
                ["style", "font-size", '237.5%'],
                ["style", "top", '32.78%'],
                ["style", "text-align", 'right'],
                ["style", "text-indent", '0%'],
                ["style", "height", '34.44%'],
                ["style", "font-family", 'Arial, Helvetica, sans-serif'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '16.4%']
            ],
            "${_Text2Copy2}": [
                ["style", "line-height", '50%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "opacity", '0'],
                ["style", "left", '51.51%'],
                ["style", "font-size", '175%'],
                ["style", "top", '59.62%'],
                ["style", "text-align", 'left'],
                ["style", "text-indent", '0%'],
                ["style", "height", '7.78%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '13.96%']
            ],
            "${_Rectangle3}": [
                ["color", "background-color", 'rgba(255,148,59,1.00)'],
                ["style", "top", '56.48%'],
                ["style", "height", '11.11%'],
                ["style", "opacity", '0'],
                ["style", "left", '63.49%'],
                ["style", "width", '18.38%']
            ],
            "${_Text}": [
                ["style", "line-height", '101%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(126,203,210,1.00)'],
                ["style", "opacity", '0'],
                ["style", "left", '39.42%'],
                ["style", "font-size", '400%'],
                ["style", "top", '2.98%'],
                ["style", "text-align", 'center'],
                ["style", "text-indent", '0%'],
                ["style", "height", '13.5%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '21.05%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_trivia_openingBg}": [
                ["style", "top", '15.72%'],
                ["transform", "scaleY", '1'],
                ["transform", "rotateZ", '180deg'],
                ["transform", "scaleX", '1'],
                ["style", "opacity", '0'],
                ["style", "left", '2.33%']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "top", '15.16%'],
                ["style", "height", '71.48%'],
                ["style", "opacity", '0'],
                ["style", "left", '2.29%'],
                ["style", "width", '95.5%']
            ],
            "${_feedback_elementsCopy2}": [
                ["style", "top", '44.44%'],
                ["style", "opacity", '0'],
                ["style", "left", '8.72%']
            ],
            "${_Text2Copy}": [
                ["style", "line-height", '86%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "opacity", '0'],
                ["style", "left", '51.51%'],
                ["style", "width", '16.4%'],
                ["style", "top", '47.01%'],
                ["style", "text-align", 'left'],
                ["style", "text-indent", '0%'],
                ["style", "height", '8.89%'],
                ["style", "word-spacing", '0em'],
                ["style", "font-size", '175%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1000,
            autoPlay: true,
            timeline: [
                { id: "eid827", tween: [ "style", "${_Text_xml}", "opacity", '0', { fromValue: '0'}], position: 0, duration: 0 },
                { id: "eid823", tween: [ "style", "${_Text_xml}", "opacity", '1', { fromValue: '0'}], position: 703, duration: 297, easing: "easeInOutQuad" },
                { id: "eid770", tween: [ "style", "${_feedback_elementsCopy2}", "left", '31.05%', { fromValue: '8.72%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid811", tween: [ "style", "${_Rectangle3}", "opacity", '0.80851063829787', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid810", tween: [ "style", "${_Rectangle3Copy}", "opacity", '0.80851063829787', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid852", tween: [ "style", "${_trivia_openingBg}", "opacity", '1', { fromValue: '0'}], position: 250, duration: 639, easing: "easeInOutQuad" },
                { id: "eid808", tween: [ "style", "${_feedback_elementsCopy3}", "opacity", '1', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid831", tween: [ "style", "${_Text}", "opacity", '1', { fromValue: '0'}], position: 0, duration: 1000, easing: "easeInQuad" },
                { id: "eid780", tween: [ "style", "${_Rectangle3}", "left", '50.35%', { fromValue: '63.49%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid846", tween: [ "style", "${_trivia_feedbackBg}", "opacity", '1', { fromValue: '0'}], position: 250, duration: 639, easing: "easeInOutQuad" },
                { id: "eid829", tween: [ "style", "${_Text}", "top", '15.87%', { fromValue: '2.98%'}], position: 0, duration: 1000, easing: "easeOutQuad" },
                { id: "eid826", tween: [ "style", "${_Text2Copy}", "opacity", '0', { fromValue: '0'}], position: 0, duration: 0 },
                { id: "eid821", tween: [ "style", "${_Text2Copy}", "opacity", '1', { fromValue: '0'}], position: 703, duration: 297, easing: "easeInOutQuad" },
                { id: "eid772", tween: [ "style", "${_Rectangle3Copy}", "left", '31.05%', { fromValue: '14.54%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid806", tween: [ "style", "${_feedback_elementsCopy}", "opacity", '1', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid774", tween: [ "style", "${_feedback_elements}", "left", '50.4%', { fromValue: '75.63%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid807", tween: [ "style", "${_feedback_elementsCopy2}", "opacity", '1', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid824", tween: [ "style", "${_Text2Copy2}", "opacity", '0', { fromValue: '0'}], position: 0, duration: 0 },
                { id: "eid817", tween: [ "style", "${_Text2Copy2}", "opacity", '1', { fromValue: '0'}], position: 703, duration: 297, easing: "easeInOutQuad" },
                { id: "eid809", tween: [ "style", "${_feedback_elements}", "opacity", '1', { fromValue: '0'}], position: 123, duration: 766 },
                { id: "eid825", tween: [ "style", "${_Text2}", "opacity", '0', { fromValue: '0'}], position: 0, duration: 0 },
                { id: "eid819", tween: [ "style", "${_Text2}", "opacity", '1', { fromValue: '0'}], position: 703, duration: 297, easing: "easeInOutQuad" },
                { id: "eid766", tween: [ "style", "${_feedback_elementsCopy3}", "left", '31.05%', { fromValue: '4.3%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid778", tween: [ "style", "${_feedback_elementsCopy}", "left", '50.4%', { fromValue: '69.82%'}], position: 123, duration: 766, easing: "easeOutSine" },
                { id: "eid833", tween: [ "style", "${_Rectangle}", "opacity", '1', { fromValue: '0.000000'}], position: 0, duration: 250, easing: "easeInOutQuad" }            ]
        }
    }
},
"opening_teacher_AR": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'rect',
                    id: 'Rectangle2Copy',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(51,56,59,1)']
                },
                {
                    type: 'rect',
                    id: 'Rectangle',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    rect: ['2.2%', '15.2%', '95.5%', '71.5%', 'auto', 'auto'],
                    fill: ['rgba(51,56,59,1.00)']
                },
                {
                    rect: ['7.7%', '40.4%', '84.5%', '9.6%', 'auto', 'auto'],
                    userClass: 'text',
                    align: 'center',
                    id: 'Text',
                    text: 'التلميذ لم ينفّذ الفعالية',
                    font: ['Arial, Helvetica, sans-serif', [218.75, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', ''],
                    type: 'text'
                },
                {
                    type: 'rect',
                    id: 'Rectangle4',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    rect: ['28.4%', '0%', '51.9%', '13.2%', 'auto', 'auto'],
                    fill: ['rgba(97,102,108,1)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_Text}": [
                ["style", "line-height", '119%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "left", '7.68%'],
                ["style", "font-size", '218.75%'],
                ["style", "top", '40.37%'],
                ["style", "text-align", 'center'],
                ["style", "text-indent", '0%'],
                ["style", "height", '9.62%'],
                ["style", "word-spacing", '0em'],
                ["style", "width", '84.54%']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(51,56,59,1.00)'],
                ["style", "height", '71.48%'],
                ["style", "top", '15.16%'],
                ["style", "left", '2.21%'],
                ["style", "width", '95.47%']
            ],
            "${_Rectangle2Copy}": [
                ["style", "top", '-0.01%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "overflow", 'hidden']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: true,
            timeline: [
            ]
        }
    }
},
"progressAnim": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    type: 'image',
                    id: 'trivia_progresCurrent',
                    tag: 'img',
                    rect: ['0%', '0%', '26px', '26px', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresCurrent.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_progresCurrent}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1'],
                ["transform", "scaleX", '1'],
                ["style", "height", '26px'],
                ["style", "left", '0%'],
                ["style", "width", '26px']
            ],
            "${symbolSelector}": [
                ["style", "height", '26px'],
                ["style", "width", '26px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 500,
            autoPlay: true,
            timeline: [
                { id: "eid1069", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '0.31', { fromValue: '1'}], position: 0, duration: 250 },
                { id: "eid1071", tween: [ "transform", "${_trivia_progresCurrent}", "scaleY", '1', { fromValue: '0.31'}], position: 250, duration: 250 },
                { id: "eid1068", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '0.31', { fromValue: '1'}], position: 0, duration: 250 },
                { id: "eid1070", tween: [ "transform", "${_trivia_progresCurrent}", "scaleX", '1', { fromValue: '0.31'}], position: 250, duration: 250 }            ]
        }
    }
},
"progres": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    id: 'trivia_progresBg',
                    type: 'image',
                    rect: ['0%', '0%', '100%', '100.2%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresBg.svg', '0px', '0px']
                },
                {
                    id: 'progresNumbers2',
                    type: 'rect',
                    transform: [[0, 0], [], [], ['1', '0.99833']],
                    rect: ['0%', '-0.1%', '100%', '100%', 'auto', 'auto']
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['93.7%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ1',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-1'
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['83.3%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ2',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-2'
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['72.9%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ3',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-3'
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['62.5%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ4',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-4'
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['52.1%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ5',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-5'
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['41.7%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ6',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-6'
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['31.2%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ7',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-7'
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['20.8%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ8',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-8'
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['10.4%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ9',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-9'
                },
                {
                    transform: [[0, 0], [], [], ['1.22222', '1.22222']],
                    rect: ['0%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                    id: 'pastQ10',
                    type: 'rect',
                    display: 'none',
                    userClass: 'progress-item-10'
                }
            ],
            symbolInstances: [
            {
                id: 'pastQ6',
                symbolName: 'pastQ'
            },
            {
                id: 'pastQ8',
                symbolName: 'pastQ'
            },
            {
                id: 'pastQ2',
                symbolName: 'pastQ'
            },
            {
                id: 'pastQ3',
                symbolName: 'pastQ'
            },
            {
                id: 'pastQ1',
                symbolName: 'pastQ'
            },
            {
                id: 'pastQ10',
                symbolName: 'pastQ'
            },
            {
                id: 'progresNumbers2',
                symbolName: 'progresNumbers'
            },
            {
                id: 'pastQ7',
                symbolName: 'pastQ'
            },
            {
                id: 'pastQ9',
                symbolName: 'pastQ'
            },
            {
                id: 'pastQ5',
                symbolName: 'pastQ'
            },
            {
                id: 'pastQ4',
                symbolName: 'pastQ'
            }            ]
        },
    states: {
        "Base State": {
            "${_progresNumbers2}": [
                ["style", "top", '-0.08%'],
                ["transform", "scaleY", '0.99833'],
                ["style", "height", '100%'],
                ["style", "display", 'block'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${_pastQ9}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '10.41%'],
                ["style", "width", '6.25%']
            ],
            "${_pastQ7}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '31.23%'],
                ["style", "width", '6.25%']
            ],
            "${_pastQ4}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '62.48%'],
                ["style", "width", '6.25%']
            ],
            "${_pastQ1}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '93.72%'],
                ["style", "width", '6.25%']
            ],
            "${symbolSelector}": [
                ["style", "height", '3.33%'],
                ["style", "width", '33.49%']
            ],
            "${_pastQ6}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '41.66%'],
                ["style", "width", '6.25%']
            ],
            "${_pastQ10}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '-0.02%'],
                ["style", "width", '6.25%']
            ],
            "${_trivia_progresBg}": [
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["style", "height", '99.96%']
            ],
            "${_pastQ2}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '83.32%'],
                ["style", "width", '6.25%']
            ],
            "${_pastQ5}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '52.07%'],
                ["style", "width", '6.25%']
            ],
            "${_pastQ3}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '72.91%'],
                ["style", "width", '6.25%']
            ],
            "${_pastQ8}": [
                ["style", "top", '0%'],
                ["transform", "scaleY", '1.22222'],
                ["style", "display", 'none'],
                ["transform", "scaleX", '1.22222'],
                ["style", "height", '100.19%'],
                ["style", "left", '20.82%'],
                ["style", "width", '6.25%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 10000,
            autoPlay: false,
            labels: {
                "1": 0,
                "2": 1000,
                "3": 2000,
                "4": 3000,
                "5": 4000,
                "6": 5000,
                "7": 6000,
                "8": 7000,
                "9": 8000,
                "10": 9000,
                "end": 10000
            },
            timeline: [
                { id: "eid1208", tween: [ "style", "${_pastQ2}", "display", 'none', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1209", tween: [ "style", "${_pastQ2}", "display", 'block', { fromValue: 'none'}], position: 2000, duration: 0 },
                { id: "eid1272", tween: [ "style", "${_pastQ2}", "display", 'block', { fromValue: 'block'}], position: 3000, duration: 0 },
                { id: "eid1269", tween: [ "style", "${_pastQ2}", "display", 'block', { fromValue: 'block'}], position: 4000, duration: 0 },
                { id: "eid1265", tween: [ "style", "${_pastQ2}", "display", 'block', { fromValue: 'block'}], position: 5000, duration: 0 },
                { id: "eid1261", tween: [ "style", "${_pastQ2}", "display", 'block', { fromValue: 'block'}], position: 6000, duration: 0 },
                { id: "eid1256", tween: [ "style", "${_pastQ2}", "display", 'block', { fromValue: 'block'}], position: 7000, duration: 0 },
                { id: "eid1246", tween: [ "style", "${_pastQ2}", "display", 'block', { fromValue: 'block'}], position: 8000, duration: 0 },
                { id: "eid1238", tween: [ "style", "${_pastQ2}", "display", 'block', { fromValue: 'block'}], position: 9000, duration: 0 },
                { id: "eid1229", tween: [ "style", "${_pastQ2}", "display", 'block', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1274", tween: [ "style", "${_pastQ1}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid1199", tween: [ "style", "${_pastQ1}", "display", 'block', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1273", tween: [ "style", "${_pastQ1}", "display", 'block', { fromValue: 'block'}], position: 3000, duration: 0 },
                { id: "eid1270", tween: [ "style", "${_pastQ1}", "display", 'block', { fromValue: 'block'}], position: 4000, duration: 0 },
                { id: "eid1266", tween: [ "style", "${_pastQ1}", "display", 'block', { fromValue: 'block'}], position: 5000, duration: 0 },
                { id: "eid1262", tween: [ "style", "${_pastQ1}", "display", 'block', { fromValue: 'block'}], position: 6000, duration: 0 },
                { id: "eid1257", tween: [ "style", "${_pastQ1}", "display", 'block', { fromValue: 'block'}], position: 7000, duration: 0 },
                { id: "eid1245", tween: [ "style", "${_pastQ1}", "display", 'block', { fromValue: 'block'}], position: 8000, duration: 0 },
                { id: "eid1237", tween: [ "style", "${_pastQ1}", "display", 'block', { fromValue: 'block'}], position: 9000, duration: 0 },
                { id: "eid1228", tween: [ "style", "${_pastQ1}", "display", 'block', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1205", tween: [ "style", "${_pastQ5}", "display", 'none', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1212", tween: [ "style", "${_pastQ5}", "display", 'none', { fromValue: 'none'}], position: 2000, duration: 0 },
                { id: "eid1275", tween: [ "style", "${_pastQ5}", "display", 'block', { fromValue: 'none'}], position: 5000, duration: 0 },
                { id: "eid1258", tween: [ "style", "${_pastQ5}", "display", 'block', { fromValue: 'block'}], position: 6000, duration: 0 },
                { id: "eid1253", tween: [ "style", "${_pastQ5}", "display", 'block', { fromValue: 'block'}], position: 7000, duration: 0 },
                { id: "eid1249", tween: [ "style", "${_pastQ5}", "display", 'block', { fromValue: 'block'}], position: 8000, duration: 0 },
                { id: "eid1241", tween: [ "style", "${_pastQ5}", "display", 'block', { fromValue: 'block'}], position: 9000, duration: 0 },
                { id: "eid1232", tween: [ "style", "${_pastQ5}", "display", 'block', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1202", tween: [ "style", "${_pastQ8}", "display", 'none', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1215", tween: [ "style", "${_pastQ8}", "display", 'none', { fromValue: 'none'}], position: 2000, duration: 0 },
                { id: "eid1279", tween: [ "style", "${_pastQ8}", "display", 'block', { fromValue: 'none'}], position: 8000, duration: 0 },
                { id: "eid1244", tween: [ "style", "${_pastQ8}", "display", 'block', { fromValue: 'block'}], position: 9000, duration: 0 },
                { id: "eid1235", tween: [ "style", "${_pastQ8}", "display", 'block', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1203", tween: [ "style", "${_pastQ7}", "display", 'none', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1214", tween: [ "style", "${_pastQ7}", "display", 'none', { fromValue: 'none'}], position: 2000, duration: 0 },
                { id: "eid1277", tween: [ "style", "${_pastQ7}", "display", 'block', { fromValue: 'none'}], position: 7000, duration: 0 },
                { id: "eid1251", tween: [ "style", "${_pastQ7}", "display", 'block', { fromValue: 'block'}], position: 8000, duration: 0 },
                { id: "eid1243", tween: [ "style", "${_pastQ7}", "display", 'block', { fromValue: 'block'}], position: 9000, duration: 0 },
                { id: "eid1234", tween: [ "style", "${_pastQ7}", "display", 'block', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1321", tween: [ "style", "${_progresNumbers2}", "display", 'block', { fromValue: 'block'}], position: 0, duration: 0 },
                { id: "eid1320", tween: [ "style", "${_progresNumbers2}", "display", 'none', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1200", tween: [ "style", "${_pastQ10}", "display", 'none', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1217", tween: [ "style", "${_pastQ10}", "display", 'none', { fromValue: 'none'}], position: 2000, duration: 0 },
                { id: "eid1281", tween: [ "style", "${_pastQ10}", "display", 'block', { fromValue: 'none'}], position: 10000, duration: 0 },
                { id: "eid1206", tween: [ "style", "${_pastQ4}", "display", 'none', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1211", tween: [ "style", "${_pastQ4}", "display", 'none', { fromValue: 'none'}], position: 2000, duration: 0 },
                { id: "eid1267", tween: [ "style", "${_pastQ4}", "display", 'block', { fromValue: 'none'}], position: 4000, duration: 0 },
                { id: "eid1263", tween: [ "style", "${_pastQ4}", "display", 'block', { fromValue: 'block'}], position: 5000, duration: 0 },
                { id: "eid1259", tween: [ "style", "${_pastQ4}", "display", 'block', { fromValue: 'block'}], position: 6000, duration: 0 },
                { id: "eid1254", tween: [ "style", "${_pastQ4}", "display", 'block', { fromValue: 'block'}], position: 7000, duration: 0 },
                { id: "eid1248", tween: [ "style", "${_pastQ4}", "display", 'block', { fromValue: 'block'}], position: 8000, duration: 0 },
                { id: "eid1240", tween: [ "style", "${_pastQ4}", "display", 'block', { fromValue: 'block'}], position: 9000, duration: 0 },
                { id: "eid1231", tween: [ "style", "${_pastQ4}", "display", 'block', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1201", tween: [ "style", "${_pastQ9}", "display", 'none', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1216", tween: [ "style", "${_pastQ9}", "display", 'none', { fromValue: 'none'}], position: 2000, duration: 0 },
                { id: "eid1278", tween: [ "style", "${_pastQ9}", "display", 'none', { fromValue: 'none'}], position: 8000, duration: 0 },
                { id: "eid1280", tween: [ "style", "${_pastQ9}", "display", 'block', { fromValue: 'none'}], position: 9000, duration: 0 },
                { id: "eid1236", tween: [ "style", "${_pastQ9}", "display", 'block', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1204", tween: [ "style", "${_pastQ6}", "display", 'none', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1213", tween: [ "style", "${_pastQ6}", "display", 'none', { fromValue: 'none'}], position: 2000, duration: 0 },
                { id: "eid1276", tween: [ "style", "${_pastQ6}", "display", 'block', { fromValue: 'none'}], position: 6000, duration: 0 },
                { id: "eid1252", tween: [ "style", "${_pastQ6}", "display", 'block', { fromValue: 'block'}], position: 7000, duration: 0 },
                { id: "eid1250", tween: [ "style", "${_pastQ6}", "display", 'block', { fromValue: 'block'}], position: 8000, duration: 0 },
                { id: "eid1242", tween: [ "style", "${_pastQ6}", "display", 'block', { fromValue: 'block'}], position: 9000, duration: 0 },
                { id: "eid1233", tween: [ "style", "${_pastQ6}", "display", 'block', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1207", tween: [ "style", "${_pastQ3}", "display", 'none', { fromValue: 'none'}], position: 1000, duration: 0 },
                { id: "eid1210", tween: [ "style", "${_pastQ3}", "display", 'none', { fromValue: 'none'}], position: 2000, duration: 0 },
                { id: "eid1271", tween: [ "style", "${_pastQ3}", "display", 'block', { fromValue: 'none'}], position: 3000, duration: 0 },
                { id: "eid1268", tween: [ "style", "${_pastQ3}", "display", 'block', { fromValue: 'block'}], position: 4000, duration: 0 },
                { id: "eid1264", tween: [ "style", "${_pastQ3}", "display", 'block', { fromValue: 'block'}], position: 5000, duration: 0 },
                { id: "eid1260", tween: [ "style", "${_pastQ3}", "display", 'block', { fromValue: 'block'}], position: 6000, duration: 0 },
                { id: "eid1255", tween: [ "style", "${_pastQ3}", "display", 'block', { fromValue: 'block'}], position: 7000, duration: 0 },
                { id: "eid1247", tween: [ "style", "${_pastQ3}", "display", 'block', { fromValue: 'block'}], position: 8000, duration: 0 },
                { id: "eid1239", tween: [ "style", "${_pastQ3}", "display", 'block', { fromValue: 'block'}], position: 9000, duration: 0 },
                { id: "eid1230", tween: [ "style", "${_pastQ3}", "display", 'block', { fromValue: 'block'}], position: 10000, duration: 0 },
                { id: "eid1290", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [0] ], ""], position: 0 },
                { id: "eid1291", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [1000] ], ""], position: 1000 },
                { id: "eid1292", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [2000] ], ""], position: 2000 },
                { id: "eid1293", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [3000] ], ""], position: 3000 },
                { id: "eid1294", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [4000] ], ""], position: 4000 },
                { id: "eid1295", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [5000] ], ""], position: 5000 },
                { id: "eid1296", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [6000] ], ""], position: 6000 },
                { id: "eid1297", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [7000] ], ""], position: 7000 },
                { id: "eid1298", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [8000] ], ""], position: 8000 },
                { id: "eid1299", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_progresNumbers2}', [9000] ], ""], position: 9000 }            ]
        }
    }
},
"pastQ": {
    version: "3.0.0",
    minimumCompatibleVersion: "3.0.0",
    build: "3.0.0.322",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
                {
                    userClass: 'progress-error',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresEror.svg', '0px', '0px'],
                    id: 'trivia_progresEror2',
                    type: 'image',
                    rect: ['4.6%', '4.5%', '90.9%', '90.8%', 'auto', 'auto'],
                    tag: 'img'
                },
                {
                    userClass: 'progress-right',
                    fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresRight.svg', '0px', '0px'],
                    id: 'trivia_progresRight2',
                    type: 'image',
                    rect: ['4.6%', '4.5%', '90.9%', '90.8%', 'auto', 'auto'],
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${symbolSelector}": [
                ["style", "height", '122.45%'],
                ["style", "width", '7.64%']
            ],
            "${_trivia_progresEror2}": [
                ["style", "left", '4.55%'],
                ["style", "top", '4.54%']
            ],
            "${_trivia_progresRight2}": [
                ["style", "left", '4.55%'],
                ["style", "top", '4.54%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: false,
            timeline: [
            ]
        }
    }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources, opts);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-27141647");
