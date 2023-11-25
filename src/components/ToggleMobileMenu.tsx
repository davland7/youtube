import { useEffect, useState } from 'preact/hooks';
import { ArrowLeft, BookOpenCircle } from '@components/Icons';

function ToggleMenu() {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const app = document.getElementsByTagName('aside')[0] as HTMLInputElement | null;
    const container = document.getElementsByTagName('section')[0] as HTMLInputElement | null;

    if (open) {
      app?.classList.add('hidden');
      container?.classList.remove('hidden');
    } else {
      app?.classList.remove('hidden');
      container?.classList.add('hidden');
    }

    app.addEventListener('touchstart', () => {
      alert('touchstart APP');
    });
    container.addEventListener('touchstart', () => {
      alert('touchstart CONTAINER');
    });
  }, [open]);

  return (
    <button
      aria-label={open ? 'Return' : 'Read Manual'}
      class={`fixed top-0 ${open ? 'left-0' : 'right-0'} flex lg:hidden items-center justify-center w-10 h-10 m-1 bg-white`}
      type="button"
      onClick={() => setOpen(!open)}>
      {open ? <ArrowLeft /> : <BookOpenCircle />}
    </button>
  );
}

export default ToggleMenu;
