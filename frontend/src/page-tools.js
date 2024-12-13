export const CheckUserLS = () => {
  let userArr //Normaal formaat: ["gebruikers naam", "wachtwoord", id, niveau]
  try{
    userArr = JSON.parse(sessionStorage.getItem("user"))
    if(userArr.length != 4){
      throw new Error("Session storage niet in juiste fomaat.")
    }
  }catch{
    document.location = "/login"
  }
  return userArr
}

export async function getData(url, body=null, method="get") {
    try {
      const response = await fetch(url,{method: method, body: body})
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return json;
  } catch (error) {
    console.error(error.message);
  }
}
