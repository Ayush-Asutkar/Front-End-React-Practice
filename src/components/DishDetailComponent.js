import React, { Component } from "react";
import { Card, 
    CardImg, 
    //CardImgOverlay, 
    CardText, 
    CardBody, 
    CardTitle,
    Breadcrumb, 
    BreadcrumbItem, 
    Button,
    Modal, 
    ModalHeader, 
    ModalBody, 
    Label, 
    Row, 
    Col 
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalFormCommentFormOpen: false
        };
        this.toggleModalFormCommentForm = this.toggleModalFormCommentForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModalFormCommentForm() {
        this.setState({
            isModalFormCommentFormOpen: !this.state.isModalFormCommentFormOpen
        });
    }

    handleSubmit(values) {
        this.toggleModalFormCommentForm();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModalFormCommentForm}>
                    <span className="fa fa-pencil fa-lg"></span> Comment
                </Button>
                <Modal isOpen={this.state.isModalFormCommentFormOpen} toggle={this.toggleModalFormCommentForm}>
                    <ModalHeader toggle={this.toggleModalFormCommentForm}><span style={{fontWeight: 'bold'}}>Submit Comment</span></ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
            
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
                <FadeTransform in
                    transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
}

function RenderComments({comments, postComment, dishId}) {
    if(comments == null) {
        return (
            <div></div>
        );
    }

    const currentComment = comments.map(comment => {
        return (
            <Fade in>
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(comment.date))}</p>
                </li>
            </Fade>
        );
    })

    return (
        <div className="col-12 col-md-5 m-1">
            <h4> Comments </h4>
            <ul className='list-unstyled'>
                <Stagger in>
                    {currentComment}
                </Stagger>
            </ul>
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    );
}

const DishDetail = (props) => {
    if(props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish != null) {
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
                    <RenderComments comments={props.comments}
                        postComment={props.postComment}
                        dishId={props.dish.id}
                    />
                    
                </div>
            </div>
        );
    } else { 
        //NullPointerException
        return (
            <div></div>
        );
    }
}

export default DishDetail;