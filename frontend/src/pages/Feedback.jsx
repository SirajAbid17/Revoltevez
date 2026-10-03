import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchMyFeedback,
  resetSubmitState,
} from "../store/slices/feedbackSlice";
import LoginRequired from "../components/Feedback/LoginRequired";
import FeedbackSubmitted from "../components/Feedback/FeedbackSubmitted";
import FeedbackForm from "../components/Feedback/FeedbackForm";

export default function Feedback() {
  const dispatch = useAppDispatch();

  const {
    myFeedback,
    myFeedbackLoading,
    myFeedbackChecked,
  } = useAppSelector((s) => s.feedback);
  const { user } = useAppSelector((s) => s.auth);

  // Check if user already submitted
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchMyFeedback(user.email));
    }
  }, [user, dispatch]);

  // Cleanup submit state on unmount
  useEffect(() => {
    return () => {
      dispatch(resetSubmitState());
    };
  }, [dispatch]);

  // ============ NOT LOGGED IN ============
  if (!user) {
    return <LoginRequired />;
  }

  // ============ LOADING ============
  if (myFeedbackLoading || !myFeedbackChecked) {
    return (
      <div className="min-h-screen bg-[#f7f7f5] flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[13px] text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // ============ ALREADY SUBMITTED ============
  if (myFeedback) {
    return <FeedbackSubmitted feedback={myFeedback} user={user} />;
  }

  // ============ FORM (FIRST TIME) ============
  return <FeedbackForm user={user} />;
}