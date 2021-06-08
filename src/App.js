import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  //Selectam, la initializarea aplicatiei, informatia despre toate cazurile de covid din toata lumea
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);//utilizam hook-ul setState pentru initializarea datelor pentru harta globala
      });
  }, []);

  //initializam datele covid pentru fiecare tara , dar initial, extragem datele prin fetch la lansare aplicatiei
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //initializarea vectorului de obiecte ce va contine fiecare tara, cu proprietatile necesare (denumirea si informatia ISO2)
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          //sortam informatia primita in urma fetch-ului in baza numarului de cazuri, va fi utilizata la containerul cu Cazuri Live Worldwide
          let sortedData = sortData(data);
          //initializam tarile obtinute din fetch
          setCountries(countries);
          //setam starea pentru harta tarilor 
          setMapCountries(data);
          //setam datele pentru tabelul de date ce contine informatia globala despre cazuri
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  console.log(casesType);

  //eveniment, la modificarea tarii din select
  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    /*in urma selectarii unei anumite tari, are loc fetching-ul de date specifice pentru tara respectiva catre API-ul nostru `disease.sh`
    ulterior, in urma raspunsului primit, vom prelucra JSON-ul pentru initializarea starilor tuturor componentelor ce vor raspunde de: initializarea informatiei despre tara,
    despre cazurile de covid ale acesteia, transmiterea coordonatelor pentru componentul de tip `chart` care va arata tara respectiva si initializarea zooming-ului
    pentru vizualizarea hartii tarii
    */
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  //componentul App, fiind componentul `mama` al aplicatiei, va returna pagina principala, cu toate subcomponentele ce le contine
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Vizualitati cazurile COVID-19</h1>
          {/*Crearea dropdown-ului ce contine toate tarile lumii */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}//in urma selectarii unei tari, va avea loc re-rendering-ul informatiei pe pagina
            >
              <MenuItem value="worldwide">Intreaga lume</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/*infobox privind cazurile active*/}
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Cazurile de Coronavirus in ultimile 24h"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
           {/*infobox privind cazurile recuperate*/}
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recuperati(24h)"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
           {/*infobox privind cazurile de deces*/}
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Decedati(24h)"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        {/*Componentul `Map`, reprezinta harta reprezentata in pagina, care are urmatoarele proprietati:
          -
        */}
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      {/*Cardul ce contine toata informatia legata de cazurile live per Tara */}
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Cazuri Live per fiecare Țară</h3>
            <Table countries={tableData} />
            <h3>Worldwide Global {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
