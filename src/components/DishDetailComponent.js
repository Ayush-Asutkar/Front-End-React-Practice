import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class CommentForm extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
            
    //     }
    // }

    render() {
        return(
            <Button outline>
                <span className="fa fa-pencil fa-lg"></span> Comment
            </Button>
        );
    }
}


function RenderDish({dish}) {
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

function RenderComments({comments}) {
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
            <CommentForm />
        </div>
    );
}

const DishDetail = (props) => {

    //NullPointerException
    if(props.dish == null) {
        return (
            <div></div>
        );
    }
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
                
            </div>
        </div>
    );
}

export default DishDetail;