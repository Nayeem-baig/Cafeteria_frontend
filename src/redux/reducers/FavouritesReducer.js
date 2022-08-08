const FavouritesReduser = (state = [], action) => {
    switch (action.type) {
      case "GET_FAV_LIST":
        return action.payload;
      default:
        return state;
    }
  };
  export default FavouritesReduser;
  