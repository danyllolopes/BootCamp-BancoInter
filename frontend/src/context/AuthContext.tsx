
import React from "react";
import { signIn, signUp, me, SignInData, SignUpData } from '../services/resources/user'

interface UserDto {
    id: string;
    firstName: string;
    lastName: string;
    accountNumber: number;
    accountDigit: number;
    wallet: number;
    email: string;
}
interface ContextData {
    user: UserDto;
    userSignIn: (userData: SignInData) => Promise<UserDto>;
    userSignUp: (userData: SignUpData) => Promise<UserDto>;
    getCurrentUser: () => Promise<UserDto>;

}

export const AuthContext = React.createContext<ContextData>({} as ContextData)

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = React.useState<UserDto>(() => {

        const user = localStorage.getItem('@Inter:User');
        if (user) {
            return JSON.parse(user)

        }
        return {} as UserDto
    })


    const userSignIn = async (userData: SignInData) => {
        const { data } = await signIn(userData);

        if (data?.status === 'error') {
            return data
        }

        if (data.accessToken) {
            localStorage.setItem('@Inter:Token', data.accessToken)
        }
        localStorage.setItem('@Inter:User', JSON.stringify(user))
        return await getCurrentUser()
    }







    const userSignUp = async (userData: SignUpData) => {
        const { data } = await signUp(userData);

        if(data.accessToken){
            localStorage.setItem('@Inter:Token', data.accessToken)
        }
        return await getCurrentUser()
    }
    const getCurrentUser = async () => {
        const { data } = await me()
        setUser(data)
        localStorage.setItem('@Inter:User', JSON.stringify(user));
         return data as UserDto;
    }

    return (
        <AuthContext.Provider value={{ user, userSignIn, userSignUp, getCurrentUser }}>
            {children}
        </AuthContext.Provider>
    )
}