import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const getDetail = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
        console.log(json);
    };
    useEffect(() => {
        getDetail();
    }, []);
    return (
        <div className={styles.container}>
            {loading ? (
                <div className={styles.loader}>
                    <span>Loading...</span>
                </div>
            ) : (
                <div className={styles.movie}>
                    <img src={movie.medium_cover_image} alt={movie.title} className={styles.movie__img} />
                    <div>
                        <h1>{movie.title}</h1>
                        <h2>★ {movie.rating}</h2>
                        <p>{movie.description_full}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Detail;
