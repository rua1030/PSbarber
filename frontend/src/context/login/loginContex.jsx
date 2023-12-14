import { createContext, useContext, useState } from "react";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from "react-router-dom";
import { getListarRoles, putActivarCliente,putDesactivarCliente } from "../../api/rutasApi"

export const LoginContext = createContext()

export const useLogin=()=>{
    const context= useContext(LoginContext)
     if(!context){
         throw new Error ("El useRol debe de estar del provider")
     }
     return context;
 }

 export const RolContextProvider = ({ children }) => {

    

    return( 
        <LoginContext.Provider value={{}}>
            {children}
        </LoginContext.Provider>
      )
 }