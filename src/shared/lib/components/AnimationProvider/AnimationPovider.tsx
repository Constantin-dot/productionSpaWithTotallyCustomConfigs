import {
  ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState,
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface IAnimationContextPayload {
  Spring?: SpringType;
  Gesture?: GestureType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<IAnimationContextPayload>({});

const getAsyncAnimationModule = async () => Promise.all([
  import('@react-spring/web'),
  import('@use-gesture/react'),
]);

export const useAnimationLibs = () => useContext(AnimationContext) as Required<IAnimationContextPayload>;

export const AnimationProvider = ({ children }: {children: ReactNode}) => {
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getAsyncAnimationModule().then(([Spring, Gesture]) => {
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      setIsLoaded(true);
    });
  }, []);

  const value = useMemo(() => ({
    Spring: SpringRef.current,
    Gesture: GestureRef.current,
    isLoaded,
  }), [isLoaded]);

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
