import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import "../styles/pages/orphanage.css";

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

export default function Orphanage() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [theme, setTheme] = useState<any>(localStorage.getItem("@Happy:theme"));

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  useEffect(() => {
    if (theme === "" || theme === null || theme === undefined) {
      setTheme("dark");
    }
  }, [theme]);

  useEffect(() => {
    api.get("orphanages").then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div
      id="page-orphanage"
      style={{
        background: theme === "dark" ? "#34495e" : "",
      }}
    >
      <Sidebar />
      <main>
        <div
          className="orphanage-details"
          style={{
            background: theme === "dark" ? "#708090" : "",
            border: theme === "dark" ? "none" : "",
          }}
        >
          <img
            src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
            alt="Lar das meninas"
          />

          <div className="images">
            <button className="active" type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
            <button type="button">
              <img
                src="https://www.gcd.com.br/wp-content/uploads/2020/08/safe_image.jpg"
                alt="Lar das meninas"
              />
            </button>
          </div>

          <div className="orphanage-details-content">
            <h1
              style={{
                color: theme === "dark" ? "#000" : "",
              }}
            >
              Lar das meninas
            </h1>
            <p
              style={{
                color: theme === "dark" ? "#000" : "",
              }}
            >
              Presta assistência a crianças de 06 a 15 anos que se encontre em
              situação de risco e/ou vulnerabilidade social.
            </p>

            <div
              className="map-container"
              style={{
                background: theme === "dark" ? "#34495e" : "",
              }}
            >
              <Map
                center={[-23.5259078, -46.8429901]}
                style={{ width: "100%", height: 280 }}
                zoom={15}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/${theme}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[-23.5259078, -46.8429901]}
                />
              </Map>

              <footer>
                <a
                  href="https://www.google.com/error"
                  target="_blank"
                  style={{
                    color: theme === "dark" ? "#FFF" : "",
                    fontWeight: "bold",
                  }}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2
              style={{
                color: theme === "dark" ? "#000" : "",
              }}
            >
              Instruções para visita
            </h2>
            <p
              style={{
                color: theme === "dark" ? "#000" : "",
              }}
            >
              Venha como se sentir mais à vontade e traga muito amor para dar.
            </p>

            <div className="open-details">
              <div 
                className="hour"
                style={{
                  background: theme === 'dark' ? '#34495e' : '',
                  borderColor: theme === 'dark' ? '#34495e' : '',
                  color: theme === 'dark' ? '#f1c40f' : ''
                }}
              >
                <FiClock 
                  size={32} 
                  color={theme === 'light' ? "#15B6D6" : '#f1c40f'} />
                Segunda à Sexta <br />
                8h às 18h
              </div>
              <div 
                className="open-on-weekends"
                style={{
                  background: theme === 'dark' ? '#34495e' : '',
                  borderColor: theme === 'dark' ? '#34495e' : '',
                  color: theme === 'dark' ? '#f1c40f' : ''
                }}
              >
                <FiInfo 
                  size={32} 
                  color={theme === 'light' ? "#39CC83" : '#f1c40f'} 
                />
                
                Atendemos <br />
                fim de semana
              </div>
            </div>

            <button 
              type="button" 
              className="contact-button"
              style={{
                background: theme === 'dark' ? '#2E8B57' : '',
                outline: 0
              }}
            >
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
