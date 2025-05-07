document.addEventListener("DOMContentLoaded", () => {
  const image = document.getElementById("image");
  
  image.addEventListener("load", () => {
    document.getElementById("loader").style.display = "none";
  });
});