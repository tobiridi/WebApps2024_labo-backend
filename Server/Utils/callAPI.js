const callAPI = async (resource, httpMethod, data = null, headers = null) => {
    const apiURL = `http://localhost:${process.env.PORT}/api/v1${resource}`;

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
    
    if (httpMethod === 'DELETE') {
        return (await fetch(apiURL, options));
    }

    return await (await fetch(apiURL, options)).json();
};

module.exports = { callAPI };