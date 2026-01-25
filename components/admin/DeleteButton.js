'use client'

import { FaTrash } from 'react-icons/fa';
import { useFormStatus } from 'react-dom';

export default function DeleteButton({ className, size = 16, confirmMessage = "Are you sure?" }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={`${className} disabled:opacity-50`}
            disabled={pending}
            onClick={(e) => {
                if (!confirm(confirmMessage)) {
                    e.preventDefault();
                }
            }}
        >
            <FaTrash size={size} />
        </button>
    )
}
