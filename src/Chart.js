import React, {useEffect, useState, useContext} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import { withStyles, makeStyles } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import LocationCityIcon from '@material-ui/icons/LocationCity';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MovieIcon from '@material-ui/icons/Movie';
import ComputerIcon from '@material-ui/icons/Computer';


import Typography from '@material-ui/core/Typography';

import axios from 'axios'
import moment from 'moment-timezone'

import { StoreContext }  from './StoreProvider'

import MuiTableCell from "@material-ui/core/TableCell";

import { LineChart } from 'react-chartkick'
import 'chart.js'

import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesNormalBand, SparklinesReferenceLine } from 'react-sparklines';

import Trend from 'react-trend';

import outliers from 'outliers'

// const TableCell = withStyles({
//   root: {
//     borderBottom: "none"
//   }
// })(MuiTableCell);

const useStyles = makeStyles(theme => ({
  
    root: {
      "& div.MuiDataGrid-root": {
        color: "black",
        backgroundColor: '#eff2f5',
        borderBottom: "none"
        // color: theme.palette.text.color
      },
      '&.MuiDataGrid-root .MuiDataGrid-cell' :{
       borderBottom: 'none'
      },
      
 
      //  '& > *': {
      //    margin: theme.spacing(1),
      //  },
 
      "&.Mui-selected": {
       backgroundColor: "none",
       borderBottom: "2px solid #373985",
       borderColor: "#373985",
     },
      '& .font-tabular-nums': {
       fontVariantNumeric: 'tabular-nums',
     },
    }
  }));

 /* eslint-disable no-unused-expressions */
 const calculateStats = (col) => {

 }


