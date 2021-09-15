import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  ClickAwayListener,
  DialogActions,
  Grid,
  InputAdornment,
  IconButton,
  FormControl,
  TextField,
} from '@material-ui/core';
import useStyles from './styles';
import Images from 'config/images'
import { TreeItem, TreeView } from '@material-ui/lab';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import { Buttons } from 'components'
import { useDispatch, useSelector } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { withStyles } from '@material-ui/core/styles';
import { GET_CATEGORY_REQUEST, SET_CATEGORY_SELECTED, SET_CATEGORY_SEARCH_DEFAULT } from 'redux/reducers/category/actionTypes';
import { GET_ALL_MAP_DISCOVER_REQUEST, SEARCH_ALL_REQUEST } from 'redux/reducers/discover/actionTypes';
import { Loading, Text } from 'components'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useRouteMatch } from 'react-router-dom';

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    marginTop: 8,
    '& svg': {
      fontSize: 12
    },
  },
  label: {
    fontSize: 18
  },
  selected: {
    color: '#0070C9'
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
  },
  content: {
    alignItems: 'flex-start!important',
  },

}))((props) => <TreeItem {...props} />);

const StyledTreeParent = withStyles((theme) => ({
  iconContainer: {
    '& svg': {
      fontSize: 20
    },
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  expanded: {
    '& > :not(ul)': {
      '& > .MuiTreeItem-label': {
        color: '#0070C9',
      }
    },
    '& > .Mui-selected': {
      color: '#0070C9',
      '& > .MuiTreeItem-label': {
        color: '#0070C9',
      }
    }
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
  },
}))((props) => <TreeItem {...props} />);

const StyledTreeParentNoChild = withStyles((theme) => ({
  iconContainer: {
    display: 'none',
    '& svg': {
      display: 'none'
    },
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
  },
}))((props) => <TreeItem {...props} />);

const PopupFilter = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { categories, category_select } = useSelector((state) => state.category)
  const [textSearch, setTextSearch] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [idSelect, setIdSelect] = useState('0');
  const [idExpanded, setIdExpanded] = useState([]);
  const [expanded, setExpanded] = useState(['']);
  const matchDiscover = useRouteMatch('/search');
  const matchLinking = useRouteMatch('/search/linking-minds');

  const isLoading = useSelector((state) => state.global.isLoading)

  const paramsMapDiscovery = useSelector((state) => state.discover.paramsMapDiscovery)
  const paramsSearchAll = useSelector((state) => state.discover.paramsSearchAll)

  useEffect(() => {
    dispatch({
      type: GET_CATEGORY_REQUEST,
    })
    if (!category_select) return;
    setTextSearch(category_select.text_search);
    setIdExpanded(category_select.id_explaned);
    setIdSelect(category_select.id_selected);
    setIsSearch(category_select.is_search);
    if (category_select.text_search !== '') {
      const list = findByTextSearch(categories, category_select.text_search);
      setResultSearch(list);
    }
    else {
      setResultSearch(categories);
    }
  }, [])

  const closePopup = () => {
    props.handleCloseFilter();
  }

  const handleChange = e => {
    setTextSearch(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault()
    const list = findByTextSearch(categories, textSearch);
    setResultSearch(list);
    setIsSearch(true);
  }

  const handleApply = () => {
    const object = findNode(categories, parseInt(idSelect));
    let label = {
      label_parent: object && object.parent ? object.parent.name : '',
      label_child: object && object.child ? object.child.name : ''
    }
    if (matchDiscover && matchDiscover.isExact) {
      dispatch({
        type: GET_ALL_MAP_DISCOVER_REQUEST,
        payload: {
          data: { ...paramsMapDiscovery, categoryId: idSelect },
          loadMore: false
        }
      })
    } else if (matchLinking && matchLinking.isExact && paramsSearchAll.TableType === 1) {
      dispatch({
        type: SEARCH_ALL_REQUEST,
        payload: {
          ...paramsSearchAll,
          Page: 1,
          CategoryId: idSelect,
        },
        isLoading: true,
        isLoadMore: false,
      })
    }

    if (idExpanded.length === 0) {
      dispatch({
        type: SET_CATEGORY_SELECTED,
        payload: {
          ...category_select,
          text: textSearch,
          id_selected: 0,
          id_explaned: [],
          label: {
            label_parent: '',
            label_child: ''
          },
          is_search: false,
          list_result: []
        }
      })
    } else {
      dispatch({
        type: SET_CATEGORY_SELECTED,
        payload: {
          ...category_select,
          text: textSearch,
          id_selected: idSelect,
          id_explaned: [String(object && object.parent ? object.parent.id : '')],
          label: label,
          is_search: true,
          list_result: resultSearch
        }
      })
    }
    closePopup();
  }

  const handleSearch = () => {
    const list = findByTextSearch(categories, textSearch);
    setResultSearch(list);
    setIsSearch(true);
  }

  const handleClickCategory = (event, id) => {
    let value = id.split(" ");
    setIdSelect(value[0]);
  }

  const handleExpandedCategory = (event, id) => {
    setIdExpanded(id);
  }

  const findNode = (node, id) => {

    for (let item of node) {
      if (item.id === id) {
        if (item.subCategories) {
          return { parent: item }
        }
        return item;
      }
      if (item.subCategories && item.subCategories.length > 0) {
        let desiredNode = findNode(item.subCategories, id)
        if (desiredNode) {
          return {
            parent: item,
            child: desiredNode
          };
        }
      }
    }
  }

  function findByTextSearch(tree, text) {
    let list = [];
    for (let node of tree) {
      if (node.name.includes(text)) {
        list.push(node);
      }
      else if (node.subCategories) {
        let desiredNode = findByTextSearch(node.subCategories, text)
        if (desiredNode.length > 0) {
          node.subCategories = desiredNode;
          list.push(node)
        }
      }
    }
    return list;
  }

  const checkExpandedActive = value => {
    const index = expanded.indexOf(value)
    if (index > -1) {
      expanded.splice(index, 1);
      setExpanded(expanded.splice(index, 1))
    } else {
      setExpanded([...expanded, value])
    }
  }

  const renderTree = (list) => {
    return (
      list.map((item, index) => {
        if (item.subCategories.length === 0) {
          return (
            <StyledTreeParent
              key={item.id}
              nodeId={String(item.id)}
              label={item.name}
              onClick={() => checkExpandedActive(String(item.id))}
            >
              <StyledTreeItem
                key={item.id + ' item'}
                onClick={() => checkExpandedActive(String(item.id) + ' item')}
                nodeId={String(item.id) + ' item'}
                label={item.name + " "} />
            </StyledTreeParent>
          )
        } else {
          return (
            <StyledTreeParent
              key={item.id}
              onClick={() => checkExpandedActive(String(item.id))}
              nodeId={String(item.id)}
              label={item.name}>
              {item.subCategories.map((subItem) => {
                return (
                  <StyledTreeItem
                    key={subItem.id}
                    nodeId={String(subItem.id)}
                    onClick={() => checkExpandedActive(String(subItem.id))}
                    label={subItem.name} />
                );
              })}
            </StyledTreeParent>
          )
        }
      })
    )
  }

  const handleResetFilter = () => {
    dispatch({
      type: SET_CATEGORY_SEARCH_DEFAULT,
    })

    if (matchDiscover && matchDiscover.isExact) {
      dispatch({
        type: GET_ALL_MAP_DISCOVER_REQUEST,
        payload: { data: { ...paramsMapDiscovery, categoryId: 0, tableType: 1 }, loadMore: false }
      })
    } else if (matchLinking && matchLinking.isExact) {
      dispatch({
        type: SEARCH_ALL_REQUEST,
        payload: {
          ...paramsSearchAll,
          Page: 1,
          CategoryId: 0,
        },
        isLoading: true,
        isLoadMore: false,
      })
    }
  }

  const handleReset = () => {
    setIsSearch(false);
    setIdSelect('0');
    setIdExpanded([]);
    setTextSearch('');
    setExpanded(['']);
    handleResetFilter();
    closePopup();
  }


  return (
    <ClickAwayListener onClickAway={closePopup}>
      <Dialog
        open={true}
        onClose={closePopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{
          paper: classes.container,
          paperScrollPaper: classes.paperScrollPaper,
        }}
      >
        {isLoading && <Loading />}
        <DialogContent classes={{ root: classes.containerBody }}>
          <form onSubmit={handleSubmit} className={classes.form}>
            <FormControl variant="outlined" fullWidth>
              <TextField
                value={textSearch}
                margin="normal"
                placeholder="Search for category"
                fullWidth
                color="primary"
                variant="outlined"
                className={classes.rootTextField}
                InputLabelProps={{ shrink: false }}
                InputProps={{
                  classes: {
                    root: classes.customInput
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
                        <img src={Images.icSearch} alt="" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
              />
            </FormControl>
          </form>
          <TreeView
            classes={{ root: classes.treeView }}
            defaultCollapseIcon={<ArrowDropDown />}
            defaultExpandIcon={<ArrowRight />}
            defaultEndIcon={<FiberManualRecordIcon />}
            onNodeSelect={handleClickCategory}
            onNodeToggle={handleExpandedCategory}
            defaultSelected={category_select.id_selected}
            defaultExpanded={category_select.id_explaned}
            multiSelect={false}
          // expanded={expanded}
          >
            {renderTree(isSearch ? resultSearch : categories)}
          </TreeView>


        </DialogContent>
        <DialogActions classes={{ root: classes.actions }}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Text classes={{ root: classes.actionLink }} handleClick={handleReset}>Reset</Text>
            <Buttons btnType="large" onClick={handleApply} >Apply</Buttons>
          </Grid>
        </DialogActions>
      </Dialog>
    </ClickAwayListener >
  );
};
export default PopupFilter;