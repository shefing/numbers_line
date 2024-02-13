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
    onDeleteClick: () => void
    deleteHovered: boolean
    setDeleteHovered: (v: boolean) => void
    onCopyClick: () => void
    duplicateHovered: boolean
    setDuplicateHovered: (v: boolean) => void
    underRuler: boolean
  }
