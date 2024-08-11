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
                            symbolName: 'BG',
                            type: 'rect',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto']
                        },
                        {
                            id: 'btnLeft',
                            symbolName: 'btnLeft',
                            type: 'rect',
                            rect: ['40.5%', '89.5%', '5.8%', '8.3%', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "edge-btn button-left"
                        },
                        {
                            id: 'btnDown',
                            symbolName: 'btnDown',
                            type: 'rect',
                            rect: ['47%', '89.5%', '5.8%', '8.3%', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "edge-btn button-down"
                        },
                        {
                            id: 'btnRight',
                            symbolName: 'btnRight',
                            type: 'rect',
                            rect: ['53.6%', '89.5%', '5.8%', '8.3%', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "edge-btn button-right"
                        },
                        {
                            id: 'lifeContainer',
                            symbolName: 'lifeContainer',
                            type: 'rect',
                            rect: ['2.4%', '92.2%', '21.3%', '2.9%', 'auto', 'auto']
                        },
                        {
                            id: 'final-feedback',
                            symbolName: 'final-feedback',
                            display: 'none',
                            type: 'rect',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            userClass: "final-feedback"
                        },
                        {
                            id: 'btnRestartCopy2',
                            symbolName: 'btnRestart',
                            type: 'rect',
                            rect: ['91.6%', '89.5%', '5.8%', '8.3%', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "edgy-button button-restart"
                        },
                        {
                            id: 'muteCopy2',
                            symbolName: 'mute',
                            type: 'rect',
                            rect: ['84.7%', '89.5%', '5.8%', '8.3%', 'auto', 'auto'],
                            userClass: "button-mute"
                        },
                        {
                            id: 'opening2',
                            symbolName: 'opening',
                            type: 'rect',
                            rect: ['0', '0', '100%', '100%', 'auto', 'auto'],
                            userClass: "start-dialog"
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '860', '630', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 1500,
                    autoPlay: true,
                    data: [
                        [
                            "eid74",
                            "display",
                            0,
                            0,
                            "easeOutBack",
                            "${final-feedback}",
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
                            type: 'rect',
                            id: 'Rectangle',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            fill: ['rgba(97,102,108,1.00)']
                        },
                        {
                            type: 'rect',
                            id: 'Rectangle2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            rect: ['0%', '87.3%', '100%', '12.7%', 'auto', 'auto'],
                            fill: ['rgba(54,52,55,1.00)']
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
                            rect: ['13.6%', '0%', '86.7%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_muteOnIcon.svg', '0px', '0px'],
                            tabindex:'0'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '60%', '48.08%']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    data: [
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
                        ],
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
                        ]
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
                            userClass: 'mute-off edge-btn',
                            id: 'btnMuteOff',
                            type: 'rect',
                            display: 'none',
                            symbolName: 'btnMuteOff',
                            cursor: 'pointer',
                            rect: ['0%', '0%', '99.91%', '100%', 'auto', 'auto']
                        },
                        {
                            userClass: 'mute-on edge-btn',
                            type: 'rect',
                            id: 'btnMuteOn',
                            symbolName: 'btnMuteOn',
                            cursor: 'pointer',
                            rect: ['0%', '0%', '99.91%', '100%', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '8.25%']
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
                            opacity: '0.3',
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(235,255,230,1.00)']
                        },
                        {
                            rect: ['18.01%', '26.86%', '60.05%', '48.08%', 'auto', 'auto'],
                            id: 'muteIconOffAnim',
                            symbolName: 'muteIconOffAnim',
                            opacity: '1',
                            type: 'rect'
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
                            [ "eid958", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${muteIconOffAnim}', [] ] ]
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
                            opacity: '0.3',
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(235,255,230,1.00)']
                        },
                        {
                            rect: ['16.01%', '26.86%', '60%', '48.08%', 'auto', 'auto'],
                            id: 'muteIconOnAnim',
                            symbolName: 'muteIconOnAnim',
                            opacity: '1',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '99.94%', '100.06%']
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
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_muteOffIcon.svg', '0px', '0px'],
                            type: 'image',
                            tag: 'img',
                            tabindex:'0'
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
                            type: 'image',
                            tag: 'img',
                            transform: [[0, 0, 0], ['0', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            id: 'trivia_hintIcon50',
                            opacity: '1',
                            rect: ['0.07%', '0.07%', '100.21%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_restartIcon.svg', '0px', '0px'],
                            tabindex:'0'
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
                            "easeInQuad",
                            "${trivia_hintIcon50}",
                            '0deg',
                            '50deg'
                        ],
                        [
                            "eid702",
                            "rotateZ",
                            500,
                            500,
                            "easeInQuad",
                            "${trivia_hintIcon50}",
                            '50deg',
                            '0deg'
                        ]
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
                            opacity: '0.3',
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(235,255,230,1.00)']
                        },
                        {
                            rect: ['25.93%', '26.92%', '49.96%', '48.11%', 'auto', 'auto'],
                            id: 'restartIconAnim',
                            symbolName: 'restartIconAnim',
                            opacity: '1',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '8.25%']
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
            "btnLeft": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0%', '1.92%', '100%', '96.2%', 'auto', 'auto'],
                            borderRadius: ['50%', '50%', '50%', '50%'],
                            opacity: '1',
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(245,151,86,1.00)']
                        },
                        {
                            rect: ['32%', '25.02%', '27.98%', '46.18%', 'auto', 'auto'],
                            id: 'arrowLeftAnim',
                            symbolName: 'arrowLeftAnim',
                            opacity: '1',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '8.25%']
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
                            'rgba(245,151,86,1.00)',
                            'rgba(245,151,86,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(245,151,86,1.00)',
                            'rgba(243,137,64,1.00)'
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
                            "eid125",
                            "opacity",
                            1000,
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
                            "eid88",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${arrowLeftAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid87",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${arrowLeftAnim}",
                            '1',
                            '0.3'
                        ],
                        [
                            "eid75",
                            "top",
                            0,
                            0,
                            "easeOutBack",
                            "${arrowLeftAnim}",
                            '25.02%',
                            '25.02%'
                        ],
                        [
                            "eid77",
                            "top",
                            2000,
                            0,
                            "easeOutBack",
                            "${arrowLeftAnim}",
                            '23.09%',
                            '26.94%'
                        ],
                        [
                            "eid78",
                            "top",
                            3000,
                            0,
                            "easeOutBack",
                            "${arrowLeftAnim}",
                            '26.94%',
                            '25.02%'
                        ],
                            [ "eid91", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${arrowLeftAnim}', [] ] ]
                    ]
                }
            },
            "btnDown": {
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
                            opacity: '1',
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(245,151,86,1.00)']
                        },
                        {
                            rect: ['25.94%', '38.49%', '47.96%', '26.94%', 'auto', 'auto'],
                            id: 'arrowDownAnim',
                            symbolName: 'arrowDownAnim',
                            opacity: '1',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '8.25%']
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
                            'rgba(245,151,86,1.00)',
                            'rgba(245,151,86,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(245,151,86,1.00)',
                            'rgba(243,137,64,1.00)'
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
                            "eid100",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${arrowDownAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid99",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${arrowDownAnim}",
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
                            "eid125",
                            "opacity",
                            1000,
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
                            "eid94",
                            "top",
                            0,
                            0,
                            "linear",
                            "${arrowDownAnim}",
                            '38.49%',
                            '38.49%'
                        ],
                        [
                            "eid97",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${arrowDownAnim}",
                            '36.56%',
                            '40.41%'
                        ],
                        [
                            "eid98",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${arrowDownAnim}",
                            '40.41%',
                            '38.49%'
                        ],
                            [ "eid103", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${arrowDownAnim}', [0] ] ]
                    ]
                }
            },
            "btnRight": {
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
                            opacity: '1',
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(245,151,86,1.00)']
                        },
                        {
                            rect: ['40%', '26.94%', '27.98%', '46.18%', 'auto', 'auto'],
                            id: 'arrowRightAnim',
                            symbolName: 'arrowRightAnim',
                            opacity: '1',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.82%', '8.25%']
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
                            "eid86",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${arrowRightAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid85",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${arrowRightAnim}",
                            '1',
                            '0.3046875'
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
                            "eid125",
                            "opacity",
                            1000,
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
                            "eid109",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(245,151,86,1.00)',
                            'rgba(245,151,86,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(245,151,86,1.00)',
                            'rgba(243,137,64,1.00)'
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
                            "eid81",
                            "top",
                            0,
                            0,
                            "linear",
                            "${arrowRightAnim}",
                            '26.94%',
                            '26.94%'
                        ],
                        [
                            "eid83",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${arrowRightAnim}",
                            '25.02%',
                            '28.86%'
                        ],
                        [
                            "eid84",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${arrowRightAnim}",
                            '28.86%',
                            '26.94%'
                        ],
                            [ "eid92", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${arrowRightAnim}', [] ] ]
                    ]
                }
            },
            "life": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            userClass: 'dead',
                            id: 'lifeDead',
                            symbolName: 'lifeDead',
                            type: 'rect',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto']
                        },
                        {
                            userClass: 'alive',
                            id: 'lifeAlive',
                            symbolName: 'lifeAlive',
                            type: 'rect',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '10.39%', '100%']
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
            "lifeDead": {
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
                            id: 'tetris_lifeDead',
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_lifeDead.svg', '0px', '0px'],
                            type: 'image',
                            tag: 'img'
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
            "lifeAlive": {
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
                            id: 'tetris_lifeAlive',
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_lifeAlive.svg', '0px', '0px'],
                            type: 'image',
                            tag: 'img'
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
            "lifeContainer": {
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
                            id: 'life1',
                            symbolName: 'life',
                            userClass: 'life',
                            rect: ['89.6%', '0%', '10.4%', '99.9%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'life2',
                            symbolName: 'life',
                            userClass: 'life',
                            rect: ['77%', '0%', '10.4%', '99.9%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'life3',
                            symbolName: 'life',
                            userClass: 'life',
                            rect: ['64.1%', '0%', '10.4%', '99.9%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'life4',
                            symbolName: 'life',
                            userClass: 'life',
                            rect: ['51.2%', '0%', '10.4%', '99.9%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'life5',
                            symbolName: 'life',
                            userClass: 'life',
                            rect: ['38.3%', '0%', '10.4%', '99.9%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'life6',
                            symbolName: 'life',
                            userClass: 'life',
                            rect: ['25.8%', '0%', '10.4%', '99.9%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'life7',
                            symbolName: 'life',
                            userClass: 'life',
                            rect: ['12.9%', '0%', '10.4%', '99.9%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'life8',
                            symbolName: 'life',
                            userClass: 'life',
                            rect: ['0%', '0%', '10.4%', '99.9%', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '23.4%', '2.9%']
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
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            opacity: '0.7',
                            id: 'Rectangle2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(35,31,32,1.00)']
                        },
                        {
                            type: 'image',
                            id: 'tetris_opening3',
                            tag: 'img',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_opening.svg', '0px', '0px']
                        },
                        {
                            type: 'rect',
                            rect: ['40.93%', '37.47%', '18.03%', '24.92%', 'auto', 'auto'],
                            id: 'btnStartCopy',
                            symbolName: 'btnStart',
                            cursor: 'pointer',
                            userClass: 'edge-btn button-start'
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
                            opacity: '1',
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(245,151,86,1.00)']
                        },
                        {
                            rect: ['39.35%', '25.48%', '28.39%', '45.86%', 'auto', 'auto'],
                            id: 'startIconAnim',
                            symbolName: 'startIconAnim',
                            opacity: '1',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '18.03%', '24.92%']
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
                            "eid1003",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${startIconAnim}",
                            '-1.27%',
                            '26.75%'
                        ],
                        [
                            "eid1004",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${startIconAnim}",
                            '1.27%',
                            '25.48%'
                        ],
                        [
                            "eid109",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(245,151,86,1.00)',
                            'rgba(245,151,86,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(245,151,86,1.00)',
                            'rgba(243,137,64,1.00)'
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
                            [ "eid1009", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${startIconAnim}', [] ] ]
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
                            type: 'image',
                            tag: 'img',
                            id: 'trivia_hintIcon50',
                            opacity: '1',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_openingIcon.svg', '0px', '0px'],
                            tabindex:'0'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '28.38%', '45.86%']
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
                            '0%',
                            '11.36%'
                        ],
                        [
                            "eid1008",
                            "left",
                            250,
                            250,
                            "linear",
                            "${trivia_hintIcon50}",
                            '11.36%',
                            '0%'
                        ]
                    ]
                }
            },
            "close": {
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
                            opacity: '0',
                            id: 'Rectangle2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(159,0,0,1.00)']
                        },
                        {
                            rect: [13, 13, '23px', '23px', 'auto', 'auto'],
                            id: 'tetris_feedbackClose',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_feedbackClose.svg', '0px', '0px'],
                            tabindex:'0'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '5.7%', '7.78%']
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
            "feedbackGood": {
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
                            opacity: '0',
                            id: 'fade',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(0,0,0,1.00)']
                        },
                        {
                            rect: ['16.9%', '22.4%', '66.28%', '55.56%', 'auto', 'auto'],
                            opacity: '0',
                            overflow: 'hidden',
                            id: 'popup_feedback',
                            symbolName: 'popup_feedback',
                            type: 'rect',
                            transform: [[0, 0, 0], [0, 0, 0], [0, 0], ['0.07', '0.07', 1], ['50%', '50%']]
                        },
                        {
                            type: 'image',
                            tag: 'img',
                            transform: [[0, 0, 0], [0, 0, 0], [0, 0], ['0.07', '0.07', 1], ['50%', '50%']],
                            id: 'tetris_stars',
                            opacity: '0',
                            rect: ['18.37%', '31.27%', '63.1%', '37.8%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_stars.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            transform: [[0, 0, 0], [0, 0, 0], [0, 0], ['0', 1, 1], ['50%', '50%']],
                            id: 'tetris_feedbackRibbon',
                            tag: 'img',
                            rect: ['26.28%', '41.11%', '47.5%', '17.9%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_feedbackRibbon.svg', '0px', '0px']
                        },
                        {
                            type: 'text',
                            id: 'Text',
                            text: 'כל הכבוד!',
                            font: ['Alef', [375, '%'], 'rgba(255,255,255,1.00)', '700', 'none', 'normal', '', ''],
                            opacity: '0',
                            textStyle: ['0em', '0em', '115%', '0%'],
                            transform: [[0, 0, 0], [0, 0, 0], [0, 0], ['0.07', 1, 1], ['50%', '50%']],
                            rect: ['29.64%', '41.43%', '40.61%', '17.29%', 'auto', 'auto'],
                            userClass: 'feedback-text',
                            align: 'center'
                        },
                        {
                            type: 'rect',
                            opacity: '0',
                            rect: ['16.86%', '22.38%', '5.7%', '7.78%', 'auto', 'auto'],
                            id: 'close',
                            symbolName: 'close',
                            cursor: 'pointer',
                            userClass: 'button-feedback-close edgy-button'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 1500,
                    autoPlay: true,
                    data: [
                        [
                            "eid44",
                            "scaleX",
                            250,
                            750,
                            "easeOutBack",
                            "${Text}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid16",
                            "scaleX",
                            0,
                            1000,
                            "easeOutBack",
                            "${popup_feedback}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid48",
                            "opacity",
                            1000,
                            500,
                            "linear",
                            "${close}",
                            '0',
                            '1'
                        ],
                        [
                            "eid14",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${fade}",
                            '0',
                            '0.4000000059604645'
                        ],
                        [
                            "eid20",
                            "opacity",
                            0,
                            500,
                            "linear",
                            "${popup_feedback}",
                            '0',
                            '1'
                        ],
                        [
                            "eid18",
                            "scaleY",
                            0,
                            1000,
                            "easeOutBack",
                            "${popup_feedback}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid26",
                            "scaleY",
                            250,
                            1250,
                            "easeOutCirc",
                            "${tetris_stars}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid24",
                            "scaleX",
                            250,
                            1250,
                            "easeOutCirc",
                            "${tetris_stars}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid28",
                            "opacity",
                            250,
                            750,
                            "easeOutBack",
                            "${tetris_stars}",
                            '0',
                            '1'
                        ],
                        [
                            "eid30",
                            "scaleX",
                            250,
                            750,
                            "easeOutBack",
                            "${tetris_feedbackRibbon}",
                            '0',
                            '1'
                        ],
                        [
                            "eid46",
                            "opacity",
                            750,
                            750,
                            "linear",
                            "${Text}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "basket": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            userClass: 'basket-background',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'Rectangle',
                            stroke: ['0px', 'rgba(32,205,1,0.00)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(74,74,76,1.00)']
                        },
                        {
                            userClass: 'basket-title-background',
                            rect: ['0%', '0%', '100%', '35%', 'auto', 'auto'],
                            id: 'title',
                            stroke: ['0px', 'rgba(32, 205, 1, 0)', 'solid'],
                            type: 'rect',
                            fill: ['rgba(236,126,104,1.00)']
                        },
                        {
                            textStyle: ['0em', '0em', '70%', '0%'],
                            font: ['Alef', [150, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal'],
                            type: 'text',
                            align: 'center',
                            id: 'Text5',
                            text: 'N<br>',
                            rect: ['0%', '3.4%', '100%', '15%', 'auto', 'auto'],
                            userClass: 'basket-title-text text'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '22.4%', '30%']
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "correct": 500,
                        "error": 1000
                    },
                    data: [
                        [
                            "eid51",
                            "border-color",
                            0,
                            0,
                            "linear",
                            "${Rectangle}",
                            'rgba(32,205,1,0.00)',
                            'rgba(32,205,1,0.00)'
                        ],
                        [
                            "eid52",
                            "border-color",
                            500,
                            0,
                            "linear",
                            "${Rectangle}",
                            'rgba(32,205,1,0.99)',
                            'rgba(32,205,1,0.99)'
                        ],
                        [
                            "eid50",
                            "border-color",
                            1000,
                            0,
                            "linear",
                            "${Rectangle}",
                            'rgba(32,205,1,0.99)',
                            'rgba(205,1,39,1.00)'
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
                            userClass: 'option-background',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            id: 'Rectangle2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(149,155,152,1.00)']
                        },
                        {
                            textStyle: [null, null, '50%'],
                            font: ['Alef', [150, '%'], 'rgba(234,235,234,1.00)', 'normal', 'none', 'normal'],
                            type: 'text',
                            align: 'center',
                            id: 'Text6',
                            text: 'dd',
                            rect: ['0.43%', '24.4%', '100.99%', '58.29%', 'auto', 'auto'],
                            userClass: 'text'
                        },
                        {
                            userClass: 'feedback-correct',
                            tag: 'img',
                            display: 'none',
                            id: 'tetris_v',
                            rect: ['90.23%', '0%', '9.6%', '40.3%', 'auto', 'auto'],
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_v.svg', '0px', '0px']
                        },
                        {
                            userClass: 'feedback-error',
                            tag: 'img',
                            display: 'none',
                            id: 'tetris_x',
                            rect: ['90.22%', '0%', '9.6%', '40.3%', 'auto', 'auto'],
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_x.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '19.46%', '6.3%']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    labels: {
                        "normal": 0
                    },
                    data: [
                        [
                            "eid12",
                            "display",
                            0,
                            0,
                            "linear",
                            "${tetris_v}",
                            'none',
                            'none'
                        ],
                        [
                            "eid11",
                            "display",
                            0,
                            0,
                            "linear",
                            "${tetris_x}",
                            'none',
                            'none'
                        ],
                        [
                            "eid61",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Rectangle2}",
                            'rgba(149,155,152,1.00)',
                            'rgba(149,155,152,1.00)'
                        ]
                    ]
                }
            },
            "final-feedback": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            userClass: 'final-feedback-failure',
                            id: 'feedbackWrong',
                            symbolName: 'feedbackWrong',
                            type: 'rect',
                            rect: [0, 0, '100%', '100%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                            display: 'block',
                            symbolName: 'feedbackGood',
                            id: 'feedbackGood',
                            userClass: 'final-feedback-success'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 1500,
                    autoPlay: true,
                    data: [
                        [
                            "eid9",
                            "display",
                            0,
                            0,
                            "linear",
                            "${feedbackGood}",
                            'block',
                            'block'
                        ]
                    ]
                }
            },
            "popup_feedback": {
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
                            id: 'Rectangle',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            rect: ['0%', '0%', '100.01%', '100%', 'auto', 'auto'],
                            fill: ['rgba(96,101,107,1.00)']
                        },
                        {
                            type: 'image',
                            transform: [[0, 0, 0], ['180', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            id: 'tetris_opening',
                            tag: 'img',
                            rect: ['-25.44%', '-39.71%', '150.9%', '180%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_opening.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, '66.28%', '55.56%']
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: true,
                    data: [
                        [
                            "eid22",
                            "rotateZ",
                            0,
                            1000,
                            "easeOutCirc",
                            "${tetris_opening}",
                            '180deg',
                            '0deg'
                        ]
                    ]
                }
            },
            "feedbackWrong": {
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
                            opacity: '0',
                            id: 'fade',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(0,0,0,1.00)']
                        },
                        {
                            rect: ['16.9%', '22.4%', '66.28%', '55.56%', 'auto', 'auto'],
                            opacity: '0',
                            overflow: 'hidden',
                            id: 'popup_feedback',
                            symbolName: 'popup_feedback',
                            type: 'rect',
                            transform: [[0, 0, 0], [0, 0, 0], [0, 0], ['0.07', '0.07', 1], ['50%', '50%']]
                        },
                        {
                            transform: [[0, 0, 0], [0, 0, 0], [0, 0], ['0.07', '0.07', 1], ['50%', '50%']],
                            id: 'btnFeedbackRestart',
                            opacity: '0',
                            cursor: 'pointer',
                            userClass: 'edge-btn try-again',
                            symbolName: 'btnFeedbackRestart',
                            type: 'rect',
                            rect: ['40.93%', '40.79%', '18.03%', '24.92%', 'auto', 'auto']
                        },
                        {
                            type: 'text',
                            id: 'Text',
                            text: 'נסו שוב',
                            font: ['Alef', [375, '%'], 'rgba(255,255,255,1.00)', '700', 'none', 'normal', '', ''],
                            opacity: '0',
                            textStyle: ['0em', '0em', '140%', '0%'],
                            transform: [[0, 0, 0], [0, 0, 0], [0, 0], ['0.07', 1, 1], ['50%', '50%']],
                            rect: ['29.64%', '25.53%', '40.61%', '17.29%', 'auto', 'auto'],
                            userClass: 'feedback-text',
                            align: 'center'
                        },
                        {
                            type: 'rect',
                            opacity: '0',
                            rect: ['16.86%', '22.38%', '5.7%', '7.78%', 'auto', 'auto'],
                            id: 'close',
                            symbolName: 'close',
                            cursor: 'pointer',
                            userClass: 'edgy-button button-feedback-close'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '100%', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 1500,
                    autoPlay: true,
                    data: [
                        [
                            "eid44",
                            "scaleX",
                            250,
                            750,
                            "easeOutBack",
                            "${Text}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid20",
                            "opacity",
                            0,
                            500,
                            "linear",
                            "${popup_feedback}",
                            '0',
                            '1'
                        ],
                        [
                            "eid48",
                            "opacity",
                            1000,
                            500,
                            "linear",
                            "${close}",
                            '0',
                            '1'
                        ],
                        [
                            "eid55",
                            "scaleX",
                            500,
                            1000,
                            "easeOutBack",
                            "${btnFeedbackRestart}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid14",
                            "opacity",
                            0,
                            1000,
                            "linear",
                            "${fade}",
                            '0',
                            '0.4000000059604645'
                        ],
                        [
                            "eid57",
                            "scaleY",
                            500,
                            1000,
                            "easeOutBack",
                            "${btnFeedbackRestart}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid18",
                            "scaleY",
                            0,
                            1000,
                            "easeOutBack",
                            "${popup_feedback}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid16",
                            "scaleX",
                            0,
                            1000,
                            "easeOutBack",
                            "${popup_feedback}",
                            '0.07',
                            '1'
                        ],
                        [
                            "eid59",
                            "opacity",
                            500,
                            750,
                            "easeOutBack",
                            "${btnFeedbackRestart}",
                            '0',
                            '1'
                        ],
                        [
                            "eid46",
                            "opacity",
                            750,
                            750,
                            "linear",
                            "${Text}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "btnFeedbackRestart": {
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
                            opacity: '1',
                            id: 'Ellipse',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'ellipse',
                            fill: ['rgba(245,151,86,1.00)']
                        },
                        {
                            rect: ['25.93%', '25%', '49.96%', '48.11%', 'auto', 'auto'],
                            id: 'restartIconAnim',
                            symbolName: 'restartIconAnim',
                            opacity: '1',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '18.03%', '24.92%']
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
                            'rgba(245,151,86,1.00)',
                            'rgba(245,151,86,1.00)'
                        ],
                        [
                            "eid110",
                            "background-color",
                            1000,
                            0,
                            "linear",
                            "${Ellipse}",
                            'rgba(245,151,86,1.00)',
                            'rgba(243,137,64,1.00)'
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
                            "eid71",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '1',
                            '1'
                        ],
                        [
                            "eid72",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '1',
                            '0.3'
                        ],
                        [
                            "eid67",
                            "top",
                            0,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '25%',
                            '25%'
                        ],
                        [
                            "eid69",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '23.73%',
                            '25.48%'
                        ],
                        [
                            "eid70",
                            "top",
                            3000,
                            0,
                            "linear",
                            "${restartIconAnim}",
                            '28.85%',
                            '25%'
                        ],
                            [ "eid73", "trigger", 1000, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${restartIconAnim}', [] ] ]
                    ]
                }
            },
            "arrowLeftAnim": {
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
                            id: 'tetris_arrowLeft',
                            tag: 'img',
                            rect: ['0%', '-0.04%', '100.1%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_arrowLeft.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '27.99%', '46.22%']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    data: [
                        [
                            "eid79",
                            "left",
                            0,
                            250,
                            "easeOutBack",
                            "${tetris_arrowLeft}",
                            '0%',
                            '-22%'
                        ],
                        [
                            "eid80",
                            "left",
                            250,
                            250,
                            "linear",
                            "${tetris_arrowLeft}",
                            '-22%',
                            '0%'
                        ]
                    ]
                }
            },
            "arrowRightAnim": {
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
                            id: 'tetris_arrowRight',
                            tag: 'img',
                            rect: ['0.24%', '0%', '100.1%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_arrowRight.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '27.99%', '46.22%']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    data: [
                        [
                            "eid89",
                            "left",
                            0,
                            250,
                            "linear",
                            "${tetris_arrowRight}",
                            '0.24%',
                            '22%'
                        ],
                        [
                            "eid90",
                            "left",
                            250,
                            250,
                            "linear",
                            "${tetris_arrowRight}",
                            '22%',
                            '-0.12%'
                        ]
                    ]
                }
            },
            "arrowDownAnim": {
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
                            id: 'tetris_arrowDown',
                            tag: 'img',
                            rect: ['0.07%', '0%', '100.1%', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/tetris_arrowDown.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '47.97%', '26.91%']
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: false,
                    data: [
                        [
                            "eid101",
                            "top",
                            0,
                            250,
                            "linear",
                            "${tetris_arrowDown}",
                            '0%',
                            '22%'
                        ],
                        [
                            "eid102",
                            "top",
                            250,
                            250,
                            "linear",
                            "${tetris_arrowDown}",
                            '22%',
                            '-0.24%'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

  if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("../../dist/en/index_edgeActions.js");
})("EDGE-5434671");
