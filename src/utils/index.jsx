import { useState, useCallback } from 'react'

export const handleCutText = (text) => {
  if (!text) return
  if (text.split(" ").length > 45) {
    const start = text.split(" ").slice(0,45);
    return start.join(" ");
  }
  return text;
};

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
  const [translate, setTranslate] = useState(defaultTranslate);
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      console.log('containerElem', containerElem, width, height)
      setTranslate({ x: width / 2, y: height / 2 });
    }
  }, []);
  console.log('translate', translate)
  return [translate, containerRef];
};

export const classesWidthSplit = (widthSplit) => {
  let className = ''
  if (widthSplit > 0 && widthSplit <= 450) {
    className = 'xs-extra-split'
  } else if (widthSplit > 450 && widthSplit <= 600) {
    className = 'xs-split'
  } else if (widthSplit > 600 && widthSplit < 750) {
    className = 'sm-extra-split'
  } else if (widthSplit >= 750 && widthSplit < 960) {
    className = 'sm-split'
  } else if (widthSplit >= 960 && widthSplit < 1280) {
    className = 'md-split'
  } else if (widthSplit >= 1280 && widthSplit < 1920) {
    className = 'lg-split'
  } else if (widthSplit >= 1920) {
    className = 'xl-split'
  }
  return className
}
