
import './App.css';
import React, { useState, useEffect} from 'react';
import { Pokemon } from './Interfaces/interface';
import { pokemonApi, pokemonLocation, pokemonEvolutions, pokemonDescription } from './DataServices/dataServices';
import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from './DataServices/localStorage';
import navImg from './Assests/branden-skeli-scIHlUcnFEI-unsplash.jpg';
import { Modal } from 'flowbite-react';
import starBtn from './Assests/star.png';
import starBtn2 from './Assests/star-fill.png';
import ModalContentComponent from './Components/ModelContentComponent';



function App() {


  const [pokiInfo, setPokiInfo] = useState<object>({});
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>();
  const [isFull, setIsFull] = useState<boolean>(false);

  const [poke, setPoke] = useState<string>('1');
  const [searchInput, setSearchInput] = useState<string>('1');

  const [defaultImg, setDefaultImg] = useState<string>('');
  const [shinyImg, setShinyImg] = useState<string>('');
  const [isShiny, setIsShiny] = useState<boolean>(false);

  const [abilities, setAbilities] = useState<string>('');
  const [moves, setMoves] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<string>('');

  const [evolution, setEvolution] = useState<string>('');
  
  const [startName, setStartName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [endName, setEndName] = useState<string>('');
  
  const [startDefImg, setStartDefImg] = useState<string>('');
  const [startShiImg, setStartShiImg] = useState<string>('');
  const [middleDefImg, setMiddleDefImg] = useState<string>('');
  const [middleShiImg, setMiddleShiImg] = useState<string>('');
  const [endDefImg, setEndDefImg] = useState<string>('');
  const [endShiImg, setEndShiImg] = useState<string>('');

  const [openModal, setOpenModal] = useState(false);
  const [favorites, setFavorites] = useState('');

  // 
  useEffect(() =>{
    const pokemonData = async () => {
      const fetchedData = await pokemonApi('1');
      setPokiInfo(fetchedData);
      updatePokemonInfo();
    }
    pokemonData();
    
  }, []);

  //Updates the fetched data
  const updatePokemonInfo = async () => {

    const poki: Pokemon = await pokemonApi(poke);
    setName(poki.name[0].toUpperCase() + poki.name.substring(1));
    setId(formatId(poki.id));
    setDefaultImg(poki.sprites.other["official-artwork"].front_default);
    setShinyImg(poki.sprites.other["official-artwork"].front_shiny);
    setAbilities(poki.abilities.map(ability => ability.ability.name).join(", "));
    setMoves(poki.moves.map(move => move.move.name).join(", "));
    setType(poki.types.map(type => type.type.name).join(", "));
    
    const pokiLoc = await pokemonLocation(poke);
    if (pokiLoc.length === 0) {
      setLocation("N/A");
    }else {
      setLocation (pokiLoc[0].location_area.name.split("-").join(" "));
    }
    
    const desc = await pokemonDescription(poke);
    const english = desc.flavor_text_entries.findIndex((entry) => entry.language.name === "en");
    setDescription(desc.flavor_text_entries[english].flavor_text);
   
    // setEvolution(await fetchEvolution(poki.species.url));

  }

  const formatId = (id: number) => {
    if(id < 10) {
      return "#00" + id;
    } else if(id < 100){
      return "#0" + id;
    } else {
      return "#" + id;
    }
  }

  
  



  const findEvolution = async (poki: Pokemon) => {

  }

  


  // const handleFavBtnClick = async() => {
  //   setFavoritesDiv(ModalContentComponent)
  // }

  const handleStarClick = async () => {
    setIsFull(!isFull);
    const poki: Pokemon = await pokemonApi(poke);

    let favorites = getlocalStorage();
    if(!favorites.includes(poki.name)){
      console.log("add");
      console.log(poki.name)
      saveToLocalStorage(poki.name);
    } else {
      console.log("del");
      removeFromLocalStorage(poki.name);   
    }
    updateStarBtn();
  };

  const updateStarBtn = async () => {
    const poki: Pokemon = await pokemonApi(poke);
    let favorites = getlocalStorage();

    const isFavorites = favorites.includes(poki.name);
    if(isFavorites){
      setIsFull(true);
    }else{
      setIsFull(false);
    }
  }

  const handleImageClick = () => {
    setIsShiny(!isShiny);
  };

  const handleRndBtnClick = async () => {
    const random: number = Math.floor(Math.random() * 649) + 1;
    setPoke(`${random}`)
  }

  // const handleFavoritesBtnClick = () => {
  //   setFavorites(getLocalStorage());
  // };

  return (
    <div>
       
      <nav className="bg-gray-800 border-gray-800 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://pokeapi.co/" className="flex items-center space-x-3 rtl:space-x-reverse navImg" target="_blank" rel="noopener noreferrer">
            <img className="bg-cover rounded-full h-10 w-10 border-2 border-sky-200" src={navImg} alt="PokeAPI logo" />
            <span className="self-center text-2xl font-semibold text-white whitespace-nowrap dark:text-white">Not not a Pokedex</span>
          </a>
          <div className="flex md:order-2">
            <button type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1">
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input type="text" id="searchh" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." 
              
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {if((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){ setSearchInput((e as React.ChangeEvent<HTMLInputElement>).target.value)
                if(searchInput !== ''){
                  setPoke(searchInput)
                }(e as React.ChangeEvent<HTMLInputElement>).target.value = '' }}}/>
            </div>
            <button data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div> 
              <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." 
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {if((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){ setSearchInput((e as React.ChangeEvent<HTMLInputElement>).target.value)
                if(searchInput !== ''){
                  setPoke(searchInput)
                }(e as React.ChangeEvent<HTMLInputElement>).target.value = '' }}}

              />
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-800 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-800 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="navText">
                <a href="#" id="favoritesBtn" className=" block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example"  onClick={() => setOpenModal(true)}>Favorites</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Favorites</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
          

          
          </div>
        </Modal.Body>
        <Modal.Footer>
    
        </Modal.Footer>
      </Modal>
      
      
    
      {/* Container */}
      <div className='m-5'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

              {/* Column One */}
              <div className='ms-4'>

                {/* Header Section */}
                <div className='flex flex-row justify-center text-2xl md:text-3xl lg:text-5xl'>
                    <h1 className='me-2 ms-2 mt-1 mb-1'>{name}</h1>
                    <h1 className='me-4 mt-1 mb-1 text-gr'>{id}</h1>

                    {/* Star Btn */}
                    <img src={isFull? starBtn2 : starBtn}  alt='Star Img' onClick={handleStarClick} className='me-4 sm-4 mt-1 mb-1 headerImg'/>
                </div>

                {/* Main Image Section*/}
                <div className='mt-2 flex justify-center'>
                  <img src={isShiny? shinyImg : defaultImg} alt='Main Pokemon' onClick={handleImageClick} className='h-auto w-ful sm:max-w-lg rounded-lg'/>
                </div>

                {/* Abilities, Moves, and Location Section */}
                <div className='p-4 grid grid-cols-1 lg:grid-cols-3 space-x-2 bg-sky-500 rounded-lg'>
                  <div>
                    <h1 className='text-white'>Abilities</h1>
                    <div className='h-[20vh] w-full rounded-lg border border-black p-2'>{abilities}</div>
                  </div>

                  <div>
                    <h1 className='text-white'>Moves</h1>
                    <div className='overflow-y-auto h-[20vh] w-full rounded-lg border border-black p-2'>{moves}</div>
                  </div>

                  <div>
                    <h1 className='text-white'>Location</h1>
                    <div className='h-[20vh] w-full rounded-lg border border-black p-2'>{location}</div>
                  </div>
                </div>

              </div>

              {/* Column two */}
              <div className='p-4'>
                  
                {/* Description Section */}
                <div className='p-4 bg-gray-300 rounded-xl h-[20vh] w-full grid grid-cols-1'>
                  <h1 className='pb-0'>
                    Description 
                    <div className='ms-2 md:ms-4 lg:ms-6'>{description}</div>
                  </h1>
                </div>

                {/* Pokemon Type Section */}
                <div className='p-4 mt-6 mb-6'>
                  <h1>Type</h1>
                  <div>{type}</div>
                </div>

                {/* Evolution Pathway Section */}
                <div className='evolutionDisplay scroll-smooth overflow-auto h-[25vh] w-full lg:h-[30] width-full p-4 grid grid-cols-1 lg:grid-cols-3 space-x-2 mb-10'>

                  <div>
                    <h1 className='text-white'>Evolutions</h1>

                    <div className='flex justify-center'>
                      <img src={isShiny? startShiImg : startDefImg} onClick={handleImageClick} alt='first stage' className='rounded-full border-4 h-auto border-gray-400 mt-8'/>
                    </div>
                    <h1 className='mt-2 flex justify-center'>{startName}</h1>
                  </div>

                  <div>
                    <div className='flex justify-center'>
                      <img src={isShiny? middleShiImg : middleDefImg} onClick={handleImageClick} alt='second stage' className='rounded-full border-4 h-auto border-gray-400 mt-8'/>
                    </div>
                    <h1 className='mt-2 flex justify-center'>{middleName}</h1>
                  </div>

                  <div>
                    <div className='flex justify-center'>
                      <img src={isShiny? endShiImg : endDefImg} onClick={handleImageClick} alt='third stage' className='rounded-full border-4 h-auto border-gray-400 mt-8'/>
                    </div>
                    <h1 className='mt-2 flex justify-center'>{endName}</h1>
                  </div>

                </div>

                {/* Random Btn Section*/}
                <div className='flex justify-center'>
                  <button type="button" className='btnColor' onClick={handleRndBtnClick}><p>Random Pokemon</p></button>
                </div>

                {/* Suggestion */}
                <div className='flex justify-center mt-10'>*click on images for a surprise*</div>

              </div>
              {/* End of columns */}
            </div>
        </div>
        {/* End of Container */}
    </div>
  );
}

export default App;
