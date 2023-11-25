import { useEffect, useState } from 'preact/hooks';

function Newletter() {
  const [error, setError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log(email);
  }

  const handleInputChange = (e: any) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    console.log(name, value);
  }

  return (
    <div class="bg-blue-500 p-4">
      <div class="text-white">
        <h3>Subscribe to our newsletter</h3>
      </div>
      <div>
        <form
          class="px-4 py-2 mt-4"
          data-netlify="true"
          id="newsletter"
          name="newsletter"
          onSubmit={handleSubmit}
        >
          <div>
            <label class="text-white" for="email">
              Email
            </label>
            <input
              class="bg-white px-2 py-1 text-blue-500 border border-blue-500"
              id="email"
              name="email"
              onChange={handleInputChange}
              placeholder="Your email address"
              type="email"
            />
          </div>
          {/* Message d'erreur pour l'e-mail */}
          {error && (
            <span class="text-red-500 text-sm">Veuillez entrer une adresse e-mail valide.</span>
          )}
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white mt-2 px-4 py-2"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newletter;
