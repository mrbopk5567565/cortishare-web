import React, { memo } from 'react';
import { Breadcrumbs, Link } from '@material-ui/core';
import useStyles from './styles';
import clsx from 'clsx';
import { push } from 'connected-react-router';
import { useHistory } from 'react-router-dom';
import { Text } from 'components'

const BreadcrumbsCustom = memo((props) => {
  const classes = useStyles();
  const { data, type = 'header' } = props;
  const history = useHistory();

  const handleClick = (url) => {
    history.push(url)
  }
  return (
    <Breadcrumbs className={props.classNameCustom || null} aria-label="breadcrumb" classes={{ root: classes.root, separator: classes.seperator }}>
      {data && data.map((item, index) =>
        <div key={index}>
          {type !== 'header' ?
            index + 1 !== data.length ?
              <Link onClick={() => handleClick(item.link)} classes={{ root: classes.link }}>
                {item.label}
              </Link>
              :
              <Text classes={{ root: classes.notLink }} >{item.label}</Text>
            :
            <Text >{item.label}</Text>
          }
        </div>
      )}
    </Breadcrumbs>
  );
});
export default BreadcrumbsCustom;



