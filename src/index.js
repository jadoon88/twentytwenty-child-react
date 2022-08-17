const {render, useState, useEffect} = wp.element;
import {Button, Container, Row, Col, Spinner, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Posts = () => {
    const postsUrl = "http://localhost:8888/towa-trial/wp-json/wp/v2/posts";
    const categoriesUrl = "http://localhost:8888/towa-trial/wp-json/wp/v2/categories";
    const perPage = 5;

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(["all"]);
    const [arePostsLoaded, setArePostsLoaded] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [disableNextPageButton, setDisableNextPageButton] = useState(false);
    const [disablePreviousPageButton, setDisablePreviousPageButton] = useState(true);

    function getTotalPages() {
        return totalPosts / perPage;
    }

    function islastPage() {
        return (page == getTotalPages());
    }

    function nextPage() {
        setPageForPagination(page + 1);
    }

    function setPageForPagination(page) {
        setArePostsLoaded(false);
        setPage(page);
    }

    function previousPage() {
        setPageForPagination(page - 1);
    }

    function buttonsEnableDisable() {
        if (page > 1) {
            setDisablePreviousPageButton(false);
        }
        if (page === 1) {
            setDisablePreviousPageButton(true);
        }
        if (islastPage()) {
            setDisableNextPageButton(true);
        } else {
            setDisableNextPageButton(false);
        }
    }

    function getPosts() {
        getCategories();
        let postsUrlWithParams = postsUrl + "?page=" + page + "&per_page=" + perPage;

        if (selectedCategoryId != "all") {
            postsUrlWithParams = postsUrlWithParams + "&categories=" + selectedCategoryId;
        }

        fetch(postsUrlWithParams)
            .then((response) => {
                return Promise.all([response.json(), response.headers]);
            }).then(([responseJson, headers]) => {
            buttonsEnableDisable();
            setPosts(responseJson);
            console.log(responseJson);
            setTotalPosts(parseInt(headers.get("X-WP-Total")));
            setArePostsLoaded(true);
        })
            .catch((err) => {
                console.log(err.message);
            });

    }

    function getCategories() {
        fetch(categoriesUrl)
            .then((response) => {
                return Promise.all([response.json(), response.headers]);
            }).then(([responseJson, headers]) => {
            console.log(responseJson);
            setCategories(responseJson);
        })
            .catch((err) => {
                console.log(err.message);
            });

    }

    useEffect(() => {
        getPosts();
    }, [page, selectedCategoryId]);

    return (

        <Container>
            <Row>
                <h4>Latest Posts</h4>
            </Row>
            <Row className={
                arePostsLoaded ? 'loader hidden' : 'loader'
            }>
                <Spinner animation="border"/>

            </Row>
            <Row className={
                arePostsLoaded ? 'posts-list' : 'posts-list hidden'
            }>
                <Row>
                    <select
                        value={selectedCategoryId}
                        name="categoryFilter"
                        id="category-filter"
                        onChange={e => setSelectedCategoryId(e.target.value)}
                    >
                        <option key="999" value="all">All</option>
                        {
                            categories.map(
                                (category, index) => (
                                    <option key={index} value={category.id}>{category.name}</option>
                                )
                            )
                        }
                    </select>
                </Row>
                <Row className="posts-list mt-10">
                    {
                        posts.map(
                            (post, index) => (
                                <Col lg={3} md={3} key={index}>

                                    <Row>
                                        <Image
                                            src=
                                                {
                                                    post.featured_image_url ?
                                                        post.featured_image_url : 'https://via.placeholder.com/600x400?text=No+image'
                                                }
                                        ></Image>
                                    </Row>

                                    <Row>
                                        <a href={post.link}>
                                            <h4>
                                                {post.title.rendered}
                                            </h4>
                                        </a>
                                    </Row>
                                    <Row>
                                        <span>{post.excerpt.rendered}</span>
                                    </Row>

                                </Col>
                            )
                        )
                    }

                </Row>
                <Row className="mt-5">
                    <Col lg={6} md={6}>
                        <Button id="button-previous" onClick={previousPage} disabled={disablePreviousPageButton}>
                            Previous Page
                        </Button>
                    </Col>
                    <Col lg={6} md={6} className="align-right">
                        <Button id="button-next" onClick={nextPage} disabled={disableNextPageButton} className="ml-1">
                            Next Page
                        </Button>
                    </Col>
                </Row>
            </Row>
            <Row>
            </Row>
        </Container>
    );
};
render(<Posts/>, document.getElementById("react-app"));