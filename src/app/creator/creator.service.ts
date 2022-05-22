import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CreatorService {

    output = new Subject<string>()

    constructor() {

    }

    changeColor(blockJson){
        // blockJson['colour']
    }

    getParams(code) {
        let params = code.match(/\(.+\)/)
        let args = []
        if (params != null) {
            let paramList = params[0].replace('(', '').replace(')', '').replace('/\/.+\//', '').split(',')
            paramList.forEach((param: string, index) => {
                let paramName = "VAR" + index
                if (param.match(/".+"/) != null) { // 字符串
                    paramName = "TEXT" + index
                } else if (param.match(/^[0-9]+.?[0-9]*/) != null) {  // 纯数字
                    paramName = "NUM" + index
                } else if (param.match(/[A-Za-z0-9]*/) != null) { // 其他参数
                    paramName = param.toLocaleUpperCase()
                }
                let item = {
                    "type": "input_value",
                    "name": paramName.replace(/\s/g,'')
                }
                args.push(item)
                // blockJson['message0'] += ` %${index + 1}`
            })
        }
        return args
    }

    code2blockJson(code: string) {
        let blockJson = {
            "inputsInline": true
        }
        // get funcName \ type
        let p1 = code.indexOf('=');
        let p2 = code.indexOf('(');
        let funcName = code.substring(p1 + 1, p2).replace(/\s/g, '')
        let type = funcName.replace('.', '_').toLocaleLowerCase()
        blockJson['message0'] = funcName
        blockJson['type'] = type
        let args = this.getParams(code)
        blockJson['args0'] = args
        // blockJson['message0'] =
        args.forEach((arg, index) => {
            blockJson['message0'] += ` %${index + 1}`
        })
        // 获取返回值
        if (code.includes('=')) {
            blockJson['output'] = 'Any'
        } else {
            blockJson["previousStatement"] = null
            blockJson["nextStatement"] = null
        }
        return blockJson
    }

}
