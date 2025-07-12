'use client'
import React from 'react'
import Link from "next/link";
import {XIcon} from "lucide-react";
const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;
    if(form) form.reset();
}

const SearchFormReset = () => {
    return (
        <button type="reset" onClick={reset}>
            <Link href="/" className=" search-btn" >
                <XIcon />
            </Link>
        </button>
    )
}
export default SearchFormReset