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
import { TbMouseOff } from "react-icons/tb";

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
    `/images/product-images/${selectedProduct}-${selectedVariant}.png`
  );
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const imageRef = useRef(null);
  const [productName, setProductName] = useState(""); // New state for product name

  // Boundary constants
  const boundaryWidth = 290;
  const boundaryHeight = 400;
  const boundaryX = 160;
  const boundaryY = 120;

  // Predefined images for selection
  const predefinedImages = [
    "/images/pre-images/p1.png",
    "/images/pre-images/p2.png",
    "/images/pre-images/p3.png",
    "/images/pre-images/p4.png",
    "/images/pre-images/p5.png",
    "/images/pre-images/p6.png",
    "/images/pre-images/p7.png",
    "/images/pre-images/p8.png",
    "/images/pre-images/p9.png",
    "/images/pre-images/p10.png",
    "/images/pre-images/p11.png",
    "/images/pre-images/p12.png",
  ];

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle predefined image selection
  const handlePredefinedImageSelect = (imagePath) => {
    setImageUrl(imagePath);
  };

  // Handle image deletion
  const handleDeleteImage = () => {
    setImageUrl(null);
    setSelectedShape(null);
    transformerRef.current.nodes([]); // Remove transformer
    transformerRef.current.getLayer().batchDraw(); // Update the layer
  };

  // Select uploaded image to make it resizable
  const handleSelectImage = () => {
    setSelectedShape("image");
    transformerRef.current.nodes([imageRef.current]);
    transformerRef.current.getLayer().batchDraw();
  };

  const handleDeselect = () => {
    setSelectedShape(null);
    if (transformerRef.current) {
      transformerRef.current.nodes([]); // Remove transformer
      transformerRef.current.getLayer().batchDraw(); // Update the layer
    }
  };

  // Handle text change
  const handleTextChange = (index, event) => {
    const newTexts = [...texts];
    newTexts[index].text = event.target.value;
    setTexts(newTexts);
  };

  // Handle color change
  const handleColorChange = (index, event) => {
    const newTexts = [...texts];
    newTexts[index].color = event.target.value;
    setTexts(newTexts);
  };

  // Handle size change
  const handleSizeChange = (index, event) => {
    const newTexts = [...texts];
    newTexts[index].size = parseInt(event.target.value, 10);
    setTexts(newTexts);
  };

  // Handle font weight change
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
        {/* Right Side Controls */}
        <div className="controls-sidebar-container">
          <aside className="controls-sidebar">
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

            <hr />

            {["tshirt", "hoodie", "hat"].includes(selectedProduct) && (
              <div className="card">
                <div className="color-btn-container">
                  <h3>Select Color</h3>
                  <br />
                  <div className="color-container">
                    <button
                      onClick={() => setSelectedVariant("white")}
                      className={
                        selectedVariant === "white"
                          ? "product-btn-white"
                          : "product-btn"
                      }
                    >
                      White
                    </button>
                    <button
                      onClick={() => setSelectedVariant("black")}
                      className={
                        selectedVariant === "black"
                          ? "product-btn-black"
                          : "product-btn"
                      }
                    >
                      Black
                    </button>
                  </div>
                </div>
              </div>
            )}

            <hr />

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

              <hr />

              <div className="controls">
                <div className="up-img-controls">
                  {imageUrl && (
                    <button onClick={handleDeselect} className="deselect-img">
                      <TbMouseOff className="p-icons" />
                      Deselect Image
                    </button>
                  )}
                  {imageUrl && (
                    <button onClick={handleDeleteImage} className="delete-img">
                      <FaTrash className="p-icons" />
                      Delete Image
                    </button>
                  )}
                </div>
              </div>

              <hr />

              <div className="card">
                <div className="pre-available-images">
                  <h3>Select Pre-Available Image</h3>
                  <div className="predefined-images-grid">
                    {predefinedImages.map((imgSrc, index) => (
                      <img
                        key={index}
                        src={imgSrc}
                        alt={`Predefined ${index + 1}`}
                        onClick={() => handlePredefinedImageSelect(imgSrc)}
                        style={{
                          width: "70px",
                          height: "65px",
                          cursor: "pointer",
                          border: imageUrl === imgSrc ? "2px solid blue" : "",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Main canvas area */}
        <main className="canvas-area">
          <Stage
            width={600}
            height={600}
            ref={stageRef}
            // onMouseDown={handleStageClick}
          >
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
                <>
                  <KonvaImage
                    image={customImage}
                    x={boundaryX}
                    y={boundaryY}
                    width={150}
                    height={150}
                    draggable
                    ref={imageRef}
                    onClick={handleSelectImage} // Select the image when clicked
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
                      const node = imageRef.current;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();
                      node.scaleX(1);
                      node.scaleY(1);
                      node.width(node.width() * scaleX);
                      node.height(node.height() * scaleY);
                    }}
                  />

                  {/* Transformer to allow resizing */}
                  {selectedShape === "image" && (
                    <Transformer
                      ref={transformerRef}
                      boundBoxFunc={(oldBox, newBox) => {
                        // Limit the resizing to keep image within boundaries
                        if (
                          newBox.width < 50 ||
                          newBox.height < 50 ||
                          newBox.x < boundaryX ||
                          newBox.x + newBox.width > boundaryX + boundaryWidth ||
                          newBox.y < boundaryY ||
                          newBox.y + newBox.height > boundaryY + boundaryHeight
                        ) {
                          return oldBox;
                        }
                        return newBox;
                      }}
                    />
                  )}
                </>
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

        {/* Left Side Controls */}
        <div className="controls-sidebar-container">
          <aside className="controls-sidebar">
            <div className="controls">
              <div className="controls card">
                <div className="prod-name-container">
                  <h3>Enter Your Product Name:</h3>
                  <label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Enter product name"
                    />
                  </label>
                </div>
              </div>

              <hr />

              <div className="card">
                <div className="text-container">
                  <h3>Add Your Texts</h3>
                  <br />
                  <div className="text-scroll-handler">
                    {texts.map((textObj, index) => (
                      <div key={index} className="text-controls">
                        <h4>Text No. {index + 1}</h4>
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
                            onChange={(event) =>
                              handleColorChange(index, event)
                            }
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

              <hr />

              <div className="export-container">
                <button onClick={handleExport} className="export-img">
                  <FaDownload className="p-icons" />
                  Export Image
                </button>
              </div>
            </div>
          </aside>
        </div>
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
    padding: 1.5rem 1rem;
    // border-right: 2px solid ${({ theme }) => theme.colors.border};
    // border-radius: 25px;
    // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: ${({ theme }) => theme.colors.bg};
  }

  .controls-sidebar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .controls-sidebar-container h2 {
    font-weight: bold;
    font-size: 2.3rem;
    color: rgb(13, 59, 102);
    margin: 2rem 0;
  }
  .controls-sidebar {
    width: 280px;
    height: 88vh;
    overflow-y: auto;
    scrollbar-width: none;
    padding: 20px;
    border-top: 3.5px solid #ddd;
    border-bottom: 3.5px solid #ddd;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /*  Color Selector of Product Styles  */
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
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    border: 1px solid rgb(13, 59, 102);
    background-color: rgb(13, 59, 102);
    color: #fff;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;

    &:hover {
      font-weight: bold;
      font-size: 1.2rem;
      background-color: #fff;
      border: 1px solid rgb(13, 59, 102);
      color: rgb(13, 59, 102);
    }
  }
  .product-btn-black {
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    background-color: black;
    font-weight: bold;
    font-size: 1.3rem;
    color: white;
    border: 2px solid black;
  }
  .product-btn-white {
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    background-color: white;
    font-weight: bold;
    font-size: 1.3rem;
    color: black;
    border: 2px solid black;
  }

  /*  Product Selector Styles  */
  .product-selector,
  .prod-name-container,
  .pre-available-images {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .product-selector h3,
  .card h3,
  .text-container h3,
  .prod-name-container h3,
  .pre-available-images h3 {
    margin-bottom: 7px;
    font-weight: bold;
    font-size: 1.6rem;
    color: rgb(74, 74, 74);
  }
  .product-selector .prod-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    font-size: 1.2rem;
    font-weight: bold;
    border: 1px solid rgb(13, 59, 102);
    border-radius: 30px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .product-selector .prod-btn:active,
  .product-selector .prod-btn:visited {
    font-size: 1.4rem;
    color: #fff;
    background-color: rgb(13, 59, 102);
  }
  .product-selector button:hover {
    background-color: rgb(255 255 255);
    color: rgb(13, 59, 102);
    font-size: 1.4rem;
    border: 1px solid rgb(13, 59, 102);
  }

  /*  Text Container Styles  */
  .text-container {
    max-height: 60rem;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .text-scroll-handler {
    max-height: 33rem;
    border-top: 2px solid #ddd;
    border-bottom: 2px solid #ddd;
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
  .text-controls h4 {
    margin-top: 1rem;
    font-weight: bold;
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
  .deselect-img,
  .export-container,
  .text-container .text-add-btn,
  .text-controls .delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .export-img {
    font-weight: bold;
    width: 90%;
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

  /*  File Upload Button Styles  */
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
    background-color: #000;
    color: #007bff;
    border: 1px solid #007bff;
  }

  .file-upload .p-icons {
    margin-right: 8px; /* Space between icon and text */
    font-size: 18px;
  }

  .up-img-controls .deselect-img,
  .up-img-controls .delete-img {
    display: flex;
    width: 80%;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }

  .up-img-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
  }

  .up-img-controls .delete-img {
    background: rgb(231, 76, 60);
    color: white;
    border: 1px solid rgb(231, 76, 60);

    &:hover {
      background: #fff;
      font-weight: bold;
      color: rgb(231, 76, 60);
      border: 1px solid rgb(231, 76, 60);
    }
  }

  .up-img-controls .deselect-img {
    background: #ddd;
    color: black;
    border: 1px solid #ddd;

    &:hover {
      background: #fff;
      font-weight: bold;
      color: rgb(13, 59, 102);
      border: 1px solid rgb(13, 59, 102);
    }
  }

  /*  Product Template Canvas Styles  */
  .canvas-area {
    border-radius: 5px;
    height: 80rem;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(246, 248, 250);
    padding-bottom: 40px; /* Adds spacing at the bottom */
  }

  /* Adds space between CustomizeProduct component and footer */
  margin-bottom: 50px;
`;

export default CustomizeProduct;
