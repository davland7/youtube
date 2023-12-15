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
  const [statusMessage, setStatusMessage] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
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
            form.reset();
            setStatusMessage(MESSAGES.success);
            setError(false);
          } else {
            setStatusMessage(MESSAGES.error);
            setError(true);
          }
        })
        .catch((error) => {
          setStatusMessage(MESSAGES.error);
          setError(true);
          console.error(error);
        });
    } else {
      setError(true);
      setStatusMessage(MESSAGES.invalid);
    }

    event.preventDefault();
  }

  return (
    <form
      class="flex flex-col items-center"
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
        class={`${error ? 'text-red-500' : 'text-green-500'} h-8`}
      >
        {statusMessage}
      </p>
      <p class="w-full">
        <label class="sr-only">Adresse e-mail</label>
        <input
          type="email"
          name="email"
          aria-labelledby="email-label"
          class={`w-full h-12 rounded-full border bg-inherit p-3 shadow shadow-gray-100 appearance-none outline-none text-neutral-800 ${error ? 'border-red-500' : 'border-yellow-500'}`}
          id="email"
          placeholder="Adresse e-mail"
          required
        />
      </p>
      <button
        class="p-3 rounded-full border bg-yellow-500 h-12 w-full mt-5 dark:text-black font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-white focus:ring-opacity-50"
        type="submit"
        aria-label="Submit"
      >
        Submit
      </button>
    </form>
  )
};

export default NewsletterForm;
