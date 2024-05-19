import React, { useState } from 'react'
import { Online } from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { Button, FileInput, Label } from 'flowbite-react'

const Takelogs = () => {
  const [folder, setFolder] = useState()

  const handleChange = (e) => {
    // console.log(e.target.files[0])
    // console.log(e.target.files[0].name)
    const fileName = e.target.files[0].name
    const res = e.target.files[0].path
    // console.log(res)

    const lastIndex = res.lastIndexOf('\\')

    // console.log(res.substring(0, lastIndex))

    if (lastIndex !== -1) {
        setFolder(res.substring(0, lastIndex + 1));
      console.log(res.substring(0, lastIndex + 1))
    } else {
      console.log(res)
    }
  }

  // const handleChange = (e) => {
  //     const fileName = e.target.files[0].name;
  //     const filePath = e.target.value; // This is the path, but it's usually not the full path in browser environments

  //     // Extract directory path using lastIndexOf
  //     const lastIndex = filePath.lastIndexOf('\\');
  //     const directoryPath = lastIndex !== -1 ? filePath.substring(0, lastIndex + 1) : filePath;

  //     console.log("File Name:", fileName);
  //     console.log("Full File Path:", filePath); // Typically doesn't give full path in browsers
  //     console.log("Directory Path:", directoryPath);
  // }
  return (
    <div className="bg-white w-screen h-screen p-5">
      <div className="flex justify-between ">
        <Online />
        <Link to="/" className="p-2 border-2 rounded-lg text-white bg-black/80">
          Back to Home
        </Link>
      </div>
      <div className="px-24 pt-5">
        <div>
          <Label htmlFor="large-folder-upload" value="Select a Folder" />
        </div>
        {/* <Button onClick={openDirectoryPicker}>Select Folder</Button> */}
        <input type="file" webkitdirectory="true" dir="true" onChange={handleChange} />
        <p className="text-black">{folder && folder}</p>
      </div>
      <div className="border border-gray-300 bg-black/90 mx-10 mt-10 h-96 overflow-y-auto p-2 rounded-xl">
        <pre className="text-white/80"></pre>
      </div>
    </div>
  )
}

export default Takelogs