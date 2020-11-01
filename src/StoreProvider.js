import React, { useEffect, useContext, createContext } from 'react'
//used to *provide* the data+dispatch to components downstream

const defaultState = {

   sessionId: '',
   sortBy: false,
   wasDataReceived: false,
   
   showDuration: 'thisWeek',
   durations: ['lastWeek', 'thisWeek', 'past2days'],

   showMetro: 'Bay_Area', 
   metros: ['New_York', 'Bay_Area', 'Los_Angeles', 'Seattle', 'San_Diego', 'Portland'],


   showPtype: 'All', //all = stats by city?
   pTypes: ["All", "Single Family Home", "Land", "Multi-Family Home","Condo/Townhome","Mfd/Mobile Home" ],
   dateToday: false,

   htmlStrings: false,
   showHtmlString: false,

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
       case 'setHtmlStrings':
          window.htmlStrings = action.message


         return {
           ...state,
           htmlStrings: action.message,
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
       let h = state.htmlStrings[state.metros[action.message]].htmlString
       window.showMetro = state.metros[action.message]
       setTimeout( () => window.changeTableau(state.metros[action.message]), 0)
      
   //   document.body.insertAdjacentHTML('afterbegin',state.htmlStrings[state.metros[action.message]]?.htmlString);
   //   <script dangerouslySetInnerHTML={{ __html: `</script>
   //    <link rel="preload" href="https://fonts.googleapis.com/css?family=Open+Sans" as="style" onLoad="this.onload=null;this.rel='stylesheet'" crossOrigin="anonymous"/>
   // <script>`,}}/>
      // let h = state.htmlStrings[state.metros[action.message]]?.htmlString
      // // window.showTableau(h)
      // document.body.append(document.createElement('d2'))
      // document.querySelector('d2').dangerouslySetInnerHTML = h
      //  let d = document.createElement("div")
      //  let h = state.htmlStrings[state.metros[action.message]]?.htmlString
      //  d.dangerouslySetInnerHTML = h
      //  document.body.appendChild(d)

      //  <div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}} />


      return {
         ...state,
         showMetro: state.metros[action.message],
         showHtmlString: h
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
