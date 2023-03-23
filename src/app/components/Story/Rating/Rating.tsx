import React, { SetStateAction } from 'react'
import styles from './rating.module.css'

interface RatingProps {
    onRatingChange: (value:string) => void
    rating: string
}
const Rating: React.FC<RatingProps> = ({
    onRatingChange,
    rating
}) => {
    const addRatingHandler = (rating: string) => {
        onRatingChange(rating)
    }
    return (
            <article className={`${styles.card} ${styles.rating_card}`}>
                <h1 className={styles.title}>How would you like a story?</h1>
                <ul className={styles.ratings}>
                    <li onClick={() => addRatingHandler("1")} className={`${styles.circle} ${styles.rating} ${rating === "1" && styles.ratingSelected}`} data-rating="1">1</li>
                    <li  onClick={() => addRatingHandler("2")} className={`${styles.circle} ${styles.rating}  ${rating === "2" && styles.ratingSelected}`} data-rating="2">2</li>
                    <li onClick={() => addRatingHandler("3")} className={`${styles.circle} ${styles.rating}  ${rating === "3" && styles.ratingSelected}`} data-rating="3">3</li>
                    <li  onClick={() => addRatingHandler("4")} className={`${styles.circle} ${styles.rating}  ${rating === "4" && styles.ratingSelected}`} data-rating="4">4</li>
                    <li onClick={() => addRatingHandler("5")} className={`${styles.circle} ${styles.rating}  ${rating === "5" && styles.ratingSelected}`} data-rating="5">5</li>
                </ul>
            </article>
   
    )
}

export default Rating