export let board = {
    "name": "Arduino UNO",
    "description": "Arduino UNO standard compatible board",
    "compilerTool": "arduino-cli",
    "core": "arduino:avr",
    "type": "arduino:avr:uno",
    "compilerParam": "compile -v -b arduino:avr:uno",
    "uploadParam": "upload -v -b arduino:avr:uno -p ${serial}",
    "analogPins": [
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
    ],
    "digitalPins": [
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
    ],
    "pwmPins": [
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
    ],
    "serialPort": [
        [
            "Serial",
            "Serial"
        ]
    ],
    "serialSpeed": [
        [
            "1200",
            "1200"
        ],
        [
            "9600",
            "9600"
        ],
        [
            "14400",
            "14400"
        ],
        [
            "19200",
            "19200"
        ],
        [
            "38400",
            "38400"
        ],
        [
            "57600",
            "57600"
        ],
        [
            "115200",
            "115200"
        ]
    ],
    "spi": [
        [
            "SPI",
            "SPI"
        ]
    ],
    "spiPins": {
        "SPI": [
            [
                "MOSI",
                11
            ],
            [
                "MISO",
                12
            ],
            [
                "SCK",
                13
            ]
        ]
    },
    "spiClockDivide": [
        [
            "2 (8MHz)",
            "SPI_CLOCK_DIV2"
        ],
        [
            "4 (4MHz)",
            "SPI_CLOCK_DIV4"
        ],
        [
            "8 (2MHz)",
            "SPI_CLOCK_DIV8"
        ],
        [
            "16 (1MHz)",
            "SPI_CLOCK_DIV16"
        ],
        [
            "32 (500KHz)",
            "SPI_CLOCK_DIV32"
        ],
        [
            "64 (250KHz)",
            "SPI_CLOCK_DIV64"
        ],
        [
            "128 (125KHz)",
            "SPI_CLOCK_DIV128"
        ]
    ],
    "i2c": [
        [
            "I2C",
            "Wire"
        ]
    ],
    "i2cPins": {
        "Wire": [
            [
                "SDA",
                "A4"
            ],
            [
                "SCL",
                "A5"
            ]
        ]
    },
    "i2cSpeed": [
        [
            "100kHz",
            "100000L"
        ],
        [
            "400kHz",
            "400000L"
        ]
    ],
    "builtinLed": [
        [
            "BUILTIN_LED",
            "13"
        ]
    ],
    "interrupt": [
        [
            "interrupt0",
            "2"
        ],
        [
            "interrupt1",
            "3"
        ]
    ]
}