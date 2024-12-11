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