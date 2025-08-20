
import React from 'react'
import {feedFilterBtnList} from "@/app/constants/feedInfo";
import Form from "next/form";

const CategoryBtn = () => {

    return (
        <Form action="/" scroll={false} className="flex flex-wrap justify-center gap-3 mb-8">
            <input
                name={'allmoments'}
                defaultValue={'allmoments'}
                key={'allmoments'}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-colors bg-red-500 text-white  hover:text-gray-100 cursor-pointer hover:bg-red-600 border`}
                type="submit"
            />
            {feedFilterBtnList.map((item) => (
                <input
                    name={item}
                    defaultValue={'#'+item}
                    key={item}
                    className={`px-4 py-2 rounded-full font-medium cursor-pointer text-sm transition-colors bg-red-500' text-white'  'bg-white text-gray-700 hover:bg-gray-100 border`}
                    type="submit"
                />


            ))}

        </Form>

    )
}
export default CategoryBtn