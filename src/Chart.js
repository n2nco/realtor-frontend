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
     

      '& > *': {
        margin: theme.spacing(1),
      },

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
              store.dispatch({type: 'setData', message: data})
              store.dispatch({type: 'wasDataReceived', message: true})
              // store.dispatch({type:'showDuration' message: 'thisWeek'}) //defaut
              // store.dispatch({type:'setShowMetro' message: 'thisWeek'}) //defaut
            

              if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test_production') { console.log('logging data received:'); console.log(data)}
              return true
          })
        }
      }
   }, [])

   const getData = (show) => {
      // console.log(data.city)
      // createRows(data) 
      if (show == 'All') return store.state.data.statsBy.city

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

      if (showPtype === 'All') { //ALL = just show by city
          const cols = [
            { field: 'city', headerName: 'City', width: 150,  align: 'left', 
               valueGetter: (params) => {
                  let x = params.getValue('city')
                  x = x.replace("_CA", "")
                  return x
               },
            },
            { field: `${duration}_nSold`, headerName: '# Sold',  width: 90 },
            { field: `${duration}_medPsqFt`, headerName: 'Price/SqFt (Median)', ...usdPrice, width: 200 },
             { field: `${duration}_medPsqFtPchange`, headerName: 'W/W Price/SqFt Med. change', width: 230, align: 'right', valueGetter: (params) => {
              let x = params.getValue(`${duration}_medPsqFtPchange`)
               x = Number(x * 100).toFixed(1) 
               x = x + '%'
              return x
           },  },
            { field: `${duration}_medSp`, headerName: 'Sold Price (Median)', ...usdPrice, width: 200  },
            { field: `${duration}_meanSp`, headerName: 'Sold Price (Average)', ...usdPrice, width: 200  }
            
         ]

         duration == 'lastWeek' ? (cols.splice(3,1)) : null
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
      }
   }

   const camelToSpace = (text) => {
      return text.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
   }
   const [value, setValue] = useState(0)

  return (
   (store.state.wasDataReceived) ? (
     <>
    {/* // <div className={classes.root} style={{ height: 600, width: '100%' }}> */}
        <BottomNavigation
      value={value}
      //New value seems to be the order (e.g. NYC = 0, LA = 2)
      onChange={(event, newValue) => {
        store.dispatch({type: 'showMetro', message: newValue})
        setValue(newValue);
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
       <Button onClick={() => { store.dispatch({type:'showPtype', message: 0})}} color="secondary" >All</Button>
        <Button onClick={() => { store.dispatch({type:'showPtype', message: store.state.pTypes[1]})}}  color="primary">{store.state.pTypes[1]} </Button>
        <Button onClick={() => { store.dispatch({type:'showPtype', message: store.state.pTypes[2]})}} color="primary">{store.state.pTypes[2]}</Button>
        <Button onClick={() => { store.dispatch({type:'showPtype', message: store.state.pTypes[3]})}} color="primary">{store.state.pTypes[3]}</Button>
        <Button onClick={() => {store.dispatch({type:'showPtype', message: store.state.pTypes[4]})}}  color="primary">{store.state.pTypes[4]}</Button>
      </ButtonGroup>
      <DataGrid className={classes.root} rowBackground="white" style={{}} autoHeight={true} sortingOrder={['desc', 'asc', null]} rows={getData(store.state.showPtype)} columns={columns('city')} />
    {/* // </div> */}
    </>
   )
   :
   (<p> getting data </p>)
  );


}