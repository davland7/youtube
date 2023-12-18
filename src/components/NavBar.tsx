import { useEffect, useState } from 'preact/hooks';
import { ArrowLeft, Calculator, CodeBracketSquare, Home } from '@components/Icons';

function NavBar({
  codeUrl
}: {
  codeUrl: string;
}) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const app: HTMLElement = document.getElementsByTagName('aside')[0];
    const container: HTMLElement = document.getElementsByTagName('section')[0];

    if (open) {
      app?.classList.remove('hidden');
      container?.classList.add('hidden');
    } else {
      app?.classList.add('hidden');
      container?.classList.remove('hidden');
    }
  }, [open]);

  return (
    <nav
      class="fixed top-0 right-0 left-0 w-full m-auto flex justify-between"
      role="navigation"
    >
      <a
        class={`${open ? 'hidden' : 'flex'} xl:flex items-center justify-center w-12 h-12 bg-white dark:bg-black rounded-br-2xl`}
        aria-label="Accueil"
        role="link"
        href="/"
        target="_self"
      >
        <Home />
      </a>
      <button
        role="button"
        aria-label={open ? 'Retour' : 'Application'}
        class={`${open ? 'rounded-br-2xl' : 'rounded-bl-2xl'} flex md:hidden items-center justify-center w-12 h-12 bg-white dark:bg-black`}
        type="button"
        onClick={() => setOpen(!open)}>
        {open ? <ArrowLeft /> : <Calculator />}
      </button>
      <a
        aria-label="Code source"
        role="link"
        href={codeUrl}
        class={`${open ? 'flex' : 'hidden'} md:flex items-center justify-center w-12 h-12 bg-white dark:bg-black rounded-bl-2xl`}>
        <CodeBracketSquare />
      </a>
    </nav>
  );
}

export default NavBar;
