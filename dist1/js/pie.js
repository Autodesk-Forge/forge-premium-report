/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////
window.addEventListener('load', setup);
async function setup() {
  const ctx = document.getElementById('myChart1').getContext('2d');
  const dataTemps = await getData();
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: dataTemps.team_alias,
      datasets: [
        {
          label: ' Team_alias',
          data: dataTemps.seat_quantity,
          fill: false,
          borderColor: dataTemps.border_color,
          backgroundColor: dataTemps.background_color,
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: false
    }
  });
}
async function getData() {
  // const response = await fetch('testdata.csv');
  const response = await fetch('all.csv');
  const data = await response.text();
  const team_alias = [];
  const seat_quantity = [];
  const background_color = [];
  const border_color = [];
  var x;
  const rows = data.split('\n').slice(1);
  var lines = data.split("\n").length;
  console.log(lines);
  rows.forEach(row => {
    const cols = row.split(',');
    team_alias.push(cols[0]);
    seat_quantity.push(cols[9]);
  });
  for (x = 0; x < 99; x++) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    background_color.push('rgba(' + r + ',' + g + ',' + b + ',0.2)');
    border_color.push('rgba(' + r + ',' + g + ',' + b + ',1)');
  }
  return { team_alias, seat_quantity, background_color, border_color };
}