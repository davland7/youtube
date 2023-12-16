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
    <nav role="navigation" class="fixed top-0 right-0 left-0 m-auto w-full flex justify-between border-t border-yellow-500">
      <a aria-label="Accueil" role="link" href="/" class={`${open ? 'hidden' : 'flex'} xl:flex items-center justify-center w-12 h-12 border-r border-b bg-white dark:bg-black rounded-br-3xl`}>
        <Home />
      </a>
      <button
        role="button"
        aria-label={open ? 'Retour' : 'Application'}
        class={`${open ? 'rounded-br-3xl border-r' : 'rounded-bl-3xl border-l'} flex md:hidden items-center justify-center border-b w-12 h-12 bg-white dark:bg-black`}
        type="button"
        onClick={() => setOpen(!open)}>
        {open ? <ArrowLeft /> : <Calculator />}
      </button>
      <a
        aria-label="Code source"
        target="_blank"
        role="link"
        href={codeUrl}
        class={`${open ? 'flex' : 'hidden'} md:flex items-center justify-center w-12 h-12 border-l border-b bg-white dark:bg-black rounded-bl-3xl`}>
        <CodeBracketSquare />
      </a>
    </nav>
  );
}

export default NavBar;
