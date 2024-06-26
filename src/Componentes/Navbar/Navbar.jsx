import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { my_styles } from "../../my_styles";
import {
  navLinks,
  navLinksIcons,
  misApellidos,
  miNombre,
} from "../../constantes.js";
import { logo, menu, close } from "../../assets/imgs";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reachedHero, setreachedHero] = useState(false);

  const handleLinkClick = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 100); // Retraso de 100ms antes de realizar el desplazamiento
  };


  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = section.offsetTop - 78; // Calcula la posición 78px antes del inicio de la sección
      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });
    }
  };

  const handleClick = (elementId, device) => {
    if (device == "movil") {
      setToggle(!toggle);
    }
    setActive(elementId);
    scrollToSection(elementId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      const heroOffsetTop =
        document.getElementById("hero_container")?.offsetTop || 0;
      const navbarHeight = document.querySelector("nav")?.clientHeight || 0;
      /*const windowHeight = window.innerHeight;*/

      if (scrollTop + navbarHeight > heroOffsetTop) {
        setreachedHero(true);
      } else {
        setreachedHero(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        my_styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      } ${reachedHero ? "bg-[#161455]" : ""}`}
    >
      <div className="w-full flex justify-between items-center  mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleLinkClick}
        >
          <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            {miNombre} &nbsp;
            <span className="sm:block hidden"> {misApellidos}</span>
          </p>
        </Link>

        <ul className="list-none hidden sm:flex flex-row gap-4">
          {navLinksIcons.map((nav) => (
            <li
              key={nav.id}
              className={`cursor-pointer`}
              onClick={() => handleClick(nav.id, "desktop")}
            >
              <img
                className={`${
                  active === nav.id ? "w-[40px] h-[40px]" : "w-[35px] h-[35px]"
                } rounded-full`}
                src={nav.icon}
                alt={nav.id}
              />
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)} 
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl bg-[#ec4104]`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.id ? "text-white" : "text-white"
                  }`}
                  onClick={() => handleClick(nav.id, "movil")}
                >
                  {nav.id}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
