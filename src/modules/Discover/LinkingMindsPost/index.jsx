import React from "react";
import { Grid } from "@material-ui/core";
import useStyles from "./styles";
import { connect, useSelector } from "react-redux";
import { StackGridCustom } from "components";
import { SizeMe } from 'react-sizeme'

// import clsx from 'clsx'

const LinkingMindsChildPost = () => {
  // const history = useHistory();
  // const dispatch = useDispatch();
  const classes = useStyles();
  const mapDiscover = useSelector((state) => state.discover.mapDiscover)
  const searchAll = useSelector((state) => state.discover.searchAll)

  // const handleClick = () => {
  //   console.log("vo click r");
  // };

  return (
    <Grid container classes={{ root: (!searchAll || (searchAll && !searchAll.length)) ? '' : classes.root }}>
      <SizeMe>{({ size }) => {
        return <StackGridCustom data={searchAll} widthDevice={size.width}/>
      }
    }
      </SizeMe>
    </Grid>
  );
};

export default connect()(LinkingMindsChildPost);
