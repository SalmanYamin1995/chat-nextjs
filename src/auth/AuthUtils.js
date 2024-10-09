
export function disableSubmit() {
  disableButton("#submit-btn");
}
export function enableSubmit() {
  enableButton("#submit-btn");
}
export function disableButton(selector) {
  document.querySelector(selector).disable = true;
}
export function enableButton(selector) {
  document.querySelector(selector).disable = false;
}
