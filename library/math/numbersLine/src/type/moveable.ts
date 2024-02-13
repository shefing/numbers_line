export interface IElement {
    id: string,
    type: TypesElement,
    value: number,
    hideNumber: boolean,
  }

  export enum TypesElement {
    text = 'text', 
    jump = 'jump',
  }
  export interface IAbleProps{
    ButtonViewable: boolean
    onDeleteClick: () => {}
    onCopyClick: () => {}
    underRuler: boolean
  }
