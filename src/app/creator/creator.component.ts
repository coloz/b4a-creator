import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreatorService } from './creator.service';
import Sortable from 'sortablejs';
import { saveAs } from 'file-saver';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BlockJson } from './interface';
import * as JSONEditor from 'jsoneditor';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.scss']
})
export class CreatorComponent implements OnInit {

  isFold = false
  fold() {
    this.isFold = !this.isFold
  }

  mode = 'new'  //新建:new 编辑:edit

  @ViewChild('blockPreviewList', { read: ElementRef, static: false }) blockPreviewList: ElementRef;
  @ViewChild('jsoneditor', { read: ElementRef, static: true }) jsoneditorEl: ElementRef;

  jsonEditor;

  sourceCode = {
    macro: '',
    library: '',
    variable: '',
    object: '',
    function: '',
    setup: '',
    code: ''
  }

  jsonList = []

  blockList = []

  code = ''

  blockJson: BlockJson = {
    "inputsInline": true,
    "message0": '',
    "type": '',
    "colour": '#48c2c4',
    "args0": [],
    "toolbox": {
      "show": true,
      "category": "unknown"
    }
  };

  blockJson_preview = JSON.parse(JSON.stringify(this.blockJson));

  constructor(
    private creatorService: CreatorService,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    let blockList = JSON.parse(localStorage.getItem('blockList'))
    if (blockList != null) this.blockList = blockList
    // let sourceCode = JSON.parse(localStorage.getItem('sourceCode'))
    // if (sourceCode != null) this.sourceCode = sourceCode
    let blockJson = JSON.parse(localStorage.getItem('blockJson'))
    if (blockJson != null) this.blockJson = blockJson
  }

  ngAfterViewInit(): void {
    let sortable = new Sortable(this.blockPreviewList.nativeElement, {
      sort: true,
      delay: 0,
      animation: 150,
      dataIdAttr: "id",
      onEnd: () => {
        let tempBlockList = []
        sortable.toArray().forEach(index => {
          tempBlockList.push(this.blockList[index])
        });
        this.blockList = tempBlockList
        localStorage.setItem('blockList', JSON.stringify(this.blockList))
      }
    });
    this.initJsonEditor()
  }

  initJsonEditor() {
    this.jsonEditor = new JSONEditor(this.jsoneditorEl.nativeElement, {
      mode: 'code',
      mainMenuBar: false,
      navigationBar: false,
      statusBar: false,
      onChange: () => {
        this.blockJson = this.jsonEditor.get()
        this.blockJson_preview = JSON.parse(JSON.stringify(this.blockJson))
        localStorage.setItem('blockJson', JSON.stringify(this.blockJson))
      }
    })
    this.blockJsonChange()
  }


