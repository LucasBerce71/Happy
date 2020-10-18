import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  FiPlus,
  FiArrowRight,
  FiArrowLeft,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import mapMarkerImg from "../images/map-marker.svg";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import "../styles/pages/orphanages-map.css";
import { showToastr } from "../components/Toastr";
import { toast } from "react-toastify";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

interface ThemeData {
  theme: string;
}

function OrphanagesMap() {
  const { goBack } = useHistory();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [theme, setTheme] = useState<any>(localStorage.getItem("@Happy:theme"));

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  useEffect(() => {
    if (theme === "" || theme === null || theme === undefined) {
      setTheme("light");
    }
  }, [theme]);

  return (
    <div id="page-map">
      <aside
        style={{
          background: theme === "dark" ? "#34495e" : "",
        }}
      >
        <header>
          <img src={mapMarkerImg} alt="Happy" className="iconMap" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Carapicuíba</strong>
          <span>São Paulo</span>
        </footer>

        <div className="returnHome">
          <Link to="/">
            <button
              type="button"
              style={{
                background: theme === "dark" ? "#2c3e50" : "",
              }}
            >
              <FiArrowLeft size={24} color="#FFF" />
            </button>
          </Link>
        </div>
      </aside>

      <Map
        center={[-23.5259078, -46.8429901]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/${theme}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages?.map((orphanage: Orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </Map>

      <Link
        to="/orphanages/create"
        className="create-orphanage"
        style={{
          background: theme === "dark" ? "#34495e" : "",
        }}
      >
        <FiPlus size={32} color="#FFF" />
      </Link>

      <div
        id="lightTheme"
        style={{
          opacity: theme === "dark" ? 0.4 : 1,
          transform: theme === "light" ? "scale(1.4, 1.4)" : "scale(1, 1)",
          cursor: theme === "light" ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          setTheme("light");
          localStorage.setItem("@Happy:theme", "light");
          if (theme === "light") {
            showToastr(
              "Você já está no modo claro",
              "error",
              toast.POSITION.TOP_LEFT
            );
          } else if (theme === "dark") {
            showToastr(
              "Parabéns, agora você mudou para o tema claro",
              "success",
              toast.POSITION.TOP_LEFT
            );
          } else {
            showToastr(
              "Não foi possível trocar o tema do sistema, tente novamente!",
              "warnning",
              toast.POSITION.TOP_LEFT
            );
          }
        }}
      >
        <FiSun size={32} color="#f1c40f" />
      </div>

      <div
        id="darkTheme"
        style={{
          opacity: theme === "light" ? 0.4 : 1,
          transform: theme === "dark" ? "scale(1.4, 1.4)" : "scale(1, 1)",
          cursor: theme === "dark" ? "not-allowed" : "pointer",
        }}
        onClick={() => {
          setTheme("dark");
          localStorage.setItem("@Happy:theme", "dark");
          if (theme === "dark") {
            showToastr(
              "Você já está no modo escuro",
              "error",
              toast.POSITION.TOP_LEFT
            );
          } else if (theme === "light") {
            showToastr(
              "Parabéns, agora você mudou para o tema escuro",
              "success",
              toast.POSITION.TOP_LEFT
            );
          } else {
            showToastr(
              "Não foi possível trocar o tema do sistema, tente novamente!",
              "warnning",
              toast.POSITION.TOP_LEFT
            );
          }
        }}
      >
        <FiMoon size={26} color="#f1c40f" />
      </div>
    </div>
  );
}

export default OrphanagesMap;
