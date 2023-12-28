function generateRandomString(length=32) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890-";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }

  // Append the current timestamp at the end of the string
  result += Date.now();

  return result;
}




module.exports={
  generateRandomString
}