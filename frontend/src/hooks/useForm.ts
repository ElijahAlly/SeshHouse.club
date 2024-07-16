import { useState, ChangeEvent } from 'react';

type FormState = {
    [key: string]: string;
};

const useForm = (initialState: FormState) => {
    const [state, setState] = useState<FormState>(initialState);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return [state, handleChange] as const;
};

export default useForm;
