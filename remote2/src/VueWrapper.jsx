import React, { useEffect, useRef } from 'react';
import { createApp } from 'vue';
import VueApp from './App.vue';

export default function VueWrapper() {
  const ref = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (ref.current && !appRef.current) {
      appRef.current = createApp(VueApp);
      appRef.current.mount(ref.current);
    }

    return () => {
      if (appRef.current) {
        appRef.current.unmount();
        appRef.current = null;
      }
    };
  }, []);

  return <div ref={ref}></div>;
}
