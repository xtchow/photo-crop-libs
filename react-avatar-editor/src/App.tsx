import * as React from 'react';
import './App.css';

import AvatarEditor from 'react-avatar-editor';

const MyEditor = function({ src }: {src: string}) {
  const editorRef = React.useRef<AvatarEditor | null>(null);

  const [result, setResult] = React.useState('');

  const handleCrop = () => {
    console.log('in handle crop');

    if (editorRef.current) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      const canvas = editorRef.current.getImage();
      // console.log('canvas', canvas, typeof canvas.toDataURL());

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      // const canvasScaled = editorRef.current.getImageScaledToCanvas();

      setResult(canvas.toDataURL());
    }

  };

  return (<>
    <h1>Ready</h1>

    {result !== '' && <img
      className='avatar'
      src={result}
      width='175'
      height='175'
      alt='selected'
    />}

    <AvatarEditor
      // image="http://example.com/initialimage.jpg"
      image={src}
      width={250}
      height={250}
      border={50}
      color={[255, 255, 255, 0.6]} // RGBA
      scale={1.2}
      rotate={0}
      // className='avatar'
      borderRadius={200}
      ref={editorRef}
    />
    <button onClick={handleCrop}>Crop and Upload</button>
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
      {cropStatus ? <MyEditor src={photo} /> : <input type='file' onChange={handlePhoto}/>}

    </div>
  );
}

export default App;
