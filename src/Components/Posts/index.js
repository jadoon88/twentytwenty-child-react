const { render, useState, useEffect } = wp.element;

class Posts extends React.Component {



    render () {
        const addPage = () => {
            setPage(page + 1);
        };
        let postsURL = "http://localhost:8888/towa-trial/wp-json/wp/v2/posts";


        useEffect(() => {
            fetch(postsURL+"?page="+page)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setPosts(data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }, []);
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
                    <button onClick={addPage}>Next Page</button>
                </p>
            </div>
        )
    }
}
export default Posts
