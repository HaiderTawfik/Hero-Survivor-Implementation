/*
Course: SENG 513
Date October 25, 2023
Assignment 2
Name: Haider Tawfik
UCID: 30097912
*/

var urlParams = new URLSearchParams(window.location.search);
var param1 = urlParams.get('player');
document.getElementById('player').innerHTML = `Player ${param1} died`;