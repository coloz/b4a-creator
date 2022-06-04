import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import Blockly from 'blockly';
import { BlockJson } from '../interface';
import { blockList } from './blocks';
import { board } from './board';
import { ToolBox } from './toolbox';

@Component({
  selector: 'app-block-preview',
  templateUrl: './block-preview.component.html',
  styleUrls: ['./block-preview.component.scss']
})
export class BlockPreviewComponent implements OnInit {

  @Input() json: BlockJson;
  @Input() readOnly = true;
  @Input() toCenter = true;

  @Output() toolboxUpdate = new EventEmitter()

  @ViewChild('blockPreview', { read: ElementRef, static: true }) blockPreview: ElementRef


  workspace: Blockly.workspace;
  blockHeight = '60px'

  constructor(

  ) { }

  ngOnInit(): void {
    if (typeof this.json != 'undefined' && typeof this.json.args1 != 'undefined') {
      this.blockHeight = '108px'
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes['json'] != 'undefined') {
      setTimeout(() => {
        if (!this.workspace) {
          this.creatWorkspace()
        }
        if (typeof changes['readOnly'] != 'undefined' && this.workspace) {
          this.workspace.dispose()
          this.creatWorkspace()
        }
        if (typeof this.json != "undefined")
          if (typeof this.json.type != "undefined" && this.json.type != "")
            this.creatBlock(this.processJsonVariable(this.json))
          else {
            this.workspace.clear();
          }
      }, 100);
    }
  }


  creatWorkspace() {
    let blockPreview = this.blockPreview.nativeElement;

    Blockly.defineBlocksWithJsonArray(blockList);

    this.workspace = Blockly.inject(blockPreview, {
      readOnly: this.readOnly,
      media: 'media/',
      theme: 'zelos',
      renderer: 'zelos',
      toolbox: this.readOnly ? null : ToolBox,
    });
    this.workspace.addChangeListener(event => this.onWorkspaceChange(event))
  }

  noEmit = true;
  onWorkspaceChange(event) {
    if (event instanceof Blockly.Events.BlockCreate) {
      this.noEmit = true
      setTimeout(() => {
        this.noEmit = false
      }, 100);
    }
    if (event instanceof Blockly.Events.BlockMove && !this.noEmit) {
      let block = this.workspace.getTopBlocks()[0]
      let blockJson = Blockly.serialization.blocks.save(block, {
        addCoordinates: true,
        addInputBlocks: true,
        addNextBlocks: false,
        doFullSerialization: false
      })
      if (blockJson.inputs && blockJson.inputs != null) {
        for (const key in blockJson.inputs) {
          delete blockJson.inputs[key].block.id
        }
        this.toolboxUpdate.emit({ inputs: blockJson.inputs })
      } else {
        this.toolboxUpdate.emit({ inputs: null })
      }
    }
  }

  creatBlock(json) {
    try {
      this.workspace.clear();
      Blockly.defineBlocksWithJsonArray([json])
      let blockJson = json
      if (json.toolbox.inputs)
        blockJson = {
          type: json.type,
          inputs: json.toolbox.inputs
        }
      Blockly.serialization.blocks.append(blockJson, this.workspace)
      if (this.toCenter) this.centerBlock()
    } catch (error) {
      console.log(error.message);
    }

  }

  centerBlock() {
    // Get metrics.
    let block = this.workspace.getTopBlocks()[0];
    let blockMetrics = block.getHeightWidth();
    // this.blockHeight = blockMetrics['height']
    let blockCoordinates = block.getRelativeToSurfaceXY();
    let workspaceMetrics = this.workspace.getMetrics();
    // Calculate new coordinates.
    let x = workspaceMetrics.viewWidth / 2 - blockMetrics['width'] / 2 -
      blockCoordinates.x;
    let y = workspaceMetrics.viewHeight / 2 - blockMetrics['height'] / 2 -
      blockCoordinates.y;
    block.moveBy(x, y)
  };

  // 替换json配置中的board相关变量
  processJsonVariable(sourceJson) {
    let jsonString = JSON.stringify(sourceJson)
    let result = jsonString.match(/"\$\{board\.(\S*?)\}"/g)
    if (result != null) {
      // console.log(result);
      result.forEach(item => {
        let itemName = item.replace('"${', '').replace('}"', '')
        // console.log(itemName);
        let data = JSON.parse(JSON.stringify({ board: board }))
        // console.log(data);
        itemName.split('.').forEach(el => {
          data = data[el]
        })
        jsonString = jsonString.replace(item, JSON.stringify(data))
      });
    }
    return JSON.parse(jsonString)
  }

  getHeight() {
    let blockEl = this.blockPreview.nativeElement.querySelector(".blocklyBlockCanvas")
    console.log(blockEl);

  }

}
