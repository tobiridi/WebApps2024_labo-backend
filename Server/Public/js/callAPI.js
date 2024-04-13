const pathname = document.location.pathname;
console.log(pathname);

const callAPI = async (resource, httpMethod, data = null, headers = null) => {
    const apiURL = `http://localhost:8080/api/v1${resource}`;

    httpMethod = httpMethod.toUpperCase();

    if (!headers) {
        headers = {
            'Content-Type': 'application/json'
        };
    }

    let options = {
        headers: headers,
        method: httpMethod
    };

    if (httpMethod !== 'GET' && httpMethod !== 'HEAD' && data !== null) {
        options.body = JSON.stringify(data);
    }
    
    // if (httpMethod === 'DELETE') {
    //     return await fetch(apiURL, options);
    // }

    return await fetch(apiURL, options);
};

const register = () => {
    const form = document.forms[0];
    const messageSection = document.getElementsByClassName('message').item(0);
    const lastname = document.getElementById('lastname');
    const firstname = document.getElementById('firstname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();

        const data = {
            email: email.value,
            password: password.value,
            firstname: firstname.value,
            lastname: lastname.value,
        };

        const apiResponse = await callAPI('/user', 'POST', data, null);

        const p = document.createElement('p');
        if (apiResponse.ok && apiResponse.status === 201) {
            p.textContent = 'Votre inscription a bien été effectuée.';
        }
        else {
            p.textContent = 'Une erreur est survenue lors de votre inscription.';
        }

        messageSection.appendChild(p);
        messageSection.classList.remove('hidden');
    });
};


switch (pathname) {
    case '/register': register();
        break;

    default: console.log('path unknow !');
        break;
}