import usePosts from '@/hooks/usePosts';

import PostItem from './PostItem';
import useCurrentUser from '@/hooks/useCurrentUser';

interface PostFeedProps {
  userId?: string;
  isHome?: boolean;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId, isHome }) => {
  const { data: posts = [] } = usePosts(userId);
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      {isHome ?
        (
          currentUser ?
            (
              posts.map((post: Record<string, any>,) => (currentUser.followingIds.includes(post.userId) || post.userId === currentUser.id) && (
                <PostItem userId={userId} key={post.id} data={post} />
              ))
            ) : (
              posts.map((post: Record<string, any>,) => (
                <PostItem userId={userId} key={post.id} data={post} />
              ))
            )
        ) : (
          posts.map((post: Record<string, any>,) => (
            <PostItem userId={userId} key={post.id} data={post} />
          ))
        )
      }
    </>
  );
};

export default PostFeed;
