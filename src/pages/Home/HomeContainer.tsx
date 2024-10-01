import {
  Dispatch,
  StateUpdater,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import HomeView from "./HomeView";
import { appInfoArr } from "../../constants";

export default function HomeContainer() {
  const [previousChosenAppIndex, setPreviousChosenAppIndex] = useState(-1);
  const [chosenAppIndex, _setChosenAppIndex] = useState(0);
  const setChosenAppIndex = (newVal: StateUpdater<number>) => {
    setPreviousChosenAppIndex(chosenAppIndex);
    _setChosenAppIndex(newVal);
  };
  const [autoScrollRight, _setAutoScrollRight] = useState(true); // going right means new apps come from right
  const autoScrollRightRef = useRef<boolean>(false);
  function setAutoScrollRight(newVal: boolean) {
    autoScrollRightRef.current = newVal;
    _setAutoScrollRight(newVal);
  }
  const [manualControl, _setManualControl] = useState(false);
  const manualControlRef = useRef<boolean>(false);
  function setManualControl(newVal: boolean) {
    manualControlRef.current = newVal;
    _setManualControl(newVal);
  }
  const [isDetailMode, setIsDetailMode] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  const CAROUSEL_TIMEOUT_MS = 3000;
  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (manualControlRef.current) {
          return;
        }

        setChosenAppIndex((curr) => {
          let newIdx = curr;
          if (autoScrollRightRef.current) {
            newIdx += 1;
          } else {
            newIdx -= 1;
          }

          if (newIdx < 0) {
            newIdx = 1;
            setAutoScrollRight(true);
          }
          if (newIdx >= appInfoArr.length) {
            newIdx = appInfoArr.length - 2;
            setAutoScrollRight(false);
          }

          return newIdx;
        });
      }, CAROUSEL_TIMEOUT_MS);
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  function handleNextChosenAppIndex() {
    if (!manualControl) {
      setManualControl(true);
    }
    setChosenAppIndex((e) => {
      let newVal = e + 1;
      if (newVal < appInfoArr.length) {
        return newVal;
      }
      return e;
    });
  }

  function handleBackChosenAppIndex() {
    if (!manualControl) {
      setManualControl(true);
    }
    setChosenAppIndex((e) => {
      let newVal = e - 1;
      if (newVal > -1) {
        return newVal;
      }
      return e;
    });
  }

  useEffect(() => {
    if (isDetailMode) {
      setManualControl(true);
    }
  }, [isDetailMode]);

  return (
    <HomeView
      isDetailModeState={[isDetailMode, setIsDetailMode]}
      chosenAppIndexState={[chosenAppIndex, setChosenAppIndex]}
      appInfoArr={appInfoArr}
      isScrollDirectionRight={previousChosenAppIndex < chosenAppIndex}
      onBackChosenAppIndex={handleBackChosenAppIndex}
      onNextChosenAppIndex={handleNextChosenAppIndex}
    />
  );
}
