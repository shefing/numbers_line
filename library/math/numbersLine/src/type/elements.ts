 export interface IElement {
    id: number,
    type: TypesElement,
    value: number,
        hideNumber: boolean,
  }

  export enum TypesElement {
    text = 'text', 
    jump = 'jump',
  }

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
    raload = "raload",
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



