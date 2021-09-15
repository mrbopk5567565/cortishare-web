import React, { memo, useEffect } from 'react';
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';
import { Loading, Text } from 'components'
import useStyles from './styles';
import { useDispatch, connect, useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Text component="div">{children}</Text>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const TabsCustom = memo((props) => {
  const { data } = props;
  const classes = useStyles();
  // value default === paramsMapDiscovery.tableType of reducer/discovery
  const [value, setValue] = React.useState(1);
  const paramsMapDiscovery = useSelector((state) => state.discover.paramsMapDiscovery)

  /*
    categoryId = 0 : get all caterogies
    tableType = 1 : Map
    tableType = 2 : POST
    tableType = 3 : User
  */
  useEffect(() => {
    setValue(paramsMapDiscovery.tableType)
  }, [paramsMapDiscovery])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const isLoading = useSelector((state) => state.global.isLoading)

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.rootTabs,
            indicator: classes.indicator
          }}
          variant="scrollable"
          aria-label="wrapped label tabs example">
          {data && data.map((item, index) =>
            <Tab
              key={index}
              value={item.value}
              label={item.label}
              classes={{
                root: classes.rootTab,
                selected: classes.tabSelected,
              }}
              {...a11yProps(item.value)}
              onClick={item.onClick}
            />
          )}
        </Tabs>
      </AppBar>
      {isLoading && <Loading />}
      {!isLoading && data && data.map((item, index) =>
        <TabPanel key={index} value={value} index={item.value}>
          {item.component}
        </TabPanel>
      )}
    </div>
  );
});
export default TabsCustom;



