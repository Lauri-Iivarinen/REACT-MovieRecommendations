//import {} from 'dotenv/config'

//hidden with gitignore during production
function getCreds() {
    var api_key = process.env.REACT_APP_API_KEY;
    return api_key
}

export default getCreds