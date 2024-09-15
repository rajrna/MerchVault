// // src/CustomizePage.js
// import React, { useState } from "react";
// import { Stage, Layer, Image as KonvaImage } from "react-konva";
// import useImage from "use-image";
// import "./CustomizePage.css";
// import styled from "styled-components";

// const CustomizeProduct = () => {
//   const [selectedProduct, setSelectedProduct] = useState("tshirt");
//   const [imageUrl, setImageUrl] = useState(null);
//   const [productImage] = useImage(`/images/${selectedProduct}-template.png`);
//   const [customImage] = useImage(imageUrl);

//   // Handle image upload
//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();
//     reader.onload = () => {
//       setImageUrl(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <Wrapper>
//       <div className="customize-page">
//         {/* Product Selection */}
//         <div className="product-selector">
//           <button onClick={() => setSelectedProduct("tshirt")}>T-Shirt</button>
//           <button onClick={() => setSelectedProduct("hoodie")}>Hoodie</button>
//           <button onClick={() => setSelectedProduct("poster")}>Poster</button>
//         </div>

//         {/* Customization Canvas */}
//         <div className="canvas-wrapper">
//           <Stage width={500} height={500}>
//             <Layer>
//               <KonvaImage image={productImage} width={500} height={500} />
//               {imageUrl && (
//                 <KonvaImage
//                   image={customImage}
//                   x={100}
//                   y={100}
//                   width={150}
//                   height={150}
//                   draggable
//                 />
//               )}
//             </Layer>
//           </Stage>
//         </div>

//         {/* Controls */}
//         <input type="file" onChange={handleImageUpload} />
//       </div>
//     </Wrapper>
//   );
// };
// const Wrapper = styled.section`
//   /* src/CustomizePage.css */
//   .customize-page {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding: 20px;
//   }

//   .product-selector {
//     margin-bottom: 20px;
//   }

//   .product-selector button {
//     margin: 5px;
//     padding: 10px;
//     font-size: 16px;
//     cursor: pointer;
//   }

//   .canvas-wrapper {
//     margin-bottom: 20px;
//     border: 1px solid #ddd;
//   }

//   input[type="file"] {
//     margin-top: 10px;
//     padding: 10px;
//     font-size: 16px;
//   }
// `;
// export default CustomizeProduct;
