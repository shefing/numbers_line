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
                rect: ['0%', '0%','100%','100%','auto', 'auto']
            },
            {
                id: 'btnLeft',
                type: 'rect',
                rect: ['40.5%', '89.5%','5.8%','8.3%','auto', 'auto'],
                cursor: ['pointer'],
                userClass: "edge-btn button-left"
            },
            {
                id: 'btnDown',
                type: 'rect',
                rect: ['47%', '89.5%','5.8%','8.3%','auto', 'auto'],
                cursor: ['pointer'],
                userClass: "edge-btn button-down"
            },
            {
                id: 'btnRight',
                type: 'rect',
                rect: ['53.6%', '89.5%','5.8%','8.3%','auto', 'auto'],
                cursor: ['pointer'],
                userClass: "edge-btn button-right"
            },
            {
                id: 'lifeContainer',
                type: 'rect',
                rect: ['76.3%', '92.2%','21.3%','2.9%','auto', 'auto']
            },
            {
                id: 'final-feedback',
                display: 'none',
                type: 'rect',
                rect: ['0%', '0%','100%','100%','auto', 'auto'],
                userClass: "final-feedback"
            },
            {
                id: 'btnRestartCopy2',
                type: 'rect',
                rect: ['9.3%', '75.4%','5.8%','8.3%','auto', 'auto'],
                cursor: ['pointer'],
                userClass: "edgy-button button-restart"
            },
            {
                id: 'muteCopy2',
                type: 'rect',
                rect: ['2.3%', '75.4%','5.8%','8.3%','auto', 'auto'],
                userClass: "button-mute"
            },
            {
                id: 'opening2',
                type: 'rect',
                rect: ['0px', '0','auto','auto','auto', 'auto'],
                userClass: "start-dialog"
            }],
            symbolInstances: [
            {
                id: 'btnLeft',
                symbolName: 'btnLeft',
                autoPlay: {

                }
            },
            {
                id: 'final-feedback',
                symbolName: 'final-feedback',
                autoPlay: {

                }
            },
            {
                id: 'lifeContainer',
                symbolName: 'lifeContainer',
                autoPlay: {

                }
            },
            {
                id: 'BG',
                symbolName: 'BG',
                autoPlay: {

                }
            },
            {
                id: 'muteCopy2',
                symbolName: 'mute',
                autoPlay: {

                }
            },
            {
                id: 'btnDown',
                symbolName: 'btnDown',
                autoPlay: {

                }
            },
            {
                id: 'opening2',
                symbolName: 'opening',
                autoPlay: {

                }
            },
            {
                id: 'btnRight',
                symbolName: 'btnRight',
                autoPlay: {

                }
            },
            {
                id: 'btnRestartCopy2',
                symbolName: 'btnRestart',
                autoPlay: {

                }
            }
            ]
        },
    states: {
        "Base State": {
            "${_btnRestartCopy2}": [
                ["style", "top", '89.52%'],
                ["style", "height", '8.25%'],
                ["style", "left", '9.32%'],
                ["style", "cursor", 'pointer'],
                ["style", "width", '5.82%']
            ],
            "${_muteCopy2}": [
                ["style", "height", '8.25%'],
                ["style", "top", '89.52%'],
                ["style", "left", '2.33%'],
                ["style", "width", '5.82%']
            ],
            "${_btnDown}": [
                ["style", "top", '89.52%'],
                ["style", "height", '8.25%'],
                ["style", "cursor", 'pointer'],
                ["style", "left", '46.98%'],
                ["style", "width", '5.82%']
            ],
            "${_opening2}": [
                ["style", "left", '0px']
            ],
            "${_lifeContainer}": [
                ["style", "height", '2.86%'],
                ["style", "left", '76.26%'],
                ["style", "width", '21.28%']
            ],
            "${_btnLeft}": [
                ["style", "top", '89.52%'],
                ["style", "height", '8.25%'],
                ["style", "cursor", 'pointer'],
                ["style", "left", '40.47%'],
                ["style", "width", '5.82%']
            ],
            "${_Stage}": [
                ["color", "background-color", 'rgba(255,255,255,1)'],
                ["style", "width", '860px'],
                ["style", "height", '630px'],
                ["style", "overflow", 'hidden']
            ],
            "${_final-feedback}": [
                ["style", "display", 'none'],
                ["style", "top", '0%'],
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_BG}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_btnRight}": [
                ["style", "top", '89.52%'],
                ["style", "height", '8.25%'],
                ["style", "cursor", 'pointer'],
                ["style", "left", '53.6%'],
                ["style", "width", '5.82%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1500,
            autoPlay: true,
            timeline: [
                { id: "eid74", tween: [ "style", "${_final-feedback}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0, easing: "easeOutBack" }            ]
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
                    id: 'Rectangle',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'rect',
                    fill: ['rgba(97,102,108,1.00)']
                },
                {
                    rect: ['0%', '87.3%', '100%', '12.7%', 'auto', 'auto'],
                    id: 'Rectangle2',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(54,52,55,1.00)']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_Rectangle2}": [
                ["style", "height", '12.7%'],
                ["style", "top", '87.3%'],
                ["style", "left", '0%'],
                ["color", "background-color", 'rgba(54,52,55,1.00)']
            ],
            "${_Rectangle}": [
                ["style", "height", '100%'],
                ["color", "background-color", 'rgba(97,102,108,1.00)'],
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
                    rect: ['13.6%', '0%', '86.7%', '100%', 'auto', 'auto'],
                    id: 'trivia_muteOnIcon',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_muteOnIcon.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img',
                    tabindex:'0'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_muteOnIcon}": [
                ["transform", "scaleX", '1'],
                ["style", "top", '0%'],
                ["style", "left", '13.6%'],
                ["transform", "scaleY", '1']
            ],
            "${symbolSelector}": [
                ["style", "height", '48.08%'],
                ["style", "width", '60%']
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
                    rect: ['0%', '0%', '99.9%', '100%', 'auto', 'auto'],
                    userClass: 'mute-off edge-btn',
                    id: 'btnMuteOff',
                    display: 'none',
                    cursor: ['pointer'],
                    type: 'rect'
                },
                {
                    rect: ['0%', '0%', '99.9%', '100%', 'auto', 'auto'],
                    id: 'btnMuteOn',
                    userClass: 'mute-on edge-btn',
                    cursor: ['pointer'],
                    type: 'rect'
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
                ["style", "height", '8.25%'],
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
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '0.3', { fromValue: '0.3'}], position: 0, duration: 0 },
                { id: "eid125", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '0.3'}], position: 1000, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid952", tween: [ "style", "${_muteIconOffAnim}", "top", '26.86%', { fromValue: '26.86%'}], position: 0, duration: 0 },
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
                    rect: ['16%', '26.9%', '60%', '48.1%', 'auto', 'auto']
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
                ["style", "width", '60%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(235,255,230,1.00)'],
                ["style", "opacity", '0.3'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100.06%'],
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
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid884", tween: [ "style", "${_muteIconOnAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid885", tween: [ "style", "${_muteIconOnAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '0.3', { fromValue: '0.3'}], position: 0, duration: 0 },
                { id: "eid125", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '0.3'}], position: 1000, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid880", tween: [ "style", "${_muteIconOnAnim}", "top", '26.86%', { fromValue: '26.86%'}], position: 0, duration: 0 },
                { id: "eid882", tween: [ "style", "${_muteIconOnAnim}", "top", '28.85%', { fromValue: '25%'}], position: 2000, duration: 0 },
                { id: "eid883", tween: [ "style", "${_muteIconOnAnim}", "top", '26.92%', { fromValue: '28.85%'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(235,255,230,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(235,255,230,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(168,201,159,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(235,255,230,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,153,69,1.00)'}], position: 3000, duration: 0 },
                { id: "eid886", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_muteIconOnAnim}', [] ], ""], position: 1000 }            ]
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
                    type: 'image',
                    id: 'trivia_muteOffIcon',
                    tag: 'img',
                    rect: ['3.3%', '0%', '93.3%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_muteOffIcon.svg', '0px', '0px'],
                    tabindex:'0'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_muteOffIcon}": [
                ["transform", "scaleX", '1'],
                ["style", "top", '0%'],
                ["style", "left", '3.33%'],
                ["transform", "scaleY", '1']
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
                    rect: ['0.1%', '-36%', '100.2%', '100%', 'auto', 'auto'],
                    id: 'trivia_hintIcon50',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_restartIcon.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img',
                    tabindex:'0'
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
                ["style", "width", '100.21%']
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
                { id: "eid701", tween: [ "transform", "${_trivia_hintIcon50}", "rotateZ", '50deg', { fromValue: '0deg'}], position: 0, duration: 500, easing: "easeInQuad" },
                { id: "eid702", tween: [ "transform", "${_trivia_hintIcon50}", "rotateZ", '0deg', { fromValue: '50deg'}], position: 500, duration: 500, easing: "easeInQuad" }            ]
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
                    rect: ['26%', '26.9%', '50%', '48.1%', 'auto', 'auto']
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
                ["style", "height", '48.11%'],
                ["style", "opacity", '1'],
                ["style", "left", '25.93%'],
                ["style", "width", '49.96%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(235,255,230,1.00)'],
                ["style", "opacity", '0.3'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${symbolSelector}": [
                ["style", "height", '8.25%'],
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
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid683", tween: [ "style", "${_restartIconAnim}", "top", '26.92%', { fromValue: '26.92%'}], position: 0, duration: 0 },
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
"btnLeft": {
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
                    rect: ['0%', '0%', '100%', '96.2%', 'auto', 'auto'],
                    borderRadius: ['50%', '50%', '50%', '50%'],
                    id: 'Ellipse',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'ellipse',
                    fill: ['rgba(230,138,62,1.00)']
                },
                {
                    id: 'arrowLeftAnim',
                    type: 'rect',
                    rect: ['32%', '25%', '28%', '46.2%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'arrowLeftAnim',
                symbolName: 'arrowLeftAnim'
            }            ]
        },
    states: {
        "Base State": {
            "${_arrowLeftAnim}": [
                ["style", "top", '25.02%'],
                ["style", "opacity", '1'],
                ["style", "height", '46.18%'],
                ["style", "width", '27.98%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(245,151,86,1.00)'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${symbolSelector}": [
                ["style", "height", '8.25%'],
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
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid75", tween: [ "style", "${_arrowLeftAnim}", "top", '25.02%', { fromValue: '25.02%'}], position: 0, duration: 0, easing: "easeOutBack" },
                { id: "eid77", tween: [ "style", "${_arrowLeftAnim}", "top", '26.94%', { fromValue: '23.09%'}], position: 2000, duration: 0, easing: "easeOutBack" },
                { id: "eid78", tween: [ "style", "${_arrowLeftAnim}", "top", '25.02%', { fromValue: '26.94%'}], position: 3000, duration: 0, easing: "easeOutBack" },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid125", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 1000, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(245,151,86,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(243,137,64,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,153,69,1.00)'}], position: 3000, duration: 0 },
                { id: "eid88", tween: [ "style", "${_arrowLeftAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid87", tween: [ "style", "${_arrowLeftAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid91", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_arrowLeftAnim}', [] ], ""], position: 1000 }            ]
        }
    }
},
"btnDown": {
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
                    id: 'arrowDownAnim',
                    type: 'rect',
                    rect: ['25.9%', '38.5%', '48%', '26.9%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'arrowDownAnim',
                symbolName: 'arrowDownAnim'
            }            ]
        },
    states: {
        "Base State": {
            "${_arrowDownAnim}": [
                ["style", "top", '38.49%'],
                ["style", "height", '26.94%'],
                ["style", "opacity", '1'],
                ["style", "left", '25.94%'],
                ["style", "width", '47.96%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(245,151,86,1.00)'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${symbolSelector}": [
                ["style", "height", '8.25%'],
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
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid94", tween: [ "style", "${_arrowDownAnim}", "top", '38.49%', { fromValue: '38.49%'}], position: 0, duration: 0 },
                { id: "eid97", tween: [ "style", "${_arrowDownAnim}", "top", '40.41%', { fromValue: '36.56%'}], position: 2000, duration: 0 },
                { id: "eid98", tween: [ "style", "${_arrowDownAnim}", "top", '38.49%', { fromValue: '40.41%'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid125", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 1000, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid100", tween: [ "style", "${_arrowDownAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid99", tween: [ "style", "${_arrowDownAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(245,151,86,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(243,137,64,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,153,69,1.00)'}], position: 3000, duration: 0 },
                { id: "eid103", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_arrowDownAnim}', [0] ], ""], position: 1000 }            ]
        }
    }
},
"btnRight": {
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
                    id: 'arrowRightAnim',
                    type: 'rect',
                    rect: ['40%', '26.9%', '28%', '46.2%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'arrowRightAnim',
                symbolName: 'arrowRightAnim'
            }            ]
        },
    states: {
        "Base State": {
            "${_arrowRightAnim}": [
                ["style", "top", '26.94%'],
                ["style", "opacity", '1'],
                ["style", "height", '46.18%'],
                ["style", "width", '27.98%']
            ],
            "${_Ellipse}": [
                ["color", "background-color", 'rgba(245,151,86,1.00)'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "top", '1.92%']
            ],
            "${symbolSelector}": [
                ["style", "height", '8.25%'],
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
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '3.85%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '1.92%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid86", tween: [ "style", "${_arrowRightAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid85", tween: [ "style", "${_arrowRightAnim}", "opacity", '0.3046875', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid125", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 1000, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid81", tween: [ "style", "${_arrowRightAnim}", "top", '26.94%', { fromValue: '26.94%'}], position: 0, duration: 0 },
                { id: "eid83", tween: [ "style", "${_arrowRightAnim}", "top", '28.86%', { fromValue: '25.02%'}], position: 2000, duration: 0 },
                { id: "eid84", tween: [ "style", "${_arrowRightAnim}", "top", '26.94%', { fromValue: '28.86%'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(245,151,86,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(243,137,64,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,153,69,1.00)'}], position: 3000, duration: 0 },
                { id: "eid92", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_arrowRightAnim}', [] ], ""], position: 1000 }            ]
        }
    }
},
"life": {
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
                    id: 'lifeDead',
                    type: 'rect',
                    userClass: 'dead',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto']
                },
                {
                    id: 'lifeAlive',
                    type: 'rect',
                    userClass: 'alive',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'lifeDead',
                symbolName: 'lifeDead'
            },
            {
                id: 'lifeAlive',
                symbolName: 'lifeAlive'
            }            ]
        },
    states: {
        "Base State": {
            "${_lifeDead}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '10.39%']
            ],
            "${_lifeAlive}": [
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
"lifeDead": {
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
                    id: 'tetris_lifeDead',
                    tag: 'img',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_lifeDead.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_tetris_lifeDead}": [
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
"lifeAlive": {
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
                    id: 'tetris_lifeAlive',
                    tag: 'img',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_lifeAlive.svg', '0px', '0px']
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_tetris_lifeAlive}": [
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
"lifeContainer": {
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
                    id: 'life8',
                    type: 'rect',
                    rect: ['0%', '0%', '10.4%', '99.8%', 'auto', 'auto'],
                    userClass: 'life'
                },
                {
                    id: 'life7',
                    type: 'rect',
                    rect: ['12.9%', '0%', '10.4%', '99.9%', 'auto', 'auto'],
                    userClass: 'life'
                },
                {
                    id: 'life6',
                    type: 'rect',
                    rect: ['25.8%', '0%', '10.4%', '99.9%', 'auto', 'auto'],
                    userClass: 'life'
                },
                {
                    id: 'life5',
                    type: 'rect',
                    rect: ['38.3%', '0%', '10.4%', '99.9%', 'auto', 'auto'],
                    userClass: 'life'
                },
                {
                    id: 'life4',
                    type: 'rect',
                    rect: ['51.2%', '0%', '10.4%', '99.9%', 'auto', 'auto'],
                    userClass: 'life'
                },
                {
                    id: 'life3',
                    type: 'rect',
                    rect: ['64.1%', '0%', '10.4%', '99.9%', 'auto', 'auto'],
                    userClass: 'life'
                },
                {
                    id: 'life2',
                    type: 'rect',
                    rect: ['77%', '0%', '10.4%', '99.9%', 'auto', 'auto'],
                    userClass: 'life'
                },
                {
                    id: 'life1',
                    type: 'rect',
                    rect: ['89.6%', '0%', '10.4%', '99.9%', 'auto', 'auto'],
                    userClass: 'life'
                }
            ],
            symbolInstances: [
            {
                id: 'life6',
                symbolName: 'life'
            },
            {
                id: 'life7',
                symbolName: 'life'
            },
            {
                id: 'life2',
                symbolName: 'life'
            },
            {
                id: 'life4',
                symbolName: 'life'
            },
            {
                id: 'life5',
                symbolName: 'life'
            },
            {
                id: 'life3',
                symbolName: 'life'
            },
            {
                id: 'life8',
                symbolName: 'life'
            },
            {
                id: 'life1',
                symbolName: 'life'
            }            ]
        },
    states: {
        "Base State": {
            "${_life2}": [
                ["style", "height", '99.91%'],
                ["style", "top", '0%'],
                ["style", "left", '77.03%'],
                ["style", "width", '10.39%']
            ],
            "${_life8}": [
                ["style", "top", '0%'],
                ["style", "height", '99.91%'],
                ["style", "left", '0%'],
                ["style", "width", '10.39%']
            ],
            "${_life7}": [
                ["style", "height", '99.91%'],
                ["style", "top", '0%'],
                ["style", "left", '12.92%'],
                ["style", "width", '10.39%']
            ],
            "${_life1}": [
                ["style", "height", '99.91%'],
                ["style", "top", '0%'],
                ["style", "left", '89.62%'],
                ["style", "width", '10.39%']
            ],
            "${_life4}": [
                ["style", "height", '99.91%'],
                ["style", "top", '0%'],
                ["style", "left", '51.18%'],
                ["style", "width", '10.39%']
            ],
            "${_life3}": [
                ["style", "height", '99.91%'],
                ["style", "top", '0%'],
                ["style", "left", '64.1%'],
                ["style", "width", '10.39%']
            ],
            "${_life6}": [
                ["style", "height", '99.91%'],
                ["style", "top", '0%'],
                ["style", "left", '25.84%'],
                ["style", "width", '10.39%']
            ],
            "${symbolSelector}": [
                ["style", "height", '2.86%'],
                ["style", "width", '23.4%']
            ],
            "${_life5}": [
                ["style", "height", '99.91%'],
                ["style", "top", '0%'],
                ["style", "left", '38.26%'],
                ["style", "width", '10.39%']
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
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    id: 'Rectangle2',
                    opacity: 0.7,
                    type: 'rect',
                    fill: ['rgba(35,31,32,1.00)']
                },
                {
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    id: 'tetris_opening3',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_opening.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    userClass: 'edge-btn button-start',
                    id: 'btnStartCopy',
                    type: 'rect',
                    cursor: ['pointer'],
                    rect: ['40.9%', '37.5%', '18%', '24.9%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'btnStartCopy',
                symbolName: 'btnStart',
                autoPlay: {

               }
            }            ]
        },
    states: {
        "Base State": {
            "${_btnStartCopy}": [
                ["style", "top", '37.47%'],
                ["style", "height", '24.92%'],
                ["style", "cursor", 'pointer'],
                ["style", "left", '40.93%'],
                ["style", "width", '18.03%']
            ],
            "${_Rectangle2}": [
                ["color", "background-color", 'rgba(35,31,32,1.00)'],
                ["style", "opacity", '0.7'],
                ["style", "left", '0%'],
                ["style", "top", '0%']
            ],
            "${_tetris_opening3}": [
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
                    rect: ['39.4%', '27.4%', '28.4%', '45.9%', 'auto', 'auto']
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
                ["style", "height", '45.86%'],
                ["style", "opacity", '1'],
                ["style", "left", '39.35%'],
                ["style", "width", '28.39%']
            ],
            "${_Ellipse}": [
                ["style", "top", '0.64%'],
                ["color", "background-color", 'rgba(245,151,86,1.00)'],
                ["style", "height", '98.73%'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${symbolSelector}": [
                ["style", "height", '24.92%'],
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
                { id: "eid115", tween: [ "style", "${_Ellipse}", "top", '0.64%', { fromValue: '0.64%'}], position: 0, duration: 0 },
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '1.27%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '0.64%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid1005", tween: [ "style", "${_startIconAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid1006", tween: [ "style", "${_startIconAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid1001", tween: [ "style", "${_startIconAnim}", "top", '25.48%', { fromValue: '25.48%'}], position: 0, duration: 0 },
                { id: "eid1003", tween: [ "style", "${_startIconAnim}", "top", '26.75%', { fromValue: '-1.27%'}], position: 2000, duration: 0 },
                { id: "eid1004", tween: [ "style", "${_startIconAnim}", "top", '25.48%', { fromValue: '1.27%'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(245,151,86,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(243,137,64,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,174,82,1.00)'}], position: 3000, duration: 0 },
                { id: "eid1009", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_startIconAnim}', [] ], ""], position: 1000 }            ]
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
                    rect: ['0%', '-52.8%', '100%', '100%', 'auto', 'auto'],
                    id: 'trivia_hintIcon50',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_openingIcon.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img',
                    tabindex:'0'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_trivia_hintIcon50}": [
                ["style", "top", '0%'],
                ["style", "height", '100%'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${symbolSelector}": [
                ["style", "height", '45.86%'],
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
                { id: "eid1007", tween: [ "style", "${_trivia_hintIcon50}", "left", '11.36%', { fromValue: '0%'}], position: 0, duration: 250 },
                { id: "eid1008", tween: [ "style", "${_trivia_hintIcon50}", "left", '0%', { fromValue: '11.36%'}], position: 250, duration: 250 }            ]
        }
    }
},
"close": {
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
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    id: 'Rectangle2',
                    opacity: 0,
                    type: 'rect',
                    fill: ['rgba(159,0,0,1.00)']
                },
                {
                    id: 'tetris_feedbackClose',
                    type: 'image',
                    rect: ['13px', '13px', '23px', '23px', 'auto', 'auto'],
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_feedbackClose.svg', '0px', '0px'],
                    tabindex:'0'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_tetris_feedbackClose}": [
                ["style", "top", '13px'],
                ["style", "left", '13px']
            ],
            "${_Rectangle2}": [
                ["color", "background-color", 'rgba(159,0,0,1.00)'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "top", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '7.78%'],
                ["style", "width", '5.7%']
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
"feedbackGood": {
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
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    id: 'fade',
                    opacity: 0.4,
                    type: 'rect',
                    fill: ['rgba(0,0,0,1.00)']
                },
                {
                    id: 'popup_feedback',
                    type: 'rect',
                    rect: ['16.9%', '22.4%', '66.3%', '55.6%', 'auto', 'auto']
                },
                {
                    rect: ['18.4%', '31.3%', '63.1%', '37.8%', 'auto', 'auto'],
                    id: 'tetris_stars',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_stars.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    rect: ['26.3%', '41.1%', '47.5%', '17.9%', 'auto', 'auto'],
                    id: 'tetris_feedbackRibbon',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_feedbackRibbon.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                },
                {
                    font: ['Alef', [387.5, '%'], 'rgba(126,203,210,1)', '700', 'none', 'normal'],
                    rect: ['35%', '42.7%', '28.4%', '17.6%', 'auto', 'auto'],
                    type: 'text',
                    id: 'Text',
                    text: 'כל הכבוד!',
                    align: 'center',
                    userClass: 'feedback-text'
                },
                {
                    userClass: 'button-feedback-close edgy-button',
                    id: 'close',
                    type: 'rect',
                    cursor: ['pointer'],
                    rect: ['16.9%', '22.4%', '5.7%', '7.8%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'close',
                symbolName: 'close',
                autoPlay: {

               }
            },
            {
                id: 'popup_feedback',
                symbolName: 'popup_feedback',
                autoPlay: {

               }
            }            ]
        },
    states: {
        "Base State": {
            "${_tetris_feedbackRibbon}": [
                ["style", "top", '41.11%'],
                ["style", "left", '26.28%'],
                ["transform", "scaleX", '0']
            ],
            "${_Text}": [
                ["style", "line-height", '115%'],
                ["style", "letter-spacing", '0em'],
                ["transform", "scaleX", '0.07'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "font-weight", '700'],
                ["style", "left", '29.64%'],
                ["style", "width", '40.61%'],
                ["style", "top", '41.43%'],
                ["style", "font-size", '375%'],
                ["style", "text-align", 'center'],
                ["style", "text-indent", '0%'],
                ["style", "height", '17.29%'],
                ["style", "font-family", 'Alef'],
                ["style", "word-spacing", '0em'],
                ["style", "opacity", '0']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_tetris_stars}": [
                ["style", "top", '31.27%'],
                ["transform", "scaleY", '0.07'],
                ["transform", "scaleX", '0.07'],
                ["style", "opacity", '0'],
                ["style", "left", '18.37%']
            ],
            "${_fade}": [
                ["color", "background-color", 'rgba(0,0,0,1.00)'],
                ["style", "top", '0%'],
                ["style", "height", '100%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${_close}": [
                ["style", "top", '22.38%'],
                ["style", "cursor", 'pointer'],
                ["style", "height", '7.78%'],
                ["style", "opacity", '0'],
                ["style", "left", '16.86%'],
                ["style", "width", '5.7%']
            ],
            "${_popup_feedback}": [
                ["transform", "scaleY", '0.07'],
                ["transform", "scaleX", '0.07'],
                ["style", "opacity", '0'],
                ["style", "height", '55.56%'],
                ["style", "width", '66.28%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1500,
            autoPlay: true,
            timeline: [
                { id: "eid30", tween: [ "transform", "${_tetris_feedbackRibbon}", "scaleX", '1', { fromValue: '0'}], position: 250, duration: 750, easing: "easeOutBack" },
                { id: "eid14", tween: [ "style", "${_fade}", "opacity", '0.4000000059604645', { fromValue: '0'}], position: 0, duration: 1000 },
                { id: "eid24", tween: [ "transform", "${_tetris_stars}", "scaleX", '1', { fromValue: '0.07'}], position: 250, duration: 1250, easing: "easeOutCirc" },
                { id: "eid16", tween: [ "transform", "${_popup_feedback}", "scaleX", '1', { fromValue: '0.07'}], position: 0, duration: 1000, easing: "easeOutBack" },
                { id: "eid18", tween: [ "transform", "${_popup_feedback}", "scaleY", '1', { fromValue: '0.07'}], position: 0, duration: 1000, easing: "easeOutBack" },
                { id: "eid46", tween: [ "style", "${_Text}", "opacity", '1', { fromValue: '0'}], position: 750, duration: 750 },
                { id: "eid28", tween: [ "style", "${_tetris_stars}", "opacity", '1', { fromValue: '0'}], position: 250, duration: 750, easing: "easeOutBack" },
                { id: "eid26", tween: [ "transform", "${_tetris_stars}", "scaleY", '1', { fromValue: '0.07'}], position: 250, duration: 1250, easing: "easeOutCirc" },
                { id: "eid44", tween: [ "transform", "${_Text}", "scaleX", '1', { fromValue: '0.07'}], position: 250, duration: 750, easing: "easeOutBack" },
                { id: "eid48", tween: [ "style", "${_close}", "opacity", '1', { fromValue: '0'}], position: 1000, duration: 500 },
                { id: "eid20", tween: [ "style", "${_popup_feedback}", "opacity", '1', { fromValue: '0'}], position: 0, duration: 500 }            ]
        }
    }
},
"basket": {
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
                    userClass: 'basket-background',
                    id: 'Rectangle',
                    stroke: [0, 'rgba(205,1,39,1.00)', 'solid'],
                    type: 'rect',
                    fill: ['rgba(74,74,76,1.00)']
                },
                {
                    rect: ['0%', '0%', '100%', '35%', 'auto', 'auto'],
                    userClass: 'basket-title-background',
                    id: 'title',
                    stroke: [0, 'rgba(32, 205, 1, 0)', 'solid'],
                    type: 'rect',
                    fill: ['rgba(236,126,104,1.00)']
                },
                {
                    rect: ['0%', '3.4%', '100%', '15%', 'auto', 'auto'],
                    font: ['Alef', [150, '%'], 'rgba(255,255,255,1.00)', 'normal', 'none', 'normal'],
                    userClass: 'basket-title-text text',
                    id: 'Text5',
                    text: 'N<br>',
                    align: 'center',
                    type: 'text'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${symbolSelector}": [
                ["style", "height", '30%'],
                ["style", "width", '22.4%']
            ],
            "${_Rectangle}": [
                ["color", "background-color", 'rgba(74,74,76,1.00)'],
                ["style", "top", '0%'],
                ["style", "border-width", '0px'],
                ["style", "border-style", 'solid'],
                ["style", "height", '100%'],
                ["color", "border-color", 'rgba(32,205,1,0.00)'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${_Text5}": [
                ["style", "line-height", '70%'],
                ["style", "letter-spacing", '0em'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "left", '0%'],
                ["style", "width", '100%'],
                ["style", "top", '3.4%'],
                ["style", "text-indent", '0%'],
                ["style", "height", '15%'],
                ["style", "font-family", 'Alef'],
                ["style", "word-spacing", '0em'],
                ["style", "font-size", '150%']
            ],
            "${_title}": [
                ["color", "background-color", 'rgba(236,126,104,1.00)'],
                ["style", "height", '35%'],
                ["style", "border-style", 'solid'],
                ["style", "border-width", '0px'],
                ["style", "width", '100%']
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
                "normal": 0,
                "correct": 500,
                "error": 1000
            },
            timeline: [
                { id: "eid51", tween: [ "color", "${_Rectangle}", "border-color", 'rgba(32,205,1,0.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(32,205,1,0.00)'}], position: 0, duration: 0 },
                { id: "eid52", tween: [ "color", "${_Rectangle}", "border-color", 'rgba(32,205,1,0.99)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(32,205,1,0.99)'}], position: 500, duration: 0 },
                { id: "eid50", tween: [ "color", "${_Rectangle}", "border-color", 'rgba(205,1,39,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(32,205,1,0.99)'}], position: 1000, duration: 0 }            ]
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
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto'],
                    userClass: 'option-background',
                    id: 'Rectangle2',
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    type: 'rect',
                    fill: ['rgba(91,193,155,1.00)']
                },
                {
                    rect: ['0.4%', '24.4%', '101%', '58.3%', 'auto', 'auto'],
                    font: ['Alef', [150, '%'], 'rgba(234,235,234,1.00)', 'normal', 'none', 'normal'],
                    userClass: 'text',
                    id: 'Text6',
                    text: 'dd',
                    align: 'center',
                    type: 'text'
                },
                {
                    type: 'image',
                    userClass: 'feedback-correct',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_v.svg', '0px', '0px'],
                    id: 'tetris_v',
                    rect: ['90.2%', '0%', '9.6%', '40.3%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                },
                {
                    type: 'image',
                    userClass: 'feedback-error',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_x.svg', '0px', '0px'],
                    id: 'tetris_x',
                    rect: ['90.2%', '0%', '9.6%', '40.3%', 'auto', 'auto'],
                    display: 'none',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_Text6}": [
                ["style", "top", '24.4%'],
                ["color", "color", 'rgba(234,235,234,1.00)'],
                ["style", "font-size", '150%'],
                ["style", "line-height", '50%'],
                ["style", "height", '58.29%'],
                ["style", "font-family", 'Alef'],
                ["style", "left", '0.43%'],
                ["style", "width", '100.99%']
            ],
            "${_Rectangle2}": [
                ["color", "background-color", 'rgba(149,155,152,1.00)'],
                ["style", "height", '100%'],
                ["style", "top", '0%'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${_tetris_x}": [
                ["style", "top", '0%'],
                ["style", "left", '90.22%'],
                ["style", "display", 'none']
            ],
            "${symbolSelector}": [
                ["style", "height", '6.3%'],
                ["style", "width", '19.46%']
            ],
            "${_tetris_v}": [
                ["style", "top", '0%'],
                ["style", "left", '90.23%'],
                ["style", "display", 'none']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 0,
            autoPlay: false,
            labels: {
                "normal": 0
            },
            timeline: [
                { id: "eid11", tween: [ "style", "${_tetris_x}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid61", tween: [ "color", "${_Rectangle2}", "background-color", 'rgba(149,155,152,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(149,155,152,1.00)'}], position: 0, duration: 0 },
                { id: "eid12", tween: [ "style", "${_tetris_v}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 }            ]
        }
    }
},
"final-feedback": {
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
                    id: 'feedbackWrong',
                    type: 'rect',
                    userClass: 'final-feedback-failure',
                    rect: ['586px', '293px', 'auto', 'auto', 'auto', 'auto']
                },
                {
                    userClass: 'final-feedback-success',
                    id: 'feedbackGood',
                    type: 'rect',
                    display: 'block',
                    rect: ['0%', '0%', '100%', '100%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'feedbackWrong',
                symbolName: 'feedbackWrong',
                autoPlay: {

               }
            },
            {
                id: 'feedbackGood',
                symbolName: 'feedbackGood',
                autoPlay: {

               }
            }            ]
        },
    states: {
        "Base State": {
            "${_feedbackGood}": [
                ["style", "top", '0%'],
                ["style", "display", 'block'],
                ["style", "height", '100%'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${_feedbackWrong}": [
                ["style", "left", '0px'],
                ["style", "top", '0px']
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
            duration: 1500,
            autoPlay: true,
            timeline: [
                { id: "eid9", tween: [ "style", "${_feedbackGood}", "display", 'block', { fromValue: 'block'}], position: 0, duration: 0 }            ]
        }
    }
},
"popup_feedback": {
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
                    rect: ['0.1%', '0%', '100%', '100.1%', 'auto', 'auto'],
                    id: 'Rectangle',
                    stroke: [0, 'rgba(0,0,0,1)', 'none'],
                    type: 'rect',
                    fill: ['rgba(96,101,107,1.00)']
                },
                {
                    rect: ['-25.4%', '-39.7%', '150.9%', '180%', 'auto', 'auto'],
                    id: 'tetris_opening',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_opening.svg', '0px', '0px'],
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
                ["style", "top", '0%'],
                ["style", "height", '100%'],
                ["color", "background-color", 'rgba(96,101,107,1.00)'],
                ["style", "left", '0%'],
                ["style", "width", '100.01%']
            ],
            "${_tetris_opening}": [
                ["style", "top", '-39.71%'],
                ["style", "left", '-25.44%'],
                ["transform", "rotateZ", '180deg']
            ],
            "${symbolSelector}": [
                ["style", "height", '55.56%'],
                ["style", "overflow", 'hidden'],
                ["style", "width", '66.28%']
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
                { id: "eid22", tween: [ "transform", "${_tetris_opening}", "rotateZ", '0deg', { fromValue: '180deg'}], position: 0, duration: 1000, easing: "easeOutCirc" }            ]
        }
    }
},
"feedbackWrong": {
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
                    stroke: [0, 'rgb(0, 0, 0)', 'none'],
                    id: 'fade',
                    opacity: 0.4,
                    type: 'rect',
                    fill: ['rgba(0,0,0,1.00)']
                },
                {
                    id: 'popup_feedback',
                    type: 'rect',
                    rect: ['16.9%', '22.4%', '66.3%', '55.6%', 'auto', 'auto']
                },
                {
                    userClass: 'edge-btn try-again',
                    id: 'btnFeedbackRestart',
                    type: 'rect',
                    cursor: ['pointer'],
                    rect: ['40.9%', '40.8%', 'auto', 'auto', 'auto', 'auto']
                },
                {
                    font: ['Alef', [387.5, '%'], 'rgba(126,203,210,1)', '700', 'none', 'normal'],
                    rect: ['35%', '25.5%', '28.4%', '17.6%', 'auto', 'auto'],
                    type: 'text',
                    id: 'Text',
                    text: 'נסו שוב',
                    align: 'center',
                    userClass: 'feedback-text'
                },
                {
                    userClass: 'edgy-button button-feedback-close',
                    id: 'close',
                    type: 'rect',
                    cursor: ['pointer'],
                    rect: ['16.9%', '22.4%', '5.7%', '7.8%', 'auto', 'auto']
                }
            ],
            symbolInstances: [
            {
                id: 'popup_feedback',
                symbolName: 'popup_feedback',
                autoPlay: {

               }
            },
            {
                id: 'close',
                symbolName: 'close',
                autoPlay: {

               }
            },
            {
                id: 'btnFeedbackRestart',
                symbolName: 'btnFeedbackRestart',
                autoPlay: {

               }
            }            ]
        },
    states: {
        "Base State": {
            "${_Text}": [
                ["style", "line-height", '140%'],
                ["style", "letter-spacing", '0em'],
                ["style", "font-size", '375%'],
                ["color", "color", 'rgba(255,255,255,1.00)'],
                ["style", "font-weight", '700'],
                ["style", "left", '29.64%'],
                ["style", "width", '40.61%'],
                ["style", "top", '25.53%'],
                ["transform", "scaleX", '0.07'],
                ["style", "text-align", 'center'],
                ["style", "text-indent", '0%'],
                ["style", "height", '17.29%'],
                ["style", "font-family", 'Alef'],
                ["style", "word-spacing", '0em'],
                ["style", "opacity", '0']
            ],
            "${symbolSelector}": [
                ["style", "height", '100%'],
                ["style", "width", '100%']
            ],
            "${_btnFeedbackRestart}": [
                ["style", "top", '40.79%'],
                ["transform", "scaleY", '0.07'],
                ["transform", "scaleX", '0.07'],
                ["style", "opacity", '0'],
                ["style", "left", '40.93%'],
                ["style", "cursor", 'pointer']
            ],
            "${_fade}": [
                ["color", "background-color", 'rgba(0,0,0,1.00)'],
                ["style", "top", '0%'],
                ["style", "height", '100%'],
                ["style", "opacity", '0'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${_close}": [
                ["style", "top", '22.38%'],
                ["style", "left", '16.86%'],
                ["style", "height", '7.78%'],
                ["style", "opacity", '0'],
                ["style", "cursor", 'pointer'],
                ["style", "width", '5.7%']
            ],
            "${_popup_feedback}": [
                ["transform", "scaleY", '0.07'],
                ["style", "height", '55.56%'],
                ["style", "opacity", '0'],
                ["transform", "scaleX", '0.07'],
                ["style", "width", '66.28%']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1500,
            autoPlay: true,
            timeline: [
                { id: "eid55", tween: [ "transform", "${_btnFeedbackRestart}", "scaleX", '1', { fromValue: '0.07'}], position: 500, duration: 1000, easing: "easeOutBack" },
                { id: "eid14", tween: [ "style", "${_fade}", "opacity", '0.4000000059604645', { fromValue: '0'}], position: 0, duration: 1000 },
                { id: "eid57", tween: [ "transform", "${_btnFeedbackRestart}", "scaleY", '1', { fromValue: '0.07'}], position: 500, duration: 1000, easing: "easeOutBack" },
                { id: "eid18", tween: [ "transform", "${_popup_feedback}", "scaleY", '1', { fromValue: '0.07'}], position: 0, duration: 1000, easing: "easeOutBack" },
                { id: "eid20", tween: [ "style", "${_popup_feedback}", "opacity", '1', { fromValue: '0'}], position: 0, duration: 500 },
                { id: "eid46", tween: [ "style", "${_Text}", "opacity", '1', { fromValue: '0'}], position: 750, duration: 750 },
                { id: "eid59", tween: [ "style", "${_btnFeedbackRestart}", "opacity", '1', { fromValue: '0'}], position: 500, duration: 750, easing: "easeOutBack" },
                { id: "eid44", tween: [ "transform", "${_Text}", "scaleX", '1', { fromValue: '0.07'}], position: 250, duration: 750, easing: "easeOutBack" },
                { id: "eid48", tween: [ "style", "${_close}", "opacity", '1', { fromValue: '0'}], position: 1000, duration: 500 },
                { id: "eid16", tween: [ "transform", "${_popup_feedback}", "scaleX", '1', { fromValue: '0.07'}], position: 0, duration: 1000, easing: "easeOutBack" }            ]
        }
    }
},
"btnFeedbackRestart": {
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
                    id: 'restartIconAnim',
                    type: 'rect',
                    rect: ['26%', '26.9%', '50%', '48.1%', 'auto', 'auto']
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
                ["style", "top", '25%'],
                ["style", "height", '48.11%'],
                ["style", "opacity", '1'],
                ["style", "left", '25.93%'],
                ["style", "width", '49.96%']
            ],
            "${_Ellipse}": [
                ["style", "top", '0.64%'],
                ["color", "background-color", 'rgba(245,151,86,1.00)'],
                ["style", "height", '98.73%'],
                ["style", "opacity", '1'],
                ["style", "left", '0%'],
                ["style", "width", '100%']
            ],
            "${symbolSelector}": [
                ["style", "height", '24.92%'],
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
                { id: "eid115", tween: [ "style", "${_Ellipse}", "top", '0.64%', { fromValue: '0.64%'}], position: 0, duration: 0 },
                { id: "eid113", tween: [ "style", "${_Ellipse}", "top", '0%', { fromValue: '0.64%'}], position: 1000, duration: 0 },
                { id: "eid117", tween: [ "style", "${_Ellipse}", "top", '1.27%', { fromValue: '0%'}], position: 2000, duration: 0 },
                { id: "eid119", tween: [ "style", "${_Ellipse}", "top", '0.64%', { fromValue: '0%'}], position: 3000, duration: 0 },
                { id: "eid123", tween: [ "style", "${_Ellipse}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid122", tween: [ "style", "${_Ellipse}", "opacity", '0.2', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid109", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(245,151,86,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 0, duration: 0 },
                { id: "eid110", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(243,137,64,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(245,151,86,1.00)'}], position: 1000, duration: 0 },
                { id: "eid121", tween: [ "color", "${_Ellipse}", "background-color", 'rgba(255,255,255,1.00)', { animationColorSpace: 'RGB', valueTemplate: undefined, fromValue: 'rgba(255,174,82,1.00)'}], position: 3000, duration: 0 },
                { id: "eid67", tween: [ "style", "${_restartIconAnim}", "top", '25%', { fromValue: '25%'}], position: 0, duration: 0 },
                { id: "eid69", tween: [ "style", "${_restartIconAnim}", "top", '25.48%', { fromValue: '23.73%'}], position: 2000, duration: 0 },
                { id: "eid70", tween: [ "style", "${_restartIconAnim}", "top", '25%', { fromValue: '28.85%'}], position: 3000, duration: 0 },
                { id: "eid71", tween: [ "style", "${_restartIconAnim}", "opacity", '1', { fromValue: '1'}], position: 0, duration: 0 },
                { id: "eid72", tween: [ "style", "${_restartIconAnim}", "opacity", '0.3', { fromValue: '1'}], position: 3000, duration: 0 },
                { id: "eid73", trigger: [ function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['play', '${_restartIconAnim}', [] ], ""], position: 1000 }            ]
        }
    }
},
"arrowLeftAnim": {
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
                    rect: ['0.1%', '0%', '100.1%', '100%', 'auto', 'auto'],
                    id: 'tetris_arrowLeft',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_arrowLeft.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_tetris_arrowLeft}": [
                ["style", "top", '-0.04%'],
                ["style", "left", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '46.22%'],
                ["style", "width", '27.99%']
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
                { id: "eid79", tween: [ "style", "${_tetris_arrowLeft}", "left", '-22%', { fromValue: '0%'}], position: 0, duration: 250, easing: "easeOutBack" },
                { id: "eid80", tween: [ "style", "${_tetris_arrowLeft}", "left", '0%', { fromValue: '-22%'}], position: 250, duration: 250 }            ]
        }
    }
},
"arrowRightAnim": {
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
                    rect: ['0.4%', '-0.1%', '100.1%', '100%', 'auto', 'auto'],
                    id: 'tetris_arrowRight',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_arrowRight.svg', '0px', '0px'],
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
                ["style", "height", '46.22%'],
                ["style", "width", '27.99%']
            ],
            "${_tetris_arrowRight}": [
                ["style", "top", '0%'],
                ["style", "left", '0.24%']
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
                { id: "eid89", tween: [ "style", "${_tetris_arrowRight}", "left", '22%', { fromValue: '0.24%'}], position: 0, duration: 250 },
                { id: "eid90", tween: [ "style", "${_tetris_arrowRight}", "left", '-0.12%', { fromValue: '22%'}], position: 250, duration: 250 }            ]
        }
    }
},
"arrowDownAnim": {
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
                    rect: ['0.1%', '0.1%', '100.1%', '100%', 'auto', 'auto'],
                    id: 'tetris_arrowDown',
                    fill: ['rgba(0,0,0,0)', 'images/UI/tetris_arrowDown.svg', '0px', '0px'],
                    type: 'image',
                    tag: 'img'
                }
            ],
            symbolInstances: [
            ]
        },
    states: {
        "Base State": {
            "${_tetris_arrowDown}": [
                ["style", "left", '0.07%'],
                ["style", "top", '0%']
            ],
            "${symbolSelector}": [
                ["style", "height", '26.91%'],
                ["style", "width", '47.97%']
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
                { id: "eid101", tween: [ "style", "${_tetris_arrowDown}", "top", '22%', { fromValue: '0%'}], position: 0, duration: 250 },
                { id: "eid102", tween: [ "style", "${_tetris_arrowDown}", "top", '-0.24%', { fromValue: '22%'}], position: 250, duration: 250 }            ]
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
})(jQuery, AdobeEdge, "EDGE-5434671");
