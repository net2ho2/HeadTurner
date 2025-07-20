import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./HairCare.css";
import Banner from "../../Global/Banner/Banner";
import CategoryList from "../../Global/CategoryList/CategoryList";

const HairCare = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const API_URL = "https://686cb72914219674dcc8dafa.mockapi.io/Postdetail";

    useEffect(() => {
        axios.get(API_URL).then((res) => setPosts(res.data));
    }, []);

    const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="container-haircare">
            <Banner menu="Tin tức" img="https://theme.hstatic.net/200000893323/1001256440/14/blog_banner.jpg?v=1587" />
            <div className="haircare-page">
                <div className="haircare-main">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <div className="post-card" key={post.id}>
                                <img src={post.image} alt="post" className="post-image" />
                                <div className="post-content">
                                    <Link to={`/post/${post.id}`} className="post-title">
                                        {post.title}
                                    </Link>
                                    <p className="post-desc">{post.desc}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-result">Không có bài viết nào phù hợp.</div>
                    )}
                </div>

                <div className="haircare-sidebar">
                    <div className="search-box">
                        <p className="search-post">TÌM KIẾM</p>
                        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>

                    <div className="sidebar-section">
                        <h4>BÀI VIẾT MỚI</h4>
                        <ul className="latest-posts">
                            {posts.slice(0, 3).map((post) => (
                                <li key={post.id}>
                                    <Link to={`/post/${post.id}`} className="latest-link">
                                        <img src={post.image} alt="thumb" />
                                        <div>
                                            <div className="latest-title">{post.title}</div>
                                            <div className="latest-date">{post.date}</div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <CategoryList />
                </div>
            </div>
        </div>
    );
};

export default HairCare;
