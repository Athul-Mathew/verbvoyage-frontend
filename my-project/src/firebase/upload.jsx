// import React, { useEffect, useState } from 'react'
// import { videoDb } from './config'
// import { v4 as uuidv4 } from 'uuid' // Import v4 as uuidv4
// import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage'

// function Upload() { // Rename the component to follow React naming conventions
//     const [vdo, setVdo] = useState(null) // Initialize with null instead of an empty string
//     const [vdourl, setVdoUrl] = useState([]) // Initialize with an empty array

//     const handleClick = () => {
//         if (vdo) {
//             const vdoRef = ref(videoDb, `files/${uuidv4()}`) // Use uuidv4 from the import
//             uploadBytes(vdoRef, vdo)
//                 .then(() => {
//                     console.log('Video uploaded successfully');
//                 })
//                 .catch(error => {
//                     console.error('Error uploading video:', error);
//                 });
//         }
//     }

//     useEffect(() => {
//         listAll(ref(videoDb, "files"))
//             .then(vdos => {
//                 const promises = vdos.items.map(val =>
//                     getDownloadURL(val)
//                         .then(url => url)
//                         .catch(error => {
//                             console.error('Error getting download URL for video:', error);
//                             return null; // Return null for failed URLs
//                         })
//                 );

//                 Promise.all(promises)
//                     .then(urls => {
//                         // Filter out null URLs (failed downloads)
//                         setVdoUrl(urls.filter(url => url !== null));
//                     })
//                     .catch(error => {
//                         console.error('Error while fetching video URLs:', error);
//                     });
//             })
//             .catch(error => {
//                 console.error('Error listing videos:', error);
//             });
//     }, [])

//     return (
//         <div className='App'>
//             <input type="file" onChange={(e) => setVdo(e.target.files[0])} />
//             <button onClick={handleClick}>Upload</button>
//             <br />
//             {
//                 vdourl.map(dataVal => (
//                     <div key={dataVal}>
//                         <video src={dataVal} height={200} width={200} />
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default Upload;
