export interface IState {
    id:number,
    state:string,
    q1:string,
    q2:string,
    q3: string,
    q4: string,
    year: string
}

export interface IStateQuestion {
    id: number
    section: number
    subSection: number
    serial: number
    sectionTitle: string
    question: string
    responseOptions: string
    responseInputType: string
    createdAt: string
    updatedAt: string
}