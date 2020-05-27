var preloader = document.getElementById("preloader");

class PhotoGallery extends HTMLElement {
  constructor() {
      super()
      const div = document.createElement("div");
      const shadow = this.attachShadow({ mode: "open" });
      div.setAttribute("id", "photo-gallery");
      shadow.appendChild(div);
      const style = document.createElement("style");
      style.innerHTML = `
  #photo-gallery
  {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  #photo-gallery div
  {
    width: 500px;
    height: 500px;
    margin: 5px;
    display: flex;
    overflow: hidden;
    align-items: center;
          justify-content: center;
      }
      
  #photo-gallery div#fullscreen
  {
    position: absolute;
    height: 100%;
    width: 100%;
    transition: all .5s ease-out;
          z-index: 3;
      }
      #photo-gallery div1#fullscreen{
          position: absolute;
          filter: grayscale(100%);
          opacity: 0.33;
          z-index: 2;
      }`;
      shadow.appendChild(style);
      if (this.hasAttribute("ImageList")) {
          let piclist = this.getAttribute("ImageList").split(';');
          for (let i of piclist) {
              const element = document.createElement("div");
              element.setAttribute("onclick", "fullscreen(this)");
              const pic = document.createElement("img");
              pic.setAttribute("onerror", "this.src = 'images/error.jpg'")
              pic.setAttribute("onload", "expandeImage(this)")
              pic.setAttribute("src", i);
              element.appendChild(pic);
              div.appendChild(element);
          }
      }
  }
}

function expandeImage(img) {
  let imgpos = img.getBoundingClientRect();
  if (imgpos.height <= imgpos.width) {
      img.style.height = '100%';
      img.style.width = 'auto';
  }
  if (imgpos.height > imgpos.width) {
      img.style.height = 'auto';
      img.style.width = '100%';
  }
}

customElements.define("photo-gallery", PhotoGallery);

let full = false;
let gallerystyle = '';

function fullscreen(pic) {
  if (!full) {
      full = true;
      pic.setAttribute("id", "fullscreen");
      gallerystyle = pic.firstChild.getAttribute("style");
      pic.firstChild.setAttribute("style", "height:95vh;");


  } else {
      pic.setAttribute("id", "");
      pic.firstChild.setAttribute("style", gallerystyle);
      full = false;
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
