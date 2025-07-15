import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const PortfolioEventDialog = ({ isOpen, onClose, onSave, event }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([""]);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEditorState, setDescriptionEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setCategory(event.category || "");
      setImages(event.images && event.images.length > 0 ? event.images : [""]);
      setVideo(event.video || "");
      if (event.description) {
        try {
          let contentState;
          if (typeof event.description === "string") {
            contentState = convertFromRaw(JSON.parse(event.description));
          } else {
            contentState = convertFromRaw(event.description);
          }
          setDescriptionEditorState(
            EditorState.createWithContent(contentState)
          );
          setDescription(
            typeof event.description === "string"
              ? event.description
              : JSON.stringify(event.description)
          );
        } catch {
          setDescriptionEditorState(EditorState.createEmpty());
          setDescription("");
        }
      } else {
