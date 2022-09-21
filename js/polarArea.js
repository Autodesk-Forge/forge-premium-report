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
      const ctx = document.getElementById('myChart2').getContext('2d');
      const dataTemps = await getData();
      const myChart2 = new Chart(ctx, {
        type: 'polarArea',
        data: {
          labels: dataTemps.team_alias,
          datasets: [
            {
              label: ' Team_alias',
              data: dataTemps.seat_quantity,
              fill: false,
              borderColor: 'rgba(0,0,0,0)',
              backgroundColor: 'rgba(75,192,192)',
              borderWidth: 3
            }
          ]
        },
        options: {
          responsive:false,
          plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Scatter Chart'
    }
  }
        }
      });
    }
      async function getData() {
      // const response = await fetch('testdata.csv');
      const response = await fetch('all.csv');
      const data = await response.text();
      const team_alias = [];
      const seat_quantity = [];
      const rows = data.split('\n').slice(1);
      rows.forEach(row => {
        const cols = row.split(',');
        team_alias.push(cols[0]);
        seat_quantity.push(cols[9]);
      });
      return { team_alias, seat_quantity };   
    }
  