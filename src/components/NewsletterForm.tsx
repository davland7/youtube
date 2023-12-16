import type { JSX } from 'preact';
import { useState } from 'preact/hooks';

const FORM_NAME = 'newsletter';
const MESSAGES = {
  success: 'Merci pour votre inscription !',
  error: 'Une erreur est survenue, veuillez réessayer.',
  invalid: 'Veuillez saisir une adresse e-mail valide.'
};

function NewsletterForm() {
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleInput = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    const emailIsValid = validateEmail(email);

    if (emailIsValid) {
      setDisable(false);
      setError(false);
      setStatusMessage('');
    } else {
      setDisable(true);
      setError(true);
      setStatusMessage(MESSAGES.invalid);
    }
  };

  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const emailIsValid = validateEmail(email);

    if (emailIsValid) {
      fetch(FORM_NAME, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString()
      })
        .then((response) => {
          console.log(response);

          if (response.ok) {
            setStatusMessage(MESSAGES.success);
            setError(false);
            form.reset();
          } else {
            setStatusMessage(MESSAGES.error);
            setError(true);
          }
        })
        .catch((error) => {
          setStatusMessage(MESSAGES.error);
          setError(true);
        });
    }

    event.preventDefault();
  }

  return (
    <form
      class="w-full"
      name={FORM_NAME}
      method="POST"
      onSubmit={handleSubmit}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      novalidate
     >
      <input
        type="hidden"
        name="form-name"
        value={FORM_NAME}
      />
      <input
        type="hidden"
        name="bot-field"
      />
      <p
        role="alert"
        aria-live="assertive"
        class={`text-center h-12 pt-3 ${error ? 'text-red-500' : 'text-green-500'}`}
      >
        {statusMessage}
      </p>
      <p>
        <label class="block mb-4">Adresse e-mail</label>
        <input
          aria-labelledby="email-label"
          class={`w-full h-12 rounded-2xl border bg-inherit p-3 text-inherit ${error ? 'border-red-500' : 'border-yellow-500'}`}
          id="email"
          name="email"
          placeholder=""
          onInput={handleInput}
          type="email"
          required
        />
      </p>
      <button
        class="p-3 mb-2 rounded-2xl border bg-yellow-500 disabled:bg-yellow-500 disabled:cursor-not-allowed hover:bg-yellow-600 focus:bg-yellow-600 h-12 w-full mt-5 dark:text-black font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-white focus:ring-opacity-50"
        type="submit"
        aria-label="Submit"
        disabled={disable}
      >
        Je m'abonne
      </button>
    </form>
  )
};

export default NewsletterForm;
