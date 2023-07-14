import * as React from 'react';
import './App.css';

import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';


function FakeModal({ src }: {src: string}) {
  const [crop, setCrop] = React.useState<Crop>();

  return(<>
    <h1>ready!</h1>

    <ReactCrop crop={crop}
      onChange={c => setCrop(c)}
      aspect={1}
      circularCrop
    >
      <img src={src}
        alt="Crop me"
      />
    </ReactCrop>
    {/* <button onClick={handleCrop}>Crop and Upload</button> */}
  </>);
};

function App() {
  const [photo, setPhoto] = React.useState('');
  const [cropStatus, setCropStatus] = React.useState(false);

  const handlePhoto = function(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const newPhoto = URL.createObjectURL(file);
      setPhoto(newPhoto);
      setCropStatus(true);
    }
  };

  return (
    <div className="App">

      {cropStatus ? <FakeModal src={photo} /> : <input type='file' onChange={handlePhoto}/>}


    </div>
  );
}

export default App;
