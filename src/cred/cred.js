

//hidden with gitignore during production
function getCreds() {
    var api_key = process.env.API_KEY;
    return api_key
}

export default getCreds