const parseFirstPhotoURL = (photos)=>{
    const photo = photos?.[0]?.authorAttributions?.[0]?.photoUri;

    if(photo?.startsWith("//")){
        return photo.replace("//", "https://");
    }

    return photo;
}

export const Item2 = ({id, displayName, rating,internationalPhoneNumber, websiteUri, types, photos}) => {
    return <div className="item1">
        <img src={parseFirstPhotoURL(photos)} alt="da" width="200px" height="200px" style={{objectFit: "cover"}}/>
        <div><strong>ID:</strong> {id}</div>
        <div><strong>Name:</strong> {displayName.text}</div>
        <div><strong>Rating:</strong> {rating}</div>
        <div><strong>Phone:</strong> {internationalPhoneNumber}</div>
        <div><strong>URL:</strong> {websiteUri}</div>
        <div><strong>Types:</strong> {types.join(", ")}</div>
    </div>
}