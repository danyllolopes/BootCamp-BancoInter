import React from 'react';
import {AuthContext} from '../context/AuthContext'

const useAuth = () => {
    const context = React.useContext(AuthContext)

    if(!context){
        throw new Error('Nenhum contexto encontrato')
    }
    return context 
}

export default useAuth