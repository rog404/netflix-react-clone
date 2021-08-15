const API_KEY = '4e536eb913b68eeb51715658bbea9156'
const API_BASE = 'https://api.themoviedb.org/3'

const basicFetch = async (endpoint) => {
  const req = await fetch(`${API_BASE}${endpoint}&language=pt-BR&api_key=${API_KEY}`)
  const json = await req.json()
  return json
}

const Tmdb = {
  getHomeList: async () => {
    return [
      {
        slug: 'originals',
        title: 'Originais do Netflix',
        items: await basicFetch('/discover/tv?with_network=213')
      },
      {
        slug: 'action',
        title: 'Ação',
        items: await basicFetch('/discover/movie?with_genres=28')
      },
      {
        slug: 'comedy',
        title: 'Comédia',
        items: await basicFetch('/discover/movie?with_genres=35')
      },
      {
        slug: 'horror',
        title: 'Terror',
        items: await basicFetch('/discover/movie?with_genres=27')
      },
      {
        slug: 'documentary',
        title: 'Documentários',
        items: await basicFetch('/discover/movie?with_genres=99')
      }
    ]
  },
  getMovieInfo: async (movieId, type) => {
    let info = {}
    if (movieId) {
      type === 'movie' ? info = await basicFetch(`/movie/${movieId}`) : info = await basicFetch(`/tv/${movieId}`) 
    }
    return info
  }
}

export default Tmdb