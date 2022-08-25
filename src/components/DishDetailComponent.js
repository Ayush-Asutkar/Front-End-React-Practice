import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // selectedDishDetail : null  //might require to fix it
        };
    }

    renderDish(dish) {
        if(dish == null) {
            return (
                <div></div>
            );
        } else {
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }
    }

    renderComments(comments) {
        if(comments == null) {
            return (
                <div></div>
            );
        }

        const currentComment = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(comment.date))}</p>
                </li>
            );
        })

        return (
            <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {currentComment}
                </ul>
            </div>
        );
    }

    render() {
        const dish = this.props.dish;

        const dishItem = this.renderDish(dish);

        //NullPointerException
        if(dish == null) {
            return (
                <div></div>
            );
        }
        const dishComment = this.renderComments(dish.comments);

        return (
            <div className="container">
                <div className="row">
                    {dishItem}
                    {dishComment}
                </div>
            </div>
        );
    }
}

export default DishDetail;