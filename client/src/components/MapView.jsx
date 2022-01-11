import React, {useState, useEffect} from 'react'
import {MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import {OpenStreetMapProvider} from 'leaflet-geosearch'
import L from 'leaflet'
import s from './styles/MapView.module.css'
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const LocationMarker = ({position}) => {
  const map= useMap()
  map.flyTo([position.lat, position.lng], 15)
  const markerMove= (e)=> {
    e.preventDefault()
  }
  // draggable={true} autoPan={true}
  return position.lat === 0 && position.lng === 0 ? null : (
    <Marker position={[position.lat, position.lng]} >
      <Popup>You are here</Popup>
    </Marker>
  )
}


function MapView({details}) {
  const [geosearch, setGeosearch] = useState("")
  const [detail, setDetail] = useState(details)
  const [cityInfo, setCityInfo] = useState("")
  const [positions, setPositions] = useState({
      lat: 19.3910038,
      lng: -99.2837001,
  })
  
  const provider= new OpenStreetMapProvider();
    const handleSearch= (e)=> {
        e.preventDefault();
        setGeosearch(e.target.value);
        if(e.target.value.length >= 8) {
        //Use the provider...

        provider.search({ query: geosearch }).then(res=> {
            const $positions= res[0].bounds[0]
            setPositions({lat:$positions[0], lng: $positions[1]})
            const citi= cityInfo.split(',')
            setCityInfo(res[0].label)
            setDetail(details.city= `${citi[2]}, ${citi[citi.length - 1]}`)
        })
        }
    }

    const searchCity= ()=> {
        navigator.geolocation.getCurrentPosition( function(position){
        setPositions({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        })
        setGeosearch(`${positions.lng} ${positions.lat}`)
        }, function(error){
        console.log(error)
        },
        {
            enableHighAccuracy: true
        }
        )
    }

    useEffect(() => {
        provider.search({ query: `${positions.lat} ${positions.lng}` }).then(res => {
        const citi= cityInfo.split(',')
        setCityInfo(res[0].label)
        setDetail(
            details.city= `${citi[2]}, ${citi[citi.length -1]}` 
      )
    })
}, [positions, cityInfo])

console.log('mapCiti', details.city)
  
  return (
    <div className={`${s.container_map} row`}>
      <div className={`col-lg-6 ${s.geoButton}`}>
        <p className='btn btn-info text-white' onClick={searchCity}>Mostrar ubicación actual</p>
      </div>
      <div className="col-lg-6">
        <label for="formsearch" className={s.searchText}>Busca tu ciudad:</label>
        <input type='text' className='formsearch' name='city' onChange={handleSearch} placeholder='Ingresa tu ciudad'/>
      </div>
      <MapContainer center={[positions.lat, positions.lng]} zoom={15} scrollWheelZoom={false} >
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <LocationMarker position={positions}/>
      </MapContainer>
    </div>
  )
}

export default MapView
