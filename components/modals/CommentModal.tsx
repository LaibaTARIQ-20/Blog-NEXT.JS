"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { closeCommentModal } from "@/redux/slices/modalSlice";
import { Modal, Box } from "@mui/material";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import PostHeader from "../PostHeader";
import PostInput from "../PostInput";

export default function CommentModal() {
  const isOpen = useSelector(
    (state: RootState) => state.modals.commentModalOpen,
  );
  const commentDetails = useSelector(
    (state: RootState) => state.modals.commentDetails,
  );
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(closeCommentModal());
  }

  if (!commentDetails) return null;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-150 max-h-[90vh] bg-white rounded-xl shadow-xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b border-gray-100 p-4">
          <XMarkIcon
            className="w-6 h-6 cursor-pointer hover:bg-gray-100 rounded-full p-1"
            onClick={handleClose}
          />
        </div>

        {/* Original Post */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex space-x-3">
            <Image
              src="/assets/profile-pic.png"
              width={48}
              height={48}
              alt="User"
              className="rounded-full"
            />

            <div className="grow">
              <PostHeader
                name={commentDetails.name}
                username={commentDetails.username}
                timestamp={commentDetails.timestamp}
                text={commentDetails.text}
              />

              <p className="text-gray-500 mt-4">
                Replying to{" "}
                <span className="text-[#F4AF01]">
                  @{commentDetails.username}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Reply Input */}
        <div className="pb-4">
          <PostInput insideModal={true} />
        </div>
      </Box>
    </Modal>
  );
}
