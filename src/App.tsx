import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import Table from "./components/Table";
import { purple } from "./styles/Theme";

export default function App() {
  const [currentWindow, setCurrentWindow] = useState(null as any);
  useEffect(() => {
    const setWindowState = async () => {
      const thisWindow = await chrome.windows.getCurrent()
      setCurrentWindow(thisWindow)
    };
    setWindowState();
  }, []);
  const popupWidth = Math.min(600, (currentWindow !== null) ? currentWindow.width * 0.5 : 600);
  const popupHeight = Math.min(600, (currentWindow !== null) ? currentWindow.height * 0.5 : 600);
  return (
    <div style={{ width: popupWidth, height: popupHeight, backgroundColor: purple, display: "flex", flexDirection: "column" }}>
      <Banner />
      <Table />
    </div>
  );
}
