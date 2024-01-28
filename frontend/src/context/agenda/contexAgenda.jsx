import {createContext , useContext, useState} from "react"

export const AgendaContext = createContext()

export const useAgenda=()=>{
    const context= useContext(AgendaContext)
     if(!context){
         throw new Error ("El useAgenda debe de estar del provider")
     }
     return context;
 }
 export const AgendaContextProvider = ({ children }) => {

        
        return(
            <AgendaContext.Provider value={{}}>
                {children}
            </AgendaContext.Provider>
            )

}
