<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />

import React, { useEffect, useState } from 'react'
import './Map.css'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'sk.eyJ1IjoiYWtpbjEyMyIsImEiOiJjbHp0am05Z2wyNm1hMnJzOG12djU0NmEzIn0.I61eXc2ZLdTpFM2X2JVPIw';
var map = new mapboxgl.Map({
  container: 'YOUR_CONTAINER_ELEMENT_ID',
  style: 'mapbox://styles/mapbox/streets-v11'
});
