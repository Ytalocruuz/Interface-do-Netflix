import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeatureMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header';
import Loading from './components/img/Netflix_LoadTime.gif';
import Footer from './components/Footer/Footer';

function App() {

  const [movieList, setMovieList] = useState([])
  const [featureData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista total
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      //Pegando o feature
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeatureData(chosenInfo)
    }

    loadAll()
  }, [])


  //monitorar a página, para ficar header preto ou transparente 
  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener) // Se houver scroll  vai rodar a função scrollListener definida acima

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }

  }, [])


  return (
    <div className="page">

      <Header black={blackHeader} />

      {featureData &&
        <FeatureMovie item={featureData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <Footer />
        

      {/* Imagem do carregando antes de incicar os cards de filmes */}
      {movieList.length <= 0 &&
        <div className="loading">
          <img src={Loading} alt="Carregando" />
        </div>}
    </div>
  );
}

export default App;
