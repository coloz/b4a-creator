export interface BlockJson {

    "inputsInline": boolean,
    "message0": string,
    "type": string,
    "args0"?: Arg[],
    "args1"?: Arg[],
    "previousStatement"?: string,
    "nextStatement"?: string,
    "colour"?: string,
    "output"?: string,
    "b4a"?: {
        "code"?: string,
        "macro"?: string,
        "library"?: string,
        "object"?: string,
        "function"?: string,
        "setup"?: string
    },
    "toolbox"?: {
        "show": boolean,
        "category"?: string,
        "icon"?: string,
        "inputs"?: any,
        "colour"?:string
    }
}

export interface Arg {
    "type": string,
    "name": string,
    "variable"?: string,
    "variableTypes"?: string[],
    "defaultType"?: string,
    "text"?: string,
    "value"?: number,
    "options"?: any,
    "src"?: string
}
