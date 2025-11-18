import React from 'react';
import { cn } from '@/lib/utils';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CustomWhatsAppButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(({ children, className, ...props }, ref) => {
  const baseClasses = 'relative inline-block w-full cursor-pointer transition-all duration-250 ease-out p-0 border-none bg-transparent font-semibold';

  const shadowClasses = 'absolute top-0 left-0 w-full h-full rounded-lg bg-black/10 translate-y-[2px] transition-transform duration-250 ease-out';

  const labelClasses = cn(
    'block relative rounded-lg text-lg px-6 py-4 bg-white text-emerald-600 dark:bg-gray-800 dark:text-emerald-400',
    'transform translate-y-[-4px] transition-transform duration-250 ease-out',
    'w-full user-select-none flex items-center justify-center gap-2',
    'shadow-md'
  );

  return (
    <button ref={ref} className={cn(baseClasses, 'group', className)} {...props}>
      <span className={cn(shadowClasses, 'bg-lime-900 group-hover:translate-y-[4px] group-active:translate-y-[1px] shadow-sm')} />

      <span className={cn(labelClasses, 'text-white bg-lime-700 group-hover:translate-y-[2px] group-active:translate-y-[-2px] group-active:transition-transform group-active:duration-34')}>{children}</span>
    </button>
  );
});

CustomWhatsAppButton.displayName = 'CustomWhatsAppButton';
export default CustomWhatsAppButton;
