const regex = {}

regex.letters = "/^[a-zA-Z]+$/";
regex.numbers = "^[0-9]*$";
regex.photos = "/\.(jpg|png|gif)$/i";
regex.password = "^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{5,8}$";
regex.email = "^[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";

module.exports = regex;