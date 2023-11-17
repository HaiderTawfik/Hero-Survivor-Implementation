var urlParams = new URLSearchParams(window.location.search);
var param1 = urlParams.get('player');
document.getElementById('player').innerHTML = `Player ${param1} died`;