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

    const formData = new FormData(event.target);
    const emailIsValid = validateEmail(formData.get('email') as string);

    if (emailIsValid) {
      fetch("/", {
        body: formData,
        method: "POST"
      })
        .then((response) => {
          setError(true);
          console.log('Form successfully submitted', response);
        })
        .catch((error) => {
          setError(false);
          console.log(error);
        });
    } else {
      setError(true);
    }
  }

  return (
    <form
      action="/"
      class="flex flex-col items-center"
      data-netlify="true"
      method="POST"
      name="newsletter"
      id="newsletter"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        type="hidden"
        name="form-name"
        value="newsletter"
        required
      />
      <p
        role="alert"
        aria-live="assertive"
        class="text-red-500 h-8"
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
