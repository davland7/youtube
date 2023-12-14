import { useEffect, useState } from 'preact/hooks';
import { ArrowLeft, Calculator, Home } from '@components/Icons';

function NavBar() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const app = document.getElementsByTagName('aside')[0] as HTMLInputElement | null;
    const container = document.getElementsByTagName('section')[0] as HTMLInputElement | null;

    if (open) {
      app?.classList.remove('hidden');
      container?.classList.add('hidden');
    } else {
      app?.classList.add('hidden');
      container?.classList.remove('hidden');
    }
  }, [open]);

  return (
    <nav class="m-auto w-full max-w-screen-2xl flex justify-between">
      <a href="/" class={`${open ? 'hidden' : 'flex'} lg:flex items-center justify-center w-10 h-10 m-1`}>
        <Home />
      </a>
      <button
        aria-label={open ? 'Return' : 'Read Manual'}
        class="flex lg:hidden items-center justify-center w-10 h-10 m-1"
        type="button"
        onClick={() => setOpen(!open)}>
        {open ? <ArrowLeft /> : <Calculator />}
      </button>
      <a target="_blank" href="https://github.com/davland7/youtube/tree/66184a9c7fe5ade8b0ff0b71119ca06cb238b4ba/src/components/CurrencyConverter" class={`${open ? 'flex' : 'hidden'} lg:flex items-center justify-center w-10 h-10 m-1`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm14.25 6a.75.75 0 01-.22.53l-2.25 2.25a.75.75 0 11-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 111.06-1.06l2.25 2.25c.141.14.22.331.22.53zm-10.28-.53a.75.75 0 000 1.06l2.25 2.25a.75.75 0 101.06-1.06L8.56 12l1.72-1.72a.75.75 0 10-1.06-1.06l-2.25 2.25z" clipRule="evenodd" />
        </svg>
      </a>
    </nav>
  );
}

export default NavBar;
