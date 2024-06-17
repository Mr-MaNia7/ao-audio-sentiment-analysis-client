'use client';
import { useRef, useState, useEffect, useCallback, MutableRefObject } from "react";

export default function DocumenttViewer() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [loaded, setLoaded] = useState(false);
  const pdfUrl =
    "https://online.fliphtml5.com/qghaj/dmsw/";

  const clearCheckingInterval = useCallback(() => {
    console.log("clearChecking");
    if (interval.current) {
      clearInterval(interval.current);
    }
  }, []);

  const onIframeLoaded = useCallback(() => {
    clearCheckingInterval();
    setLoaded(true);
  }, [clearCheckingInterval]);

  useEffect(() => {
    const delay = () =>
      setInterval(() => {
        console.log("set");
        try {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            console.log("set interval current");
            console.log("test", iframeRef.current.contentWindow.document);
            if (iframeRef.current.contentWindow.document.body.innerHTML === "") {
              console.log("retry");
              iframeRef.current.src = pdfUrl;
            }
          }
        } catch (e) {
          console.log("error", e);
          onIframeLoaded();
        }
      }, 1000);

    if (iframeRef.current) interval.current = delay();

    return clearCheckingInterval;
  }, [clearCheckingInterval, onIframeLoaded, pdfUrl]);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe
        style={{ width: '100%', height: '100%' }}
        ref={iframeRef}
        onLoad={onIframeLoaded}
        src={pdfUrl}
        title="PDF Viewer"
      />
    </div>
  );
}
