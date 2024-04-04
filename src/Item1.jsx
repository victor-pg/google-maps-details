const parseFirstPhotoURL = (photos)=>{
    const photo = photos?.[0]?.getUrl();

    return photo;
}

export const Item1 = ({place_id, name, rating,international_phone_number, website, types, photos}) => {
    return <div className="item1">
        <img src={parseFirstPhotoURL(photos)} alt="da" width="200px" height="200px" style={{objectFit: "cover"}}/>
        <div><strong>ID:</strong> {place_id}</div>
        <div><strong>Name:</strong> {name}</div>
        <div><strong>Rating:</strong> {rating}</div>
        <div><strong>Phone:</strong> {international_phone_number}</div>
        <div><strong>URL:</strong> {website}</div>
        <div><strong>Types:</strong> {types.join(", ")}</div>
    </div>
}