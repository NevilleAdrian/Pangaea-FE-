import currencyReducer from './currency'
import { combineReducers} from 'redux';


const allReducers = combineReducers({
    currency: currencyReducer
})

export default allReducers