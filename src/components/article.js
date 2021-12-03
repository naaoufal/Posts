import { useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import './style/main.css'
import Articles from '../datas/data';

const Article = () => {

    var postPerPage = 3;
    const [filtred, setFiltred] = useState(Articles.slice(0, postPerPage))
    // const [articles, setArticles] = useState({
    //     items: Articles.slice(0, postPerPage)
    // });
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    var postNumber = postPerPage; 

    // function to search :
    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        // console.log(value);
        result = Articles.filter((data) => {
        return data.title.search(value) != -1;
        });
        setFiltred(result);
        // console.log(articles.items)
    }

    useEffect(() => {
        // function to handle load data when scrolling :
        function handleScroll () {
            setLoading(true);
            var isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;
            if (isAtBottom) {
                // console.log(postNumber, Articles.length)
                if(postNumber > Articles.length) {
                    setHasMore(false)
                } else {
                    setTimeout(() => {
                        postNumber += postPerPage;
                        setLoading(false);
                        setFiltred(
                            Articles.slice(0, postNumber)
                        );
                    }, 4000);
                }
            }
        }

        window.addEventListener("scroll", handleScroll);
    }, [])

    return (
        <div className="container">
            <div class="d-flex justify-content-end" id="search">
                <div className="left-inner-addon input-container">
                    <i class="fa fa-search"></i>
                    <input onChange={(event) => handleSearch(event)} className="inp" type="text" placeholder="Recherche par mot clé" />
                </div>
            </div>

            {/* test */}
            {/* end test */}
        
            {filtred.map((article, index) => (
                <div key={index} className="" id="card">
                    <div className="row">
                        <div className="col-4">
                            <div className="badge">
                                <p className="badge-title">{article.tag}</p>
                            </div>
                            <img id="img" src={article.image} />
                        </div>
                        <div className="col-md-7">
                            <p className="title">{article.title} {article.id}</p>
                            <p className="description">{article.desc}</p>
                            <div className="d-flex justify-content-start" id="container-more">
                                <span className="line"></span>
                                <span className="more">
                                    <a href="#">
                                        Lire plus
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {loading && hasMore ? <center><img src="images/loading.gif" /></center> : null}
        </div>
    )

}

export default Article;