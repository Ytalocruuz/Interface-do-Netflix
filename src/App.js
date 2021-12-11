import React, { useEffect, useState } from "react";
import './App.css';
import API from "./Api.js";
import MovieRow from "./components/MovieRow.js";
import FilmeDestaque from "./components/FilmeDestaque";
import Api from "./Api.js";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [dadosDestaque, setDadosDestaque] = useState([]);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista TOTAL 
      let list = await API.getHomeList();
      setMovieList(list);

      // pegando o destaque 
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.result.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Api.getMovieInfo(chosen.id, 'tv')

      setDadosDestaque(chosenInfo)
    }

    loadAll();
  }, []);

  return (
    <div className='page'>

     {dadosDestaque &&
        <FilmeDestaque item={dadosDestaque}/>
     }

     <section className="lists">
       {movieList.map((item, key)=>(
         <div>
           <MovieRow key={key} title={item.title} items={item.items} />
         </div>
       ))}
     </section>
    </div>
  );
}
