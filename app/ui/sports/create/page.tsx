"use client";

import { XMarkIcon, PlusIcon } from "@heroicons/react/24/solid";
import { UIContext } from "../../../../store/ui-context";
import React, { useRef, useState, useContext } from "react";
import { createSport } from "@/app/lib/actions";

const CreateSport = () => {
  // Manage Closing State
  const UICtx = useContext(UIContext);
  // Input Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  // Manage State for preview and submission
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Add and display Image
  const handleAddImage = (event: any) => {
    event.preventDefault(); // Prevent default behavior
    fileInputRef.current?.click();
  };

  // Remove Image
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  // Handle File Change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type (optional)
    if (!file.type.match("image/*")) {
      alert("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameInputRef.current?.value.trim();

    if (!name) {
      console.error("Name field is empty");
      return;
    }
    // Create form
    const form = event.currentTarget;
    // Create fileInput to find the image file (here we are casting the elements as HTMLInputForm for TS to access)
    const fileInput = Array.from(form.elements).find(
      (element) => (element as HTMLInputElement).name === "file"
    ) as HTMLInputElement;

    // Create new instance of formData to append and upload
    const formData = new FormData();

    //Iterate through all files in input, and append them to files (future proof)
    if (fileInput.files) {
      for (let i = 0; i < fileInput.files.length; i++) {
        const file = fileInput.files[i];
        formData.append("file", file);
      }

      // Upload to Cloudinary
      formData.append("upload_preset", "my-uploads");

      const data = await fetch(
        "https://api.cloudinary.com/v1_1/because-frank/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      console.log(data.secure_url);

      // Add to database
      if (data.secure_url) {
        const createdSport = {
          name,
          image: data.secure_url,
        };
        console.log("Data to be sent to backend:", createdSport);
        createSport(createdSport);
        UICtx.showModalAction();
      } else {
        console.error("Error uploading image to Cloudinary");
      }
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-surface-light border-[1px] dark:bg-surface-primary-dark dark:border-outline-medium-dark p-10 w-[714px] overflow-scroll rounded-lg z-20">
      <div className="gap-y-5 dark:bg-surface-primary-dark">
        <div className="flex justify-between py-2">
          <p className="font-semibold text-2xl">Create Sport Category</p>
          <button onClick={UICtx.showModalAction}>
            <XMarkIcon className="w-8 p-2 border border-outline-medium rounded-full" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="sport-name" className="py-4">
              Sport Name
            </label>
            <input
              className="block w-full rounded-md border focus:ring-0 focus:outline-none focus:border-primary-primary active:border-primary-primary py-[9px] pl-6 text-sm outline-2 placeholder:text-gray-500 dark:bg-surface-extra-light-dark"
              ref={nameInputRef}
              name="name"
              type="text"
              maxLength={50}
              placeholder="Enter Sport Name"
              required
            />
          </div>

          <div className="py-4">
            <h2>Sport Image</h2>
            <div className="w-36 h-36 bg-primary-light dark:bg-primary-light-dark border border-dotted border-primary-primary dark:border-primary-primary-dark flex justify-center rounded gap-y-4 mt-3 relative overflow-hidden">
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Selected Sport Image"
                    className="w-36 h-36 object-cover rounded absolute top-0 left-0"
                  />
                  <button
                    className="absolute top-2 right-2 rounded-full bg-gray-200 hover:bg-gray-300 p-1"
                    onClick={handleRemoveImage}
                  >
                    <XMarkIcon className="w-4 text-black hover:text-gray-600" />
                  </button>
                </>
              ) : (
                <button
                  className="flex items-center text-xs text-primary-primary dark:text-primary-primary-dark"
                  onClick={handleAddImage}
                >
                  Add Photo
                  <PlusIcon className="w-3 ml-1" />
                </button>
              )}
              <input
                className="hidden"
                name="file"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className=" text-black font-medium text-sm rounded py-2 px-6 mr-2 border border-black dark:border-surface-primary dark:text-surface-primary "
              onClick={UICtx.showModalAction}
            >
              Cancel
            </button>
            <button
              className="bg-primary-primary dark:bg-primary-primary-dark text-primary-light dark:text-outline-medium-dark font-medium text-sm rounded py-2 px-6 border border-transparent"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSport;
