import React from 'react';

const MovieListHeading = (props) => {
	return (
		<div className='movie-heading'>
			<h1>{props.heading}</h1>
		</div>
	);
};

export default MovieListHeading;