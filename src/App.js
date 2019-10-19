import React from 'react';
const CarouselComponent = React.lazy(()=>import('./components/carousel'))
// import Carousel from './components/carousel'

const App = ()=>{
	let config={
		mobile:{
			productsInBatch:2
		},
		tablet:{
			productsInBatch:3
		},
		productsInBatch:5
	}
	return <React.Suspense fallback={<div className="loader"></div>}> 
				<CarouselComponent config={config}/>
			</React.Suspense>
}

export default App;