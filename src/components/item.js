import React from 'react';
import LazyImage from './lazyImage'

const Item = (props)=>{
	let isShippingAvailable = (props.data.price.sellPrice>200)
	let isDiscountAvailable = (props.data.price.discountPercentage>0)
	console.log(isDiscountAvailable)
	let discount_value = `${props.data.price.discountPercentage}% OFF`
	return <div className="carousel-item" style={{width:props.config.width}}>
				<LazyImage image={props.data.images.primary.base}/>
				<div className="carousel-item-name">{props.data.system.name}</div>
				<div className="carousel-item-price-container">
					<div className="carousel-item-price">{`SAR ${Number(props.data.price.sellPrice).toFixed(2)}`}</div>
					<div className="carousel-item-listprice">{`SAR ${Number(props.data.price.invoicePrice).toFixed(2)}`}</div>
				</div>
				{isShippingAvailable && <div className="carousel-item-free-shipping">free shipping</div>}
				{isDiscountAvailable && <div className="carousel-item-discount">{discount_value}</div>}
			</div>
}

export default Item;