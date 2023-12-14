import { useEffect, useState } from 'preact/hooks';
import { ArrowLeft, Calculator, CodeBracketSquare, Home } from '@components/Icons';

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
    <nav role="navigation" class="m-auto w-full max-w-screen-2xl flex justify-between">
      <a aria-label="Accueil" role="link" href="/" class={`${open ? 'hidden' : 'flex'} lg:flex items-center justify-center w-10 h-10 m-1`}>
        <Home />
      </a>
      <button
        role="button"
        aria-label={open ? 'Retour' : 'Application'}
        class="flex lg:hidden items-center justify-center w-10 h-10 m-1"
        type="button"
        onClick={() => setOpen(!open)}>
        {open ? <ArrowLeft /> : <Calculator />}
      </button>
      <a
        aria-label="Code source"
        target="_blank"
        role="link"
        href="https://github.com/davland7/youtube/tree/66184a9c7fe5ade8b0ff0b71119ca06cb238b4ba/src/components/CurrencyConverter"
        class={`${open ? 'flex' : 'hidden'} lg:flex items-center justify-center w-10 h-10 m-1`}>
        <CodeBracketSquare />
      </a>
    </nav>
  );
}

export default NavBar;