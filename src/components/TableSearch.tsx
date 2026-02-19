import Image from "next/image"

const TableSearch = () => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="search" width={14} height={14}/>
        <input id="serach-input" type="text" placeholder="Search in the table" className="bg-transparent w-[200px] p-2 outline-none"/>
    </div>
  )
}

export default TableSearch