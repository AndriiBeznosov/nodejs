const form = document.getElementById("form");

form.addEventListener("submit", function getForm(e) {
  console.log("post image to server");
  e.preventDefault();
  const formData = new FormData();
  formData.append("image", this.elements.file.files[0]);

  const url = "http://localhost:3001/upload";

  fetch(url, {
    method: "post",
    body: formData,
  }).catch((e) => console.log(e));
});
