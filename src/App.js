import React from 'react';
import './App.css';
import GeoPattern from 'geopattern';
import randomColor from 'randomcolor';

function App() {
  const color = randomColor();
  const d = new Date();
  const n = d.getTime();
  const pattern = GeoPattern.generate(`${n}`, {
    color,
  });
  return (
    <div className="App">
      <div
        className="bg"
        style={{ backgroundImage: `url(${pattern.toDataUri()})` }}
      />
      <div className="deets">
        <h1 style={{ color }}>
          David Henderson <br />
          Web Developer
        </h1>
        <p>
          I create awesome products with Javascript, HTML and CSS. Currently
          living a breathing React at kaboodle. Don't be a stranger! Get in
          touch here.
        </p>
      </div>
    </div>
  );
}

export default App;
