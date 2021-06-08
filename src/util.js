import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

//Obiectul ce contine culorile in dependenta de tipul cazurilor, va fi utilizat pentru generarea cercurilor
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    rgb: "rgb(125, 215, 29)",
    half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    rgb: "rgb(251, 68, 67)",
    half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};
//Sortarea datelor in dependenta de cazuri
export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

/*Functia data are ca scop reprezentarea cercurilor care indica prezenta cazurilor per tara, 
Functia primeste doua argumente: obiectul `data` care reprezinta JSON-ul cu informatii, si `casesType`, care indica tipul de cazuri, valoarea implicita fiind `cases`
intrucat la initializarea aplicatiei, se vor genera datele globale*/
export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    //Circle reprezinta un component din biblioteca Leaflet care va genera un cerc
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}//centrul cercului setat pe coordonatele tarii
      color={casesTypeColors[casesType].hex}//culoarea in dependenta de cazuri
      fillColor={casesTypeColors[casesType].hex}//setam fill color
      fillOpacity={0.4}//transparenta cercului
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      {/*Popup reprezinta componenta care va genera un pop-up cand plasam click-ul deasupra cercului pe harta.
      Popup-ul va reprezenta: flagul tarii, denumirea, cazurile active, recuperari si decese */}
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cazuri active: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recuperati: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Decese: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
