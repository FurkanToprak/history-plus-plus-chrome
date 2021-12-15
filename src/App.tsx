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
  const popupWidth = Math.min(800, (currentWindow !== null) ? currentWindow.width * 0.5 : 300);
  return (
    <div style={{ width: popupWidth, height: "100%", backgroundColor: purple }}>
      <Banner />
      <Table />
    </div>
  );
}
