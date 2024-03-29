import type { JSX } from 'preact';
import { useState } from 'preact/hooks';

const FORM_NAME = 'newsletter';
const MESSAGES = {
  success: 'Merci pour ton inscription !',
  error: 'Une erreur est survenue, veuillez réessayer.',
  invalid: 'Ton adresse e-mail n’est pas valide.'
};

function NewsletterForm() {
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(false);
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
        .catch(() => {
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
        class={`h-6 mt-4 text-center text-base ${error ? 'text-red-500' : 'text-green-500'}`}
      >
        {statusMessage}
      </p>
      <label
        class="block mt-4"
        for="email"
      >
        Adresse e-mail
      </label>
      <input
        aria-label="Adresse e-mail"
        autocomplete="off"
        class={`${error ? 'border-red-500' : 'border-black dark:border-white'} w-full mt-4 p-2 rounded bg-inherit text-inherit`}
        id="email"
        name="email"
        placeholder="exemple@gmail.com"
        onInput={handleInput}
        type="email"
        required
      />
      <button
        class="w-full mt-4 p-2 rounded bg-yellow-500 border border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600 disabled:bg-gray-200 disabled:border-gray-200 disabled:cursor-not-allowed text-black font-bold text-base"
        type="submit"
        aria-label="Je m’abonne"
        disabled={disable}
      >
        Je m’abonne
      </button>
    </form>
  )
};

export default NewsletterForm;
