const saturate = document.getElementById("saturate");
const contrast = document.getElementById("contrast");
const brightness = document.getElementById("brightness");
const sepia = document.getElementById("sepia");
const grayscale = document.getElementById("grayscale");
const blur = document.getElementById("blur");
const hueRotate = document.getElementById("hue-rotate");

const download = document.getElementById("download");
const reset = document.getElementById("reset");

const img = document.querySelector("img");
const upload = document.getElementById("img-upload");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

onload = (_) => {
  resetValues();
};

function resetValues() {
  ctx.filter = "none";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  saturate.value = 100;
  contrast.value = 100;
  brightness.value = 100;
  sepia.value = 0;
  grayscale.value = 0;
  blur.value = 0;
  hueRotate.value = 0;
}

function uploadImg() {
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);

  file.onload = (_) => {
    img.src = file.result;
  };

  img.onload = (_) => {
    canvas.style.display = "block";
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  resetValues();
}

let filters = document.querySelectorAll(".filters");
filters.forEach((filter) => {
  filter.addEventListener("input", (_) => {
    ctx.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hueRotate.value}deg)
        `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  });
});

function downloadImg() {
  download.href = canvas.toDataURL("image/png");
}
