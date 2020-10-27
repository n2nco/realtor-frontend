import React, { useEffect, useContext, createContext } from 'react'
//used to *provide* the data+dispatch to components downstream

const defaultState = {

   sessionId: '',
   sortBy: false,
   wasDataReceived: false,
   
   showDuration: 'thisWeek',
   durations: ['lastWeek', 'thisWeek', 'past2days'],

   showMetro: 'Bay_Area', 
   metros: ['New_York', 'Bay_Area', 'Los_Angeles'],


   showPtype: 'All', //all = stats by city?
   pTypes: ["All", "Single Family Home", "Land", "Multi-Family Home","Condo/Townhome","Mfd/Mobile Home" ],
   dateToday: false,

   data: false

}

const reducer = (state, action) => {
   switch (action.type) {
      case 'setData':
         return {
           ...state,
           data: action.message,
       }
       case 'setMetros':
         return {
           ...state,
           metros: action.message,
       }
       case 'setPtypes':
         return {
           ...state,
           pTypes: action.message,
       }
       case 'setDurations':
         return {
           ...state,
           durations: action.message,
       }
       case 'wasDataReceived':
         return {
           ...state,
           wasDataReceived: action.message,
       }
      case 'showDuration': 
      return {
         ...state,
         showDuration: state.durations[action.message],
      }
     case 'showMetro': 
      return {
         ...state,
         showMetro: state.metros[action.message],
      }
      case 'showPtype': 
      return {
         ...state,
         showPtype: action.message,
      }
     case 'setDateToday':
       return {
         ...state,
         dateToday: action.message,
     }
  
   }
}


const initState = (initialState) => {
   return defaultState
}

let storeConfigProp = null
const StoreProvider= ({ storeConfig, children }) => {
   const [state, dispatch] = React.useReducer(reducer, defaultState, initState) 
   return (
      <StoreContext.Provider value={{ state, dispatch }}>
         {children}
      </StoreContext.Provider>
   )
}
export const StoreContext = createContext() 
export default StoreProvider
