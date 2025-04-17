const axios = require('axios');

async function getUserSub(req) {
    return "auth0|67fcf7924101bf433808862c"
    try {
        const response = await axios.get(process.env.AUTH0_BASEURL + 'userinfo/', {
            headers: {
                authorization: req.headers.authorization
            }
        });
        const userinfo = response.data;
        return userinfo.sub;
    } catch (e) {
        console.error(e);
        return null;
    }
}


module.exports = { getUserSub };
