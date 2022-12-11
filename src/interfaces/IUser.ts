export interface IUser {
    id: number
    username: string
    email: string
    password: string
    roles: string[]
    verified: boolean
    firstName?: string
    lastName?: string
    image?: string
}