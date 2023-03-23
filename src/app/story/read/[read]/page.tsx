"use client"
import Button from '@/app/components/Story/Button/Button';
import Rating from '@/app/components/Story/Rating/Rating';
import { useFetchStory } from '@/app/hooks/useFetchStory';
import { updateDocumentInFireStore } from '@/app/service/FirebaseService';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Style from './read.module.css';

const Read = () => {
    const documentPath = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_END_POINT as string;
    const { data } = useFetchStory(documentPath)
    const path = usePathname();
    const splitPath = path.split('/')
    const [rating, setRating] = useState<string>('0')
    const [status, setStatus] = useState<string>("pending")
    const [averageStoryRating, setAverageStoryRating] = useState<number>(0)
    const storyItem = data?.find((item) => item.slug === splitPath[3])
    const { box } = Style
  console.log("storyItem", storyItem?.rating)
    useEffect(() => {
        if(storyItem?.rating > 0) {
            const averageRating = (Number(storyItem?.rating) + Number(rating)) / storyItem?.ratedPeopleCount ?? 1
            setAverageStoryRating(Math.round(averageRating))
        }
    },[storyItem?.rating])

    function createMarkup() {
        const splitAnswer = data?.[0]?.story?.split("\n").filter((text: string) => text !== '');
        return splitAnswer.map((text: string, index: number) => <p key={`${index}`} className={Style.description}>{text}</p>)
    }
    const changeRatingHandler = (rating: string) => {
        setRating(rating)
    }

    const handlerSubmitRating = async () => {
        setStatus("process");
        const totalUsers = storyItem?.ratedPeopleCount + 1
        const totalRating = Number(storyItem?.rating) + Number(rating)
        await updateDocumentInFireStore(documentPath, {
            rating: totalRating,
            ratedPeopleCount: totalUsers
        }, storyItem?.id,).then(() => {
            setStatus("success");
            window.location.reload()
        }).catch(() => {
            setStatus("failed")
        })
    }

    return (
        <div className={box}>
            {storyItem ? <>
                <h2>Title :: {storyItem?.title}</h2>
                {createMarkup()}
                <div className={Style.extraInformation}>
                    <span>Rating : {averageStoryRating} out of 5</span>
                    <span>Prompt : {storyItem?.prompt.map((prompt: string, index: number) => {
                        return <span key={`${index}`} className={Style.prompt}>{prompt}</span>
                    })}</span>
                    <div>
                        Share link : <a href={storyItem?.sharedLink} className={Style.link}>{storyItem?.sharedLink}</a>
                    </div>
                </div>
                    <Rating rating={rating} onRatingChange={changeRatingHandler} />
                    <Button isDisabled={(!rating) ? true : false} status={status} onClick={() => handlerSubmitRating()} buttonText="Rating the story" />
            </> : "Loading..."}
        </div>
    )
}
export default Read;