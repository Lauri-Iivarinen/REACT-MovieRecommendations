

//hidden with gitignore during production
function getCreds() {
    var api_key = process.env.tmdb;
    return api_key
}

export default getCreds