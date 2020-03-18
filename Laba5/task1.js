class person {
  constructor(name, surname, gender, birthday) {
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    this.birthday = birthday;
  }
  convert(data) {
    var data = "" + data;
    data = data.toUpperCase();
    var Vowels = "AEIOU",
      Consonant = "BCDFGHJKLMNPQRSTVWXYZ",
      result = "",
      consonant = "",
      vowels = "";

    //Шукаємо голосні та приголосні букви
    for (let i = 0; i < data.length; i++) {
      if (Consonant.indexOf(data[i]) != -1) {
        consonant += data[i];
      } else if (Vowels.indexOf(data[i]) != -1) {
        vowels += data[i];
      }
    }

    if (data.length >= 3) {
      if (consonant.length > 3) {
        result = consonant[0] + consonant[2] + consonant[3];
      } else if (consonant.length == 3) {
        result = consonant;
      } else {
        result = consonant + vowels;
        result = result.substring(0, 3);
      }
    } else {
      result = data + "XXX";
      result = result.substring(0, 3);
    }
    return result;
  }

  get code() {
    let birthday_day = this.birthday.split("/")[0],
      birthday_month = this.birthday.split("/")[1],
      birthday_year = this.birthday.split("/")[2];
    const months = {
      "1": "A",
      "2": "B",
      "3": "C",
      "4": "D",
      "5": "E",
      "6": "H",
      "7": "L",
      "8": "M",
      "9": "P",
      "10": "R",
      "11": "S",
      "12": "T"
    };
    let day = "";
    if (this.gender == "M") {
      if (birthday_day < 10) {
        day = "0" + birthday_day;
      } else {
        day = birthday_day;
      }
    } else {
      day = 40 + Number(birthday_day);
    }

    let result =
      this.convert(this.surname) +
      this.convert(this.name) +
      birthday_year[2] +
      birthday_year[3] +
      months[birthday_month] +
      day;

    return result;
  }
}

function start() {
  var first = new person("Matt", "Edabit", "M", "1/1/1900"),
    second = new person("Helen", "Yu", "F", "1/12/1950");
  console.log(first.code);
  console.log(second.code);
}
start();
