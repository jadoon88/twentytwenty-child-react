const { render, useState, useEffect } = wp.element;

const Posts = () => {
    const [votes, setVotes] = useState(0);
    const postsURL = "http://localhost:8888/towa-trial/wp-json/wp/v2/posts";
    const perPage = 5;

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    function getTotalPages()
    {
        return totalPosts/perPage;
    }

    function nextPage()
    {
        setPage(page + 1);
    }
    function previousPage()
    {
        setPage(page - 1);
    }
    function getPosts()
    {
        fetch(postsURL+"?page="+page+"&per_page="+perPage)
            .then((response) => {
                return Promise.all([response.json(), response.headers]);
            }).then(([responseJson, headers]) => {
                setPosts(responseJson);
                setTotalPosts(parseInt(headers.get("X-WP-Total")));
        })
            .catch((err) => {
                console.log(err.message);
            });

        fetch(postsURL+"?page="+page)
            .then((response) => response.json())
            .then((data) => {

            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        getPosts();
    }, [page]);

    return (
        <div>
            <h4>Latest Posts</h4>

            {
                posts.map(
                    (post, index) => (
                        <div key={index} className="menu-item ml-4 font-normal text-xs text-gray-800">
                            <a href={post.link}>
                                <span className="ml-1 link-underline link-underline-back">
                                    {post.title.rendered}
                                </span>
                            </a>
                        </div>
                    )
                )
            }

            <div>Current Page: {page}</div>
            <p>
                <button onClick={nextPage}>Previous Page</button>
                <button onClick={previousPage}>Next Page</button>
            </p>
        </div>
    );
};
render(<Posts/>, document.getElementById("react-app"));