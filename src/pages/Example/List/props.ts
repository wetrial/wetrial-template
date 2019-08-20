export interface IListProps {
  [key: string]: any;
}

export interface IListStates {}


export interface IViewProps{
  onClose:{
    (result:boolean):void;
  }
}