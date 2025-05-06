const data = [
  { "CLASS NAME": "BARE LAND", "LOSS": 12.6486, "GAIN": 2.6613, "UNCHANGED": 0.8046, "CHANGE INDEX": -12.41275168 },
  { "CLASS NAME": "HIGH DENSITY URBAN", "LOSS": 132.7437, "GAIN": 134.1684, "UNCHANGED": 80.451, "CHANGE INDEX": 0.017708916 },
  { "CLASS NAME": "LOW DENSITY URBAN", "LOSS": 124.8444, "GAIN": 152.7642, "UNCHANGED": 66.735, "CHANGE INDEX": 0.418368173 },
  { "CLASS NAME": "SRUB", "LOSS": 66.8565, "GAIN": 67.0104, "UNCHANGED": 19.6479, "CHANGE INDEX": 0.007832898 },
  { "CLASS NAME": "VEGETATION", "LOSS": 70.7418, "GAIN": 55.2132, "UNCHANGED": 26.1009, "CHANGE INDEX": -0.594945002 },
  { "CLASS NAME": "WATERBODY", "LOSS": 20.7711, "GAIN": 16.7886, "UNCHANGED": 10.4499, "CHANGE INDEX": -0.381104125 }
];

// Populate Table
const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("data-table");

tableHead.innerHTML = `<tr>
  <th>Class Name</th>
  <th>Loss</th>
  <th>Gain</th>
  <th>Change Index</th>
  <th>Unchanged</th>
</tr>`;

tableBody.innerHTML = data.map(row => `
  <tr>
    <td>${row["CLASS NAME"]}</td>
    <td>${row.LOSS.toFixed(2)}</td>
    <td>${row.GAIN.toFixed(2)}</td>
    <td>${row["CHANGE INDEX"].toFixed(2)}</td>
    <td>${row.UNCHANGED.toFixed(2)}</td>
  </tr>
`).join("");

// Bar Chart
Plotly.newPlot('barChart', [
  {
    x: data.map(d => d["CLASS NAME"]),
    y: data.map(d => d.GAIN),
    name: 'Gain',
    type: 'bar',
    marker: { color: 'green' }
  },
  {
    x: data.map(d => d["CLASS NAME"]),
    y: data.map(d => d.LOSS),
    name: 'Loss',
    type: 'bar',
    marker: { color: 'red' }
  }
],);

// Pie Chart
function updatePieChart(valueType) {
  const values = data.map(d => valueType === "Changed"
    ? Math.abs(d.GAIN - d.LOSS)
    : d.UNCHANGED);
  const labels = data.map(d => d["CLASS NAME"]);

  Plotly.newPlot('pieChart', [{
    values: values,
    labels: labels,
    type: 'pie',
    hole: 0.4
  }], );
}

document.getElementById("valueTypeSelect").addEventListener("change", (e) => {
  updatePieChart(e.target.value);
});

// Initial render
updatePieChart("Changed");

// Dark mode toggle
document.getElementById("toggleDarkMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});











  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  