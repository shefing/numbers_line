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
                            id: 'dots',
                            type: 'image',
                            tag: 'img',
                            rect: ['101px', '12px', '521px', '37px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"dots.png",'0px','0px']
                        },
                        {
                            id: 'tetrisBgTile2',
                            type: 'image',
                            tag: 'img',
                            rect: ['19px', 'auto', '920px', '34.9%', 'auto', '47.7%'],
                            fill: ["rgba(0,0,0,0)",im+"tetrisBgTile.png",'0px','0px']
                        },
                        {
                            id: 'tetrisBgBottom',
                            type: 'image',
                            tag: 'img',
                            rect: ['19px', 'auto', '920px', '159px', 'auto', '212px'],
                            fill: ["rgba(0,0,0,0)",im+"tetrisBgBottom.png",'0px','0px']
                        },
                        {
                            id: 'tetrisBgTop',
                            type: 'image',
                            tag: 'img',
                            rect: ['19px', '75px', '920px', '109px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"tetrisBgTop.png",'0px','0px']
                        },
                        {
                            id: 'button-left',
                            symbolName: 'button-left',
                            type: 'rect',
                            rect: ['367px', 'auto', '73', '61', 'auto', '5px'],
                            cursor: 'pointer',
                            userClass: "edge-btn button-left"
                        },
                        {
                            id: 'button-down',
                            symbolName: 'button-down',
                            type: 'rect',
                            rect: ['440px', 'auto', '72', '61', 'auto', '5px'],
                            cursor: 'pointer',
                            userClass: "edge-btn button-down"
                        },
                        {
                            id: 'button-right',
                            symbolName: 'button-right',
                            type: 'rect',
                            rect: ['512px', 'auto', '74', '61', 'auto', '5px'],
                            cursor: 'pointer',
                            userClass: "edge-btn button-right"
                        },
                        {
                            id: 'button-mute',
                            symbolName: 'button-mute',
                            type: 'rect',
                            rect: ['87', 'auto', '91', '54', 'auto', '9px'],
                            userClass: "button-mute"
                        },
                        {
                            id: 'final-feedback',
                            symbolName: 'final-feedback',
                            type: 'rect',
                            rect: ['1px', '0px', 'undefined', 'undefined', 'auto', 'auto'],
                            userClass: "final-feedback"
                        },
                        {
                            id: 'btn-restart',
                            symbolName: 'btn-restart',
                            type: 'rect',
                            rect: ['19px', 'auto', '58', '69', 'auto', '0px'],
                            cursor: 'pointer',
                            userClass: "edgy-button button-restart"
                        },
                        {
                            id: 'lifecontainer',
                            symbolName: 'lifecontainer',
                            type: 'rect',
                            rect: ['auto', 'auto', '131', '22', '15px', '27px']
                        },
                        {
                            id: 'start-dialog',
                            symbolName: 'start-dialog',
                            type: 'rect',
                            rect: ['0', 'auto', '955', '100%', 'auto', '0px'],
                            userClass: "start-dialog"
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '955px', '100%', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(46,49,54,0.00)"]
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
            "final-feedback": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: true,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'final-feedback-failure',
                            symbolName: 'final-feedback-failure',
                            userClass: 'final-feedback-failure',
                            rect: ['5px', '1px', null, '100%', 'auto', 'auto']
                        },
                        {
                            type: 'rect',
                            id: 'final-feedback-success',
                            symbolName: 'final-feedback-success',
                            userClass: 'final-feedback-success',
                            rect: ['5px', '1px', null, '100%', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '955px', '100%']
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
            "popup": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: true,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '446px', '385px', 'auto', 'auto'],
                            borderRadius: ['6px', '6px', '6px', '6px 6px'],
                            fill: ['rgba(36,38,40,1.00)'],
                            id: 'shadow',
                            stroke: [1, 'rgba(0,0,0,1.00)', 'none'],
                            type: 'rect',
                            boxShadow: ['', 0, 5, 10, 0, 'rgba(0,0,0,0.74)']
                        },
                        {
                            rect: ['0px', '0px', '444px', '383px', 'auto', 'auto'],
                            borderRadius: ['6px', '6px', '6px', '6px 6px'],
                            fill: ['rgba(36,38,40,1.00)'],
                            id: 'bgPopup',
                            stroke: [1, 'rgba(0,0,0,1.00)', 'solid'],
                            type: 'rect',
                            boxShadow: ['inset', 0, 1, 0, 0, 'rgba(108,108,108,1.00)']
                        },
                        {
                            type: 'image',
                            id: 'feedbackGoodBg',
                            tag: 'img',
                            rect: ['9px', '12px', '424px', '282px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/feedbackGoodBg.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '446px', '385px']
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
            "final-feedback-failure": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: true,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0%', '945px', '100%', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/feedbackCover.png', '0px', '0px'],
                            sizeRange: ['0px', '', '', ''],
                            id: 'feedbackCover',
                            opacity: '0.8',
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            type: 'rect',
                            id: 'popup',
                            symbolName: 'popup',
                            opacity: '0',
                            rect: ['245px', '74px', '446', '385', 'auto', 'auto']
                        },
                        {
                            rect: ['366px', '108px', '201px', '222px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/feedbackFailImg.png', '0px', '0px'],
                            id: 'feedbackGoodImg',
                            opacity: '0',
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            rect: ['332px', '396px', '236px', '52px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/feedbackFailText.png', '0px', '0px'],
                            id: 'feedbackGoodText',
                            opacity: '0',
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            userClass: 'try-again',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/blank.png', '0px', '0px'],
                            display: 'none',
                            id: 'blank3',
                            rect: ['229px', '38px', '480px', '411px', 'auto', 'auto'],
                            cursor: 'pointer',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '945px', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 750,
                    autoPlay: false,
                    data: [
                        [
                            "eid212",
                            "opacity",
                            250,
                            500,
                            "easeOutBack",
                            "${feedbackGoodText}",
                            '0',
                            '1'
                        ],
                        [
                            "eid208",
                            "opacity",
                            191,
                            559,
                            "linear",
                            "${feedbackGoodImg}",
                            '0',
                            '1'
                        ],
                        [
                            "eid217",
                            "display",
                            0,
                            0,
                            "linear",
                            "${blank3}",
                            'none',
                            'none'
                        ],
                        [
                            "eid216",
                            "display",
                            560,
                            0,
                            "linear",
                            "${blank3}",
                            'none',
                            'block'
                        ],
                        [
                            "eid206",
                            "top",
                            116,
                            634,
                            "easeOutBack",
                            "${feedbackGoodImg}",
                            '266px',
                            '108px'
                        ],
                        [
                            "eid202",
                            "top",
                            0,
                            750,
                            "easeOutBack",
                            "${popup}",
                            '320px',
                            '74px'
                        ],
                        [
                            "eid204",
                            "opacity",
                            116,
                            634,
                            "linear",
                            "${popup}",
                            '0',
                            '1'
                        ],
                        [
                            "eid88",
                            "opacity",
                            0,
                            560,
                            "linear",
                            "${feedbackCover}",
                            '0',
                            '0.85365853658537'
                        ],
                        [
                            "eid210",
                            "top",
                            250,
                            500,
                            "easeOutQuad",
                            "${feedbackGoodText}",
                            '276px',
                            '396px'
                        ]
                    ]
                }
            },
            "final-feedback-success": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: true,
                content: {
                    dom: [
                        {
                            rect: ['0px', 'auto', '945px', '100%', 'auto', '2px'],
                            fill: ['rgba(0,0,0,0)', 'images/feedbackCover.png', '0px', '0px'],
                            id: 'feedbackCover',
                            opacity: '0',
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            type: 'rect',
                            id: 'popup',
                            symbolName: 'popup',
                            opacity: '0',
                            rect: ['245px', '73px', '446', '385', 'auto', 'auto']
                        },
                        {
                            rect: ['331px', '107px', '259px', '238px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/feedbackGoodImg.png', '0px', '0px'],
                            id: 'feedbackGoodImg',
                            opacity: '0',
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            rect: ['343px', '378px', '233px', '73px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/feedbackGoodText.png', '0px', '0px'],
                            id: 'feedbackGoodText',
                            opacity: '0',
                            type: 'image',
                            tag: 'img'
                        },
                        {
                            userClass: 'button-feedback-close',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/blank.png', '0px', '0px'],
                            display: 'block',
                            id: 'blank3',
                            rect: ['229px', '66px', '67px', '58px', 'auto', 'auto'],
                            cursor: 'pointer',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '945px', '100%']
                        }
                    }
                },
                timeline: {
                    duration: 750,
                    autoPlay: false,
                    data: [
                        [
                            "eid212",
                            "opacity",
                            250,
                            500,
                            "easeOutBack",
                            "${feedbackGoodText}",
                            '0',
                            '1'
                        ],
                        [
                            "eid208",
                            "opacity",
                            191,
                            559,
                            "linear",
                            "${feedbackGoodImg}",
                            '0',
                            '1'
                        ],
                        [
                            "eid219",
                            "display",
                            0,
                            0,
                            "linear",
                            "${blank3}",
                            'block',
                            'none'
                        ],
                        [
                            "eid218",
                            "display",
                            570,
                            0,
                            "linear",
                            "${blank3}",
                            'none',
                            'block'
                        ],
                        [
                            "eid206",
                            "top",
                            116,
                            634,
                            "easeOutBack",
                            "${feedbackGoodImg}",
                            '266px',
                            '107px'
                        ],
                        [
                            "eid202",
                            "top",
                            0,
                            750,
                            "easeOutBack",
                            "${popup}",
                            '320px',
                            '73px'
                        ],
                        [
                            "eid204",
                            "opacity",
                            116,
                            634,
                            "linear",
                            "${popup}",
                            '0',
                            '1'
                        ],
                        [
                            "eid91",
                            "opacity",
                            0,
                            500,
                            "linear",
                            "${feedbackCover}",
                            '0',
                            '0.800000011920929'
                        ],
                        [
                            "eid210",
                            "top",
                            250,
                            500,
                            "easeOutQuad",
                            "${feedbackGoodText}",
                            '276px',
                            '378px'
                        ]
                    ]
                }
            },
            "btn-restart": {
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
                            fill: ['rgba(0,0,0,0)', 'images/btnRestartPush.png', '0px', '0px'],
                            id: 'btnRestartPush',
                            rect: ['-1px', '-1px', '58px', '69px', 'auto', 'auto'],
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/btnRestartOver.png', '0px', '0px'],
                            id: 'btnRestartOver2',
                            rect: ['-1px', '-1px', '58px', '69px', 'auto', 'auto'],
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/btnRestart.png', '0px', '0px'],
                            rect: ['-1px', '-1px', '58px', '69px', 'auto', 'auto'],
                            id: 'btnRestart2',
                            opacity: '1',
                            display: 'block',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '58px', '69px']
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
                            "eid104",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnRestartOver2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid107",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnRestartOver2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid101",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnRestartOver2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid8",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${btnRestart2}",
                            '1',
                            '1'
                        ],
                        [
                            "eid10",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${btnRestart2}",
                            '1',
                            '0.26829268292683'
                        ],
                        [
                            "eid105",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnRestart2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid106",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnRestart2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid100",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnRestart2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid5",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnRestart2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid103",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnRestartPush}",
                            'none',
                            'none'
                        ],
                        [
                            "eid102",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnRestartPush}",
                            'none',
                            'block'
                        ],
                        [
                            "eid4",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnRestartPush}",
                            'block',
                            'none'
                        ]
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
                            rect: ['0px', '0px', '22px', '22px', 'auto', 'auto'],
                            tag: 'img',
                            id: 'lifeOff',
                            userClass: 'dead',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/lifeOff.png', '0px', '0px']
                        },
                        {
                            rect: ['0px', '0px', '22px', '22px', 'auto', 'auto'],
                            tag: 'img',
                            id: 'lifeOn',
                            userClass: 'alive',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/lifeOn.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '22px', '22px']
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
            "lifecontainer": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['54px', '0px', '22', '22', 'auto', 'auto'],
                            id: 'lifeCopy3',
                            symbolName: 'life',
                            type: 'rect',
                            userClass: 'life'
                        },
                        {
                            rect: ['81px', '0px', '22', '22', 'auto', 'auto'],
                            id: 'lifeCopy4',
                            symbolName: 'life',
                            type: 'rect',
                            userClass: 'life'
                        },
                        {
                            rect: ['109px', '0px', '22', '22', 'auto', 'auto'],
                            id: 'lifeCopy2',
                            symbolName: 'life',
                            type: 'rect',
                            userClass: 'life'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '131px', '22px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid9",
                            "left",
                            0,
                            0,
                            "linear",
                            "${lifeCopy2}",
                            '109px',
                            '109px'
                        ]
                    ]
                }
            },
            "button-left": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '73px', '61px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnConrolsLeftPush.png', '0px', '0px'],
                            display: 'none',
                            type: 'image',
                            id: 'btnConrolsLeftPush',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '73px', '61px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnConrolsLeftOver.png', '0px', '0px'],
                            display: 'none',
                            type: 'image',
                            id: 'btnConrolsLeftOver',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '73px', '61px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnConrolsLeft.png', '0px', '0px'],
                            type: 'image',
                            id: 'btnConrolsLeft',
                            opacity: '1',
                            display: 'block',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '73px', '61px']
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
                            "eid11",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnConrolsLeftPush}",
                            'none',
                            'none'
                        ],
                        [
                            "eid17",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnConrolsLeftPush}",
                            'none',
                            'block'
                        ],
                        [
                            "eid18",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnConrolsLeftPush}",
                            'block',
                            'none'
                        ],
                        [
                            "eid12",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnConrolsLeft}",
                            'block',
                            'block'
                        ],
                        [
                            "eid14",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnConrolsLeft}",
                            'block',
                            'none'
                        ],
                        [
                            "eid19",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnConrolsLeft}",
                            'none',
                            'block'
                        ],
                        [
                            "eid21",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${btnConrolsLeft}",
                            '1',
                            '1'
                        ],
                        [
                            "eid20",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${btnConrolsLeft}",
                            '1',
                            '0.42276422764228'
                        ],
                        [
                            "eid13",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnConrolsLeftOver}",
                            'none',
                            'none'
                        ],
                        [
                            "eid15",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnConrolsLeftOver}",
                            'none',
                            'block'
                        ],
                        [
                            "eid16",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnConrolsLeftOver}",
                            'block',
                            'none'
                        ]
                    ]
                }
            },
            "button-down": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '72px', '61px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnConrolsDownPush.png', '0px', '0px'],
                            type: 'image',
                            id: 'btnConrolsDownPush',
                            opacity: '1',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '72px', '61px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnConrolsDownOver.png', '0px', '0px'],
                            type: 'image',
                            id: 'btnConrolsDownOver',
                            opacity: '1',
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '72px', '61px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnConrolsDown.png', '0px', '0px'],
                            type: 'image',
                            id: 'btnConrolsDown',
                            opacity: '1',
                            display: 'block',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '72px', '61px']
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
                            "eid24",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnConrolsDownPush}",
                            'none',
                            'none'
                        ],
                        [
                            "eid31",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnConrolsDownPush}",
                            'none',
                            'block'
                        ],
                        [
                            "eid32",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnConrolsDownPush}",
                            'block',
                            'none'
                        ],
                        [
                            "eid23",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnConrolsDownOver}",
                            'none',
                            'none'
                        ],
                        [
                            "eid29",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnConrolsDownOver}",
                            'none',
                            'block'
                        ],
                        [
                            "eid30",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnConrolsDownOver}",
                            'block',
                            'none'
                        ],
                        [
                            "eid22",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnConrolsDown}",
                            'block',
                            'block'
                        ],
                        [
                            "eid28",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnConrolsDown}",
                            'block',
                            'none'
                        ],
                        [
                            "eid33",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnConrolsDown}",
                            'none',
                            'block'
                        ],
                        [
                            "eid25",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${btnConrolsDown}",
                            '1',
                            '1'
                        ],
                        [
                            "eid34",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${btnConrolsDown}",
                            '1',
                            '0.48780487804878'
                        ]
                    ]
                }
            },
            "button-right": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '74px', '61px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnConrolsRightPush.png', '0px', '0px'],
                            display: 'none',
                            type: 'image',
                            id: 'btnConrolsRightPush',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '74px', '61px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnConrolsRightOver.png', '0px', '0px'],
                            display: 'none',
                            type: 'image',
                            id: 'btnConrolsRightOver',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '74px', '61px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnConrolsRight.png', '0px', '0px'],
                            type: 'image',
                            id: 'btnConrolsRight',
                            opacity: '1',
                            display: 'block',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '74px', '61px']
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
                            "eid36",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnConrolsRight}",
                            'block',
                            'block'
                        ],
                        [
                            "eid39",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnConrolsRight}",
                            'block',
                            'none'
                        ],
                        [
                            "eid44",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnConrolsRight}",
                            'none',
                            'block'
                        ],
                        [
                            "eid38",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${btnConrolsRight}",
                            '1',
                            '1'
                        ],
                        [
                            "eid45",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${btnConrolsRight}",
                            '1',
                            '0.48780487804878'
                        ],
                        [
                            "eid35",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnConrolsRightPush}",
                            'none',
                            'none'
                        ],
                        [
                            "eid42",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnConrolsRightPush}",
                            'none',
                            'block'
                        ],
                        [
                            "eid43",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnConrolsRightPush}",
                            'block',
                            'none'
                        ],
                        [
                            "eid37",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnConrolsRightOver}",
                            'none',
                            'none'
                        ],
                        [
                            "eid40",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnConrolsRightOver}",
                            'none',
                            'block'
                        ],
                        [
                            "eid41",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnConrolsRightOver}",
                            'block',
                            'none'
                        ]
                    ]
                }
            },
            "mute-on": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '91px', '54px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnSoundOff.png', '0px', '0px'],
                            display: 'none',
                            type: 'image',
                            id: 'btnSoundOff',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '91px', '54px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnSoundOnOver.png', '0px', '0px'],
                            display: 'none',
                            type: 'image',
                            id: 'btnSoundOnOver',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '91px', '54px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnSoundOn.png', '0px', '0px'],
                            type: 'image',
                            id: 'btnSoundOn',
                            opacity: '1',
                            display: 'block',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '91px', '54px']
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
                            "eid47",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnSoundOn}",
                            'block',
                            'block'
                        ],
                        [
                            "eid48",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnSoundOn}",
                            'block',
                            'none'
                        ],
                        [
                            "eid54",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnSoundOn}",
                            'none',
                            'block'
                        ],
                        [
                            "eid56",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${btnSoundOn}",
                            '1',
                            '1'
                        ],
                        [
                            "eid55",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${btnSoundOn}",
                            '1',
                            '0.45528455284553'
                        ],
                        [
                            "eid51",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnSoundOff}",
                            'none',
                            'none'
                        ],
                        [
                            "eid50",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnSoundOff}",
                            'none',
                            'block'
                        ],
                        [
                            "eid53",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnSoundOff}",
                            'block',
                            'none'
                        ],
                        [
                            "eid46",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnSoundOnOver}",
                            'none',
                            'none'
                        ],
                        [
                            "eid49",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnSoundOnOver}",
                            'none',
                            'block'
                        ],
                        [
                            "eid52",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnSoundOnOver}",
                            'block',
                            'none'
                        ]
                    ]
                }
            },
            "mute-off": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '91px', '54px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnSoundOn.png', '0px', '0px'],
                            display: 'none',
                            type: 'image',
                            id: 'btnSoundOn2',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '91px', '54px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnSoundOffOver.png', '0px', '0px'],
                            display: 'none',
                            type: 'image',
                            id: 'btnSoundOffOver',
                            tag: 'img'
                        },
                        {
                            rect: ['0px', '0px', '91px', '54px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/btnSoundOff.png', '0px', '0px'],
                            type: 'image',
                            id: 'btnSoundOff2',
                            opacity: '1',
                            display: 'block',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '91px', '54px']
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
                            "eid68",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${btnSoundOff2}",
                            '1',
                            '1'
                        ],
                        [
                            "eid67",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${btnSoundOff2}",
                            '1',
                            '0.40650406504065'
                        ],
                        [
                            "eid60",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnSoundOff2}",
                            'block',
                            'block'
                        ],
                        [
                            "eid63",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnSoundOff2}",
                            'block',
                            'none'
                        ],
                        [
                            "eid57",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnSoundOff2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid61",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnSoundOffOver}",
                            'none',
                            'none'
                        ],
                        [
                            "eid64",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnSoundOffOver}",
                            'none',
                            'block'
                        ],
                        [
                            "eid65",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnSoundOffOver}",
                            'block',
                            'none'
                        ],
                        [
                            "eid58",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnSoundOffOver}",
                            'none',
                            'none'
                        ],
                        [
                            "eid62",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnSoundOn2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid66",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnSoundOn2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid59",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnSoundOn2}",
                            'block',
                            'none'
                        ]
                    ]
                }
            },
            "button-mute": {
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
                            type: 'rect',
                            id: 'mute-off',
                            display: 'none',
                            symbolName: 'mute-off',
                            cursor: 'pointer',
                            rect: ['0px', '0px', '91', '54', 'auto', 'auto']
                        },
                        {
                            userClass: 'mute-on edge-btn',
                            rect: ['0px', '0px', '91', '54', 'auto', 'auto'],
                            id: 'mute-on',
                            symbolName: 'mute-on',
                            cursor: 'pointer',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '91px', '54px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [
                        [
                            "eid69",
                            "display",
                            0,
                            0,
                            "linear",
                            "${mute-off}",
                            'none',
                            'none'
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
                            rect: ['0px', '24px', '240px', '119px', 'auto', 'auto'],
                            borderRadius: ['0px', '0px', '8px 8px', '8px 8px'],
                            id: 'Rectangle',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,1.00)']
                        },
                        {
                            type: 'image',
                            tag: 'img',
                            id: 'tetrisTitel',
                            rect: ['0px', '-4px', '240px', '41px', 'auto', 'auto'],
                            clip: 'rect(5px 240px 41px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/tetrisTitel.png', '0px', '0px']
                        },
                        {
                            type: 'text',
                            align: 'center',
                            text: 'עתיד<br>',
                            rect: ['21px', '7px', '195px', '30px', 'auto', 'auto'],
                            id: 'Text',
                            font: ['Alef', [20, 'px'], 'rgba(247,77,2,1)', '700', 'none solid rgb(247, 77, 2)', 'normal', 'break-word', 'normal'],
                            userClass: 'basket-title-text text',
                            textShadow: ['rgba(255,255,255,1.00)', 0, 1, 0],
                            textStyle: ['', '', '24px', '']
                        },
                        {
                            transform: [[], [], [], ['1', '1.07692']],
                            type: 'rect',
                            rect: ['-5px', '63px', '246px', '23px', 'auto', 'auto'],
                            id: 'Rectangle3',
                            stroke: [1, 'rgba(183,183,183,1.00)', 'dotted'],
                            clip: 'rect(0px 244px 26px 5px)',
                            fill: ['rgba(255,255,255,0.00)']
                        },
                        {
                            transform: [[], [], [], ['1', '1.07692']],
                            type: 'rect',
                            rect: ['-5px', '115px', '246px', '23px', 'auto', 'auto'],
                            id: 'Rectangle3Copy',
                            stroke: [1, 'rgba(183,183,183,1.00)', 'dotted'],
                            clip: 'rect(0px 244px 21px 5px)',
                            fill: ['rgba(255,255,255,0.00)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '240px', '144px']
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
                            fill: ['rgba(255,255,255,1.00)', [270, [['rgba(255,255,255,1.00)', 0], ['rgba(158,158,158,1.00)', 100]]]],
                            rect: ['0px', '0px', '148px', '33px', 'auto', 'auto'],
                            borderRadius: ['5px', '5px', '5px', '5px 5px'],
                            type: 'rect',
                            id: 'Rectangle4',
                            stroke: [1, 'rgb(183, 183, 183)', 'none'],
                            userClass: 'option-background',
                            boxShadow: ['', 0, 9, 14, -2, 'rgba(0,0,0,0.83)']
                        },
                        {
                            type: 'text',
                            align: 'center',
                            text: 'הִתְבַּלְבַּלְתֶם',
                            userClass: 'text',
                            font: ['Alef', [20, 'px'], 'rgba(34,34,34,1.00)', '700', 'none solid rgb(247, 77, 2)', 'normal', 'break-word', 'normal'],
                            textStyle: ['', '', '30px', ''],
                            rect: ['0px', '0px', '148px', '33px', 'auto', 'auto'],
                            textShadow: ['rgba(255,255,255,0.65)', 0, 1, 0],
                            id: 'Text2'
                        },
                        {
                            tag: 'img',
                            transform: [[], [], [], ['0.1', '0.1']],
                            userClass: 'feedback-error',
                            display: 'none',
                            id: 'feedback_X',
                            type: 'image',
                            rect: ['38px', '-76px', '200px', '170px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/feedback_X.svg', '0px', '0px']
                        },
                        {
                            tag: 'img',
                            transform: [[], [], [], ['0.1', '0.1']],
                            userClass: 'feedback-correct',
                            display: 'none',
                            id: 'feedback_V',
                            type: 'image',
                            rect: ['36px', '-75px', '200px', '170px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/feedback_V.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '148px', '33px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [
                        [
                            "eid72",
                            "display",
                            0,
                            0,
                            "linear",
                            "${feedback_V}",
                            'none',
                            'none'
                        ],
                        [
                            "eid71",
                            "display",
                            0,
                            0,
                            "linear",
                            "${feedback_X}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "start-dialog": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: true,
                content: {
                    dom: [
                        {
                            rect: ['414px', 'auto', '127', '155', 'auto', '45.6%'],
                            type: 'rect',
                            id: 'button-start',
                            symbolName: 'button-start',
                            cursor: 'pointer',
                            userClass: 'edge-btn button-start'
                        },
                        {
                            rect: ['auto', 'auto', '935px', '73px', '10px', '2px'],
                            fill: ['rgba(0,0,0,0)', 'images/disableBG.png', '0px', '0px'],
                            id: 'disableBG2',
                            opacity: '0.83739837398374',
                            type: 'image',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '955px', '100%']
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
            "button-start": {
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
                            fill: ['rgba(0,0,0,0)', 'images/btnOpeningPush.png', '0px', '0px'],
                            id: 'btnOpeningPush',
                            rect: ['0px', '0px', '127px', '155px', 'auto', 'auto'],
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/btnOpeningOver.png', '0px', '0px'],
                            id: 'btnOpeningOver',
                            rect: ['0px', '0px', '127px', '155px', 'auto', 'auto'],
                            display: 'none',
                            tag: 'img'
                        },
                        {
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/btnOpening.png', '0px', '0px'],
                            rect: ['0px', '0px', '127px', '155px', 'auto', 'auto'],
                            id: 'btnOpening',
                            opacity: '1',
                            display: 'block',
                            tag: 'img'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '127px', '155px']
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
                            "eid75",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnOpeningOver}",
                            'none',
                            'none'
                        ],
                        [
                            "eid79",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnOpeningOver}",
                            'none',
                            'block'
                        ],
                        [
                            "eid80",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnOpeningOver}",
                            'block',
                            'none'
                        ],
                        [
                            "eid74",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnOpeningPush}",
                            'none',
                            'none'
                        ],
                        [
                            "eid81",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${btnOpeningPush}",
                            'none',
                            'block'
                        ],
                        [
                            "eid82",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnOpeningPush}",
                            'block',
                            'none'
                        ],
                        [
                            "eid77",
                            "opacity",
                            0,
                            0,
                            "linear",
                            "${btnOpening}",
                            '1',
                            '1'
                        ],
                        [
                            "eid84",
                            "opacity",
                            3000,
                            0,
                            "linear",
                            "${btnOpening}",
                            '1',
                            '0.38'
                        ],
                        [
                            "eid76",
                            "display",
                            0,
                            0,
                            "linear",
                            "${btnOpening}",
                            'block',
                            'block'
                        ],
                        [
                            "eid78",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${btnOpening}",
                            'block',
                            'none'
                        ],
                        [
                            "eid83",
                            "display",
                            3000,
                            0,
                            "linear",
                            "${btnOpening}",
                            'none',
                            'block'
                        ]
                    ]
                }
            },
            "titelBasketBack": {
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
                            id: 'tetrisTitel',
                            rect: ['0px', '0px', '240px', '41px', 'auto', 'auto'],
                            clip: 'rect(0px 240px 6px 0px)',
                            fill: ['rgba(0,0,0,0)', 'images/tetrisTitel.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '240px', '41px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("index_edgeActions.js");
})("EDGE-97846340");
