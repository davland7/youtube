function newsletter() {
  return (
    <>
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold mb-2">Abonnez-vous à notre newsletter</h1>
        <p>Restez informé de nos dernières actualités et annonces en vous abonnant à notre newsletter.</p>
      </div>
      <form
        class="bg-white shadow-lg rounded-md p-5 md:p-10 flex flex-col w-11/12 max-w-lg group"
        data-netlify="true"
        netlify-honeypot
        name="newsletter"
        method="POST"
        action="/success"
        novalidate
      >
        <p class="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <input type="hidden" name="form-name" value="newsletter" />
        <label for="email" class="mb-5">
          <span>Adresse e-mail</span>
          <input
            type="email"
            name="email"
            class="w-full rounded border border-gray-300 bg-inherit p-3 shadow shadow-gray-100 mt-2 appearance-none outline-none text-neutral-800 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
            id="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required />
          <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please enter a valid email address
          </span>
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  )
};

export default newsletter;
