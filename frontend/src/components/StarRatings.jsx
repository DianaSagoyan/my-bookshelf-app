export default function StarRating({value = 0, onChange, readOnly = false}){
    const stars = [1, 2, 3, 4, 5];

    return(
        <div className="star-rating">
            {stars.map(star => (<span 
            key={star}
            className={`star ${star <= value ? "star-filled" : "star-empty"}`}
            onClick={readOnly ? undefined : () => onChange(star)}
            style={{cursor: readOnly? "default" : "pointer"}}
            >★</span>))}
        </div>
    )
}