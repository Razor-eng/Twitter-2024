import { useRouter } from 'next/router';
import Avatar from '../Avatar';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFollow from '@/hooks/useFollow';

const FollowBar = ({ user }: { user: Record<string, any> }) => {
  const router = useRouter();
  const { toggleFollow } = useFollow(user.id);

  const setPath = () => {
    router.push(`/users/${user.id}`)
  }

  return (
    <div
      onClick={setPath}
      className="flex items-center px-3 py-2  cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition duration-500 ease-out rounded-lg"
    >
      <Avatar userId={user.id} />
      <div className="truncate ml-3 leading-5">
        <h4 className="font-semibold text-sm">
          {user.name}
        </h4>
        <h5 className="text-neutral-500 text-sm">
          {user.username}
        </h5>
      </div>
      <button className="ml-auto rounded-full text-sm px-2 py-1 font-semibold hover:text-gray-500" onClick={toggleFollow}>
        Follow
      </button>
    </div>
  )
};

export default FollowBar;
