"use strict";
const fetchPing = async () => {
    try {
        const response = await fetch('/api/ping');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('ping-res-cont').style.display = 'block';
        document.getElementById('clear-ping-btn').textContent = 'clear';
        setTimeout(() => {
            document.getElementById('ping-res-cont-code').textContent = JSON.stringify(data, null, 2);
        }, 300);
    }
    catch (error) {
        console.error('Error fetching API data:', error);
        document.getElementById('ping-res-cont-code').textContent = 'Error fetching API data';
    }
};
const clearPing = async () => {
    setTimeout(() => {
        document.getElementById('ping-res-cont').style.display = 'none';
        document.getElementById('clear-ping-btn').textContent = '';
    }, 300);
    document.getElementById('ping-res-cont-code').textContent = '';
};
window.addEventListener('DOMContentLoaded', () => {
    const getPingButton = document.getElementById('get-ping');
    const getPingResCont = document.getElementById('ping-res-cont');
    const getClearPingButton = document.getElementById('clear-ping-btn');
    if (getPingResCont) {
        document.getElementById('ping-res-cont').style.display = 'none';
    }
    if (getPingButton) {
        getPingButton.onclick = () => fetchPing();
    }
    else {
        console.log('Button not found');
    }
    if (getClearPingButton) {
        getClearPingButton.onclick = () => clearPing();
    }
    else {
        console.log('Button not found');
    }
});
//# sourceMappingURL=fetchPing.js.map