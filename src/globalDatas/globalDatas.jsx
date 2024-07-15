"use client"
import React, { useEffect } from 'react'
import { createContext, useState } from "react";
import { ChakraUi } from "../chakraUi/ChakraUi";
import NavBar from "../container/navBar/NavBar";
export const GlobalContext = createContext({
    postFavourites: 0,
    getFavourites: () => { }
});

const GlobalDatas = ({ children }) => {
    const [favourites, setFavourites] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedFavourites = JSON.parse(localStorage.getItem('favourite_items'));
            if (storedFavourites) {
                setFavourites(storedFavourites.length);
                console.log("storedFavourites:", storedFavourites.length);
            }
        }
    }, [])

    return (
        <GlobalContext.Provider value={{
            postFavourites: favourites,
            getFavourites: setFavourites
        }}>
            <ChakraUi>
                <NavBar />
                {children}
            </ChakraUi>
        </GlobalContext.Provider>
    )
}

export default GlobalDatas