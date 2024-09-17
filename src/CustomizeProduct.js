import React, { useState, useRef } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text as KonvaText,
  Rect,
} from "react-konva";
import useImage from "use-image";
import styled from "styled-components";
import html2canvas from "html2canvas";

const CustomizeProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState("tshirt");
  const [imageUrl, setImageUrl] = useState(null);
  const [text1, setText1] = useState({
    text: "Text 1",
    color: "black",
    size: 24,
    fontWeight: "normal",
  });
  const [text2, setText2] = useState({
    text: "Text 2",
    color: "black",
    size: 24,
    fontWeight: "normal",
  });
  const [selectedShape, setSelectedShape] = useState(null);
  const [image, setImage] = useState(null);
  const [customImage] = useImage(imageUrl);
  const [productImage] = useImage(`/images/${selectedProduct}-template.png`);
  const stageRef = useRef(null);

  // Boundary constants
  const boundaryWidth = 250;
  const boundaryHeight = 380;
  const boundaryX = 180;
  const boundaryY = 120;

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle text change
  const handleTextChange = (index, event) => {
    if (index === 1) {
      setText1({ ...text1, text: event.target.value });
    } else if (index === 2) {
      setText2({ ...text2, text: event.target.value });
    }
  };

  // Handle color change
  const handleColorChange = (index, event) => {
    if (index === 1) {
      setText1({ ...text1, color: event.target.value });
    } else if (index === 2) {
      setText2({ ...text2, color: event.target.value });
    }
  };

  // Handle size change
  const handleSizeChange = (index, event) => {
    if (index === 1) {
      setText1({ ...text1, size: parseInt(event.target.value, 10) });
    } else if (index === 2) {
      setText2({ ...text2, size: parseInt(event.target.value, 10) });
    }
  };

  // Handle font weight change
  const handleFontWeightChange = (index, event) => {
    if (index === 1) {
      setText1({ ...text1, fontWeight: event.target.value });
    } else if (index === 2) {
      setText2({ ...text2, fontWeight: event.target.value });
    }
  };

  // Handle export
  const handleExport = () => {
    html2canvas(
      stageRef.current.container().getElementsByTagName("canvas")[0],
      {
        scale: 3, // Increase the resolution for print
      }
    ).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "custom-product.png";
      link.click();
    });
  };

  const handleTextDragMove = (e, text) => {
    const { width, height } = e.target.getClientRect();
    const x = Math.max(
      boundaryX,
      Math.min(
        e.target.x(),
        boundaryX + boundaryWidth - width * e.target.scaleX()
      )
    );
    const y = Math.max(
      boundaryY,
      Math.min(
        e.target.y(),
        boundaryY + boundaryHeight - height * e.target.scaleY()
      )
    );
    e.target.position({ x, y });
  };

  return (
    <Wrapper>
      <div className="container">
        {/* Sidebar for controls */}
        <aside className="controls-sidebar">
          <div className="product-selector">
            <button onClick={() => setSelectedProduct("tshirt")}>
              T-Shirt
            </button>
            <button onClick={() => setSelectedProduct("hoodie")}>Hoodie</button>
            <button onClick={() => setSelectedProduct("poster")}>Poster</button>
            <button onClick={() => setSelectedProduct("hat")}>Hat</button>
          </div>
          <div className="controls">
            <label className="file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <span className="upload-button">Choose File</span>
            </label>

            <div className="text-controls">
              <h3>Text 1</h3>
              <label>
                <span>Text:</span>
                <input
                  type="text"
                  value={text1.text}
                  onChange={(event) => handleTextChange(1, event)}
                />
              </label>
              <label>
                <span>Color:</span>
                <input
                  type="color"
                  value={text1.color}
                  onChange={(event) => handleColorChange(1, event)}
                />
              </label>
              <label>
                <span>Size:</span>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={text1.size}
                  onChange={(event) => handleSizeChange(1, event)}
                />
              </label>
              <label>
                <span>Font Weight:</span>
                <select
                  value={text1.fontWeight}
                  onChange={(event) => handleFontWeightChange(1, event)}
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </label>
            </div>

            <div className="text-controls">
              <h3>Text 2</h3>
              <label>
                <span>Text:</span>
                <input
                  type="text"
                  value={text2.text}
                  onChange={(event) => handleTextChange(2, event)}
                />
              </label>
              <label>
                <span>Color:</span>
                <input
                  type="color"
                  value={text2.color}
                  onChange={(event) => handleColorChange(2, event)}
                />
              </label>
              <label>
                <span>Size:</span>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={text2.size}
                  onChange={(event) => handleSizeChange(2, event)}
                />
              </label>
              <label>
                <span>Font Weight:</span>
                <select
                  value={text2.fontWeight}
                  onChange={(event) => handleFontWeightChange(2, event)}
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </label>
            </div>
            <button onClick={handleExport}>Export Image</button>
          </div>
        </aside>

        {/* Main canvas area */}
        <main className="canvas-area">
          <Stage width={600} height={600} ref={stageRef}>
            <Layer>
              <KonvaImage image={productImage} width={600} height={600} />
              <Rect
                x={boundaryX}
                y={boundaryY}
                width={boundaryWidth}
                height={boundaryHeight}
                stroke="transparent"
                strokeWidth={2}
                dash={[10, 5]}
                listening={false}
              />
              {imageUrl && (
                <KonvaImage
                  image={customImage}
                  x={boundaryX}
                  y={boundaryY}
                  width={150}
                  height={150}
                  draggable
                  ref={(node) => setImage(node)}
                  onDragMove={(e) => {
                    const x = Math.max(
                      boundaryX,
                      Math.min(
                        e.target.x(),
                        boundaryX +
                          boundaryWidth -
                          e.target.width() * e.target.scaleX()
                      )
                    );
                    const y = Math.max(
                      boundaryY,
                      Math.min(
                        e.target.y(),
                        boundaryY +
                          boundaryHeight -
                          e.target.height() * e.target.scaleY()
                      )
                    );
                    e.target.position({ x, y });
                  }}
                  onTransformEnd={() => {
                    const scaleX = image.scaleX();
                    const scaleY = image.scaleY();
                    image.scaleX(1);
                    image.scaleY(1);
                    image.width(image.width() * scaleX);
                    image.height(image.height() * scaleY);
                  }}
                />
              )}
              <KonvaText
                text={text1.text}
                fontSize={text1.size}
                fontFamily="Arial"
                fill={text1.color}
                fontWeight={text1.fontWeight}
                x={boundaryX + 10}
                y={boundaryY + 10}
                draggable
                onDragMove={(e) => handleTextDragMove(e, text1)}
              />
              <KonvaText
                text={text2.text}
                fontSize={text2.size}
                fontFamily="Arial"
                fill={text2.color}
                fontWeight={text2.fontWeight}
                x={boundaryX + 10}
                y={boundaryY + 50}
                draggable
                onDragMove={(e) => handleTextDragMove(e, text2)}
              />
            </Layer>
          </Stage>
        </main>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;

  .container {
    display: flex;
    flex: 1;
  }

  .controls-sidebar {
    width: 300px;
    background-color: #f7f7f7;
    padding: 20px;
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .product-selector {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .product-selector button {
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .product-selector button:hover {
    background-color: #0056b3;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .text-controls {
    margin-bottom: 20px;
  }

  .controls label {
    display: flex;
    align-items: center;
    font-size: 16px;
  }

  .controls label span {
    margin-right: 10px;
    font-weight: bold;
  }

  .controls input[type="text"],
  .controls input[type="number"],
  .controls select {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
    flex: 1;
  }

  .controls input[type="color"] {
    width: 100%;
    height: 3.5vh;
    padding: 0;
  }

  .controls button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .controls button:hover {
    background-color: #218838;
  }

  .file-upload {
    position: relative;
    display: flex;
    align-items: center;
  }

  .file-upload input[type="file"] {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .file-upload .upload-button {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    color: #007bff;
    border: 1px solid #007bff;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.3s, color 0.3s;
  }

  .file-upload .upload-button:hover {
    background-color: #007bff;
    color: #fff;
  }

  .canvas-area {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
`;

export default CustomizeProduct;
