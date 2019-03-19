import { RefObject, useEffect } from 'react';

function useOnClickOutside(ref: RefObject<any>, handler: Function): void {
  useEffect(() => {
    const listener = (event: Event): void => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref || !ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
