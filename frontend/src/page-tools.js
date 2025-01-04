export const apiURL = "http://localhost:3001/api/"

export let CheckUserLS = () => {
  let userArr//Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau, pid]
  try{
    userArr = JSON.parse(localStorage.getItem("user"))
    if(userArr.length != 5){
      throw new Error("Session storage niet in juiste fomaat.")
    }
  }catch{
    console.log("foute localstorage indeling")
  }
  return userArr || ["","",0,2,0]
}

export let getData = async (url, body=null, method="get") => {
    try {
      const response = await fetch(url,{method: method, body: body, headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },})
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      if(response.headers.get("content-type").indexOf("application/json") !== -1){
        return await response.json();
      }else{
        return await response.text();
      }
      
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export default [apiURL, CheckUserLS, getData]
