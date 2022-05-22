import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CreatorService } from './creator.service';
import Sortable from 'sortablejs';
import { saveAs } from 'file-saver';
import { NzMessageService } from 'ng-zorro-antd/message';

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

  mode = 'new'  //新建：new   编辑：edit

  @ViewChild('blockPreviewList', { read: ElementRef, static: false }) blockPreviewList: ElementRef;

  sourceCode = {
    type: 'A',
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

  blockJson = {};
  blockJsonString = '';

  color = '#666'

  toolbox = {
    "show": true,
    "category": "unknown"
  }

  constructor(
    private creatorService: CreatorService,
    private message: NzMessageService,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
    let blockList = JSON.parse(localStorage.getItem('blockList'))
    if (blockList != null) this.blockList = blockList
    let color = localStorage.getItem('color')
    if (color != null) this.color = color
    let sourceCode = JSON.parse(localStorage.getItem('sourceCode'))
    if (sourceCode != null) this.sourceCode = sourceCode
    let blockJson = JSON.parse(localStorage.getItem('blockJson'))
    if (blockJson != null) this.blockJson = blockJson
  }

  ngAfterViewInit(): void {
    let sortable = new Sortable(this.blockPreviewList.nativeElement, {
      sort: true,  // sorting inside list
      delay: 0,
      animation: 150,
      onEnd: () => {
        // console.log(this.blockList);
        this.saveBlockList()
      }
    });
  }

  blockJsonEditor
  blockJsonEditorInit(editor) {
    this.blockJsonEditor = editor;
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 500);
  }

  blockJsonChange(str) {
    this.blockJsonEditor.getAction('editor.action.formatDocument').run();
    this.blockJson = JSON.parse(str)
    localStorage.setItem('sourceCode', JSON.stringify(this.sourceCode))
    localStorage.setItem('blockJson', str)
  }

  updateBlockJson() {
    this.blockJson = this.creatorService.code2blockJson(this.sourceCode.code)

    if (typeof this.blockJson['type'] == 'undefined') return

    this.blockJson['colour'] = this.color
    this.blockJson['toolbox'] = this.toolbox
    if (typeof this.blockJson['b4a'] == 'undefined')
      this.blockJson['b4a'] = {}
    if (this.sourceCode.macro != '')
      this.blockJson['b4a']['macro'] = this.sourceCode.macro
    if (this.sourceCode.library != '')
      this.blockJson['b4a']['library'] = this.sourceCode.library
    if (this.sourceCode.object != '')
      this.blockJson['b4a']['object'] = this.sourceCode.object
    if (this.sourceCode.function != '')
      this.blockJson['b4a']['function'] = this.sourceCode.function
    if (this.sourceCode.setup != '')
      this.blockJson['b4a']['setup'] = this.sourceCode.setup

    this.blockJsonString = JSON.stringify(this.blockJson)
    console.log(this.blockJsonString);

  }

  colorChange(e) {
    if (typeof this.blockJson['type'] == 'undefined') return
    this.blockJson['colour'] = e
    this.blockJsonString = JSON.stringify(this.blockJson)
    localStorage.setItem('color', e)
  }

  argTypeChange(item, i) {
    console.log(i, item);
    switch (item.type) {
      case 'field_number':
        if (typeof item['value'] == 'undefined')
          item = {
            type: 'field_number',
            name: item.name,
            value: 0
          }
        break;
      case 'field_input':
        if (typeof item['text'] == 'undefined')
          item = {
            type: 'field_input',
            name: item.name,
            text: 'text'
          }
        break;
      case 'field_variable':
        if (typeof item['variable'] == 'undefined')
          item = {
            type: 'field_variable',
            name: item.name,
            variable: 'value'
          }
        break;
      case 'field_dropdown':
        if (typeof item['options'] == 'undefined')
          item = {
            type: 'field_variable',
            name: item.name,
            options: '${board.digitalPins}'
          }
        break;
      case 'input_value':

        break;
      default:
        break;
    }
    this.blockJson['args0'][i] = item
    this.blockJsonString = JSON.stringify(this.blockJson)
  }

  toolboxChange() {
    console.log(this.toolbox);
    this.blockJson['toolbox'] = this.toolbox
    this.blockJsonString = JSON.stringify(this.blockJson)
  }

  selectedBlock;
  selectedBlockJson;
  selectBlock(block) {
    this.mode = 'edit';
    this.selectedBlock = block
    this.blockJsonString = JSON.stringify(this.selectedBlock)
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
      }
    }

  }

  newBlock() {
    this.mode = 'new'
    this.sourceCode = {
      type: 'A',
      macro: '',
      library: '',
      variable: '',
      object: '',
      function: '',
      setup: '',
      code: ''
    }
    this.blockJsonString = '';
    this.blockJson = {};
  }

  addBlock() {
    this.blockList.push(this.blockJson)
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

  clean() {
    this.modal.confirm({
      nzTitle: '清空',
      nzContent: '您确定要删除所有的块吗？',
      nzOnOk: () => {
        this.blockList = []
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
