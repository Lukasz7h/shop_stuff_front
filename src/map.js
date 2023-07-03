
export function setMap()
{
    L.mapquest.key = 'ck2OXUAJsF0iz999XGQ62jyXo8AXOVp7';

    L.mapquest.map('map', {
        center: [52, 21],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
    });
};

export function setNav(store)
{
    if(!store) return;

    if(navigator) navigator.geolocation.getCurrentPosition( async(data) => {
        const lat = data.coords.latitude;
        const lon = data.coords.longitude;

        var url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+lat+'&longitude='+lon+'&localityLanguage=pl';

        const res = (await fetch(url)).json();

        res.then((data) => {
            L.mapquest.directions().route({
                start: [lat, lon],
                end: ''+data.city+','+ store+''
            });
        });
    });

};