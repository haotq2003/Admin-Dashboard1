import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, X } from 'lucide-react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Toast } from '../ui/toast';

const UpLoadProduct = ({ imgFile, setImgFile, setUploadImgUrl,setImgLoadingState }) => {
  const inputRef = useRef(null);

  const handleImgFileChange = (event) => {
    const selectFile = event.target.files[0];
    if (selectFile) {
      if (selectFile.size > 5 * 1024 * 1024) { // 5MB limit
        Toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image under 5MB"
        });
        return;
      }
      if (!selectFile.type.startsWith('image/')) {
        Toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please select an image file"
        });
        return;
      }
      setImgFile(selectFile);
    }
  };

  function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('border-primary');
  }

  function handleDragLeave(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('border-primary');
  }

  function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('border-primary');
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.size > 5 * 1024 * 1024) {
        Toast({
          variant: "destructive",
          title: "File too large",
          description: "Please select an image under 5MB"
        });
        return;
      }
      if (!droppedFile.type.startsWith('image/')) {
        Toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please select an image file"
        });
        return;
      }
      setImgFile(droppedFile);
    }
  }

  function handleRemoveImage() {
    setImgFile(null);
    setUploadImgUrl('');
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const uploadImageToCloudinary = async () => {
    setImgLoadingState(true);
    try {
      const data = new FormData();
      data.append('my_file', imgFile);
      
      const res = await axios.post('http://localhost:8080/api/admin/products/upload-image', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res)
      if (res?.data?.success) {
        setUploadImgUrl(res.data.result.url);
        setImgLoadingState(false);
        Toast({
          title: "Success",
          description: "Image uploaded successfully"
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
     
    }
  };

  useEffect(() => {
    if (imgFile) {
      uploadImageToCloudinary();
    }
  }, [imgFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block mt-4">Upload image</Label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="border-2 rounded-lg border-dashed transition-colors duration-200 hover:border-primary"
      >
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputRef}
          onChange={handleImgFileChange}
          accept="image/*"
        />
        {!imgFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Drag and drop or click to upload image
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              (Max size: 5MB)
            </span>
          </Label>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FileIcon className="w-6 h-6 text-primary mr-2" />
                <span className="text-sm font-medium truncate max-w-[200px]">
                  {imgFile.name}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveImage}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {imgFile instanceof File && (
              <div className="w-full h-32 rounded-md overflow-hidden">
                <img
                  src={URL.createObjectURL(imgFile)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpLoadProduct;