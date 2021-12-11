import React from 'react'
import './FilmeDestaque.css'

export default ({item}) => {
    return(
        <section className="featured">
             <div>{item.orinal_name}</div>
        </section>
    )
}