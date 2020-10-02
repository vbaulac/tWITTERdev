window.addEventListener('DOMContentLoaded', () => {
  const imgInput = document.querySelector('#image-input');
  const imgForm = document.querySelector('#image-form');

  imgForm.addEventListener('click', (e) => {
    imgInput.click();
  });

  imgInput.addEventListener('change', (e) => {
    imgForm.submit();
  });
})