/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
            'Alef': '<link rel=\"stylesheet\" href=\"ALef-Webfont-v2/alef-webfont.css\" type=\"text/css\" charset=\"utf-8\" />'        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
            js+"jquery-1.7.1.min.js"
        ],
        symbols = {
            "stage": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "both",
                centerStage: "both",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'bg',
                            symbolName: 'bg',
                            type: 'rect',
                            rect: ['0', '-1', '680', '600', 'auto', 'auto']
                        },
                        {
                            id: 'target',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['447', '116', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-1"
                        },
                        {
                            id: 'targetCopy',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['447', '177', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-2"
                        },
                        {
                            id: 'targetCopy2',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['447', '237', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-3"
                        },
                        {
                            id: 'targetCopy3',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['447', '298', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-4"
                        },
                        {
                            id: 'targetCopy4',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['447', '358', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-5 "
                        },
                        {
                            id: 'targetCopy9',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['271', '116', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-6"
                        },
                        {
                            id: 'targetCopy8',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['271', '177', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-7"
                        },
                        {
                            id: 'targetCopy7',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['271', '237', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-8"
                        },
                        {
                            id: 'targetCopy6',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['271', '298', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-9"
                        },
                        {
                            id: 'targetCopy5',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['271', '358', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-10 "
                        },
                        {
                            id: 'targetCopy14',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['96', '116', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-11"
                        },
                        {
                            id: 'targetCopy13',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['96', '177', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-12 "
                        },
                        {
                            id: 'targetCopy12',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['96', '237', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-13"
                        },
                        {
                            id: 'targetCopy11',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['96', '298', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-14"
                        },
                        {
                            id: 'targetCopy10',
                            symbolName: 'target',
                            type: 'rect',
                            rect: ['96', '358', '125', '45', 'auto', 'auto'],
                            userClass: "basket basket-15"
                        },
                        {
                            id: 'optionsWindow2',
                            symbolName: 'optionsWindow',
                            type: 'rect',
                            rect: ['61', '455', '544', '45', 'auto', 'auto'],
                            overflow: 'visible',
                            userClass: "storage"
                        },
                        {
                            id: 'check',
                            symbolName: 'check',
                            type: 'rect',
                            rect: ['2', '547', '117', '48', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "button-check"
                        },
                        {
                            id: 'feedback',
                            symbolName: 'feedback',
                            display: 'none',
                            type: 'rect',
                            rect: ['0', '66', '680', '534', 'auto', 'auto'],
                            userClass: "final-feedback"
                        },
                        {
                            id: 'restart_btn',
                            symbolName: 'restart_btn',
                            type: 'rect',
                            rect: ['494', '548', '183', '48', 'auto', 'auto'],
                            cursor: 'pointer',
                            userClass: "button-restart"
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '680', '600', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,0.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid251",
                            "display",
                            0,
                            0,
                            "linear",
                            "${feedback}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "bg": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'text',
                            rect: [389, 14, 290, '46px', 'auto', 'auto'],
                            text: 'גררו כל פועל מהמחסן ומקמו<br>אותו מתחת לזמן המתאים.',
                            id: 'Text',
                            textStyle: ['', '', '21px', ''],
                            align: 'right',
                            font: ['Alef', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', '', '']
                        },
                        {
                            type: 'text',
                            align: 'left',
                            textStyle: ['', '', '21px', ''],
                            rect: [-1, 14, 348, 52, 'auto', 'auto'],
                            text: 'Drag each verb from the bank and<br>place it under the correct tense.',
                            userClass: 'ltr',
                            font: ['Alef', [20, 'px'], 'rgba(0,0,0,1)', 'normal', 'none', '', '', ''],
                            id: 'TextCopy'
                        },
                        {
                            rect: [2, 66, '675px', '534px', 'auto', 'auto'],
                            id: 'drag_bg',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_bg.svg', '0px', '0px']
                        },
                        {
                            type: 'text',
                            id: 'Text2',
                            text: 'עבר',
                            rect: [496, 77, 'auto', 'auto', 'auto', 'auto'],
                            font: ['Alef', [24, ''], 'rgba(255,255,255,1.00)', '700', 'none', '', '', 'nowrap']
                        },
                        {
                            type: 'text',
                            id: 'Text2Copy',
                            text: 'הווה',
                            rect: [318, 77, 'auto', 'auto', 'auto', 'auto'],
                            font: ['Alef', [24, ''], 'rgba(255,255,255,1.00)', '700', 'none', '', '', 'nowrap']
                        },
                        {
                            type: 'text',
                            id: 'Text2Copy2',
                            text: 'עתיד',
                            rect: [137, 77, 'auto', 'auto', 'auto', 'auto'],
                            font: ['Alef', [24, ''], 'rgba(255,255,255,1.00)', '700', 'none', '', '', 'nowrap']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 680, 600]
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
            "restart_btn": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: [0, 0, '183px', '48px', 'auto', 'auto'],
                            id: 'drag_restartBG',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_restartBG.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            display: 'block',
                            rect: [14, 9, '156px', '29px', 'auto', 'auto'],
                            id: 'drag_restartTextNormal',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_restartTextNormal.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            display: 'none',
                            rect: [14, 9, '156px', '29px', 'auto', 'auto'],
                            id: 'drag_restartTextHover',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_restartTextHover.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 183, 48]
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "down": 2000
                    },
                    data: [
                        [
                            "eid18",
                            "top",
                            1000,
                            1000,
                            "linear",
                            "${drag_restartTextHover}",
                            '9px',
                            '12px'
                        ],
                        [
                            "eid9",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_restartTextHover}",
                            'none',
                            'none'
                        ],
                        [
                            "eid8",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_restartTextHover}",
                            'none',
                            'block'
                        ],
                        [
                            "eid11",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_restartTextNormal}",
                            'block',
                            'block'
                        ],
                        [
                            "eid10",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_restartTextNormal}",
                            'block',
                            'none'
                        ]
                    ]
                }
            },
            "check": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: [0, 0, '117px', '48px', 'auto', 'auto'],
                            id: 'drag_checkBG',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_checkBG.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            display: 'block',
                            rect: [27, 18, '63px', '17px', 'auto', 'auto'],
                            id: 'drag_checkTextNormal',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_checkTextNormal.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            display: 'none',
                            rect: [27, 18, '63px', '17px', 'auto', 'auto'],
                            id: 'drag_checkTextHover',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_checkTextHover.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 117, 48]
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: false,
                    data: [
                        [
                            "eid20",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_checkTextHover}",
                            'none',
                            'none'
                        ],
                        [
                            "eid22",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_checkTextHover}",
                            'none',
                            'block'
                        ],
                        [
                            "eid19",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_checkTextNormal}",
                            'block',
                            'block'
                        ],
                        [
                            "eid21",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_checkTextNormal}",
                            'block',
                            'none'
                        ],
                        [
                            "eid24",
                            "top",
                            1000,
                            0,
                            "linear",
                            "${drag_checkTextHover}",
                            '18px',
                            '18px'
                        ],
                        [
                            "eid23",
                            "top",
                            2000,
                            0,
                            "linear",
                            "${drag_checkTextHover}",
                            '18px',
                            '21px'
                        ]
                    ]
                }
            },
            "target": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: [0, 0, '125px', '45px', 'auto', 'auto'],
                            id: 'drag_target',
                            type: 'image',
                            display: 'block',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_target.svg', '0px', '0px']
                        },
                        {
                            rect: [117, -8, '15px', '15px', 'auto', 'auto'],
                            userClass: 'feedback-error',
                            id: 'error',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/UI/error.svg', '0px', '0px']
                        },
                        {
                            rect: ['117', '-8', '15px', '15px', 'auto', 'auto'],
                            userClass: 'feedback-correct',
                            id: 'correct',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/UI/correct.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '0px', '125px', '45px', 'auto', 'auto'],
                            borderRadius: ['10px', '10px', '10px', '10px'],
                            type: 'rect',
                            id: 'RoundRect',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            display: 'none',
                            fill: ['rgba(240,235,235,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 125, 45]
                        }
                    }
                },
                timeline: {
                    duration: 505,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 505
                    },
                    data: [
                        [
                            "eid253",
                            "display",
                            505,
                            0,
                            "linear",
                            "${drag_target}",
                            'block',
                            'none'
                        ],
                        [
                            "eid213",
                            "display",
                            0,
                            0,
                            "linear",
                            "${error}",
                            'none',
                            'none'
                        ],
                        [
                            "eid217",
                            "display",
                            0,
                            0,
                            "linear",
                            "${correct}",
                            'none',
                            'none'
                        ],
                        [
                            "eid254",
                            "display",
                            505,
                            0,
                            "linear",
                            "${RoundRect}",
                            'none',
                            'block'
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
                            type: 'image',
                            rect: [0, 0, '125px', '45px', 'auto', 'auto'],
                            display: 'block',
                            opacity: '1',
                            id: 'drag_optionNormal',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_optionNormal.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            rect: [0, 0, '125px', '45px', 'auto', 'auto'],
                            display: 'none',
                            opacity: '1',
                            id: 'drag_optionHover',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_optionHover.svg', '0px', '0px']
                        },
                        {
                            rect: [0, 14, 125, 32, 'auto', 'auto'],
                            userClass: 'text',
                            align: 'center',
                            id: 'Text3',
                            text: 'פּוֹגְשִים',
                            font: ['Alef', [24, ''], 'rgba(0,0,0,1.00)', '700', 'none', 'normal', '', ''],
                            type: 'text'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 125, 45]
                        }
                    }
                },
                timeline: {
                    duration: 3000,
                    autoPlay: false,
                    labels: {
                        "normal": 0,
                        "hover": 1000,
                        "drag": 2000,
                        "in_target": 3000
                    },
                    data: [
                        [
                            "eid26",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_optionNormal}",
                            'block',
                            'block'
                        ],
                        [
                            "eid29",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_optionNormal}",
                            'block',
                            'none'
                        ],
                        [
                            "eid36",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${drag_optionNormal}",
                            'none',
                            'block'
                        ],
                        [
                            "eid34",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${drag_optionNormal}",
                            'block',
                            'block'
                        ],
                        [
                            "eid27",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_optionHover}",
                            'none',
                            'none'
                        ],
                        [
                            "eid28",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_optionHover}",
                            'none',
                            'block'
                        ],
                        [
                            "eid35",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${drag_optionHover}",
                            'block',
                            'none'
                        ],
                        [
                            "eid33",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${drag_optionHover}",
                            'none',
                            'none'
                        ],
                        [
                            "eid38",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${drag_optionNormal}",
                            '1',
                            '1'
                        ],
                        [
                            "eid37",
                            "opacity",
                            2000,
                            0,
                            "linear",
                            "${drag_optionNormal}",
                            '1',
                            '0.8'
                        ],
                        [
                            "eid43",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${drag_optionNormal}",
                            '0.8',
                            '1'
                        ]
                    ]
                }
            },
            "left": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: [0, 0, '18px', '40px', 'auto', 'auto'],
                            type: 'image',
                            display: 'block',
                            id: 'drag_leftNormal',
                            cursor: 'pointer',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_leftNormal.svg', '0px', '0px']
                        },
                        {
                            rect: [0, 1, '18px', '39px', 'auto', 'auto'],
                            type: 'image',
                            display: 'none',
                            id: 'drag_leftDown',
                            cursor: 'auto',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_leftDown.svg', '0px', '0px']
                        },
                        {
                            rect: [0, 0, '18px', '40px', 'auto', 'auto'],
                            type: 'image',
                            id: 'drag_leftHover',
                            display: 'none',
                            cursor: 'pointer',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_leftHover.svg', '0px', '0px']
                        },
                        {
                            rect: ['0', '0', '18px', '40px', 'auto', 'auto'],
                            id: 'drag_leftDisable',
                            type: 'image',
                            display: 'none',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_leftDisable.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 18, 40]
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
                            "eid206",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_leftDisable}",
                            'none',
                            'none'
                        ],
                        [
                            "eid205",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_leftDisable}",
                            'none',
                            'none'
                        ],
                        [
                            "eid204",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${drag_leftDisable}",
                            'none',
                            'none'
                        ],
                        [
                            "eid207",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${drag_leftDisable}",
                            'none',
                            'block'
                        ],
                        [
                            "eid46",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_leftDown}",
                            'none',
                            'none'
                        ],
                        [
                            "eid49",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_leftDown}",
                            'none',
                            'none'
                        ],
                        [
                            "eid51",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${drag_leftDown}",
                            'none',
                            'block'
                        ],
                        [
                            "eid45",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_leftHover}",
                            'none',
                            'none'
                        ],
                        [
                            "eid48",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_leftHover}",
                            'none',
                            'block'
                        ],
                        [
                            "eid50",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${drag_leftHover}",
                            'block',
                            'none'
                        ],
                        [
                            "eid44",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_leftNormal}",
                            'block',
                            'block'
                        ],
                        [
                            "eid47",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_leftNormal}",
                            'block',
                            'none'
                        ]
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
                            rect: [0, 0, '18px', '40px', 'auto', 'auto'],
                            display: 'block',
                            id: 'drag_rightNormal',
                            cursor: 'pointer',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_rightNormal.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            rect: [0, 1, '18px', '39px', 'auto', 'auto'],
                            display: 'none',
                            id: 'drag_rightDown',
                            cursor: 'pointer',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_rightDown.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            rect: [0, 0, '18px', '40px', 'auto', 'auto'],
                            display: 'none',
                            id: 'drag_rightHover',
                            cursor: 'pointer',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_rightHover.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            display: 'none',
                            rect: ['0', '0', '18px', '40px', 'auto', 'auto'],
                            id: 'drag_rightdisable',
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_rightdisable.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 18, 40]
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
                            "eid208",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_rightdisable}",
                            'none',
                            'none'
                        ],
                        [
                            "eid212",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_rightdisable}",
                            'none',
                            'none'
                        ],
                        [
                            "eid211",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${drag_rightdisable}",
                            'none',
                            'none'
                        ],
                        [
                            "eid209",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${drag_rightdisable}",
                            'none',
                            'block'
                        ],
                        [
                            "eid60",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_rightDown}",
                            'none',
                            'none'
                        ],
                        [
                            "eid61",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_rightDown}",
                            'none',
                            'none'
                        ],
                        [
                            "eid66",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${drag_rightDown}",
                            'none',
                            'block'
                        ],
                        [
                            "eid210",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${drag_rightDown}",
                            'block',
                            'none'
                        ],
                        [
                            "eid59",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_rightHover}",
                            'none',
                            'none'
                        ],
                        [
                            "eid63",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_rightHover}",
                            'none',
                            'block'
                        ],
                        [
                            "eid65",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${drag_rightHover}",
                            'block',
                            'none'
                        ],
                        [
                            "eid58",
                            "display",
                            0,
                            0,
                            "linear",
                            "${drag_rightNormal}",
                            'block',
                            'block'
                        ],
                        [
                            "eid62",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${drag_rightNormal}",
                            'block',
                            'none'
                        ],
                        [
                            "eid64",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${drag_rightNormal}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "optionsWindow": {
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
                            userClass: 'option',
                            id: 'optionCopy23',
                            symbolName: 'option',
                            cursor: 'pointer',
                            rect: ['10', '0', '125', '45', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            userClass: 'option',
                            id: 'optionCopy15',
                            symbolName: 'option',
                            cursor: 'pointer',
                            rect: ['144', '0', '125', '45', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            userClass: 'option',
                            id: 'option',
                            symbolName: 'option',
                            cursor: 'pointer',
                            rect: ['278', '0', '125', '45', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            userClass: 'option',
                            id: 'optionCopy',
                            symbolName: 'option',
                            cursor: 'pointer',
                            rect: ['411', '0', '125', '45', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '544', '45']
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
            "wrong_fb": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [

                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 680, 534]
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
                            type: 'image',
                            id: 'drag_feedbak_bgCopy2',
                            opacity: '0.5',
                            rect: [0, 0, 680, '534px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/UI/drag_feedbak_bg.svg', '0px', '0px']
                        },
                        {
                            rect: ['87', 108, 506, 276, 'auto', 'auto'],
                            id: 'success',
                            symbolName: 'success',
                            userClass: 'feedback-success',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 680, 534]
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "bg_feedback": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: [15, 39, 675, 371, 'auto', 'auto'],
                            borderRadius: ['0px', '0px', '20px 20px', '20px 20px'],
                            opacity: '0.83',
                            id: 'Rectangle',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(245,231,217,1.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 700, 418]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid232",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${Rectangle}",
                            '0.83',
                            '0.83'
                        ]
                    ]
                }
            },
            "wrong_1": {
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
                            id: 'feedback_wrong2',
                            rect: [0, 0, '282px', '71px', 'auto', 'auto'],
                            cursor: 'pointer',
                            fill: ['rgba(0,0,0,0)', 'images/UI/feedback_wrong32.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 282, 71]
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: true,
                    data: [
                        [
                            "eid236",
                            "left",
                            0,
                            1000,
                            "easeOutBounce",
                            "${feedback_wrong2}",
                            '0px',
                            '-502px'
                        ]
                    ]
                }
            },
            "success": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: [0, 432, '506px', '276px', 'auto', 'auto'],
                            id: 'success',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/UI/feedback3.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 506, 276]
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: true,
                    data: [
                        [
                            "eid248",
                            "top",
                            0,
                            1000,
                            "easeInQuad",
                            "${success}",
                            '432px',
                            '0px'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("index_edgeActions.js");
})("EDGE-24236269");
