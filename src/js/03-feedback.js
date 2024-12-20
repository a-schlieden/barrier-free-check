var throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
const formEmailEl = formEl.querySelector('input[name="email"]');
const formMessageEl = formEl.querySelector('textarea[name="message"]');

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormElInput, 500));
const STORAGE_KEY = 'feedback-form-state';
const feedbackForm = {
  email: '',
  message: '',
};

populateFormElements();

function onFormElInput(event) {
  feedbackForm[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackForm));
}

function populateFormElements() {
  const ParsedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (ParsedFormData) {
    feedbackForm.email = ParsedFormData.email;
    feedbackForm.message = ParsedFormData.message;
    formMessageEl.value = ParsedFormData.message;
    formEmailEl.value = ParsedFormData.email;
  }
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  console.log('feedbackForm: ', feedbackForm);
  localStorage.removeItem(STORAGE_KEY);
}
