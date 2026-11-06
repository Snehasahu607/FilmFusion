import React, { useCallback, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Heart, Search, X, Star, SlidersHorizontal } from 'lucide-react';
import './styles.css';

const movies = [
  {id:1,title:'Candle in the Tomb: The Lost Legend',year:2023,genres:['Action','Adventure'],rating:6.9,poster:'/assets/candle%20in%20the%20tomb.jpg',description:'A thrilling adventure through ancient ruins, mysteries and hidden treasures.'},
  {id:2,title:'Fast X',year:2023,genres:['Action','Crime'],rating:7.0,poster:'/assets/Fast-X-Poster.jpg',description:'Dom and his family face a new enemy with a personal vendetta.'},
  {id:3,title:'Barbie',year:2023,genres:['Comedy','Adventure'],rating:7.0,poster:'/assets/barbie.webp',description:'Barbie leaves Barbieland for a colorful journey of self-discovery.'},
  {id:4,title:'Spider-Man: Across the Spider-Verse',year:2023,genres:['Animation','Action'],rating:8.3,poster:'/assets/il_fullxfull.3807163725_cuy8.webp',description:'Miles Morales travels across the Spider-Verse and meets a team of Spider-People.'},
  {id:5,title:'Guardians of the Galaxy Vol. 3',year:2023,genres:['Action','Adventure'],rating:7.9,poster:'/assets/guardians-of-the-galaxy-year-2014-usa-uk-director-james-gunn-zoe-saldana-chris-pratt-movie-poster-fr-R2H9F9.jpg',description:'The Guardians embark on a mission to protect one of their own.'},
  {id:6,title:'The Super Mario Bros. Movie',year:2023,genres:['Animation','Adventure'],rating:7.0,poster:'/assets/super_mario_movie_poster__by_btetegrg_dftmkn3-fullview.jpg',description:'Mario and Luigi are pulled into a magical world full of adventure.'},
  {id:7,title:'Deadpool & Wolverine',year:2024,genres:['Action','Comedy'],rating:7.8,poster:'/assets/deadpool2jpg-19c159.jpg',description:'Two unlikely heroes team up for a chaotic multiverse adventure.'},
  {id:8,title:'Oppenheimer',year:2023,genres:['Drama','History'],rating:8.6,poster:'/assets/Oppenheimer3.jpg',description:'The story of the scientist who helped create the first atomic bomb.'},
  {id:9,title:'John Wick: Chapter 4',year:2023,genres:['Action','Crime'],rating:7.6,poster:'/assets/john-wick-2014-06.jpg',description:'John Wick uncovers a path to defeat the High Table.'},
  {id:10,title:'Dune: Part Two',year:2024,genres:['Adventure','Drama'],rating:8.5,poster:'/assets/dune-part-two.jpg',description:'Paul Atreides unites with Chani and the Fremen while seeking revenge.'},
  {id:11,title:'The Batman',year:2022,genres:['Action','Crime'],rating:7.8,poster:'/assets/the-batman-poster.avif',description:'Batman investigates corruption while facing a mysterious killer in Gotham.'},
  {id:12,title:'Inside Out 2',year:2024,genres:['Animation','Comedy'],rating:7.6,poster:'/assets/inside-out-2-poster-showing-joy-and-the-other-emotions-squished-together.avif',description:'Riley enters her teenage years as new emotions arrive at headquarters.'}
];

const genres = ['All','Action','Adventure','Animation','Comedy','Crime','Drama','History'];
const years = ['All','2024','2023','2022'];

