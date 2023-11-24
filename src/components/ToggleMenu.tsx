import { useEffect, useState } from 'preact/hooks';
import { ArrowLeft, BookOpenCircle } from '@components/Icons';

function ToggleMenu() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const app = document.getElementsByTagName('aside')[0] as HTMLInputElement | null;
    const container = document.getElementsByTagName('section')[0] as HTMLInputElement | null;
    const nav = document.getElementsByTagName('nav')[0] as HTMLInputElement | null;

    if (open) {
      app?.classList.add('hidden');
      container?.classList.remove('hidden');
      nav?.classList.remove('justify-end');
    } else {
      app?.classList.remove('hidden');
      container?.classList.add('hidden');
      nav?.classList.add('justify-end');
    }
  }, [open]);

  return (
    <button aria-label={open ? 'Return' : 'Read Manual'} class="flex items-center justify-center w-10 h-10 bg-white" type="button" onClick={() => setOpen(!open)}>
      {open ? <ArrowLeft /> : <BookOpenCircle />}
    </button>
  );
}

export default ToggleMenu;
