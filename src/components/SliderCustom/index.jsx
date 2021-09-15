import React, { memo } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import Images from 'config/images'
import { Carousel } from 'react-responsive-carousel';
import { pdfjs, Document, Page } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const SliderCustom = memo((props) => {
  const { data, url } = props;
  const classes = useStyles(data.length);

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    autoplaySpeed: 2000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <img src={Images.icChevronRight} alt="" />,
    prevArrow: <img src={Images.icChevronLeft} alt="" />,
  };

  return (
    <>
      <Carousel
        className={classes.root}
        showArrows={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                background: 'unset',
                border: "unset",
                zIndex: 2,
                width: "15%",
                cursor: "pointer",
                outline: 'unset',
              }}
            >
              <img src={Images.icChevronLeft} alt="" />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                background: 'unset',
                border: "unset",
                zIndex: 2,
                width: "15%",
                cursor: "pointer",
                outline: 'unset',
              }}
            >
              <img src={Images.icChevronRight} alt="" />
            </button>
          )
        }
      >
        {
          data.map((step, index) => (
            <Grid key={index} container alignItems="center" justify="center" classes={{ root: classes.container }}>
              {step.contentType === 'Pdf' ? 
                <iframe className={classes.iframe} src={'https://drive.google.com/viewerng/viewer?embedded=true&url=' + step.pathUrl} title="description"></iframe>
                // <Document file={step.pathUrl}>
                //   <Page renderAnnotationLayer={false} height={500} pageNumber={1} className={classes.img} />
                // </Document>
              :
              <a href={url ? url : step.pathUrl} target="_blank" rel="noopener noreferrer">
                <img className={classes.img} src={step.pathUrl} alt='' />
              </a>
              }
            </Grid>
          ))
        }
      </Carousel >
    </>
  );
})

export default SliderCustom;

