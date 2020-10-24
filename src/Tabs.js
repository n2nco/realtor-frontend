

import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Chart} from './Chart'
import Sheet from './Sheet'
import { StoreContext }  from './StoreProvider'
// import TabPanel from '@material-ui/core/TabPanel'
// import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '90vw',
  },

//   '&.MuiTabs-root': {
//      width: 1200
//   }

  })
//   'root > div > div': {
//       display: 'inline-block',
//       width: '100%'
//    }


function TabPanel(props) {
   const store = useContext(StoreContext)


   const { children, value, index, ...other } = props;
 
   return (
     <div
       role="tabpanel"
       hidden={value !== index}
       id={`scrollable-prevent-tabpanel-${index}`}
       aria-labelledby={`scrollable-prevent-tab-${index}`}
       {...other}
     >
       {value === index && (
         <Box p={3}>
           <Typography style={{color: 'black'}}>{children}</Typography>
         </Box>
       )}
     </div>
   );
 }

export default function CenteredTabs() {
const store = useContext(StoreContext)
  const classes = useStyles();
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
     store.dispatch({type:'showDuration', message: Number(newValue) }) //this store.state change changes duration showing
     setValue(newValue);
  };

  return (
   // <AppBar position="static" color="default">
   <>
   <div style={{pdadingBottom: '80px'}}></div>
    <Paper className={classes.root}  minWidth={'1000px'} style={{paddingTop: '1vw'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        width='1200px'
      >
        <Tab label="Last Week" />
        <Tab label="This Week" />
        <Tab label="Past 48 Hours" />
      </Tabs>
   
      <TabPanel value={value} index={0}>
       <Chart></Chart>
      </TabPanel>

      <TabPanel value={value} index={1}>
      <Chart></Chart>
      </TabPanel>
      
      <TabPanel value={value} index={2}>
      <Chart></Chart>
      </TabPanel>
      <TabPanel value={value} index={3}>
         Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
         Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
         Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
         Item Seven
      </TabPanel>
      </Paper>
         </>
  );
}