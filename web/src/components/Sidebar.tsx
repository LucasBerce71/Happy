import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useHistory } from "react-router-dom";

import mapMarkerImg from "../images/map-marker.svg";

import "../styles/components/sidebar.css";

export default function Sidebar() {
  const { goBack } = useHistory();

  const [theme, setTheme] = useState<any>(localStorage.getItem("@Happy:theme"));

  useEffect(() => {
    if (theme === "" || theme === null || theme === undefined) {
      setTheme("light");
    }
  }, [theme]);


  return (
    <aside 
      className="app-sidebar"
      style={{
        background: theme === 'dark' ? '#2c3e50' : ''
      }}
    >
      <img src={mapMarkerImg} alt="Happy" />
      <footer>
        <button 
          type="button" 
          onClick={goBack}
          style={{
            background: theme === 'dark' ? '#34495e' : ''
          }}
        >
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
