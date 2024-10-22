import "./UpdateProductArea.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/ApiCalls";
import { useDispatch } from "react-redux";
const UpdateProductArea = ({ productType, product }) => {
  const [colors, setColors] = useState([]);
  const [currentColors, setCurrentColors] = useState("");
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    title: "",
    price: "",
    battery: "",
    brand: "",
    quantity: "",
    desc: "",
    colors: [],
    variants: [],
  });
  useEffect(() => {
    setColors(product.colors);
    setImg(product.img);
    setProductData({
      title: product.title || "",
      price: product.price || "",
      battery: product.battery || "",
      brand: product.brand || "",
      quantity: product.quantity || "",
      desc: product.desc || "",
      colors: colors,
    });
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (e) => {
    setCurrentColors(e.target.value);
  };
  const addColor = () => {
    if (colors.length < 6) {
      setColors([...colors, currentColors]);
      setCurrentColors("");
    }
  };
  const showToast = (message) => {
    toast.error(message, {
      theme: "colored",
      pauseOnFocusLoss: false,
      toastId: 1,
    });
  };
  const handleDeleteColor = (index) => {
    const updatedColor = [...colors];
    updatedColor.splice(index, 1);
    setColors(updatedColor);
  };
  const handleUpload = async () => {
    return new Promise((resolve, reject) => {
      if (!file && img) {
        resolve(img);
        return;
      }
      if (!file && !img) {
        showToast("Image is required");
        reject(new Error("No file or image available"));
      }
      if (file) {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            showToast("Failed to upload image");
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImg(downloadURL);
              resolve(downloadURL);
            });
          }
        );
      }
    });
  };

  const handleUpdate = async () => {
    try {
      const imgUrl = await handleUpload();

      const updatedProduct = {
        ...productData,
        colors,
        img: imgUrl,
      };
      console.log(updatedProduct);

      updateProduct(dispatch, updatedProduct, product._id);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="updateProductArea">
      <div className="header">
        <h3>Edit Product</h3>
        <button onClick={() => navigate("/product")}>View All</button>
      </div>
      <hr />

      <div className="updateArea">
        <div className="imageSelector">
          <label htmlFor="file">
            <AddPhotoAlternateIcon className="imgSelect" />
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && (
            <div className="file">
              <img src={URL.createObjectURL(file)} alt="" />
              <DeleteIcon className="delete" onClick={() => setFile(null)} />
            </div>
          )}
          {img && (
            <div className="file">
              <img src={img} alt="" />
              <DeleteIcon className="delete" onClick={() => setImg("")} />
            </div>
          )}
        </div>
        <div className="variantArea">
          <div className="defaultVariant">
            <div className="inputItem">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                placeholder="Title"
                id="title"
                name="title"
                value={productData.title}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="inputItem">
              <label htmlFor="Price">Price:</label>
              <input
                type="number"
                placeholder="Price"
                id="price"
                min={0}
                name="price"
                value={productData.price}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="inputItem">
              <label htmlFor="Battery">Battery Life:</label>
              <input
                type="number"
                placeholder="Battery"
                id="Battery"
                min={0}
                name="battery"
                value={productData.battery}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="inputItem">
              <label htmlFor="Brand">Brand:</label>
              <input
                type="text"
                placeholder="Brand"
                id="brand"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
              />
            </div>{" "}
            <div className="inputItem">
              <label htmlFor="Quantity">Quantity:</label>
              <input
                type="number"
                placeholder="Quantity"
                id="Quantity"
                min={0}
                name="quantity"
                value={productData.quantity}
                onChange={handleInputChange}
              />
            </div>{" "}
          </div>
          <div className="description">
            <label htmlFor="description">Description</label>
            <textarea
              id="desc"
              placeholder="Description"
              name="desc"
              value={productData.desc}
              onChange={handleInputChange}
              rows={8}
            ></textarea>
          </div>
          <div className="colorArea">
            <div className="inputItem">
              <label htmlFor="Color">Color:</label>
              <input
                type="color"
                placeholder="Color"
                id="Color"
                className="colorInput"
                value={currentColors}
                onChange={handleColorChange}
              />
              <button onClick={addColor}>Add</button>
            </div>{" "}
            <div className="colors">
              {colors &&
                colors.map((color, index) => {
                  return (
                    <div
                      key={index}
                      className="colorItem"
                      style={{
                        backgroundColor: `${color}`,
                      }}
                      onClick={() => handleDeleteColor(index)}
                    >
                      <DeleteIcon className="delete" />
                    </div>
                  );
                })}
            </div>
          </div>
          <button className="UpdateButton" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductArea;
