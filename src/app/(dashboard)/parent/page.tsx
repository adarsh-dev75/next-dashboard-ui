import Announcements from "@/components/Announcements"
import BigCalendar from "@/components/BigCalendar"

const ParentPage = () => {
  return (
    <div className='flex-1 p-4 flex flex-col xl:flex-row gap-4'>
      <div className="w-full xl:w-2/3">
        <div className="bg-white h-full p-4 rounded-md">
          <h1 className="text-lg font-semibold">Schedule (John Doe)</h1>
          <BigCalendar/>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements/>
      </div>
    </div>
  )
}

export default ParentPage