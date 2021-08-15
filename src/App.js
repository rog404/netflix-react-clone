import React, { useEffect, useState } from 'react'
import './App.css'
import Tmdb from  './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'

const App = () => {

  const [movieList, setMovieList] = useState([])
  const [featureData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList()
      setMovieList(list)
      
      let req = await fetch('https://api.themoviedb.org/3/tv/1399?api_key=4e536eb913b68eeb51715658bbea9156&language=pt-BR')
      let json = await req.json()
      setFeatureData(json)
    }
    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)
    return() => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">
      <Header black = { blackHeader }/>
      { featureData &&
      <FeaturedMovie item = { featureData }/>
      }
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key = { key } title = { item.title} items = {item.items} />
        ))}
      </section>
      <footer>
        Site para Estudo do React<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org<br/>
        Agradecimento ao Bonieky Lacerda pelo Tutorial
      </footer>
      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://3.bp.blogspot.com/-26DCURDWEMY/V46UH5drfWI/AAAAAAAAlQY/lav6OWJZffw9KE7Pc0l2rxBcs7QKDptiACLcB/s1600/wavy.gif" />
        </div>
      }
    </div>
  )
}

export default App