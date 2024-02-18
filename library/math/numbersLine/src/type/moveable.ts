export interface IElement {
    id: string
    type: TypesElement
    value: number
    hideNumber: boolean
    transform:string
    underRuler:boolean
  }

  export enum TypesElement {
    text = 'text',
    jump = 'jump',
  }
  export interface IAbleProps{
    ButtonViewable: boolean
    onDeleteClick: () => void
    copyViewAble: boolean
    onCopyClick: () => void
    copyApproval: boolean
    underRuler: boolean
  }

