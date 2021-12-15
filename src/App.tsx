import { useEffect, useState } from "react";

export default function App() {
  const [currentWindow, setCurrentWindow] = useState(null as any);
  useEffect(() => {
    const setWindowState = async () => {
      const thisWindow = await chrome.windows.getCurrent()
      setCurrentWindow(thisWindow)
    };
    setWindowState();
  }, []);
  const popupWidth = (currentWindow !== null) ? currentWindow.width * 0.5 : 300;
  return (
    <div style={{ width: popupWidth }}>
      Hello World {popupWidth}
      !!!
    </div>
  );
}
