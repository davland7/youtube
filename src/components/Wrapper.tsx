import { useEffect, useState, useRef } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';

type WrapperProps = {
  children: JSX.Element;
};

function Wrapper({ children }: WrapperProps) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      document.getElementById('container')?.classList.remove('hidden');
    } else {
      document.getElementById('container')?.classList.add('hidden');
    }
  }, [open]);

  return (
    <>
      <button
        class={`fixed top-3 z-50 ${open ? 'left-3' : 'right-3'} flex items-center justify-center w-10 h-10 md:hidden bg-white`}
        type="button"
        aria-label="Aide"
        onClick={() => setOpen(!open)}>
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
          </svg>
        )}
      </button>
      <div class={`fixed top-0 right-0 md:right-[62%] bottom-0 left-0 pt-12 ${open ? 'hidden' : 'block'} md:block bg-white`}>
        <div class="w-full h-full overflow-y-auto">
          <div class="flex flex-col items-end justify-end w-full h-full p-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Wrapper;
