import React, {useEffect, useState, useContext} from 'react';
import { StoreContext }  from './StoreProvider'
import renderHTML from 'react-render-html'




const TableauFrame = () => { 
   const store = useContext(StoreContext)
   const [count, setCount] = useState(0)
   
   useEffect( () => { global.styleIframe() }, [])

   useEffect( () => { global.styleIframe() }, [store.state.showHtmlString])

   // if (store.state.htmlStrings[store.state.showMetro]?.htmlString && (count < 1)) {
      // let x = renderHTML(store.state.htmlStrings[store.state.showMetro].htmlString)
      // console.log(x)
      // let y = x.querySelector('iframe')
      // console.log(x)
     
      global.styleIframe = () => {
         setTimeout( () => {
             let iFrArr = document.querySelectorAll('iframe')

             if (iFrArr.length > 1 && count < 1) {
               let allIframes = document.querySelectorAll('iframe')
               window.indexHtmlFrame = allIframes[1] 
               // if (typeof window.indexHtmlFrame.parentElement != 'undefined') window.indexHtmlFrame.parentElement.style.display = "none"
               if (typeof window.indexHtmlFrame?.parentElement != 'undefined' && count < 1) {
                  let body = window.indexHtmlFrame.parentElement.parentElement
                  
                  window.indexHtmlFrame.parentElement.remove()
                  setTimeout( () => { 
                  document.querySelector('iframe').parentElement.parentElement.style.width = '89vw'
                  
                  })
             }

             }

             if (iFrArr.length > 1 && count >=1) {
               let allIframes = document.querySelectorAll('iframe')
               window.indexHtmlFrame = allIframes[0] 
               // if (typeof window.indexHtmlFrame.parentElement != 'undefined') window.indexHtmlFrame.parentElement.style.display = "none"
               if (typeof window.indexHtmlFrame?.parentElement != 'undefined') {
                  let b = window.indexHtmlFrame.parentElement.parentElement
                  let c = b.children //scrip tag\?

                  window.indexHtmlFrame.parentElement.remove() //delete div 
                  // window.indexHtmlFrame.parentElement


             }
            }
              //style reaining
              document.querySelector('iframe').outerHTML = document.querySelector('iframe').outerHTML.replace('style="display: block;', 'style="display: block; width: 100vw; height: 40vw; padding-left: 20vw;')
              document.querySelector('iframe').outerHTML = document.querySelector('iframe').outerHTML.replace('padding: 0px;', '')
              document.querySelector('iframe').outerHTML = document.querySelector('iframe').outerHTML.replace('Visualization"', `Visualization" data-count="${count}"`)
              let iFrO = document.querySelector('iframe').outerHTML
              document.querySelector('iframe').parentElement.style.width = '100vw'
  
              setTimeout( () => { 
                 document.querySelector('iframe').parentElement.parentElement.style.width = '89vw'
                 
              })

            // document.querySelector('iframe').outerHTML = document.querySelector('iframe').outerHTML.replace('style="display: block;', 'style="display: block; width: 100vw; height: 40vw; padding-left: 20vw;')
            // document.querySelector('iframe').outerHTML = document.querySelector('iframe').outerHTML.replace('padding: 0px;', '')
            // document.querySelector('iframe').outerHTML = document.querySelector('iframe').outerHTML.replace('Visualization"', `Visualization" data-count="${count}"`)
            // let iFrO = document.querySelector('iframe').outerHTML
            // document.querySelector('iframe').parentElement.style.width = '100vw'
            // // (document.querySelector('iframe').parentElement.parentElement) ? (
            // //    document.querySelector('iframe').parentElement.parentElement.style.width = '100vw' )   :  null
            
            // let allIframes = document.querySelectorAll('iframe')
            // window.indexHtmlFrame = allIframes[1] 
            // // if (typeof window.indexHtmlFrame.parentElement != 'undefined') window.indexHtmlFrame.parentElement.style.display = "none"
            // if (typeof window.indexHtmlFrame?.parentElement != 'undefined' && count < 1) window.indexHtmlFrame.parentElement.remove()

            // setTimeout( () => { 
            //    document.querySelector('iframe').parentElement.parentElement.style.width = '89vw'
               
            // })
            
            console.log('done settimeout')
            // let p = indexHtmlFrame.parentNode
            // p.
            // p.remove()
            // indexHtmlFrame.parentNode.parentNode.removeChild(indexHtmlFrame.parentNode)
            // indexHtmlFrame.outerHTML = indexHtmlFrame.outerHTML.replace('style="display: block; ', 'style="display: none; width: 80vw; height: 80vw;')
            // indexHtmlFrame.parentNode.removeChild(indexHtmlFrame)
         }, 3500)
         setCount(count + 1)
      }
      
   // }
   // const ranthis = false
   if (store.state.htmlStrings[store.state.showMetro]?.htmlString && (count >= 1)) {
      //remove 1st iframe. 
      //restyle new iframe

      // let iFr = document.querySelector('iframe')
      // let titleCount = iFr['data-count']

      // if (Number(titleCount) < count) { 
      //    iFr.remove()
      //  }

   }
   


   if (store.state.showHtmlString) {
      console.log('in showhtmlstring return')
      let x = renderHTML(store.state.showHtmlString)
      return x
     

   }
   else if (store.state.htmlStrings[store.state.showMetro]) {

      
  // <div style={{display: 'flex', justifyContent: 'center', width: '1200px', height: '1200px'}}>
    
      // <div style={{display: 'flex', justifyContent: 'center', width: '1200px', height: '1200px'}}>
      //    <>
      //    {/* <p> TableauFrame </p> */}
      //   <span style={{height: "60vh", width: '100vw', background: "#2d405f"}} dangerouslySetInnerHTML={{__html: store.state.htmlStrings[store.state.showMetro]?.htmlString}} />
      //     <div dangerouslySetInnerHTML=`<div class='tableauPlaceholder' id='viz1603943523962' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;X6&#47;X62DQXKZM&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='path' value='shared&#47;X62DQXKZM' /> <param name='toolbar' value='no' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;X6&#47;X62DQXKZM&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='tabs' value='no' /><param name='filter' value=':revert=' /><param name='refresh' value='yes' /><param name='filter' value=':linktarget=' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1603943523962');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.width='800px';vizElement.style.height='600px';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>`><div></div>        {/* <p>end of tableau frame </p> */}
      //   </>
      
     return  renderHTML( store.state.htmlStrings['Bay_Area'].htmlString)
      // renderHTML(`<div class='tableauPlaceholder' id='viz1603943523962' style='position: relative'><noscript><a href='#'><img alt=' ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;X6&#47;X62DQXKZM&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='path' value='shared&#47;X62DQXKZM' /> <param name='toolbar' value='no' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;X6&#47;X62DQXKZM&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='tabs' value='no' /><param name='filter' value=':revert=' /><param name='refresh' value='yes' /><param name='filter' value=':linktarget=' /></object></div> `)

      //   </div>
    }
    else{ return null }



}

export default TableauFrame