function MovieCard({movie, favorite, onFavorite, onOpen}) {
  return <article className="card">
    <div className="posterWrap" onClick={()=>onOpen(movie)}>
      <img src={movie.poster} alt={movie.title} loading="lazy" />
      <button className={`fav ${favorite?'active':''}`} aria-label="favorite" onClick={e=>{e.stopPropagation();onFavorite(movie.id)}}><Heart size={18} fill={favorite?'currentColor':'none'}/></button>
      <div className="overlay">View details</div>
    </div>
    <div className="cardBody"><h3 title={movie.title}>{movie.title}</h3><div className="meta"><span>{movie.year}</span><span className="rating"><Star size={13} fill="currentColor"/> {movie.rating}</span></div><p>{movie.genres.join(', ')}</p></div>
  </article>
}

function App(){
 const [query,setQuery]=useState(''); const [genre,setGenre]=useState('All'); const [year,setYear]=useState('All'); const [sort,setSort]=useState('None'); const [favorites,setFavorites]=useState([]); const [showFav,setShowFav]=useState(false); const [selected,setSelected]=useState(null);
 const toggleFavorite=useCallback(id=>setFavorites(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]),[]);
 const clearAll=()=>{setQuery('');setGenre('All');setYear('All');setSort('None');setShowFav(false)};
 const filtered=useMemo(()=>{
   let result=movies.filter(m=>m.title.toLowerCase().includes(query.toLowerCase()) && (genre==='All'||m.genres.includes(genre)) && (year==='All'||String(m.year)===year) && (!showFav||favorites.includes(m.id)));
   if(sort==='Rating: High to Low') result=[...result].sort((a,b)=>b.rating-a.rating);
   if(sort==='Year: Newest') result=[...result].sort((a,b)=>b.year-a.year);
   if(sort==='Title: A-Z') result=[...result].sort((a,b)=>a.title.localeCompare(b.title));
   return result;
 },[query,genre,year,sort,showFav,favorites]);
 return <div className="app">
   <header><div className="brand">Film<span>Fusion</span></div><button className={`favNav ${showFav?'active':''}`} onClick={()=>setShowFav(v=>!v)}><Heart size={18} fill={showFav?'currentColor':'none'}/> Favorites <b>{favorites.length}</b></button></header>
   <section className="hero"><h1>Find your next <span>favorite</span> movie.</h1><p>Search, filter and save movies you want to watch.</p></section>
   <section className="controls">
    <div className="search"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search for movies..."/></div>
    <select value={genre} onChange={e=>setGenre(e.target.value)}>{genres.map(g=><option key={g} value={g}>{g}</option>)}</select>
    <select value={year} onChange={e=>setYear(e.target.value)}>{years.map(y=><option key={y} value={y}>{y}</option>)}</select>
    <select value={sort} onChange={e=>setSort(e.target.value)}><option>None</option><option>Rating: High to Low</option><option>Year: Newest</option><option>Title: A-Z</option></select>
    <button className="clear" onClick={clearAll}><SlidersHorizontal size={17}/> Clear All</button>
   </section>
   <main><div className="sectionHead"><div><h2>{showFav?'♥ My Favorites':'🎬 Filtered Movies'}</h2><span>{filtered.length} movie{filtered.length!==1?'s':''} found</span></div></div>
   {filtered.length?<div className="grid">{filtered.map(m=><MovieCard key={m.id} movie={m} favorite={favorites.includes(m.id)} onFavorite={toggleFavorite} onOpen={setSelected}/>)}</div>:<div className="empty"><h3>No movies found</h3><p>Try changing your search or filters.</p></div>}</main>
   {selected&&<div className="modalBackdrop" onClick={()=>setSelected(null)}><div className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}><X/></button><img src={selected.poster} alt=""/><div><div className="modalRating"><Star size={16} fill="currentColor"/> {selected.rating}</div><h2>{selected.title}</h2><p className="muted">{selected.year} • {selected.genres.join(' • ')}</p><p>{selected.description}</p><button className="primary" onClick={()=>toggleFavorite(selected.id)}>{favorites.includes(selected.id)?'Remove from Favorites':'Add to Favorites'}</button></div></div></div>}
   <footer>FilmFusion • React movie discovery project</footer>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
