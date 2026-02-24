"use client";

import Image from "next/image";
import { useState } from "react";

const FormModal = ({table, type, data, id}: {
    table: "teacher"|"student"|"parent"|"subject"|"class"|"lesson"|"exam"|"assignment"|"result"|"attendance"|"event"|"announcement";
    type: "create" | "update" | "delete";
    data?: any;
    id?: number;
}) => {

    const size = type === 'create' ? "w-8 h-8" : "w-7 h-7";
    const bgColor = type === 'create' ? "bg-lamaYellow" : type === 'update' ? "bg-lamaSky" : "bg-lamaPurple";

    const [open, setOpen] = useState(false);

    const Form = () => {
        if(type === 'delete' && id) {
            return (
                <form className="flex flex-col gap-4 my-4">
                    <span className="text-left font-medium">Are you sure want to delete this row from <b className="capitalize">{table}s</b> table?</span>
                    <button className="bg-red-700 text-white rounded-md py-2 px-4 border-none w-max self-end">Delete</button>
                </form>
            )
        }
    }
  return (
    <>
    <button className={`${size} ${bgColor} rounded-full grid place-items-center p-1`} onClick={() => setOpen(true)}>
        <Image src={`/${type}.png`} alt={type} width={16} height={16}/>
    </button>

    {open && (
        <div className="w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-60 z-50 grid place-items-center">
            <div className="bg-white p-4 rounded-md w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold capitalize">{type} {table}</h1>
                <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-gray-100 hover:text-black w-7 h-7 grid place-items-center">
                    <Image src="/close.png" alt="close" width={14} height={14}/>
                </button>
                </div>
                <Form/>
            </div>
        </div>
    )}
    </>
  )
}

export default FormModal