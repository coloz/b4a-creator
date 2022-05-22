
export let blockList = [
    {
        "type": "io_pin_digi",
        "message0": "数字引脚 %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    [
                        "0",
                        "0"
                    ],
                    [
                        "1",
                        "1"
                    ],
                    [
                        "2",
                        "2"
                    ],
                    [
                        "3",
                        "3"
                    ],
                    [
                        "4",
                        "4"
                    ],
                    [
                        "5",
                        "5"
                    ],
                    [
                        "6",
                        "6"
                    ],
                    [
                        "7",
                        "7"
                    ],
                    [
                        "8",
                        "8"
                    ],
                    [
                        "9",
                        "9"
                    ],
                    [
                        "10",
                        "10"
                    ],
                    [
                        "11",
                        "11"
                    ],
                    [
                        "12",
                        "12"
                    ],
                    [
                        "13",
                        "13"
                    ],
                    [
                        "A0",
                        "A0"
                    ],
                    [
                        "A1",
                        "A1"
                    ],
                    [
                        "A2",
                        "A2"
                    ],
                    [
                        "A3",
                        "A3"
                    ],
                    [
                        "A4",
                        "A4"
                    ],
                    [
                        "A5",
                        "A5"
                    ]
                ]
            }
        ],
        "output": "String",
        "colour": 230,
        "tooltip": "mode",
        "helpUrl": ""
    },
    {
        "type": "io_pin_adc",
        "message0": "模拟引脚 %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    [
                        "A0",
                        "A0"
                    ],
                    [
                        "A1",
                        "A1"
                    ],
                    [
                        "A2",
                        "A2"
                    ],
                    [
                        "A3",
                        "A3"
                    ],
                    [
                        "A4",
                        "A4"
                    ],
                    [
                        "A5",
                        "A5"
                    ]
                ]
            }
        ],
        "output": "String",
        "colour": 230,
        "tooltip": "mode",
        "helpUrl": ""
    },
    {
        "type": "io_pin_pwm",
        "message0": "PWM引脚 %1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": [
                    [
                        "3",
                        "3"
                    ],
                    [
                        "5",
                        "5"
                    ],
                    [
                        "6",
                        "6"
                    ],
                    [
                        "9",
                        "9"
                    ],
                    [
                        "10",
                        "10"
                    ],
                    [
                        "11",
                        "11"
                    ]
                ]
            }
        ],
        "output": "String",
        "colour": 230,
        "tooltip": "mode",
        "helpUrl": ""
    },
    {
        "type": "io_mode",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "MODE",
                "options": [
                    [
                        "INPUT",
                        "INPUT"
                    ],
                    [
                        "OUTPUT",
                        "OUTPUT"
                    ],
                    [
                        "INPUT_PULLUP",
                        "INPUT_PULLUP"
                    ]
                ]
            }
        ],
        "output": "Any",
        "colour": 230,
        "tooltip": "mode",
        "helpUrl": ""
    },
    {
        "type": "io_state",
        "message0": "%1",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "STATE",
                "options": [
                    [
                        "LOW",
                        "LOW"
                    ],
                    [
                        "HIGH",
                        "HIGH"
                    ]
                ]
            }
        ],
        "output": "Any",
        "colour": 230,
        "tooltip": "state",
        "helpUrl": ""
    }
]