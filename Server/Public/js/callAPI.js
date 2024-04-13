const pathname = document.location.pathname;
console.log(pathname);

const getCookie = (cookieName) => {
    let name = `${cookieName}=`;
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}

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

        try {
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

        } catch (error) {
            console.error(error.message);
        }
    });
};

const login = () => {
    const form = document.forms[0];
    const messageSection = document.getElementsByClassName('message').item(0);
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    form.addEventListener('submit', async (ev) => {
        ev.preventDefault();

        const data = {
            email: email.value,
            password: password.value,
        };

        try {
            const apiResponse = await callAPI('/user/login', 'POST', data, null);

            if (apiResponse.ok && apiResponse.status === 200) {
                const jsonResponse = await apiResponse.json();
                console.log(jsonResponse);
                
                //store jwt token in cookie
                let expires = new Date();
                expires.setTime(expires.getTime() + (1000 * 60 * 60)); //expires 1 hour
                document.cookie = `access_token=${jsonResponse.data.token}; expires=${expires}; path=/;`;
                document.cookie = `user_id=${jsonResponse.data.userId}; expires=${expires}; path=/;`;
                
                //redirect to profile page
                document.location.href = `${document.location.origin}/profile`;
            }
            else {
                const p = document.createElement('p');
                p.textContent = 'Email ou mot de passe invalide.';
                messageSection.appendChild(p);
                messageSection.classList.remove('hidden');
            }
    
        } catch (error) {
            console.error(error.message);
        }
    });
};

const getUserData = async () => {
    try {
        //get user_id from cookies
        const userId = getCookie('user_id');
        //get access_token from cookies
        const jwtToken = getCookie('access_token');

        if(userId) {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            };

            const apiResponse = await callAPI(`/user/${userId}`, 'GET', null, headers);
            //console.log(apiResponse);
    
            if (apiResponse.ok && apiResponse.status === 200) {
                const jsonResponse = await apiResponse.json();
                return jsonResponse.data;
            }
            else {
                return null;
            }
        }
        else {
            //redirect to login page
            document.location.href = `${document.location.origin}/login`;
        }
    } catch (error) {
        console.error(error.message);
    }
};

//TODO: not done
const profile = async () => {
    const form = document.forms[0];
    const messageSection = document.getElementsByClassName('message').item(0);

    try {
        const data = await getUserData();
        console.log(data);

        form.addEventListener('submit', async (ev) => {
            ev.preventDefault();


            // const data = {
            //     email: email.value,
            //     password: password.value,
            // };

            // const apiResponse = await callAPI('/user/login', 'POST', data, null);

            // if (apiResponse.ok && apiResponse.status === 200) {
            //     const jsonResponse = await apiResponse.json();
            //     //console.log(jsonResponse);
                
            //     //store jwt token in cookie
            //     let expires = new Date();
            //     expires.setTime(expires.getTime() + (1000 * 60 * 60)); //expires 1 hour
            //     document.cookie = `access_token=${jsonResponse.data.token}; expires=${expires}; path=/;`;
                
            //     //redirect to profile page
            //     document.location.href = `${document.location.origin}/profile`;
            // }
            // else {
            //     const p = document.createElement('p');
            //     p.textContent = 'Email ou mot de passe invalide.';
            //     messageSection.appendChild(p);
            //     messageSection.classList.remove('hidden');
            // }
        });
    } catch (error) {
        console.error(error.message);
    }
};

switch (pathname) {
    case '/register': register();
        break;
    case '/login': login();
        break;
    case '/profile': profile();
        break;

    default: console.log('path unknow !');
        break;
}