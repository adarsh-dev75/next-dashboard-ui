import Image from 'next/image'

const UserCard = ({type}: {type: string}) => {
  return (
    <div className='p-4 odd:bg-lamaPurple even:bg-lamaYellow rounded-2xl flex-1 min-w-[130px]'>
        <div className='flex items-center justify-between'>
            <span className='text-[10px] bg-white rounded-full px-2 py-1 text-green-600'>2025/26</span>
            <Image src="/more.png" alt='more' width={20} height={20}/>
        </div>

        <h1 className='text-2xl font-semibold my-4'>1,234</h1>
        <h2 className='capitalize text-sm font-medium text-gray-500'>{type}</h2>
    </div>
  )
}

export default UserCard