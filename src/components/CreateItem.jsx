import React, { useState } from 'react'
import { useItems } from '../context/ItemProvider';




const CreateItem = () => {

    const [formData, setFormData] = useState({ itemName: '', category: '', code: '' });

    const [error, setError] = useState(null)
    const { addItems, items } = useItems();

    const handleChange = (e) => {
        const { value, name } = e.target;
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setError(null)
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value, code }))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (items.code === formData.code) {
            setError("Please re-enter the category or item so new Code can be generated")
            return
        }


        addItems(formData)
    }


    return (
        <div className='w-[650px] h-[200px] bg-yellow-400 p-4'>
            <form className="flex gap-3 flex-col w-full h-full justify-evenly items-center " onSubmit={handleSubmit}>
                <div className='flex gap-3'>
                    <div>
                        <label>Item</label>
                        <input name='itemName' onChange={handleChange} value={formData.itemName} type="text" placeholder='Item Name...' className='p-1 outline-none border border-yellow-600 ' />
                    </div>
                    <div >
                        <label>Category</label>
                        <select name="category" className='p-2 ' value={formData.category} onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option value="category-1">Category-1</option>
                            <option value="category-2">Category-2</option>
                            <option value="category-3">Category-3</option>
                            <option value="category-4">Category-4</option>
                        </select>
                    </div>
                    <div>
                        <label>Code No</label>
                        <input name='code' value={`${formData.code}`} type="text" readOnly className='w-[100px] p-1 outline-none bg-slate-300' disabled />
                    </div>
                </div>
                <button className='bg-purple-600 font-bold text-white px-4 py-2'>Save</button>
                {error && <span className='text-red-500 font-semibold text-lg'>{error}</span>}
            </form>
        </div>
    )
}

export default CreateItem