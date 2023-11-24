import { useState } from 'preact/hooks';
import type { JSX } from 'preact/jsx-runtime';

type WrapperProps = {
  children: JSX.Element;
};

function Wrapper({ children }: WrapperProps) {
  const [open, setOpen] = useState(false);

  // 38% is the width of the sidebar
  // 62% is the width of the main content

  return (
    <>
      <nav class={`md:hidden bg-green-200 sticky top-0 left-0 right-0 flex items-center ${open ? '' : 'justify-end'} w-full h-12 z-30`}>
        <button type="button" class="flex items-center justify-center w-12 h-12" onClick={() => setOpen(!open)}>
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-4.28 9.22a.75.75 0 000 1.06l3 3a.75.75 0 101.06-1.06l-1.72-1.72h5.69a.75.75 0 000-1.5h-5.69l1.72-1.72a.75.75 0 00-1.06-1.06l-3 3z" clip-rule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
          )}
        </button>
      </nav>
      <div class={`fixed top-0 right-0 bg-yellow-200 md:right-[62%] bottom-0 left-0 mt-12 h-full overflow-y-auto ${open ? '' : 'z-20'}`}>
        <div class="flex flex-col items-end justify-end w-full lg:max-w-[488px] p-6">
          {children}
        </div>
      </div>
    </>
  );
}

export default Wrapper;
