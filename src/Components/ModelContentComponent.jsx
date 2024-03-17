import React from 'react'
import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from './DataServices/localStorage';

const ModalContentComponent = () => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
    const storedFavorites = getLocalStorage();
    setFavorites(storedFavorites);
    }, []);

    const handleRemoveFavorite = (pName) => {
        removeFromLocalStorage(pName);
        setFavorites(favorites.filter((name) => name !== pName));
        updateStarButton();
    };

  return (
    <div>
      {favorites.map((pName, index) => (
        <div key={index} className="flex items-center justify-between">
          <p className="text-lg font-medium text-gray-900 dark:text-white mb-4">{pName}</p>
          <button
            type="button"
            onClick={() => handleRemoveFavorite(pName)}
            className="text-gray-900 bg-transparent hover:bg-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 justify-end dark:hover:bg-gray-600 dark:hover:text-white ms-8"
          >
            x
          </button>
        </div>
      ))}
    </div>
  )
}

export default ModalContentComponent
