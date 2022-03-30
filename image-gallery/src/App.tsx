import React, { useRef, useState } from 'react';
import './App.css';
import ImageBox from './components/ImageBox';

function App() {
  const inpRef = useRef<HTMLInputElement>(null);
  const [imageList, setImageList] = useState<string[]>([])

  return (
    <div className="container">
      <div className={"gallery-box " + (imageList.length > 0 && "row")}>
        {
          imageList.length === 0 && <div className="text-center">
          이미지가 없습니다.<br/>
          이미지를 추가해주세요.
        </div>
        }
        <input type="file" ref={inpRef} onChange={(e) => {
          if (e.currentTarget.files?.[0]) {
            const file = e.currentTarget.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = event => {
              setImageList(prev => [...prev, event.target?.result as string])
            }
          } 
          

        }}/>
        <div className="plus-box" onClick={() => {
          inpRef.current?.click();
        }}>
            +
        </div>
        {
          imageList.map((el, idx) => <ImageBox key={el + idx} src={el}/>)
        }
      </div>
    </div>
  );
}

export default App;
