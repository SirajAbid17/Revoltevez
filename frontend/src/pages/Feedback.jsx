import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchMyFeedback,
  resetSubmitState,
} from "../store/slices/feedbackSlice";
import LoginRequired from "../components/Feedback/LoginRequired";
import FeedbackSubmitted from "../components/Feedback/FeedbackSubmitted";
import FeedbackForm from "../components/Feedback/FeedbackForm";
import Loader from "../components/common/Loader";

export default function Feedback() {
  const dispatch = useAppDispatch();

  const {
    myFeedback,
    myFeedbackLoading,
    myFeedbackChecked,
  } = useAppSelector((s) => s.feedback);
  const { user } = useAppSelector((s) => s.auth);


  useEffect(() => {
    if (user?.email) {
      dispatch(fetchMyFeedback(user.email));
    }
  }, [user, dispatch]);

  
  useEffect(() => {
    return () => {
      dispatch(resetSubmitState());
    };
  }, [dispatch]);


  if (!user) {
    return <LoginRequired />;
  }

 
  if (myFeedbackLoading || !myFeedbackChecked) {
    return <Loader fullPage size="lg" text="Loading..." />;
  }

 
  if (myFeedback) {
    return <FeedbackSubmitted feedback={myFeedback} user={user} />;
  }

 
  return <FeedbackForm user={user} />;
}