import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FiArrowRight, FiSun, FiMoon } from "react-icons/fi";

import "../styles/pages/landing.css";

import logoImg from "../images/logo.svg";
import { showToastr } from "../components/Toastr";
import { toast } from "react-toastify";

function Landing() {
  const [theme, setTheme] = useState<any>(localStorage.getItem('@Happy:theme'));

  useEffect(() => {
    showToastr("Seja bem vindo ao Happy", "success", toast.POSITION.TOP_LEFT);
  }, []);

  useEffect(() => {
    if(theme === '' || theme === null || theme === undefined) {
      setTheme('dark');
    }
    console.log(`tema atual ${theme}`);
  }, [theme]);

  return (
    <div
      id="page-landing"
      style={{
        background: theme === "dark" ? "#34495e" : "",
      }}
    >
      <div className="content-wrapper">
        <img src={logoImg} alt="logo" />

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças</p>
        </main>

        <div className="location">
          <strong>Carapicuíba</strong>
          <span>São Paulo</span>
        </div>

        <div
          className="lightTheme"
          style={{
            opacity: theme === "dark" ? 0.4 : 1,
            transform: theme === "light" ? "scale(1.4, 1.4)" : "scale(1, 1)",
            cursor: theme === "light" ? "not-allowed" : "pointer",
          }}
          onClick={() => {
            setTheme("light");
            localStorage.setItem('@Happy:theme', 'light');
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
          <FiSun size={26} color="#f1c40f" />
        </div>

        <div
          className="darkTheme"
          style={{
            opacity: theme === "light" ? 0.4 : 1,
            transform:
              theme === "dark" ? "scale(1.4, 1.4)" : "scale(1, 1)",
            cursor: theme === "dark" ? "not-allowed" : "pointer",
          }}
          onClick={() => {
            setTheme("dark");
            localStorage.setItem('@Happy:theme', 'dark');
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

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0,0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;
