# Country Highlight with React and Leaflet
This project is a sample application built with React 19 and React-Leaflet.
It displays a world map, and when you select a country from a dropdown list, that country is highlighted in red on the map.

## Data Source
The administrative boundaries dataset was downloaded from the following site:
It is open data, free for commercial use and redistribution.

World Administrative Boundaries - Opendatasoft
https://public.opendatasoft.com/explore/dataset/world-administrative-boundaries/map/?location=6,1.25234,32.4646&basemap=jawg.light

## File structure and roles
`public/world-administrative-boundaries.geojson`
Contains global administrative boundaries data.

GeoJSON format with properties such as iso3, name, continent per country.

Example:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "iso3": "UGA",
        "name": "Uganda",
        "continent": "Africa"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": []
      }
    }
  ]
}
```

### src/App.tsx
Loads GeoJSON data via fetch('/world-administrative-boundaries.geojson').

When a country (iso3 code) is selected in the dropdown, the GeoJSON layer re-renders.

Map is composed of MapContainer, TileLayer, and GeoJSON components.

Country polygons are styled by the style function, which highlights the selected country (fillColor: 'red').

### Handling GeoJSON
Pass FeatureCollection data to <GeoJSON data={...} /> from react-leaflet.

Use the style function to freely set fill color, stroke width, etc., per country polygon.

Placing the file in public/ allows direct reference during Vite builds. 

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
