'use client';

import React from 'react';
import { Loader2Icon } from 'lucide-react';
import Ripples from 'react-ripples';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Button = ({
    children,
    to,
    type = 'button',
    variant = 'solid',
    wide,
    round,
    loading,
    disabled,
    loaderSize = 20,
    loaderColor = '#00E5FF',
    onClick,
    download,
    id,
    className,
    childrenClassName,
    ...props
}) => {
    const baseStyles = cn(
        'relative inline-flex items-center justify-center font-medium focus:outline-none transition-all duration-200',
        round ? 'rounded-full px-5 py-2.5' : 'rounded-lg px-4 py-2',
        wide && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed'
    );

    const variantStyles = {
        solid: 'bg-accent hover:bg-highlight text-white shadow-md hover:shadow-lg',
        outlined:
            'border border-accent text-accent hover:bg-accent hover:text-white',
        ghost: 'bg-transparent text-text-accent hover:bg-accent/10',
    };

    const combinedClasses = cn(baseStyles, variantStyles[variant], className);

    const content = (
        <div
            id={id}
            className={cn(
                'flex items-center justify-center space-x-2',
                childrenClassName
            )}
        >
            {loading ? (
                <Loader2Icon
                    className="animate-spin"
                    color={loaderColor}
                    size={loaderSize}
                />
            ) : (
                children
            )}
        </div>
    );

    if (to) {
        return (
            <Link href={to} download={download} className="inline-block">
                <button
                    type={type}
                    {...props}
                    id={id}
                    disabled={disabled || loading}
                    className={combinedClasses}
                    onClick={onClick}
                >
                    <Ripples>{content}</Ripples>
                </button>
            </Link>
        );
    }

    return (
        <button
            type={type}
            {...props}
            id={id}
            disabled={disabled || loading}
            onClick={onClick}
            className={combinedClasses}
        >
            <Ripples>{content}</Ripples>
        </button>
    );
};

export default Button;
