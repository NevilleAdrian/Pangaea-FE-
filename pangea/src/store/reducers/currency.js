const currencyReducer = ( state = 'USD', action) => {
    switch(action.type) {
        case 'CURRENCY':
            return action.payload;
         default:
         return state;
    }
 };
 
 export default currencyReducer;