export const Chart = () => {
   const store = useContext(StoreContext)

  //  const [dataWasReceived, setDataWasReceived] = useState(false)
  //  const [data, setData] = useState(false)
  //  const [data, setData] = useState(false)
   // const [showdata, setShowdata] = useState(false)
  //  const [showDuration, setShowDuration] = useState(false)

   const classes = useStyles();

   useEffect(() => {
      console.log("running useEffect. node_env: " + process.env.NODE_ENV)
      if (!store.state.wasDataReceived) {
        if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test_production') {
          console.log('node env is:')
          console.log(process.env.NODE_ENV ?? null)
        // }
          axios.get(`http://localhost:5000/data`)
          .then(res => {
            console.log("got response")
              let data = res.data
              // console.dir('data:')
              //extract high level data so can just store statsByNew (which has all metros)
              store.dispatch({ type: 'setMetros', message: data.metros})
              store.dispatch({ type: 'setPtypes', message: data.pTypes})
              store.dispatch({ type: 'setDurations', message: data.durations})
              let statsByNew = data.statsByNew
              
              store.dispatch({type: 'setData', message: statsByNew}) //data.duration.metro.pType
              store.dispatch({type: 'wasDataReceived', message: true})
              // store.dispatch({type:'showDuration' message: 'thisWeek'}) //defaut
              // store.dispatch({type:'setShowMetro' message: 'thisWeek'}) //defaut
            

              if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test_production') { console.log('logging data received:'); console.log(data)}
              return true
          })
        }
      }
   }, [])

   const getData = () => {
      // console.log(data.city)
      // createRows(data) 
     let { data: data, showDuration : d, showMetro: m, showPtype: p} = store.state
     let x = data[d][m][p]
     return data[d][m][p]

      // else {
      //   dataArr = store.state.data.statsBy[store.state.duration].filter( (el, index) => {
        

      //   })
      // }

      // return data.city //need to make this work for pTypes
   
     }

     const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    
   const usdPrice = {
      type: 'number',
      width: 130,
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
      cellClassName: 'font-tabular-nums',
    };


    //Create cityColumns, pTypeColumns, thisWeekColumns etc
   const columns = (type) => { 
      // city = store.state.showMetro
      let duration = store.state.showDuration
      let showPtype = store.state.showPtype

       if (showPtype === 'Land') { //ALL = just show by city
          const landCols = [
            { field: 'city', headerName: 'City', width: 150,  align: 'left', 
              valueGetter: (params) => {
                  let x = params.getValue('city')
                  x = x.replace("_CA", "")
                  return x
              },
            },
            { field: `nSold`, headerName: '# Sold',  width: 90 },
            { field: `medPlotSizeAcres`, headerName: 'Price/Acre (Median)', ...usdPrice, width: 180 },
            { field: `medLotSizeAcres`, headerName: 'Lot Size (Median)', width: 180, align: 'right' },
            { field: `medPlotSizePchangeAcres`, headerName: 'W/W Price/Acres Med. change', width: 230, valueGetter: (params) => {
              const nSold = params.getValue('nSold')
              const medPlotSizePchangeAcres = params.getValue('medPlotSizePchangeAcres')
              let plusSign = (medPlotSizePchangeAcres > 0) ? '+': ''

              
              if (nSold == 0) return 'none sold this week'
              if (nSold != 0 && !medPlotSizePchangeAcres) return 'none sold last week'
              // if (isNaN(params.medPlotSizePchangeAcres == 0)) return 'n/a'
              return plusSign + params.getValue('medPlotSizePchangeAcres') + '%'
            }},
            { field: `medSp`, headerName: 'Sold Price (Median)', ...usdPrice, width: 200  },
            { field: `meanSp`, headerName: 'Sold Price (Average)', ...usdPrice, width: 200  }
          ]
          duration == 'lastWeek' ? (cols.splice(3,1)) : null
          return ( 
            landCols
          )
        }
          const cols = [
            { field: 'city', headerName: 'City', width: 150,  align: 'left', 
               valueGetter: (params) => {
                  let x = params.getValue('city')
                  x = x.replace("_CA", "")
                  x = x.replace("_Los-Angeles", "")
                  return x
               },
            },
            { field: `nSold`, headerName: '# Sold',  width: 90 },
            { field: `medPsqFt`, headerName: 'Price/SqFt (Median)', ...usdPrice, width: 200, valueGetter: (params) => {
              let x 
              if(store.state.showPtype == 'Land') {
                return params.getValue('medPlotSize')
              } 
            else { return params.getValue('medPsqFt')}}
          },

             { field: `medPsqFtPchange`, headerName: 'W/W Price/SqFt Med. change', width: 230, align: 'right', valueGetter: (params) => {
                let x 
                if(store.state.showPtype == 'Land') {
                  x = params.getValue('medPlotSizePchangeAcres')
                }
                else {
                  x = params.getValue(`medPsqFtPchange`)
                }
                
                x = Number(x * 100).toFixed(1) 
                let plusSign = (x > 0) ? '+': ''
                if (isNaN(x) || !isFinite(x)) {x = 'n/a'}
                else { x = plusSign + x + '%'}
                return x
              },  
            },
            { field: `medSp`, headerName: 'Sold Price (Median)', ...usdPrice, width: 200  },
            { field: `meanSp`, headerName: 'Sold Price (Average)', ...usdPrice, width: 200  },
            { field: `ppSqFtArr`, headerName: '14d med price/sqFt chart', ...usdPrice, width: 240, renderCell: (params) => {
               let city = params.getValue('city')
               let pType = params.getValue('pType')
               let totalData = store.state.data.total2weeks[store.state.showMetro][pType].filter(el => el.city == city)[0]
              //  let totalDataCity = totalData.filter(el => el.city = city)
               let nSold = totalData.nSold
               let ppSqFtArr = totalData.ppSqFtArr
               if (nSold > 8) {
                 if(city == 'Napa_CA') {
                   console.log('napa')
                 }
                 let dataArr = store.state.data.total2weeks[store.state.showMetro][store.state.showPtype].filter(el => el.city == city)[0].ppSqFtArr.filter(outliers())
                  if (dataArr.length > 3) {
                 // return 
                 ///create chart
                    return (  <Trend
                        smooth={true}
                        autoDraw
                        autoDrawDuration={1000}
                        autoDrawEasing="ease-in"
                        width={400} 
                        height={100} 
                        padding={0}

                        // data={store.state.data.total2weeks[store.state.showMetro][store.state.showPtype].filter(el => el.city == 'Palo-Alto_CA')[0].ppSqFtArr}
                        data={dataArr}
                        gradient={['#cc0227', '#000000', '#17962a']}
                        radius={50}
                        strokeWidth={2.1}
                        strokeLinecap={'butt'}
                      />)
                  }

                // return <p>'n/a'</p>
               }
               else { return <p style={{textAlign: 'center'}}> <i>insufficient data</i></p>}
           },  }
            
         ]

         duration == 'lastWeek' ? (cols.splice(3,1)) : null //remove pChange columns

         return ( 
            cols
         )
      // else {
        

      // }
      //NOT IMPLEMENTED
      // if (type === 'city' && duration == 'lastWeek') {
      //    return ([
      //       { field: 'city', headerName: 'City', width: 150,  align: 'left', 
      //       valueGetter: (params) => {
      //          let x = params.getValue('city')
      //          x = x.replace("_CA", "")
      //          return x
      //       },
      //    },
      //       { field: 'thisWeek_nSold', headerName: '# Sold',  width: 100 },
      //       { field: 'thisWeek_medPsqFt', headerName: 'Price/square foot (median)', ...usdPrice, width: 250 },
      //       { field: 'thisWeek_medSp', headerName: 'Sold Price (Median)', ...usdPrice, width: 250 },
      //       { field: 'thisWeek_meanSp', headerName: 'Sold Price (Average)', ...usdPrice, width: 250 }
      //    ])
      // }
   }

   const camelToSpace = (text) => {
      return text.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
   }
   const [value, setValue] = useState(1)

   const getChartArr = (params)=> { 
      let city = params.getValue('city')
      let pType = params.getValue('pType')
      //y = total stats object
      let y = store.state.data.total2weeks[store.state.showMetro][pType].filter(el => el.city == city)[0]
      let nArr = [...Array(y.ppSqFtArr.length).keys()].map(foo => String(foo + 1))
      let chartArr = y.ppSqFtArr.map( (el, i ) => { 
        if (i==0) { //
          let startDate = new Date((new Date().setDate(new Date().getDate() - 14))).toLocaleDateString('en-CA')
          return [startDate, y.ppSqFtArr[i]] 
        }
        if (i == y.ppSqFtArr.length - 1) {
          let endDate = new Date((new Date().setDate(new Date().getDate()))).toLocaleDateString('en-CA')
          return [endDate, y.ppSqFtArr[i]]
        }
         return [`${i}`, y.ppSqFtArr[i]] 
      })
      // global.chartArr = chartArr
      return chartArr
    }

  
  
  return (
   
   (store?.state?.wasDataReceived) ? (
    
     
    
     <>
    {/* // <div className={classes.root} style={{ height: 600, width: '100%' }}> */}
        <BottomNavigation
      value={value}
      //New value seems to be the order (e.g. NYC = 0, LA = 2)
      onChange={(event, newValue) => {
        store.dispatch({type: 'showMetro', message: newValue})
        setValue(newValue); //why? to highlight button?
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="NYC" icon={<AccountBalanceIcon />} />
      <BottomNavigationAction label="SF Bay Area" icon={<ComputerIcon />} />
      <BottomNavigationAction label="LA" icon={<MovieIcon />} />
      </BottomNavigation>

       {/* <Typography style={{ paddingBottom: '40px', paddingTop: '10px'}}> {camelToSpace(showDuration)} - By {camelToSpace(store.state.show)} </Typography> */}
       <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
         {/*!Secondary = red*/}
        <Button onClick={() => { store.dispatch({type:'showPtype', message: store.state.pTypes[0]})}} color={(store.state.showPtype == store.state.pTypes[0]) ? "secondary" : "primary"} >{store.state.pTypes[0]}</Button>
        <Button onClick={() => { store.dispatch({type:'showPtype', message: store.state.pTypes[1]})}}  color={(store.state.showPtype == store.state.pTypes[1]) ? "secondary" : "primary"}>{store.state.pTypes[1]} </Button>
        <Button onClick={() => { store.dispatch({type:'showPtype', message: store.state.pTypes[2]})}} color={(store.state.showPtype == store.state.pTypes[2]) ? "secondary" : "primary"}>{store.state.pTypes[2]}</Button>
        <Button onClick={() => { store.dispatch({type:'showPtype', message: store.state.pTypes[3]})}} color={(store.state.showPtype == store.state.pTypes[3]) ? "secondary" : "primary"}>{store.state.pTypes[3]}</Button>
        <Button onClick={() => { store.dispatch({type:'showPtype', message: store.state.pTypes[4]})}}  color={(store.state.showPtype == store.state.pTypes[4]) ? "secondary" : "primary"}>{store.state.pTypes[4]}</Button>
      </ButtonGroup>
      {store.state.showPtype == 'Condo/Townhome' ? (<p>select beds number</p>) : null}
      <DataGrid className={classes.root} rowBackground="white"  GridLinesVisibility="None" autoHeight={true} sortingOrder={['desc', 'asc', null]} rows={ 
        getData()} columns={columns()} />
    {/* // </div> */}
    <p> line chart: </p>
    {/* <LineChart data={}/>
      <LineChart data={}></LineChart> */}
    {/* <Sparklines data={store.state.data.total2weeks[store.state.showMetro][store.state.showPtype].filter(el => el.city == 'San-Francisco_CA')[0].ppSqFtArr} style={{marginLeft: '-12px', minWidth: '18%'}}> className="responsiveChart"  */}
    {/* <Sparklines data={[142, 142, 523, 135,245]}> {/*className="responsiveChart"*/} 
            {/* <SparklinesLine />
            <SparklinesNormalBand />
            <SparklinesSpots spotColors={{ "-1": "red", "0": "black", "1": "#3eab66"}} size={4.5}/>
         </Sparklines>  
         */} 
         <Sparklines data={[5, 10, 5, 20]}>
          <SparklinesLine color="blue" />
        </Sparklines>
        {/* <Sparklines data={store.state.data.total2weeks[store.state.showMetro][store.state.showPtype].filter(el => el.city == 'Palo-Alto_CA')[0].ppSqFtArr}>
        <SparklinesLine color="blue" />
        <SparklinesReferenceLine type="median" />
        </Sparklines> */}
    <Trend
      smooth={true}
      autoDraw
      autoDrawDuration={2000}
      autoDrawEasing="ease-in"
      data={store.state.data.total2weeks[store.state.showMetro][store.state.showPtype].filter((el, i) => { if (i==0) return el})[0].ppSqFtArr}
      gradient={['#cc0227', '#000000', '#17962a']}
      radius={50}
      strokeWidth={2.1}
      strokeLinecap={'butt'}
    />

    <LineChart data={{"2017-05-13": 2, '': 5, "2017-05-14": 5}} setTitle='Test Title' xtitle="Time" ytitle="P/SqFt" />
    <LineChart data={[["2020-10-13", 499.18736939865335], ["2020-10-14", 532], ["2020-10-15", 232], ["2", 828.3132530120482]]}/>
    
    </>
   )
   :
   (<p> getting data </p>)
  );


}