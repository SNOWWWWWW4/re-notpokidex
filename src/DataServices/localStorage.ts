const saveToLocalStorage = (poki:string) => {
    let favorites = getlocalStorage();

    if(!favorites.includes(poki)) {
        favorites.push(poki);
    }

    localStorage.setItem("Favorites", JSON.stringify(favorites));
}

const getlocalStorage = () => {
    let localStorageData = localStorage.getItem("Favorites");

    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

const removeFromLocalStorage = (poki: string) => {
    let favorites = getlocalStorage();
    let namedIndex = favorites.indexOf(poki);
    favorites.splice(namedIndex, 1);
    localStorage.setItem("Favorites", JSON.stringify(favorites))
}

export {saveToLocalStorage, getlocalStorage, removeFromLocalStorage};