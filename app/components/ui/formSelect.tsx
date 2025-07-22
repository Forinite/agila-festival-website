"use client"

import React, {useEffect, useState} from 'react'
import {useSearchParams} from "next/navigation";

const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'volunteer', label: 'Volunteer Opportunity' },
    { value: 'partnership', label: 'Partnership/Sponsorship' },
    { value: 'planning', label: 'Planning Commitee' },
    { value: 'media', label: 'Media/Press Request' },
    { value: 'pageant', label: 'Face of Idoma Pageant' },
    { value: 'other', label: 'Other' }
];

const FormSelect = () => {
    const searchParans = useSearchParams()
    const optionFromQuery = searchParans.get('option')
    const [selectedOption, setSelectedOption] = useState('')

    useEffect(()=>{
        if(optionFromQuery){
            setSelectedOption(optionFromQuery)
        }
    }, [optionFromQuery])
    return (
        <select
            name="title"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="formSelect"
            value={selectedOption}
            onChange={(e)=>{setSelectedOption(e.target.value)}}
            required
        >
            <option value="">Select a subject</option>
            {subjectOptions.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
export default FormSelect
