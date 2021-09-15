import React, { memo, useEffect, useMemo, useState, useRef, useCallback } from 'react';
import useStyles from './styles';
import StackGrid, { transitions } from "react-stack-grid";
import { SizeMe } from 'react-sizeme'
import CardCustomFeed from '../CardCustomFeed'
import { useLocation, useRouteMatch } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Grid, Box, Collapse } from '@material-ui/core'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useSelector } from 'react-redux';
import { NotFoundItems } from 'components';
import clsx from 'clsx';

const StackGridCustom = memo((props) => {
  const path = useLocation().pathname === '/' ? 6 : 7
  const classes = useStyles();
  const [widthColumn, setWidthColumn] = useState({ widthPercent: '', column: 0 })
  const { data, widthDevice, widthContainer, handleClick, disabled, btnType, children, onClick, checkPermission, isLoadMore, loadMorePostsByMap, loadMorePostsByNode } = props;
  const widthSplit = useSelector((state) => state.global.widthSplit)
  const matchDashboard = useRouteMatch('/');
  const matchMindMapDetail = useRouteMatch('/board/:mapId');
  const matchNodeDetail = useRouteMatch('/board/:mapId/node/:nodeId');
  const matchDiscoverLinking = useRouteMatch('/search/linking-minds');
  const isLoading = useSelector((state) => state.global.isLoading)

  // const [stackGridCustom] = useState(
  //   matchDiscoverLinking ? classes.matchDiscoverLinking : ( matchCreatePost ? classes.matchCreatePost : (  ) )
  // ) 
  // console.log('checkPermissionStackGridCustom:', checkPermission);

  const observer = useRef()
  const lastItem = useCallback(node => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && isLoadMore) {
        if (loadMorePostsByMap) {
          loadMorePostsByMap();
        }
        if (loadMorePostsByNode) {
          loadMorePostsByNode();
        }
      }
    })
    if (node) observer.current.observe(node)
  }, [isLoading, isLoadMore])

  const stackGridCustom = useMemo(() => {
    switch (true) {
      case !!matchDiscoverLinking:
        return classes.matchDiscoverLinking
      // case ((!!matchMindMapDetail || !!matchNodeDetail) && (widthSplit < 375)):
      //   return classes.matchPostDetailMiniIp6Extra;
      // case ((!!matchMindMapDetail || !!matchNodeDetail) && (widthSplit < 600)):
      //   return classes.matchPostDetailMiniIp6;
      // case ((!!matchMindMapDetail || !!matchNodeDetail) && (widthSplit < 750)):
      //   return classes.matchPostDetailMini;
      case (!!matchMindMapDetail || !!matchNodeDetail):
        return classes.matchPostDetail;
      default: return classes.stackGridCustomDefault;
    }
  }, [widthSplit])

  // const handleResize = (width) => {
  //   let widthPercent = `${Math.floor(100 / path)}%`
  //   let column = path
  //   if (width <= 400) {
  //     widthPercent = '100%'
  //   } else if (width <= 600) {
  //     widthPercent = `${Math.floor(100 / (path === 6 ? (path - 4) : (path - 5)))}%`
  //     column = path === 6 ? (path - 4) : (path - 5)
  //   } else if (width <= 800) {
  //     widthPercent = `${Math.floor(100 / (path - 4))}%`
  //     column = path - 4
  //   } else if (width <= 970) {
  //     widthPercent = `${Math.floor(100 / (path - 3))}%`
  //     column = path - 3
  //   } else if (width <= 1300) {
  //     widthPercent = `${Math.floor(100 / (path - 2))}%`
  //     column = path - 2
  //   } else if (width <= 1500) {
  //     widthPercent = `${Math.floor(100 / (path - 1))}%`
  //     column = path - 1
  //   }
  //   return {
  //     widthPercent,
  //     column
  //   }
  // }

  // function getWidth() {
  //   return Math.max(
  //     document.body.scrollWidth,
  //     document.documentElement.scrollWidth,
  //     document.body.offsetWidth,
  //     document.documentElement.offsetWidth,
  //     document.documentElement.clientWidth
  //   );
  // }

  // const getColumn = () => {
  //   return handleResize(getWidth())
  // }



  let i;
  const items = Array.from(Array(130), () => {
    const randomPhoto = Math.floor(Math.random() * 5000) + 1
    const randomHeight = Math.floor(Math.random() * 5) + 2
    const randomWidth = Math.floor(Math.random() * 5) + 2
    const imgUrl = `https://picsum.photos/${randomWidth}00/${randomHeight}00?random=${randomPhoto}`
    i++;
    return {
      id: i++,
      title: `Img-title-${i}`,
      url: imgUrl,
      createBy: 'sin'
    }
  })
  const fake_data = [
    // {
    //   id: 1,
    //   title: 'asdds',
    //   // url: 'https://www.youtube.com/watch?v=e-k624', test case url fail
    //   thumbnail: 'https://www.youtube.com/watch?v=e-k62QaiR54',
    //   createdBy: 'James',
    //   type: 'video',
    // },
    // {
    //   id: 2,
    //   title: 'asdds',
    //   thumbnail: 'https://www.youtube.com/watch?v=WL4wDxejzFc',
    //   createdBy: 'James',
    //   type: 'video',
    // },
    // {
    //   id: 3,
    //   title: 'asdds',
    //   thumbnail: 'https://www.youtube.com/watch?v=vOdUcyAiHjI&list=RDvOdUcyAiHjI&start_radio=1',
    //   createdBy: 'James',
    //   type: 'video',
    // },
    // {
    //   id: 4,
    //   title: 'asdds',
    //   thumbnail: 'https://fb.watch/2ScDHSImf7/',
    //   createdBy: 'James',
    //   type: 'video',
    // },
    // ...data,
    // ...items,
  ]

  const columnsCountBreakPoints = () => {
    const bodyBox = document.body;
    if (matchMindMapDetail || matchNodeDetail) {
      const padding = widthSplit > 600 ? 100 : 40;

      let withColumn = 255;
      if (widthSplit < 750) withColumn = 195;
      if (widthSplit < 375) {
        return {
          0: 1
        }
      };
      if (widthSplit < 600) {
        return {
          0: 2
        }
      };
      const col = Math.floor((widthSplit - padding) / withColumn);

      // Check Case when view map on Mobile --> file MapDetail.js set width = 0 --> col = -1
      if (col <= 0) {
        return {
          0: 1
        }
      }

      return {
        0: col
      }
    }

    const maxWidth = bodyBox.offsetWidth - 30;
    let withColumn = 300;

    if (matchDiscoverLinking) {
      if (maxWidth <= 600) {
        return {
          0: 2
        }
      } else if (maxWidth > 600) {
        withColumn = 255
        const col = Math.floor((maxWidth) / withColumn);
        return {
          0: col,
        }
      }
    }

    if (maxWidth < 600) {
      return {
        0: 2
      }
    } else if (maxWidth >= 600 && maxWidth < 960) {
      withColumn = 300
    }

    const col = Math.floor((maxWidth) / withColumn);

    return {
      0: col
    }
  }

  const columnsCountBreakPoints2nd = () => {
    if (matchMindMapDetail || matchNodeDetail) {
      if (widthSplit > 0 && widthSplit <= 600) {
        return {
          0: 1,
        }
      } else if (widthSplit > 600 && widthSplit <= 960) {
        return {
          0: 2,
        }
      } else if (widthSplit > 960 && widthSplit <= 1280) {
        return {
          0: 3
        }
      } else if (widthSplit > 1280 && widthSplit <= 1920) {
        let padding = 40
        let col;
        let withColumn = 433;
        col = Math.floor((widthSplit - padding) / withColumn);
        if (col <= 0) {
          return {
            0: 1
          }
        }
        return {
          0: col,
        }
      }
    }

    const bodyBox = document.body;
    const maxWidth = bodyBox.offsetWidth;
    let col;
    let withColumn = 433
    if (maxWidth > 600 && maxWidth <= 960) {
      return {
        0: 2
      }
    } else if (maxWidth > 960 && maxWidth <= 1280) {
      return {
        0: 3
      }
    }
    let paddingLayput;
    paddingLayput = maxWidth <= 960 ? 50 : 120
    col = Math.floor((maxWidth - paddingLayput) / withColumn);
    
    if (col <= 0) {
      return {
        0: 1
      }
    }

    return {
      0: col
    }
  }

  // useEffect(() => {
  //   // if (matchDashboard && !matchDashboard.isExact) {
  //   window.addEventListener('resize', () => {
  //     setWidthColumn(document.body.offsetWidth);
  //   })
  //   // }
  //   // return () => {
  //   //   if (matchDashboard && !matchDashboard.isExact) {
  //   //     window.removeEventListener('resize', () => {})
  //   //   }
  //   // }
  // }, []);

  console.log('pathpath', widthDevice, widthContainer)

  return (
    <>
      {!data || (data && !data.length) &&
        <div style={{ width: `${widthContainer ? widthContainer + 'px' : '100%'}`, margin: '0 auto' }}>
          <Grid container direction="column" className={classes.wrapperNotfound}>
            {matchMindMapDetail || matchNodeDetail ? <NotFoundItems isMap={true} checkPermission={checkPermission} /> : <NotFoundItems />}
          </Grid>
        </div>
      }
      <ResponsiveMasonry
        style={{
          width: '100%',
        }}
        // columnsCountBreakPoints={columnsCountBreakPoints()}
        columnsCountBreakPoints={columnsCountBreakPoints2nd()}

      >
        <Masonry gutter="20px" className={clsx(stackGridCustom, 'masonry')}>
          {data.map((item, index) => {
            if (data.length === index + 1) {
              return (
                <div key={index} ref={lastItem}>
                  <CardCustomFeed key={index} item={item} />
                </div>
              )
            }
            else {
              return (
                <CardCustomFeed key={index} item={item} />
              )
            }
          })
          }

        </Masonry>
      </ResponsiveMasonry>
    </>
  );
});
export default StackGridCustom;
