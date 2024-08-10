import CreateItem from './components/CreateItem'
import SearchInput from './components/SearchInput'
import ItemProvider from './context/ItemProvider'

function App() {

  return (
    <ItemProvider>
      <div className='flex w-full h-screen mt-5  items-center flex-col gap-3 '>
        {/* Search Input */}
        <SearchInput />
        {/* Create input */}
        <CreateItem />
      </div>
    </ItemProvider>
  )
}

export default App
