 export function getAddress ({ location }) {

    let addressUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='
    let addressApiKey = 'AIzaSyB6Z2NkBsHpJEFYE2kH_uFw7-5hBZiaWk8'

    $.ajax({
        url: `${addressUrl}${location.lat},${location.lng}&key=${addressApiKey}`,
        type: "get"
    }).done( ({ results }) => {
        // console.log(results[0].formatted_address)
    })
 }
