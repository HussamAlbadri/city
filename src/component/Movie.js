import React, {Component} from "react";

class Movie extends Component{
    render() {
        return(
            <div>
                <p>Title: {this.props.movieCon.title}</p>
                <p>Overview: {this.props.movieCon.over_view}</p>
                <p>Number Of Votes: {this.props.movieCon.vote}</p>
                <p>Total: {this.props.movieCon.numberOfTotalVotes}</p>
                <img src={this.props.movieCon.image_path} alt={this.props.movieCon.title}/>
                <p>Popularity: {this.props.movieCon.popularity}</p>
                <p>Released In: {this.props.movieCon.release_date}</p>
            </div>
        )
    }
}
export default Movie;