import React, { Component } from "react";
import { getDoctorReviewService } from "../services";
import "./ReviewList.scss";
import { Rate } from "antd";

export default class ReviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
        };
    }
    async componentDidUpdate(prevProps) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getDoctorReviewService(this.props.doctorId);
            console.log(' GET REVIEW By Nhat Ba: ', res);
            if (res && res.errCode === 0) {
                this.setState({
                    reviews: res.data,
                });
            }
        }
    }

    render() {
        let { reviews } = this.state;
        return (
            <div className="review-list-container container">
                <h2>Phản hồi của bệnh nhân sau khi đi khám</h2>
                <div className="feedback-list">
                    {reviews &&
                        reviews.map((review, index) => {
                            let rating = parseInt(review.rating)
                            return (
                                <div className="feedback-item" key={index}>
                                    <div className="feedback-name">
                                        <strong>
                                            {`${review.firstName} ${review.lastName}`}
                                            &nbsp; &nbsp;
                                        </strong>
                                        <a className="feedback-info">
                                            <i className="fas fa-check-circle"></i>
                                            &nbsp; {review.createdAt}
                                        </a>
                                        <div className="rating">
                                            {rating != 0 && rating && (
                                                <Rate
                                                    disabled
                                                    allowHalf
                                                    defaultValue={rating != 0 ? rating : 0}
                                                />
                                            )}

                                        </div>
                                    </div>
                                    <div className="feedback-content">
                                        {review.comment}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}
