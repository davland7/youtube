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

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const emailIsValid = validateEmail(formData.get('email') as string);

    if (emailIsValid) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then((response) => {
          console.log(response);
          setError(false);
          // form.reset();
        })
        .catch((error) => {
          setError(true);
          console.error(error);
        });
    } else {
      setError(true);
    }
  }

  return (
    <form
      class="flex flex-col items-center"
      name="newsletter2"
      method="POST"
      onSubmit={handleSubmit}
      novalidate
     >
      <input
        type="hidden"
        name="form-name"
        value="newsletter2"
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
