import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import Blockly from 'blockly';
import { blockList } from './blocks';
import { board } from './board';
import { ToolBox } from './toolbox';

@Component({
  selector: 'app-block-preview',
  templateUrl: './block-preview.component.html',
  styleUrls: ['./block-preview.component.scss']
})
export class BlockPreviewComponent implements OnInit {

  @Input() json;
  @Input() readOnly = true;

  @ViewChild('blockPreview', { read: ElementRef, static: true }) blockPreview: ElementRef


  workspace;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes['json'] != 'undefined') {
      if (!this.workspace) {
        this.creatWorkspace()
      }
      if (typeof this.json != "undefined")
        if (typeof this.json.type != "undefined" && this.json.type != "")
          this.creatBlock(this.processJsonVariable(this.json))
        else {
          this.workspace.clear();
        }
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

  onWorkspaceChange(event) {
    if (event instanceof Blockly.Events.BlockMove ||
      event instanceof Blockly.Events.BlockDelete ||
      event instanceof Blockly.Events.BlockChange
    ) {
      // let block = this.workspace.getTopBlocks()[0];
      // let code = block.getFieldValue('SSID')

      // let childBlocks = block.childBlocks_
      //   childBlocks.forEach(item => {
      //     // let 
      //   });
    }
  }

  creatBlock(json) {
    try {
      this.workspace.clear();
      Blockly.defineBlocksWithJsonArray([json])
      Blockly.serialization.blocks.append(json, this.workspace)
      this.centerBlock()
    } catch (error) {

    }

  }

  centerBlock() {
    // Get metrics.
    let block = this.workspace.getTopBlocks()[0];
    let blockMetrics = block.getHeightWidth();
    let blockCoordinates = block.getRelativeToSurfaceXY();
    let workspaceMetrics = this.workspace.getMetrics();
    // Calculate new coordinates.
    let x = workspaceMetrics.viewWidth / 2 - blockMetrics['width'] / 2 -
      blockCoordinates.x;
    let y = workspaceMetrics.viewHeight / 2 - blockMetrics['height'] / 2 -
      blockCoordinates.y;
    // Move block.
    block.moveBy(x, y);
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

}
