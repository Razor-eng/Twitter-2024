import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaImage } from "react-icons/fa";

interface DropzoneProps {
    onChange: (base64: string) => void;
    label: string;
    value?: string;
    disabled?: boolean;
}

const PostImage: React.FC<DropzoneProps> = ({ onChange, label, value, disabled }) => {
    const [base64, setBase64] = useState(value);
    const [click, setClick] = useState(false);

    const handleChange = useCallback((base64: string) => {
        onChange(base64);
    }, [onChange]);

    const handleDrop = useCallback((files: any) => {
        const file = files[0]
        const reader = new FileReader();
        reader.onload = (event: any) => {
            setBase64(event.target.result);
            handleChange(event.target.result);
        };
        reader.readAsDataURL(file);
    }, [handleChange])

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        onDrop: handleDrop,
        disabled,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        }
    });

    useEffect(() => {
        setClick(false);
        setBase64('')
    }, [value])


    return (
        <>
            {/* {click ? ( */}
            {base64 ? (
                <div {...getRootProps({ className: 'w-[50%] p-4 text-center border-2 border-dotted rounded-md dark:border-neutral-700 cursor-pointer' })}>
                    <input {...getInputProps()} />
                    <div className="flex items-center justify-center">
                        <Image
                            src={base64}
                            width={900}
                            height={900}
                            className='lg:w-[30vw] w-[100vw] text-center lg:h-[30vh] h-auto object-fit rounded-lg'
                            alt="Uploaded image"
                        />
                    </div>
                </div>
            ) : (
                <div {...getRootProps({ className: 'w-fit p-3 text-center rounded-md cursor-pointer' })}>
                    <input {...getInputProps()} />
                    <FaImage className="hover:text-blue-400 cursor-pointer" onClick={() => setClick(!click)} />
                </div>
            )}
            {/* ) : (
                <FaImage className="hover:text-blue-400 cursor-pointer" onClick={() => setClick(!click)} />
            )} */}
        </>
    );
}

export default PostImage;