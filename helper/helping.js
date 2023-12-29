

function generateRandomString(length=20) {
  const letters = "abcdefghijklmnopqrstuvwxyz1234567890";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * letters.length);
    randomString += letters.charAt(randomIndex);
  }

  const now = new Date();
  const dateString = now.toISOString().replace(/[^0-9]/g, "");
const random=randomString+dateString
  return random
}








module.exports={
  generateRandomString
}