# B4A-Creator  
blockly for arduino block creator.

blockly原本添加库的方式，真的太恶心了！而市面上的blockly软件居然都不去解决这个问题？！  
blockly添加一个库，需要创建3个文件：block、generator、toolbox。  
即使使用了Blockly Factory还是要再编写诸多配置，才能正确的创建出一个block，这无疑是痛苦的。有次看到有开发者为了写一个blinker支持库，编写了上万行的配置后，我萌生了写一个自动生成block的工具的想法。  
           
我在试图构建一套更简单的块创建方式，本生成器是一次尝试，不排除本方案变更甚至作废的可能。不是所有代码都可以成功转换，可能有考虑不周的地方，您可以在 [Arduino中文社区](https://www.arduino.cn/forum-158-1.html) 发帖向我提建议，或者直接通过Github Issues提出。  


