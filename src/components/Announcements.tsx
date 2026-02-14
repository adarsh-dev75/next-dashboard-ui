import Image from "next/image"



const Announcements = () => {
  return (
    <div className='bg-white rounded-md p-4'>
        <div className="flex justify-between items-center">
            <h1 className="font-semibold text-xl">Announcements</h1>
            <span className="text-xs text-gray-400">View All</span>
        </div>

        <div className="flex flex-col gap-4 mt-4">
            <div className="bg-lamaSkyLight p-4 rounded-md">
                <div className="flex justify-between items-center">
                    <h2 className="font-medium">Announcement 1</h2>
                    <span className="text-xs text-gray-400 rounded-md bg-white px-1 py-1">12-02-2026</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                    Annuncement description 1 should be visible. 
                </p>
            </div>

            <div className="bg-lamaPurpleLight p-4 rounded-md">
                <div className="flex justify-between items-center">
                    <h2 className="font-medium">Announcement 2</h2>
                    <span className="text-xs text-gray-400 rounded-md bg-white px-1 py-1">12-02-2026</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Annuncement description 2 should be visible. </p>
            </div>

            <div className="bg-lamaYellowLight p-4 rounded-md">
                <div className="flex justify-between items-center">
                    <h2 className="font-medium">Announcement 3</h2>
                    <span className="text-xs text-gray-400 rounded-md bg-white px-1 py-1">12-02-2026</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Annuncement description 3 should be visible. </p>
            </div>
        </div>
    </div>
  )
}

export default Announcements