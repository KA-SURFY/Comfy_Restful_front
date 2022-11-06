import { combineReducers } from "redux";
import post from './post';
import member from './member';
import result from './result';
import createsurvey from './createsurvey';


const rootReducer=combineReducers({
    post,
    member,
    result,
    createsurvey,
});

export default rootReducer;