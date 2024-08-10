import React, { useEffect, useState } from 'react'
import { useItems } from '../context/ItemProvider'


const mockData = [
    {
        "category": "category-1",
        "items": [
            {
                item: "item-1",
                code: "262861"
            },
            {
                item: "item-2",
                code: "262862"
            },
            {
                item: "item-3",
                code: "262864"
            },
        ]
    },
    {
        "category": "category-2",
        "items": [
            {
                item: "item-1",
                code: "262869"
            },
            {
                item: "item-2",
                code: "262870"
            },
            {
                item: "item-3",
                code: "262879"
            },
        ]
    },
    {
        "category": "category-3",
        "items": [
            {
                item: "item-8",
                code: "748321"
            },
            {
                item: "item-9",
                code: "911922"
            },
            {
                item: "item-11",
                code: "832111"
            },
            {}
        ]
    }

]

const SearchInput = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchItems, setSearchItems] = useState([])
    const [isFocus, setIsFocus] = useState(false);
    const { items, onAddRecent, recentSearch } = useItems();

    useEffect(() => {
        if (searchQuery.length > 0) {
            const filterItems = items.filter(item => {
                if (item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) || item.code.includes(searchQuery)) {
                    return true
                }
            })
            const groupedItems = [];
            filterItems.forEach(item => {
                const categoryGroup = groupedItems.find(group => group.category === item.category);
                if (categoryGroup) {
                    categoryGroup.items.push({ itemName: item.itemName, code: item.code })
                } else {
                    groupedItems.push({
                        category: item.category,
                        items: [{
                            itemName: item.itemName,
                            code: item.code
                        }]
                    })
                }
            })

            setSearchItems(groupedItems)
        } else {
            setSearchItems([])
        }
    }, [searchQuery])

    console.log({ isFocus })




    return (
        <div className='flex flex-col gap-2'>
            <input onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} className='w-[650px] p-2 text-lg font-semibold bg-gray-300 outline-none' type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Search Items....' />

            {searchItems.length > 0 && <div className='w-[650px] bg-slate-300 min-h-4 px-2 py-4'>
                <div>
                    {searchItems.map((data, index) => (
                        <div key={`${index}-${data.category}`}>
                            <h3>{data.category}</h3>
                            <ul className='ml-5'>
                                {data.items.map((item) => {
                                    return (
                                        <li key={item.code} onClick={() => onAddRecent(item.itemName)} className='flex w-full justify-between hover:bg-slate-400 cursor-pointer px-2 py-1'>
                                            <span>{item.itemName}</span>
                                            <span className='font-bold text-black'>#{item.code}</span>
                                        </li>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    ))}
                </div>

            </div>}

            {isFocus && recentSearch.length > 0 && searchItems.length <= 0 && <div className='w-[650px] bg-slate-300 min-h-4 px-2 py-4'>
                <div>
                    {recentSearch.map((search, index) => (
                        <li key={`${search}-${index}`} onClick={() => setIsFocus(false)} className='flex w-full justify-between hover:bg-slate-400 cursor-pointer px-2 py-1'>
                            <span>{search}</span>
                        </li>
                    ))}
                </div>

            </div>}


        </div>
    )
}

export default SearchInput