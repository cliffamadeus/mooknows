class LeafletMap {
    // Constructor to initialize the Leaflet map
    constructor(containerId, center, zoom) {
        // Create the map instance and set its view to the given coordinates and zoom level
        this.map = L.map(containerId).setView(center, zoom);
        // Initialize the tile layer for the map
        this.initTileLayer();
        // Display lat/long on map click
        this.displayLatLong();
    }

    // Method to initialize the tile layer using OpenStreetMap tiles
    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19, // Set the maximum zoom level
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' // Attribution for tile data
        }).addTo(this.map); // Add the tile layer to the map
    }

    // Method to add a marker to the map
    addMarker(lat, lng, message) {
        // Create a marker at the specified latitude and longitude
        const marker = L.marker([lat, lng]).addTo(this.map);
        // Bind a popup to the marker that displays the message
        marker.bindPopup(message);
    }

    // Method to load markers from a JSON file
    loadMarkersFromJson(url) {
        // Fetch the JSON data from the given URL
        fetch(url)
            .then(response => response.json()) // Parse the JSON response
            .then(data => {
                // Iterate over each marker in the data
                data.forEach(marker => {
                    // Add each marker to the map using its latitude, longitude, and message
                    this.addMarker(marker.latitude, marker.longitude, marker.name);
                });
            })
            .catch(error => console.error('Error loading markers:', error)); // Log any errors that occur
    }

    // Method to display latitude and longitude on click
    displayLatLong() {
        this.map.on('click', (e) => {
            // Get the latitude and longitude of the clicked location
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            // Create a tooltip with the lat/long information
            const tooltip = L.tooltip({
                permanent: false,
                direction: 'top'
            })
                .setLatLng([lat, lng]) // Position the tooltip at the clicked location
                .setContent(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`) // Display the lat/lng with 5 decimal places
                .addTo(this.map); // Add the tooltip to the map
        });
    }
}

// Create an instance of LeafletMap with specified container ID, center coordinates, and zoom level
const myMap = new LeafletMap('map', [8.360004, 124.868419], 18);

// Load markers from an external JSON file
myMap.loadMarkersFromJson('pins.json');
