import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import useStore from "@/helpers/store";


export const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
};

// TODO: I know this is bad and needs re-factoring.
export const useDisabledGeneralNotify = (type) => {
  const notice = useToast({
    title: "Anon, I can't do that. 🥲",
      description: "We are in alpha rn & some features are disabled while we plug stuff in. Updates will be coming in pretty fast. 🚀 Stay stronk octo.",
    status: "info",
    duration: 8000,
    isClosable: true,
  });
  return notice;
};
export const useDisabledMobileNotify = (type) => {
  const notice = useToast({
    title: "Oh noes! Forgive us, Anon. 🥲",
    description: "We are in alpha rn & some features are disabled on mobile devices while we plug stuff in. You should be able to do it on the desktop version though. 👀 See you there.",
    status: "info",
    duration: 8000,
    isClosable: true,
  });
  return notice;
};

// Tests for Mac users so we can degrade the 3D experience due to Mac/WebGL issues.
export const useIsMac = () => {
  const { os } = useStore();
  if (os) {
    return os.indexOf('MAC') >= 0 ?? false;
  }
  return false;
}

// export const useLocalStore = (key, value) => {
// const STORAGE_KEY = 'metafest2';

//   const getFromLS = (key) => {
//     let ls = {};
//     if (global.localStorage) {
//       try {
//         const prefs = global.localStorage.getItem(STORAGE_KEY);
//         ls = prefs !== null ? JSON.parse(prefs) : {};
//       } catch (e) {
//         // eslint-disable-next-line no-console
//         console.error('Error fetching user preferences from localStorage:', e);
//       }
//     }
//     return ls[key] ;
//   };

//   const saveToLS = (key, value) => {
//     if (global.localStorage) {
//       global.localStorage.setItem(
//         STORAGE_KEY,
//         JSON.stringify({
//           [key]: value,
//         }),
//       );
//       console.log('Saved to local storage:', key, value);
//       return
//     }
//   };

//   if (key && value) {
//     saveToLS(key, value);
//   } else if(key && !value) {
//     getFromLS(key);
//   } else {
//     return global.localStorage;
//   }
// }