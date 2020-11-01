import React, {useEffect, useState, useContext} from 'react';
import { StoreContext }  from './StoreProvider'

import renderHTML from 'react-render-html'
import { parse } from 'node-html-parser';





 const TableauFrame2 = () => { 
   const store = useContext(StoreContext)
   const [count, setCount] = useState(0)
   const [currentID, setCurrentID] = useState(false)

   //on click show new metro, delete existing div + script.

   //then add

   if (store.state.htmlStrings[store.state.showMetro]?.htmlString) {
      let x = store.state.htmlStrings[store.state.showMetro]?.htmlString
      let yy = parse(x) //parse into html el (3 els returned)
      let id = yy.childNodes[0].id //get el id
      let reactHtml //

      //current id = last run's tableau element id

      if (!currentID){
         setCurrentID({metro: store.state.showMetro, id: id}) //1st run
         console.log('current id set to: ' + id)
         reactHtml = renderHTML(yy.toString())
      }
      
      //2nd run with no change of id (meaning htmlString didn't change) or metro (meaning no click of button).
      else if (currentID.id == id && currentID.metro == store.state.showMetro ) {
         //then show same
         yy.childNodes[2].id = currentID
         reactHtml = renderHTML(yy.toString())
         
      }
      else { //if metro or id not a match, delete existing iframe. then return new
         //delete & reset
         let prevFrames = document.querySelectorAll('#' + currentID.id) //remove div & script

         console.log("prevFrames:")
         console.log(prevFrames)

         prevFrames.forEach( (el) => {
            if (el) {
               console.log('removing el')
               console.log(el)
               el.remove()
            }
         })

            

         yy.childNodes[2].id = id //update script tag to have new id
         setCurrentID({metro: store.state.showMetro, id: id}) 
         reactHtml = renderHTML(yy.toString())
      }

       //convert to react element

      setTimeout( () => { 
         console.log('running window.showTableau')
         ///viz1603943513180 = sf
         window.showTableau('#' + id)
      }, 8000)

      // y[0].setAttribute("data-metro", store.state.showMetro)   //div
      // y[2].setAttribute("data-metro", store.state.showMetro)  //script

      return reactHtml

   }
   else return null


}

export default TableauFrame2