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

  return (
    <div 
      ref={ref} 
      style={{
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        borderRadius: '12px',
        minHeight: '400px',
        padding: '2rem'
      }}
    >
    </div>
  );
}
