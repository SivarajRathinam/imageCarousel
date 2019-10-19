import React,{useState,useEffect,useRef} from 'react';
import placeholder from '../images/placeholder.jpg';

const LazyImage = (props)=>{
	let [imageUrl,setImageUrl] = useState(placeholder)
	const imageRef = useRef();
	useEffect(()=>{
		if ("IntersectionObserver" in window){
			let imageObserver = new IntersectionObserver(function(entries, observer) {
				entries.forEach(function(entry) {
					if (entry.isIntersecting) {
						var image = entry.target;
						image.onerror = ()=>{setImageUrl(placeholder)}
						setImageUrl(props.image)
						imageObserver.unobserve(image);
					}
				});
			});
			imageObserver.observe(imageRef.current);
		}else{
			setImageUrl(props.image)
		}
	},[])
	return <div className="carousel-image-container">
				<div className="carousel-image-wrapper">
					<img ref={imageRef} src={imageUrl} />
				</div>
			</div>
}
export default LazyImage;