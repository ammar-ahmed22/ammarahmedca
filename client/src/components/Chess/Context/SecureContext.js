import React, { createContext, useState, useEffect } from "react"


const SecureContext = createContext();

const SecureProvider = ({ children }) => {

    const [state, setState] = useState({
        token: null,
        tokenAddedAt: null,
        setProperty: (prop, value) => setState( prev => {
            const updated = {...prev};
            updated[prop] = value;

            localStorage.setItem("ChessAuth", JSON.stringify(updated));

            return updated;
        })
    })

    // set persisted settings on load
    useEffect(() => {
        const ChessAuth = JSON.parse(localStorage.getItem("ChessAuth"));

        for (let prop in ChessAuth){
            const val = ChessAuth[prop];
            state.setProperty(prop, val);
        }

        if (!ChessAuth){
            localStorage.setItem("ChessAuth", JSON.stringify(state))
        }
    }, [])

    return (
        <SecureContext.Provider value={state}>
            {
                children
            }
        </SecureContext.Provider>
    )
}

export { SecureProvider };
export default SecureContext;