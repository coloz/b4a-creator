```json
[
    {
        "message0": "引脚 %1 连接的舵机 移动到 %2",
        "inputsInline": true,
        "colour": 230,
        "type": "servo_write",
        "args0": [
            {
                "type": "field_dropdown",
                "name": "PIN",
                "options": "${board.digitalPins}"
            },
            {
                "type": "input_value",
                "name": "NUM0"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "b4a": {
            "primary": "${PIN}",
            "library": "#include <Servo.h>",
            "object": "Servo ${OBJECT_NAME};",
            "setup": "${OBJECT_NAME}.attach(${PIN});",
            "code": "${OBJECT_NAME}.write(${NUM0});"
        },
        "toolbox": {
            "kind": "category",
            "name": "舵机",
            "colour": 60,
            "contents": [
                {
                    "kind": "block",
                    "type": "servo_write",
                    "inputs": {
                        "NUM0": {
                            "block": {
                                "type": "math_number"
                            }
                        }
                    }
                }
            ]
        }
    }
]
```