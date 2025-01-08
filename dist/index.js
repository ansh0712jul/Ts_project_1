"use strict";
const getUserName = document.getElementById('username');
const formSubmit = document.getElementById('form');
const main_container = document.querySelector('.main-container');
function cardUi(user) {
    const { id, login, avatar_url } = user;
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.id}" />
        <div class="card-info">
            <h2>${user.login.toUpperCase()}</h2>

        </div>

    `;
    main_container.appendChild(card);
}
async function myCustomFetch(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status : ${response.status}`);
    }
    const data = response.json();
    console.log(data);
    return data;
}
function fetchUserData(url) {
    myCustomFetch(url, {}).then((userData) => {
        userData.forEach((user) => {
            cardUi(user);
        });
    });
}
fetchUserData('https://api.github.com/users');
