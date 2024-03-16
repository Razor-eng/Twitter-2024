// import { IoIosSearch } from "react-icons/io";
import News from "./News";
import { useEffect, useState } from "react";
import axios from "axios";
import FollowBar from "@/components/layout/FollowBar"
import { AnimatePresence, motion } from "framer-motion";
import useUsers from "@/hooks/useUsers";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Widgets() {
    let [articles, setArticles] = useState([]);
    const [articleNum, setArticleNum] = useState(3);
    const [randomUserNum, setRandomUserNum] = useState(3);
    const { data: users = [] } = useUsers();
    const { data: currentUser } = useCurrentUser();

    useEffect(() => {
        axios.get
            (
                "https://saurav.tech/NewsAPI/top-headlines/category/business/us.json"
            )
            .then((res) => {
                setArticles(res.data.articles);
            })
    }, [])

    const check = (user: Record<string, any>) => {
        if (currentUser) {
            if (user.id === currentUser.id) {
                return false;
            }
            else if (currentUser.followingIds.includes(user.id)) {
                return false;
            } else {
                return true
            }
        } else {
            return true
        }
    }

    return (
        <div className="hidden lg:inline w-full ml-8 space-y-5">
            {/* Search */}
            {/* <div className="flex items-center p-3 rounded-full mt-2 relative">
                <IoIosSearch className="h-5 w-5 z-50 text-gray-500" />
                <input
                    className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "
                    type="text"
                    placeholder="Search Twitter"
                />
            </div> */}

            {/* News */}
            <div className="space-y-3 border dark:border-neutral-800 rounded-xl pt-2 mt-2">
                <h4 className="font-bold text-xl px-4 pb-3 border-b dark:border-neutral-800">Whats happening</h4>
                <AnimatePresence>
                    {articles.slice(0, articleNum).map((article: any) => (
                        <motion.div
                            key={article.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <News key={article.title} article={article} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="flex justify-between">
                    {articleNum > 3 ?
                        <>
                            <button
                                onClick={() => setArticleNum(articleNum - 3)}
                                className="text-blue-300 pl-2 pb-3 hover:text-blue-400"
                            >
                                Show less
                            </button>
                            <button
                                onClick={() => setArticleNum(articleNum + 3)}
                                className="text-blue-300 pr-2 pb-3 hover:text-blue-400"
                            >
                                Show more
                            </button>
                        </>
                        :
                        <button
                            onClick={() => setArticleNum(articleNum + 3)}
                            className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
                        >
                            Show more
                        </button>
                    }
                </div>
            </div>

            {/* Users */}
            <div className="sticky top-16 pt-2 rounded-xl space-y-3 border dark:border-neutral-800">
                <h4 className="font-bold text-xl px-4 pb-3 border-b dark:border-neutral-800">Who to follow</h4>
                <AnimatePresence>
                    {users?.filter(check).slice(0, randomUserNum).map((user: Record<string, any>) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <FollowBar user={user} />
                        </motion.div>
                    ))}
                </AnimatePresence>
                {
                    currentUser ?
                        (
                            (users.length - currentUser.followingIds.length > 3)
                            &&
                            <div className="flex justify-between">
                                {randomUserNum > 3 ?
                                    <>
                                        <button
                                            onClick={() => setRandomUserNum(articleNum - 3 <= 3 ? 3 : articleNum - 3)}
                                            className="text-blue-300 pl-2 pb-3 hover:text-blue-400"
                                        >
                                            Show less
                                        </button>
                                        <button
                                            onClick={() => setRandomUserNum(articleNum + 3)}
                                            className="text-blue-300 pr-2 pb-3 hover:text-blue-400"
                                        >
                                            Show more
                                        </button>
                                    </>
                                    :
                                    <button
                                        onClick={() => setRandomUserNum(articleNum + 3)}
                                        className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
                                    >
                                        Show more
                                    </button>
                                }
                            </div>
                        ) : (
                            (users.length > 3)
                            &&
                            <div className="flex justify-between">
                                {randomUserNum > 3 ?
                                    <>
                                        <button
                                            onClick={() => setRandomUserNum(articleNum - 3 <= 3 ? 3 : articleNum - 3)}
                                            className="text-blue-300 pl-2 pb-3 hover:text-blue-400"
                                        >
                                            Show less
                                        </button>
                                        <button
                                            onClick={() => setRandomUserNum(articleNum + 3)}
                                            className="text-blue-300 pr-2 pb-3 hover:text-blue-400"
                                        >
                                            Show more
                                        </button>
                                    </>
                                    :
                                    <button
                                        onClick={() => setRandomUserNum(articleNum + 3)}
                                        className="text-blue-300 pl-4 pb-3 hover:text-blue-400"
                                    >
                                        Show more
                                    </button>
                                }
                            </div>
                        )
                }
            </div>
        </div>
    )
}
