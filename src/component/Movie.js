import React, {Component} from "react";

class Movie extends Component{
    render() {
        return(
            <div>
                <p>Title: {this.props.allMovieData.title}</p>
                <p>Overview: {this.props.allMovieData.overview}</p>
                <p>Number Of Votes: {this.props.allMovieData.average_votes}</p>
                <p>Total: {this.props.allMovieData.total_votes}</p>
                <img src={this.props.allMovieData.image_url} alt={this.props.allMovieData.title}/>
                <p>Popularity: {this.props.allMovieData.popularity}</p>
                <p>Released In: {this.props.allMovieData.released_on}</p>
            </div>
        )
    }
}
export default Movie;