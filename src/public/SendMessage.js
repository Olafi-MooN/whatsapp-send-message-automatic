var button = document.querySelector("#btn-send-message");
var buttonInputFile = document.querySelector("#input-file");
var inputMessage = document.querySelector("#message");
var tableFileName = document.querySelector("#table-file-name");
var inputContactInfo = document.querySelector("#contact-info");
var containerLoading = document.querySelector("#container-loading");

tableFileName.style.display = 'none';
containerLoading.style.display = 'none';

buttonInputFile.addEventListener("change", function () {
  tableFileName.style.display = 'block';
  document.querySelector("#row-file-name").innerHTML = buttonInputFile.files[0].name
})

button.addEventListener("click", function () {
  containerLoading.style.display = 'flex';
  const formData = new FormData();
  tableFileName.style.visibility = 'visible';
  formData.append('file', buttonInputFile.files[0]);
  formData.append('message', inputMessage.value);
  formData.append('contactInfo', inputContactInfo.value);

  fetch('/send-message', {
    method: 'POST',
    body: formData
  }).then(res => {
    containerLoading.style.display = 'none';
  });
})