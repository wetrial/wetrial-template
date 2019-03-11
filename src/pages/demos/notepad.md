#### 容器属性
flex-direction:[row|row-reverse|column|column-reverse] 主轴的方向，默认值row  
flex-wrap:  [wrap|nowrap|wrap-reverse] 换行,默认值nowrap  
flex-flow: [- -] flex-direction和flex-wrap的简写  
justify-content:[flex-start|flex-end|center|space-between|space-around]  项目在主轴的对齐方式 默认 flex-start  
align-items:[stretch|flex-start|flex-end|center|baseline] 项目在交叉轴上如何对齐，默认值 stretch
align-content:[flex-start|flex-end|center | space-between | space-around | stretch]定义了多根轴线的对齐方式，一根不起作用

###项目属性
order:[0-n] 数值类型 值越小越靠前 默认0  
flex-grow:  [0-n] 数值类型 项目的放大比例 默认为0
flex-shrink:[1-n|0]数值类型 项目的缩放比例 默认为1  
flex-basis:[auto|length] 分配多余空间之前，项目占据的主轴空间 默认为auto  
flex:是flex-grow, flex-shrink 和 flex-basis的缩写  
align-self:[auto|flex-start|flex-end|center|baseline|stretch;]设置单个项目的对齐方式 默认auto