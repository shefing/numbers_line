/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
            'Alef': '<link rel=\"stylesheet\" href=\"ALef-Webfont-v2/alef-webfont.css\" type=\"text/css\" charset=\"utf-8\" />',
            'Lateef': '<link rel=\"stylesheet\" href=\"Lateef-Webfont-v2/stylesheet.css\" type=\"text/css\" charset=\"utf-8\" />'        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
            js+"jquery-1.7.1.min.js",
            js+"jquery-2.0.3.min.js"
        ],
        symbols = {
            "stage": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'BG',
                            type: 'rect',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            fill: ["rgba(97,102,108,1)"],
                            stroke: [0,"rgb(255, 255, 255)","solid"]
                        },
                        {
                            id: 'question',
                            symbolName: 'question',
                            type: 'rect',
                            rect: ['2.3%', '15.2%', '95.4%', '23%', 'auto', 'auto'],
                            userClass: "title"
                        },
                        {
                            id: 'hint50',
                            symbolName: 'hint50',
                            type: 'rect',
                            rect: ['16.3%', '88.1%', '5.8%', '9.6%', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "edge-btn hint-50"
                        },
                        {
                            id: 'hintReplace',
                            symbolName: 'hintReplace',
                            type: 'rect',
                            rect: ['9.3%', '88.1%', '5.8%', '9.6%', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "edge-btn hint-replace"
                        },
                        {
                            id: 'hintTime',
                            symbolName: 'hintTime',
                            type: 'rect',
                            rect: ['2.4%', '88.1%', '5.8%', '9.6%', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "edge-btn hint-time"
                        },
                        {
                            id: 'timer',
                            symbolName: 'timer',
                            type: 'rect',
                            rect: ['2.6%', '1.3%', '7.7%', '12.2%', 'auto', 'auto'],
                            userClass: "timer",
                            transform: [[],[],[],['1.06061','1.06061']]
                        },
                        {
                            id: 'option1',
                            symbolName: 'option',
                            type: 'rect',
                            rect: ['2.3%', '38.7%', '95.4%', '11.7%', 'auto', 'auto'],
                            userClass: "option"
                        },
                        {
                            id: 'option2',
                            symbolName: 'option',
                            type: 'rect',
                            rect: ['2.3%', '50.7%', '95.4%', '11.7%', 'auto', 'auto'],
                            userClass: "option"
                        },
                        {
                            id: 'option3',
                            symbolName: 'option',
                            type: 'rect',
                            rect: ['2.3%', '62.8%', '95.4%', '11.7%', 'auto', 'auto'],
                            userClass: "option"
                        },
                        {
                            id: 'option4',
                            symbolName: 'option',
                            type: 'rect',
                            rect: ['2.3%', '74.8%', '95.4%', '11.7%', 'auto', 'auto'],
                            userClass: "option"
                        },
                        {
                            id: 'score',
                            symbolName: 'score',
                            type: 'rect',
                            rect: ['85.1%', '3.9%', '12.6%', '6.9%', 'auto', 'auto'],
                            userClass: "score"
                        },
                        {
                            id: 'feedback',
                            symbolName: 'feedback',
                            display: 'none',
                            type: 'rect',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            userClass: "feedback-en"
                        },
                        {
                            id: 'btnRestart',
                            symbolName: 'btnRestart',
                            type: 'rect',
                            rect: ['92%', '88.1%', '5.8%', '9.6%', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "edge-btn btn-restart"
                        },
                        {
                            id: 'progres',
                            symbolName: 'progres',
                            type: 'rect',
                            rect: ['33.3%', '5.7%', '33.5%', '3.3%', 'auto', 'auto'],
                            userClass: "progress"
                        },
                        {
                            id: 'opening',
                            symbolName: 'opening',
                            type: 'rect',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            userClass: "welcome-screen"
                        },
                        {
                            id: 'opening_teacher',
                            symbolName: 'opening_teacher',
                            display: 'none',
                            type: 'rect',
                            rect: ['0', '1', '100%', '100%', 'auto', 'auto'],
                            userClass: "student-not-played-yet-en"
                        },
                        {
                            id: 'mute',
                            symbolName: 'mute',
                            type: 'rect',
                            rect: ['85%', '88.1%', '5.8%', '9.6%', 'auto', 'auto'],
                            userClass: "mute"
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '860', '540', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,0.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: true,
                    data: [
                        [
                            "eid1013",
                            "display",
                            0,
                            0,
                            "linear",
                            "${feedback}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1010",
                            "display",
                            0,
                            0,
                            "linear",
                            "${opening_teacher}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "BG": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'image',
                            tag: 'img',
                            id: 'trivia_bg',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            userClass: 'img',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_bg.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "question": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                            type: 'text',
                            id: 'Text',
                            text: 'A good UX designer can easily explain the logic behind each decision in her concept. The information architecture, the page contents hierarchy, the flow and the assumptions used.',
                            cursor: 'default',
                            userClass: 'text',
                            textStyle: ['0em', '0em', '130.9%', '0%'],
                            font: ['Alef', [156.25, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal', 'break-word', ''],
                            rect: ['3.2%', '10.5%', '94.5%', '83.9%', 'auto', 'auto'],
                            align: 'left'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '95.4%', '23%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "score": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                            type: 'text',
                            id: 'Text',
                            text: '835',
                            cursor: 'default',
                            userClass: 'text ltr',
                            textStyle: ['0.67em', '0em', '', '0%'],
                            font: ['Arial, Helvetica, sans-serif', [193.75, '%'], 'rgba(255,255,255,1)', 'normal', 'none', 'normal', 'break-word', ''],
                            rect: ['6.5%', '0%', '115.8%', '100%', 'auto', 'auto'],
                            align: 'left'
                        },
                        {
                            rect: ['7.3%', '46%', '86.1%', '5.4%', 'auto', 'auto'],
                            id: 'topLine',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(51,56,59,1)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '12.6%', '6.9%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "progressCurrent": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['114.03%', '0.26%', 25, 18, 'auto', 'auto'],
                            tag: 'img',
                            id: 'trivia_progresCurrent',
                            transform: [[0, 0, 0], [0, 0, 0], [0, 0], ['1', '1', 1], ['54%', '50%']],
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresCurrent.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 25, 18]
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    data: [
                        [
                            "eid663",
                            "height",
                            0,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '18px',
                            '9px'
                        ],
                        [
                            "eid664",
                            "height",
                            250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '9px',
                            '18px'
                        ],
                        [
                            "eid570",
                            "left",
                            0,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '114.03%',
                            '76.87%'
                        ],
                        [
                            "eid578",
                            "left",
                            250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '76.87%',
                            '0%'
                        ],
                        [
                            "eid610",
                            "top",
                            0,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.26%',
                            '26.89%'
                        ],
                        [
                            "eid611",
                            "top",
                            250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '26.89%',
                            '0.26%'
                        ],
                        [
                            "eid661",
                            "width",
                            0,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '25px',
                            '12px'
                        ],
                        [
                            "eid662",
                            "width",
                            250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '12px',
                            '25px'
                        ]
                    ]
                }
            },
            "error": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "right": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "timerArrow": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '75.75%', '75.8%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "hint50": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'ellipse',
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            cursor: 'pointer',
                            rect: ['0%', '1.92%', '99.9%', '96.2%', 'auto', 'auto'],
                            opacity: '1',
                            fill: ['rgba(230,138,62,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'icon50Anim',
                            symbolName: 'icon50Anim',
                            rect: ['27.87%', '13.4%', '45.97%', '76.92%', 'auto', 'auto'],
                            opacity: '1'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '9.63%']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid115",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '1.92%'
                        ],
                        [
                            "eid113",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '0%'
                        ],
                        [
                            "eid117",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '3.85%'
                        ],
                        [
                            "eid119",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '1.92%'
                        ],
                        [
                            "eid109",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(230,138,62,1.00)',
                            'rgba(230,138,62,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(230,138,62,1.00)',
                            'rgba(255,174,82,1.00)'
                        ],
                        [
                            "eid121",
                            "background-color",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(255,174,82,1.00)',
                            'rgba(255,255,255,1.00)'
                        ],
                        [
                            "eid749",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${icon50Anim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid750",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${icon50Anim}",
                            '1',
                            '0.3'
                        ],
                        [
                            "eid123",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '1'
                        ],
                        [
                            "eid122",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.2'
                        ],
                        [
                            "eid745",
                            "top",
                            0,
                            0,
                            "linear",
                            "${icon50Anim}",
                            '13.4%',
                            '13.4%'
                        ],
                        [
                            "eid746",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${icon50Anim}",
                            '13.4%',
                            '11.54%'
                        ],
                        [
                            "eid747",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${icon50Anim}",
                            '9.62%',
                            '15.38%'
                        ],
                        [
                            "eid748",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${icon50Anim}",
                            '13.46%',
                            '13.46%'
                        ],
                            [ "eid751", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${icon50Anim}', [] ] ],
                            [ "eid973", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${icon50Anim}', [0] ] ]
                    ]
                }
            },
            "hintReplace": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '1.92%', '99.9%', '96.2%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'Ellipse',
                            opacity: '1',
                            type: 'ellipse',
                            fill: ['rgba(230,138,62,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'replaceAnim',
                            symbolName: 'replaceAnim',
                            rect: ['29.97%', '26.92%', '37.97%', '46.15%', 'auto', 'auto'],
                            opacity: '1'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '9.63%']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid115",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '1.92%'
                        ],
                        [
                            "eid113",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '0%'
                        ],
                        [
                            "eid117",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '3.85%'
                        ],
                        [
                            "eid119",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '1.92%'
                        ],
                        [
                            "eid711",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${replaceAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid712",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${replaceAnim}",
                            '1',
                            '0.3'
                        ],
                        [
                            "eid109",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(230,138,62,1.00)',
                            'rgba(230,138,62,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(230,138,62,1.00)',
                            'rgba(255,174,82,1.00)'
                        ],
                        [
                            "eid121",
                            "background-color",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(255,174,82,1.00)',
                            'rgba(255,255,255,1.00)'
                        ],
                        [
                            "eid123",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '1'
                        ],
                        [
                            "eid122",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.2'
                        ],
                        [
                            "eid707",
                            "top",
                            0,
                            0,
                            "linear",
                            "${replaceAnim}",
                            '26.92%',
                            '26.92%'
                        ],
                        [
                            "eid708",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${replaceAnim}",
                            '26.92%',
                            '25%'
                        ],
                        [
                            "eid709",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${replaceAnim}",
                            '25%',
                            '28.85%'
                        ],
                        [
                            "eid710",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${replaceAnim}",
                            '28.85%',
                            '26.92%'
                        ],
                            [ "eid713", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${replaceAnim}', [] ] ],
                            [ "eid974", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${replaceAnim}', [0] ] ]
                    ]
                }
            },
            "hintTime": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '1.92%', '99.9%', '96.2%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'Ellipse',
                            opacity: '1',
                            type: 'ellipse',
                            fill: ['rgba(230,138,62,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'timeIconAnim',
                            symbolName: 'timeIconAnim',
                            rect: ['23.98%', '25%', '51.97%', '50%', 'auto', 'auto'],
                            opacity: '1'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '9.63%']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid115",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '1.92%'
                        ],
                        [
                            "eid113",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '0%'
                        ],
                        [
                            "eid117",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '3.85%'
                        ],
                        [
                            "eid119",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '1.92%'
                        ],
                        [
                            "eid109",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(230,138,62,1.00)',
                            'rgba(230,138,62,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(230,138,62,1.00)',
                            'rgba(255,174,82,1.00)'
                        ],
                        [
                            "eid121",
                            "background-color",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(255,174,82,1.00)',
                            'rgba(255,255,255,1.00)'
                        ],
                        [
                            "eid123",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '1'
                        ],
                        [
                            "eid122",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.2'
                        ],
                        [
                            "eid758",
                            "top",
                            0,
                            0,
                            "linear",
                            "${timeIconAnim}",
                            '25%',
                            '25%'
                        ],
                        [
                            "eid759",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${timeIconAnim}",
                            '25%',
                            '23.08%'
                        ],
                        [
                            "eid760",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${timeIconAnim}",
                            '23.08%',
                            '26.92%'
                        ],
                        [
                            "eid761",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${timeIconAnim}",
                            '26.92%',
                            '25%'
                        ],
                        [
                            "eid762",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${timeIconAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid763",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${timeIconAnim}",
                            '1',
                            '0.3'
                        ],
                            [ "eid764", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${timeIconAnim}', [] ] ],
                            [ "eid975", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timeIconAnim}', [0] ] ]
                    ]
                }
            },
            "btnBgPlaceholder": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '99.94%', '96.15%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "btnRestart": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '1.92%', '99.9%', '96.2%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'Ellipse',
                            opacity: '0.3',
                            type: 'ellipse',
                            fill: ['rgba(235,255,230,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'restartIconAnim',
                            symbolName: 'restartIconAnim',
                            rect: ['25.93%', '26.92%', '49.91%', '48.08%', 'auto', 'auto'],
                            opacity: '1'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '9.63%']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid115",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '1.92%'
                        ],
                        [
                            "eid113",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '0%'
                        ],
                        [
                            "eid117",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '3.85%'
                        ],
                        [
                            "eid119",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '1.92%'
                        ],
                        [
                            "eid109",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(235,255,230,1.00)',
                            'rgba(235,255,230,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(235,255,230,1.00)',
                            'rgba(168,201,159,1.00)'
                        ],
                        [
                            "eid121",
                            "background-color",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(255,153,69,1.00)',
                            'rgba(255,255,255,1.00)'
                        ],
                        [
                            "eid687",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid688",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '1',
                            '0.3'
                        ],
                        [
                            "eid123",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0.3',
                            '0.3'
                        ],
                        [
                            "eid125",
                            "opacity",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0.3',
                            '1'
                        ],
                        [
                            "eid122",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.2'
                        ],
                        [
                            "eid683",
                            "top",
                            0,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '26.92%',
                            '26.92%'
                        ],
                        [
                            "eid684",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '26.92%',
                            '25%'
                        ],
                        [
                            "eid685",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '-3.94%',
                            '28.85%'
                        ],
                        [
                            "eid686",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '4.06%',
                            '26.92%'
                        ],
                            [ "eid694", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${restartIconAnim}', [] ] ]
                    ]
                }
            },
            "btnMuteOn": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '1.92%', '100.1%', '96.2%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'Ellipse',
                            opacity: '0.3',
                            type: 'ellipse',
                            fill: ['rgba(235,255,230,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'muteIconOnAnim',
                            symbolName: 'muteIconOnAnim',
                            rect: ['16.01%', '26.86%', '60.05%', '48.08%', 'auto', 'auto'],
                            opacity: '1'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '99.94%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid115",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '1.92%'
                        ],
                        [
                            "eid113",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '0%'
                        ],
                        [
                            "eid117",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '3.85%'
                        ],
                        [
                            "eid119",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '1.92%'
                        ],
                        [
                            "eid880",
                            "top",
                            0,
                            0,
                            "linear",
                            "${muteIconOnAnim}",
                            '26.86%',
                            '26.86%'
                        ],
                        [
                            "eid881",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${muteIconOnAnim}",
                            '26.86%',
                            '25%'
                        ],
                        [
                            "eid882",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${muteIconOnAnim}",
                            '25%',
                            '28.85%'
                        ],
                        [
                            "eid883",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${muteIconOnAnim}",
                            '28.85%',
                            '26.92%'
                        ],
                        [
                            "eid884",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${muteIconOnAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid885",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${muteIconOnAnim}",
                            '1',
                            '0.3'
                        ],
                        [
                            "eid123",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0.3',
                            '0.3'
                        ],
                        [
                            "eid125",
                            "opacity",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0.3',
                            '1'
                        ],
                        [
                            "eid122",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.2'
                        ],
                        [
                            "eid109",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(235,255,230,1.00)',
                            'rgba(235,255,230,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(235,255,230,1.00)',
                            'rgba(168,201,159,1.00)'
                        ],
                        [
                            "eid121",
                            "background-color",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(255,153,69,1.00)',
                            'rgba(255,255,255,1.00)'
                        ],
                            [ "eid886", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${muteIconOnAnim}', [] ] ]
                    ]
                }
            },
            "btnMuteOff": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '1.92%', '100.1%', '96.2%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'Ellipse',
                            opacity: '0.3',
                            type: 'ellipse',
                            fill: ['rgba(235,255,230,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'muteIconOffAnim',
                            symbolName: 'muteIconOffAnim',
                            rect: ['18.01%', '26.86%', '60.05%', '48.08%', 'auto', 'auto'],
                            opacity: '1'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '99.94%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid952",
                            "top",
                            0,
                            0,
                            "linear",
                            "${muteIconOffAnim}",
                            '26.86%',
                            '26.86%'
                        ],
                        [
                            "eid953",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${muteIconOffAnim}",
                            '26.86%',
                            '25%'
                        ],
                        [
                            "eid954",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${muteIconOffAnim}",
                            '25%',
                            '28.85%'
                        ],
                        [
                            "eid955",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${muteIconOffAnim}",
                            '28.85%',
                            '26.92%'
                        ],
                        [
                            "eid956",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${muteIconOffAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid957",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${muteIconOffAnim}",
                            '1',
                            '0.3'
                        ],
                        [
                            "eid123",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0.3',
                            '0.3'
                        ],
                        [
                            "eid125",
                            "opacity",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0.3',
                            '1'
                        ],
                        [
                            "eid122",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.2'
                        ],
                        [
                            "eid115",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '1.92%'
                        ],
                        [
                            "eid113",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1.92%',
                            '0%'
                        ],
                        [
                            "eid117",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '3.85%'
                        ],
                        [
                            "eid119",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '1.92%'
                        ],
                        [
                            "eid109",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(235,255,230,1.00)',
                            'rgba(235,255,230,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(235,255,230,1.00)',
                            'rgba(168,201,159,1.00)'
                        ],
                        [
                            "eid121",
                            "background-color",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(255,153,69,1.00)',
                            'rgba(255,255,255,1.00)'
                        ],
                            [ "eid958", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${muteIconOffAnim}', [] ] ]
                    ]
                }
            },
            "mute": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '99.91%', '100%', 'auto', 'auto'],
                            userClass: 'mute-off edge-btn',
                            id: 'btnMuteOff',
                            display: 'none',
                            symbolName: 'btnMuteOff',
                            cursor: 'pointer',
                            type: 'rect'
                        },
                        {
                            rect: ['0%', '0%', '99.91%', '100%', 'auto', 'auto'],
                            userClass: 'mute-on edge-btn',
                            id: 'btnMuteOn',
                            symbolName: 'btnMuteOn',
                            cursor: 'pointer',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '9.63%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [
                        [
                            "eid143",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnMuteOff}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "optionBtn": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            opacity: '1',
                            id: 'Rectangle',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'ellipse',
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            rect: ['2.6%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                            id: 'Ellipse2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            display: 'none',
                            fill: ['rgba(255,255,255,1)']
                        },
                        {
                            type: 'image',
                            id: 'trivia_answerBullit',
                            tag: 'img',
                            rect: ['2.6%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_answerBullit.svg', '0px', '0px']
                        },
                        {
                            type: 'text',
                            id: 'Text',
                            opacity: '1',
                            font: ['Alef', [106.25, '%'], 'rgba(0,0,0,1.00)', 'normal', 'none', 'normal', 'break-word', ''],
                            text: 'Sooner or later animation is introduced to the same concept and it becomes harder to make design decisions or explain them. ',
                            align: 'left',
                            userClass: 'text',
                            rect: ['7.8%', '17.4%', '85.9%', '65.1%', 'auto', 'auto'],
                            textStyle: ['0em', '0em', '121%', '0%']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid127",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Rectangle}",
                            '1',
                            '1'
                        ],
                        [
                            "eid132",
                            "opacity",
                            1000,
                            0,
                            "linear",
                            "${Rectangle}",
                            '1',
                            '0.89929062381704'
                        ],
                        [
                            "eid131",
                            "display",
                            0,
                            0,
                            "linear",
                            "${Ellipse2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid130",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${Ellipse2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid138",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${Ellipse2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid133",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Text}",
                            '17.4%',
                            '17.4%'
                        ],
                        [
                            "eid134",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Text}",
                            '17.4%',
                            '17.46%'
                        ],
                        [
                            "eid135",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Text}",
                            '17.46%',
                            '17.4%'
                        ],
                        [
                            "eid129",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse2}",
                            'rgba(255,255,255,1)',
                            'rgba(146,168,170,1.00)'
                        ],
                        [
                            "eid136",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text}",
                            '1',
                            '1'
                        ],
                        [
                            "eid137",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Text}",
                            '1',
                            '0.33333333333333'
                        ]
                    ]
                }
            },
            "option": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'optionError',
                            symbolName: 'optionError',
                            type: 'rect',
                            userClass: 'option-error'
                        },
                        {
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'optionRight',
                            symbolName: 'optionRight',
                            type: 'rect',
                            userClass: 'option-right'
                        },
                        {
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            type: 'rect',
                            id: 'optionBtn',
                            symbolName: 'optionBtn',
                            cursor: 'pointer',
                            userClass: 'edge-btn option-normal'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '95.4%', '11.7%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "optionError": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            opacity: '1',
                            id: 'Rectangle',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(247,222,222,1.00)']
                        },
                        {
                            type: 'image',
                            id: 'trivia_progresEror',
                            tag: 'img',
                            rect: ['2.6%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresEror.svg', '0px', '0px']
                        },
                        {
                            type: 'text',
                            id: 'TextCopy',
                            opacity: '1',
                            font: ['Alef', [106.25, '%'], 'rgba(0,0,0,1.00)', 'normal', 'none', 'normal', 'break-word', ''],
                            text: 'Sooner or later animation is introduced to the same concept and it becomes harder to make design decisions or explain them. ',
                            align: 'left',
                            userClass: 'text',
                            rect: ['7.8%', '17.4%', '85.9%', '65.1%', 'auto', 'auto'],
                            textStyle: ['0em', '0em', '121%', '0%']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "optionRight": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            opacity: '1',
                            id: 'Rectangle',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(227,235,189,1.00)']
                        },
                        {
                            rect: ['2.6%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                            tag: 'img',
                            id: 'trivia_progresRight',
                            display: 'block',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresRight.svg', '0px', '0px']
                        },
                        {
                            rect: ['2.6%', '34.9%', '2.4%', '31.8%', 'auto', 'auto'],
                            tag: 'img',
                            id: 'trivia_answerBullit',
                            display: 'none',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_answerBullit.svg', '0px', '0px']
                        },
                        {
                            type: 'text',
                            id: 'Text',
                            opacity: '1',
                            font: ['Alef', [106.25, '%'], 'rgba(0,0,0,1.00)', 'normal', 'none', 'normal', 'break-word', ''],
                            text: 'Sooner or later animation is introduced to the same concept and it becomes harder to make design decisions or explain them. ',
                            align: 'left',
                            userClass: 'text',
                            rect: ['7.8%', '17.4%', '85.9%', '65.1%', 'auto', 'auto'],
                            textStyle: ['0em', '0em', '121%', '0%']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: false,
                    labels: {
                        "right": 0,
                        "no_V": 1000
                    },
                    data: [
                        [
                            "eid141",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progresRight}",
                            'block',
                            'block'
                        ],
                        [
                            "eid142",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${trivia_progresRight}",
                            'block',
                            'none'
                        ],
                        [
                            "eid139",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_answerBullit}",
                            'none',
                            'none'
                        ],
                        [
                            "eid140",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${trivia_answerBullit}",
                            'none',
                            'block'
                        ]
                    ]
                }
            },
            "opening": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '-0.01%', '100%', '100%', 'auto', 'auto'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            overflow: 'hidden',
                            id: 'Rectangle2Copy',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(51,56,59,1)']
                        },
                        {
                            type: 'rect',
                            id: 'Rectangle',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            rect: ['2.21%', '15.16%', '95.47%', '71.48%', 'auto', 'auto'],
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'Rectangle2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            rect: ['22.91%', '1.1%', '54.07%', '13.33%', 'auto', 'auto'],
                            fill: ['rgba(97,102,108,1.00)']
                        },
                        {
                            type: 'image',
                            id: 'trivia_openingBg',
                            tag: 'img',
                            rect: ['2.65%', '15.73%', '95.4%', '70.4%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_openingBg.svg', '0px', '0px']
                        },
                        {
                            rect: ['40.93%', '38.15%', '18.03%', '29.07%', 'auto', 'auto'],
                            userClass: 'edge-btn edge-btn-start',
                            id: 'btnStart',
                            symbolName: 'btnStart',
                            cursor: 'pointer',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "btnStart": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0.64%', '100%', '98.73%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'Ellipse',
                            opacity: '1',
                            type: 'ellipse',
                            fill: ['rgba(230,138,62,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'startIconAnim',
                            symbolName: 'startIconAnim',
                            rect: ['39.13%', '25.48%', '28.38%', '45.87%', 'auto', 'auto'],
                            opacity: '1'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '18.03%', '29.07%']
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "down": 2000,
                        "disable": 3000
                    },
                    data: [
                        [
                            "eid115",
                            "top",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0.64%',
                            '0.64%'
                        ],
                        [
                            "eid113",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0.64%',
                            '0%'
                        ],
                        [
                            "eid117",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '1.27%'
                        ],
                        [
                            "eid119",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '0%',
                            '0.64%'
                        ],
                        [
                            "eid109",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(230,138,62,1.00)',
                            'rgba(230,138,62,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(230,138,62,1.00)',
                            'rgba(255,174,82,1.00)'
                        ],
                        [
                            "eid121",
                            "background-color",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(255,174,82,1.00)',
                            'rgba(255,255,255,1.00)'
                        ],
                        [
                            "eid123",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '1'
                        ],
                        [
                            "eid122",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${Ellipse}",
                            '1',
                            '0.2'
                        ],
                        [
                            "eid1005",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${startIconAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid1006",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${startIconAnim}",
                            '1',
                            '0.3'
                        ],
                        [
                            "eid1001",
                            "top",
                            0,
                            0,
                            "linear",
                            "${startIconAnim}",
                            '25.48%',
                            '25.48%'
                        ],
                        [
                            "eid1002",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${startIconAnim}",
                            '25.48%',
                            '24.21%'
                        ],
                        [
                            "eid1003",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${startIconAnim}",
                            '-1.4%',
                            '26.76%'
                        ],
                        [
                            "eid1004",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${startIconAnim}",
                            '1.39%',
                            '25.48%'
                        ],
                            [ "eid1009", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${startIconAnim}', [] ] ]
                    ]
                }
            },
            "feedback": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '-0.2%', '100%', '100%', 'auto', 'auto'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'Rectangle2',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(51,56,59,1)']
                        },
                        {
                            rect: ['2.3%', '15.2%', '95.5%', '71.5%', 'auto', 'auto'],
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'Rectangle',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['2.3%', '16.3%', '95.5%', '70.4%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_openingBg.svg', '0px', '0px'],
                            transform: [[], ['180'], [0, 0, 0], [1, 1, 1]],
                            id: 'trivia_openingBg',
                            opacity: '0',
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            rect: ['5.1%', '19.3%', '89.7%', '61.9%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_feedbackBg.svg', '0px', '0px'],
                            id: 'trivia_feedbackBg',
                            opacity: '0',
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            rect: ['75.6%', '32.4%', '18.4%', '11.1%', 'auto', 'auto'],
                            id: 'feedback_elements',
                            symbolName: 'feedback_elements',
                            opacity: '0',
                            type: 'rect'
                        },
                        {
                            rect: ['69.8%', '44.4%', '18.4%', '11.1%', 'auto', 'auto'],
                            id: 'feedback_elementsCopy',
                            symbolName: 'feedback_elements',
                            opacity: '0',
                            type: 'rect'
                        },
                        {
                            rect: ['63.5%', '56.5%', '18.4%', '11.1%', 'auto', 'auto'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'Rectangle3',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(255,148,59,1.00)']
                        },
                        {
                            rect: ['14.5%', '56.5%', '18.4%', '11.1%', 'auto', 'auto'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'Rectangle3Copy',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(255,148,59,1.00)']
                        },
                        {
                            rect: ['4.3%', '32.4%', '18.4%', '11.1%', 'auto', 'auto'],
                            id: 'feedback_elementsCopy3',
                            symbolName: 'feedback_elements',
                            opacity: '0',
                            type: 'rect'
                        },
                        {
                            rect: ['8.7%', '44.4%', '18.4%', '11.1%', 'auto', 'auto'],
                            id: 'feedback_elementsCopy2',
                            symbolName: 'feedback_elements',
                            opacity: '0',
                            type: 'rect'
                        },
                        {
                            type: 'text',
                            id: 'Text',
                            textStyle: ['0em', '0em', '', '0%'],
                            rect: ['31.1%', '3%', '37.8%', '14.6%', 'auto', 'auto'],
                            align: 'center',
                            font: ['Alef', [387.5, '%'], 'rgba(126,203,210,1.00)', 'normal', 'none', '', 'break-word', ''],
                            opacity: '0',
                            text: 'RESULTS'
                        },
                        {
                            type: 'text',
                            id: 'Text2',
                            textStyle: ['0em', '0em', '96%', '0%'],
                            rect: ['30.9%', '33.5%', '16.4%', '8.9%', 'auto', 'auto'],
                            align: 'right',
                            font: ['Alef', [143.75, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal', 'break-word', ''],
                            opacity: '0',
                            text: 'Number of questions'
                        },
                        {
                            type: 'text',
                            id: 'Text2Copy',
                            textStyle: ['0em', '0em', '96%', '0%'],
                            rect: ['30.9%', '45.6%', '16.3%', '10%', 'auto', 'auto'],
                            align: 'right',
                            font: ['Alef', [143.8, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal', 'break-word', ''],
                            opacity: '0',
                            text: 'Correct answers'
                        },
                        {
                            type: 'text',
                            id: 'Text2Copy2',
                            textStyle: ['0em', '0em', '44%', '0%'],
                            rect: ['30.8%', '59.4%', '16.4%', '8.9%', 'auto', 'auto'],
                            align: 'right',
                            font: ['Alef', [312.5, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal', 'break-word', ''],
                            opacity: '0',
                            text: 'Score'
                        },
                        {
                            type: 'text',
                            id: 'Text_xml',
                            text: '10<br>5<br>123456',
                            userClass: 'feedback-current-score text',
                            textStyle: ['0em', '0em', '166%', '0%'],
                            rect: ['52%', '32.8%', '16.4%', '34.4%', 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [237.5, '%'], 'rgba(255,255,255,1)', 'normal', 'none', 'normal', 'break-word', ''],
                            align: 'left',
                            opacity: '0'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: true,
                    data: [
                        [
                            "eid811",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${Rectangle3}",
                            '0',
                            '0.80851063829787'
                        ],
                        [
                            "eid780",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${Rectangle3}",
                            '63.49%',
                            '50.35%'
                        ],
                        [
                            "eid770",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${feedback_elementsCopy2}",
                            '8.72%',
                            '31.05%'
                        ],
                        [
                            "eid778",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${feedback_elementsCopy}",
                            '69.82%',
                            '50.4%'
                        ],
                        [
                            "eid810",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${Rectangle3Copy}",
                            '0',
                            '0.80851063829787'
                        ],
                        [
                            "eid807",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${feedback_elementsCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid826",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text2Copy}",
                            '0',
                            '0'
                        ],
                        [
                            "eid821",
                            "opacity",
                            703,
                            297,
                            "easeInOutQuad",
                            "${Text2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid831",
                            "opacity",
                            0,
                            1000,
                            "easeInQuad",
                            "${Text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid825",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text2}",
                            '0',
                            '0'
                        ],
                        [
                            "eid819",
                            "opacity",
                            703,
                            297,
                            "easeInOutQuad",
                            "${Text2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid772",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${Rectangle3Copy}",
                            '14.54%',
                            '31.05%'
                        ],
                        [
                            "eid846",
                            "opacity",
                            250,
                            639,
                            "easeInOutQuad",
                            "${trivia_feedbackBg}",
                            '0',
                            '1'
                        ],
                        [
                            "eid852",
                            "opacity",
                            250,
                            639,
                            "easeInOutQuad",
                            "${trivia_openingBg}",
                            '0',
                            '1'
                        ],
                        [
                            "eid829",
                            "top",
                            0,
                            1000,
                            "easeOutQuad",
                            "${Text}",
                            '2.98%',
                            '17.78%'
                        ],
                        [
                            "eid774",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${feedback_elements}",
                            '75.63%',
                            '50.4%'
                        ],
                        [
                            "eid808",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${feedback_elementsCopy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid766",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${feedback_elementsCopy3}",
                            '4.3%',
                            '31.05%'
                        ],
                        [
                            "eid806",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${feedback_elementsCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid827",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text_xml}",
                            '0',
                            '0'
                        ],
                        [
                            "eid823",
                            "opacity",
                            703,
                            297,
                            "easeInOutQuad",
                            "${Text_xml}",
                            '0',
                            '1'
                        ],
                        [
                            "eid809",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${feedback_elements}",
                            '0',
                            '1'
                        ],
                        [
                            "eid824",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text2Copy2}",
                            '0',
                            '0'
                        ],
                        [
                            "eid817",
                            "opacity",
                            703,
                            297,
                            "easeInOutQuad",
                            "${Text2Copy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid833",
                            "opacity",
                            0,
                            250,
                            "easeInOutQuad",
                            "${Rectangle}",
                            '0.000000',
                            '1'
                        ]
                    ]
                }
            },
            "feedback_elements": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '99.96%', '100.03%', 'auto', 'auto'],
                            opacity: '0.8',
                            id: 'Rectangle3',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(87,97,105,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '18.38%', '11.11%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "bgOpening": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-48.16%', '0%', '166.3%', '730.4%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_bg.svg', '0px', '0px'],
                            id: 'trivia_bgCopy',
                            userClass: 'background',
                            type: 'image',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '60.12%', '13.7%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "timerColorRight": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-100%', '0%', '200%', '100%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'placeholder_colors',
                            stroke: ['0px', 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'ellipse',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['-93.94%', '3.03%', '187.88%', '93.94%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'placeholder_top',
                            stroke: ['0px', 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'ellipse',
                            fill: ['rgba(97,102,108,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '50%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 14000,
                    autoPlay: false,
                    data: [
                        [
                            "eid148",
                            "background-color",
                            0,
                            7000,
                            "linear",
                            "${placeholder_colors}",
                            'rgba(255,255,255,1.00)',
                            'rgba(183,220,174,1.00)'
                        ],
                        [
                            "eid149",
                            "background-color",
                            7000,
                            7000,
                            "linear",
                            "${placeholder_colors}",
                            'rgba(183,220,174,1.00)',
                            'rgba(180,206,64,1.00)'
                        ]
                    ]
                }
            },
            "timerAnimRight": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'timerColorRight2',
                            symbolName: 'timerColorRight2',
                            transform: [[0, 0, 0], ['0', 0, 0], [0, 0], ['0.99798', '1.00051', 1], ['50%', '50%']],
                            rect: ['-100.21%', '0.03%', '200.41%', '99.97%', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '50%', '100.01%']
                        }
                    }
                },
                timeline: {
                    duration: 14000,
                    autoPlay: false,
                    data: [
                        [
                            "eid154",
                            "rotateZ",
                            0,
                            14000,
                            "linear",
                            "${timerColorRight2}",
                            '0deg',
                            '180deg'
                        ],
                            [ "eid504", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [0] ] ],
                            [ "eid505", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [1000] ] ],
                            [ "eid506", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [2000] ] ],
                            [ "eid507", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [3000] ] ],
                            [ "eid508", "trigger", 4000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [4000] ] ],
                            [ "eid509", "trigger", 5000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [5000] ] ],
                            [ "eid510", "trigger", 6000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [6000] ] ],
                            [ "eid511", "trigger", 7000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [7000] ] ],
                            [ "eid512", "trigger", 8000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [8000] ] ],
                            [ "eid513", "trigger", 9000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [9000] ] ],
                            [ "eid514", "trigger", 10000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [10000] ] ],
                            [ "eid515", "trigger", 11000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [11000] ] ],
                            [ "eid516", "trigger", 12000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [12000] ] ],
                            [ "eid517", "trigger", 13000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [13000] ] ],
                            [ "eid518", "trigger", 14000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight2}', [14000] ] ]
                    ]
                }
            },
            "timerColorRight2": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['50%', '0%', '50%', '100%', 'auto', 'auto'],
                            overflow: 'hidden',
                            id: 'timerColorRight',
                            symbolName: 'timerColorRight',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '200%', '100.01%']
                        }
                    }
                },
                timeline: {
                    duration: 14792,
                    autoPlay: false,
                    data: [
                            [ "eid519", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [0] ] ],
                            [ "eid520", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [1000] ] ],
                            [ "eid521", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [2000] ] ],
                            [ "eid522", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [3000] ] ],
                            [ "eid523", "trigger", 4000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [4000] ] ],
                            [ "eid524", "trigger", 5000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [5000] ] ],
                            [ "eid525", "trigger", 6000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [6000] ] ],
                            [ "eid526", "trigger", 7000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [7000] ] ],
                            [ "eid527", "trigger", 8000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [8000] ] ],
                            [ "eid528", "trigger", 9000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [9000] ] ],
                            [ "eid529", "trigger", 10000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [10000] ] ],
                            [ "eid530", "trigger", 11000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [11000] ] ],
                            [ "eid531", "trigger", 12000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [12000] ] ],
                            [ "eid532", "trigger", 13000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [13000] ] ],
                            [ "eid533", "trigger", 14000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [14000] ] ],
                            [ "eid534", "trigger", 14792, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorRight}', [15000] ] ]
                    ]
                }
            },
            "timerAnimLeft": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'timerColorLeft2',
                            symbolName: 'timerColorLeft2',
                            transform: [[0, 0, 0], ['0', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            rect: ['0%', '0%', '200%', '100%', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '50%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 29000,
                    autoPlay: false,
                    data: [
                        [
                            "eid458",
                            "rotateZ",
                            0,
                            0,
                            "linear",
                            "${timerColorLeft2}",
                            '0deg',
                            '0deg'
                        ],
                        [
                            "eid220",
                            "rotateZ",
                            14500,
                            14500,
                            "linear",
                            "${timerColorLeft2}",
                            '0deg',
                            '180deg'
                        ],
                            [ "eid535", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [0] ] ],
                            [ "eid536", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [1000] ] ],
                            [ "eid537", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [2000] ] ],
                            [ "eid538", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [3000] ] ],
                            [ "eid539", "trigger", 4000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [4000] ] ],
                            [ "eid540", "trigger", 5000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [5000] ] ],
                            [ "eid541", "trigger", 6000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [6000] ] ],
                            [ "eid542", "trigger", 7000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [7000] ] ],
                            [ "eid543", "trigger", 8000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [8000] ] ],
                            [ "eid544", "trigger", 9000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [9000] ] ],
                            [ "eid545", "trigger", 10000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [10000] ] ],
                            [ "eid546", "trigger", 11000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [11000] ] ],
                            [ "eid547", "trigger", 12000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [12000] ] ],
                            [ "eid548", "trigger", 13000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [13000] ] ],
                            [ "eid549", "trigger", 14000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [14000] ] ],
                            [ "eid550", "trigger", 15000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [15000] ] ],
                            [ "eid551", "trigger", 16000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [16000] ] ],
                            [ "eid552", "trigger", 17000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [17000] ] ],
                            [ "eid553", "trigger", 18000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [18000] ] ],
                            [ "eid554", "trigger", 19000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [19000] ] ],
                            [ "eid555", "trigger", 20000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [20000] ] ],
                            [ "eid556", "trigger", 21000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [21000] ] ],
                            [ "eid557", "trigger", 22000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [22000] ] ],
                            [ "eid558", "trigger", 23000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [23000] ] ],
                            [ "eid559", "trigger", 24000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [24000] ] ],
                            [ "eid560", "trigger", 25000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [25000] ] ],
                            [ "eid561", "trigger", 26000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [26000] ] ],
                            [ "eid562", "trigger", 27000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [27000] ] ],
                            [ "eid563", "trigger", 28000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [28000] ] ],
                            [ "eid564", "trigger", 29000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft2}', [29000] ] ]
                    ]
                }
            },
            "timerColorLeft2": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '50%', '100%', 'auto', 'auto'],
                            overflow: 'hidden',
                            id: 'timerColorLeft',
                            symbolName: 'timerColorLeft',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '200%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 29000,
                    autoPlay: false,
                    data: [
                            [ "eid383", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [0] ] ],
                            [ "eid384", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [1000] ] ],
                            [ "eid385", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [2000] ] ],
                            [ "eid386", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [3000] ] ],
                            [ "eid387", "trigger", 4000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [4000] ] ],
                            [ "eid388", "trigger", 5000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [5000] ] ],
                            [ "eid389", "trigger", 6000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [6000] ] ],
                            [ "eid390", "trigger", 7000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [7000] ] ],
                            [ "eid391", "trigger", 8000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [8000] ] ],
                            [ "eid392", "trigger", 9000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [9000] ] ],
                            [ "eid393", "trigger", 10000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [10000] ] ],
                            [ "eid394", "trigger", 11000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [11000] ] ],
                            [ "eid395", "trigger", 12000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [12000] ] ],
                            [ "eid396", "trigger", 13000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [13000] ] ],
                            [ "eid397", "trigger", 14000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [14000] ] ],
                            [ "eid398", "trigger", 15000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [15000] ] ],
                            [ "eid399", "trigger", 16000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [16000] ] ],
                            [ "eid400", "trigger", 17000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [17000] ] ],
                            [ "eid401", "trigger", 18000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [18000] ] ],
                            [ "eid402", "trigger", 19000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [19000] ] ],
                            [ "eid403", "trigger", 20000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [20000] ] ],
                            [ "eid404", "trigger", 21000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [21000] ] ],
                            [ "eid405", "trigger", 22000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [22000] ] ],
                            [ "eid406", "trigger", 23000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [23000] ] ],
                            [ "eid407", "trigger", 24000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [24000] ] ],
                            [ "eid408", "trigger", 25000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [25000] ] ],
                            [ "eid409", "trigger", 26000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [26000] ] ],
                            [ "eid410", "trigger", 27000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [27000] ] ],
                            [ "eid411", "trigger", 28000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [28000] ] ],
                            [ "eid412", "trigger", 29000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${timerColorLeft}', [29000] ] ]
                    ]
                }
            },
            "timerColorLeft": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '200%', '100%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'placeholder_colors',
                            stroke: ['0px', 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'ellipse',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['6.06%', '3.03%', '187.88%', '93.94%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'placeholder_top',
                            stroke: ['0px', 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'ellipse',
                            fill: ['rgba(97,102,108,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '50%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 29000,
                    autoPlay: false,
                    data: [
                        [
                            "eid274",
                            "background-color",
                            0,
                            6759,
                            "linear",
                            "${placeholder_colors}",
                            'rgba(255,255,255,1.00)',
                            'rgba(183,220,174,1.00)'
                        ],
                        [
                            "eid275",
                            "background-color",
                            6759,
                            6759,
                            "linear",
                            "${placeholder_colors}",
                            'rgba(183,220,174,1.00)',
                            'rgba(180,206,64,1.00)'
                        ],
                        [
                            "eid276",
                            "background-color",
                            13517,
                            7724,
                            "linear",
                            "${placeholder_colors}",
                            'rgba(180,206,64,1.00)',
                            'rgba(255,174,82,1.00)'
                        ],
                        [
                            "eid277",
                            "background-color",
                            21241,
                            1931,
                            "linear",
                            "${placeholder_colors}",
                            'rgba(255,174,82,1.00)',
                            'rgba(218,94,94,1.00)'
                        ],
                        [
                            "eid222",
                            "background-color",
                            29000,
                            0,
                            "linear",
                            "${placeholder_colors}",
                            'rgba(218,94,94,1.00)',
                            'rgba(218,94,94,1.00)'
                        ]
                    ]
                }
            },
            "round": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '200.1%', '99.95%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'colorsCopy',
                            stroke: ['0px', 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'ellipse',
                            fill: ['rgba(97,102,108,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '49.99%', '100.05%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "half_round_left": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['49.98%', '0%', '49.98%', '100.02%', 'auto', 'auto'],
                            overflow: 'hidden',
                            id: 'round_left2',
                            symbolName: 'round_left',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '200.1%', '99.98%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "round_left_sivuv": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[0, 0, 0], ['0', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_roundRight.svg', '0px', '0px'],
                            id: 'trivia_roundRight',
                            rect: ['0%', '0%', '200.1%', '100%', 'auto', 'auto'],
                            type: 'image',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '49.99%', '100.05%']
                        }
                    }
                },
                timeline: {
                    duration: 29000,
                    autoPlay: true,
                    data: [
                        [
                            "eid1015",
                            "rotateZ",
                            14000,
                            15000,
                            "linear",
                            "${trivia_roundRight}",
                            '0deg',
                            '180deg'
                        ]
                    ]
                }
            },
            "timer": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['2.86%', '2.86%', '94.29%', '94.31%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            display: 'block',
                            id: 'colors',
                            stroke: ['0px', 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'ellipse',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            rect: ['48.55%', '0%', '49.99%', '100.02%', 'auto', 'auto'],
                            overflow: 'hidden',
                            id: 'half_round_right',
                            symbolName: 'half_round_right',
                            type: 'rect',
                            display: 'none'
                        },
                        {
                            rect: ['0%', '0%', '49.99%', '100.02%', 'auto', 'auto'],
                            overflow: 'hidden',
                            id: 'round_left_sivuv',
                            symbolName: 'round_left_sivuv',
                            type: 'rect',
                            display: 'none'
                        },
                        {
                            transform: [[0, 0, 0], ['0', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            tag: 'img',
                            id: 'trivia_timer',
                            type: 'image',
                            rect: ['5.71%', '5.72%', '88.6%', '88.6%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_timer.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '8.14%', '12.96%']
                        }
                    }
                },
                timeline: {
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
                    data: [
                        [
                            "eid587",
                            "background-color",
                            0,
                            6000,
                            "linear",
                            "${colors}",
                            'rgba(255,255,255,1.00)',
                            'rgba(175,214,149,1.00)'
                        ],
                        [
                            "eid965",
                            "background-color",
                            6000,
                            5000,
                            "linear",
                            "${colors}",
                            'rgba(175,214,149,1.00)',
                            'rgba(183,218,159,1.00)'
                        ],
                        [
                            "eid589",
                            "background-color",
                            11000,
                            5000,
                            "linear",
                            "${colors}",
                            'rgba(183,218,159,1.00)',
                            'rgba(255,174,82,1.00)'
                        ],
                        [
                            "eid590",
                            "background-color",
                            16000,
                            5000,
                            "linear",
                            "${colors}",
                            'rgba(255,174,82,1.00)',
                            'rgba(218,94,94,1.00)'
                        ],
                        [
                            "eid591",
                            "background-color",
                            29000,
                            0,
                            "linear",
                            "${colors}",
                            'rgba(218,94,94,1.00)',
                            'rgba(218,94,94,1.00)'
                        ],
                        [
                            "eid1018",
                            "rotateZ",
                            0,
                            14000,
                            "linear",
                            "${trivia_timer}",
                            '0deg',
                            '180deg'
                        ],
                        [
                            "eid1019",
                            "rotateZ",
                            14000,
                            15000,
                            "linear",
                            "${trivia_timer}",
                            '180deg',
                            '360deg'
                        ],
                        [
                            "eid862",
                            "display",
                            0,
                            0,
                            "linear",
                            "${round_left_sivuv}",
                            'none',
                            'none'
                        ],
                        [
                            "eid864",
                            "display",
                            14000,
                            0,
                            "linear",
                            "${round_left_sivuv}",
                            'none',
                            'block'
                        ],
                        [
                            "eid867",
                            "display",
                            29000,
                            0,
                            "linear",
                            "${round_left_sivuv}",
                            'block',
                            'none'
                        ],
                        [
                            "eid660",
                            "display",
                            0,
                            0,
                            "linear",
                            "${colors}",
                            'block',
                            'block'
                        ],
                        [
                            "eid659",
                            "display",
                            29000,
                            0,
                            "linear",
                            "${colors}",
                            'block',
                            'none'
                        ],
                        [
                            "eid863",
                            "display",
                            0,
                            0,
                            "linear",
                            "${half_round_right}",
                            'none',
                            'none'
                        ],
                        [
                            "eid861",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${half_round_right}",
                            'none',
                            'block'
                        ],
                        [
                            "eid866",
                            "display",
                            29000,
                            0,
                            "linear",
                            "${half_round_right}",
                            'block',
                            'none'
                        ],
                            [ "eid613", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [0] ] ],
                            [ "eid614", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [0] ] ],
                            [ "eid615", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [1000] ] ],
                            [ "eid616", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [1000] ] ],
                            [ "eid617", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [2000] ] ],
                            [ "eid618", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [2000] ] ],
                            [ "eid619", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [3000] ] ],
                            [ "eid620", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [3000] ] ],
                            [ "eid621", "trigger", 4000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [4000] ] ],
                            [ "eid622", "trigger", 4000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [4000] ] ],
                            [ "eid623", "trigger", 5000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [5000] ] ],
                            [ "eid624", "trigger", 5000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [5000] ] ],
                            [ "eid625", "trigger", 6000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [6000] ] ],
                            [ "eid626", "trigger", 6000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [6000] ] ],
                            [ "eid627", "trigger", 7000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [7000] ] ],
                            [ "eid628", "trigger", 7000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [7000] ] ],
                            [ "eid629", "trigger", 8000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [8000] ] ],
                            [ "eid630", "trigger", 8000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [8000] ] ],
                            [ "eid631", "trigger", 9000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [9000] ] ],
                            [ "eid632", "trigger", 9000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [9000] ] ],
                            [ "eid633", "trigger", 10000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [10000] ] ],
                            [ "eid634", "trigger", 10000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [10000] ] ],
                            [ "eid635", "trigger", 11000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [11000] ] ],
                            [ "eid636", "trigger", 11000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [11000] ] ],
                            [ "eid637", "trigger", 12000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [12000] ] ],
                            [ "eid638", "trigger", 12000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [12000] ] ],
                            [ "eid639", "trigger", 13000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [13000] ] ],
                            [ "eid640", "trigger", 13000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [13000] ] ],
                            [ "eid641", "trigger", 14000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [14000] ] ],
                            [ "eid642", "trigger", 14000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [14000] ] ],
                            [ "eid643", "trigger", 15000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${half_round_right}', [15000] ] ],
                            [ "eid644", "trigger", 15000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [15000] ] ],
                            [ "eid645", "trigger", 16000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [16000] ] ],
                            [ "eid646", "trigger", 17000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [17000] ] ],
                            [ "eid647", "trigger", 18000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [18000] ] ],
                            [ "eid648", "trigger", 19000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [19000] ] ],
                            [ "eid649", "trigger", 20000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [20000] ] ],
                            [ "eid650", "trigger", 21000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [21000] ] ],
                            [ "eid651", "trigger", 22000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [22000] ] ],
                            [ "eid652", "trigger", 23000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [23000] ] ],
                            [ "eid653", "trigger", 24000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [24000] ] ],
                            [ "eid654", "trigger", 25000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [25000] ] ],
                            [ "eid655", "trigger", 26000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [26000] ] ],
                            [ "eid656", "trigger", 27000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [27000] ] ],
                            [ "eid657", "trigger", 28000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [28000] ] ],
                            [ "eid658", "trigger", 29000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${round_left_sivuv}', [29000] ] ]
                    ]
                }
            },
            "half_round": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '49.98%', '100.02%', 'auto', 'auto'],
                            overflow: 'hidden',
                            id: 'round',
                            symbolName: 'round',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 70, 70]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "half_round_right": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[0, 0, 0], ['0', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tiriva_roundLeft.svg', '0px', '0px'],
                            id: 'tiriva_roundLeft',
                            rect: ['-100%', '0%', '200%', '100%', 'auto', 'auto'],
                            type: 'image',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '50%', '100.05%']
                        }
                    }
                },
                timeline: {
                    duration: 14000,
                    autoPlay: false,
                    data: [
                        [
                            "eid1014",
                            "rotateZ",
                            0,
                            14000,
                            "linear",
                            "${tiriva_roundLeft}",
                            '0deg',
                            '180deg'
                        ]
                    ]
                }
            },
            "round_left": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['-100.05%', '0%', '200.1%', '99.95%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'colorsCopy3',
                            stroke: ['0px', 'rgba(255,255,255,1.00)', 'solid'],
                            type: 'ellipse',
                            fill: ['rgba(97,102,108,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '49.99%', '100.05%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "progressBg": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['72.98%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['83.16%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'EllipseCopy',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['93.68%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'EllipseCopy2',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['41.75%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'EllipseCopy5',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['51.93%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'EllipseCopy4',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['62.46%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'EllipseCopy3',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['10.53%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'EllipseCopy8',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['0%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'EllipseCopy9',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['3.19%', '44.39%', '92.6%', '11.11%', 'auto', 'auto'],
                            id: 'Rectangle',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(51,56,59,1)']
                        },
                        {
                            rect: ['20.7%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'EllipseCopy7',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['31.23%', '0%', '6.32%', '99.89%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            id: 'EllipseCopy6',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(51,56,59,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '97.27%', '69.32%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "restartIconAnim": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[0, 0, 0], ['0', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            tag: 'img',
                            type: 'image',
                            id: 'trivia_hintIcon50',
                            opacity: '1',
                            rect: ['0.07%', '0.07%', '100.14%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_restartIcon.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '49.91%', '48.08%']
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: false,
                    data: [
                        [
                            "eid701",
                            "rotateZ",
                            0,
                            500,
                            "linear",
                            "${trivia_hintIcon50}",
                            '0deg',
                            '50deg'
                        ],
                        [
                            "eid702",
                            "rotateZ",
                            500,
                            500,
                            "linear",
                            "${trivia_hintIcon50}",
                            '50deg',
                            '0deg'
                        ]
                    ]
                }
            },
            "replaceAnim": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 19, 24]
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: false,
                    data: [
                        [
                            "eid703",
                            "left",
                            0,
                            500,
                            "linear",
                            "${trivia_hintIconReplace1}",
                            '0%',
                            '-21.05%'
                        ],
                        [
                            "eid706",
                            "left",
                            500,
                            500,
                            "linear",
                            "${trivia_hintIconReplace1}",
                            '-21.05%',
                            '-5.26%'
                        ],
                        [
                            "eid704",
                            "left",
                            0,
                            500,
                            "linear",
                            "${trivia_hintIconReplace2}",
                            '0%',
                            '21.05%'
                        ],
                        [
                            "eid705",
                            "left",
                            500,
                            500,
                            "linear",
                            "${trivia_hintIconReplace2}",
                            '21.05%',
                            '0%'
                        ]
                    ]
                }
            },
            "progresNumbers": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: true,
                content: {
                    dom: [
                        {
                            id: 'trivia_progresBgCopy',
                            type: 'image',
                            rect: ['0px', '0px', '100%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresBg.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresCurrent.svg', '0px', '0px'],
                            rect: ['92.4%', '-22.1%', '9%', '144.4%', 'auto', 'auto'],
                            id: 'trivia_progresCurrent',
                            opacity: '0',
                            display: 'block',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres1.svg', '0px', '0px'],
                            id: 'trivia_progres1',
                            rect: ['0%', 'auto', '100%', '100%', 'auto', '0%'],
                            display: 'block',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres2.svg', '0px', '0px'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'trivia_progres2',
                            opacity: '0',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres3.svg', '0px', '0px'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'trivia_progres3',
                            opacity: '0',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres4.svg', '0px', '0px'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'trivia_progres4',
                            opacity: '0',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres5.svg', '0px', '0px'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'trivia_progres5',
                            opacity: '0',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres6.svg', '0px', '0px'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'trivia_progres6',
                            opacity: '0',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres7.svg', '0px', '0px'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'trivia_progres7',
                            opacity: '0',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres8.svg', '0px', '0px'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'trivia_progres8',
                            opacity: '0',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres9.svg', '0px', '0px'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'trivia_progres9',
                            opacity: '0',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progres10.svg', '0px', '0px'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'trivia_progres10',
                            opacity: '0',
                            display: 'none',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 11000,
                    autoPlay: false,
                    data: [
                        [
                            "eid1126",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres5}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1159",
                            "display",
                            4500,
                            0,
                            "linear",
                            "${trivia_progres5}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1160",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${trivia_progres5}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1127",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres4}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1156",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${trivia_progres4}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1135",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${trivia_progres4}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1161",
                            "display",
                            4250,
                            0,
                            "linear",
                            "${trivia_progres4}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1119",
                            "opacity",
                            1500,
                            250,
                            "linear",
                            "${trivia_progres2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1121",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres10}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1175",
                            "display",
                            9500,
                            0,
                            "linear",
                            "${trivia_progres10}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1475",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${trivia_progres10}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1176",
                            "display",
                            11000,
                            0,
                            "linear",
                            "${trivia_progres10}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1163",
                            "opacity",
                            5500,
                            250,
                            "linear",
                            "${trivia_progres6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1479",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '1'
                        ],
                        [
                            "eid1480",
                            "opacity",
                            10500,
                            0,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0'
                        ],
                        [
                            "eid1124",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres7}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1165",
                            "display",
                            6500,
                            0,
                            "linear",
                            "${trivia_progres7}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1167",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${trivia_progres7}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1157",
                            "opacity",
                            3500,
                            250,
                            "linear",
                            "${trivia_progres4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1158",
                            "opacity",
                            4500,
                            250,
                            "linear",
                            "${trivia_progres5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1122",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres9}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1173",
                            "display",
                            8500,
                            0,
                            "linear",
                            "${trivia_progres9}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1172",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${trivia_progres9}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1128",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres3}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1133",
                            "display",
                            2500,
                            0,
                            "linear",
                            "${trivia_progres3}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1154",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${trivia_progres3}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1123",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres8}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1169",
                            "display",
                            7500,
                            0,
                            "linear",
                            "${trivia_progres8}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1170",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${trivia_progres8}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1322",
                            "scaleY",
                            1000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1323",
                            "scaleY",
                            1250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1419",
                            "scaleY",
                            2000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1420",
                            "scaleY",
                            2250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1423",
                            "scaleY",
                            3000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1424",
                            "scaleY",
                            3250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1427",
                            "scaleY",
                            4000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1428",
                            "scaleY",
                            4250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1431",
                            "scaleY",
                            5000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1432",
                            "scaleY",
                            5250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1435",
                            "scaleY",
                            6000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1436",
                            "scaleY",
                            6250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1439",
                            "scaleY",
                            7000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1440",
                            "scaleY",
                            7250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1443",
                            "scaleY",
                            8000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1444",
                            "scaleY",
                            8250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1447",
                            "scaleY",
                            9000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1448",
                            "scaleY",
                            9250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1166",
                            "opacity",
                            6500,
                            250,
                            "linear",
                            "${trivia_progres7}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1134",
                            "opacity",
                            2500,
                            250,
                            "linear",
                            "${trivia_progres3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1174",
                            "opacity",
                            9500,
                            250,
                            "linear",
                            "${trivia_progres10}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1125",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres6}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1162",
                            "display",
                            5500,
                            0,
                            "linear",
                            "${trivia_progres6}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1164",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${trivia_progres6}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1129",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1131",
                            "display",
                            1500,
                            0,
                            "linear",
                            "${trivia_progres2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1155",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${trivia_progres2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1153",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${trivia_progres2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1477",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progresCurrent}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1476",
                            "display",
                            10500,
                            0,
                            "linear",
                            "${trivia_progresCurrent}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1324",
                            "scaleX",
                            1000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1325",
                            "scaleX",
                            1250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1417",
                            "scaleX",
                            2000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1418",
                            "scaleX",
                            2250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1421",
                            "scaleX",
                            3000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1422",
                            "scaleX",
                            3250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1425",
                            "scaleX",
                            4000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1426",
                            "scaleX",
                            4250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1429",
                            "scaleX",
                            5000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1430",
                            "scaleX",
                            5250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1433",
                            "scaleX",
                            6000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1434",
                            "scaleX",
                            6250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1437",
                            "scaleX",
                            7000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1438",
                            "scaleX",
                            7250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1441",
                            "scaleX",
                            8000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1442",
                            "scaleX",
                            8250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1445",
                            "scaleX",
                            9000,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1446",
                            "scaleX",
                            9250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1168",
                            "opacity",
                            7500,
                            250,
                            "linear",
                            "${trivia_progres8}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1120",
                            "display",
                            0,
                            0,
                            "linear",
                            "${trivia_progres1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1130",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${trivia_progres1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1171",
                            "opacity",
                            8500,
                            250,
                            "linear",
                            "${trivia_progres9}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1326",
                            "left",
                            1000,
                            500,
                            "linear",
                            "${trivia_progresCurrent}",
                            '-1.54%',
                            '9.03%'
                        ],
                        [
                            "eid1454",
                            "left",
                            2000,
                            500,
                            "linear",
                            "${trivia_progresCurrent}",
                            '9.03%',
                            '19.44%'
                        ],
                        [
                            "eid1456",
                            "left",
                            3000,
                            500,
                            "linear",
                            "${trivia_progresCurrent}",
                            '19.44%',
                            '30.21%'
                        ],
                        [
                            "eid1458",
                            "left",
                            4000,
                            500,
                            "linear",
                            "${trivia_progresCurrent}",
                            '30.21%',
                            '40.28%'
                        ],
                        [
                            "eid1460",
                            "left",
                            5000,
                            500,
                            "linear",
                            "${trivia_progresCurrent}",
                            '40.28%',
                            '50.69%'
                        ],
                        [
                            "eid1462",
                            "left",
                            6000,
                            500,
                            "linear",
                            "${trivia_progresCurrent}",
                            '50.69%',
                            '61.11%'
                        ],
                        [
                            "eid1464",
                            "left",
                            7000,
                            500,
                            "linear",
                            "${trivia_progresCurrent}",
                            '61.11%',
                            '71.53%'
                        ],
                        [
                            "eid1467",
                            "left",
                            8000,
                            500,
                            "linear",
                            "${trivia_progresCurrent}",
                            '71.53%',
                            '81.94%'
                        ],
                        [
                            "eid1469",
                            "left",
                            9000,
                            500,
                            "linear",
                            "${trivia_progresCurrent}",
                            '81.94%',
                            '92.36%'
                        ]
                    ]
                }
            },
            "icon50Anim": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '45.97%', '76.92%']
                        }
                    }
                },
                timeline: {
                    duration: 575,
                    autoPlay: false,
                    data: [
                        [
                            "eid742",
                            "top",
                            0,
                            575,
                            "linear",
                            "${trivia_hintIcon503}",
                            '0%',
                            '-50%'
                        ],
                        [
                            "eid741",
                            "top",
                            0,
                            575,
                            "linear",
                            "${trivia_hintIcon501}",
                            '0%',
                            '50%'
                        ]
                    ]
                }
            },
            "timeIconAnim": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                            transform: [[0, 0, 0], ['0', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            tag: 'img',
                            id: 'trivia_hintIconTime2Copy',
                            type: 'image',
                            rect: ['0%', '0%', '100.1%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIconTime2.svg', '0px', '0px']
                        },
                        {
                            transform: [[0, 0, 0], ['0', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            tag: 'img',
                            id: 'trivia_hintIconTime1',
                            type: 'image',
                            rect: ['0%', '0%', '100.1%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_hintIconTime1.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '51.97%', '50%']
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: false,
                    data: [
                        [
                            "eid752",
                            "rotateZ",
                            0,
                            500,
                            "linear",
                            "${trivia_hintIconTime2Copy}",
                            '0deg',
                            '-42deg'
                        ],
                        [
                            "eid757",
                            "rotateZ",
                            500,
                            500,
                            "linear",
                            "${trivia_hintIconTime2Copy}",
                            '-42deg',
                            '0deg'
                        ],
                        [
                            "eid753",
                            "rotateZ",
                            0,
                            500,
                            "linear",
                            "${trivia_hintIconTime1}",
                            '0deg',
                            '-42deg'
                        ],
                        [
                            "eid756",
                            "rotateZ",
                            500,
                            500,
                            "linear",
                            "${trivia_hintIconTime1}",
                            '-42deg',
                            '0deg'
                        ]
                    ]
                }
            },
            "muteIconOnAnim": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
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
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '60.05%', '48.08%']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    data: [
                        [
                            "eid989",
                            "scaleX",
                            0,
                            250,
                            "linear",
                            "${trivia_muteOnIcon}",
                            '1',
                            '1.1'
                        ],
                        [
                            "eid990",
                            "scaleX",
                            250,
                            250,
                            "linear",
                            "${trivia_muteOnIcon}",
                            '1.1',
                            '1'
                        ],
                        [
                            "eid991",
                            "scaleY",
                            0,
                            250,
                            "linear",
                            "${trivia_muteOnIcon}",
                            '1',
                            '1.1'
                        ],
                        [
                            "eid992",
                            "scaleY",
                            250,
                            250,
                            "linear",
                            "${trivia_muteOnIcon}",
                            '1.1',
                            '1'
                        ]
                    ]
                }
            },
            "muteIconOffAnim": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['3.33%', '0%', '93.3%', '100%', 'auto', 'auto'],
                            id: 'trivia_muteOffIcon',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_muteOffIcon.svg', '0px', '0px'],
                            type: 'image',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '60.05%', '48.08%']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    data: [
                        [
                            "eid999",
                            "scaleY",
                            0,
                            250,
                            "linear",
                            "${trivia_muteOffIcon}",
                            '1',
                            '1.1'
                        ],
                        [
                            "eid1000",
                            "scaleY",
                            250,
                            250,
                            "linear",
                            "${trivia_muteOffIcon}",
                            '1.1',
                            '1'
                        ],
                        [
                            "eid997",
                            "scaleX",
                            0,
                            250,
                            "linear",
                            "${trivia_muteOffIcon}",
                            '1',
                            '1.1'
                        ],
                        [
                            "eid998",
                            "scaleX",
                            250,
                            250,
                            "linear",
                            "${trivia_muteOffIcon}",
                            '1.1',
                            '1'
                        ]
                    ]
                }
            },
            "startIconAnim": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0.06%', '-0.01%', '100.05%', '99.97%', 'auto', 'auto'],
                            tag: 'img',
                            id: 'trivia_hintIcon50',
                            opacity: '1',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_openingIcon.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '28.38%', '45.87%']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    data: [
                        [
                            "eid1007",
                            "left",
                            0,
                            250,
                            "linear",
                            "${trivia_hintIcon50}",
                            '0.06%',
                            '11.14%'
                        ],
                        [
                            "eid1008",
                            "left",
                            250,
                            250,
                            "linear",
                            "${trivia_hintIcon50}",
                            '11.14%',
                            '0.01%'
                        ]
                    ]
                }
            },
            "opening_teacher": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            overflow: 'hidden',
                            id: 'Rectangle2Copy',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(51,56,59,1)']
                        },
                        {
                            rect: ['2.2%', '15.2%', '95.5%', '71.5%', 'auto', 'auto'],
                            id: 'Rectangle',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            type: 'text',
                            id: 'Text',
                            textStyle: ['0em', '0em', '', '0%'],
                            rect: ['7.7%', '40.4%', '84.5%', '9.6%', 'auto', 'auto'],
                            userClass: 'text',
                            font: ['Alef', [218.75, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', 'break-word', ''],
                            text: 'No activity was made',
                            align: 'center'
                        },
                        {
                            rect: ['26.3%', '0%', '47.3%', '13%', 'auto', 'auto'],
                            id: 'Rectangle3',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(97,102,108,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "feedback_AR": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'Rectangle2',
                            opacity: '0',
                            rect: ['0%', '-0.19%', '100%', '100%', 'auto', 'auto'],
                            fill: ['rgba(51,56,59,1)']
                        },
                        {
                            type: 'rect',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            id: 'Rectangle',
                            opacity: '0',
                            rect: ['2.29%', '15.16%', '95.5%', '71.48%', 'auto', 'auto'],
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            rect: ['2.33%', '15.72%', '95.5%', '70.4%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_openingBg.svg', '0px', '0px'],
                            transform: [[0, 0, 0], ['180', 0, 0], [0, 0], ['1', 1, 1], ['50%', '50%']],
                            id: 'trivia_openingBg',
                            opacity: '0',
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_feedbackBg.svg', '0px', '0px'],
                            id: 'trivia_feedbackBg',
                            opacity: '0',
                            rect: ['5.12%', '19.26%', '89.7%', '61.9%', 'auto', 'auto'],
                            tag: 'img'
                        },
                        {
                            type: 'rect',
                            id: 'feedback_elements',
                            symbolName: 'feedback_elements',
                            rect: ['75.63%', '32.41%', '18.39%', '11.11%', 'auto', 'auto'],
                            opacity: '0'
                        },
                        {
                            type: 'rect',
                            id: 'feedback_elementsCopy',
                            symbolName: 'feedback_elements',
                            rect: ['69.82%', '44.44%', '18.39%', '11.11%', 'auto', 'auto'],
                            opacity: '0'
                        },
                        {
                            rect: ['63.49%', '56.48%', '18.38%', '11.11%', 'auto', 'auto'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'Rectangle3',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(255,148,59,1.00)']
                        },
                        {
                            rect: ['14.54%', '56.48%', '18.38%', '11.11%', 'auto', 'auto'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            id: 'Rectangle3Copy',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(255,148,59,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'feedback_elementsCopy3',
                            symbolName: 'feedback_elements',
                            rect: ['4.3%', '32.41%', '18.38%', '11.11%', 'auto', 'auto'],
                            opacity: '0'
                        },
                        {
                            type: 'rect',
                            id: 'feedback_elementsCopy2',
                            symbolName: 'feedback_elements',
                            rect: ['8.72%', '44.44%', '18.38%', '11.11%', 'auto', 'auto'],
                            opacity: '0'
                        },
                        {
                            type: 'text',
                            rect: ['39.42%', '2.98%', '21.05%', '13.5%', 'auto', 'auto'],
                            id: 'Text',
                            text: 'النتيجة',
                            align: 'center',
                            opacity: '0',
                            textStyle: ['0em', '0em', '101%', '0%'],
                            font: ['Arial, Helvetica, sans-serif', [400, '%'], 'rgba(126,203,210,1.00)', 'normal', 'none', '', '', '']
                        },
                        {
                            type: 'text',
                            rect: ['51.51%', '35.15%', '17.56%', '10%', 'auto', 'auto'],
                            id: 'Text2',
                            text: 'مجموع الأسئلة',
                            align: 'left',
                            opacity: '0',
                            textStyle: ['0em', '0em', '83%', '0%'],
                            font: ['Arial, Helvetica, sans-serif', [175, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal', '', '']
                        },
                        {
                            type: 'text',
                            rect: ['51.51%', '47.01%', '16.4%', '8.89%', 'auto', 'auto'],
                            id: 'Text2Copy',
                            text: 'إجابات صحيحة',
                            align: 'left',
                            opacity: '0',
                            textStyle: ['0em', '0em', '86%', '0%'],
                            font: ['Arial, Helvetica, sans-serif', [175, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal', '', '']
                        },
                        {
                            type: 'text',
                            rect: ['51.51%', '59.62%', '13.96%', '7.78%', 'auto', 'auto'],
                            id: 'Text2Copy2',
                            text: 'العلامة',
                            align: 'left',
                            opacity: '0',
                            textStyle: ['0em', '0em', '50%', '0%'],
                            font: ['Arial, Helvetica, sans-serif', [175, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal', '', '']
                        },
                        {
                            type: 'text',
                            align: 'right',
                            text: '10<br>5<br>123456',
                            rect: ['31.05%', '32.78%', '16.4%', '34.44%', 'auto', 'auto'],
                            id: 'Text_xml',
                            font: ['Arial, Helvetica, sans-serif', [237.5, '%'], 'rgba(255,255,255,1)', 'normal', 'none', 'normal', '', ''],
                            userClass: 'feedback-current-score text',
                            textStyle: ['0em', '0em', '166%', '0%'],
                            opacity: '0'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: true,
                    data: [
                        [
                            "eid811",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${Rectangle3}",
                            '0',
                            '0.80851063829787'
                        ],
                        [
                            "eid780",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${Rectangle3}",
                            '63.49%',
                            '50.35%'
                        ],
                        [
                            "eid770",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${feedback_elementsCopy2}",
                            '8.72%',
                            '31.05%'
                        ],
                        [
                            "eid824",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text2Copy2}",
                            '0',
                            '0'
                        ],
                        [
                            "eid817",
                            "opacity",
                            703,
                            297,
                            "easeInOutQuad",
                            "${Text2Copy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid810",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${Rectangle3Copy}",
                            '0',
                            '0.80851063829787'
                        ],
                        [
                            "eid807",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${feedback_elementsCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid826",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text2Copy}",
                            '0',
                            '0'
                        ],
                        [
                            "eid821",
                            "opacity",
                            703,
                            297,
                            "easeInOutQuad",
                            "${Text2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid831",
                            "opacity",
                            0,
                            1000,
                            "easeInQuad",
                            "${Text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid825",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text2}",
                            '0',
                            '0'
                        ],
                        [
                            "eid819",
                            "opacity",
                            703,
                            297,
                            "easeInOutQuad",
                            "${Text2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid772",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${Rectangle3Copy}",
                            '14.54%',
                            '31.05%'
                        ],
                        [
                            "eid846",
                            "opacity",
                            250,
                            639,
                            "easeInOutQuad",
                            "${trivia_feedbackBg}",
                            '0',
                            '1'
                        ],
                        [
                            "eid852",
                            "opacity",
                            250,
                            639,
                            "easeInOutQuad",
                            "${trivia_openingBg}",
                            '0',
                            '1'
                        ],
                        [
                            "eid829",
                            "top",
                            0,
                            1000,
                            "easeOutQuad",
                            "${Text}",
                            '2.98%',
                            '15.87%'
                        ],
                        [
                            "eid774",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${feedback_elements}",
                            '75.63%',
                            '50.4%'
                        ],
                        [
                            "eid827",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Text_xml}",
                            '0',
                            '0'
                        ],
                        [
                            "eid823",
                            "opacity",
                            703,
                            297,
                            "easeInOutQuad",
                            "${Text_xml}",
                            '0',
                            '1'
                        ],
                        [
                            "eid766",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${feedback_elementsCopy3}",
                            '4.3%',
                            '31.05%'
                        ],
                        [
                            "eid808",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${feedback_elementsCopy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid806",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${feedback_elementsCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid809",
                            "opacity",
                            123,
                            766,
                            "linear",
                            "${feedback_elements}",
                            '0',
                            '1'
                        ],
                        [
                            "eid778",
                            "left",
                            123,
                            766,
                            "easeOutSine",
                            "${feedback_elementsCopy}",
                            '69.82%',
                            '50.4%'
                        ],
                        [
                            "eid833",
                            "opacity",
                            0,
                            250,
                            "easeInOutQuad",
                            "${Rectangle}",
                            '0.000000',
                            '1'
                        ]
                    ]
                }
            },
            "opening_teacher_AR": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '-0.01%', '100%', '100%', 'auto', 'auto'],
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            overflow: 'hidden',
                            id: 'Rectangle2Copy',
                            opacity: '0',
                            type: 'rect',
                            fill: ['rgba(51,56,59,1)']
                        },
                        {
                            type: 'rect',
                            id: 'Rectangle',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            rect: ['2.21%', '15.16%', '95.47%', '71.48%', 'auto', 'auto'],
                            fill: ['rgba(51,56,59,1.00)']
                        },
                        {
                            type: 'text',
                            userClass: 'text',
                            id: 'Text',
                            text: 'التلميذ لم ينفّذ الفعالية',
                            align: 'center',
                            textStyle: ['0em', '0em', '119%', '0%'],
                            font: ['Arial, Helvetica, sans-serif', [218.75, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', '', '', ''],
                            rect: ['7.68%', '40.37%', '84.54%', '9.62%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'Rectangle4',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            rect: ['28.4%', '0%', '51.9%', '13.2%', 'auto', 'auto'],
                            fill: ['rgba(97,102,108,1)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "progressAnim": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'image',
                            id: 'trivia_progresCurrent',
                            tag: 'img',
                            rect: ['0%', '0%', 26, 26, 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresCurrent.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 26, 26]
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: true,
                    data: [
                        [
                            "eid1069",
                            "scaleY",
                            0,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1071",
                            "scaleY",
                            250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ],
                        [
                            "eid1068",
                            "scaleX",
                            0,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '1',
                            '0.31'
                        ],
                        [
                            "eid1070",
                            "scaleX",
                            250,
                            250,
                            "linear",
                            "${trivia_progresCurrent}",
                            '0.31',
                            '1'
                        ]
                    ]
                }
            },
            "progres": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'trivia_progresBg',
                            type: 'image',
                            rect: ['0px', '0px', '100%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresBg.svg', '0px', '0px']
                        },
                        {
                            type: 'rect',
                            display: 'block',
                            symbolName: 'progresNumbers',
                            rect: ['0%', '0%', '100%', '102%', 'auto', 'auto'],
                            id: 'progresNumbers2'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-1',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['-0.3%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ1'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-2',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['10.4%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ2'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-3',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['20.8%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ3'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-4',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['31.6%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ4'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-5',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['41.4%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ5'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-6',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['52.1%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ6'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-7',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['62.5%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ7'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-8',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['73%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ8'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-9',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['83.3%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ9'
                        },
                        {
                            type: 'rect',
                            transform: [[], [], [], ['1.22222', '1.22222']],
                            userClass: 'progress-item-10',
                            display: 'none',
                            symbolName: 'pastQ',
                            rect: ['93.1%', '0%', '6.3%', '100.2%', 'auto', 'auto'],
                            id: 'pastQ10'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '33.5%', '3.3%']
                        }
                    }
                },
                timeline: {
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
                    data: [
                        [
                            "eid1203",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ7}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1214",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${pastQ7}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1277",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${pastQ7}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1251",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${pastQ7}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1243",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${pastQ7}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1234",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ7}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1274",
                            "display",
                            0,
                            0,
                            "linear",
                            "${pastQ1}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1199",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ1}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1273",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${pastQ1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1270",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${pastQ1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1266",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${pastQ1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1262",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${pastQ1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1257",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${pastQ1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1245",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${pastQ1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1237",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${pastQ1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1228",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ1}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1207",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1210",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1271",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1268",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1264",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1260",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1255",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1247",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1239",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1230",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ3}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1200",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ10}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1217",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${pastQ10}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1281",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ10}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1208",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1209",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1272",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1269",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1265",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1261",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1256",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1246",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1238",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1229",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1321",
                            "display",
                            0,
                            0,
                            "linear",
                            "${progresNumbers2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1320",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${progresNumbers2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid1205",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ5}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1212",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${pastQ5}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1275",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${pastQ5}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1258",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${pastQ5}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1253",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${pastQ5}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1249",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${pastQ5}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1241",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${pastQ5}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1232",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ5}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1202",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ8}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1215",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${pastQ8}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1279",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${pastQ8}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1244",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${pastQ8}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1235",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ8}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1201",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ9}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1216",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${pastQ9}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1278",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${pastQ9}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1280",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${pastQ9}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1236",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ9}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1204",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ6}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1213",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${pastQ6}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1276",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${pastQ6}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1252",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${pastQ6}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1250",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${pastQ6}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1242",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${pastQ6}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1233",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ6}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1206",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${pastQ4}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1211",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${pastQ4}",
                            'none',
                            'none'
                        ],
                        [
                            "eid1267",
                            "display",
                            4000,
                            0,
                            "linear",
                            "${pastQ4}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1263",
                            "display",
                            5000,
                            0,
                            "linear",
                            "${pastQ4}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1259",
                            "display",
                            6000,
                            0,
                            "linear",
                            "${pastQ4}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1254",
                            "display",
                            7000,
                            0,
                            "linear",
                            "${pastQ4}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1248",
                            "display",
                            8000,
                            0,
                            "linear",
                            "${pastQ4}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1240",
                            "display",
                            9000,
                            0,
                            "linear",
                            "${pastQ4}",
                            'block',
                            'block'
                        ],
                        [
                            "eid1231",
                            "display",
                            10000,
                            0,
                            "linear",
                            "${pastQ4}",
                            'block',
                            'block'
                        ],
                            [ "eid1290", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [0] ] ],
                            [ "eid1291", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [1000] ] ],
                            [ "eid1292", "trigger", 2000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [2000] ] ],
                            [ "eid1293", "trigger", 3000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [3000] ] ],
                            [ "eid1294", "trigger", 4000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [4000] ] ],
                            [ "eid1295", "trigger", 5000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [5000] ] ],
                            [ "eid1296", "trigger", 6000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [6000] ] ],
                            [ "eid1297", "trigger", 7000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [7000] ] ],
                            [ "eid1298", "trigger", 8000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [8000] ] ],
                            [ "eid1299", "trigger", 9000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${progresNumbers2}', [9000] ] ],
                            [ "eid1478", "trigger", 9859.6423866328, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${progresNumbers2}', [11000] ] ]
                    ]
                }
            },
            "pastQ": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['4.6%', '4.5%', '90.9%', '90.8%', 'auto', 'auto'],
                            userClass: 'progress-error',
                            id: 'trivia_progresEror2',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresEror.svg', '0px', '0px'],
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            rect: ['4.6%', '4.5%', '90.9%', '90.8%', 'auto', 'auto'],
                            userClass: 'progress-right',
                            id: 'trivia_progresRight2',
                            fill: ['rgba(0,0,0,0)', 'images/UI/trivia_progresRight.svg', '0px', '0px'],
                            type: 'image',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '7.6%', '122.5%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("index_edgeActions.js");
})("EDGE-27141647");