  blockJsonEditor
  blockJsonEditorInit(editor) {
    this.blockJsonEditor = editor;
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 500);
  }

  updateBlockJson() {
    this.blockJson = this.creatorService.code2blockJson(this.sourceCode.code, this.blockJson)

    this.blockJson['b4a']['macro'] = this.sourceCode.macro
    this.blockJson['b4a']['library'] = this.sourceCode.library

    let objectName = this.creatorService.getObjectName(this.sourceCode.object)
    let className = this.creatorService.getClassName(this.sourceCode.object)
    if (objectName != null) {
      if (this.sourceCode.code.split('.')[0].includes(objectName))
        this.blockJson['args0'].unshift({
          "type": "field_variable",
          "name": "OBJECT",
          "variable": objectName,
          "variableTypes": [
            className
          ],
          "defaultType": className
        })
      this.blockJson['message0'] += ` %${this.blockJson['args0'].length}`
    }


    this.blockJson['b4a']['object'] = this.sourceCode.object.replace(objectName, '${OBJECT}')
    this.blockJson['b4a']['code'] = this.blockJson['b4a']['code'].replace(objectName, '${OBJECT}')

    this.blockJson['b4a']['function'] = this.sourceCode.function
    this.blockJson['b4a']['setup'] = this.sourceCode.setup

    if (this.blockJson['b4a']['macro'] == "") delete this.blockJson['b4a']['macro']
    if (this.blockJson['b4a']['library'] == "") delete this.blockJson['b4a']['library']
    if (this.blockJson['b4a']['function'] == "") delete this.blockJson['b4a']['function']
    if (this.blockJson['b4a']['object'] == "") delete this.blockJson['b4a']['object']
    if (this.blockJson['b4a']['setup'] == "") delete this.blockJson['b4a']['setup']

    this.blockJsonChange()
  }

  errorTip = [];
  blockJsonChange() {
    this.checkJson()
    this.jsonEditor.set(this.blockJson)
    this.blockJson_preview = JSON.parse(JSON.stringify(this.blockJson))
    localStorage.setItem('blockJson', JSON.stringify(this.blockJson))
  }

  checkJson() {
    this.errorTip = [];
    if (this.blockJson.type == '') {
      this.errorTip.push(`not found "type" or "type" is empty`);
    }
    if (this.blockJson.args0.length > 0) {
      for (let index = 1; index <= this.blockJson.args0.length; index++) {
        let argStr = '%' + index
        console.log(argStr);
        if (!this.blockJson.message0.includes(argStr)) {
          this.errorTip.push(`not found "${argStr}" in message0`);
        }
      }
    }
  }

  argTypeChange(item, index) {
    switch (item.type) {
      case 'field_number':
        item = {
          type: 'field_number',
          name: item.name,
          value: 0
        }
        break;
      case 'field_input':
        item = {
          type: 'field_input',
          name: item.name,
          text: 'text'
        }
        break;
      case 'field_variable':
        item = {
          type: 'field_variable',
          name: item.name,
          variable: 'value'
        }
        break;
      case 'field_dropdown':
        item = {
          type: 'field_dropdown',
          name: item.name,
          options: '${board.digitalPins}'
        }
        break;
      case 'input_value':
        item = {
          type: 'input_value',
          name: item.name
        }
        break;
      case 'field_image':
        item = {
          "type": "field_image",
          "src": "",
          "width": 20,
          "height": 20,
          "alt": "*"
        }
        break;
      default:
        break;
    }
    this.blockJson['args0'][index] = item
    this.blockJsonChange()
  }

  selectedBlock;
  selectedBlockJson;
  selectBlock(block) {
    this.mode = 'edit';
    this.selectedBlock = block
    this.blockJson = block
    this.blockJsonChange()

  }

  openFile() {
    let inputObj = document.createElement('input')
    inputObj.setAttribute('id', 'openfile')
    inputObj.setAttribute('type', 'file')
    inputObj.setAttribute('style', 'visibility:hidden')
    document.body.appendChild(inputObj)
    inputObj.click()
    inputObj.onchange = () => {
      let reader = new FileReader();
      let fileContent = inputObj.files[0]
      reader.readAsText(fileContent, 'utf-8')
      reader.onload = (e) => {
        console.log(reader.result);
        try {
          let str = String(reader.result)
          this.blockList = JSON.parse(str)
        } catch (error) {
          this.message.error('加载失败，库文件可能损坏')
        }
      }
    }

  }

  newBlock() {
    this.mode = 'new'
    this.sourceCode = {
      macro: '',
      library: '',
      variable: '',
      object: '',
      function: '',
      setup: '',
      code: ''
    }

    this.blockJson = {
      "inputsInline": true,
      "message0": '',
      "type": '',
      "colour": '#48c2c4',
      "args0": [],
      "toolbox": {
        "show": true,
        "category": "unknown"
      }
    }
    this.selectedBlock = null
  }

  saveBlock() {
    if (this.blockJson.type == '') return
    if (this.mode == 'new')
      this.blockList.push(JSON.parse(JSON.stringify(this.blockJson)))
    else if (this.mode == 'edit') {
      this.blockList[this.blockList.indexOf(this.selectedBlock)] = JSON.parse(JSON.stringify(this.blockJson))
    }
    this.saveBlockList()
  }

  saveBlockList() {
    localStorage.setItem('blockList', JSON.stringify(this.blockList))
  }

  delBlock(block) {
    let index = this.blockList.indexOf(block);
    if (index > -1) {
      this.blockList.splice(index, 1);
    }
    this.saveBlockList()
  }

  download() {
    if (this.blockList.length == 0) this.message.error('您还未创建任何的块');
    try {
      let file = new File([JSON.stringify(this.blockList)], `${this.blockList[0].toolbox.category}.json`, { type: "text/plain;charset=utf-8" });
      saveAs(file);
    } catch (error) {
      this.message.error('导出失败')
    }
  }

  cleanAll() {
    this.modal.confirm({
      nzTitle: '清空',
      nzContent: '您确定要删除所有的块吗？',
      nzOnOk: () => {
        this.blockList = []
        this.newBlock();
        this.saveBlockList()
      }
    })
  }

  gotoGithub() {
    window.open("https://github.com/coloz/b4a-creator", "_blank")
  }

  gotoWebsite() {
    window.open("https://b4a.clz.me", "_blank")
  }
}
