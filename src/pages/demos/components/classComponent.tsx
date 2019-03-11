// import React, { PureComponent } from 'react';

// export enum Gender{
//     Man,
//     WoMan
// }

// export interface IHelloProps {
//     compiler: string;
//     framework: string;
//     first:boolean;
//     datas?:number[];
//     dataSource:number[];
//     tuple:[number,string,boolean,number[]];
// }

// export class Hello extends PureComponent<IHelloProps, {}>{
//     render() {
//         return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
//     }
// }


// interface ISquareProps{
//     color?:string;
//     area?:number;
// }

// function createSqure(prop:ISquareProps):{color:string,area:number}{
//     const newSqure={color:'red',area:23};
//     if(prop.color){
//         newSqure.color=prop.color;
//     }
//     return newSqure;
// }


// const add:(x:number,y:number)=>number=(x,y)=>{
//     return x+y;
// }
