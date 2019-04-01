import * as types from '../actions/ActionTypes';

const inintialState = {
    number : 0,
    dummy: 'nothing personal',
    dumbObject:{
        d:0,
        u:1,
        m:2,
        b:3
    }
};

export default function counter(state = inintialState , action){
    /* */
    switch(action.type){
        case types.INCREMENT:
            return{
                ...state, number: state.number+1,
                dumbObject:{...state.dumbObject, u:0}
            };
        case types.DECREMENT:return {
            ...state,number: state.number -1
        };
       default: return state;    
    }
}