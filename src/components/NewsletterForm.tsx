import type { JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';

function NewsletterForm() {
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleKeyboardEvent = (event: JSX.TargetedEvent<HTMLInputElement>) => {
    const { target } = event;

    if (target) {
      const email = (target as HTMLFormElement).value;
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      const isValid = emailRegex.test(email);
      setError(!isValid);
      setDisabled(!isValid);

      console.log((target as HTMLFormElement).value);
    }
  };

  return (
    <form
      class="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg group"
      data-netlify="true"
      netlify-honeypot
      name="newsletter"
      method="POST"
      action="/fr/merci"
      noValidate
    >
      <p class="hidden">
        <label>
          Don’t fill this out if you’re human: <input name="bot-field" />
        </label>
      </p>
      <input type="hidden" name="form-name" value="newsletter" />
      <label for="email" class="mb-5">Adresse e-mail</label>
      <input
        type="email"
        name="email"
        aria-labelledby="email-label"
        class={`w-full h-12 rounded-full border bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 ${error ? 'border-red-500' : 'border-gray-300'}`}
        id="email"
        onKeyUp={handleKeyboardEvent}
        required
      />

      {error && (
        <p role="alert" aria-live="assertive" class="mt-5 bg-red-100 border border-red-500 text-red-500 text-sm p-3 rounded-full h-12">
          Veuillez saisir une adresse e-mail valide.
        </p>
      )}

      <button class="mt-5 p-3 rounded-full border disabled:bg-orange-400 bg-orange-500 h-12" type="submit" disabled={disabled} aria-label="Submit">
        Submit
      </button>
    </form>
  )
};

export default NewsletterForm;
