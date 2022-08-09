import React from 'react'
import { useState } from 'react'
import { useSlugs } from '../hooks/fetchSlugs'
import Link from 'next/link'

export function SearchBar() {
  const {data, isLoading, isFetching} = useSlugs()
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const onChangeHandler = (text) => {
    let matches = []
    if (text.length > 2) {
      matches = data.filter(slug=>{
        const regex = new RegExp(`${text}`, "giy");
        return slug.slug.match(regex)
      })
    }
    setSuggestions(matches)
    setText(text)
  }

  return (
    <div className='flex flex-col'>
        <input className='w-24 mt-5' type='text' placeholder='Search here'
        onChange={e => onChangeHandler(e.target.value)} value={text}
        onBlur={()=>{
          setTimeout(() => {
              setSuggestions([])
          }, 100);}}
        />
        {suggestions && suggestions.map((suggestion, i) => 
        <div key={i}>
        <Link href={'http://localhost:3000/product/'+suggestion.slug}>
        {suggestion.title}
        </Link>
        </div>

        )}

    </div>
  )
}
