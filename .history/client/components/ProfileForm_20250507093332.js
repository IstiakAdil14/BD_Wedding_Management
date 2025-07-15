import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProfilePictureUpload from "./ProfilePictureUpload";

export default function ProfileForm({ onSave, initialProfile }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(true);
