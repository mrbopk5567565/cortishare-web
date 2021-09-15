import React, { useRef } from 'react'
import { Grid } from '@material-ui/core';
import Images from 'config/images'
import { useSelector } from 'react-redux';

const CustomContainer = ({ decorators, onClick, node }) => {
  const nodesSelect = useSelector((state) => state.node.nodesSelect)

  const treeItem = useRef(null);
  const renderToggle = () => {
    if (node.toggled) {
      return (<img src={Images.icArrowDown} alt="icon-down" />)
    } else {
      return (<img src={Images.icArrowRight} alt="icon-right" />)
    }
  }

  const styleIconArrow = {
    marginRight: 5,
  }

  const renderItem = () => {
    if (nodesSelect && nodesSelect.pathIds.includes(node.id)) {
      return (
        <Grid
          onClick={onClick}
          ref={treeItem}
          style={{
            backgroundColor: "#E5F1FA",
            color: '#000',
            padding: "10px 15px",
            fontSize: 17,
            borderRadius: 10,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            marginBottom: 12,
            cursor: 'pointer'
          }}>
          <div style={{ paddingLeft: `${(node.level + 1) * 25}px`, display: 'flex' }}>
            <div style={styleIconArrow}>
              {node.children.length > 0 ? renderToggle() : null}
            </div>
            <decorators.Header node={node} />
          </div>
        </Grid >
      )
    } else {
      return (
        <Grid
          onClick={onClick}
          container
          style={{
            backgroundColor: "#FFF",
            color: '#000',
            padding: "10px 15px",
            fontSize: 17,
            borderRadius: 10,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
            marginBottom: 12,
            cursor: 'pointer',
          }}
        >
          <div style={{ paddingLeft: `${(node.level + 1) * 25}px`, display: 'flex' }}>
            <div style={styleIconArrow}>
              {node.children.length > 0 ? renderToggle() : null}
            </div>
            <decorators.Header node={node} />
          </div>
        </Grid>
      )
    }
  }
  return (
    <>
      {renderItem()}
    </>
  )
}

export default CustomContainer;