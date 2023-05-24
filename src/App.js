import './App.css';
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Preview from './components/Preview';
import PortfolioHead from './components/PortfolioHead';
import PortfolioSegment from './components/PortfolioSegment';
import PortfolioSkill from './components/PortfolioSkill';
import { Font } from '@react-pdf/renderer';
import Roboto from './fonts/Roboto-Regular.ttf'

Font.register({
  family: 'Roboto',
  fonts: [
    {
      format: "truetype",
      src: Roboto,
    },
  ]
});

function App() {
  const [paragraphs, setParagraphs] = useState([]);
  const [head, setHead] = useState({});
  const [segment, setSegment] = useState({});
  const [isVisible, setIsVisible] = useState(true);
  const [topColor, setTopColor] = useState('#66AFBF');
  const [topText, setTopText] = useState('#F2F2F3');
  const [bottomColor, setBottomColor] = useState('#F2F2F3');
  const [bottomText, setBottomText] = useState('#000000');

  const handleTopColorChange = (color) => {
    setTopColor(color);
  };
  
  const handleTopTextChange = (color) => {
    setTopText(color);
  };

  const handleBottomColorChange = (color) => {
    setBottomColor(color);
  };

  const handleBottomTextChange = (color) => {
    setBottomText(color);
  };
  
  const onParagraphsChange = (value) => {
    setParagraphs(value);
  };

  const onHeadChange = (value) => {
    setHead(value);
  };

  const onTextSegmentChange = (id, title, value) => {
    if (value === '') {
      setSegment(prevSegment => {
        const updatedSegment = { ...prevSegment };
        if (updatedSegment[title]) {
          delete updatedSegment[title][id];
          if (Object.keys(updatedSegment[title]).length === 0) {
            delete updatedSegment[title];
          }
        }
        return updatedSegment;
      });
    } else {
      setSegment(prevSegment => ({
        ...prevSegment,
        [title]: {
          ...prevSegment[title],
          [id]: value,
        },
      }));
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isVisible) {
      setSegment(prevSegment => ({...prevSegment}));
      setHead(prevHead => ({...prevHead}));
      setParagraphs(prevParagraphs => [...prevParagraphs]);
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const visibleStyle = {
    display: isVisible ? 'block' : 'none'
  }

  return (
    <div className="App flex-column">
      <Header />
      <form onSubmit={handleSubmit} className='main flex-row' noValidate>
        <div className='portfolio' style={visibleStyle}>
          <PortfolioHead onHeadChange={onHeadChange}></PortfolioHead>
          <PortfolioSegment title="Education" onSegmentChange={onTextSegmentChange}></PortfolioSegment>
          <PortfolioSegment title="Experience" onSegmentChange={onTextSegmentChange}></PortfolioSegment>
          <PortfolioSkill title="Skills" onParagraphsChange={onParagraphsChange}>
          </PortfolioSkill>
        </div>
        {!isVisible && 
          <Preview
            data={[head,segment,paragraphs]}
            color={[topColor,topText,bottomColor,bottomText]}
          />
        }
        <Sidebar
          toggleVisibility={toggleVisibility} 
          isVisible={isVisible} 
          handleTopColorChange={handleTopColorChange}
          handleBottomColorChange={handleBottomColorChange}
          handleTopTextChange={handleTopTextChange}
          handleBottomTextChange={handleBottomTextChange}
        />
      </form>
    </div>
  );
}

export default App;
