  export enum TypeCover {
    nothing = "nothing",
    partiallyCover = "partiallyCover",
    partiallyDiscover = "partiallyDiscover",
    allCover = "allCover",
    allDiscover = "allDiscover",
    randomly = "randomly", 
  } 

  export enum TypeActionIconsToolbar {
    jump = "jump",
    text = "text",
    writing = "writing",
    displayNumbersLine = "displayNumbersLine",
    naviAndKani = "naviAndKani",
    reload = "reload",
  }  

  export interface IActionIcon {
    type:string,
    url:string,
  } 

  export interface IDisplayRuller {
    type:string,
    visitAble: TypeCover, 
    choice: TypeCover
  } 
  export interface IWindowSize {
    height:number,
    width:number,
  } 


  



