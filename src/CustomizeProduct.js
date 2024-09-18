import React, { useState, useRef } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text as KonvaText,
  Rect,
  Transformer,
} from "react-konva";
import useImage from "use-image";
import styled from "styled-components";
import html2canvas from "html2canvas";
import { Button } from "./styles/Button";
import {
  FaTshirt,
  FaHatCowboy,
  FaUpload,
  FaDownload,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { MdImage } from "react-icons/md";
import { GiHoodie } from "react-icons/gi";

const CustomizeProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState("tshirt");
  const [selectedVariant, setSelectedVariant] = useState("white");
  const [imageUrl, setImageUrl] = useState(null);
  const [texts, setTexts] = useState([
    { text: "Your Text 1", color: "black", size: 24, fontWeight: "normal" },
    { text: "Your Text 2", color: "black", size: 24, fontWeight: "normal" },
  ]);

  const [selectedShape, setSelectedShape] = useState(null);
  const [image, setImage] = useState(null);
  const [customImage] = useImage(imageUrl);
  const [productImage] = useImage(
    `/images/${selectedProduct}-${selectedVariant}.png`
  );
  const stageRef = useRef(null);

  const [productName, setProductName] = useState(""); // New state for product name

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
  // const handleTextChange = (index, event) => {
  //   if (index === 1) {
  //     setText1({ ...text1, text: event.target.value });
  //   } else if (index === 2) {
  //     setText2({ ...text2, text: event.target.value });
  //   }
  // };
  const handleTextChange = (index, event) => {
    const newTexts = [...texts];
    newTexts[index].text = event.target.value;
    setTexts(newTexts);
  };

  // Handle color change
  // const handleColorChange = (index, event) => {
  //   if (index === 1) {
  //     setText1({ ...text1, color: event.target.value });
  //   } else if (index === 2) {
  //     setText2({ ...text2, color: event.target.value });
  //   }
  // };
  const handleColorChange = (index, event) => {
    const newTexts = [...texts];
    newTexts[index].color = event.target.value;
    setTexts(newTexts);
  };

  // Handle size change
  // const handleSizeChange = (index, event) => {
  //   if (index === 1) {
  //     setText1({ ...text1, size: parseInt(event.target.value, 10) });
  //   } else if (index === 2) {
  //     setText2({ ...text2, size: parseInt(event.target.value, 10) });
  //   }
  // };
  const handleSizeChange = (index, event) => {
    const newTexts = [...texts];
    newTexts[index].size = parseInt(event.target.value, 10);
    setTexts(newTexts);
  };

  // Handle font weight change
  // const handleFontWeightChange = (index, event) => {
  //   if (index === 1) {
  //     setText1({ ...text1, fontWeight: event.target.value });
  //   } else if (index === 2) {
  //     setText2({ ...text2, fontWeight: event.target.value });
  //   }
  // };
  const handleFontWeightChange = (index, event) => {
    const newTexts = [...texts];
    newTexts[index].fontWeight = event.target.value;
    setTexts(newTexts);
  };

  // Handle font family change
  const handleFontFamilyChange = (index, event) => {
    const newTexts = [...texts];
    newTexts[index].fontFamily = event.target.value;
    setTexts(newTexts);
  };

  // Handle adding new text
  const handleAddText = () => {
    if (texts.length < 10) {
      setTexts([
        ...texts,
        {
          text: `Your Text ${texts.length + 1}`,
          color: "black",
          size: 24,
          fontWeight: "normal",
          fontFamily: "Arial", // Default font family
        },
      ]);
    }
  };

  //Handle delete text
  const handleDeleteText = (index) => {
    const newTexts = texts.filter((_, i) => i !== index);
    setTexts(newTexts);
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
      link.download = `${productName || "custom-product"}.png`; // Use productName as the filename
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
          <div className="controls">
            <div className="card">
              {" "}
              <label>
                <span>Enter Your Product Name:</span>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                />
              </label>
            </div>
          </div>

          <div className="card">
            <div className="product-selector">
              <h3>Select a Product</h3>
              <Button
                onClick={() => {
                  setSelectedProduct("tshirt");
                  setSelectedVariant("white");
                }}
                className="prod-btn"
              >
                <FaTshirt className="p-icons" />
                T-Shirt
              </Button>
              <Button
                onClick={() => {
                  setSelectedProduct("hoodie");
                  setSelectedVariant("white");
                }}
                className="prod-btn"
              >
                <GiHoodie className="p-icons" />
                Hoodie
              </Button>
              <Button
                onClick={() => setSelectedProduct("poster")}
                className="prod-btn"
              >
                <MdImage className="p-icons" />
                Poster
              </Button>
              <Button
                onClick={() => {
                  setSelectedProduct("hat");
                  setSelectedVariant("white");
                }}
                className="prod-btn"
              >
                <FaHatCowboy className="p-icons" />
                Hat
              </Button>
            </div>
          </div>

          {["tshirt", "hoodie", "hat"].includes(selectedProduct) && (
            <div className="card">
              <div className="color-btn-container">
                <h3>Select Color</h3>
                <div className="color-container">
                  <Button
                    onClick={() => setSelectedVariant("white")}
                    className={
                      selectedVariant === "white"
                        ? "product-btn-white"
                        : "product-btn"
                    }
                  >
                    White
                  </Button>
                  <Button
                    onClick={() => setSelectedVariant("black")}
                    className={
                      selectedVariant === "black"
                        ? "product-btn-black"
                        : "product-btn"
                    }
                  >
                    Black
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="controls">
            <div className="file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <span>
                <FaUpload className="p-icons" />
                Upload Your Image
              </span>
            </div>

            <div className="card">
              <div className="text-container">
                <h3>Add Your Texts</h3>
                <div className="text-scroll-handler">
                  {texts.map((textObj, index) => (
                    <div key={index} className="text-controls">
                      <h4>Text {index + 1}</h4>
                      <label>
                        <span>Text:</span>
                        <input
                          type="text"
                          value={textObj.text}
                          onChange={(event) => handleTextChange(index, event)}
                        />
                      </label>

                      <label>
                        <span>Color:</span>
                        <input
                          type="color"
                          value={textObj.color}
                          onChange={(event) => handleColorChange(index, event)}
                        />
                      </label>

                      <label>
                        <span>Size:</span>
                        <input
                          type="number"
                          min="10"
                          max="100"
                          value={textObj.size}
                          onChange={(event) => handleSizeChange(index, event)}
                        />
                      </label>

                      <label>
                        <span>Font Weight:</span>
                        <select
                          value={textObj.fontWeight}
                          onChange={(event) =>
                            handleFontWeightChange(index, event)
                          }
                        >
                          <option value="normal">Normal</option>
                          <option value="bold">Bold</option>
                        </select>
                      </label>

                      <label>
                        <span>Font Family:</span>
                        <select
                          value={textObj.fontFamily}
                          onChange={(event) =>
                            handleFontFamilyChange(index, event)
                          }
                        >
                          <option value="Arial">Arial</option>
                          <option value="Courier New">Courier New</option>
                          <option value="Times New Roman">
                            Times New Roman
                          </option>
                          <option value="Georgia">Georgia</option>
                          <option value="Verdana">Verdana</option>
                          <option value="Comic Sans MS">Comic Sans MS</option>
                          <option value="Impact">Impact</option>
                          <option value="Monospace">Monospace</option>
                        </select>
                      </label>

                      <button
                        onClick={() => handleDeleteText(index)}
                        className="delete-btn"
                      >
                        <FaTrash className="d-icons" />
                      </button>
                      <hr />
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddText}
                  disabled={texts.length >= 5}
                  className="text-add-btn"
                >
                  <FaPlus className="p-icons" />
                  Add Another Text
                </button>
              </div>
            </div>

            <button onClick={handleExport} className="export-img">
              <FaDownload className="p-icons" />
              Export Image
            </button>
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
              {texts.map((textObj, index) => (
                <KonvaText
                  key={index}
                  text={textObj.text}
                  fontSize={textObj.size}
                  fontFamily={textObj.fontFamily} // Use selected font family
                  fill={textObj.color}
                  fontWeight={textObj.fontWeight}
                  x={boundaryX + 10}
                  y={boundaryY + 10 + index * 40}
                  draggable
                  onDragMove={(e) => handleTextDragMove(e, textObj)}
                />
              ))}
            </Layer>
          </Stage>
        </main>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures the component takes the full height of the viewport */

  .container {
    display: flex;
    flex: 1;
    width: 100%;
  }
  .card {
    padding: 1.5rem 2rem;
    border: 0.1px solid ${({ theme }) => theme.colors.border};
    border-radius: 25px;
    // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.white};
  }

  .controls-sidebar {
    width: 300px;
    height: 110vh;
    overflow-y: auto;
    scrollbar-width: none;
    // background-color: #f7f7f7;
    padding: 20px;
    border-right: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .color-btn-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .color-container {
    display: flex;
    gap: 1rem;
  }
  .product-btn {
    font-size: 1.3rem;
  }
  .product-btn-black {
    background-color: black;
    font-weight: bold;
    font-size: 1.5rem;
    color: white;
    border: 1px solid black;
  }
  .product-btn-white {
    background-color: white;
    font-weight: bold;
    font-size: 1.5rem;
    color: black;
    border: 1px solid black;
  }

  .product-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .product-selector h3,
  .card h3,
  .text-container h3 {
    // margin-top: -10px;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 2rem;
  }
  .product-selector .prod-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    font-size: 1.3rem;
    font-weight: bold;
    border: 1px solid rgb(13, 59, 102);
    border-radius: 30px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .product-selector .prod-btn:active {
    background-color: rgb(13, 59, 102);
  }
  .product-selector button:hover {
    background-color: rgb(255 255 255);
    color: rgb(13, 59, 102);
    border: 1px solid rgb(13, 59, 102);
  }

  .text-container {
    max-height: 50rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .text-scroll-handler {
    max-height: 33rem;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .text-add-btn {
    margin-top: 2rem;
  }

  .p-icons {
    font-size: 2rem;
    margin-right: 10px;
  }
  d-icons {
    font-size: 2rem;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .text-controls {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .text-controls .delete-btn {
    width: 100%;
    background-color: rgb(231, 76, 60);
    border: 1px solid rgb(231, 76, 60);
  }
  .text-controls .delete-btn:hover {
    background-color: white;
    color: rgb(231, 76, 60);
    border: 1px solid rgb(231, 76, 60);
  }
  .text-container .text-add-btn {
    border: 1px solid rgb(13, 59, 102);
    background-color: rgb(13, 59, 102);
    font-weight: bold;
  }
  .text-container .text-add-btn:hover {
    border: 1px solid rgb(13, 59, 102);
    color: rgb(13, 59, 102);
  }
  .export-img,
  .text-container .text-add-btn,
  .text-controls .delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .export-img {
    font-weight: bold;
  }
  .controls label {
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
    gap: 2rem;
  }

  .controls label span {
    margin-right: 10px;
    font-weight: bold;
  }

  .controls input[type="text"],
  .controls input[type="number"],
  .controls select {
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 30px;
    margin-right: 10px;
    flex: 1;
  }
  .controls input[type="text"] {
    width: 100%;
    text-transform: none;
  }
  .controls input[type="color"] {
    width: 100%;
    height: 3.5vh;
    padding: 0;
  }

  .controls button {
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #28a745;
    border-radius: 30px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .controls button:hover {
    border: 1px solid #28a745;
    background-color: #fff;
    color: #28a745;
  }

  .file-upload {
    display: inline-block;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }

  .file-upload input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0; /* Hide the input file button */
    cursor: pointer;
  }

  .file-upload span {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    background-color: #007bff; /* Button background color */
    border: 1px solid #007bff;
    color: white;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    transition: background-color 0.3s ease;
  }

  .file-upload span:hover {
    background-color: #fff;
    color: #007bff;
    border: 1px solid #007bff;
  }

  .file-upload .p-icons {
    margin-right: 8px; /* Space between icon and text */
    font-size: 18px;
  }

  .canvas-area {
    border-radius: 5px;
    height: 80rem;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f1f1f1;
    padding-bottom: 40px; /* Adds spacing at the bottom */
  }

  /* Adds space between CustomizeProduct component and footer */
  margin-bottom: 50px;
`;

export default CustomizeProduct;
