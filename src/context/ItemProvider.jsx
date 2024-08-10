import { createContext, useContext, useState } from "react";

const ItemContext = createContext(null);

const staticData = [
    {
        "itemName": "items-1",
        "category": "category-1",
        "code": "151038"
    },
    {
        "itemName": "items-2",
        "category": "category-2",
        "code": "781869"
    },
    {
        "itemName": "items-1",
        "category": "category-1",
        "code": "702656"
    },
    {
        "itemName": "items-2",
        "category": "category-1",
        "code": "665445"
    }
]



const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [recentSearch, setRecentSearch] = useState([])
    const addItems = (item) => {
        setItems((prevItems) => ([...prevItems, item]))
    }
    const onAddRecent = (itemName) => {
        if (!itemName) {
            return;
        }
        setRecentSearch(prevRecentSearch => {
            if (prevRecentSearch.includes(itemName)) {
                return prevRecentSearch;
            }
            const updatedSearch = [...prevRecentSearch, itemName];
            if (updatedSearch.length > 5) {
                const newArr = updatedSearch.slice(1, -1);
                newArr.push(itemName)
                return newArr
            };
            return updatedSearch;
        })

    }

    // console.log({ recentSearch })

    return <ItemContext.Provider value={{ addItems, items, onAddRecent, recentSearch }}>{children}</ItemContext.Provider>
}

export const useItems = () => {
    const context = useContext(ItemContext);

    if (context === undefined) {
        console.log("Please use item before provider to the parent")
        return;

    }

    return context
}


export default ItemProvider