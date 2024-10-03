'use client';
import { IPublicForm } from '@/interfaces/public';
import FormNetworkService from '@/services/form.service';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function PublicForm(props: { data: IPublicForm; campaignId: string }) {
    const [inputs, setInputs] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const { fields } = props.data.form;
        fields.forEach((field) => {
            setInputs((prev) => ({ ...prev, [field.label.replaceAll(' ', '_')]: '' }));
        });
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const isValid = true;
        if (isValid) {
            let fields = Object.keys(inputs).map((key:string) => {
                return {
                    fieldType: props.data.form.fields.find((item) => item.label.replaceAll(' ', '_') === key)?.fieldType as string,
                    label: key?.replaceAll('_', ' ') as string,
                    value: inputs[key],
                    isLinkField: props.data.form.fields.find((item) => item.label.replaceAll(' ', '_') === key)?.isLinkField || false,
                };
            });

            let data = {
                campaignId: props.campaignId,
                formId: props.data.form.id.$oid,
                fields: fields,
            };

            FormNetworkService.instance.submitPublicForm(data).then((res) => {
                setInputs({});
                enqueueSnackbar('Form submitted successfully', {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
            });
        }
    };

    return (
        <div>
            {props.data.form.fields.map((field) => (
                <div className='flex flex-col mt-6' key={field.label}>
                    <label htmlFor={field.label} className='text-sm'>
                        {field.label}
                    </label>
                    <input
                        type='text'
                        name={field.label.replaceAll(' ', '_')}
                        placeholder={`Enter ${field.label}`}
                        className='mt-2 text-sm outline-none px-3 bg-[#F7F7F7] rounded-lg p-2'
                        value={inputs[field.label.replaceAll(' ', '_')]}
                        onChange={(e) => handleChange(e)}
                    />
                    <span className='mt-1 text-xs text-red-500' id={field.label.replaceAll(' ', '_') + 'error'}></span>
                </div>
            ))}

            <div className='flex flex-col mt-6 sm:w-60' key={uuidv4()}>
                <button onClick={handleSubmit} className='cursor-pointer bg-black p-3 text-white rounded-lg'>
                    Submit
                </button>
            </div>
        </div>
    );
}
