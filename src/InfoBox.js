//componentul ce reprezinta tab-urile in care sunt reprezentate cazurile din ultimile 24 ore

import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";//componente Material.UI
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  console.log(title, active);
  return (
    //Card, reprezinta un component din material.ui utilizat pentru generarea unui container in care vom plasa datele corespunzatoare
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} în Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
