var preloader = document.getElementById("preloader");
var container_images = document.getElementById("container_images");
var container_big_image = document.getElementById("container_big_image");
var expandIMG = document.createElement("img");
var button = document.createElement("span");

var list = [
  "images/preloader.svg",
  "images/img1.jpg",
  "images/img2.jpg",
  "images/img3.jpg",
  "images/img4.jpg",
  "images/img5.jpg",
  "images/img6.jpg",
  "images/img7.jpg",
  "images/img8.jpg",
];

function show_gallery() {
  for (let i = 1; i < list.length; i++) {
    let image = document.createElement("img");
    image.src = list[i];
    image.style.width = "100%";

    let div = document.createElement("div");
    div.className = "column";

    div.append(image);
    container_images.append(div);

    image.onclick = () => {
      button.className = "closebtn";
      button.innerHTML = "×";
      container_big_image.append(button);
      button.onclick = () => {
        button.parentElement.style.display = "none";
      };

      expandIMG.src = image.src;
      expandIMG.style.width = "100%";
      container_big_image.append(expandIMG);
      expandIMG.parentElement.style.display = "block";
    };
  }
}

function close_preloader(el) {
  el.style.opacity = 1;
  let timerId = setInterval(() => {
    el.style.opacity = el.style.opacity - 0.05;
    if (el.style.opacity <= 0.05) {
      clearInterval(timerId);
      preloader.style.display = "none";
    }
  }, 16);
}

document.body.onload = function () {
  //Через 2 секунди ховає прелоадер
  setTimeout(() => {
    close_preloader(preloader);
  }, 2000);
};

show_gallery();
