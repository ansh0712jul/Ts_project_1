const getUserName = document.getElementById('username') as HTMLInputElement;
const formSubmit = document.getElementById('form') as HTMLFormElement;

const main_container = document.querySelector('.main-container') as HTMLElement;

interface User {
    id : number;
    login : string;
    avatar_url : string;

  
}

function cardUi(user : User) {
    const { id , login  , avatar_url  } = user;
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

async function myCustomFetch<T>(url : string , options? : RequestInit) : Promise<T>{
    const response = await fetch(url , options);

    if(!response.ok){
        throw new Error(`HTTP error! status : ${response.status}`);
    }

    const data = response.json();
    console.log(data);
    
    return data;

}

function fetchUserData(url : string) {
    myCustomFetch<User[]>(url , {}).then((userData) =>{
        userData.forEach((user) => {
            cardUi(user);
        })
    })
}

fetchUserData('https://api.github.com/users')