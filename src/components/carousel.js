import React from 'react';
import ReactDOM from 'react-dom';
import jsonData from '../data/data';
// import Item from './item';
import '../style/index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight,faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const ItemComponent = React.lazy(()=>import('./item'))
class Carousel extends React.PureComponent{
	constructor(){
		super()
		this.state = {
			data:{},
			itemWidth:0,
			leftArrow:false,
			rightArrow:true
		}
		this.resizeTimeout = null;
		this.scrollTimeout = null;
		this.myRef = React.createRef();
	}
	componentDidMount(){
		this.updateItemWidth()
		this.setState({
			data:jsonData
		})
		window.addEventListener('resize',()=>this.handleResize())
		this.myRef.current.addEventListener('scroll',()=>this.handleScroll())
		this.handleArrow()
	}
	componentWillUnmount(){
		window.removeEventListener('resize',()=>this.handleResize())
		this.myRef.current.removeEventListener('scroll',()=>this.handleScroll())
	}
	handleResize(){
		if(this.resizeTimeout) 
			clearTimeout(this.resizeTimeout)
		this.resizeTimeout = setTimeout(()=>this.updateItemWidth(),20)
	}
	handleScroll(){
		if(this.scrollTimeout)
			clearTimeout(this.scrollTimeout)
		this.scrollTimeout = setTimeout(()=>this.handleArrow(),150)
	}
	updateItemWidth(){
		let total_width = this.myRef.current.offsetWidth;
		let config = this.props.config || {}
		let productsCount = config.productsInBatch || 5;
		if(this.isMobile()){
			productsCount = config.mobile.productsInBatch || 2
		}else if(this.isTablet()){
			productsCount = config.tablet.productsInBatch || 3
		}
		let item_width = (total_width/productsCount)-20
		this.setState({
			itemWidth:item_width
		})
		this.myRef.current.scroll(0,0)
	}
	isMobile(){
		return window.innerWidth <= 500
	}

    isTablet(){
    	return (window.innerWidth <= 768 && window.innerWidth > 500)
    }
	loadItems(){
		let state = this.state;
		console.log(state);
		if(state.data && 'items' in state.data){
			let items = state.data.items;
			return items.map((item)=>{
						return <React.Suspense fallback={<div className="loader"></div>}>
								<ItemComponent data={item} config={{width:this.state.itemWidth}} key={item._id}/>
								</React.Suspense>
					})
		}
		return null
	}
	handleRightArrow(){
		this.myRef.current.scrollBy(this.state.itemWidth+20,0)
		// this.handleArrow()
	}
	handleArrow(){
		let newState = {...this.state}
		let DomNode = ReactDOM.findDOMNode(this.myRef.current)
		let scrollPosition =DomNode.scrollLeft
		let isUpdated = false 
		if(scrollPosition>0 && !newState.leftArrow){
			newState.leftArrow = true
			isUpdated = true
		}else if((scrollPosition==0 || scrollPosition <this.state.itemWidth)&&newState.leftArrow){
			newState.leftArrow = false
			isUpdated=true
		}
		if(scrollPosition>=parseInt(DomNode.offsetWidth-this.state.itemWidth) && newState.rightArrow){
			newState.rightArrow = false
			isUpdated=true
		}else if(scrollPosition<parseInt(DomNode.offsetWidth-this.state.itemWidth) && !newState.rightArrow){
			newState.rightArrow = true
			isUpdated=true
		}
		if(isUpdated)this.setState(newState)
	}
	handleLeftArrow(){
		this.myRef.current.scrollBy(-(this.state.itemWidth+20),0)
		// this.handleArrow()	
	}
	render(){
		return <div className="carousel">
					<div ref={this.myRef} className="carousel-container">
						{this.loadItems()}
					</div>
					<div className="carousel-arrow-container">
						{this.state.leftArrow && <span onClick={()=>this.handleLeftArrow()} className="carousel-arrow carousel-left-arrow"><FontAwesomeIcon icon={faAngleLeft}/></span>}
						{this.state.rightArrow && <span onClick={()=>this.handleRightArrow()} className="carousel-arrow carousel-right-arrow"><FontAwesomeIcon icon={faAngleRight}/></span>}
					</div>
				</div>
	}
}

export default Carousel;