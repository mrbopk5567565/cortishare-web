import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useLocationBlocker() {
  const history = useHistory();
  useEffect(
    () => {
      // console.log('11111111111',getLocationId(location))
      // console.log(getLocationId(history.location))
      history.block(
        (location, action) => {
          console.log('location, action', location, action, history.location)
          console.log('11111111111',getLocationId(location))
          console.log(getLocationId(history.location))
          if (getLocationId(location) === '/') {
            return true
          }
          return action !== "PUSH" ||
            getLocationId(location) !== getLocationId(history.location)
        }
      );
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
}

function getLocationId({ pathname, search, hash }) {
  return pathname + (search ? "?" + search : "") + (hash ? "#" + hash : "");
}