import axios from 'axios';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePosts from '@/hooks/usePosts';
import usePost from '@/hooks/usePost';

import Avatar from './Avatar';
import Button from './Button';
import PostImage from './posts/PostImage';

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : '/api/posts';

      {
        isComment ?
          await axios.post(url, { body })
          :
          await axios.post(url, { body, image })
      }

      toast.success('Tweet created');
      setBody('');
      setImage('');
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost, image]);

  return (
    <div className="border-b-[1px] dark:border-neutral-800 px-5 py-2">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <div>
            <Avatar userId={currentUser?.id} />
          </div>
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="
                disabled:opacity-80
                peer
                resize-none 
                mt-3 
                w-full  
                ring-0 
                outline-none 
                text-[20px] 
                bg-transparent
                placeholder-neutral-500 
              "
              placeholder={placeholder}>
            </textarea>
            {
              !isComment &&
              <div className={`mt-1 mb-1 ${body === "" ? "hidden" : "inline"}`}>
                <PostImage value={image} disabled={isLoading} onChange={(image) => setImage(image)} label="Upload any image" />
              </div>
            }
            <hr
              className={`
                opacity-0 
                peer-focus:opacity-100 
                ${body !== "" && "opacity-100"}
                h-[1px] 
                w-full 
                dark:border-neutral-800 
                transition
                `}
            />
            <div className="mt-4 flex flex-row justify-end">
              <Button disabled={isLoading || !body} onClick={onSubmit} label="Tweet" />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-2xl text-center mb-4 font-bold">Welcome to Twitter</h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" fullWidth onClick={loginModal.onOpen} />
            <Button label="Register" fullWidth onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
