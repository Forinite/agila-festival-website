import React from 'react'
import Form from "next/form";
import SearchFormReset from "@/app/components/ui/SearchFormReset";
import {SearchIcon} from "lucide-react";


const SearchForm = ({query}: { query?: string}) => {
    console.log(query)
    return (
        <Form action="/" scroll={false} className="w-full search-form flex justify-between items-center  rounded-full border">
            <input
                name="query"
                defaultValue={query}
                className="w-full h-full  py-3 px-4 rounded-full"
                placeholder="Search Moments"
            />

            <div className={'relative flex gap-2 w-fit h-fit'}>
                {query && (
                    <SearchFormReset />
                )}
                <button type="submit" className="search-btn" >
                    <SearchIcon />
                </button>
            </div>
        </Form>
    )
}
export default SearchForm