
export interface InputGeneric {
    label: string,
    class: string,
    appearance: "outline" | "standard" | "legacy" | "fill" | null,
    type: string | 'ngselect' | 'ngselectMulti', //text, ngselectMulti, ngselect
    typeInput: "matInput" | "normal", //Tipo de Input Normal o Angular Material
    formControlName: string,
    data: any, //La data en caso de ser Select o radio
    required?: boolean, //si es requerido
    typeMethor?: "key" | "change" | "key-change", //tipo de Evento change o Key o ambos
    typeData?: "Complete" | "id", //Tipo a retornar cuando se haga un change si Id o el Obj completo
    maxLength?: number,
    readonly? : boolean, //poder escribir o no
    color?: string,
    rows?:number //para textarea
}

