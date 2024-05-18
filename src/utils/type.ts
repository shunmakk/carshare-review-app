export interface CarData {
    id: number,
    name: string,
    img: string,
    url: string,
  }


export interface InitialUserState {
  user: null | {
    uid: string,
    email: string,
    displayName: string
  }
}