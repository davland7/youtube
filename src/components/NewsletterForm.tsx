import type { JSX } from 'preact';
import { useState } from 'preact/hooks';

function NewsletterForm() {
  const [error, setError] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const email = form.email.value;
    const emailIsValid = validateEmail(email);

    if (emailIsValid) {
      setError(false);
      form.submit();
    } else {
      setError(true);
    }
  }

  return (
    <form
      class="flex flex-col items-center w-11/12 max-w-lg"
      data-netlify="true"
      name="newsletter"
      method="POST"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        type="hidden"
        name="form-name"
        value="newsletter"
      />
      <p
        role="alert"
        aria-live="assertive"
        class="text-red-500 h-12"
      >
        {error && 'Veuillez saisir une adresse e-mail valide.'}
      </p>
      <label
        for="email"
        class="sr-only"
      >
        Adresse e-mail
      </label>
      <input
        type="email"
        name="email"
        aria-labelledby="email-label"
        class={`w-full h-12 rounded-full border bg-inherit p-3 shadow shadow-gray-100 appearance-none outline-none text-neutral-800 ${error ? 'border-red-500' : 'border-orange-500'}`}
        id="email"
        placeholder="Adresse e-mail"
        required
      />
      <button
        class="p-3 rounded-full border bg-orange-500 h-12 w-full mt-5 text-white font-semibold hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-white focus:ring-opacity-50"
        type="submit"
        aria-label="Submit"
      >
        Submit
      </button>
    </form>
  )
};

export default NewsletterForm;
